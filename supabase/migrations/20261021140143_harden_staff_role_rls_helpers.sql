create schema if not exists private;
revoke all on schema private from public, anon;
grant usage on schema private to authenticated;
create or replace function private.has_staff_role(allowed_roles text[])
returns boolean language sql stable security definer set search_path = '' as $$
 select (select auth.uid()) is not null and exists (
   select 1 from public.staff_profiles p
   where p.user_id = (select auth.uid()) and p.active = true and p.role = any(allowed_roles)
 );
$$;
revoke all on function private.has_staff_role(text[]) from public, anon;
grant execute on function private.has_staff_role(text[]) to authenticated;
drop policy if exists "staff can read own profile or admins can read all" on public.staff_profiles;
create policy "staff can read own profile or admins can read all" on public.staff_profiles for select to authenticated using (user_id = (select auth.uid()) or private.has_staff_role(array['admin']));
drop policy if exists "authorized staff read patients" on public.patients;
create policy "authorized staff read patients" on public.patients for select to authenticated using (private.has_staff_role(array['admin','nurse','clinician','records']));
drop policy if exists "clinical staff create patients" on public.patients;
create policy "clinical staff create patients" on public.patients for insert to authenticated with check (private.has_staff_role(array['admin','nurse','clinician']));
drop policy if exists "clinical staff update patients" on public.patients;
create policy "clinical staff update patients" on public.patients for update to authenticated using (private.has_staff_role(array['admin','nurse','clinician'])) with check (private.has_staff_role(array['admin','nurse','clinician']));
drop policy if exists "authorized staff read visits" on public.medical_visits;
create policy "authorized staff read visits" on public.medical_visits for select to authenticated using (private.has_staff_role(array['admin','nurse','clinician','records']));
drop policy if exists "clinical staff create visits" on public.medical_visits;
create policy "clinical staff create visits" on public.medical_visits for insert to authenticated with check (private.has_staff_role(array['admin','nurse','clinician']));
drop policy if exists "clinical staff update visits" on public.medical_visits;
create policy "clinical staff update visits" on public.medical_visits for update to authenticated using (private.has_staff_role(array['admin','nurse','clinician'])) with check (private.has_staff_role(array['admin','nurse','clinician']));
drop policy if exists "authorized staff read inventory" on public.inventory_items;
create policy "authorized staff read inventory" on public.inventory_items for select to authenticated using (private.has_staff_role(array['admin','nurse','clinician','pharmacist','records']));
drop policy if exists "pharmacy staff add inventory" on public.inventory_items;
create policy "pharmacy staff add inventory" on public.inventory_items for insert to authenticated with check (private.has_staff_role(array['admin','pharmacist']));
drop policy if exists "pharmacy staff update inventory" on public.inventory_items;
create policy "pharmacy staff update inventory" on public.inventory_items for update to authenticated using (private.has_staff_role(array['admin','pharmacist'])) with check (private.has_staff_role(array['admin','pharmacist']));
drop policy if exists "authorized staff read referrals" on public.referrals;
create policy "authorized staff read referrals" on public.referrals for select to authenticated using (private.has_staff_role(array['admin','nurse','clinician','records']));
drop policy if exists "clinical staff create referrals" on public.referrals;
create policy "clinical staff create referrals" on public.referrals for insert to authenticated with check (private.has_staff_role(array['admin','nurse','clinician']));
drop policy if exists "clinical staff update referrals" on public.referrals;
create policy "clinical staff update referrals" on public.referrals for update to authenticated using (private.has_staff_role(array['admin','nurse','clinician'])) with check (private.has_staff_role(array['admin','nurse','clinician']));
drop function if exists public.has_staff_role(text[]);
