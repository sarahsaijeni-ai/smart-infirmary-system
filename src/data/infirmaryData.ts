export interface Patient {
  id: string;
  name: string;
  type: 'Student' | 'Staff';
  gradeOrDept: string;
  age: number;
  gender: 'M' | 'F';
  allergies: string[];
  chronicConditions: string[];
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
}

export interface MedicalVisit {
  id: string;
  patientId: string;
  patientName: string;
  patientType: 'Student' | 'Staff';
  gradeOrDept: string;
  timestamp: string;
  chiefComplaint: string;
  vitals: {
    temperature: number; // Celsius
    bp: string; // e.g. "118/76"
    pulse: number; // bpm
    spo2: number; // %
    weight?: number; // kg
  };
  treatmentNotes: string;
  dispensedItems: { itemId: string; itemName: string; quantity: number; dosage: string }[];
  disposition: 'Returned to Class' | 'Admitted to Resting Bed' | 'Sent Home' | 'Referred to Hospital';
  bedNumber?: string;
  referralFacility?: string;
  recordedBy: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  category: 'Oral Medicine' | 'Topical & Antiseptic' | 'First Aid & Dressing' | 'PPE & Consumables' | 'Diagnostic Equipment';
  remainingStock: number;
  minimumLevel: number;
  unit: string;
  batchNumber: string;
  expiryDate: string; // YYYY-MM-DD
  supplierName: string;
  lastRestocked: string;
}

export interface ReferralRecord {
  id: string;
  visitId: string;
  patientName: string;
  patientType: 'Student' | 'Staff';
  hospitalName: string;
  urgency: 'Emergency' | 'Urgent' | 'Routine';
  reasonForReferral: string;
  transportMode: string;
  parentNotified: boolean;
  status: 'Dispatched' | 'Arrived at Facility' | 'Completed';
  date: string;
}

export interface CompliancePermit {
  id: string;
  title: string;
  issuingAuthority: string;
  licenseNumber: string;
  validFrom: string;
  expiryDate: string;
  status: 'Active' | 'Renewal Approaching' | 'Expired';
  officerInCharge: string;
}

export const INITIAL_PATIENTS: Patient[] = [
  {
    id: 'STU-1042',
    name: 'Amani Mwamba',
    type: 'Student',
    gradeOrDept: 'Grade 10 - Blue',
    age: 15,
    gender: 'M',
    allergies: ['Penicillin', 'Peanuts'],
    chronicConditions: ['Mild Asthma'],
    emergencyContact: {
      name: 'Joseph Mwamba',
      relationship: 'Father',
      phone: '+255 754 112 334'
    }
  },
  {
    id: 'STU-1088',
    name: 'Neema Kiwia',
    type: 'Student',
    gradeOrDept: 'Grade 11 - Science',
    age: 16,
    gender: 'F',
    allergies: ['Sulfa drugs'],
    chronicConditions: [],
    emergencyContact: {
      name: 'Grace Kiwia',
      relationship: 'Mother',
      phone: '+255 765 223 445'
    }
  },
  {
    id: 'STU-1120',
    name: 'Baraka Joseph',
    type: 'Student',
    gradeOrDept: 'Grade 9 - Red',
    age: 14,
    gender: 'M',
    allergies: [],
    chronicConditions: [],
    emergencyContact: {
      name: 'Zainab Joseph',
      relationship: 'Mother',
      phone: '+255 784 334 556'
    }
  },
  {
    id: 'STF-042',
    name: 'Mr. David Mushi',
    type: 'Staff',
    gradeOrDept: 'Physics Department',
    age: 38,
    gender: 'M',
    allergies: ['Aspirin'],
    chronicConditions: ['Hypertension'],
    emergencyContact: {
      name: 'Sarah Mushi',
      relationship: 'Spouse',
      phone: '+255 713 998 776'
    }
  }
];

