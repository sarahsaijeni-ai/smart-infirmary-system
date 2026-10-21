# Supabase setup for Smart Infirmary System

This repository is a Vite + React single-page application, not a Next.js App Router project. Therefore, the Next.js `page.tsx`, `cookies()`, and middleware snippets are not compatible with this app. Supabase's browser client handles session persistence and token refresh for this SPA.

1. Copy `.env.example` to `.env.local` and set `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY`. Never commit `.env.local`.
2. In the Supabase SQL Editor, run `supabase/migrations/202610210001_smart_infirmary.sql`.
3. In Supabase Dashboard > Authentication > Users, create each staff login (disable public sign-ups in Auth settings).
4. Copy each auth user's UUID and run an INSERT into `public.staff_profiles` using the commented example at the end of the migration. Assign only the minimum role required.
5. Add the same two Vite environment variables to Vercel Project Settings > Environment Variables for Production, Preview, and Development. Redeploy after adding them.
6. Test with an authorized account and confirm an account without an active staff profile is denied.

## Security
- Only the publishable key belongs in browser code. Never use a secret/service_role key in this app.
- RLS is enabled on every application table. No anonymous policies are created.
- Profile role changes are not permitted through client policies.
- This schema provides database security and a secure sign-in gate. Existing inventory/referral UI still uses its current React state/demo records; feature-by-feature database read/write wiring and migration of demo records is a separate integration step before the app should be used for real clinical records.
- Use test data until access controls, backups, and clinical workflows have been reviewed. Do not store real patient data until your institution approves the deployment and privacy controls.
