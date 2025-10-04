-- Supabase schema for campus placement portal dashboards
-- Run this script with the Supabase CLI: `supabase db push`

-- Extensions -----------------------------------------------------------------
create extension if not exists "pgcrypto";

-- Custom ENUM Types ----------------------------------------------------------
create type if not exists trend_type as enum ('up', 'down', 'neutral');

-- Dashboard Stats Table ------------------------------------------------------
create table if not exists dashboard_stats (
  id uuid primary key default gen_random_uuid(),
  role text not null check (role in ('student', 'mentor', 'employer', 'placement', 'admin')),
  label text not null,
  value_text text,
  value_numeric numeric,
  delta text,
  trend trend_type not null default 'neutral',
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  constraint dashboard_stats_value_check check (value_text is not null or value_numeric is not null)
);

create unique index if not exists dashboard_stats_role_label_idx on dashboard_stats(role, label);
create index if not exists dashboard_stats_role_idx on dashboard_stats(role);

alter table dashboard_stats enable row level security;

create policy if not exists "dashboard_stats_select" on dashboard_stats
  for select using (auth.role() = 'authenticated');

create policy if not exists "dashboard_stats_insert" on dashboard_stats
  for insert with check (auth.role() = 'authenticated');

create policy if not exists "dashboard_stats_update" on dashboard_stats
  for update using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy if not exists "dashboard_stats_delete" on dashboard_stats
  for delete using (auth.role() = 'authenticated');

-- Placement Drives Table -----------------------------------------------------
create table if not exists placement_drives (
  id uuid primary key default gen_random_uuid(),
  company text not null,
  stage text not null,
  drive_date date not null,
  location text,
  notes text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create unique index if not exists placement_drives_company_date_idx on placement_drives(company, drive_date);
create index if not exists placement_drives_drive_date_idx on placement_drives(drive_date desc);

alter table placement_drives enable row level security;

create policy if not exists "placement_drives_select" on placement_drives
  for select using (auth.role() = 'authenticated');

create policy if not exists "placement_drives_insert" on placement_drives
  for insert with check (auth.role() = 'authenticated');

create policy if not exists "placement_drives_update" on placement_drives
  for update using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy if not exists "placement_drives_delete" on placement_drives
  for delete using (auth.role() = 'authenticated');
