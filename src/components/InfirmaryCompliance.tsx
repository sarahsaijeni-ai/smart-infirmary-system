import React from 'react';
import { 
  FileCheck2, 
  ShieldCheck, 
  AlertTriangle, 
  Calendar, 
  Building2, 
  Lock, 
  CheckCircle2, 
  Clock,
  Sparkles
} from 'lucide-react';
import { INITIAL_COMPLIANCE } from '../data/infirmaryData';

export const InfirmaryCompliance: React.FC = () => {
  const risksAndSolutions = [
    { risk: 'Medicine stock-outs', solution: 'Automated minimum stock reorder thresholds & dashboard alerts' },
    { risk: 'Expired medicines', solution: 'Batch expiry date monitoring & active quarantine flagging' },
    { risk: 'Data loss', solution: 'Encrypted regular automated backups & offline local persistence' },
    { risk: 'Unauthorized medical record access', solution: 'Strict Role-Based Access Control (RBAC) & user permissions' },
    { risk: 'Power failure', solution: 'Uninterruptible Power Supply (UPS) & backup battery system' },
    { risk: 'Lack of qualified staff', solution: 'Mandatory clinical recruitment standards & RN/CO licensing' },
    { risk: 'Serious medical emergencies', solution: 'Formal stabilization protocols & urgent hospital referral pipelines' },
    { risk: 'Limited resources', solution: 'Phased implementation (Essential items first, then secondary additions)' },
    { risk: 'Incorrect records', solution: 'Staff training & mandatory digital form input validation' },
    { risk: 'System failure', solution: 'Regular maintenance, offline sync caching, and data integrity audits' }
  ];

  const implementationPhases = [
    { activity: 'Research and problem identification', duration: '2 weeks' },
    { activity: 'Requirements gathering & stakeholder meetings', duration: '2 weeks' },
    { activity: 'System and infirmary clinical design', duration: '3 weeks' },
    { activity: 'Software and database development', duration: '4–6 weeks' },
    { activity: 'Quality assurance, security & clinical testing', duration: '2 weeks' },
    { activity: 'Staff onboarding & operational training', duration: '1 week' },
    { activity: 'Pilot implementation in school infirmary', duration: '2–3 weeks' },
    { activity: 'Evaluation, feedback & system enhancements', duration: '2 weeks' },
    { activity: 'Final operational deployment', duration: '1 week' }
  ];

  const foundingTeam = [
    { name: 'Conan Morgan', role: 'Founder' },
    { name: 'Daniel Machota', role: 'Co-founder' },
    { name: 'Zuberi Mpeta', role: 'Co-founder' },
    { name: 'Sarah Ikupa', role: 'Co-founder (Clinical & Nursing)' },
    { name: 'Antony Joseph', role: 'Co-founder (Operations & Compliance)' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <FileCheck2 className="w-6 h-6 text-emerald-400" />
            <h1 className="text-xl sm:text-2xl font-bold text-white">
              Permits, Compliance, Team & Project Plan
            </h1>
          </div>
          <p className="text-xs text-slate-400">
            Section 7E Compliance Records, Section 13 Implementation Plan (3–6 Months), Section 15 Security, and Section 16 Risk Matrix.
          </p>
        </div>

        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-950 text-emerald-300 border border-emerald-700/60">
          AfricAcademy Arusha Science
        </span>
      </div>

      {/* Project Team Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-3">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-blue-400" />
          <span>Project Founding Team — AfricAcademy Arusha Science</span>
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-1">
          {foundingTeam.map((member, idx) => (
            <div key={idx} className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-center space-y-1">
              <span className="w-8 h-8 rounded-full bg-blue-950 border border-blue-700/60 text-blue-300 font-bold flex items-center justify-center mx-auto text-xs">
                {member.name.split(' ').map(n => n[0]).join('')}
              </span>
              <p className="text-xs font-bold text-white truncate">{member.name}</p>
              <p className="text-[10px] text-slate-400">{member.role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Permits & Compliance Documents (Section 7E) */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Section 7E: Regulatory Permits & Professional Certifications</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {INITIAL_COMPLIANCE.map((lic) => (
            <div key={lic.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 text-xs shadow-lg">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-mono text-emerald-400 font-bold block">{lic.id}</span>
                  <h4 className="font-bold text-white text-sm">{lic.title}</h4>
                </div>
                <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                  lic.status === 'Active' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' :
                  'bg-amber-950 text-amber-300 border border-amber-800'
                }`}>
                  {lic.status}
                </span>
              </div>

              <div className="space-y-1 text-slate-300">
                <p><strong>Issuing Body:</strong> {lic.issuingAuthority}</p>
                <p className="font-mono text-slate-400">License: {lic.licenseNumber}</p>
                <p><strong>Valid Until:</strong> {lic.expiryDate}</p>
                <p className="text-slate-400 text-[11px]">Custodian: {lic.officerInCharge}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Implementation Timeline & Risks (Section 13 & 16) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Implementation Plan (3-6 Months) */}
        <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4 text-xs">
          <div className="border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Calendar className="w-4 h-4 text-purple-400" />
              <span>Section 13: Project Implementation Plan (3–6 Months)</span>
            </h3>
            <p className="text-slate-400 text-[11px] mt-0.5">
              Basic academic prototype completed in 3–4 months; full deployment in 5–6 months
            </p>
          </div>

          <div className="space-y-2">
            {implementationPhases.map((phase, idx) => (
              <div key={idx} className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <span className="text-slate-200">{idx + 1}. {phase.activity}</span>
                <span className="font-mono font-bold text-purple-300 text-[11px] bg-purple-950/80 px-2 py-0.5 rounded border border-purple-800/40">
                  {phase.duration}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Section 16: Risk & Mitigation Matrix */}
        <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4 text-xs">
          <div className="border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span>Section 16: Risk Management & Technical Solutions</span>
            </h3>
            <p className="text-slate-400 text-[11px] mt-0.5">
              Comprehensive contingency and architectural mitigations
            </p>
          </div>

          <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-800">
            {risksAndSolutions.map((r, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="flex items-center gap-1.5 text-amber-300 font-bold">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Risk: {r.risk}</span>
                </div>
                <p className="text-slate-300 pl-5 text-[11px]">
                  <strong>Proposed Solution:</strong> {r.solution}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
