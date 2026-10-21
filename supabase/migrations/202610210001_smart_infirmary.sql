-- Smart Infirmary System — Supabase schema and least-privilege RLS
-- Run in Supabase SQL Editor as project owner. Do not disable RLS.
create extension if not exists pgcrypto;

create table if not exists public.staff_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null,
  role text not null check (role in ('admin','nurse','clinician','pharmacist','records')),
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create or replace function public.is_active_staff()
returns boolean language sql stable security definer
set search_path = public, auth
set row_security = off
as $$
  select exists (
    select 1 from public.staff_profiles p
    where p.user_id = (select auth.uid()) and p.active = true
  );
$$;

create or replace function public.has_staff_role(allowed_roles text[])
returns boolean language sql stable security definer
set search_path = public, auth
set row_security = off
as $$
  select exists (
    select 1 from public.staff_profiles p
    where p.user_id = (select auth.uid())
      and p.active = true
      and p.role = any(allowed_roles)
  );
$$;

revoke all on function public.is_active_staff() from public, anon;
revoke all on function public.has_staff_role(text[]) from public, anon;
grant execute on function public.is_active_staff() to authenticated;
grant execute on function public.has_staff_role(text[]) to authenticated;

create table if not exists public.patients (
  id uuid primary key default gen_random_uuid(),
  local_reference text unique,
  full_name text not null,
  patient_type text not null check (patient_type in ('Student','Staff')),
  grade_or_department text,
  date_of_birth date,
  gender text check (gender in ('M','F','Other','Prefer not to say')),
  allergies text[] not null default '{}',
  chronic_conditions text[] not null default '{}',
  emergency_contact_name text,
  emergency_contact_relationship text,
  emergency_contact_phone text,
  created_by uuid not null default auth.uid() references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.medical_visits (
  id uuid primary key default gen_random_uuid(),
  patient_id uuid not null references public.patients(id) on delete restrict,
  visited_at timestamptz not null default now(),
  chief_complaint text not null,
  temperature_c numeric(4,1),
  blood_pressure text,
  pulse_bpm integer,
  spo2_percent numeric(5,2),
  weight_kg numeric(6,2),
  treatment_notes text,
  dispensed_items jsonb not null default '[]'::jsonb,
  disposition text not null check (disposition in ('Returned to Class','Admitted to Resting Bed','Sent Home','Referred to Hospital')),
  bed_number text,
  referral_facility text,
  recorded_by uuid not null default auth.uid() references auth.users(id),
  created_at timestamptz not null default now()
);

create table if not exists public.inventory_items (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text not null,
  remaining_stock integer not null default 0 check (remaining_stock >= 0),
  minimum_level integer not null default 0 check (minimum_level >= 0),
  unit text not null,
  batch_number text not null,
  expiry_date date not null,
  supplier_name text,
  last_restocked date,
  updated_by uuid references auth.users(id),
  updated_at timestamptz not null default now()
);

create table if not exists public.referrals (
  id uuid primary key default gen_random_uuid(),
  visit_id uuid references public.medical_visits(id) on delete set null,
  patient_id uuid not null references public.patients(id) on delete restrict,
  hospital_name text not null,
  urgency text not null check (urgency in ('Emergency','Urgent','Routine')),
  reason_for_referral text not null,
  transport_mode text,
  parent_notified boolean not null default false,
  status text not null default 'Dispatched' check (status in ('Dispatched','Arrived at Facility','Completed')),
  referred_at timestamptz not null default now(),
  created_by uuid not null default auth.uid() references auth.users(id)
);

create index if not exists medical_visits_patient_id_idx on public.medical_visits(patient_id);
create index if not exists medical_visits_visited_at_idx on public.medical_visits(visited_at desc);
create index if not exists referrals_patient_id_idx on public.referrals(patient_id);
create index if not exists referrals_status_idx on public.referrals(status);
create index if not exists inventory_items_expiry_date_idx on public.inventory_items(expiry_date);

alter table public.staff_profiles enable row level security;
alter table public.patients enable row level security;
alter table public.medical_visits enable row level security;
alter table public.inventory_items enable row level security;
alter table public.referrals enable row level security;

-- Profiles are readable only by the profile owner and active administrators.
drop policy if exists "staff can read own profile or admins can read all" on public.staff_profiles;
create policy "staff can read own profile or admins can read all"
on public.staff_profiles for select to authenticated
using (user_id = (select auth.uid()) or public.has_staff_role(array['admin']));

-- No client-side INSERT/UPDATE/DELETE policies for staff_profiles: role assignment
-- is an administrator-only operation performed through the SQL editor or a trusted backend.

drop policy if exists "authorized staff read patients" on public.patients;
create policy "authorized staff read patients" on public.patients for select to authenticated
using (public.has_staff_role(array['admin','nurse','clinician','records']));
drop policy if exists "clinical staff create patients" on public.patients;
create policy "clinical staff create patients" on public.patients for insert to authenticated
with check (public.has_staff_role(array['admin','nurse','clinician']));
drop policy if exists "clinical staff update patients" on public.patients;
create policy "clinical staff update patients" on public.patients for update to authenticated
using (public.has_staff_role(array['admin','nurse','clinician']))
with check (public.has_staff_role(array['admin','nurse','clinician']));

drop policy if exists "authorized staff read visits" on public.medical_visits;
create policy "authorized staff read visits" on public.medical_visits for select to authenticated
using (public.has_staff_role(array['admin','nurse','clinician','records']));
drop policy if exists "clinical staff create visits" on public.medical_visits;
create policy "clinical staff create visits" on public.medical_visits for insert to authenticated
with check (public.has_staff_role(array['admin','nurse','clinician']));
drop policy if exists "clinical staff update visits" on public.medical_visits;
create policy "clinical staff update visits" on public.medical_visits for update to authenticated
using (public.has_staff_role(array['admin','nurse','clinician']))
with check (public.has_staff_role(array['admin','nurse','clinician']));

drop policy if exists "authorized staff read inventory" on public.inventory_items;
create policy "authorized staff read inventory" on public.inventory_items for select to authenticated
using (public.has_staff_role(array['admin','nurse','clinician','pharmacist','records']));
drop policy if exists "pharmacy staff add inventory" on public.inventory_items;
create policy "pharmacy staff add inventory" on public.inventory_items for insert to authenticated
with check (public.has_staff_role(array['admin','pharmacist']));
drop policy if exists "pharmacy staff update inventory" on public.inventory_items;
create policy "pharmacy staff update inventory" on public.inventory_items for update to authenticated
using (public.has_staff_role(array['admin','pharmacist']))
with check (public.has_staff_role(array['admin','pharmacist']));

drop policy if exists "authorized staff read referrals" on public.referrals;
create policy "authorized staff read referrals" on public.referrals for select to authenticated
using (public.has_staff_role(array['admin','nurse','clinician','records']));
drop policy if exists "clinical staff create referrals" on public.referrals;
create policy "clinical staff create referrals" on public.referrals for insert to authenticated
with check (public.has_staff_role(array['admin','nurse','clinician']));
drop policy if exists "clinical staff update referrals" on public.referrals;
create policy "clinical staff update referrals" on public.referrals for update to authenticated
using (public.has_staff_role(array['admin','nurse','clinician']))
with check (public.has_staff_role(array['admin','nurse','clinician']));

grant select on public.staff_profiles to authenticated;
grant select, insert, update on public.patients to authenticated;
grant select, insert, update on public.medical_visits to authenticated;
grant select, insert, update on public.inventory_items to authenticated;
grant select, insert, update on public.referrals to authenticated;

-- Create a Supabase Auth user in Dashboard > Authentication > Users first.
-- Then run this, replacing the UUID with that user's ID:
-- insert into public.staff_profiles (user_id, display_name, role)
-- values ('USER-UUID-HERE', 'Infirmary Administrator', 'admin');
