/**
 * Comprehensive BioSphere AI Document Sections and Interactive Demonstration Data
 * Faithfully mirrors the 33 sections from BioSphere_AI_Project_Proposal_d4d24ae8.pdf
 */

export interface ProposalSection {
  number: number;
  title: string;
  summary: string;
  fullText: string;
  category: 'Strategic' | 'Technical' | 'Educational' | 'Operational' | 'Security';
}

export const PROPOSAL_SECTIONS: ProposalSection[] = [
  {
    number: 1,
    title: "Abstract",
    category: "Strategic",
    summary: "Fundamental role of biodiversity; challenges in species identification; proposes BioSphere AI as an intelligent offline-first biodiversity platform.",
    fullText: "Biodiversity plays a fundamental role in maintaining ecosystems, supporting agriculture, sustaining human livelihoods, and preserving the natural environment. However, identifying and understanding biological species remains difficult for many people because accurate identification often requires specialized knowledge, field guides, laboratory analysis, or access to experts. This project proposes BioSphere AI, an intelligent, offline-first biodiversity platform that combines artificial intelligence, computer vision, mobile technology, online learning, biodiversity databases, geospatial technologies, and conservation tools. The platform will allow users to photograph organisms such as plants, birds, insects, fungi, reptiles, and other organisms and receive ranked AI identification results with confidence levels. Basic identification will function offline, while internet connectivity will unlock advanced AI processing, expanded species information, interactive lessons, quizzes, multimedia resources, expert verification, cloud synchronization, biodiversity maps, and other learning features."
  },
  {
    number: 2,
    title: "Introduction",
    category: "Strategic",
    summary: "Definition of biodiversity across plants, animals, fungi, and microbes; critical importance to medicine, conservation, and research.",
    fullText: "Biodiversity refers to the variety of life found on Earth, including plants, animals, fungi, microorganisms, and the ecosystems in which they exist. Understanding biodiversity is important for environmental conservation, agriculture, medicine, education, scientific research, and sustainable development. Despite its importance, species identification can be challenging. A single ecosystem may contain hundreds or thousands of species, many of which have similar physical characteristics."
  },
  {
    number: 3,
    title: "Background of the Project",
    category: "Strategic",
    summary: "Traditional identification constraints (dichotomous keys, field guides) vs AI computer vision opportunities and regional dataset bias challenges.",
    fullText: "Traditional species identification commonly depends on field guides, taxonomic keys, scientific literature, expert knowledge, and laboratory analysis. Although these methods remain valuable, they can be difficult to access and time-consuming. Modern AI systems can analyze images and identify visual patterns associated with different species. However, real-world deployment introduces additional challenges. A model may perform well on common species but poorly on rare species, or perform poorly in geographical regions that are underrepresented in its training data."
  },
  {
    number: 4,
    title: "Problem Statement",
    category: "Strategic",
    summary: "Detailed breakdown of 6 core problems: connectivity reliance, dataset bias, misidentification risk, low educational value, conservation privacy risks, and biological appearance variance.",
    fullText: "4.1 Dependence on Internet Connectivity: Many AI apps rely on cloud processing; remote forests and national parks lack connection.\n4.2 Geographical Dataset Bias: Species datasets over-represent certain western regions.\n4.3 Misidentification: Danger with poisonous plants, toxic fungi, and venomous creatures.\n4.4 Limited Educational Value: Merely naming an organism lacks ecological depth.\n4.5 Conservation & Privacy Risks: Precise poaching coordinates for endangered wildlife.\n4.6 Changing Biological Appearance: Age, season, lighting, and environmental variation."
  },
  {
    number: 5,
    title: "Aim of the Project",
    category: "Strategic",
    summary: "Design and develop an offline-first intelligent platform integrating AI identification with biodiversity education, monitoring, and conservation.",
    fullText: "The main aim of this project is to design and develop BioSphere AI, an offline-first intelligent platform that uses artificial intelligence to identify biological species while providing interactive biodiversity education, monitoring, and conservation capabilities."
  },
  {
    number: 6,
    title: "Specific Objectives",
    category: "Strategic",
    summary: "14 detailed engineering, educational, safety, and field conservation objectives.",
    fullText: "• Develop AI capable of identifying selected biological species from photographs.\n• Implement offline species identification for zero-connectivity environments.\n• Provide ranked identification results with confidence scores.\n• Develop an uncertainty and safety system for potentially dangerous identifications.\n• Create an online biodiversity encyclopedia with comprehensive data.\n• Provide interactive lessons, quizzes, multimedia resources, and personalized learning.\n• Develop an AI-powered biodiversity learning assistant.\n• Support expert verification of uncertain observations.\n• Develop mechanisms for collecting and managing biodiversity observations.\n• Implement privacy and security measures for sensitive biodiversity information.\n• Support identification and reporting of invasive species.\n• Provide tools for identifying agricultural pests and plant-related problems.\n• Reduce geographical and dataset bias via regional biodiversity data.\n• Implement cloud synchronization and establish foundation for bioacoustics/eDNA."
  },
  {
    number: 7,
    title: "Proposed System & Workflow",
    category: "Technical",
    summary: "Mobile-first platform with the 8-stage workflow: Observe → Photograph → Identify → Learn → Verify → Record → Monitor → Protect.",
    fullText: "BioSphere AI will be developed as a mobile-first biodiversity platform supported by cloud services and an online learning environment. The core workflow will be: Observe → Photograph → Identify → Learn → Verify → Record → Monitor → Protect. A user will photograph an organism using a smartphone. The AI system will analyze the image and produce a ranked list of possible species. If uncertain, the system requests extra angles or recommends expert verification."
  },
  {
    number: 8,
    title: "Core Features",
    category: "Technical",
    summary: "Computer vision for plants, birds, insects, and fungi expanding to fauna; lightweight on-device edge AI (TFLite, ONNX, MobileNet).",
    fullText: "8.1 AI Species Identification: Initial focus on plants, birds, insects, and fungi, with future expansion to mammals, reptiles, amphibians, and marine life.\n8.2 Offline Identification: Lightweight AI model running directly on compatible smartphones using TensorFlow Lite, ONNX Runtime Mobile, Core ML, MobileNet, and EfficientNet."
  },
  {
    number: 9,
    title: "Online Intelligent Learning Platform",
    category: "Educational",
    summary: "Expanded encyclopedia, interactive multi-topic lessons, and conversational AI Biodiversity Tutor explaining morphological rationale.",
    fullText: "9.1 Interactive Lessons: Biodiversity, taxonomy, ecosystems, animal behavior, plant biology, insects, fungi, conservation, endangered species, invasive species, food chains, adaptation, environmental sustainability, and climate.\n9.2 AI Biodiversity Tutor: Explains why the identification is likely, diagnostic traits, similar species distinctions, distribution, ecological role, and threats."
  },
  {
    number: 10,
    title: "Interactive Quizzes and Challenges",
    category: "Educational",
    summary: "6 challenge modes: Identify Species, Taxonomy Challenge, Habitat Challenge, Conservation Challenge, Biodiversity Challenge, Similar Species Challenge.",
    fullText: "Provides Identify the Species, Taxonomy Challenge, Habitat Challenge, Conservation Challenge, Biodiversity Challenge, and Similar Species Challenge activities. The system can adapt future quizzes according to learning progress."
  },
  {
    number: 11,
    title: "Personalized Learning",
    category: "Educational",
    summary: "Tracks species explored, quizzes taken, and field observations to curate personalized learning pathways.",
    fullText: "BioSphere AI can track species explored, lessons completed, quiz performance, topics studied, and observations submitted, then recommend relevant learning materials (e.g. customized bird migration or fungal taxonomy tracks)."
  },
  {
    number: 12,
    title: "Safety and Uncertainty Management",
    category: "Security",
    summary: "Calibrated confidence tiering (High/Medium/Low) + strict safety ban on affirming edibility or safe handling from AI predictions.",
    fullText: "High confidence results provide likely identification and educational info. Medium-confidence provides multiple candidates and explains uncertainty. Low-confidence requests additional angles or recommends expert review. For potentially dangerous organisms, displays strong safety warnings. Never promises an organism is safe to eat or handle solely from AI prediction."
  },
  {
    number: 13,
    title: "Expert Verification",
    category: "Operational",
    summary: "Workflow: AI Prediction → User Submission → Expert Review → Verified Identification for dataset improvement.",
    fullText: "Users have the option to submit difficult observations for expert or community verification. The workflow will be: AI Prediction → User Submission → Expert Review → Verified Identification. Verified observations improve the biodiversity database and train future AI iterations."
  },
  {
    number: 14,
    title: "Biodiversity Observation System",
    category: "Operational",
    summary: "Logging photographs, timestamps, coordinates, environmental conditions, and synchronizing offline caches to cloud.",
    fullText: "Users will be able to save observations containing a photograph, date, approximate location, species prediction, confidence level, environmental notes, and verification status. Stored locally offline and synchronized upon connectivity."
  },
  {
    number: 15,
    title: "Invasive Species Monitoring",
    category: "Operational",
    summary: "Automatic flagging of invasive taxa, geographic spatial clustering, and automated alerting to biosecurity authorities.",
    fullText: "When a potentially invasive organism is detected, the system flags the observation. Multiple observations are analyzed geographically to identify clusters and send alerts to authorized organizations."
  },
  {
    number: 16,
    title: "Agricultural Pest Identification",
    category: "Operational",
    summary: "Helping farmers detect crop pests, harmful insects, weeds, and plant pathogens with eco-friendly IPM guidance.",
    fullText: "Specialized module helping farmers identify crop pests, harmful insects, weeds, and plant diseases with educational and region-appropriate management guidance emphasizing environmentally responsible methods."
  },
  {
    number: 17,
    title: "Biodiversity Map",
    category: "Technical",
    summary: "Interactive GIS map showing species distributions, hotspots, invasive corridors, and generalized endangered coordinates.",
    fullText: "Interactive map showing observations at appropriate geographic levels, including species distribution, biodiversity hotspots, invasive species outbreaks, and conservation areas. Sensitive endangered species locations are generalized."
  },
  {
    number: 18,
    title: "Privacy and Security",
    category: "Security",
    summary: "End-to-end data encryption, RBAC, protected APIs, coordinate generalization, and secure cloud storage auditing.",
    fullText: "Security measures include data encryption, secure authentication, role-based access, protected APIs, location generalization, restricted access to sensitive records, secure cloud storage, and data auditing."
  },
  {
    number: 19,
    title: "Offline-Online Synchronization",
    category: "Technical",
    summary: "Local capture and offline classification synchronized seamlessly with the cloud when connection becomes available.",
    fullText: "Offline-first sync system: user photographs organism without internet, performs local identification, saves observation, and syncs to cloud upon network availability to unlock enriched data and verification."
  },
  {
    number: 20,
    title: "System Architecture (6 Layers)",
    category: "Technical",
    summary: "Layer 1 Mobile App, Layer 2 Edge AI, Layer 3 Cloud AI, Layer 4 Biodiversity DB, Layer 5 Learning Platform, Layer 6 Security Layer.",
    fullText: "Layer 1: Mobile Application (camera, offline learning, logbook).\nLayer 2: Edge AI (preprocessing, lightweight inference, confidence estimation).\nLayer 3: Cloud AI (advanced transformers, difficult cases, clustering).\nLayer 4: Biodiversity Database (taxa, ranges, observations).\nLayer 5: Online Learning Platform (lessons, AI tutor, quizzes).\nLayer 6: Security Layer (auth, encryption, coordinate privacy)."
  },
  {
    number: 21,
    title: "Proposed Technology Stack",
    category: "Technical",
    summary: "Flutter/React, PyTorch/TFLite/ONNX, FastAPI/Node.js/PostgreSQL/Firebase, PostGIS, TLS & RBAC.",
    fullText: "Frontend: Flutter, React Native, Kotlin, or React.\nAI: Python, PyTorch, TensorFlow, TensorFlow Lite, ONNX Runtime, computer-vision models.\nBackend: FastAPI, Node.js, PostgreSQL, Firebase or equivalent cloud.\nGeospatial: GPS, GIS, PostGIS, spatial clustering.\nSecurity: HTTPS/TLS, encryption, secure auth, role-based access control, privacy-preserving location."
  },
  {
    number: 22,
    title: "Dataset Development",
    category: "Technical",
    summary: "Multi-regional diverse dataset with special focus on underrepresented East African species, seasonal morphs, and lighting variance.",
    fullText: "Creation of diverse and reliable training dataset representing different regions, seasons, life stages, lighting conditions, viewing angles. Particular attention given to underrepresented regional species, with initial focus on East African species."
  },
  {
    number: 23,
    title: "AI Model Development & Evaluation",
    category: "Technical",
    summary: "Fine-tuning pretrained vision models evaluated on Top-1, Top-5, F1, calibration, and false-positive safety checks.",
    fullText: "Begins with pretrained vision or biodiversity models fine-tuned with curated datasets. Evaluated on accuracy, Top-1, Top-5, precision, recall, F1-score, confusion matrix, and confidence calibration, particularly for dangerous or sensitive species."
  },
  {
    number: 24,
    title: "Continuous Model Improvement",
    category: "Technical",
    summary: "7-step lifecycle: New Observation → AI Prediction → Uncertainty Detection → Expert Verification → Dataset Improvement → Retraining → Improved Prediction.",
    fullText: "Continuous improvement cycle: New Observation → AI Prediction → Uncertainty Detection → Expert Verification → Dataset Improvement → Model Retraining → Improved Prediction. Adapts to new species, seasonal shifts, and new ecologies."
  },
  {
    number: 25,
    title: "Target Users",
    category: "Operational",
    summary: "8 user personas: Students, Teachers, Farmers, Researchers, Conservationists, Environmental Authorities, Citizen Scientists, General Public.",
    fullText: "Students (curriculum/field studies), Teachers (classroom demonstrations), Farmers (pest diagnostics), Researchers (scientific records), Conservationists (monitoring/planning), Environmental Authorities (invasive reporting), Citizen Scientists (observations), General Public (nature curiosity)."
  },
  {
    number: 26,
    title: "Project Methodology (10 Phases)",
    category: "Operational",
    summary: "Comprehensive 10-phase roadmap from Requirements Analysis to Evaluation.",
    fullText: "Phase 1: Requirements Analysis\nPhase 2: Dataset Preparation\nPhase 3: AI Development\nPhase 4: Mobile Development\nPhase 5: Online Platform\nPhase 6: Backend Development\nPhase 7: Security Implementation\nPhase 8: Testing\nPhase 9: Pilot Deployment\nPhase 10: Evaluation"
  },
  {
    number: 27,
    title: "Expected Outputs",
    category: "Operational",
    summary: "17 formal deliverables including mobile app, edge/cloud AI models, encyclopedia, tutor, quizzes, map, pest/invasive tools, and docs.",
    fullText: "17 deliverables: Mobile app, AI identification system, offline capability, online advanced capability, encyclopedia, interactive lessons, AI learning tutor, quizzes/challenges, personalized dashboard, observation system, expert verification mechanism, biodiversity map, invasive species component, agricultural pest module, secure cloud sync, privacy-preserving conservation data management, technical documentation and evaluation report."
  },
  {
    number: 28,
    title: "Expected Benefits",
    category: "Strategic",
    summary: "Environmental, Educational, Agricultural, Scientific, Technological, and Conservation impacts.",
    fullText: "Environmental (monitoring & preservation), Educational (interactive STEM learning), Agricultural (rapid pest mitigation), Scientific (curated field records), Technological (practical edge + cloud AI + GIS integration), Conservation (early invasive detection)."
  },
  {
    number: 29,
    title: "Ethical Considerations",
    category: "Security",
    summary: "Responsible AI, no false guarantees of safety/edibility, sensitive conservation data protection, ethical handling of user photos.",
    fullText: "BioSphere AI follows responsible AI and biodiversity-data principles. AI predictions are never treated as absolute scientific determinations. Users are informed about inaccuracies. Strict safeguards prevent unsafe edibility assurances, and sensitive wildlife locations are secured."
  },
  {
    number: 30,
    title: "Project Limitations",
    category: "Operational",
    summary: "Initial data sparsity on rare species, low-cost device compute constraints, photo quality dependency, and microscopic species constraints.",
    fullText: "Limitations include limited training images for rare species, difficulty distinguishing visually similar organisms, limited processing power on low-cost devices, dependency on photograph quality, limited expert availability, and inability to perform microscopic/genetic identification."
  },
  {
    number: 31,
    title: "Future Development",
    category: "Strategic",
    summary: "Bioacoustic audio recognition, solar AI camera traps, eDNA workflow integration, long-term climate analytics, and regional university networks.",
    fullText: "Future roadmap: Bioacoustic Identification (birds, bats, frogs, insects), AI Camera Traps (low-power solar metadata streaming), eDNA Integration (environmental DNA cross-validation), Advanced Conservation Analytics, Climate/Ecosystem Monitoring, and Regional Biodiversity Networks."
  },
  {
    number: 32,
    title: "Innovation of the Project",
    category: "Strategic",
    summary: "Moving beyond 'What is it?' to the 6 core discovery questions linking vision, ecology, conservation, and education.",
    fullText: "Primary innovation: Does not treat species identification as an isolated computer-vision problem. Integrates AI + Offline + Learning + Database + Verification + Conservation + Agriculture + Geospatial Intelligence into a complete 6-stage discovery experience: 'What is it?' → 'How do we know?' → 'Where does it live?' → 'Why is it important?' → 'What can I learn?' → 'How can it be protected?'"
  },
  {
    number: 33,
    title: "Conclusion & Proposed Tagline",
    category: "Strategic",
    summary: "Transforming species recognition into global stewardship. Tagline: 'BioSphere AI — Identify. Learn. Discover. Protect.'",
    fullText: "BioSphere AI provides an innovative solution combining offline AI with online intelligence. Promotes a shift from passive species identification to active biodiversity learning and conservation.\n\nPROPOSED TAGLINE:\nBioSphere AI — Identify. Learn. Discover. Protect.\nFrom recognizing a species to understanding the world it belongs to."
  }
];

