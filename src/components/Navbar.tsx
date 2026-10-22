import React from 'react';
import {
  Activity, ArrowUpRight, BarChart3, FileCheck2, FileText, HeartPulse, Home,
  Pill, ShieldCheck
} from 'lucide-react';

export type InfirmaryTab = 'dashboard' | 'prompt' | 'admissions' | 'inventory' | 'referrals' | 'reports' | 'compliance';

interface NavbarProps {
  activeTab: InfirmaryTab;
  setActiveTab: (tab: InfirmaryTab) => void;
  lowStockCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, lowStockCount }) => {
  const tabs: { id: InfirmaryTab; label: string; icon: React.ComponentType<{ className?: string }>; color: string }[] = [
    { id: 'dashboard', label: 'Admin Dashboard', icon: Home, color: 'text-cyan-300' },
    { id: 'admissions', label: 'Medical Admissions', icon: Activity, color: 'text-emerald-400' },
    { id: 'inventory', label: 'Medicine Inventory', icon: Pill, color: 'text-violet-400' },
    { id: 'referrals', label: 'Hospital Referrals', icon: ArrowUpRight, color: 'text-rose-400' },
    { id: 'reports', label: 'Reports & Analytics', icon: BarChart3, color: 'text-cyan-400' },
    { id: 'compliance', label: 'Compliance & Team', icon: FileCheck2, color: 'text-amber-400' },
    { id: 'prompt', label: 'System Guide', icon: FileText, color: 'text-blue-400' },
  ];
  return (
    <header className="sticky top-0 z-50 border-b border-blue-900/40 bg-slate-900/95 text-slate-100 shadow-xl backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-16 items-center justify-between gap-4 py-3">
          <button onClick={() => setActiveTab('dashboard')} className="flex min-w-0 items-center gap-3 text-left" aria-label="Go to admin dashboard">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 shadow-lg ring-1 ring-blue-400/40">
              <HeartPulse className="h-6 w-6 text-white" />
            </span>
            <span className="min-w-0">
              <span className="block truncate text-base font-extrabold tracking-tight text-white sm:text-lg">Smart School Infirmary</span>
              <span className="hidden text-[11px] text-slate-400 sm:block">AfricAcademy Arusha Science · Health Management</span>
            </span>
          </button>
          <div className="flex shrink-0 items-center gap-2">
            {lowStockCount > 0 && <span className="rounded-lg border border-amber-800 bg-amber-950 px-2.5 py-1 text-xs font-semibold text-amber-300">{lowStockCount} low stock</span>}
            <span className="hidden items-center gap-1.5 rounded-lg border border-emerald-800 bg-emerald-950 px-3 py-1.5 text-xs font-semibold text-emerald-300 sm:flex"><ShieldCheck className="h-3.5 w-3.5" /> Secure access</span>
          </div>
        </div>
        <nav aria-label="Main navigation" className="flex gap-1 overflow-x-auto border-t border-slate-800 py-2 text-sm">
          {tabs.map(({ id, label, icon: Icon, color }) => (
            <button key={id} onClick={() => setActiveTab(id)} aria-current={activeTab === id ? 'page' : undefined}
              className={`inline-flex shrink-0 items-center gap-2 rounded-xl border px-3 py-2 font-semibold transition focus:outline-none focus:ring-2 focus:ring-blue-500 ${activeTab === id ? 'border-blue-500/60 bg-blue-600/20 text-white' : 'border-transparent text-slate-300 hover:border-slate-700 hover:bg-slate-800 hover:text-white'}`}>
              <Icon className={`h-4 w-4 ${color}`} /><span>{label}</span>
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
};
