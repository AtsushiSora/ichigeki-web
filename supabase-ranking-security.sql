-- ICHIGEKI 公開ランキング不正対策
-- 1. 公開ランキングへの直接 INSERT / UPDATE を禁止
-- 2. Google ログイン利用者へ一回限りのプレイ券を発行
-- 3. 機種ごとの固定条件と結果の整合性を DB 側で検証

alter table public.machine_rankings
  add column if not exists verified boolean not null default false;

create table if not exists public.ranking_machine_rules (
  machine_slug text primary key,
  score_kind text not null check (score_kind in ('balls', 'coins')),
  sim_kind text not null check (sim_kind in ('pachinko', 'slot', 'juggler')),
  attempts_per_thousand numeric not null check (attempts_per_thousand >= 0),
  max_attempts integer not null check (max_attempts > 0),
  max_payout integer not null check (max_payout >= 0),
  allowed_settings integer[] not null default '{}',
  updated_at timestamptz not null default now()
);

create table if not exists public.ranking_play_tickets (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  machine_slug text not null references public.ranking_machine_rules(machine_slug) on delete cascade,
  created_at timestamptz not null default now(),
  used_at timestamptz,
  submitted_score integer
);

create index if not exists ranking_play_tickets_user_created_idx
  on public.ranking_play_tickets (user_id, created_at desc);

alter table public.ranking_machine_rules enable row level security;
alter table public.ranking_play_tickets enable row level security;

-- 機種ルールとプレイ券は SECURITY DEFINER 関数だけが扱います。
revoke all on public.ranking_machine_rules from anon, authenticated;
revoke all on public.ranking_play_tickets from anon, authenticated;

drop policy if exists "users create own machine rankings" on public.machine_rankings;
drop policy if exists "users update own machine rankings" on public.machine_rankings;

create or replace function public.is_google_ranking_user()
returns boolean
language sql
stable
security definer
set search_path = public, auth
as $$
  select exists (
    select 1
    from auth.users
    where id = auth.uid()
      and not coalesce(is_anonymous, false)
      and (
        raw_app_meta_data ->> 'provider' = 'google'
        or coalesce(raw_app_meta_data -> 'providers', '[]'::jsonb) ? 'google'
      )
  );
$$;

revoke all on function public.is_google_ranking_user() from public;
grant execute on function public.is_google_ranking_user() to authenticated;

create or replace function public.start_verified_ranking_play(p_machine_slug text)
returns uuid
language plpgsql
security definer
set search_path = public, auth
as $$
declare
  v_user_id uuid := auth.uid();
  v_ticket_id uuid;
begin
  if v_user_id is null or not public.is_google_ranking_user() then
    raise exception 'Googleログインが必要です。';
  end if;

  if not exists (
    select 1 from public.ranking_machine_rules where machine_slug = p_machine_slug
  ) then
    raise exception 'この機種は検証済みランキングに未対応です。';
  end if;

  if (
    select count(*)
    from public.ranking_play_tickets
    where user_id = v_user_id
      and created_at > now() - interval '10 minutes'
  ) >= 30 then
    raise exception 'プレイ回数が多すぎます。時間を空けてお試しください。';
  end if;

  insert into public.ranking_play_tickets (user_id, machine_slug)
  values (v_user_id, p_machine_slug)
  returning id into v_ticket_id;

  return v_ticket_id;
end;
$$;

revoke all on function public.start_verified_ranking_play(text) from public;
grant execute on function public.start_verified_ranking_play(text) to authenticated;

create or replace function public.submit_verified_machine_ranking(
  p_ticket_id uuid,
  p_nickname text,
  p_score integer,
  p_score_kind text,
  p_title text,
  p_investment integer,
  p_payout integer,
  p_attempts integer,
  p_setting integer default null
)
returns jsonb
language plpgsql
security definer
set search_path = public, auth
as $$
declare
  v_user_id uuid := auth.uid();
  v_ticket public.ranking_play_tickets%rowtype;
  v_rule public.ranking_machine_rules%rowtype;
  v_expected_units integer;
  v_expected_investment integer;
  v_expected_score integer;
  v_existing public.machine_rankings%rowtype;
  v_nickname text := regexp_replace(trim(coalesce(p_nickname, '')), '[[:cntrl:]]', '', 'g');
  v_title text := regexp_replace(trim(coalesce(p_title, '')), '[[:cntrl:]]', '', 'g');
  v_updated boolean := false;