export interface SpeciesRecord {
  id: string;
  commonName: string;
  scientificName: string;
  category: 'Plant' | 'Bird' | 'Insect' | 'Fungi' | 'Reptile';
  iucnStatus: 'Least Concern' | 'Near Threatened' | 'Vulnerable' | 'Endangered' | 'Critically Endangered' | 'Invasive';
  isDangerousOrToxic: boolean;
  dangerWarning?: string;
  isAgriculturalPest: boolean;
  isInvasive: boolean;
  isEndangeredSensitive: boolean;
  confidenceOffline: number;
  confidenceOnline: number;
  diagnosticFeatures: string[];
  habitat: string;
  geographicRange: string;
  ecologicalRole: string;
  threats: string;
  similarLookalike: {
    name: string;
    scientificName: string;
    differentiatingTrait: string;
  };
  sampleLocation: {
    lat: number;
    lng: number;
    regionName: string;
    isMasked: boolean;
  };
}

export const SAMPLE_SPECIES: SpeciesRecord[] = [
  {
    id: 'acacia-tortilis',
    commonName: 'Umbrella Thorn Acacia',
    scientificName: 'Vachellia tortilis',
    category: 'Plant',
    iucnStatus: 'Least Concern',
    isDangerousOrToxic: false,
    isAgriculturalPest: false,
    isInvasive: false,
    isEndangeredSensitive: false,
    confidenceOffline: 89,
    confidenceOnline: 96,
    diagnosticFeatures: [
      'Distinctive flat-topped umbrella canopy',
      'Paired sharp thorns: one hooked, one straight',
      'Small white-to-cream fragrant spherical flower heads',
      'Contorted, spiraled seed pods'
    ],
    habitat: 'Arid and semi-arid savannas, dry woodlands, alkaline soils',
    geographicRange: 'Sub-Saharan Africa, Great Rift Valley, Arabian Peninsula',
    ecologicalRole: 'Keystone nitrogen-fixing tree providing vital shade, foliage for giraffes and camels, and soil stabilization in arid zones.',
    threats: 'Charcoal production, agricultural clearance, and extreme prolonged droughts.',
    similarLookalike: {
      name: 'Whistling Thorn',
      scientificName: 'Vachellia drepanolobium',
      differentiatingTrait: 'Has bulbous swollen black pseudo-galls inhabited by symbiotic ants, whereas Umbrella Thorn lacks swollen galls.'
    },
    sampleLocation: {
      lat: -1.2921,
      lng: 36.8219,
      regionName: 'Rift Valley Corridor, Kenya',
      isMasked: false
    }
  },
  {
    id: 'amanita-phalloides',
    commonName: 'Death Cap Mushroom',
    scientificName: 'Amanita phalloides',
    category: 'Fungi',
    iucnStatus: 'Least Concern',
    isDangerousOrToxic: true,
    dangerWarning: 'DEADLY POISONOUS: Contains potent amatoxins causing irreversible hepatic and renal failure. Under no circumstances harvest, taste, or ingest based on AI prediction.',
    isAgriculturalPest: false,
    isInvasive: true,
    isEndangeredSensitive: false,
    confidenceOffline: 84,
    confidenceOnline: 97,
    diagnosticFeatures: [
      'Pale green, yellowish, or olive-bronze cap (5-15 cm)',
      'Free white gills under cap that do NOT turn pink or brown with age',
      'Membranous skirt-like annulus (ring) on the upper stipe',
      'Cup-like sack (volva) buried at the very base of the stem'
    ],
    habitat: 'Ectomycorrhizal with broadleaved deciduous trees (especially oaks, chestnuts, beeches)',
    geographicRange: 'Native to Europe; widely introduced and invasive in North America, South Africa, and Australasia',
    ecologicalRole: 'Mycorrhizal symbiont aiding forest tree nutrient uptake while decomposing organic matter.',
    threats: 'None (widely thriving as an introduced fungal invader).',
    similarLookalike: {
      name: 'Edible Meadow Mushroom',
      scientificName: 'Agaricus campestris',
      differentiatingTrait: 'Meadow mushrooms have pink-to-chocolate-brown gills and NO sack-like volva at base, whereas Death Cap retains permanent WHITE gills and a deep volva.'
    },
    sampleLocation: {
      lat: 51.1657,
      lng: 10.4515,
      regionName: 'Central European Oak Woodlands',
      isMasked: false
    }
  },
  {
    id: 'spodoptera-frugiperda',
    commonName: 'Fall Armyworm',
    scientificName: 'Spodoptera frugiperda',
    category: 'Insect',
    iucnStatus: 'Invasive',
    isDangerousOrToxic: false,
    isAgriculturalPest: true,
    isInvasive: true,
    isEndangeredSensitive: false,
    confidenceOffline: 81,
    confidenceOnline: 94,
    diagnosticFeatures: [
      'Inverted white "Y" marking on the front of the dark head capsule',
      'Four elevated dark spots arranged in a precise square on the 8th abdominal segment',
      'Feeding whorl damage with moist sawdust-like frass on maize'
    ],
    habitat: 'Agricultural croplands, particularly maize, sorghum, millet, sugarcane, and rice fields',
    geographicRange: 'Native to tropical Americas; invasive across Sub-Saharan Africa, Asia, and Oceania since 2016',
    ecologicalRole: 'Destructive generalist folivore pest that devastates cereal crops and reduces national grain yields.',
    threats: 'Agricultural management via push-pull biocontrol (intercropping with Desmodium), parasitoid wasps, and pheromone traps.',
    similarLookalike: {
      name: 'African Armyworm',
      scientificName: 'Spodoptera exempta',
      differentiatingTrait: 'African armyworm lacks the distinct raised square of 4 spots on the 8th segment and shows shiny velvet-black dorsal striping.'
    },
    sampleLocation: {
      lat: 0.3476,
      lng: 32.5825,
      regionName: 'Lake Victoria Farming Basin, Uganda',
      isMasked: false
    }
  },
  {
    id: 'balearica-regulorum',
    commonName: 'Grey Crowned Crane',
    scientificName: 'Balearica regulorum',
    category: 'Bird',
    iucnStatus: 'Endangered',
    isDangerousOrToxic: false,
    isAgriculturalPest: false,
    isInvasive: false,
    isEndangeredSensitive: true,
    confidenceOffline: 87,
    confidenceOnline: 98,
    diagnosticFeatures: [
      'Spectacular crown of stiff, golden-yellow feathers',
      'Bright white cheek patches with red upper skin portion',
      'Prominent red inflatable gular sac (wattle) beneath the throat',
      'Slate-grey body plumage with chestnut and white wing coverts'
    ],
    habitat: 'Freshwater wetlands, seasonal marshes, wet grasslands, river banks',
    geographicRange: 'Eastern and Southern Africa (Uganda, Kenya, Tanzania, Rwanda, South Africa)',
    ecologicalRole: 'Wetland bioindicator species controlling insect and reptile populations while dispersing aquatic plant seeds.',
    threats: 'Severe wetland drainage for commercial agriculture, illegal live pet trade, and power line collisions.',
    similarLookalike: {
      name: 'Black Crowned Crane',
      scientificName: 'Balearica pavonina',
      differentiatingTrait: 'Black Crowned Crane has predominantly dark charcoal plumage on body and pinkish cheeks, occupying West/Central Africa.'
    },
    sampleLocation: {
      lat: -0.5,
      lng: 37.0,
      regionName: 'Aberdare Highland Wetlands (Obfuscated Coordinate)',
      isMasked: true
    }
  },
  {
    id: 'eichhornia-crassipes',
    commonName: 'Water Hyacinth',
    scientificName: 'Pontederia crassipes',
    category: 'Plant',
    iucnStatus: 'Invasive',
    isDangerousOrToxic: false,
    isAgriculturalPest: true,
    isInvasive: true,
    isEndangeredSensitive: false,
    confidenceOffline: 91,
    confidenceOnline: 99,
    diagnosticFeatures: [
      'Swollen, spongy, bulbous petiole leaf stems acting as flotation buoys',
      'Glossy thick dark green ovate leaves in rosettes',
      'Pale violet/blue flowers with a blue-and-yellow peacock eye spot on upper petal',
      'Dense feathery purple-black submerged roots'
    ],
    habitat: 'Freshwater lakes, slow-moving rivers, reservoirs, and drainage canals',
    geographicRange: 'Native to Amazon basin; aggressively invasive across tropical waterways worldwide including Lake Victoria',
    ecologicalRole: 'Forms dense impenetrable mats that block sunlight, deplete dissolved oxygen, starve fish, and impede navigation.',
    threats: 'Controlled using Neochetina weevils (biocontrol), mechanical harvesting, and biomass valorization into biofuel and paper.',
    similarLookalike: {
      name: 'Water Lettuce',
      scientificName: 'Pistia stratiotes',
      differentiatingTrait: 'Water lettuce has velvety pale green leaves without bulbous stems and lacks large showy purple flowers.'
    },
    sampleLocation: {
      lat: -0.0917,
      lng: 34.7680,
      regionName: 'Kisumu Bay, Lake Victoria, Kenya',
      isMasked: false
    }
  },
  {
    id: 'dendroaspis-polylepis',
    commonName: 'Black Mamba',
    scientificName: 'Dendroaspis polylepis',
    category: 'Reptile',
    iucnStatus: 'Least Concern',
    isDangerousOrToxic: true,
    dangerWarning: 'POTENTIALLY LETHAL VENOM: Highly venomous elapid containing neurotoxins and cardiotoxins. Maintain at least 15 meters distance. Do not attempt capture, touch, or handle.',
    isAgriculturalPest: false,
    isInvasive: false,
    isEndangeredSensitive: false,
    confidenceOffline: 85,
    confidenceOnline: 96,
    diagnosticFeatures: [
      'Coffin-shaped head with alert dark eyes',
      'Body color is brownish-grey to metallic olive (NOT black)',
      'Inky black interior lining of mouth revealed when threatened/gaping',
      'Slender, streamlined body reaching 2.5 to 4.5 meters in length'
    ],
    habitat: 'Savannas, rocky hillsides, open woodlands, termite mounds, hollow trees',
    geographicRange: 'Eastern and Southern Africa',
    ecologicalRole: 'Apex serpentine predator regulating rodent, hyrax, and small bird populations.',
    threats: 'Persecution due to human-wildlife conflict and habitat fragmentation.',
    similarLookalike: {
      name: 'Olive Grass Snake',
      scientificName: 'Psammophis mossambicus',
      differentiatingTrait: 'Olive grass snake has smaller round head, white mouth interior, and yellow belly, non-lethal colubrid.'
    },
    sampleLocation: {
      lat: -2.3333,
      lng: 34.8333,
      regionName: 'Serengeti Kopjes, Tanzania',
      isMasked: false
    }
  }
];

