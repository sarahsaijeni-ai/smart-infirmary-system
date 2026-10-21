import React from 'react';
import { 
  Building2, 
  Activity, 
  Pill, 
  ArrowUpRight, 
  BarChart3, 
  FileCheck2, 
  FileText, 
  Sparkles, 
  ShieldCheck,
  HeartPulse
} from 'lucide-react';

export type InfirmaryTab = 
  | 'prompt'
  | 'admissions' 
  | 'inventory' 
  | 'referrals' 
  | 'reports' 
  | 'compliance';

interface NavbarProps {
  activeTab: InfirmaryTab;
  setActiveTab: (tab: InfirmaryTab) => void;
  lowStockCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  lowStockCount
}) => {
  return (
    <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-blue-900/40 text-slate-100 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header */}
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo & School Branding */}
          <div 
            className="flex items-center gap-3 cursor-pointer shrink-0" 
            onClick={() => setActiveTab('prompt')}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center shadow-blue-500/20 shadow-lg ring-1 ring-blue-400/40">
              <HeartPulse className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-300 bg-clip-text text-transparent">
                  Smart School Infirmary
                </span>
                <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-blue-950/90 text-blue-300 border border-blue-600/50 rounded-full">
                  AfricAcademy Arusha Science
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                Health & Information Management System
              </p>
            </div>
          </div>

          {/* Quick Status Badges */}
          <div className="flex items-center gap-2">
            {lowStockCount > 0 && (
              <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-amber-950 text-amber-300 border border-amber-800 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                <span>{lowStockCount} Items Low Stock</span>
              </span>
            )}
            <span className="px-3 py-1 rounded-lg text-xs font-semibold bg-emerald-950 text-emerald-300 border border-emerald-800 hidden sm:flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>RBAC Active</span>
            </span>
          </div>

        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 overflow-x-auto py-2 scrollbar-none border-t border-slate-800 text-xs font-medium">
          
          <button
            onClick={() => setActiveTab('prompt')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
              activeTab === 'prompt'
                ? 'bg-blue-600/20 text-blue-300 border border-blue-500/40 font-bold'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <FileText className="w-4 h-4 text-blue-400" />
            <span>Master Prompt & SRS (Price-Free)</span>
          </button>

          <button
            onClick={() => setActiveTab('admissions')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
              activeTab === 'admissions'
                ? 'bg-blue-600/20 text-blue-300 border border-blue-500/40 font-bold'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Activity className="w-4 h-4 text-emerald-400" />
            <span>Medical Admissions & Triage</span>
          </button>

          <button
            onClick={() => setActiveTab('inventory')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
              activeTab === 'inventory'
                ? 'bg-blue-600/20 text-blue-300 border border-blue-500/40 font-bold'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Pill className="w-4 h-4 text-purple-400" />
            <span>Inventory & Automated Stock</span>
          </button>

          <button
            onClick={() => setActiveTab('referrals')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
              activeTab === 'referrals'
                ? 'bg-blue-600/20 text-blue-300 border border-blue-500/40 font-bold'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <ArrowUpRight className="w-4 h-4 text-red-400" />
            <span>Hospital Referrals (Sec 7A)</span>
          </button>

          <button
            onClick={() => setActiveTab('reports')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
              activeTab === 'reports'
                ? 'bg-blue-600/20 text-blue-300 border border-blue-500/40 font-bold'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <BarChart3 className="w-4 h-4 text-cyan-400" />
            <span>Reports & Time Guidelines</span>
          </button>

          <button
            onClick={() => setActiveTab('compliance')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
              activeTab === 'compliance'
                ? 'bg-blue-600/20 text-blue-300 border border-blue-500/40 font-bold'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <FileCheck2 className="w-4 h-4 text-amber-400" />
            <span>Compliance, Team & Risks</span>
          </button>

        </div>
      </div>
    </header>
  );
};