begin
  if v_user_id is null or not public.is_google_ranking_user() then
    raise exception 'Googleログインが必要です。';
  end if;

  select * into v_ticket
  from public.ranking_play_tickets
  where id = p_ticket_id and user_id = v_user_id
  for update;

  if not found then
    raise exception '有効なプレイ券を確認できません。もう一度遊んでください。';
  end if;
  if v_ticket.used_at is not null then
    raise exception 'このプレイ結果は登録済みです。';
  end if;
  if v_ticket.created_at < now() - interval '4 hours' then
    raise exception 'プレイ券の有効期限が切れました。もう一度遊んでください。';
  end if;

  select * into strict v_rule
  from public.ranking_machine_rules
  where machine_slug = v_ticket.machine_slug;

  if char_length(v_nickname) not between 1 and 16 then
    raise exception 'ニックネームは1〜16文字で入力してください。';
  end if;
  if char_length(v_title) not between 1 and 120 then
    raise exception '結果名が不正です。';
  end if;
  if p_score_kind is distinct from v_rule.score_kind then
    raise exception '記録単位が機種と一致しません。';
  end if;
  if p_attempts < 1 or p_attempts > v_rule.max_attempts then
    raise exception '回転数またはゲーム数が範囲外です。';
  end if;
  if p_payout < 0 or p_payout > v_rule.max_payout then
    raise exception '獲得数が範囲外です。';
  end if;
  if p_investment < 0 or p_investment > 10000000 or p_investment % 1000 <> 0 then
    raise exception '投資額が不正です。';
  end if;

  if v_rule.sim_kind = 'juggler' then
    if p_attempts <> v_rule.max_attempts then
      raise exception 'Aタイプは8,000G完走時だけ登録できます。';
    end if;
    v_expected_units := p_investment / 1000;
  else
    v_expected_units := ceil(p_attempts::numeric / v_rule.attempts_per_thousand)::integer;
    v_expected_investment := v_expected_units * 1000;
    if p_investment <> v_expected_investment then
      raise exception '固定レートの投資額と一致しません。';
    end if;
  end if;

  if v_rule.score_kind = 'balls' then
    v_expected_score := p_payout - v_expected_units * 250;
    if p_setting is not null then
      raise exception 'パチンコ結果に設定値は登録できません。';
    end if;
  else
    v_expected_score := p_payout - v_expected_units * 46;
    if p_setting is null or not (p_setting = any(v_rule.allowed_settings)) then
      raise exception '設定値が機種条件と一致しません。';
    end if;
    if v_title !~ ('^設定' || p_setting::text || '([｜・]|$)') then
      raise exception '結果名と設定値が一致しません。';
    end if;
  end if;

  if p_score <> v_expected_score then
    raise exception 'スコア・投資・獲得数の計算が一致しません。';
  end if;

  select * into v_existing
  from public.machine_rankings
  where user_id = v_user_id and machine_slug = v_ticket.machine_slug
  for update;

  if not found or p_score > v_existing.score
    or (p_score = v_existing.score and p_investment < v_existing.investment) then
    insert into public.machine_rankings (
      user_id, machine_slug, nickname, score, score_kind, title, summary,
      investment, payout, attempts, verified, updated_at
    ) values (
      v_user_id, v_ticket.machine_slug, v_nickname, p_score, p_score_kind, v_title,
      'サーバー検証済み・固定レート', p_investment, p_payout, p_attempts, true, now()
    )
    on conflict (user_id, machine_slug) do update set
      nickname = excluded.nickname,
      score = excluded.score,
      score_kind = excluded.score_kind,
      title = excluded.title,
      summary = excluded.summary,
      investment = excluded.investment,
      payout = excluded.payout,
      attempts = excluded.attempts,
      verified = true,
      updated_at = now();
    v_updated := true;
  end if;

  update public.ranking_play_tickets
  set used_at = now(), submitted_score = p_score
  where id = p_ticket_id;

  return jsonb_build_object(
    'updated', v_updated,
    'verified', true,
    'score', p_score,
    'machine_slug', v_ticket.machine_slug
  );
end;
$$;

revoke all on function public.submit_verified_machine_ranking(uuid, text, integer, text, text, integer, integer, integer, integer) from public;
grant execute on function public.submit_verified_machine_ranking(uuid, text, integer, text, text, integer, integer, integer, integer) to authenticated;