export const INITIAL_INVENTORY: InventoryItem[] = [
  {
    id: 'INV-01',
    name: 'Paracetamol 500mg Tablets',
    category: 'Oral Medicine',
    remainingStock: 48,
    minimumLevel: 50,
    unit: 'Tablets',
    batchNumber: 'PCM-2026-B4',
    expiryDate: '2027-05-15',
    supplierName: 'Arusha Medical Distributors Ltd',
    lastRestocked: '2026-09-10'
  },
  {
    id: 'INV-02',
    name: 'Disposable Examination Gloves (Box of 100)',
    category: 'PPE & Consumables',
    remainingStock: 12,
    minimumLevel: 20,
    unit: 'Boxes',
    batchNumber: 'GLV-2601',
    expiryDate: '2028-11-30',
    supplierName: 'Northern Health Supplies',
    lastRestocked: '2026-08-15'
  },
  {
    id: 'INV-03',
    name: 'Oral Rehydration Salts (ORS Sachets)',
    category: 'Oral Medicine',
    remainingStock: 85,
    minimumLevel: 30,
    unit: 'Sachets',
    batchNumber: 'ORS-9912',
    expiryDate: '2026-12-10', // Expiring relatively soon
    supplierName: 'Arusha Medical Distributors Ltd',
    lastRestocked: '2026-06-01'
  },
  {
    id: 'INV-04',
    name: 'Povidone Iodine Antiseptic Solution 10%',
    category: 'Topical & Antiseptic',
    remainingStock: 4,
    minimumLevel: 5,
    unit: 'Bottles (500ml)',
    batchNumber: 'PVD-2550',
    expiryDate: '2027-08-20',
    supplierName: 'Kilimanjaro Pharmaceuticals',
    lastRestocked: '2026-07-20'
  },
  {
    id: 'INV-05',
    name: 'Sterile Gauze Bandages (Rolls 10cm)',
    category: 'First Aid & Dressing',
    remainingStock: 35,
    minimumLevel: 25,
    unit: 'Rolls',
    batchNumber: 'GZ-2026-01',
    expiryDate: '2029-01-01',
    supplierName: 'Northern Health Supplies',
    lastRestocked: '2026-09-01'
  },
  {
    id: 'INV-06',
    name: 'Adhesive Plasters (Assorted Box 100)',
    category: 'First Aid & Dressing',
    remainingStock: 6,
    minimumLevel: 10,
    unit: 'Boxes',
    batchNumber: 'PLS-774',
    expiryDate: '2028-04-12',
    supplierName: 'Northern Health Supplies',
    lastRestocked: '2026-08-10'
  },
  {
    id: 'INV-07',
    name: 'Surgical Face Masks (Box of 50)',
    category: 'PPE & Consumables',
    remainingStock: 18,
    minimumLevel: 15,
    unit: 'Boxes',
    batchNumber: 'MSK-400',
    expiryDate: '2027-10-31',
    supplierName: 'Arusha Medical Distributors Ltd',
    lastRestocked: '2026-07-15'
  },
  {
    id: 'INV-08',
    name: 'Cetirizine 10mg Antihistamine Tablets',
    category: 'Oral Medicine',
    remainingStock: 60,
    minimumLevel: 20,
    unit: 'Tablets',
    batchNumber: 'CTZ-2025',
    expiryDate: '2027-02-28',
    supplierName: 'Kilimanjaro Pharmaceuticals',
    lastRestocked: '2026-05-18'
  }
];

