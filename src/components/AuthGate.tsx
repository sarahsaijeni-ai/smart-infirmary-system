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
  const [displayName, setDisplayName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [busy, setBusy] = useState(false);
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [registrationOpen, setRegistrationOpen] = useState(false);

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }

    let alive = true;
    const checkInitialRegistration = async () => {
      const { data, error: registrationError } = await supabase.rpc('is_initial_admin_registration_open');
      if (!alive) return;
      setRegistrationOpen(!registrationError && data === true);
    };
    void checkInitialRegistration();

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
      else if (!data || !data.active) setError('This account is not authorized for the infirmary system. Only the first registered account becomes administrator; later staff accounts must be created by an administrator.');
      else {
        setError('');
        setProfile(data as StaffProfile);
      }
      setLoading(false);
    };

    void supabase.auth.getSession().then(({ data }) => loadProfile(data.session));
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
    setNotice('');
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    if (signInError) setError('Sign-in failed. Check your email and password. If this is the first setup, choose “Create first administrator account” instead.');
    setBusy(false);
  };

  const signUp = async (event: FormEvent) => {
    event.preventDefault();
    if (!supabase) return;
    setBusy(true);
    setError('');
    setNotice('');

    // Re-check on the server immediately before registration. The database trigger
    // atomically grants administrator access only to the first staff profile.
    const { data: open, error: checkError } = await supabase.rpc('is_initial_admin_registration_open');
    if (checkError || open !== true) {
      setRegistrationOpen(false);
      setMode('signin');
      setError('First-admin registration has already closed. Please sign in or ask the administrator to create your staff account.');
      setBusy(false);
      return;
    }

    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { display_name: displayName.trim() } },
    });

    if (signUpError) {
      setError(signUpError.message);
    } else {
      setRegistrationOpen(false);
      setMode('signin');
      setPassword('');
      setNotice(
        data.session
          ? 'Your administrator account was created. You can now access the system.'
          : 'Registration submitted. Check your email for the Supabase confirmation link, then return here and sign in. This first account is assigned the administrator role automatically.'
      );
    }
    setBusy(false);
  };

  const signOut = async () => {
    if (supabase) await supabase.auth.signOut();
    setProfile(null);
    setSession(null);
  };

  if (!isSupabaseConfigured || !supabase) {
    return <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-6"><div className="max-w-lg rounded-2xl border border-amber-800 bg-slate-900 p-6"><h1 className="text-xl font-bold">Supabase setup required</h1><p className="mt-3 text-sm text-slate-300">Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY to your Netlify environment variables, then trigger a new deploy. For local development, put the same names in .env.local.</p></div></div>;
  }

  if (loading) return <div className="min-h-screen bg-slate-950 text-slate-200 flex items-center justify-center">Checking secure staff session…</div>;

  if (!session || !profile) {
    return <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-6"><form onSubmit={mode === 'signup' ? signUp : signIn} className="w-full max-w-md space-y-5 rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-2xl">
      <div><p className="text-xs font-semibold uppercase tracking-widest text-emerald-400">AfricAcademy · Arusha Science</p><h1 className="mt-2 text-2xl font-bold">Smart Infirmary System</h1><p className="mt-2 text-sm text-slate-400">{mode === 'signup' ? 'Create the first account. The first registered account becomes the system administrator.' : 'Sign in with your authorized staff account.'}</p></div>
      {error && <p role="alert" className="rounded-lg border border-red-800 bg-red-950/60 p-3 text-sm text-red-200">{error}</p>}
      {notice && <p role="status" className="rounded-lg border border-emerald-800 bg-emerald-950/50 p-3 text-sm text-emerald-200">{notice}</p>}
      {mode === 'signup' && <label className="block text-sm text-slate-300">Full name<input type="text" autoComplete="name" required minLength={2} value={displayName} onChange={e => setDisplayName(e.target.value)} className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-white outline-none focus:border-emerald-500" /></label>}
      <label className="block text-sm text-slate-300">Email address<input type="email" autoComplete="username" required value={email} onChange={e => setEmail(e.target.value)} className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-white outline-none focus:border-emerald-500" /></label>
      <label className="block text-sm text-slate-300">Password<input type="password" autoComplete={mode === 'signup' ? 'new-password' : 'current-password'} required minLength={mode === 'signup' ? 8 : undefined} value={password} onChange={e => setPassword(e.target.value)} className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-white outline-none focus:border-emerald-500" />{mode === 'signup' && <span className="mt-1 block text-xs text-slate-500">Use at least 8 characters.</span>}</label>
      <button disabled={busy} className="w-full rounded-lg bg-emerald-600 px-4 py-3 font-semibold text-white disabled:opacity-60">{busy ? (mode === 'signup' ? 'Creating account…' : 'Signing in…') : (mode === 'signup' ? 'Create administrator account' : 'Sign in securely')}</button>
      {mode === 'signin' && registrationOpen && <p className="text-center text-sm text-slate-400">First time setting up this system? <button type="button" onClick={() => { setMode('signup'); setError(''); setNotice(''); }} className="font-semibold text-emerald-400 hover:text-emerald-300">Create first administrator account</button></p>}
      {mode === 'signup' && <p className="text-center text-sm text-slate-400">Already registered? <button type="button" onClick={() => { setMode('signin'); setError(''); setNotice(''); }} className="font-semibold text-emerald-400 hover:text-emerald-300">Back to sign in</button></p>}
      {mode === 'signin' && !registrationOpen && <p className="text-xs leading-relaxed text-slate-500">First-admin registration is closed. Ask the system administrator to create any additional staff accounts.</p>}
      {mode === 'signup' && <p className="text-xs leading-relaxed text-slate-500">For security, public registration closes after the first account is created. That account receives the administrator role automatically; later accounts must be provisioned by the administrator.</p>}
    </form></div>;
  }

  return <><div className="flex items-center justify-end gap-3 border-b border-slate-800 bg-slate-900 px-4 py-2 text-xs text-slate-300"><span>{profile.display_name} · {profile.role}</span><button onClick={signOut} className="rounded-md border border-slate-700 px-3 py-1.5 hover:bg-slate-800">Sign out</button></div>{children}</>;
}
