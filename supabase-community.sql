-- Supabase SQL Editorで一度だけ実行するICHIGEKIコミュニティ用スキーマです。
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

alter table public.community_posts enable row level security;
alter table public.community_reports enable row level security;

create policy "published posts are public" on public.community_posts for select using (status = 'published');
create policy "authenticated users create own posts" on public.community_posts for insert to authenticated with check (auth.uid() = user_id);
create policy "users report as themselves" on public.community_reports for insert to authenticated with check (auth.uid() = reporter_id);

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('community-media', 'community-media', true, 2097152, array['image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do update set public = true, file_size_limit = 2097152, allowed_mime_types = array['image/jpeg', 'image/png', 'image/webp'];

create policy "community images are public" on storage.objects for select using (bucket_id = 'community-media');
create policy "users upload to own folder" on storage.objects for insert to authenticated
with check (bucket_id = 'community-media' and (storage.foldername(name))[1] = auth.uid()::text);
