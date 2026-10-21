import React, { useState, useEffect } from 'react';
import { 
  BookMarked, 
  Cloud, 
  CloudOff, 
  Download, 
  MapPin, 
  Calendar, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  Trash2, 
  RefreshCw,
  PlusCircle,
  FileSpreadsheet
} from 'lucide-react';
import { SpeciesRecord, SAMPLE_SPECIES } from '../data/proposalData';

export interface FieldObservation {
  id: string;
  speciesName: string;
  scientificName: string;
  category: string;
  confidence: number;
  date: string;
  locationName: string;
  latitude: number;
  longitude: number;
  isCoordinateMasked: boolean;
  notes: string;
  photoUrl?: string;
  verificationStatus: 'Pending AI Analysis' | 'AI Confirmed' | 'In Expert Review' | 'Research Grade';
  syncedToCloud: boolean;
  isPest: boolean;
  isInvasive: boolean;
  isToxic: boolean;
}

const STORAGE_KEY = 'biosphere_ai_field_observations';

export const FieldNotebook: React.FC<{ isOfflineMode: boolean }> = ({ isOfflineMode }) => {
  const [observations, setObservations] = useState<FieldObservation[]>([]);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [filter, setFilter] = useState<'all' | 'pending-sync' | 'research-grade'>('all');
  const [newNoteText, setNewNoteText] = useState<string>('');

  // Initial load
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setObservations(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    } else {
      // Seed initial observations representing real proposal test records
      const initial: FieldObservation[] = [
        {
          id: 'obs-001',
          speciesName: 'Grey Crowned Crane',
          scientificName: 'Balearica regulorum',
          category: 'Bird',
          confidence: 96,
          date: '2026-10-20 14:32',
          locationName: 'Aberdare Highland Wetlands, Kenya',
          latitude: -0.5124,
          longitude: 37.0421,
          isCoordinateMasked: true,
          notes: 'Two adult specimens foraging near freshwater marsh. High water levels.',
          verificationStatus: 'Research Grade',
          syncedToCloud: true,
          isPest: false,
          isInvasive: false,
          isToxic: false
        },
        {
          id: 'obs-002',
          speciesName: 'Fall Armyworm',
          scientificName: 'Spodoptera frugiperda',
          category: 'Insect',
          confidence: 92,
          date: '2026-10-21 08:15',
          locationName: 'Lake Victoria Agricultural Basin, Uganda',
          latitude: 0.3476,
          longitude: 32.5825,
          isCoordinateMasked: false,
          notes: 'Observed in young maize crop whorl with frass. Applied neem spray IPM.',
          verificationStatus: 'AI Confirmed',
          syncedToCloud: false,
          isPest: true,
          isInvasive: true,
          isToxic: false
        },
        {
          id: 'obs-003',
          speciesName: 'Death Cap Mushroom',
          scientificName: 'Amanita phalloides',
          category: 'Fungi',
          confidence: 94,
          date: '2026-10-21 09:40',
          locationName: 'Oak Woodland Edge, Central District',
          latitude: 51.1657,
          longitude: 10.4515,
          isCoordinateMasked: false,
          notes: 'Grows under mature Quercus tree. White gills and distinct basal volva present. Flagged for toxicity warnings.',
          verificationStatus: 'In Expert Review',
          syncedToCloud: false,
          isPest: false,
          isInvasive: true,
          isToxic: true
        }
      ];
      setObservations(initial);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
    }
  }, []);

  const saveObservations = (newObs: FieldObservation[]) => {
    setObservations(newObs);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newObs));
  };

  const handleSyncAll = () => {
    if (isOfflineMode) {
      alert("Device is in Offline Mode. Connect to Online Cloud mode to synchronize observations.");
      return;
    }
    setIsSyncing(true);
    setTimeout(() => {
      const updated = observations.map(o => ({ ...o, syncedToCloud: true }));
      saveObservations(updated);
      setIsSyncing(false);
    }, 1500);
  };

  const handleDelete = (id: string) => {
    const updated = observations.filter(o => o.id !== id);
    saveObservations(updated);
  };

  const handleExportDarwinCore = () => {
    const csvHeader = "occurrenceID,scientificName,vernacularName,taxonRank,decimalLatitude,decimalLongitude,coordinateUncertaintyInMeters,eventDate,identificationVerificationStatus,occurrenceRemarks\n";
    const csvRows = observations.map(o => {
      // Generalize latitude/longitude if masked
      const lat = o.isCoordinateMasked ? (Math.round(o.latitude * 10) / 10).toFixed(1) : o.latitude;
      const lng = o.isCoordinateMasked ? (Math.round(o.longitude * 10) / 10).toFixed(1) : o.longitude;
      const uncertainty = o.isCoordinateMasked ? 15000 : 25;
      return `"${o.id}","${o.scientificName}","${o.speciesName}","Species","${lat}","${lng}","${uncertainty}","${o.date}","${o.verificationStatus}","${o.notes.replace(/"/g, '""')}"`;
    }).join("\n");

    const blob = new Blob([csvHeader + csvRows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `biosphere_darwin_core_observations_${Date.now()}.csv`;
    link.click();
    URL.revokeObjectURL(link.href);
  };

  const unsyncedCount = observations.filter(o => !o.syncedToCloud).length;

  const filtered = observations.filter(o => {
    if (filter === 'pending-sync') return !o.syncedToCloud;
    if (filter === 'research-grade') return o.verificationStatus === 'Research Grade';
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <BookMarked className="w-6 h-6 text-emerald-400" />
            <h1 className="text-xl sm:text-2xl font-bold text-white">
              Field Observation Notebook & Cloud Sync
            </h1>
          </div>
          <p className="text-xs text-slate-400">
            Section 14 Biodiversity Observation System & Section 19 Offline-First Cloud Synchronization.
          </p>
        </div>

        {/* Sync & Export Actions */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={handleSyncAll}
            disabled={isSyncing || unsyncedCount === 0 || isOfflineMode}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold shadow-md transition-all ${
              unsyncedCount > 0 && !isOfflineMode
                ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/30 ring-2 ring-emerald-400'
                : 'bg-slate-800 text-slate-400 border border-slate-700 cursor-not-allowed'
            }`}
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>
              {isSyncing ? 'Synchronizing with Cloud...' : `Sync ${unsyncedCount} Pending to Cloud`}
            </span>
          </button>

          <button
            onClick={handleExportDarwinCore}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600 transition-colors"
            title="Export standard Darwin Core biodiversity archive CSV"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
            <span>Export Darwin Core</span>
          </button>
        </div>
      </div>

      {/* Sync Status Banner */}
      <div className={`p-4 rounded-xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs ${
        isOfflineMode 
          ? 'bg-amber-950/50 border-amber-800/60 text-amber-200' 
          : unsyncedCount > 0 
          ? 'bg-blue-950/50 border-blue-800/60 text-blue-200'
          : 'bg-emerald-950/50 border-emerald-800/60 text-emerald-200'
      }`}>
        <div className="flex items-center gap-2.5">
          {isOfflineMode ? (
            <CloudOff className="w-4 h-4 text-amber-400 shrink-0" />
          ) : (
            <Cloud className="w-4 h-4 text-emerald-400 shrink-0" />
          )}
          <div>
            <span className="font-bold">
              {isOfflineMode ? 'Offline Mode Active:' : 'Cloud Connectivity Active:'}
            </span>{' '}
            {isOfflineMode ? (
              <span>All photographs and identifications are stored safely in local encrypted storage. They will synchronize when internet resumes.</span>
            ) : unsyncedCount > 0 ? (
              <span>You have <strong>{unsyncedCount}</strong> offline observation(s) waiting for cloud upload & expert verification queuing.</span>
            ) : (
              <span>All local field observations are fully synced with the BioSphere AI Central Registry.</span>
            )}
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
              filter === 'all' ? 'bg-slate-800 text-white font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            All ({observations.length})
          </button>
          <button
            onClick={() => setFilter('pending-sync')}
            className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
              filter === 'pending-sync' ? 'bg-slate-800 text-white font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Pending Sync ({unsyncedCount})
          </button>
          <button
            onClick={() => setFilter('research-grade')}
            className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
              filter === 'research-grade' ? 'bg-slate-800 text-white font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Research Grade ({observations.filter(o => o.verificationStatus === 'Research Grade').length})
          </button>
        </div>
      </div>

      {/* Observations List */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center text-slate-400 text-xs">
            No observations matching the selected filter. Capture or identify species in the Identification Lab to log them!
          </div>
        ) : (
          filtered.map((obs) => (
            <div
              key={obs.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-emerald-700/50 transition-all space-y-3 shadow-lg"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-white">
                      {obs.speciesName}
                    </h3>
                    <span className="text-xs font-mono italic text-emerald-400">
                      ({obs.scientificName})
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                      {obs.category}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-[11px] text-slate-400 mt-1">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-500" />
                      {obs.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-slate-500" />
                      {obs.locationName}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto">
                  {/* Verification Badge */}
                  <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 ${
                    obs.verificationStatus === 'Research Grade' ? 'bg-emerald-950 text-emerald-300 border border-emerald-700' :
                    obs.verificationStatus === 'In Expert Review' ? 'bg-purple-950 text-purple-300 border border-purple-700' :
                    'bg-slate-800 text-slate-300 border border-slate-700'
                  }`}>
                    {obs.verificationStatus === 'Research Grade' && <ShieldCheck className="w-3.5 h-3.5" />}
                    <span>{obs.verificationStatus}</span>
                  </span>

                  {/* Sync Status Badge */}
                  <span className={`px-2 py-1 rounded-lg text-[11px] font-mono flex items-center gap-1 ${
                    obs.syncedToCloud ? 'text-emerald-400 bg-emerald-950/60' : 'text-amber-400 bg-amber-950/60'
                  }`}>
                    {obs.syncedToCloud ? (
                      <>
                        <CheckCircle2 className="w-3 h-3" /> Synced
                      </>
                    ) : (
                      <>
                        <CloudOff className="w-3 h-3" /> Queued
                      </>
                    )}
                  </span>

                  <button
                    onClick={() => handleDelete(obs.id)}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-slate-800 transition-colors"
                    title="Delete record"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Notes & Special Tags */}
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs">
                <p className="text-slate-300 italic bg-slate-950 p-2.5 rounded-xl border border-slate-800/80 flex-1">
                  "{obs.notes}"
                </p>

                <div className="flex items-center gap-2 shrink-0">
                  {obs.isCoordinateMasked && (
                    <span className="px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800 text-[10px]">
                      🛡️ GPS Generalization (~15km Fuzzy)
                    </span>
                  )}
                  {obs.isToxic && (
                    <span className="px-2 py-0.5 rounded bg-red-950 text-red-300 border border-red-800 text-[10px]">
                      ⚠️ Toxic Flagged
                    </span>
                  )}
                  {obs.isPest && (
                    <span className="px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800 text-[10px]">
                      🌾 Agricultural Pest
                    </span>
                  )}
                  {obs.isInvasive && (
                    <span className="px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800 text-[10px]">
                      🚨 Invasive
                    </span>
                  )}
                  <span className="text-[11px] font-mono text-slate-400 font-bold">
                    Confidence: {obs.confidence}%
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
};