export interface QuizQuestion {
  id: string;
  type: 'Identify the Species' | 'Taxonomy Challenge' | 'Habitat Challenge' | 'Conservation Challenge' | 'Biodiversity Challenge' | 'Similar Species Challenge';
  question: string;
  context: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export const SAMPLE_QUIZZES: QuizQuestion[] = [
  {
    id: 'q1',
    type: 'Identify the Species',
    question: 'Which visual diagnostic feature definitively separates the deadly Death Cap (Amanita phalloides) from the edible Meadow Mushroom?',
    context: 'Section 12 Safety and Uncertainty Management in BioSphere AI.',
    options: [
      'Cap diameter exceeding 20 cm',
      'Permanent white gills and a membranous volva sack at the base of the stipe',
      'Yellow liquid exudate when cut',
      'Presence of symbiotic ants'
    ],
    correctAnswer: 1,
    explanation: 'Amanita phalloides possesses permanent white gills that never turn dark and a sac-like volva at its stem base, whereas edible Meadow Mushrooms (Agaricus) develop pink-to-brown gills with age and lack a volva.'
  },
  {
    id: 'q2',
    type: 'Taxonomy Challenge',
    question: 'To which taxonomic order do both the Umbrella Thorn (Vachellia tortilis) and nitrogen-fixing legumes belong?',
    context: 'Section 9.1 Interactive Biodiversity Lessons.',
    options: [
      'Rosales',
      'Fabales',
      'Sapindales',
      'Lamiales'
    ],
    correctAnswer: 1,
    explanation: 'Acacias belong to the family Fabaceae within the order Fabales, renowned for root nodule nitrogen fixation that enriches arid soils.'
  },
  {
    id: 'q3',
    type: 'Habitat Challenge',
    question: 'Why does BioSphere AI automatically obfuscate the precise GPS coordinates of the Grey Crowned Crane (Balearica regulorum)?',
    context: 'Section 18 Privacy, Security and Endangered Species Protection.',
    options: [
      'To prevent international satellite data corruption',
      'Because cranes migrate too quickly for static pins',
      'To prevent poachers and illegal wildlife pet traders from targeting sensitive wetland nesting sites',
      'Due to device battery saving protocol'
    ],
    correctAnswer: 2,
    explanation: 'BioSphere AI enforces coordinate generalization (blurring raw coordinates to a 10-25km fuzzy bounding box) on endangered species to prevent wildlife poaching and habitat exploitation.'
  },
  {
    id: 'q4',
    type: 'Conservation Challenge',
    question: 'What is the primary ecological hazard posed by invasive Water Hyacinth (Pontederia crassipes) in freshwater lakes like Lake Victoria?',
    context: 'Section 15 Invasive Species Monitoring & Cluster Alerts.',
    options: [
      'It produces toxic airborne pollen causing human allergies',
      'It creates dense surface mats that block sunlight, starve dissolved oxygen, and devastate fish populations',
      'It attracts swarms of desert locusts',
      'It leaches dangerous heavy metals into sediment'
    ],
    correctAnswer: 1,
    explanation: 'Water Hyacinth multiplies exponentially into impenetrable mats that block light penetration, rapidly deplete aquatic dissolved oxygen through decay, and choke out indigenous freshwater fish and fisheries.'
  },
  {
    id: 'q5',
    type: 'Biodiversity Challenge',
    question: 'In BioSphere AI\'s continuous model improvement cycle, what immediately follows "Uncertainty Detection"?',
    context: 'Section 24 Continuous Model Improvement (7-step feedback loop).',
    options: [
      'Immediate automatic deletion of observation',
      'Direct retraining on unverified data',
      'Expert & Community Verification',
      'Hardware factory reset'
    ],
    correctAnswer: 2,
    explanation: 'The loop defined in Section 24 is: New Observation → AI Prediction → Uncertainty Detection → Expert Verification → Dataset Improvement → Model Retraining → Improved Prediction.'
  },
  {
    id: 'q6',
    type: 'Similar Species Challenge',
    question: 'How do you tell a Fall Armyworm (Spodoptera frugiperda) larva apart from native African armyworms on maize plants?',
    context: 'Section 16 Agricultural Pest Identification & Diagnostics.',
    options: [
      'Fall Armyworm has an inverted "Y" on its head and 4 raised spots in a square on the 8th segment',
      'Fall Armyworm has bright neon red antenna tips',
      'Fall Armyworm only feeds on eucalyptus leaves',
      'Fall Armyworm cannot survive in sunlight'
    ],
    correctAnswer: 0,
    explanation: 'The diagnostic identification mark of Spodoptera frugiperda is the inverted "Y" mark on its head capsule accompanied by a distinct geometric square of four elevated dark spots on its eighth abdominal segment.'
  }
];
