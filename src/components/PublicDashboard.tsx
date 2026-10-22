import React from 'react';
import { Activity, ArrowUpRight, Bed, ClipboardList, Package, Pill, ShieldCheck, Users } from 'lucide-react';

const stats = [
  { label: 'Registered patients', value: '0', detail: 'No records after reset', icon: Users, color: 'text-cyan-300', bg: 'bg-cyan-500/10' },
  { label: 'Medical visits', value: '0', detail: 'No records after reset', icon: Activity, color: 'text-emerald-300', bg: 'bg-emerald-500/10' },
  { label: 'Inventory items', value: '0', detail: 'No records after reset', icon: Package, color: 'text-violet-300', bg: 'bg-violet-500/10' },
  { label: 'Hospital referrals', value: '0', detail: 'No records after reset', icon: ArrowUpRight, color: 'text-rose-300', bg: 'bg-rose-500/10' },
];

const areas = [
  { title: 'Medical admissions', detail: 'Patient registration and clinical visit records', icon: ClipboardList },
  { title: 'Medicine inventory', detail: 'Medicine stock and expiry tracking', icon: Pill },
  { title: 'Hospital referrals', detail: 'Referral coordination and follow-up', icon: ArrowUpRight },
  { title: 'Reports & analytics', detail: 'Infirmary service summaries and trends', icon: Activity },
  { title: 'Staff access & compliance', detail: 'Role-based access and operating guidance', icon: ShieldCheck },
  { title: 'Rest and observation', detail: 'Support for infirmary bed and observation workflows', icon: Bed },
];

export default function PublicDashboard() {
  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-100">
      <header className="border-b border-blue-900/50 bg-slate-900/95 shadow-xl">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 ring-1 ring-blue-400/40">
            <Activity className="h-6 w-6 text-white" />
          </div>
          <div className="min-w-0 flex-1">
            <h1 className="truncate text-lg font-extrabold sm:text-xl">Smart School Infirmary</h1>
            <p className="text-xs text-slate-400">AfricAcademy Arusha Science · Management dashboard</p>
          </div>
          <span className="hidden items-center gap-1.5 rounded-lg border border-amber-700/60 bg-amber-950/50 px-3 py-2 text-xs font-semibold text-amber-200 sm:flex">
            <span className="h-2 w-2 rounded-full bg-amber-400" /> Dashboard preview
          </span>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl space-y-7 px-4 py-7 sm:px-6 lg:px-8">
        <section className="overflow-hidden rounded-3xl border border-blue-800/50 bg-gradient-to-br from-blue-950 via-slate-900 to-slate-900 p-6 shadow-2xl sm:p-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-700/60 bg-emerald-950/60 px-3 py-1 text-xs font-semibold text-emerald-300">
            <ShieldCheck className="h-4 w-4" /> DIRECT DASHBOARD ACCESS
          </div>
          <h2 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl">Infirmary Dashboard</h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">The dashboard is available without a login screen while setup is being completed. The database was reset, so all displayed totals start at zero.</p>
        </section>

        <section aria-label="Database totals" className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map(({ label, value, detail, icon: Icon, color, bg }) => (
            <article key={label} className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-lg">
              <div className="flex items-start justify-between gap-3">
                <span className="text-sm font-medium text-slate-400">{label}</span>
                <span className={`rounded-xl p-2.5 ${bg}`}><Icon className={`h-5 w-5 ${color}`} /></span>
              </div>
              <div className="mt-4 text-4xl font-black tabular-nums text-white">{value}</div>
              <p className="mt-2 text-xs text-slate-500">{detail}</p>
            </article>
          ))}
        </section>

        <section>
          <h2 className="text-xl font-bold text-white">System modules</h2>
          <p className="mt-1 text-sm text-slate-400">Main areas available in the full staff application.</p>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {areas.map(({ title, detail, icon: Icon }) => (
              <article key={title} className="flex min-h-28 items-center gap-4 rounded-2xl border border-slate-800 bg-slate-900/80 p-5">
                <span className="rounded-xl border border-slate-700 bg-slate-950 p-3"><Icon className="h-5 w-5 text-blue-300" /></span>
                <span><span className="block font-bold text-white">{title}</span><span className="mt-1 block text-sm leading-5 text-slate-400">{detail}</span></span>
              </article>
            ))}
          </div>
        </section>

        <aside className="rounded-2xl border border-amber-800/60 bg-amber-950/30 p-4 text-sm leading-6 text-amber-100">
          <strong>Setup mode:</strong> Login has been bypassed for this dashboard view only. Patient and staff data access remains protected by database policies. Do not enter real patient information until secure staff sign-in is restored.
        </aside>
      </main>
      <footer className="border-t border-slate-800 bg-slate-900/60 px-4 py-5 text-center text-xs text-slate-500">Smart School Infirmary System · AfricAcademy Arusha Science</footer>
    </div>
  );
}