export const INITIAL_VISITS: MedicalVisit[] = [
  {
    id: 'VIS-901',
    patientId: 'STU-1042',
    patientName: 'Amani Mwamba',
    patientType: 'Student',
    gradeOrDept: 'Grade 10 - Blue',
    timestamp: '2026-10-21 08:35',
    chiefComplaint: 'Throbbing frontal headache & mild eye strain during mathematics class',
    vitals: {
      temperature: 36.8,
      bp: '115/75',
      pulse: 74,
      spo2: 99
    },
    treatmentNotes: 'Rest in quiet room for 20 minutes with hydration. Paracetamol 500mg administered after confirming no NSAID/penicillin conflict.',
    dispensedItems: [
      { itemId: 'INV-01', itemName: 'Paracetamol 500mg Tablets', quantity: 1, dosage: '1 tablet with water' }
    ],
    disposition: 'Returned to Class',
    recordedBy: 'Nurse S. Ikupa (Registered Nurse)'
  },
  {
    id: 'VIS-902',
    patientId: 'STU-1120',
    patientName: 'Baraka Joseph',
    patientType: 'Student',
    gradeOrDept: 'Grade 9 - Red',
    timestamp: '2026-10-21 09:15',
    chiefComplaint: 'Skinned right knee and forearm abrasion sustained during physical education football session',
    vitals: {
      temperature: 36.7,
      bp: '112/70',
      pulse: 82,
      spo2: 98
    },
    treatmentNotes: 'Wound cleaned with sterile saline, disinfected with Povidone Iodine 10%, sterile gauze and adhesive plaster applied.',
    dispensedItems: [
      { itemId: 'INV-04', itemName: 'Povidone Iodine Antiseptic Solution 10%', quantity: 1, dosage: 'Topical application' },
      { itemId: 'INV-05', itemName: 'Sterile Gauze Bandages', quantity: 1, dosage: 'Wound dressing' },
      { itemId: 'INV-06', itemName: 'Adhesive Plasters', quantity: 2, dosage: 'Knee dressing' }
    ],
    disposition: 'Returned to Class',
    recordedBy: 'Nurse S. Ikupa (Registered Nurse)'
  },
  {
    id: 'VIS-903',
    patientId: 'STU-1088',
    patientName: 'Neema Kiwia',
    patientType: 'Student',
    gradeOrDept: 'Grade 11 - Science',
    timestamp: '2026-10-21 10:00',
    chiefComplaint: 'Acute high fever (39.2°C), severe body chills, and joint pains',
    vitals: {
      temperature: 39.2,
      bp: '108/68',
      pulse: 104,
      spo2: 97
    },
    treatmentNotes: 'Patient febrile and shivering. Tepid sponging initiated. Admitted to Resting Bed 1. Suspected malaria. Prepared urgent referral for laboratory blood smear.',
    dispensedItems: [
      { itemId: 'INV-01', itemName: 'Paracetamol 500mg Tablets', quantity: 2, dosage: 'Antipyretic relief' },
      { itemId: 'INV-03', itemName: 'Oral Rehydration Salts (ORS Sachets)', quantity: 1, dosage: 'Hydration' }
    ],
    disposition: 'Referred to Hospital',
    bedNumber: 'Resting Bed 1',
    referralFacility: 'Arusha Lutheran Medical Centre (ALMC)',
    recordedBy: 'Nurse S. Ikupa (Registered Nurse)'
  }
];

export const INITIAL_REFERRALS: ReferralRecord[] = [
  {
    id: 'REF-201',
    visitId: 'VIS-903',
    patientName: 'Neema Kiwia',
    patientType: 'Student',
    hospitalName: 'Arusha Lutheran Medical Centre (ALMC)',
    urgency: 'Urgent',
    reasonForReferral: 'High pyrexia (39.2°C) unresponsive to initial antipyretics; requires formal malaria rapid diagnostic test (mRDT) and CBC.',
    transportMode: 'School Emergency Vehicle',
    parentNotified: true,
    status: 'Dispatched',
    date: '2026-10-21 10:25'
  }
];

export const INITIAL_COMPLIANCE: CompliancePermit[] = [
  {
    id: 'LIC-01',
    title: 'School Health Facility Registration Certificate',
    issuingAuthority: 'Ministry of Health / Arusha City Council Health Dept',
    licenseNumber: 'TZA-ARS-INF-2025-084',
    validFrom: '2025-11-01',
    expiryDate: '2026-11-01',
    status: 'Renewal Approaching',
    officerInCharge: 'School Health Board / Sarah Ikupa'
  },
  {
    id: 'LIC-02',
    title: 'Clinical Officer / Nurse Practicing License',
    issuingAuthority: 'Tanzania Nursing and Midwives Council (TNMC)',
    licenseNumber: 'TNMC-REG-44910',
    validFrom: '2026-01-01',
    expiryDate: '2027-01-01',
    status: 'Active',
    officerInCharge: 'Sarah Ikupa (RN)'
  },
  {
    id: 'LIC-03',
    title: 'Biomedical Waste Disposal & Incineration Clearance',
    issuingAuthority: 'National Environment Management Council (NEMC)',
    licenseNumber: 'NEMC-WM-2026-119',
    validFrom: '2026-03-15',
    expiryDate: '2027-03-15',
    status: 'Active',
    officerInCharge: 'Antony Joseph (Co-founder / Compliance)'
  }
];
