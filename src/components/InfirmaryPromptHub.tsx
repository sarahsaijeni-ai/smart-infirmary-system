import React, { useState } from 'react';
import { 
  FileText, 
  Copy, 
  Check, 
  Download, 
  Sparkles, 
  ShieldAlert, 
  Clock, 
  Users, 
  Search, 
  CheckCircle2, 
  Building2,
  ListOrdered
} from 'lucide-react';
import { SMART_INFIRMARY_MASTER_PROMPT } from '../data/infirmaryPrompt';

type PromptMode = 'master' | 'srs' | 'rbac' | 'risks';

export const InfirmaryPromptHub: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [mode, setMode] = useState<PromptMode>('master');
  const [search, setSearch] = useState('');

  const getPromptContent = (): string => {
    switch (mode) {
      case 'master':
        return SMART_INFIRMARY_MASTER_PROMPT;
      case 'srs':
        return `# SOFTWARE REQUIREMENTS SPECIFICATION (SRS)
SMART SCHOOL INFIRMARY SYSTEM — AFRICADEMY ARUSHA SCIENCE
(Excluding All Financial & Budget Items)

## 1. PRODUCT SCOPE & PURPOSE
A digital healthcare and inventory management system designed specifically for AfricAcademy Arusha Science to manage student/staff visits, infirmary admissions, medicine stock, expiry dates, hospital referrals, and regulatory permits.

## 2. FUNCTIONAL REQUIREMENTS
- FR-1: Digital Medical Visit Intake (Vitals, Chief Complaints, Treatments)
- FR-2: Automated Stock Deduction upon medicine or consumable issuance
- FR-3: Minimum Stock Alerts and Batch Expiry Date Monitoring
- FR-4: Bed Admission and Observation Management
- FR-5: Formal Referral Logging to designated external healthcare facilities
- FR-6: Permit and Compliance Document Tracking with renewal alarms
- FR-7: Epidemiological & Management Reporting (Complaints, Usage, Referrals)

## 3. NON-FUNCTIONAL REQUIREMENTS
- NFR-1 (Security): Granular Role-Based Access Control (RBAC) ensuring student medical privacy.
- NFR-2 (Reliability): Offline persistence and battery/UPS resilience against grid fluctuations.
- NFR-3 (Auditability): Tamper-evident logging of all record creations, edits, and dispensations.`;

      case 'rbac':
        return `// ROLE-BASED ACCESS CONTROL (RBAC) MATRIX
// SMART SCHOOL INFIRMARY SYSTEM — AFRICADEMY ARUSHA SCIENCE

{
  "roles": {
    "HealthcarePersonnel": {
      "title": "Registered Nurse / Clinical Officer",
      "permissions": [
        "visit:create", "visit:read_all", "visit:update",
        "patient:read_medical_history", "patient:update_clinical",
        "dispensation:issue", "bed:admit", "bed:discharge",
        "referral:create", "referral:update"
      ]
    },
    "InventoryOfficer": {
      "title": "Supplies & Stock Manager",
      "permissions": [
        "inventory:read", "inventory:restock", "inventory:audit",
        "inventory:supplier_manage", "alerts:view_low_stock",
        "alerts:view_expiring"
      ]
    },
    "SchoolAdministrator": {
      "title": "Principal / Management",
      "permissions": [
        "reports:view_aggregate_anonymized", "compliance:manage_permits",
        "staff:manage_accounts", "procurement:view_needs"
      ]
    },
    "TeacherOrStaff": {
      "title": "Academic Faculty",
      "permissions": [
        "student:view_infirmary_attendance_status"
      ],
      "restrictions": [
        "STRICTLY FORBIDDEN: Cannot view diagnostic clinical notes, medication names, or confidential medical histories."
      ]
    }
  }
}`;

      case 'risks':
        return `// CLINICAL SERVICE ADMINISTRATION TIMING & RISK MANAGEMENT MATRIX

1. SERVICE ADMINISTRATION PLANNING ESTIMATES:
- Registration: 2–5 minutes
- Basic Assessment (Triage & Vitals): 5–15 minutes
- Minor First Aid: 5–20 minutes
- Record Update & Stock Deduction: 2–5 minutes
- Bed Follow-up: 5–10 minutes
- Referral Preparation: 10–20+ minutes

2. RISKS & ARCHITECTURAL MITIGATIONS:
- Medicine Stock-Outs → Automated Minimum Stock Reorder Thresholds
- Expired Medicines → Active Batch Expiry Countdown & Quarantine Flags
- Data Loss → Encrypted Scheduled Daily Backups
- Unauthorized Record Disclosure → Strict RBAC & Audit Trails
- Power Failure → Uninterruptible Power Supply (UPS) & Local Caching
- Clinical Limitations → Mandatory Hospital Referral Protocol (No major surgery or advanced imaging)`;
    }
  };

  const text = getPromptContent();

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownload = () => {
    const ext = mode === 'rbac' ? 'json' : 'md';
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Smart_School_Infirmary_${mode}_prompt.${ext}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 border border-blue-700/40 rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/30 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5" />
                AfricAcademy Arusha Science
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                100% Price-Free Specification
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Smart School Infirmary System — Master Prompt
            </h1>
            <p className="text-slate-300 text-sm max-w-3xl leading-relaxed">
              Synthesized directly from the official project proposal by Conan Morgan, Daniel Machota, Zuberi Mpeta, Sarah Ikupa, and Antony Joseph. 
              Contains all operational workflows, digital admission protocols, automated stock balance deduction, expiry tracking, hospital referrals, compliance permits, and security controls with all price/budget sections excluded.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleCopy}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all shadow-md ${
                copied
                  ? 'bg-emerald-600 text-white shadow-emerald-600/30 ring-2 ring-emerald-400'
                  : 'bg-blue-600 hover:bg-blue-500 text-white font-semibold shadow-blue-500/20'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Prompt Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy Infirmary Prompt</span>
                </>
              )}
            </button>

            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600 transition-colors"
            >
              <Download className="w-4 h-4 text-blue-400" />
              <span>Download File</span>
            </button>
          </div>
        </div>

        {/* Highlights Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-slate-800/80 text-xs text-slate-300">
          <div className="flex items-center gap-2 bg-slate-900/70 p-2.5 rounded-lg border border-slate-800">
            <Clock className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>Automated Stock Deduction</span>
          </div>
          <div className="flex items-center gap-2 bg-slate-900/70 p-2.5 rounded-lg border border-slate-800">
            <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Strict Student Privacy (RBAC)</span>
          </div>
          <div className="flex items-center gap-2 bg-slate-900/70 p-2.5 rounded-lg border border-slate-800">
            <Users className="w-4 h-4 text-purple-400 shrink-0" />
            <span>5 Founding Team Members</span>
          </div>
          <div className="flex items-center gap-2 bg-slate-900/70 p-2.5 rounded-lg border border-slate-800">
            <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Hospital Referral Protocols</span>
          </div>
        </div>
      </div>

      {/* Format Selector */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-3.5 rounded-xl shadow-lg">
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-2">
            Specification View:
          </span>
          <button
            onClick={() => setMode('master')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
              mode === 'master' ? 'bg-blue-600 text-white font-semibold' : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            Complete Master Prompt
          </button>
          <button
            onClick={() => setMode('srs')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
              mode === 'srs' ? 'bg-blue-600 text-white font-semibold' : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            Functional SRS Spec
          </button>
          <button
            onClick={() => setMode('rbac')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
              mode === 'rbac' ? 'bg-blue-600 text-white font-semibold' : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            RBAC & Confidentiality Matrix
          </button>
          <button
            onClick={() => setMode('risks')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
              mode === 'risks' ? 'bg-blue-600 text-white font-semibold' : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            Service Times & Risks
          </button>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search prompt contents..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Code / Text Container */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-800 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-blue-400" />
            <span className="font-mono font-semibold text-slate-300">
              Smart_School_Infirmary_AfricAcademy_Specification.system.txt
            </span>
            <span className="text-[11px] text-slate-500">
              ({text.length.toLocaleString()} characters • Budget excluded)
            </span>
          </div>

          <div className="flex items-center gap-2">
            {copied && (
              <span className="text-emerald-400 flex items-center gap-1 font-semibold text-[11px]">
                <CheckCircle2 className="w-3.5 h-3.5" /> Copied!
              </span>
            )}
            <button
              onClick={handleCopy}
              className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-xs flex items-center gap-1 transition-colors border border-slate-700"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </button>
          </div>
        </div>

        <div className="p-5 sm:p-6 overflow-x-auto max-h-[680px] overflow-y-auto font-mono text-xs text-slate-300 leading-relaxed scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-slate-950 whitespace-pre-wrap">
          {search ? (
            text.split(new RegExp(`(${search})`, 'gi')).map((chunk, i) =>
              chunk.toLowerCase() === search.toLowerCase() ? (
                <mark key={i} className="bg-blue-400/40 text-blue-200 px-0.5 rounded">
                  {chunk}
                </mark>
              ) : (
                chunk
              )
            )
          ) : (
            text
          )}
        </div>
      </div>

    </div>
  );
};
