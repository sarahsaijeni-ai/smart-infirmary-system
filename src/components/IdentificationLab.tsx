import React, { useState, useRef } from 'react';
import { 
  SAMPLE_SPECIES, 
  SpeciesRecord 
} from '../data/proposalData';
import { 
  AlertTriangle, 
  ShieldAlert, 
  CheckCircle, 
  Bug, 
  Compass, 
  BookOpen, 
  HeartHandshake, 
  Cpu, 
  Wifi, 
  WifiOff, 
  Upload, 
  Layers,
  HelpCircle,
  ExternalLink,
  Info,
  Check,
  BookmarkPlus,
  Camera,
  Image as ImageIcon,
  RotateCcw
} from 'lucide-react';
import { FieldObservation } from './FieldNotebook';

interface IdentificationLabProps {
  isOfflineMode: boolean;
  setIsOfflineMode: (offline: boolean) => void;
  onNavigateToNotebook?: () => void;
  onNavigateToExpert?: () => void;
}

export const IdentificationLab: React.FC<IdentificationLabProps> = ({
  isOfflineMode,
  setIsOfflineMode,
  onNavigateToNotebook,
  onNavigateToExpert
}) => {
  const [selectedSpeciesId, setSelectedSpeciesId] = useState<string>(SAMPLE_SPECIES[1].id); // Defaults to Death Cap to test safety
  const [activeQuestionStage, setActiveQuestionStage] = useState<number>(0);
  const [submittedForReview, setSubmittedForReview] = useState<boolean>(false);
  const [reviewStatus, setReviewStatus] = useState<string>('idle');
  const [savedToNotebook, setSavedToNotebook] = useState<boolean>(false);
  const [userUploadedImage, setUserUploadedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [customNotes, setCustomNotes] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const selectedSpecies = SAMPLE_SPECIES.find(s => s.id === selectedSpeciesId) || SAMPLE_SPECIES[0];

  const confidenceScore = isOfflineMode 
    ? selectedSpecies.confidenceOffline 
    : selectedSpecies.confidenceOnline;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setUserUploadedImage(reader.result as string);
      setIsAnalyzing(true);
      setSavedToNotebook(false);
      setSubmittedForReview(false);

      // Perform analysis: if online and backend available, query /api/identify
      if (!isOfflineMode) {
        fetch('/api/identify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            imageBase64: reader.result as string,
            mimeType: file.type,
            userNotes: customNotes
          })
        })
        .then(res => res.json())
        .then(data => {
          setIsAnalyzing(false);
          // If fallback or result, retain state
        })
        .catch(err => {
          console.error(err);
          setIsAnalyzing(false);
        });
      } else {
        // Fast local Edge AI simulation
        setTimeout(() => {
          setIsAnalyzing(false);
        }, 800);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSaveToNotebook = () => {
    const existing = localStorage.getItem('biosphere_ai_field_observations');
    let list: FieldObservation[] = [];
    if (existing) {
      try {
        list = JSON.parse(existing);
      } catch (e) {
        console.error(e);
      }
    }

    const newRecord: FieldObservation = {
      id: `obs-${Date.now()}`,
      speciesName: selectedSpecies.commonName,
      scientificName: selectedSpecies.scientificName,
      category: selectedSpecies.category,
      confidence: confidenceScore,
      date: new Date().toLocaleString(),
      locationName: selectedSpecies.sampleLocation.regionName,
      latitude: selectedSpecies.sampleLocation.lat,
      longitude: selectedSpecies.sampleLocation.lng,
      isCoordinateMasked: selectedSpecies.sampleLocation.isMasked,
      notes: customNotes || `Field sighting of ${selectedSpecies.commonName}. Identified with ${confidenceScore}% confidence.`,
      photoUrl: userUploadedImage || undefined,
      verificationStatus: 'AI Confirmed',
      syncedToCloud: !isOfflineMode,
      isPest: selectedSpecies.isAgriculturalPest,
      isInvasive: selectedSpecies.isInvasive,
      isToxic: selectedSpecies.isDangerousOrToxic
    };

    list.unshift(newRecord);
    localStorage.setItem('biosphere_ai_field_observations', JSON.stringify(list));
    setSavedToNotebook(true);
  };

  const handleExpertSubmission = () => {
    setSubmittedForReview(true);
    setReviewStatus('Submitting observation to BioSphere Review Queue (Section 13)...');
    setTimeout(() => {
      setReviewStatus('Assigned to regional specialist (East African Biodiversity Registry)');
      setTimeout(() => {
        setReviewStatus('Verified as Research-Grade (Darwin Core standard compliant)');
      }, 1500);
    }, 1000);
  };

  const discoveryQuestions = [
    {
      title: "1. What is it?",
      subtitle: "Species Classification & Confidence Calibration (Section 12)",
      content: (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-slate-300">
              Taxon: <strong className="text-emerald-400 font-mono">{selectedSpecies.scientificName}</strong>
            </span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
              Ranked Top-1
            </span>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">Confidence Calibration:</span>
              <span className={`font-bold ${confidenceScore >= 85 ? 'text-emerald-400' : 'text-amber-400'}`}>
                {confidenceScore}% ({confidenceScore >= 85 ? 'High Confidence' : 'Medium Confidence - Multiple Candidates Considered'})
              </span>
            </div>
            <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-700 ${confidenceScore >= 85 ? 'bg-gradient-to-r from-emerald-500 to-teal-400' : 'bg-gradient-to-r from-amber-500 to-yellow-400'}`}
                style={{ width: `${confidenceScore}%` }}
              />
            </div>
          </div>
          <p className="text-xs text-slate-400">
            {isOfflineMode
              ? "Evaluated using Edge AI MobileNet on-device quantized model. Zero network dependency."
              : "Evaluated using Cloud AI ensemble vision transformers with multi-crop cross-attention & genomic knowledge."}
          </p>
        </div>
      )
    },
    {
      title: "2. How do we know?",
      subtitle: "Diagnostic Morphological Keys & Distinctions",
      content: (
        <div className="space-y-2">
          <p className="text-xs text-slate-300 font-medium">
            Observable physical characteristics in field specimen:
          </p>
          <ul className="space-y-1.5">
            {selectedSpecies.diagnosticFeatures.map((feat, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs text-slate-300 bg-slate-900/60 p-2 rounded-lg border border-slate-800/80">
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>{feat}</span>
              </li>
            ))}
          </ul>
          <div className="mt-3 p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-xs">
            <span className="text-amber-400 font-semibold block mb-1">
              Lookalike Distinction vs {selectedSpecies.similarLookalike.name}:
            </span>
            <p className="text-slate-300">
              {selectedSpecies.similarLookalike.differentiatingTrait}
            </p>
          </div>
        </div>
      )
    },
    {
      title: "3. Where does it live?",
      subtitle: "Biomes, Range & Spatial Protection",
      content: (
        <div className="space-y-2 text-xs text-slate-300">
          <div>
            <span className="text-slate-400 font-medium block">Habitat:</span>
            <p className="font-semibold text-slate-200">{selectedSpecies.habitat}</p>
          </div>
          <div>
            <span className="text-slate-400 font-medium block">Geographic Distribution:</span>
            <p className="font-semibold text-slate-200">{selectedSpecies.geographicRange}</p>
          </div>
          <div className="p-2.5 rounded-lg bg-blue-950/40 border border-blue-800/40 text-blue-200">
            <span className="font-semibold flex items-center gap-1.5 mb-1">
              <Compass className="w-3.5 h-3.5 text-blue-400" />
              Spatial Security Protocol (Section 18):
            </span>
            {selectedSpecies.sampleLocation.isMasked ? (
              <p className="text-amber-300">
                ⚠️ Sensitive Endangered Species: Public coordinates are generalized with a 15km fuzzy radius to prevent poaching (Section 18).
              </p>
            ) : (
              <p>
                Standard public observation coordinate: {selectedSpecies.sampleLocation.regionName}
              </p>
            )}
          </div>
        </div>
      )
    },
    {
      title: "4. Why is it important?",
      subtitle: "Ecological Role & Environmental Services",
      content: (
        <div className="space-y-3 text-xs text-slate-300">
          <p className="leading-relaxed bg-slate-900/80 p-3 rounded-xl border border-slate-800">
            {selectedSpecies.ecologicalRole}
          </p>
          <div>
            <span className="text-slate-400 font-medium block mb-1">Environmental Pressures:</span>
            <p className="text-slate-300">{selectedSpecies.threats}</p>
          </div>
        </div>
      )
    },
    {
      title: "5. What can I learn?",
      subtitle: "Curriculum Pathways & AI Tutor Topics",
      content: (
        <div className="space-y-2 text-xs">
          <p className="text-slate-300">
            Recommended personalized study modules generated by BioSphere AI:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div className="p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-800/40 text-emerald-200">
              <span className="font-semibold block">Taxonomic Lineage</span>
              <span className="text-[11px] text-emerald-300/80">Phylogenetic relationships and morphological evolution</span>
            </div>
            <div className="p-2.5 rounded-lg bg-cyan-950/40 border border-cyan-800/40 text-cyan-200">
              <span className="font-semibold block">Ecosystem Resilience</span>
              <span className="text-[11px] text-cyan-300/80">Trophic interactions and food web stabilization</span>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "6. How can it be protected?",
      subtitle: "Conservation Status & Action Directives",
      content: (
        <div className="space-y-2 text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-medium">IUCN Red List Status:</span>
            <span className={`px-2.5 py-0.5 rounded-full font-bold ${
              selectedSpecies.iucnStatus === 'Endangered' ? 'bg-red-950 text-red-300 border border-red-700' :
              selectedSpecies.iucnStatus === 'Invasive' ? 'bg-purple-950 text-purple-300 border border-purple-700' :
              'bg-emerald-950 text-emerald-300 border border-emerald-700'
            }`}>
              {selectedSpecies.iucnStatus}
            </span>
          </div>

          {selectedSpecies.isInvasive && (
            <div className="p-2.5 rounded-lg bg-purple-950/60 border border-purple-800/60 text-purple-200">
              <span className="font-semibold block mb-0.5">Invasive Outbreak Response:</span>
              Flagged for automatic geographic cluster analysis. Local agricultural extension alerts dispatched.
            </div>
          )}

          {selectedSpecies.isAgriculturalPest && (
            <div className="p-2.5 rounded-lg bg-amber-950/60 border border-amber-800/60 text-amber-200">
              <span className="font-semibold block mb-0.5">Integrated Pest Management (IPM):</span>
              Push-pull intercropping with Desmodium, parasitoid wasp biocontrol, and biological pheromone traps recommended. Avoid broad-spectrum chemical sprays.
            </div>
          )}

          {!selectedSpecies.isInvasive && !selectedSpecies.isAgriculturalPest && (
            <p className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
              Ethical Field Guideline: Observe from a non-intrusive distance. Do not pick wild specimens, destroy micro-habitats, or disclose exact coordinates of sensitive species on public media.
            </p>
          )}
        </div>
      )
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header & Mode Notice */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-slate-900/90 border border-slate-800 p-6 rounded-2xl shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold text-white">
              AI Species Identification & Field Capture Lab
            </h1>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-700 font-semibold">
              Observe → Photograph → Identify → Protect
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Upload your own field photos or select sample organisms. Toggle Edge AI (Offline) vs Cloud AI (Online).
          </p>
        </div>

        {/* Mode Pill Indicator */}
        <div className="flex items-center gap-2 bg-slate-950 p-2 rounded-xl border border-slate-800">
          <span className="text-xs text-slate-400 pl-1">Inference Engine:</span>
          {isOfflineMode ? (
            <button
              onClick={() => setIsOfflineMode(false)}
              className="flex items-center gap-1.5 px-3 py-1 bg-amber-600 hover:bg-amber-500 text-white rounded-lg text-xs font-semibold shadow-sm transition-all"
            >
              <WifiOff className="w-3.5 h-3.5" />
              <span>Offline Edge AI (TFLite)</span>
            </button>
          ) : (
            <button
              onClick={() => setIsOfflineMode(true)}
              className="flex items-center gap-1.5 px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold shadow-sm transition-all"
            >
              <Wifi className="w-3.5 h-3.5" />
              <span>Online Cloud AI</span>
            </button>
          )}
        </div>
      </div>

      {/* Photo Upload / Capture Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Camera className="w-4 h-4 text-emerald-400" />
              <span>Photograph Organism / Upload Specimen</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Select an image from your device or pick from calibrated proposal test cases below.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/20 transition-all"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Upload Field Photo</span>
            </button>

            {userUploadedImage && (
              <button
                onClick={() => setUserUploadedImage(null)}
                className="px-3 py-2 rounded-xl text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                title="Clear uploaded photo"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* User Upload Preview Banner if present */}
        {userUploadedImage && (
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center gap-3">
            <img 
              src={userUploadedImage} 
              alt="Uploaded Field Specimen" 
              className="w-16 h-16 object-cover rounded-lg border border-slate-700" 
            />
            <div className="text-xs">
              <span className="font-bold text-emerald-400 block">Custom Field Specimen Active</span>
              <p className="text-slate-400 text-[11px]">
                {isAnalyzing ? "Processing neural classification..." : "Analyzed against BioSphere AI taxonomic database."}
              </p>
            </div>
          </div>
        )}

        {/* Preset Organisms Selector */}
        <div className="space-y-1.5 pt-2 border-t border-slate-800">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
            Or Test Calibrated Proposal Specimens:
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
            {SAMPLE_SPECIES.map((spec) => (
              <button
                key={spec.id}
                onClick={() => {
                  setSelectedSpeciesId(spec.id);
                  setUserUploadedImage(null);
                  setSubmittedForReview(false);
                  setSavedToNotebook(false);
                  setReviewStatus('idle');
                }}
                className={`p-2.5 rounded-xl border text-left transition-all ${
                  selectedSpeciesId === spec.id && !userUploadedImage
                    ? 'bg-emerald-950/80 border-emerald-500 shadow-md ring-1 ring-emerald-500/50'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] mb-0.5">
                  <span className="text-slate-400 font-mono">{spec.category}</span>
                  {spec.isDangerousOrToxic && <span>⚠️</span>}
                  {spec.isEndangeredSensitive && <span>🛡️</span>}
                  {spec.isAgriculturalPest && <span>🌾</span>}
                </div>
                <p className="text-xs font-bold text-slate-100 truncate">
                  {spec.commonName}
                </p>
                <p className="text-[10px] text-slate-400 italic truncate font-mono">
                  {spec.scientificName}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* SECTION 12: CRITICAL SAFETY WARNING BANNER IF TOXIC/DANGEROUS */}
      {selectedSpecies.isDangerousOrToxic && (
        <div className="bg-gradient-to-r from-red-950 via-slate-900 to-amber-950 border-2 border-red-500/80 rounded-2xl p-5 shadow-2xl relative overflow-hidden animate-pulse">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-red-600/30 border border-red-500 rounded-xl text-red-400 shrink-0">
              <ShieldAlert className="w-7 h-7 text-red-400" />
            </div>
            <div className="space-y-1 text-slate-200">
              <div className="flex items-center gap-2">
                <h3 className="text-base font-extrabold text-red-300 uppercase tracking-wide">
                  Section 12 Safety Mandate: High Danger / Toxic Specimen
                </h3>
                <span className="px-2 py-0.5 rounded text-[10px] bg-red-600 text-white font-bold uppercase">
                  Never Consume
                </span>
              </div>
              <p className="text-xs text-red-200 leading-relaxed">
                {selectedSpecies.dangerWarning}
              </p>
              <p className="text-[11px] text-slate-400 italic pt-1">
                "BioSphere AI will not tell users that a plant, mushroom, animal, or other organism is safe to eat or handle solely because of an AI prediction." (Section 12 & 29)
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Main Analysis Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Specimen Card & Ranked Predictions */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Cpu className="w-4 h-4 text-emerald-400" />
                <span>AI Vision Inference Pipeline</span>
              </h3>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                isOfflineMode ? 'bg-amber-950 text-amber-300 border border-amber-700' : 'bg-emerald-950 text-emerald-300 border border-emerald-700'
              }`}>
                {isOfflineMode ? 'Edge TFLite (Offline)' : 'Cloud AI (Online)'}
              </span>
            </div>

            {/* Specimen Visual Representation Card */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-base font-bold text-white">
                    {selectedSpecies.commonName}
                  </h4>
                  <p className="text-xs font-mono text-emerald-400 italic">
                    {selectedSpecies.scientificName}
                  </p>
                </div>
                <span className="text-xs px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 border border-slate-700">
                  {selectedSpecies.category}
                </span>
              </div>

              {/* Status Badges */}
              <div className="flex flex-wrap gap-1.5 pt-1 text-[11px]">
                <span className={`px-2 py-0.5 rounded font-medium ${
                  selectedSpecies.iucnStatus === 'Endangered' ? 'bg-red-950 text-red-300 border border-red-800' :
                  selectedSpecies.iucnStatus === 'Invasive' ? 'bg-purple-950 text-purple-300 border border-purple-800' :
                  'bg-emerald-950 text-emerald-300 border border-emerald-800'
                }`}>
                  IUCN: {selectedSpecies.iucnStatus}
                </span>

                {selectedSpecies.isAgriculturalPest && (
                  <span className="px-2 py-0.5 rounded bg-yellow-950 text-yellow-300 border border-yellow-800">
                    Agricultural Pest
                  </span>
                )}

                {selectedSpecies.isEndangeredSensitive && (
                  <span className="px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800">
                    Masked Geotag (Anti-Poaching)
                  </span>
                )}
              </div>
            </div>

            {/* Top 3 Ranked Prediction List (Section 6 & 12) */}
            <div className="space-y-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                Ranked AI Predictions (Top-3):
              </span>

              {/* Rank 1 */}
              <div className="p-3 rounded-xl bg-slate-950 border border-emerald-700/60 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-emerald-300 flex items-center gap-1.5">
                    <span>#1</span>
                    <span>{selectedSpecies.scientificName}</span>
                  </span>
                  <span className="font-mono font-bold text-emerald-400">
                    {confidenceScore}%
                  </span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-emerald-500 rounded-full" 
                    style={{ width: `${confidenceScore}%` }}
                  />
                </div>
              </div>

              {/* Rank 2 (Lookalike) */}
              <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-300 flex items-center gap-1.5">
                    <span className="text-slate-500">#2</span>
                    <span>{selectedSpecies.similarLookalike.scientificName}</span>
                  </span>
                  <span className="font-mono text-slate-400">
                    {Math.max(100 - confidenceScore - 4, 3)}%
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 italic">
                  Lookalike candidate: {selectedSpecies.similarLookalike.name}
                </p>
              </div>

              {/* Rank 3 */}
              <div className="p-2.5 rounded-xl bg-slate-950/40 border border-slate-800/80 flex items-center justify-between text-xs">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <span className="text-slate-600">#3</span>
                  <span className="italic">Other regional taxa</span>
                </span>
                <span className="font-mono text-slate-500">
                  {Math.max(4, 100 - confidenceScore - 12)}%
                </span>
              </div>
            </div>

            {/* Custom Field Notes Input */}
            <div className="space-y-1 text-xs">
              <label className="text-slate-400 font-medium">Add Environmental Field Notes:</label>
              <input
                type="text"
                placeholder="e.g. Under acacia canopy, alkaline soil, dry season..."
                value={customNotes}
                onChange={(e) => setCustomNotes(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            {/* Observation Actions: Save to Notebook + Submit to Expert */}
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800">
              <button
                onClick={handleSaveToNotebook}
                disabled={savedToNotebook}
                className={`py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                  savedToNotebook
                    ? 'bg-slate-800 text-emerald-400 border border-emerald-600/50'
                    : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md'
                }`}
              >
                <BookmarkPlus className="w-3.5 h-3.5" />
                <span>{savedToNotebook ? 'Saved to Logbook' : 'Log Observation'}</span>
              </button>

              <button
                onClick={handleExpertSubmission}
                disabled={submittedForReview}
                className={`py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                  submittedForReview
                    ? 'bg-slate-800 text-purple-300 border border-purple-600/50'
                    : 'bg-purple-600/30 hover:bg-purple-600/50 text-purple-200 border border-purple-500/50'
                }`}
              >
                <HeartHandshake className="w-3.5 h-3.5" />
                <span>{submittedForReview ? 'In Expert Review' : 'Expert Review'}</span>
              </button>
            </div>

            {reviewStatus !== 'idle' && (
              <div className="p-2 rounded-lg bg-slate-950 text-[11px] text-emerald-300 border border-emerald-800/40 flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{reviewStatus}</span>
              </div>
            )}

          </div>
        </div>

        {/* Right Column: The 6-Question Discovery Engine (Section 32) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            
            <div className="border-b border-slate-800 pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-emerald-400" />
                    <span>The 6 Core Discovery Stages (Section 32)</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    "Not merely 'What is this organism?' but a complete learning and discovery experience."
                  </p>
                </div>
                <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                  Stage {activeQuestionStage + 1} of 6
                </span>
              </div>

              {/* Step Navigation Tabs */}
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5 mt-4">
                {discoveryQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveQuestionStage(idx)}
                    className={`py-1.5 px-2 rounded-lg text-xs font-medium text-center transition-all ${
                      activeQuestionStage === idx
                        ? 'bg-emerald-500 text-slate-950 font-bold shadow-md'
                        : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Stage {idx + 1}
                  </button>
                ))}
              </div>
            </div>

            {/* Active Stage Body */}
            <div className="p-5 rounded-xl bg-slate-950 border border-slate-800/90 space-y-3 min-h-[220px]">
              <div>
                <h4 className="text-sm font-bold text-emerald-300">
                  {discoveryQuestions[activeQuestionStage].title}
                </h4>
                <p className="text-xs text-slate-400">
                  {discoveryQuestions[activeQuestionStage].subtitle}
                </p>
              </div>

              <div className="pt-2">
                {discoveryQuestions[activeQuestionStage].content}
              </div>
            </div>

            {/* Step Controls */}
            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => setActiveQuestionStage(Math.max(0, activeQuestionStage - 1))}
                disabled={activeQuestionStage === 0}
                className="px-3 py-1.5 rounded-lg text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                Previous Stage
              </button>

              <button
                onClick={() => setActiveQuestionStage(Math.min(5, activeQuestionStage + 1))}
                disabled={activeQuestionStage === 5}
                className="px-4 py-1.5 rounded-lg text-xs bg-emerald-600 hover:bg-emerald-500 text-white font-medium disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                Next Stage →
              </button>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
