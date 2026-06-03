-- =============================================================================
-- Algorhythm Step 2 — Supabase schema
-- Paste the entire file into Supabase → SQL Editor → New query → Run.
-- Safe to re-run: every CREATE uses IF NOT EXISTS, every POLICY drops first.
-- =============================================================================

-- ---------- Extensions --------------------------------------------------------
create extension if not exists "pgcrypto";

-- ---------- profiles ----------------------------------------------------------
-- Mirrors auth.users so we can attach a display name / preferences later.
create table if not exists public.profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  email       text,
  display_name text,
  avatar_url  text,
  created_at  timestamptz not null default now()
);

alter table public.profiles enable row level security;

drop policy if exists "profiles self read"  on public.profiles;
drop policy if exists "profiles self write" on public.profiles;
drop policy if exists "profiles self insert" on public.profiles;

create policy "profiles self read"
  on public.profiles for select using (auth.uid() = id);
create policy "profiles self insert"
  on public.profiles for insert with check (auth.uid() = id);
create policy "profiles self write"
  on public.profiles for update using (auth.uid() = id);

-- Auto-create a profile row whenever a new auth.user is created.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, display_name, avatar_url)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
    new.raw_user_meta_data->>'avatar_url'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------- note_progress -----------------------------------------------------
create table if not exists public.note_progress (
  user_id      uuid not null references auth.users(id) on delete cascade,
  note_id      text not null,
  completed_at timestamptz not null default now(),
  primary key (user_id, note_id)
);

alter table public.note_progress enable row level security;
drop policy if exists "note_progress self all" on public.note_progress;
create policy "note_progress self all"
  on public.note_progress for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- ---------- case_progress -----------------------------------------------------
create table if not exists public.case_progress (
  user_id      uuid not null references auth.users(id) on delete cascade,
  case_id      text not null,
  completed_at timestamptz not null default now(),
  correct      boolean,
  primary key (user_id, case_id)
);

alter table public.case_progress enable row level security;
drop policy if exists "case_progress self all" on public.case_progress;
create policy "case_progress self all"
  on public.case_progress for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- ---------- highlights --------------------------------------------------------
-- One row per highlighted span. We store an anchor as (section_idx, bullet_idx)
-- plus the literal text so we can re-find it even if minor edits happen.
create table if not exists public.highlights (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid not null references auth.users(id) on delete cascade,
  note_id       text not null,
  section_kind  text not null check (section_kind in ('section','table','pearls','summary')),
  section_idx   int  not null default 0,
  bullet_idx    int,
  start_offset  int  not null default 0,
  end_offset    int  not null default 0,
  text_content  text not null,
  color         text not null default 'yellow' check (color in ('yellow','green','pink','blue')),
  note          text,
  created_at    timestamptz not null default now()
);

create index if not exists highlights_user_note_idx
  on public.highlights (user_id, note_id);

alter table public.highlights enable row level security;
drop policy if exists "highlights self all" on public.highlights;
create policy "highlights self all"
  on public.highlights for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- ---------- flashcards --------------------------------------------------------
-- source_type:
--   'prebuilt' = the canonical deck auto-generated from notes/pearls
--   'user'     = user-authored (often spawned from a highlight)
create table if not exists public.flashcards (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid references auth.users(id) on delete cascade,  -- null for prebuilt template
  source_type   text not null check (source_type in ('prebuilt','user')),
  source_id     text,   -- stable id for prebuilt cards so we can dedupe
  note_id       text,
  highlight_id  uuid references public.highlights(id) on delete set null,
  front         text not null,
  back          text not null,
  tags          text[] not null default '{}',
  created_at    timestamptz not null default now()
);

create index if not exists flashcards_user_idx on public.flashcards (user_id);
create index if not exists flashcards_note_idx on public.flashcards (note_id);

alter table public.flashcards enable row level security;
drop policy if exists "flashcards self read"  on public.flashcards;
drop policy if exists "flashcards self write" on public.flashcards;
-- Read your own + all prebuilt templates (user_id is null on those).
create policy "flashcards self read"
  on public.flashcards for select
  using (auth.uid() = user_id or source_type = 'prebuilt');
create policy "flashcards self write"
  on public.flashcards for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- ---------- flashcard_reviews (SM-2 state per user per card) -----------------
create table if not exists public.flashcard_reviews (
  user_id          uuid not null references auth.users(id) on delete cascade,
  card_id          uuid not null references public.flashcards(id) on delete cascade,
  ease_factor      real not null default 2.5,
  interval_days    int  not null default 0,
  repetitions      int  not null default 0,
  due_date         date not null default current_date,
  last_reviewed_at timestamptz,
  last_quality     int,  -- 0..5 SM-2 quality rating
  primary key (user_id, card_id)
);

create index if not exists flashcard_reviews_due_idx
  on public.flashcard_reviews (user_id, due_date);

alter table public.flashcard_reviews enable row level security;
drop policy if exists "flashcard_reviews self all" on public.flashcard_reviews;
create policy "flashcard_reviews self all"
  on public.flashcard_reviews for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- =============================================================================
-- Done. After running this:
--   1. Authentication → Providers → enable Email + Google.
--   2. Authentication → URL Configuration → add your production URL +
--      https://YOUR-DOMAIN/auth/callback to redirect URLs.
-- =============================================================================
