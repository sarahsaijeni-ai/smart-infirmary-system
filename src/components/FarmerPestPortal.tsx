import React, { useState } from 'react';
import { 
  Bug, 
  Sprout, 
  ShieldCheck, 
  AlertTriangle, 
  Leaf, 
  Check, 
  HelpCircle, 
  Sparkles, 
  Droplets,
  Search
} from 'lucide-react';

interface PestDossier {
  id: string;
  commonName: string;
  scientificName: string;
  affectedCrops: string[];
  damageSymptoms: string[];
  diagnosticKeys: string[];
  ipmProtocol: {
    cultural: string;
    biological: string;
    organicIntervention: string;
    chemicalCaution: string;
  };
  economicThreshold: string;
}

const AGRICULTURAL_PESTS: PestDossier[] = [
  {
    id: 'fall-armyworm',
    commonName: 'Fall Armyworm',
    scientificName: 'Spodoptera frugiperda',
    affectedCrops: ['Maize', 'Sorghum', 'Rice', 'Sugarcane', 'Millet'],
    damageSymptoms: [
      'Extensive window-pane grazing on young foliage',
      'Central leaf whorl shredded with abundant moist, sawdust-like frass',
      'Burrowing into ear tips and tassels during reproductive stages'
    ],
    diagnosticKeys: [
      'Inverted white "Y" marking visible on dark head capsule',
      'Four elevated dark spots arranged in a square on the 8th abdominal segment',
      'Larvae curl into a tight "C" when disturbed'
    ],
    ipmProtocol: {
      cultural: 'Push-Pull Technology: Intercrop maize with Silverleaf Desmodium (repels egg-laying moths) and plant Napier grass along field borders to attract and trap larvae.',
      biological: 'Conserve and augment natural predators like predatory stink bugs, earwigs, and parasitic wasps (Trichogramma and Telenomus remus).',
      organicIntervention: 'Apply aqueous extracts of neem seed cake (Azadirachta indica) or bio-pesticides containing Bacillus thuringiensis (Bt) or Beauveria bassiana directly into the central whorl.',
      chemicalCaution: 'Avoid synthetic pyrethroids which induce rapid pest resistance and destroy native pollinator bees.'
    },
    economicThreshold: 'Action recommended when 20% of plants in vegetative stage show active whorl feeding.'
  },
  {
    id: 'stem-borer',
    commonName: 'African Maize Stalk Borer',
    scientificName: 'Busseola fusca',
    affectedCrops: ['Maize', 'Sorghum', 'Pearl Millet'],
    damageSymptoms: [
      'Dead heart symptoms (terminal growing point dries up and dies)',
      'Pin-hole perforations across unfolded leaf blades',
      'Hollowed stems prone to lodging in moderate winds'
    ],
    diagnosticKeys: [
      'Pinkish-white to purplish caterpillars with dark head capsule inside stem tunnels',
      'Creamy-white spherical eggs laid in rows underneath leaf sheaths'
    ],
    ipmProtocol: {
      cultural: 'Crop residue management: slash and compost dry stalks immediately after harvest to disrupt overwintering diapausing pupae.',
      biological: 'Release Cotesia flavipes and Cotesia sesamiae parasitoid wasps which target larvae inside the stem.',
      organicIntervention: 'Apply wood ash mixed with chili powder into early whorls; apply neem extract before larvae bore into stems.',
      chemicalCaution: 'Spraying after larvae enter stems is completely ineffective and wastes farmer resources.'
    },
    economicThreshold: 'Inspect 50 plants at random; initiate control if 5-10% show fresh pin-hole perforations.'
  },
  {
    id: 'desert-locust',
    commonName: 'Desert Locust',
    scientificName: 'Schistocerca gregaria',
    affectedCrops: ['All cereals', 'Pastures', 'Vegetables', 'Fruit orchards'],
    damageSymptoms: [
      'Rapid total defoliation of leaves, flowers, bark, and seeds within minutes',
      'Stripped green biomass leading to immediate regional famine hazard'
    ],
    diagnosticKeys: [
      'Solitary phase: brown or green cryptic coloration',
      'Gregarious phase: nymphs turn vivid yellow and black; adults turn bright pink (immature) or bright yellow (mature swarm)'
    ],
    ipmProtocol: {
      cultural: 'Community early-detection scouting networks; digging up egg pods in known sandy laying grounds.',
      biological: 'Bio-pesticide spray Metarhizium acridum (fungal pathogen targeting locust swarms without harming humans or livestock).',
      organicIntervention: 'Smoke screens and noise harassment for small approaching swarms before settling.',
      chemicalCaution: 'Coordinate with National Desert Locust Control Authorities; unauthorized spot spraying is hazardous.'
    },
    economicThreshold: 'Zero tolerance for gregarious hopper bands; immediate reporting to national biosecurity teams.'
  },
  {
    id: 'cassava-whitefly',
    commonName: 'Cassava Whitefly Vector',
    scientificName: 'Bemisia tabaci',
    affectedCrops: ['Cassava', 'Sweet Potato', 'Tomato', 'Cotton', 'Beans'],
    damageSymptoms: [
      'Vector for Cassava Mosaic Geminivirus (severe leaf curling, yellow chlorotic mosaic, stunted root tubers)',
      'Black sooty mold growing on sugary honeydew excretions'
    ],
    diagnosticKeys: [
      'Tiny 1mm moth-like white insects clustered on undersides of young apical leaves',
      'Clouds of white flies take flight when foliage is gently brushed'
    ],
    ipmProtocol: {
      cultural: 'Plant clean, certified virus-free cassava stem cuttings. Rogue (uproot and burn) symptomatic mosaic-infected plants early.',
      biological: 'Encourage Encarsia and Eretmocerus parasitic wasps; avoid killing ladybird beetle predators.',
      organicIntervention: 'Soap-water sprays or yellow sticky cards hung at canopy level to monitor and trap adults.',
      chemicalCaution: 'Insecticide resistance is extremely high; spraying often kills predators and worsens outbreaks.'
    },
    economicThreshold: 'Presence of visible whitefly clouds combined with first appearance of mosaic symptoms.'
  }
];

