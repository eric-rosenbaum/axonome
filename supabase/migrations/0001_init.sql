-- Axonome v1 schema
-- Run this against your Supabase project: `supabase db push` or paste in the SQL editor.

-- Profiles: one row per auth.users
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  name text,
  role text check (role in ('patient', 'loved-one', 'exploring')),
  disease text,
  onboarded_at timestamptz,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own"
  on public.profiles for select
  using (auth.uid() = id);

drop policy if exists "profiles_insert_own" on public.profiles;
create policy "profiles_insert_own"
  on public.profiles for insert
  with check (auth.uid() = id);

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- Auto-create a profile row when a new auth.user signs up
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id) values (new.id) on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Saved items: bookmarked content pages
create table if not exists public.saved_items (
  user_id uuid not null references auth.users(id) on delete cascade,
  content_slug text not null,
  saved_at timestamptz not null default now(),
  primary key (user_id, content_slug)
);

alter table public.saved_items enable row level security;

drop policy if exists "saved_items_select_own" on public.saved_items;
create policy "saved_items_select_own"
  on public.saved_items for select
  using (auth.uid() = user_id);

drop policy if exists "saved_items_insert_own" on public.saved_items;
create policy "saved_items_insert_own"
  on public.saved_items for insert
  with check (auth.uid() = user_id);

drop policy if exists "saved_items_delete_own" on public.saved_items;
create policy "saved_items_delete_own"
  on public.saved_items for delete
  using (auth.uid() = user_id);
