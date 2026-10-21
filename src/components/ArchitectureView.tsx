import React, { useState } from 'react';
import { 
  Layers, 
  Cpu, 
  Cloud, 
  Database, 
  GraduationCap, 
  ShieldCheck, 
  Users, 
  RefreshCw, 
  Calendar, 
  Radio, 
  Compass,
  ArrowRight,
  Sparkles
} from 'lucide-react';

export const ArchitectureView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'architecture' | 'loop' | 'phases' | 'users' | 'future'>('architecture');

  const layers = [
    {
      layer: 'Layer 1 — Mobile Application',
      icon: Users,
      color: 'from-blue-500 to-cyan-500',
      description: 'Camera capture, image upload, edge AI identification, offline learning, species profiles, quizzes, observation management, and local encryption.'
    },
    {
      layer: 'Layer 2 — Edge AI Engine',
      icon: Cpu,
      color: 'from-emerald-500 to-teal-500',
      description: 'On-device image preprocessing, feature extraction, local classification via quantized models (MobileNet, EfficientNet, TensorFlow Lite, ONNX Runtime Mobile), and confidence calibration.'
    },
    {
      layer: 'Layer 3 — Cloud AI Services',
      icon: Cloud,
      color: 'from-purple-500 to-indigo-500',
      description: 'Advanced identification, multi-crop vision transformers, difficult/uncertain case resolution, model updates, spatial cluster analysis for invasive outbreaks, and conversational AI tutoring.'
    },
    {
      layer: 'Layer 4 — Biodiversity Database',
      icon: Database,
      color: 'from-amber-500 to-orange-500',
      description: 'Expanded species encyclopedia, taxonomic hierarchy, photographic catalog, observation logs, conservation metadata, and expert verification records.'
    },
    {
      layer: 'Layer 5 — Online Learning Platform',
      icon: GraduationCap,
      color: 'from-pink-500 to-rose-500',
      description: 'Interactive lessons, 6 challenge quizzes, AI tutor, multimedia library (audio/video), personalized study dashboard, and community forum.'
    },
    {
      layer: 'Layer 6 — Security & Privacy Layer',
      icon: ShieldCheck,
      color: 'from-red-500 to-amber-500',
      description: 'Secure authentication, role-based access control (RBAC), end-to-end encryption, location generalization (10-25km fuzzy bounding box for endangered species), and compliance auditing.'
    }
  ];

  const loopSteps = [
    { title: "1. New Observation", desc: "User photographs specimen in field, timestamped & geotagged" },
    { title: "2. AI Prediction", desc: "Edge or Cloud vision model outputs ranked candidates with confidence" },
    { title: "3. Uncertainty Detection", desc: "Flagged if confidence is moderate/low or species is high-risk" },
    { title: "4. Expert Verification", desc: "Certified botanist, ornithologist, or entomologist validates identity" },
    { title: "5. Dataset Improvement", desc: "Observation upgraded to Research Grade with Darwin Core metadata" },
    { title: "6. Model Retraining", desc: "Curated dataset fine-tunes next model checkpoint" },
    { title: "7. Improved Prediction", desc: "Updated lightweight weights distributed back to mobile edge devices" }
  ];

  const methodologyPhases = [
    { phase: "Phase 1", name: "Requirements Analysis", desc: "Identify users, species categories, technical, security, and offline requirements." },
    { phase: "Phase 2", name: "Dataset Preparation", desc: "Collect, clean, classify, and label diverse biodiversity images (East African focus)." },
    { phase: "Phase 3", name: "AI Development", desc: "Select, fine-tune, test, and optimize species-identification models and confidence calibration." },
    { phase: "Phase 4", name: "Mobile Development", desc: "Develop camera, offline inference, species profile, and observation management." },
    { phase: "Phase 5", name: "Online Platform", desc: "Develop encyclopedia, learning curriculum, quizzes, AI tutor, and multimedia repository." },
    { phase: "Phase 6", name: "Backend Development", desc: "Implement databases (PostgreSQL/PostGIS), synchronization, authentication, and cloud APIs." },
    { phase: "Phase 7", name: "Security Implementation", desc: "Implement encryption, RBAC, and sensitive-location obfuscation." },
    { phase: "Phase 8", name: "Testing", desc: "Conduct functional, AI performance (Top-1/Top-5), offline sync, security, and usability testing." },
    { phase: "Phase 9", name: "Pilot Deployment", desc: "Deploy prototype to selected students, farmers, researchers, and park rangers." },
    { phase: "Phase 10", name: "Evaluation", desc: "Analyze system performance, user feedback, AI accuracy, and conservation learning outcomes." }
  ];

  const targetUsers = [
    { role: "Students", use: "Biodiversity education, field assignments, quizzes, and digital specimen collections." },
    { role: "Teachers", use: "Classroom demonstrations and interactive environmental education." },
    { role: "Farmers", use: "Crop pest diagnostics, weed identification, and eco-friendly IPM guidance." },
    { role: "Researchers", use: "Standardized biodiversity observations and field research telemetry." },
    { role: "Conservationists", use: "Biodiversity monitoring, habitat threat tracking, and conservation planning." },
    { role: "Environmental Authorities", use: "Invasive species reporting, early outbreak detection, and biosecurity." },
    { role: "Citizen Scientists", use: "Crowdsourced biodiversity observations and community verification." },
    { role: "General Public", use: "Learning about organisms encountered in gardens, parks, and nature walks." }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Title */}
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <Layers className="w-6 h-6 text-purple-400" />
          <span>System Architecture & Project Methodology</span>
        </h1>
        <p className="text-xs text-slate-400">
          Section 20 (6 Layers), Section 24 (Continuous Improvement), Section 25 (Target Users), and Section 26 (10 Phases).
        </p>
      </div>

      {/* Tab Switcher */}
      <div className="flex gap-2 overflow-x-auto bg-slate-900 p-2 rounded-xl border border-slate-800 text-xs font-medium">
        <button
          onClick={() => setActiveTab('architecture')}
          className={`px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${
            activeTab === 'architecture' ? 'bg-purple-600 text-white font-semibold' : 'text-slate-400 hover:text-white'
          }`}
        >
          6-Layer Architecture (Sec 20)
        </button>
        <button
          onClick={() => setActiveTab('loop')}
          className={`px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${
            activeTab === 'loop' ? 'bg-purple-600 text-white font-semibold' : 'text-slate-400 hover:text-white'
          }`}
        >
          7-Step Improvement Loop (Sec 24)
        </button>
        <button
          onClick={() => setActiveTab('phases')}
          className={`px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${
            activeTab === 'phases' ? 'bg-purple-600 text-white font-semibold' : 'text-slate-400 hover:text-white'
          }`}
        >
          10-Phase Roadmap (Sec 26)
        </button>
        <button
          onClick={() => setActiveTab('users')}
          className={`px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${
            activeTab === 'users' ? 'bg-purple-600 text-white font-semibold' : 'text-slate-400 hover:text-white'
          }`}
        >
          8 Target Users (Sec 25)
        </button>
        <button
          onClick={() => setActiveTab('future')}
          className={`px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${
            activeTab === 'future' ? 'bg-purple-600 text-white font-semibold' : 'text-slate-400 hover:text-white'
          }`}
        >
          Future Development (Sec 31)
        </button>
      </div>

      {/* Tab Content: 6 Layers */}
      {activeTab === 'architecture' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {layers.map((l, idx) => {
            const Icon = l.icon;
            return (
              <div
                key={idx}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3 relative overflow-hidden"
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-xl bg-gradient-to-br ${l.color} text-white shadow-md`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-white">
                    {l.layer}
                  </h3>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {l.description}
                </p>
              </div>
            );
          })}
        </div>
      )}

      {/* Tab Content: 7-Step Continuous Improvement Loop */}
      {activeTab === 'loop' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="border-b border-slate-800 pb-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <RefreshCw className="w-5 h-5 text-emerald-400" />
              <span>Section 24: Continuous Model Improvement Feedback Cycle</span>
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              "Allows the system to continuously adapt to new species, regions, seasonal morphs, and ecological changes."
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3">
            {loopSteps.map((step, idx) => (
              <div
                key={idx}
                className="bg-slate-950 border border-slate-800 p-4 rounded-xl flex flex-col justify-between relative group hover:border-emerald-500/60 transition-all"
              >
                <div className="space-y-1.5">
                  <span className="text-xs font-bold text-emerald-400 font-mono">
                    Step {idx + 1}
                  </span>
                  <h4 className="text-xs font-bold text-slate-200">
                    {step.title.replace(/^\d+\.\s*/, '')}
                  </h4>
                  <p className="text-[11px] text-slate-400 leading-snug">
                    {step.desc}
                  </p>
                </div>
                {idx < 6 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-20 text-emerald-400">
                    →
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab Content: 10-Phase Roadmap */}
      {activeTab === 'phases' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
            <Calendar className="w-5 h-5 text-purple-400" />
            <span>Section 26: 10-Phase Project Methodology</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {methodologyPhases.map((m, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-purple-300">{m.phase}: {m.name}</span>
                  <span className="text-[10px] text-slate-500 font-mono">Stage {idx + 1}</span>
                </div>
                <p className="text-xs text-slate-300">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab Content: 8 Target Users */}
      {activeTab === 'users' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
            <Users className="w-5 h-5 text-blue-400" />
            <span>Section 25: 8 Target User Personas & Practical Applications</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {targetUsers.map((u, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-emerald-950 border border-emerald-800 flex items-center justify-center text-xs font-bold text-emerald-300">
                    {idx + 1}
                  </span>
                  <h4 className="text-xs font-bold text-white">{u.role}</h4>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{u.use}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab Content: Future Development */}
      {activeTab === 'future' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
            <Radio className="w-5 h-5 text-teal-400" />
            <span>Section 31: Future Biodiversity Innovations Roadmap</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="font-bold text-emerald-300 block text-sm">
                1. Bioacoustic Sound Identification
              </span>
              <p className="text-slate-300 leading-relaxed">
                Spectral analysis and neural audio classification of bird calls, nocturnal amphibian choruses, bat echolocation pulses, and insect stridulation.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="font-bold text-emerald-300 block text-sm">
                2. Autonomous AI Camera Traps
              </span>
              <p className="text-slate-300 leading-relaxed">
                Solar-powered microcontrollers with on-device computer vision to detect rare nocturnal mammals and transmit compact low-bandwidth metadata over LoRa/satellite.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="font-bold text-emerald-300 block text-sm">
                3. Environmental DNA (eDNA) Integration
              </span>
              <p className="text-slate-300 leading-relaxed">
                Cross-referencing photographic observations with water, soil, and air barcode sequencing to identify cryptic or aquatic species.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="font-bold text-emerald-300 block text-sm">
                4. Climate & Regional Academic Networks
              </span>
              <p className="text-slate-300 leading-relaxed">
                Enabling universities, ministries of agriculture, and conservation trusts to leverage the platform as a unified open science biodiversity registry.
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