export const FarmerPestPortal: React.FC = () => {
  const [selectedPest, setSelectedPest] = useState<PestDossier>(AGRICULTURAL_PESTS[0]);
  const [search, setSearch] = useState<string>('');

  const filteredPests = AGRICULTURAL_PESTS.filter(p =>
    p.commonName.toLowerCase().includes(search.toLowerCase()) ||
    p.scientificName.toLowerCase().includes(search.toLowerCase()) ||
    p.affectedCrops.some(c => c.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
              <Sprout className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-white">
                Agricultural Pest & Plant Problem Diagnostics
              </h1>
              <p className="text-xs text-slate-400">
                Section 16: Specialized module helping farmers identify crop pests and weeds with safe Integrated Pest Management (IPM).
              </p>
            </div>
          </div>
        </div>

        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-950 text-amber-300 border border-amber-700/60">
          Environmentally Safe IPM Protocols
        </span>
      </div>

      {/* Main Pest Portal Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Pest Catalog */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3 shadow-xl">
            
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search crop or pest name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>

            <div className="space-y-2">
              {filteredPests.map((pest) => (
                <div
                  key={pest.id}
                  onClick={() => setSelectedPest(pest)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                    selectedPest.id === pest.id
                      ? 'bg-amber-950/70 border-amber-500 shadow-md ring-1 ring-amber-500/50'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-bold text-white flex items-center gap-1.5">
                      <Bug className="w-3.5 h-3.5 text-amber-400" />
                      {pest.commonName}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
                      {pest.affectedCrops[0]}
                    </span>
                  </div>
                  <p className="text-[11px] font-mono text-amber-300 italic">
                    {pest.scientificName}
                  </p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {pest.affectedCrops.map((crop, idx) => (
                      <span key={idx} className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                        {crop}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* Right Column: In-Depth Diagnostic Dossier & IPM Recommendations */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
            
            <div className="border-b border-slate-800 pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-extrabold text-white">
                    {selectedPest.commonName}
                  </h2>
                  <p className="text-sm font-mono text-amber-400 italic">
                    {selectedPest.scientificName}
                  </p>
                </div>
                <span className="px-3 py-1 rounded-lg bg-amber-950 text-amber-300 border border-amber-800 text-xs font-semibold">
                  Economic Threshold: {selectedPest.economicThreshold}
                </span>
              </div>
            </div>

            {/* Diagnostic Keys & Damage */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="font-bold text-amber-300 flex items-center gap-1.5">
                  <Bug className="w-4 h-4 text-amber-400" />
                  Key Field Identification Marks:
                </span>
                <ul className="space-y-1.5 text-slate-300">
                  {selectedPest.diagnosticKeys.map((key, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span>{key}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="font-bold text-red-300 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-red-400" />
                  Observed Crop Damage Symptoms:
                </span>
                <ul className="space-y-1.5 text-slate-300">
                  {selectedPest.damageSymptoms.map((sym, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-red-400 font-bold">•</span>
                      <span>{sym}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* Comprehensive IPM Guidance */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-2">
                <Leaf className="w-5 h-5 text-emerald-400" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Region-Appropriate Integrated Pest Management (IPM)
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                
                <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-800/40 space-y-1 text-slate-200">
                  <span className="font-bold text-emerald-300 block">1. Cultural Management:</span>
                  <p className="leading-relaxed text-[11px]">{selectedPest.ipmProtocol.cultural}</p>
                </div>

                <div className="p-3.5 rounded-xl bg-cyan-950/40 border border-cyan-800/40 space-y-1 text-slate-200">
                  <span className="font-bold text-cyan-300 block">2. Biological Control:</span>
                  <p className="leading-relaxed text-[11px]">{selectedPest.ipmProtocol.biological}</p>
                </div>

                <div className="p-3.5 rounded-xl bg-teal-950/40 border border-teal-800/40 space-y-1 text-slate-200">
                  <span className="font-bold text-teal-300 block">3. Organic Interventions:</span>
                  <p className="leading-relaxed text-[11px]">{selectedPest.ipmProtocol.organicIntervention}</p>
                </div>

                <div className="p-3.5 rounded-xl bg-red-950/40 border border-red-800/40 space-y-1 text-red-200">
                  <span className="font-bold text-red-300 block">4. Chemical Caution:</span>
                  <p className="leading-relaxed text-[11px]">{selectedPest.ipmProtocol.chemicalCaution}</p>
                </div>

              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
