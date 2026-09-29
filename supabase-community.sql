-- Supabase SQL Editorで実行するICHIGEKIコミュニティ用スキーマです。
-- 同じ内容を再実行しても安全な構成にしています。
create extension if not exists pgcrypto;

create table if not exists public.community_posts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  machine_slug text not null check (char_length(machine_slug) between 1 and 80),
  post_type text not null check (post_type in ('review', 'result', 'simulation')),
  nickname text not null check (char_length(nickname) between 1 and 16),
  rating smallint not null default 0 check (rating between 0 and 5),
  title text not null check (char_length(title) between 1 and 60),
  body text not null check (char_length(body) between 1 and 1000),
  investment integer not null default 0 check (investment >= 0),
  return_amount integer not null default 0 check (return_amount >= 0),
  media_urls jsonb not null default '[]'::jsonb,
  video_url text,
  status text not null default 'published' check (status in ('published', 'hidden', 'review')),
  created_at timestamptz not null default now()
);

create table if not exists public.community_reports (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.community_posts(id) on delete cascade,
  reporter_id uuid not null references auth.users(id) on delete cascade,
  reason text not null default 'user_report',
  created_at timestamptz not null default now(),
  unique (post_id, reporter_id)
);

-- 管理者権限。管理画面のURLを知っているだけでは操作できず、ここに登録されたAuthユーザーだけが管理できます。
create table if not exists public.community_admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

-- 各機種シミュレーターの共有ランキング。1利用者につき1機種1件の自己ベストを保持します。
create table if not exists public.machine_rankings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  machine_slug text not null check (char_length(machine_slug) between 1 and 80),
  nickname text not null check (char_length(nickname) between 1 and 16),
  score integer not null,
  score_kind text not null check (score_kind in ('balls', 'coins')),
  title text not null check (char_length(title) between 1 and 120),
  summary text not null check (char_length(summary) between 1 and 500),
  investment integer not null default 0 check (investment >= 0),
  payout integer not null default 0 check (payout >= 0),
  attempts integer not null default 0 check (attempts >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, machine_slug)
);

alter table public.community_posts enable row level security;
alter table public.community_reports enable row level security;
alter table public.machine_rankings enable row level security;
alter table public.community_admins enable row level security;

create or replace function public.is_community_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.community_admins where user_id = auth.uid()
  );
$$;

revoke all on function public.is_community_admin() from public;
grant execute on function public.is_community_admin() to authenticated;

create index if not exists community_posts_machine_created_idx
  on public.community_posts (machine_slug, created_at desc)
  where status = 'published';

create index if not exists community_reports_post_idx
  on public.community_reports (post_id);

create index if not exists machine_rankings_machine_score_idx
  on public.machine_rankings (machine_slug, score desc, investment asc);

drop policy if exists "published posts are public" on public.community_posts;
drop policy if exists "authenticated users create own posts" on public.community_posts;
drop policy if exists "users delete own posts" on public.community_posts;
drop policy if exists "admins read all posts" on public.community_posts;
drop policy if exists "admins moderate posts" on public.community_posts;
drop policy if exists "admins delete posts" on public.community_posts;
drop policy if exists "users report as themselves" on public.community_reports;
drop policy if exists "admins read reports" on public.community_reports;
drop policy if exists "admins delete reports" on public.community_reports;
drop policy if exists "machine rankings are public" on public.machine_rankings;
drop policy if exists "users create own machine rankings" on public.machine_rankings;
drop policy if exists "users update own machine rankings" on public.machine_rankings;
drop policy if exists "users delete own machine rankings" on public.machine_rankings;
drop policy if exists "admins delete machine rankings" on public.machine_rankings;

create policy "published posts are public" on public.community_posts for select using (status = 'published');
create policy "authenticated users create own posts" on public.community_posts for insert to authenticated with check (auth.uid() = user_id);
create policy "users delete own posts" on public.community_posts for delete to authenticated using (auth.uid() = user_id);
create policy "admins read all posts" on public.community_posts for select to authenticated using (public.is_community_admin());
create policy "admins moderate posts" on public.community_posts for update to authenticated using (public.is_community_admin()) with check (public.is_community_admin());
create policy "admins delete posts" on public.community_posts for delete to authenticated using (public.is_community_admin());
create policy "users report as themselves" on public.community_reports for insert to authenticated with check (auth.uid() = reporter_id);
create policy "admins read reports" on public.community_reports for select to authenticated using (public.is_community_admin());
create policy "admins delete reports" on public.community_reports for delete to authenticated using (public.is_community_admin());
create policy "machine rankings are public" on public.machine_rankings for select using (true);
create policy "users create own machine rankings" on public.machine_rankings for insert to authenticated with check (auth.uid() = user_id);
create policy "users update own machine rankings" on public.machine_rankings for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "users delete own machine rankings" on public.machine_rankings for delete to authenticated using (auth.uid() = user_id);
create policy "admins delete machine rankings" on public.machine_rankings for delete to authenticated using (public.is_community_admin());

-- 匿名セッションを使った連続投稿・大量通報をDB側でも制限します。
create or replace function public.limit_community_post_rate()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if (
    select count(*) from public.community_posts
    where user_id = new.user_id and created_at > now() - interval '10 minutes'
  ) >= 5 then
    raise exception '投稿が連続しています。10分ほど待ってからお試しください。';
  end if;
  return new;
end;
$$;

drop trigger if exists community_post_rate_limit on public.community_posts;
create trigger community_post_rate_limit
before insert on public.community_posts
for each row execute function public.limit_community_post_rate();

create or replace function public.limit_community_report_rate()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if (
    select count(*) from public.community_reports
    where reporter_id = new.reporter_id and created_at > now() - interval '1 hour'
  ) >= 10 then
    raise exception '通報回数の上限に達しました。時間を空けてお試しください。';
  end if;
  return new;
end;
$$;

drop trigger if exists community_report_rate_limit on public.community_reports;
create trigger community_report_rate_limit
before insert on public.community_reports
for each row execute function public.limit_community_report_rate();

-- 同じ投稿への通報が3件に達したら公開一覧から外し、管理者確認待ちにします。
create or replace function public.review_frequently_reported_post()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if (
    select count(*) from public.community_reports where post_id = new.post_id
  ) >= 3 then
    update public.community_posts set status = 'review'
    where id = new.post_id and status = 'published';
  end if;
  return new;
end;
$$;

drop trigger if exists community_report_auto_review on public.community_reports;
create trigger community_report_auto_review
after insert on public.community_reports
for each row execute function public.review_frequently_reported_post();

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('community-media', 'community-media', true, 20971520, array['image/jpeg', 'image/png', 'image/webp', 'video/mp4', 'video/webm'])
on conflict (id) do update set public = true, file_size_limit = 20971520, allowed_mime_types = array['image/jpeg', 'image/png', 'image/webp', 'video/mp4', 'video/webm'];

drop policy if exists "community images are public" on storage.objects;
drop policy if exists "community media are public" on storage.objects;
drop policy if exists "users upload to own folder" on storage.objects;

create policy "community media are public" on storage.objects for select using (bucket_id = 'community-media');
create policy "users upload to own folder" on storage.objects for insert to authenticated
with check (bucket_id = 'community-media' and (storage.foldername(name))[1] = auth.uid()::text);
