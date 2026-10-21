import React, { useState } from 'react';
import { 
  ReferralRecord, 
  INITIAL_REFERRALS 
} from '../data/infirmaryData';
import { 
  ArrowUpRight, 
  Building2, 
  PhoneCall, 
  Ambulance, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Plus, 
  Search,
  ShieldAlert
} from 'lucide-react';

interface ReferralsProps {
  referrals: ReferralRecord[];
  setReferrals: React.Dispatch<React.SetStateAction<ReferralRecord[]>>;
}

export const InfirmaryReferrals: React.FC<ReferralsProps> = ({
  referrals,
  setReferrals
}) => {
  const [showNewModal, setShowNewModal] = useState(false);
  const [patientName, setPatientName] = useState('');
  const [hospitalName, setHospitalName] = useState('Arusha Lutheran Medical Centre (ALMC)');
  const [urgency, setUrgency] = useState<'Emergency' | 'Urgent' | 'Routine'>('Urgent');
  const [reason, setReason] = useState('');
  const [transport, setTransport] = useState('School Emergency Vehicle');
  const [parentNotified, setParentNotified] = useState(true);

  const handleCreateReferral = (e: React.FormEvent) => {
    e.preventDefault();
    const newRef: ReferralRecord = {
      id: crypto.randomUUID(),
      visitId: `VIS-MANUAL`,
      patientName,
      patientType: 'Student',
      hospitalName,
      urgency,
      reasonForReferral: reason,
      transportMode: transport,
      parentNotified,
      status: 'Dispatched',
      date: new Date().toLocaleString()
    };
    setReferrals([newRef, ...referrals]);
    setShowNewModal(false);
    setPatientName('');
    setReason('');
  };

  const handleUpdateStatus = (id: string, newStatus: 'Dispatched' | 'Arrived at Facility' | 'Completed') => {
    setReferrals(prev => prev.map(r => r.id === id ? { ...r, status: newStatus } : r));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <ArrowUpRight className="w-6 h-6 text-red-400" />
            <h1 className="text-xl sm:text-2xl font-bold text-white">
              Hospital & External Clinic Referral Tracking
            </h1>
          </div>
          <p className="text-xs text-slate-400">
            Objective 7 & Section 1: Ensuring serious injuries and acute conditions are promptly transferred to qualified healthcare facilities.
          </p>
        </div>

        <button
          onClick={() => setShowNewModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-semibold rounded-xl text-xs shadow-lg shadow-red-600/20 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>New Emergency Referral</span>
        </button>
      </div>

      {/* Protocol Notice Banner */}
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 flex items-start gap-3">
        <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-white block">
            Clinical Referral Mandate (Section 1 & 11 Limitations):
          </span>
          <p className="text-slate-400 text-[11px] mt-0.5 leading-relaxed">
            "The infirmary is not intended to replace hospitals. It cannot provide major surgery, intensive care, advanced laboratory diagnostics, or medical imaging. Serious cases must be stabilized immediately and dispatched with authorized transfer records."
          </p>
        </div>
      </div>

      {/* Referral Records List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {referrals.map((ref) => (
          <div
            key={ref.id}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-3 text-xs"
          >
            <div className="flex items-start justify-between border-b border-slate-800 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-red-400 font-bold">
                    {ref.id}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    ref.urgency === 'Emergency' ? 'bg-red-950 text-red-300 border border-red-800' :
                    ref.urgency === 'Urgent' ? 'bg-amber-950 text-amber-300 border border-amber-800' :
                    'bg-blue-950 text-blue-300 border border-blue-800'
                  }`}>
                    {ref.urgency}
                  </span>
                </div>
                <h3 className="text-base font-bold text-white mt-1">
                  {ref.patientName}
                </h3>
              </div>

              <span className={`px-2.5 py-1 rounded-full text-[10px] font-semibold ${
                ref.status === 'Completed' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' :
                ref.status === 'Arrived at Facility' ? 'bg-blue-950 text-blue-300 border border-blue-800' :
                'bg-amber-950 text-amber-300 border border-amber-800 animate-pulse'
              }`}>
                {ref.status}
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-slate-200">
                <Building2 className="w-4 h-4 text-slate-400 shrink-0" />
                <span>Receiving Facility: <strong>{ref.hospitalName}</strong></span>
              </div>

              <div className="flex items-center gap-2 text-slate-200">
                <Ambulance className="w-4 h-4 text-slate-400 shrink-0" />
                <span>Transport: {ref.transportMode}</span>
              </div>

              <div className="flex items-center gap-2 text-slate-200">
                <PhoneCall className="w-4 h-4 text-slate-400 shrink-0" />
                <span>Parent Notification: {ref.parentNotified ? '✅ Confirmed by Phone' : '⚠️ Pending'}</span>
              </div>

              <p className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 italic text-[11px]">
                Reason: "{ref.reasonForReferral}"
              </p>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-[11px]">
              <span className="text-slate-500 font-mono">{ref.date}</span>
              <div className="flex gap-1.5">
                {ref.status === 'Dispatched' && (
                  <button
                    onClick={() => handleUpdateStatus(ref.id, 'Arrived at Facility')}
                    className="px-2.5 py-1 rounded bg-blue-600 hover:bg-blue-500 text-white font-medium"
                  >
                    Mark Arrived
                  </button>
                )}
                {ref.status === 'Arrived at Facility' && (
                  <button
                    onClick={() => handleUpdateStatus(ref.id, 'Completed')}
                    className="px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-medium"
                  >
                    Mark Resolved
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* New Referral Modal */}
      {showNewModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4 text-xs">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <ArrowUpRight className="w-5 h-5 text-red-400" />
              <span>Initiate Hospital Referral</span>
            </h3>

            <form onSubmit={handleCreateReferral} className="space-y-3">
              <div>
                <label className="text-slate-300 font-semibold block mb-1">Patient Name:</label>
                <input
                  type="text"
                  required
                  placeholder="Student or Staff name..."
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-white"
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Destination Facility:</label>
                <select
                  value={hospitalName}
                  onChange={(e) => setHospitalName(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-white"
                >
                  <option value="Arusha Lutheran Medical Centre (ALMC)">Arusha Lutheran Medical Centre (ALMC)</option>
                  <option value="Mount Meru Regional Referral Hospital">Mount Meru Regional Referral Hospital</option>
                  <option value="Selian Lutheran Hospital">Selian Lutheran Hospital</option>
                </select>
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Urgency:</label>
                <select
                  value={urgency}
                  onChange={(e) => setUrgency(e.target.value as any)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-white"
                >
                  <option value="Urgent">Urgent (Within 1 hour)</option>
                  <option value="Emergency">Emergency (Immediate ambulance)</option>
                  <option value="Routine">Routine (Elective consultation)</option>
                </select>
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Reason & Diagnostic Notes:</label>
                <textarea
                  required
                  rows={2}
                  placeholder="Clinical reason (e.g. suspected malaria, deep laceration, fracture)..."
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-white"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowNewModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-semibold"
                >
                  Dispatch Referral
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
