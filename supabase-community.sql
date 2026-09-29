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

create index if not exists community_posts_machine_created_idx
  on public.community_posts (machine_slug, created_at desc)
  where status = 'published';

create index if not exists community_reports_post_idx
  on public.community_reports (post_id);

create index if not exists machine_rankings_machine_score_idx
  on public.machine_rankings (machine_slug, score desc, investment asc);

drop policy if exists "published posts are public" on public.community_posts;
drop policy if exists "authenticated users create own posts" on public.community_posts;
drop policy if exists "users report as themselves" on public.community_reports;
drop policy if exists "machine rankings are public" on public.machine_rankings;
drop policy if exists "users create own machine rankings" on public.machine_rankings;
drop policy if exists "users update own machine rankings" on public.machine_rankings;

create policy "published posts are public" on public.community_posts for select using (status = 'published');
create policy "authenticated users create own posts" on public.community_posts for insert to authenticated with check (auth.uid() = user_id);
create policy "users report as themselves" on public.community_reports for insert to authenticated with check (auth.uid() = reporter_id);
create policy "machine rankings are public" on public.machine_rankings for select using (true);
create policy "users create own machine rankings" on public.machine_rankings for insert to authenticated with check (auth.uid() = user_id);
create policy "users update own machine rankings" on public.machine_rankings for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('community-media', 'community-media', true, 20971520, array['image/jpeg', 'image/png', 'image/webp', 'video/mp4', 'video/webm'])
on conflict (id) do update set public = true, file_size_limit = 20971520, allowed_mime_types = array['image/jpeg', 'image/png', 'image/webp', 'video/mp4', 'video/webm'];

drop policy if exists "community images are public" on storage.objects;
drop policy if exists "community media are public" on storage.objects;
drop policy if exists "users upload to own folder" on storage.objects;

create policy "community media are public" on storage.objects for select using (bucket_id = 'community-media');
create policy "users upload to own folder" on storage.objects for insert to authenticated
with check (bucket_id = 'community-media' and (storage.foldername(name))[1] = auth.uid()::text);
