import React, { useEffect, useState } from 'react';
import { Activity, ArrowUpRight, Bed, ClipboardList, Package, Pill, RefreshCw, ShieldCheck, Users } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { InfirmaryTab } from './Navbar';

type Counts = { patients: number; visits: number; stock: number; referrals: number };

const emptyCounts: Counts = { patients: 0, visits: 0, stock: 0, referrals: 0 };

export const InfirmaryDashboard: React.FC<{ setActiveTab: (tab: InfirmaryTab) => void }> = ({ setActiveTab }) => {
  const [counts, setCounts] = useState<Counts>(emptyCounts);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  const refresh = async () => {
    if (!supabase) { setLoading(false); setMessage('Connect Supabase to show live dashboard totals.'); return; }
    setLoading(true);
    setMessage('');
    const [patients, visits, stock, referrals] = await Promise.all([
      supabase.from('patients').select('id', { count: 'exact', head: true }),
      supabase.from('medical_visits').select('id', { count: 'exact', head: true }),
      supabase.from('inventory_items').select('id', { count: 'exact', head: true }),
      supabase.from('referrals').select('id', { count: 'exact', head: true }),
    ]);
    const firstError = patients.error || visits.error || stock.error || referrals.error;
    if (firstError) setMessage('Some totals could not load. Check the database access policies and refresh.');
    setCounts({
      patients: patients.count ?? 0,
      visits: visits.count ?? 0,
      stock: stock.count ?? 0,
      referrals: referrals.count ?? 0,
    });
    setLoading(false);
  };

  useEffect(() => { void refresh(); }, []);

  const stats = [
    { label: 'Registered patients', value: counts.patients, icon: Users, color: 'text-cyan-300', bg: 'bg-cyan-500/10', tab: 'admissions' as InfirmaryTab },
    { label: 'Medical visits', value: counts.visits, icon: Activity, color: 'text-emerald-300', bg: 'bg-emerald-500/10', tab: 'admissions' as InfirmaryTab },
    { label: 'Inventory items', value: counts.stock, icon: Package, color: 'text-violet-300', bg: 'bg-violet-500/10', tab: 'inventory' as InfirmaryTab },
    { label: 'Hospital referrals', value: counts.referrals, icon: ArrowUpRight, color: 'text-rose-300', bg: 'bg-rose-500/10', tab: 'referrals' as InfirmaryTab },
  ];

  const actions = [
    { title: 'Medical admissions', detail: 'Register a patient and record a visit', icon: ClipboardList, tab: 'admissions' as InfirmaryTab },
    { title: 'Medicine inventory', detail: 'Check stock levels and update items', icon: Pill, tab: 'inventory' as InfirmaryTab },
    { title: 'Hospital referrals', detail: 'Review and manage patient referrals', icon: ArrowUpRight, tab: 'referrals' as InfirmaryTab },
    { title: 'Reports & analytics', detail: 'Open infirmary reports and planning', icon: Activity, tab: 'reports' as InfirmaryTab },
    { title: 'Compliance & team', detail: 'Review system guidance and risks', icon: ShieldCheck, tab: 'compliance' as InfirmaryTab },
    { title: 'Master system guide', detail: 'View the specification and prompt hub', icon: Bed, tab: 'prompt' as InfirmaryTab },
  ];

  return (
    <div className="mx-auto w-full max-w-7xl space-y-7 px-4 py-7 sm:px-6 lg:px-8">
      <section className="overflow-hidden rounded-3xl border border-blue-800/50 bg-gradient-to-br from-blue-950 via-slate-900 to-slate-900 p-6 shadow-2xl sm:p-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-2xl">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-700/60 bg-emerald-950/60 px-3 py-1 text-xs font-semibold text-emerald-300">
              <span className="h-2 w-2 rounded-full bg-emerald-400" /> ADMIN WORKSPACE
            </div>
            <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl">Infirmary Dashboard</h1>
            <p className="mt-3 text-sm leading-6 text-slate-300 sm:text-base">A clear overview of patient records, medical visits, medicine stock and hospital referrals.</p>
          </div>
          <button onClick={() => void refresh()} disabled={loading} className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-slate-600 bg-slate-800 px-4 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-slate-700 disabled:opacity-60">
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} /> Refresh totals
          </button>
        </div>
      </section>

      {message && <div role="status" className="rounded-xl border border-amber-700/60 bg-amber-950/40 px-4 py-3 text-sm text-amber-200">{message}</div>}

      <section aria-label="Live system totals" className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(({ label, value, icon: Icon, color, bg, tab }) => (
          <button key={label} onClick={() => setActiveTab(tab)} className="group rounded-2xl border border-slate-800 bg-slate-900 p-5 text-left shadow-lg transition hover:-translate-y-0.5 hover:border-blue-700/70 hover:bg-slate-900/90 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <div className="flex items-start justify-between gap-3">
              <span className="text-sm font-medium text-slate-400">{label}</span>
              <span className={`rounded-xl p-2.5 ${bg} `}><Icon className={`h-5 w-5 ${color}`} /></span>
            </div>
            <div className="mt-4 flex items-end justify-between">
              <span className="text-4xl font-black tabular-nums text-white">{loading ? '—' : value}</span>
              <span className="text-xs text-slate-500 group-hover:text-blue-300">Open section ↗</span>
            </div>
          </button>
        ))}
      </section>

      <section>
        <div className="mb-4 flex items-end justify-between gap-3">
          <div><h2 className="text-xl font-bold text-white">Quick actions</h2><p className="mt-1 text-sm text-slate-400">Go directly to the main tasks.</p></div>
          <span className="hidden items-center gap-1.5 text-xs text-emerald-300 sm:flex"><ShieldCheck className="h-4 w-4" /> Secure staff access</span>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {actions.map(({ title, detail, icon: Icon, tab }) => (
            <button key={title} onClick={() => setActiveTab(tab)} className="flex min-h-28 items-center gap-4 rounded-2xl border border-slate-800 bg-slate-900/80 p-5 text-left transition hover:border-blue-700/70 hover:bg-slate-800/80 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <span className="rounded-xl border border-slate-700 bg-slate-950 p-3"><Icon className="h-5 w-5 text-blue-300" /></span>
              <span className="min-w-0 flex-1"><span className="block font-bold text-white">{title}</span><span className="mt-1 block text-sm leading-5 text-slate-400">{detail}</span></span>
              <ArrowUpRight className="h-4 w-4 shrink-0 text-slate-500" />
            </button>
          ))}
        </div>
      </section>
      <p className="text-xs text-slate-500">Totals are read from the connected database and depend on the signed-in staff member's access policies.</p>
    </div>
  );
};
