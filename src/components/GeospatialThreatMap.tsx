import React, { useState } from 'react';
import { 
  MapPin, 
  ShieldCheck, 
  ShieldAlert, 
  Layers, 
  AlertOctagon, 
  Info, 
  Eye, 
  EyeOff, 
  Sparkles,
  Compass,
  CheckCircle2
} from 'lucide-react';
import { SAMPLE_SPECIES } from '../data/proposalData';

export const GeospatialThreatMap: React.FC = () => {
  const [activeLayer, setActiveLayer] = useState<'all' | 'invasive' | 'endangered' | 'hotspots'>('all');
  const [selectedObservation, setSelectedObservation] = useState(SAMPLE_SPECIES[3]); // Grey Crowned Crane (Endangered)
  const [showRangerCoordinates, setShowRangerCoordinates] = useState<boolean>(false);

  const hotspots = [
    {
      id: 'h1',
      name: 'Great Rift Valley Ecosystem',
      coordinates: '0.2° S, 36.1° E',
      description: 'Global biodiversity corridor hosting endemic avifauna, alkaline flamingo lakes, and unique acacia woodlands.',
      speciesCount: '3,400+ documented taxa'
    },
    {
      id: 'h2',
      name: 'Lake Victoria Basin',
      coordinates: '1.0° S, 33.0° E',
      description: 'Critical freshwater fisheries under severe ecological pressure from invasive Eichhornia crassipes (Water Hyacinth) mats.',
      speciesCount: '500+ cichlid species'
    },
    {
      id: 'h3',
      name: 'Aberdare Mountain Wetlands',
      coordinates: '0.4° S, 36.7° E',
      description: 'Montane wetland habitat vital for endangered Balearica regulorum breeding pairs and indigenous alpine flora.',
      speciesCount: 'High endemism zone'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Title */}
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <MapPin className="w-6 h-6 text-emerald-400" />
          <span>Biodiversity Geospatial & Threat Map</span>
        </h1>
        <p className="text-xs text-slate-400">
          Section 17 Biodiversity Map, Section 15 Invasive Species Outbreaks, and Section 18 Anti-Poaching Coordinate Privacy.
        </p>
      </div>

      {/* Layer Control Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-4 rounded-2xl shadow-xl">
        <div className="flex items-center gap-2 overflow-x-auto">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-1">
            Map Layers:
          </span>
          <button
            onClick={() => setActiveLayer('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              activeLayer === 'all'
                ? 'bg-emerald-600 text-white font-semibold'
                : 'bg-slate-800 text-slate-300 hover:text-white'
            }`}
          >
            All Observations
          </button>
          <button
            onClick={() => setActiveLayer('invasive')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              activeLayer === 'invasive'
                ? 'bg-purple-600 text-white font-semibold'
                : 'bg-slate-800 text-slate-300 hover:text-white'
            }`}
          >
            Invasive Clusters (Sec 15)
          </button>
          <button
            onClick={() => setActiveLayer('endangered')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              activeLayer === 'endangered'
                ? 'bg-red-600 text-white font-semibold'
                : 'bg-slate-800 text-slate-300 hover:text-white'
            }`}
          >
            Endangered Masking (Sec 18)
          </button>
          <button
            onClick={() => setActiveLayer('hotspots')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              activeLayer === 'hotspots'
                ? 'bg-blue-600 text-white font-semibold'
                : 'bg-slate-800 text-slate-300 hover:text-white'
            }`}
          >
            Biodiversity Hotspots
          </button>
        </div>

        {/* Security Role Switcher (Simulates Researcher vs Public access) */}
        <div className="flex items-center gap-2 text-xs bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
          <span className="text-slate-400">Role-Based Access:</span>
          <button
            onClick={() => setShowRangerCoordinates(!showRangerCoordinates)}
            className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs font-medium transition-all ${
              showRangerCoordinates
                ? 'bg-amber-600/30 text-amber-300 border border-amber-500/50'
                : 'bg-slate-800 text-slate-300 border border-slate-700'
            }`}
          >
            {showRangerCoordinates ? (
              <>
                <Eye className="w-3.5 h-3.5 text-amber-400" />
                <span>Authorized Ranger View (Raw GPS)</span>
              </>
            ) : (
              <>
                <EyeOff className="w-3.5 h-3.5 text-slate-400" />
                <span>Public View (Fuzzy Obfuscation)</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Map Interactive Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Map Display Box */}
        <div className="lg:col-span-8 bg-slate-950 border border-slate-800 rounded-2xl p-6 relative overflow-hidden shadow-2xl min-h-[460px] flex flex-col justify-between">
          
          {/* Background Grid & Contour Map Styling */}
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
          
          {/* Top Info Tag */}
          <div className="relative z-10 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 bg-slate-900/90 px-3 py-1.5 rounded-lg border border-slate-800">
              <Compass className="w-4 h-4 text-emerald-400 animate-spin" style={{ animationDuration: '20s' }} />
              <span className="text-slate-200 font-mono">East African Biodiversity Regional Coordinate Grid</span>
            </div>

            {activeLayer === 'endangered' && (
              <span className="px-2.5 py-1 rounded bg-amber-950 text-amber-300 border border-amber-800 text-[11px] font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                Anti-Poaching Protection Active (10-25km Jitter)
              </span>
            )}
          </div>

          {/* Interactive Map Surface Markers */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
            {SAMPLE_SPECIES.map((spec) => {
              const isSelected = selectedObservation.id === spec.id;

              return (
                <div
                  key={spec.id}
                  onClick={() => setSelectedObservation(spec)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-slate-900 border-emerald-500 shadow-xl ring-2 ring-emerald-500/40'
                      : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-bold text-white flex items-center gap-1.5">
                      <MapPin className={`w-3.5 h-3.5 ${
                        spec.isInvasive ? 'text-purple-400' :
                        spec.isEndangeredSensitive ? 'text-red-400' :
                        spec.isAgriculturalPest ? 'text-yellow-400' : 'text-emerald-400'
                      }`} />
                      {spec.commonName}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
                      {spec.category}
                    </span>
                  </div>

                  <p className="text-[11px] font-mono text-slate-400">
                    Location: {spec.sampleLocation.regionName}
                  </p>

                  {/* Privacy Generalization Pill */}
                  {spec.isEndangeredSensitive && (
                    <div className="mt-2 text-[10px] p-1.5 rounded bg-amber-950/70 border border-amber-800/60 text-amber-200">
                      {showRangerCoordinates ? (
                        <span>🔒 Ranger GPS: Lat -0.5124°, Lng 37.0421° (Exact Nest Site)</span>
                      ) : (
                        <span>🛡️ Obfuscated: ~15km fuzzy centroid (Public protection)</span>
                      )}
                    </div>
                  )}

                  {spec.isInvasive && (
                    <div className="mt-2 text-[10px] p-1.5 rounded bg-purple-950/70 border border-purple-800/60 text-purple-200">
                      <span>⚠️ Outbreak Density: High Cluster (Alerted Authorities)</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Map Footer Legend */}
          <div className="relative z-10 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Native & Keystone
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-500" /> Invasive Taxa
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500" /> Endangered / Masked
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500" /> Agricultural Pest
              </span>
            </div>
            <span>Datum: WGS 84 / PostGIS</span>
          </div>

        </div>

        {/* Right Observation Inspector Panel */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
            
            <div className="border-b border-slate-800 pb-3">
              <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold block mb-1">
                Observation Geospatial Inspector
              </span>
              <h3 className="text-lg font-extrabold text-white">
                {selectedObservation.commonName}
              </h3>
              <p className="text-xs font-mono text-emerald-400 italic">
                {selectedObservation.scientificName}
              </p>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-slate-400 font-semibold block">Geographic Habitat</span>
                <p className="text-slate-200">{selectedObservation.habitat}</p>
              </div>

              <div>
                <span className="text-slate-400 font-semibold block">Global & Regional Range</span>
                <p className="text-slate-200">{selectedObservation.geographicRange}</p>
              </div>

              {/* Anti-Poaching Coordinate Generalization Notice */}
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                <span className="text-slate-400 font-semibold flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Spatial Security Protocol (Section 18)
                </span>
                {selectedObservation.isEndangeredSensitive ? (
                  <p className="text-amber-300 text-[11px] leading-relaxed">
                    This species is flagged under the Endangered Wildlife Protection Directive. To prevent poachers from triangulating specimens, raw GPS coordinates are blurred into a 15km fuzzy polygon for standard users.
                  </p>
                ) : (
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    Standard coordinate resolution applied. Data verified under Darwin Core biodiversity exchange standards.
                  </p>
                )}
              </div>

              {/* Invasive Cluster Early Warning Alert */}
              {selectedObservation.isInvasive && (
                <div className="p-3 rounded-xl bg-purple-950/60 border border-purple-800/60 text-purple-200 space-y-1 text-[11px]">
                  <span className="font-bold flex items-center gap-1 text-purple-300">
                    <AlertOctagon className="w-4 h-4 text-purple-400" />
                    Section 15 Biosecurity Alert Dispatched
                  </span>
                  <p>
                    Outbreak density in {selectedObservation.sampleLocation.regionName} has triggered automated alerts to the Regional Environmental Authority.
                  </p>
                </div>
              )}
            </div>

          </div>

          {/* Regional Hotspots List */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              Regional Biodiversity Hotspots (Section 22)
            </h4>
            <div className="space-y-2 text-xs">
              {hotspots.map((spot) => (
                <div key={spot.id} className="p-2.5 rounded-lg bg-slate-950 border border-slate-800/80">
                  <div className="flex justify-between items-center text-slate-200 font-semibold">
                    <span>{spot.name}</span>
                    <span className="text-[10px] font-mono text-emerald-400">{spot.speciesCount}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">{spot.description}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
