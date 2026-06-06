-- =============================================================================
-- Paywall migration — adds subscription state to profiles + view tracking.
-- Run AFTER the main schema.sql. Idempotent — safe to re-run.
-- =============================================================================

-- ---------- Subscription columns on profiles --------------------------------
alter table public.profiles
  add column if not exists subscription_status text not null default 'free'
    check (subscription_status in ('free','active','trialing','past_due','canceled','incomplete')),
  add column if not exists subscription_plan text
    check (subscription_plan in ('monthly','yearly')),
  add column if not exists stripe_customer_id text unique,
  add column if not exists current_period_end timestamptz;

-- ---------- viewed_items: tracks what a free user has unlocked --------------
create table if not exists public.viewed_items (
  user_id   uuid not null references auth.users(id) on delete cascade,
  item_type text not null check (item_type in ('note','case')),
  item_id   text not null,
  viewed_at timestamptz not null default now(),
  primary key (user_id, item_type, item_id)
);

create index if not exists viewed_items_user_type_idx
  on public.viewed_items (user_id, item_type);

alter table public.viewed_items enable row level security;
drop policy if exists "viewed_items self all" on public.viewed_items;
create policy "viewed_items self all"
  on public.viewed_items for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- ---------- Grants ----------------------------------------------------------
grant select, insert, update, delete on public.viewed_items to authenticated;

-- =============================================================================
-- Manual operations you can run after this migration:
--
--  -- Grant yourself premium for testing:
--  update public.profiles
--     set subscription_status = 'active', subscription_plan = 'yearly'
--   where email = 'your-email@example.com';
--
--  -- See who's paid:
--  select email, subscription_status, subscription_plan, current_period_end
--    from public.profiles where subscription_status = 'active';
-- =============================================================================
