import { FormEvent, useEffect, useState } from 'react';
import type { Session } from '@supabase/supabase-js';
import { isSupabaseConfigured, supabase } from '../lib/supabase';

type StaffProfile = {
  user_id: string;
  display_name: string;
  role: 'admin' | 'nurse' | 'clinician' | 'pharmacist' | 'records';
  active: boolean;
};

export function AuthGate({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<StaffProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }

    let alive = true;
    const loadProfile = async (currentSession: Session | null) => {
      if (!alive) return;
      setSession(currentSession);
      setProfile(null);
      if (!currentSession) {
        setLoading(false);
        return;
      }
      const { data, error: profileError } = await supabase
        .from('staff_profiles')
        .select('user_id, display_name, role, active')
        .eq('user_id', currentSession.user.id)
        .maybeSingle();
      if (!alive) return;
      if (profileError) setError('Could not verify staff access. Confirm the database setup and try again.');
      else if (!data || !data.active) setError('This account is not authorized for the infirmary system. Contact the system administrator.');
      else {
        setError('');
        setProfile(data as StaffProfile);
      }
      setLoading(false);
    };

    supabase.auth.getSession().then(({ data }) => loadProfile(data.session));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      void loadProfile(nextSession);
    });
    return () => {
      alive = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  const signIn = async (event: FormEvent) => {
    event.preventDefault();
    if (!supabase) return;
    setBusy(true);
    setError('');
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    if (signInError) setError('Sign-in failed. Check your email and password or contact the system administrator.');
    setBusy(false);
  };

  const signOut = async () => {
    if (supabase) await supabase.auth.signOut();
    setProfile(null);
    setSession(null);
  };

  if (!isSupabaseConfigured || !supabase) {
    return <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-6"><div className="max-w-lg rounded-2xl border border-amber-800 bg-slate-900 p-6"><h1 className="text-xl font-bold">Supabase setup required</h1><p className="mt-3 text-sm text-slate-300">Add VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY to your local .env.local file and Vercel environment settings, then redeploy.</p></div></div>;
  }

  if (loading) return <div className="min-h-screen bg-slate-950 text-slate-200 flex items-center justify-center">Checking secure staff session…</div>;

  if (!session || !profile) {
    return <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-6"><form onSubmit={signIn} className="w-full max-w-md space-y-5 rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-2xl"><div><p className="text-xs font-semibold uppercase tracking-widest text-emerald-400">AfricAcademy · Arusha Science</p><h1 className="mt-2 text-2xl font-bold">Smart Infirmary System</h1><p className="mt-2 text-sm text-slate-400">Sign in with an authorized staff account.</p></div>{error && <p role="alert" className="rounded-lg border border-red-800 bg-red-950/60 p-3 text-sm text-red-200">{error}</p>}<label className="block text-sm text-slate-300">Staff email<input type="email" autoComplete="username" required value={email} onChange={e => setEmail(e.target.value)} className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-white outline-none focus:border-emerald-500" /></label><label className="block text-sm text-slate-300">Password<input type="password" autoComplete="current-password" required value={password} onChange={e => setPassword(e.target.value)} className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-white outline-none focus:border-emerald-500" /></label><button disabled={busy} className="w-full rounded-lg bg-emerald-600 px-4 py-3 font-semibold text-white disabled:opacity-60">{busy ? 'Signing in…' : 'Sign in securely'}</button><p className="text-xs leading-relaxed text-slate-500">Accounts are provisioned by the system administrator. Public self-registration is disabled.</p></form></div>;
  }

  return <><div className="flex items-center justify-end gap-3 border-b border-slate-800 bg-slate-900 px-4 py-2 text-xs text-slate-300"><span>{profile.display_name} · {profile.role}</span><button onClick={signOut} className="rounded-md border border-slate-700 px-3 py-1.5 hover:bg-slate-800">Sign out</button></div>{children}</>;
}
