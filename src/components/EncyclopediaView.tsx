import React, { useState } from 'react';
import { 
  SAMPLE_SPECIES, 
  SpeciesRecord 
} from '../data/proposalData';
import { 
  BookOpen, 
  Search, 
  Sparkles, 
  Send, 
  Bot, 
  User, 
  Tag, 
  ShieldAlert, 
  Leaf, 
  Feather, 
  Bug, 
  TreePine,
  HelpCircle,
  CheckCircle2
} from 'lucide-react';

interface TutorMessage {
  id: string;
  sender: 'user' | 'tutor';
  text: string;
  timestamp: string;
}

export const EncyclopediaView: React.FC = () => {
  const [selectedSpecies, setSelectedSpecies] = useState<SpeciesRecord>(SAMPLE_SPECIES[0]);
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [tutorInput, setTutorInput] = useState<string>('');
  
  const [messages, setMessages] = useState<TutorMessage[]>([
    {
      id: 'm1',
      sender: 'tutor',
      text: "Hello! I am your BioSphere AI Biodiversity Tutor. Rather than just giving you a species name, I explain morphological diagnostic traits, ecological niches, lookalike distinctions, and conservation actions. What would you like to explore today?",
      timestamp: '10:00 AM'
    }
  ]);

  const filteredSpecies = SAMPLE_SPECIES.filter(s => {
    const matchesCat = categoryFilter === 'All' || s.category === categoryFilter;
    const matchesSearch = s.commonName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          s.scientificName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          s.habitat.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleSendTutorMessage = (presetQuery?: string) => {
    const query = presetQuery || tutorInput;
    if (!query.trim()) return;

    const userMsg: TutorMessage = {
      id: String(Date.now()),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!presetQuery) setTutorInput('');

    // Generate responsive AI tutor guidance grounded in the proposal document
    setTimeout(() => {
      let responseText = '';
      const qLower = query.toLowerCase();

      if (qLower.includes('amanita') || qLower.includes('death cap') || qLower.includes('mushroom') || qLower.includes('poison')) {
        responseText = `⚠️ **BioSphere AI Safety Protocol (Section 12 & 29):**
Under no circumstance should any wild mushroom be consumed based on visual or AI identification. 
**Amanita phalloides (Death Cap)** contains cyclic peptides called amatoxins, specifically alpha-amanitin, which inhibits RNA polymerase II and causes severe hepatic and renal necrosis within 24 to 48 hours. 

**Diagnostic Differentiator vs Edible Agaricus (Meadow Mushroom):**
- Death Cap has permanent **pure white gills** that never darken, and a distinct sac-like **volva** buried at the stem base.
- Meadow mushrooms develop pink to deep chocolate-brown gills as their spores mature and lack a basal volva.`;
      } else if (qLower.includes('pest') || qLower.includes('armyworm') || qLower.includes('maize') || qLower.includes('crop')) {
        responseText = `🌾 **Integrated Pest Management (Section 16):**
The **Fall Armyworm (Spodoptera frugiperda)** is an invasive lepidopteran pest native to the Americas that wreaks havoc on maize, sorghum, and rice in Sub-Saharan Africa.

**Diagnostic Check:**
Inspect the central whorl of the plant for moist, sawdust-like frass. Look for the distinctive **inverted white 'Y'** on the head capsule and **four elevated dark spots forming a precise square** on the 8th abdominal segment.

**Environmentally Safe Management (IPM):**
1. **Push-Pull Strategy:** Intercrop maize with silverleaf desmodium (*Desmodium uncinatum*) to repel moths and plant Napier grass on borders to trap them.
2. **Biocontrol:** Introduce egg parasitoids such as *Trichogramma* and *Telenomus remus*.
3. Avoid indiscriminate chemical pyrethroids to protect native pollinators.`;
      } else if (qLower.includes('crane') || qLower.includes('endangered') || qLower.includes('poach') || qLower.includes('mask')) {
        responseText = `🛡️ **Conservation Privacy Mandate (Section 18 & 4.5):**
The **Grey Crowned Crane (Balearica regulorum)** is classified as Endangered (IUCN). Their breeding grounds in East African wetlands are under heavy pressure from illegal trade and wetland drainage.

To protect breeding pairs, BioSphere AI executes **coordinate generalization**:
- Exact GPS coordinates are encrypted and restricted to certified researchers and wildlife authorities.
- Public observation feeds display a generalized 15-25 km fuzzy buffer to prevent poachers and illegal pet collectors from locating sensitive nest sites.`;
      } else if (qLower.includes('hyacinth') || qLower.includes('invasive')) {
        responseText = `🌿 **Invasive Species Monitoring (Section 15):**
**Water Hyacinth (Pontederia crassipes)** forms dense vegetative mats over freshwater lakes like Lake Victoria. 
- It blocks 95% of sunlight, severely depleting dissolved oxygen during decomposition and choking fish stocks.
- **Biosecurity Response:** BioSphere AI uses spatial clustering to alert local environmental authorities when observation densities exceed critical thresholds. Successful biocontrol involves *Neochetina* weevils.`;
      } else {
        responseText = `**BioSphere AI Pedagogical Rationale:**
In ecological field studies, identifying ${selectedSpecies.commonName} (*${selectedSpecies.scientificName}*) requires observing morphological keys (e.g. leaf venation, crown structure, or plumage), understanding its native biome in ${selectedSpecies.geographicRange}, and examining its keystone role: ${selectedSpecies.ecologicalRole}`;
      }

      const botMsg: TutorMessage = {
        id: String(Date.now() + 1),
        sender: 'tutor',
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMsg]);
    }, 600);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Title */}
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-emerald-400" />
          <span>Species Encyclopedia & AI Biodiversity Tutor</span>
        </h1>
        <p className="text-xs text-slate-400">
          Section 9: Expanded biodiversity encyclopedia, multi-topic lessons, and conversational pedagogical AI tutor.
        </p>
      </div>

      {/* Main Grid: Species Catalog on Left, AI Tutor & Details on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Filterable Catalog */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-4 shadow-xl">
            
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search common name, genus, habitat..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            {/* Category Filter Pills */}
            <div className="flex gap-1.5 overflow-x-auto pb-1 text-xs">
              {['All', 'Plant', 'Bird', 'Insect', 'Fungi', 'Reptile'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`px-2.5 py-1 rounded-lg font-medium transition-colors whitespace-nowrap ${
                    categoryFilter === cat
                      ? 'bg-emerald-600 text-white font-semibold'
                      : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* List of Species */}
            <div className="space-y-2 max-h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-800 pr-1">
              {filteredSpecies.map((species) => (
                <div
                  key={species.id}
                  onClick={() => setSelectedSpecies(species)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all ${
                    selectedSpecies.id === species.id
                      ? 'bg-emerald-950/70 border-emerald-500/80 shadow-md'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">
                      {species.commonName}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                      {species.category}
                    </span>
                  </div>
                  <p className="text-[11px] font-mono text-emerald-400 italic">
                    {species.scientificName}
                  </p>
                  <div className="flex items-center gap-2 mt-2 text-[10px]">
                    <span className={`px-1.5 py-0.5 rounded ${
                      species.iucnStatus === 'Endangered' ? 'bg-red-950 text-red-300' :
                      species.iucnStatus === 'Invasive' ? 'bg-purple-950 text-purple-300' :
                      'bg-emerald-950 text-emerald-300'
                    }`}>
                      {species.iucnStatus}
                    </span>
                    {species.isDangerousOrToxic && (
                      <span className="text-red-400 flex items-center gap-0.5">
                        <ShieldAlert className="w-3 h-3" /> Toxic
                      </span>
                    )}
                    {species.isAgriculturalPest && (
                      <span className="text-yellow-400 flex items-center gap-0.5">
                        <Bug className="w-3 h-3" /> Pest
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* Right Column: Deep Dossier & AI Tutor Chat */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Detailed Encyclopedia Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex items-start justify-between border-b border-slate-800 pb-3">
              <div>
                <h2 className="text-xl font-extrabold text-white">
                  {selectedSpecies.commonName}
                </h2>
                <p className="text-sm font-mono text-emerald-400 italic">
                  {selectedSpecies.scientificName}
                </p>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-950 text-emerald-300 border border-emerald-700">
                {selectedSpecies.category}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-slate-400 font-semibold block">Habitat & Range</span>
                <p className="text-slate-200">{selectedSpecies.habitat}</p>
                <p className="text-slate-400 text-[11px] pt-1">Region: {selectedSpecies.geographicRange}</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-slate-400 font-semibold block">Ecological Role</span>
                <p className="text-slate-200">{selectedSpecies.ecologicalRole}</p>
              </div>
            </div>

            {/* Lookalike Warning Box */}
            <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-800/40 text-xs space-y-1">
              <span className="font-semibold text-amber-300 flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-amber-400" />
                Critical Lookalike Distinction (Section 4.3):
              </span>
              <p className="text-slate-200">
                Frequently confused with <strong className="text-amber-200">{selectedSpecies.similarLookalike.name}</strong> (<em>{selectedSpecies.similarLookalike.scientificName}</em>).
              </p>
              <p className="text-slate-300 text-[11px]">
                {selectedSpecies.similarLookalike.differentiatingTrait}
              </p>
            </div>
          </div>

          {/* Interactive AI Biodiversity Tutor (Section 9.2) */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-teal-500/20 text-teal-400">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">
                    AI Biodiversity Tutor (Section 9.2)
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    Ask questions on morphology, safe management, or ecological interactions
                  </p>
                </div>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-700">
                Online Intelligence Mode
              </span>
            </div>

            {/* Quick Prompt Questions */}
            <div className="flex flex-wrap gap-1.5 text-[11px]">
              <button
                onClick={() => handleSendTutorMessage(`Explain the toxicity and lookalike hazards of ${selectedSpecies.commonName}`)}
                className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg border border-slate-700 transition-colors"
              >
                Lookalike & Safety Hazards
              </button>
              <button
                onClick={() => handleSendTutorMessage(`What is the agricultural or ecological impact of ${selectedSpecies.commonName}?`)}
                className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg border border-slate-700 transition-colors"
              >
                Ecological Impact & Niche
              </button>
              <button
                onClick={() => handleSendTutorMessage(`How does BioSphere AI protect endangered species locations like ${selectedSpecies.commonName}?`)}
                className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg border border-slate-700 transition-colors"
              >
                Geographic Privacy & Poaching Prevention
              </button>
            </div>

            {/* Chat Messages Log */}
            <div className="space-y-3 max-h-[320px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-800">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 text-xs leading-relaxed ${
                    msg.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {msg.sender === 'tutor' && (
                    <div className="w-7 h-7 rounded-lg bg-emerald-600/30 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                      <Bot className="w-4 h-4" />
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] p-3 rounded-xl whitespace-pre-wrap ${
                      msg.sender === 'user'
                        ? 'bg-emerald-600 text-white font-medium rounded-tr-none'
                        : 'bg-slate-950 border border-slate-800 text-slate-200 rounded-tl-none'
                    }`}
                  >
                    <p>{msg.text}</p>
                    <span className="text-[10px] text-slate-400 block mt-1 text-right">
                      {msg.timestamp}
                    </span>
                  </div>

                  {msg.sender === 'user' && (
                    <div className="w-7 h-7 rounded-lg bg-slate-700 flex items-center justify-center text-slate-300 shrink-0 mt-0.5">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendTutorMessage();
              }}
              className="flex gap-2 pt-2 border-t border-slate-800"
            >
              <input
                type="text"
                placeholder="Ask the BioSphere AI Tutor about species, taxonomy, or ecosystems..."
                value={tutorInput}
                onChange={(e) => setTutorInput(e.target.value)}
                className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Ask</span>
              </button>
            </form>

          </div>

        </div>

      </div>

    </div>
  );
};
