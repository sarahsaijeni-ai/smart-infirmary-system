import React from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Activity, 
  Users, 
  Pill, 
  ArrowUpRight, 
  Bed, 
  FileCheck2, 
  Calendar,
  AlertCircle
} from 'lucide-react';
import { InventoryItem, MedicalVisit } from '../data/infirmaryData';

interface ReportsProps {
  inventory: InventoryItem[];
}

export const InfirmaryReports: React.FC<ReportsProps> = ({ inventory }) => {
  const commonComplaints = [
    { complaint: 'Headaches & Migraines', count: 42, percent: 35 },
    { complaint: 'High Fever / Suspected Malaria', count: 28, percent: 23 },
    { complaint: 'Sports Injuries & Abrasions', count: 24, percent: 20 },
    { complaint: 'Stomach Pain & Cramps', count: 16, percent: 13 },
    { complaint: 'Respiratory / Asthma Flare', count: 11, percent: 9 }
  ];

  const planningTimes = [
    { activity: 'Registration & Check-in', time: '2–5 minutes', description: 'Patient identification, digital record lookup' },
    { activity: 'Basic Clinical Assessment', time: '5–15 minutes', description: 'Vitals check (Temp, BP, Pulse, SpO2), complaint history' },
    { activity: 'Minor First Aid / Treatment', time: '5–20 minutes', description: 'Dressing abrasions, administering oral medications' },
    { activity: 'Record & Stock Balance Update', time: '2–5 minutes', description: 'Automated digital inventory decrement and note saving' },
    { activity: 'Resting Bed Follow-up', time: '5–10 minutes', description: 'Re-evaluating patient in infirmary resting area' },
    { activity: 'Hospital Referral Preparation', time: '10–20+ minutes', description: 'Emergency transport coordination, parent contact, clinical handover' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-purple-400" />
            <h1 className="text-xl sm:text-2xl font-bold text-white">
              Infirmary Analytics & Management Reports
            </h1>
          </div>
          <p className="text-xs text-slate-400">
            Section 7F Reports & Section 14 Service Administration Planning Guidelines (AfricAcademy Arusha Science).
          </p>
        </div>

        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-950 text-purple-300 border border-purple-700/60">
          Executive & Clinical Insights
        </span>
      </div>

      {/* Top Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-slate-400">Total Visits (Term 1)</span>
          <div className="text-2xl font-bold text-white font-mono">121</div>
          <span className="text-[10px] text-emerald-400 font-medium">92% return to class rate</span>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-slate-400">Resting Bed Admissions</span>
          <div className="text-2xl font-bold text-cyan-400 font-mono">18</div>
          <span className="text-[10px] text-slate-400">Avg. stay: 45 minutes</span>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-slate-400">External Referrals</span>
          <div className="text-2xl font-bold text-red-400 font-mono">5</div>
          <span className="text-[10px] text-red-300">Transferred to ALMC / Mt. Meru</span>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-slate-400">Medicines Tracked</span>
          <div className="text-2xl font-bold text-emerald-400 font-mono">{inventory.length}</div>
          <span className="text-[10px] text-emerald-400">Active automated stock deduction</span>
        </div>
      </div>

      {/* Common Complaints Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <span>Common Student & Staff Complaints</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Epidemiological breakdown helping school leadership make health decisions
            </p>
          </div>

          <div className="space-y-3">
            {commonComplaints.map((item, idx) => (
              <div key={idx} className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-200 font-semibold">{item.complaint}</span>
                  <span className="font-mono text-slate-400">{item.count} cases ({item.percent}%)</span>
                </div>
                <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden border border-slate-800">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-emerald-400 rounded-full"
                    style={{ width: `${item.percent * 2}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 14: Service Administration Time Guidelines */}
        <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Calendar className="w-4 h-4 text-blue-400" />
              <span>Section 14: Service Administration Planning Estimates</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Planning benchmarks for infirmary health workers (Actual care time guided by medical necessity)
            </p>
          </div>

          <div className="space-y-2.5">
            {planningTimes.map((item, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-white block">{item.activity}</span>
                  <span className="text-[11px] text-slate-400">{item.description}</span>
                </div>
                <span className="px-2.5 py-1 rounded bg-blue-950 text-blue-300 font-mono font-bold text-[11px] shrink-0">
                  {item.time}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
