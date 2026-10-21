import React, { useState } from 'react';
import { 
  Patient, 
  MedicalVisit, 
  InventoryItem, 
  INITIAL_PATIENTS, 
  INITIAL_VISITS, 
  INITIAL_INVENTORY 
} from '../data/infirmaryData';
import { 
  UserPlus, 
  Activity, 
  Thermometer, 
  Pill, 
  Bed, 
  ArrowUpRight, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Search, 
  Calendar,
  Heart,
  ShieldAlert,
  UserCheck
} from 'lucide-react';

interface AdmissionsProps {
  inventory: InventoryItem[];
  setInventory: React.Dispatch<React.SetStateAction<InventoryItem[]>>;
  onReferralCreated?: (ref: any) => void;
}

export const InfirmaryAdmissions: React.FC<AdmissionsProps> = ({
  inventory,
  setInventory,
  onReferralCreated
}) => {
  const [visits, setVisits] = useState<MedicalVisit[]>(INITIAL_VISITS);
  const [selectedPatientId, setSelectedPatientId] = useState<string>(INITIAL_PATIENTS[0].id);
  const [complaint, setComplaint] = useState<string>('Headache & fatigue');
  
  // Vitals
  const [temp, setTemp] = useState<number>(37.0);
  const [bp, setBp] = useState<string>('118/76');
  const [pulse, setPulse] = useState<number>(75);
  const [spo2, setSpo2] = useState<number>(98);
  const [weight, setWeight] = useState<number>(54);

  // Treatment & Dispensation
  const [treatmentNotes, setTreatmentNotes] = useState<string>('');
  const [selectedMedicineId, setSelectedMedicineId] = useState<string>(inventory[0]?.id || '');
  const [medicineQty, setMedicineQty] = useState<number>(1);
  const [disposition, setDisposition] = useState<'Returned to Class' | 'Admitted to Resting Bed' | 'Sent Home' | 'Referred to Hospital'>('Returned to Class');
  const [bedNumber, setBedNumber] = useState<string>('Bed 1 (Resting Bed)');
  const [referralFacility, setReferralFacility] = useState<string>('Arusha Lutheran Medical Centre (ALMC)');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const selectedPatient = INITIAL_PATIENTS.find(p => p.id === selectedPatientId) || INITIAL_PATIENTS[0];

  const handleRecordVisit = (e: React.FormEvent) => {
    e.preventDefault();

    const selectedInvItem = inventory.find(i => i.id === selectedMedicineId);
    const dispensedList: any[] = [];

    // Automatically decrement inventory balance as mandated in Section 6
    if (selectedInvItem && medicineQty > 0) {
      if (selectedInvItem.remainingStock < medicineQty) {
        alert(`Insufficient stock! Only ${selectedInvItem.remainingStock} ${selectedInvItem.unit} remaining.`);
        return;
      }

      setInventory(prev => prev.map(item => {
        if (item.id === selectedMedicineId) {
          return {
            ...item,
            remainingStock: Math.max(0, item.remainingStock - medicineQty)
          };
        }
        return item;
      }));

      dispensedList.push({
        itemId: selectedInvItem.id,
        itemName: selectedInvItem.name,
        quantity: medicineQty,
        dosage: `${medicineQty} ${selectedInvItem.unit} administered`
      });
    }

    const newVisit: MedicalVisit = {
      id: `VIS-${Date.now().toString().slice(-4)}`,
      patientId: selectedPatient.id,
      patientName: selectedPatient.name,
      patientType: selectedPatient.type,
      gradeOrDept: selectedPatient.gradeOrDept,
      timestamp: new Date().toLocaleString([], { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }),
      chiefComplaint: complaint,
      vitals: {
        temperature: temp,
        bp,
        pulse,
        spo2,
        weight
      },
      treatmentNotes: treatmentNotes || `Routine first aid care provided for ${complaint}. Patient stable.`,
      dispensedItems: dispensedList,
      disposition,
      bedNumber: disposition === 'Admitted to Resting Bed' ? bedNumber : undefined,
      referralFacility: disposition === 'Referred to Hospital' ? referralFacility : undefined,
      recordedBy: 'Nurse S. Ikupa (Infirmary Health Officer)'
    };

    setVisits([newVisit, ...visits]);

    if (disposition === 'Referred to Hospital' && onReferralCreated) {
      onReferralCreated({
        id: `REF-${Date.now().toString().slice(-3)}`,
        visitId: newVisit.id,
        patientName: selectedPatient.name,
        patientType: selectedPatient.type,
        hospitalName: referralFacility,
        urgency: temp >= 39.0 ? 'Emergency' : 'Urgent',
        reasonForReferral: complaint,
        transportMode: 'School Emergency Vehicle',
        parentNotified: true,
        status: 'Dispatched',
        date: new Date().toLocaleString()
      });
    }

    setSuccessMessage(`Visit recorded successfully for ${selectedPatient.name}. Inventory automatically updated!`);
    setTreatmentNotes('');
    setTimeout(() => setSuccessMessage(null), 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Activity className="w-6 h-6 text-blue-400" />
            <h1 className="text-xl sm:text-2xl font-bold text-white">
              Medical Admission & Clinical Visit Triage
            </h1>
          </div>
          <p className="text-xs text-slate-400">
            Section 6 & 7A: Registration → Assessment → Treatment / First Aid → Automatic Stock Deduction → Discharge or Referral.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="px-3 py-1 rounded-full bg-blue-950 text-blue-300 border border-blue-700/60 font-semibold">
            {visits.length} Total Visits Logged
          </span>
          <span className="px-3 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-700/60 font-semibold">
            Stock Sync: Active
          </span>
        </div>
      </div>

      {successMessage && (
        <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-600/70 text-emerald-200 text-xs font-semibold flex items-center gap-2 animate-fadeIn shadow-lg">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Main Grid: Form on Left, Live Log on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Clinical Intake Form */}
        <div className="lg:col-span-6 space-y-4">
          <form 
            onSubmit={handleRecordVisit}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4 text-xs"
          >
            <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
              <span className="font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <UserPlus className="w-4 h-4 text-blue-400" />
                <span>Patient Registration & Intake</span>
              </span>
              <span className="text-[10px] text-slate-400 font-mono">Step 1 to 4</span>
            </div>

            {/* Select Patient */}
            <div className="space-y-1.5">
              <label className="text-slate-300 font-semibold">Select Student or Staff Member:</label>
              <select
                value={selectedPatientId}
                onChange={(e) => setSelectedPatientId(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-white font-medium focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                {INITIAL_PATIENTS.map(p => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.id}) — {p.gradeOrDept} [{p.type}]
                  </option>
                ))}
              </select>
            </div>

            {/* Patient Medical Alert Card */}
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1 text-[11px]">
              <div className="flex items-center justify-between">
                <span className="text-slate-300 font-bold">Confidential Medical Profile:</span>
                <span className="text-slate-400 font-mono">{selectedPatient.gender}, {selectedPatient.age} yrs</span>
              </div>
              <div className="flex flex-wrap gap-2 pt-1">
                {selectedPatient.allergies.length > 0 ? (
                  <span className="px-2 py-0.5 rounded bg-red-950 text-red-300 border border-red-800 flex items-center gap-1">
                    <ShieldAlert className="w-3 h-3" /> Allergies: {selectedPatient.allergies.join(', ')}
                  </span>
                ) : (
                  <span className="text-slate-500">No known allergies</span>
                )}
                {selectedPatient.chronicConditions.length > 0 && (
                  <span className="px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800">
                    Chronic: {selectedPatient.chronicConditions.join(', ')}
                  </span>
                )}
              </div>
              <p className="text-slate-400 pt-0.5">
                Emergency Contact: {selectedPatient.emergencyContact.name} ({selectedPatient.emergencyContact.relationship}) — {selectedPatient.emergencyContact.phone}
              </p>
            </div>

            {/* Chief Complaint */}
            <div className="space-y-1.5">
              <label className="text-slate-300 font-semibold">Chief Complaint / Reason for Visit:</label>
              <input
                type="text"
                value={complaint}
                onChange={(e) => setComplaint(e.target.value)}
                placeholder="e.g. Headache, fever, sports sprain, stomach pain..."
                required
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Vitals Grid */}
            <div className="space-y-2">
              <span className="text-slate-300 font-semibold block">Vital Signs & Basic Observations:</span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
                <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-slate-400 flex items-center gap-1">
                    <Thermometer className="w-3 h-3 text-red-400" /> Temp (°C)
                  </span>
                  <input
                    type="number"
                    step="0.1"
                    value={temp}
                    onChange={(e) => setTemp(parseFloat(e.target.value) || 37.0)}
                    className="w-full bg-slate-800 border border-slate-700 rounded p-1 text-white font-mono font-bold"
                  />
                  {temp >= 38.0 && (
                    <span className="text-red-400 font-bold block text-[10px]">⚠️ Pyrexia / Fever</span>
                  )}
                </div>

                <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-slate-400 flex items-center gap-1">
                    <Heart className="w-3 h-3 text-pink-400" /> BP (mmHg)
                  </span>
                  <input
                    type="text"
                    value={bp}
                    onChange={(e) => setBp(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded p-1 text-white font-mono font-bold"
                  />
                </div>

                <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-slate-400 flex items-center gap-1">
                    <Activity className="w-3 h-3 text-cyan-400" /> Pulse (bpm)
                  </span>
                  <input
                    type="number"
                    value={pulse}
                    onChange={(e) => setPulse(parseInt(e.target.value) || 75)}
                    className="w-full bg-slate-800 border border-slate-700 rounded p-1 text-white font-mono font-bold"
                  />
                </div>

                <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-slate-400 flex items-center gap-1">
                    SpO2 (%)
                  </span>
                  <input
                    type="number"
                    value={spo2}
                    onChange={(e) => setSpo2(parseInt(e.target.value) || 98)}
                    className="w-full bg-slate-800 border border-slate-700 rounded p-1 text-white font-mono font-bold"
                  />
                </div>
              </div>
            </div>

            {/* Treatment & Medicine Dispensation (Section 6 Auto-Deduction) */}
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <span className="text-slate-300 font-semibold block flex items-center justify-between">
                <span>Treatment & Medicine / Supply Issuance:</span>
                <span className="text-emerald-400 text-[10px] font-normal">Auto-deducts stock balance</span>
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div className="sm:col-span-2">
                  <select
                    value={selectedMedicineId}
                    onChange={(e) => setSelectedMedicineId(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white text-xs"
                  >
                    {inventory.map(item => (
                      <option key={item.id} value={item.id}>
                        {item.name} ({item.remainingStock} {item.unit} available)
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <input
                    type="number"
                    min="1"
                    max="50"
                    value={medicineQty}
                    onChange={(e) => setMedicineQty(parseInt(e.target.value) || 1)}
                    placeholder="Qty"
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white font-mono text-xs"
                  />
                </div>
              </div>

              <textarea
                rows={2}
                placeholder="Clinical assessment notes & first-aid steps taken..."
                value={treatmentNotes}
                onChange={(e) => setTreatmentNotes(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Disposition & Bed / Referral Options */}
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <label className="text-slate-300 font-semibold block">Discharge / Outcome Status:</label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {(['Returned to Class', 'Admitted to Resting Bed', 'Sent Home', 'Referred to Hospital'] as const).map(disp => (
                  <button
                    type="button"
                    key={disp}
                    onClick={() => setDisposition(disp)}
                    className={`p-2.5 rounded-xl border text-center font-medium transition-all ${
                      disposition === disp
                        ? 'bg-blue-600 text-white border-blue-500 shadow-md'
                        : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-750'
                    }`}
                  >
                    {disp}
                  </button>
                ))}
              </div>

              {disposition === 'Admitted to Resting Bed' && (
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-300 font-semibold flex items-center gap-1.5">
                    <Bed className="w-4 h-4 text-cyan-400" /> Select Resting Bed:
                  </span>
                  <select
                    value={bedNumber}
                    onChange={(e) => setBedNumber(e.target.value)}
                    className="bg-slate-800 border border-slate-700 rounded p-1 text-white"
                  >
                    <option value="Resting Bed 1">Bed 1 (Waterproof Cover)</option>
                    <option value="Resting Bed 2">Bed 2 (Waterproof Cover)</option>
                  </select>
                </div>
              )}

              {disposition === 'Referred to Hospital' && (
                <div className="p-3 bg-red-950/40 rounded-xl border border-red-800/60 space-y-1.5 text-xs">
                  <span className="text-red-300 font-semibold flex items-center gap-1.5">
                    <ArrowUpRight className="w-4 h-4 text-red-400" /> Hospital Referral Target:
                  </span>
                  <select
                    value={referralFacility}
                    onChange={(e) => setReferralFacility(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded p-1.5 text-white"
                  >
                    <option value="Arusha Lutheran Medical Centre (ALMC)">Arusha Lutheran Medical Centre (ALMC)</option>
                    <option value="Mount Meru Regional Referral Hospital">Mount Meru Regional Referral Hospital</option>
                    <option value="Selian Lutheran Hospital">Selian Lutheran Hospital</option>
                  </select>
                  <p className="text-slate-400 text-[11px]">
                    Automatic referral document will be generated for student transport.
                  </p>
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-lg shadow-blue-600/20 transition-all text-sm flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Record Medical Visit & Update Stock Balance</span>
            </button>
          </form>
        </div>

        {/* Right Column: Live Visit Log & History */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Activity className="w-4 h-4 text-emerald-400" />
                  <span>Recent Infirmary Visits</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Real-time clinical encounters recorded by authorized health workers
                </p>
              </div>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                {visits.length} Encounters
              </span>
            </div>

            <div className="space-y-3 max-h-[620px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-800">
              {visits.map((v) => (
                <div
                  key={v.id}
                  className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-all space-y-2 text-xs"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-sm">{v.patientName}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                          {v.gradeOrDept}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 flex items-center gap-2 mt-0.5">
                        <span className="font-mono">{v.id}</span>
                        <span>•</span>
                        <span>{v.timestamp}</span>
                      </p>
                    </div>

                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-semibold ${
                      v.disposition === 'Referred to Hospital' ? 'bg-red-950 text-red-300 border border-red-800' :
                      v.disposition === 'Admitted to Resting Bed' ? 'bg-amber-950 text-amber-300 border border-amber-800' :
                      'bg-emerald-950 text-emerald-300 border border-emerald-800'
                    }`}>
                      {v.disposition}
                    </span>
                  </div>

                  {/* Complaint & Vitals */}
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800/80 space-y-1">
                    <p className="text-slate-200">
                      <strong>Complaint:</strong> {v.chiefComplaint}
                    </p>
                    <div className="flex flex-wrap gap-3 text-[11px] text-slate-400 pt-1 font-mono">
                      <span>Temp: <strong className={v.vitals.temperature >= 38.0 ? 'text-red-400' : 'text-slate-200'}>{v.vitals.temperature}°C</strong></span>
                      <span>BP: <strong className="text-slate-200">{v.vitals.bp}</strong></span>
                      <span>Pulse: <strong className="text-slate-200">{v.vitals.pulse} bpm</strong></span>
                      <span>SpO2: <strong className="text-slate-200">{v.vitals.spo2}%</strong></span>
                    </div>
                  </div>

                  {/* Dispensed Items */}
                  {v.dispensedItems.length > 0 && (
                    <div className="flex items-center gap-2 text-[11px] text-emerald-300">
                      <Pill className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>Issued: {v.dispensedItems.map(d => `${d.itemName} (${d.quantity})`).join(', ')}</span>
                    </div>
                  )}

                  <p className="text-[11px] text-slate-400 italic">
                    {v.treatmentNotes}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
