import React, { useState } from 'react';
import { 
  Copy, 
  Check, 
  Download, 
  Sparkles, 
  Terminal, 
  FileCode, 
  ShieldAlert, 
  BookMarked,
  Layers,
  Search,
  CheckCircle2
} from 'lucide-react';
import { MASTER_PROMPT_TEXT } from '../data/masterPrompt';
import { PROPOSAL_SECTIONS } from '../data/proposalData';

type PromptVariant = 'master' | 'srs' | 'json' | 'edge';

export const PromptViewer: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [variant, setVariant] = useState<PromptVariant>('master');

  const getPromptText = (): string => {
    switch (variant) {
      case 'master':
        return MASTER_PROMPT_TEXT;
      case 'srs':
        return `# SOFTWARE REQUIREMENTS SPECIFICATION (SRS): BIOSPHERE AI
Generated from BioSphere AI Project Proposal (33 Comprehensive Sections)

## 1. PURPOSE & VISION
BioSphere AI is an offline-first intelligent biodiversity identification, learning, and conservation platform.
Tagline: "Identify. Learn. Discover. Protect. From recognizing a species to understanding the world it belongs to."

## 2. SYSTEM INQUIRY PARADIGM
Every species identification must fulfill the 6-stage core inquiry:
1. What is it? (Ranked AI prediction with confidence scores)
2. How do we know? (Diagnostic morphological keys & features)
3. Where does it live? (Habitat, distribution & ecological biomes)
4. Why is it important? (Ecological role, food chain, ecosystem services)
5. What can I learn? (Taxonomy, evolutionary adaptation, interactive lessons)
6. How can it be protected? (Conservation status, threat mitigation, ethical guidelines)

## 3. OFFLINE-FIRST ARCHITECTURE (6 LAYERS)
- Layer 1: Mobile Application (Camera, UI, local observation store, quizzes)
- Layer 2: Edge AI (MobileNet / ONNX Runtime Mobile / TFLite local inference)
- Layer 3: Cloud AI (Large-scale vision models, clustering, semantic AI tutor)
- Layer 4: Biodiversity Database (Taxonomic catalog, PostGIS spatial data, observations)
- Layer 5: Online Learning Platform (Curriculum, 6 challenge quizzes, gamification)
- Layer 6: Security Layer (TLS, RBAC, coordinate generalization for sensitive endangered species)

## 4. STRICT SAFETY & TOXICITY PROTOCOL
- Strict prohibition on affirming edibility or safe handling based solely on an AI prediction.
- High-visibility safety warnings on toxic fungi (e.g. Amanita phalloides), poisonous flora, and venomous fauna.

## 5. SPECIALIZED AGRICULTURAL & INVASIVE MODULES
- Agricultural Pest Identification: Fall Armyworm, stem borers, rusts, IPM guidance.
- Invasive Species Monitoring: Outbreak cluster detection and biosecurity reporting.

## 6. CONTINUOUS MODEL IMPROVEMENT (7-STEP FEEDBACK LOOP)
New Observation → AI Prediction → Uncertainty Detection → Expert Verification → Dataset Improvement → Model Retraining → Improved Prediction.`;

      case 'json':
        return JSON.stringify({
          platform: "BioSphere AI",
          version: "1.0.0",
          tagline: "Identify. Learn. Discover. Protect.",
          coreWorkflow: [
            "Observe", "Photograph", "Identify", "Learn", "Verify", "Record", "Monitor", "Protect"
          ],
          inquiryEngine: [
            "What is it?",
            "How do we know?",
            "Where does it live?",
            "Why is it important?",
            "What can I learn?",
            "How can it be protected?"
          ],
          architectureLayers: {
            layer1: "Mobile Application (offline-ready, camera, logbook)",
            layer2: "Edge AI (MobileNet, TFLite, ONNX local classification)",
            layer3: "Cloud AI (Deep transformers, clustering, AI tutor)",
            layer4: "Biodiversity Database (Taxonomy, PostGIS)",
            layer5: "Online Learning Platform (Lessons, 6 Quizzes, AI Tutor)",
            layer6: "Security Layer (RBAC, Encryption, Fuzzy Coordinate Generalization)"
          },
          safetyPolicy: {
            edibilityProhibition: true,
            highConfidenceThreshold: 0.85,
            mediumConfidenceThreshold: 0.50,
            toxicWarningMandatory: true,
            endangeredCoordinateObfuscationKm: "10-25km fuzzy bounding box"
          },
          targetUsers: [
            "Students", "Teachers", "Farmers", "Researchers", 
            "Conservationists", "Environmental Authorities", 
            "Citizen Scientists", "General Public"
          ],
          quizChallenges: [
            "Identify the Species",
            "Taxonomy Challenge",
            "Habitat Challenge",
            "Conservation Challenge",
            "Biodiversity Challenge",
            "Similar Species Challenge"
          ],
          futureDevelopment: [
            "Bioacoustic Identification",
            "Solar AI Camera Traps",
            "eDNA Integration",
            "Climate Ecosystem Monitoring"
          ]
        }, null, 2);

      case 'edge':
        return `// BIOSPHERE AI EDGE INFERENCE SYSTEM PROMPT
// Optimized for Mobile Edge AI Runtime (TensorFlow Lite / ONNX Mobile / CoreML)

ROLE: You are the offline edge inference engine for BioSphere AI.
CONSTRAINTS:
1. Zero network dependency: Run on local device storage.
2. Produce Top-3 ranked classifications with calibrated probabilities.
3. If probability < 0.50, flag as HIGH UNCERTAINTY and request alternative angles.
4. If species matches Toxic/Venomous list (Amanita, Conium, Dendroaspis, etc.), IMMEDIATELY output DANGER_WARNING: "Do not touch, handle, or consume. AI prediction is not a guarantee of safety."
5. Log observation with device GPS, timestamp, and local image hash into offline sync queue.
6. When sensitive species is detected, set coordinate_masked = true prior to any synchronization.`;
    }
  };

  const currentContent = getPromptText();

  const handleCopy = () => {
    navigator.clipboard.writeText(currentContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownload = () => {
    const ext = variant === 'json' ? 'json' : variant === 'master' || variant === 'srs' ? 'md' : 'txt';
    const blob = new Blob([currentContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `BioSphere_AI_${variant}_prompt.${ext}`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 border border-emerald-700/40 rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                All 33 Proposal Sections Included
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-teal-500/20 text-teal-300 border border-teal-500/30">
                Offline-First + Cloud Hybrid
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              BioSphere AI Master System Prompt & Blueprint
            </h1>
            <p className="text-slate-300 text-sm max-w-3xl leading-relaxed">
              Exhaustively synthesized from the official <strong className="text-emerald-300">BioSphere AI Project Proposal</strong> document. 
              Encompasses offline edge computer vision, responsible AI safety guardrails, the 6 core inquiry questions, 
              expert verification workflows, invasive outbreak tracking, and agricultural pest management.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleCopy}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all shadow-md ${
                copied
                  ? 'bg-emerald-600 text-white shadow-emerald-600/30 ring-2 ring-emerald-400'
                  : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold shadow-emerald-500/20'
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
                  <span>Copy Master Prompt</span>
                </>
              )}
            </button>

            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600 transition-colors"
            >
              <Download className="w-4 h-4 text-emerald-400" />
              <span>Download File</span>
            </button>
          </div>
        </div>

        {/* Quick Highlights Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-slate-800/80 text-xs text-slate-300">
          <div className="flex items-center gap-2 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
            <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Strict Toxicity & Safety Rules</span>
          </div>
          <div className="flex items-center gap-2 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
            <BookMarked className="w-4 h-4 text-teal-400 shrink-0" />
            <span>6-Stage Core Inquiry Workflow</span>
          </div>
          <div className="flex items-center gap-2 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
            <Layers className="w-4 h-4 text-purple-400 shrink-0" />
            <span>6-Layer System Architecture</span>
          </div>
          <div className="flex items-center gap-2 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
            <Terminal className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>7-Step Model Retraining Loop</span>
          </div>
        </div>
      </div>

      {/* Format Selector & Search Toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900/80 p-3 rounded-xl border border-slate-800">
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-2">
            Format:
          </span>
          <button
            onClick={() => setVariant('master')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
              variant === 'master'
                ? 'bg-emerald-600 text-white font-semibold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            Master Prompt (All 33 Sections)
          </button>
          <button
            onClick={() => setVariant('srs')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
              variant === 'srs'
                ? 'bg-emerald-600 text-white font-semibold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            SRS Architecture Spec
          </button>
          <button
            onClick={() => setVariant('json')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
              variant === 'json'
                ? 'bg-emerald-600 text-white font-semibold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            JSON Blueprint Config
          </button>
          <button
            onClick={() => setVariant('edge')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
              variant === 'edge'
                ? 'bg-emerald-600 text-white font-semibold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            Mobile Edge AI System
          </button>
        </div>

        {/* Quick Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search prompt keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
        </div>
      </div>

      {/* Code / Prompt Display Canvas */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-800 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <FileCode className="w-4 h-4 text-emerald-400" />
            <span className="font-mono font-semibold text-slate-300">
              {variant === 'master' ? 'BioSphere_AI_Master_Prompt.system.txt' :
               variant === 'srs' ? 'BioSphere_AI_Requirements_Spec.md' :
               variant === 'json' ? 'biosphere_ai_blueprint.json' :
               'biosphere_edge_instruction.prompt'}
            </span>
            <span className="text-[11px] text-slate-500">
              ({currentContent.length.toLocaleString()} characters)
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

        <div className="p-4 sm:p-6 overflow-x-auto max-h-[650px] overflow-y-auto font-mono text-xs text-slate-300 leading-relaxed scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-slate-950 whitespace-pre-wrap">
          {searchQuery ? (
            // Highlight search query
            currentContent.split(new RegExp(`(${searchQuery})`, 'gi')).map((chunk, index) =>
              chunk.toLowerCase() === searchQuery.toLowerCase() ? (
                <mark key={index} className="bg-amber-400/40 text-amber-200 px-0.5 rounded">
                  {chunk}
                </mark>
              ) : (
                chunk
              )
            )
          ) : (
            currentContent
          )}
        </div>
      </div>

      {/* Proposal Sections Quick Matrix */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-emerald-400" />
            Proposal Document Sections Synthesized in this Prompt
          </h2>
          <span className="text-xs text-slate-400">
            33 Sections fully represented
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {PROPOSAL_SECTIONS.map((sec) => (
            <div
              key={sec.number}
              className="bg-slate-900/70 border border-slate-800 p-3 rounded-xl hover:border-emerald-700/50 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-1 mb-1.5">
                  <span className="text-[11px] font-mono text-emerald-400 font-bold">
                    Sec {sec.number}
                  </span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                    sec.category === 'Security' ? 'bg-red-950/80 text-red-300 border border-red-800/40' :
                    sec.category === 'Technical' ? 'bg-blue-950/80 text-blue-300 border border-blue-800/40' :
                    sec.category === 'Educational' ? 'bg-amber-950/80 text-amber-300 border border-amber-800/40' :
                    sec.category === 'Operational' ? 'bg-purple-950/80 text-purple-300 border border-purple-800/40' :
                    'bg-emerald-950/80 text-emerald-300 border border-emerald-800/40'
                  }`}>
                    {sec.category}
                  </span>
                </div>
                <h3 className="text-xs font-semibold text-slate-200 line-clamp-1">
                  {sec.title}
                </h3>
                <p className="text-[11px] text-slate-400 line-clamp-2 mt-1">
                  {sec.summary}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
