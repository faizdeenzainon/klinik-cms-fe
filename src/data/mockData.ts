import { Patient, Doctor, Appointment, MedicalRecord, DashboardStats, InventoryItem, Document, Visit, QueueStats } from '../types';

export const mockPatients: Patient[] = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@email.com',
    phone: '+1 (555) 123-4567',
    dateOfBirth: '1985-06-15',
    gender: 'male',
    address: '123 Main St, City, State 12345',
    emergencyContact: 'Jane Doe',
    emergencyPhone: '+1 (555) 987-6543',
    bloodType: 'O+',
    allergies: 'Penicillin',
    createdAt: '2023-01-15',
    lastVisit: '2024-01-10'
  },
  {
    id: '2',
    firstName: 'Sarah',
    lastName: 'Wilson',
    email: 'sarah.wilson@email.com',
    phone: '+1 (555) 234-5678',
    dateOfBirth: '1990-03-22',
    gender: 'female',
    address: '456 Oak Ave, City, State 12345',
    emergencyContact: 'Mike Wilson',
    emergencyPhone: '+1 (555) 876-5432',
    bloodType: 'A+',
    allergies: 'None',
    createdAt: '2023-02-20',
    lastVisit: '2024-01-08'
  },
  {
    id: '3',
    firstName: 'Michael',
    lastName: 'Johnson',
    email: 'michael.johnson@email.com',
    phone: '+1 (555) 345-6789',
    dateOfBirth: '1978-11-08',
    gender: 'male',
    address: '789 Pine Rd, City, State 12345',
    emergencyContact: 'Lisa Johnson',
    emergencyPhone: '+1 (555) 765-4321',
    bloodType: 'B-',
    allergies: 'Shellfish, Latex',
    createdAt: '2023-03-10',
    lastVisit: '2024-01-05'
  }
];

export const mockDoctors: Doctor[] = [
  {
    id: '1',
    firstName: 'Dr. Emily',
    lastName: 'Smith',
    specialization: 'Cardiology',
    email: 'emily.smith@clinic.com',
    phone: '+1 (555) 111-2222',
    experience: 12,
    schedule: [
      { day: 'Monday', startTime: '09:00', endTime: '17:00', isAvailable: true },
      { day: 'Tuesday', startTime: '09:00', endTime: '17:00', isAvailable: true },
      { day: 'Wednesday', startTime: '09:00', endTime: '17:00', isAvailable: true },
      { day: 'Thursday', startTime: '09:00', endTime: '17:00', isAvailable: true },
      { day: 'Friday', startTime: '09:00', endTime: '15:00', isAvailable: true }
    ]
  },
  {
    id: '2',
    firstName: 'Dr. Robert',
    lastName: 'Chen',
    specialization: 'Orthopedics',
    email: 'robert.chen@clinic.com',
    phone: '+1 (555) 222-3333',
    experience: 8,
    schedule: [
      { day: 'Monday', startTime: '10:00', endTime: '18:00', isAvailable: true },
      { day: 'Tuesday', startTime: '10:00', endTime: '18:00', isAvailable: true },
      { day: 'Wednesday', startTime: '10:00', endTime: '18:00', isAvailable: true },
      { day: 'Thursday', startTime: '10:00', endTime: '18:00', isAvailable: true },
      { day: 'Friday', startTime: '10:00', endTime: '16:00', isAvailable: true }
    ]
  },
  {
    id: '3',
    firstName: 'Dr. Maria',
    lastName: 'Garcia',
    specialization: 'Pediatrics',
    email: 'maria.garcia@clinic.com',
    phone: '+1 (555) 333-4444',
    experience: 15,
    schedule: [
      { day: 'Monday', startTime: '08:00', endTime: '16:00', isAvailable: true },
      { day: 'Tuesday', startTime: '08:00', endTime: '16:00', isAvailable: true },
      { day: 'Wednesday', startTime: '08:00', endTime: '16:00', isAvailable: true },
      { day: 'Thursday', startTime: '08:00', endTime: '16:00', isAvailable: true },
      { day: 'Friday', startTime: '08:00', endTime: '14:00', isAvailable: true }
    ]
  }
];

export const mockAppointments: Appointment[] = [
  {
    id: '1',
    patientId: '1',
    doctorId: '1',
    date: '2024-01-15',
    time: '10:00',
    duration: 30,
    type: 'consultation',
    status: 'scheduled',
    symptoms: 'Chest pain, shortness of breath'
  },
  {
    id: '2',
    patientId: '2',
    doctorId: '3',
    date: '2024-01-15',
    time: '14:30',
    duration: 45,
    type: 'follow-up',
    status: 'completed',
    notes: 'Patient responding well to treatment'
  },
  {
    id: '3',
    patientId: '3',
    doctorId: '2',
    date: '2024-01-16',
    time: '11:00',
    duration: 60,
    type: 'consultation',
    status: 'scheduled',
    symptoms: 'Knee pain after sports injury'
  }
];

export const mockMedicalRecords: MedicalRecord[] = [
  {
    id: '1',
    patientId: '1',
    doctorId: '1',
    date: '2024-01-10',
    diagnosis: 'Hypertension',
    treatment: 'Lifestyle changes and medication',
    medications: [
      { name: 'Lisinopril', dosage: '10mg', frequency: 'Once daily', duration: '3 months' }
    ],
    notes: 'Patient advised to reduce sodium intake and exercise regularly',
    followUpDate: '2024-04-10'
  },
  {
    id: '2',
    patientId: '2',
    doctorId: '3',
    date: '2024-01-08',
    diagnosis: 'Seasonal Allergies',
    treatment: 'Antihistamine therapy',
    medications: [
      { name: 'Claritin', dosage: '10mg', frequency: 'Once daily', duration: '1 month' }
    ],
    notes: 'Symptoms improving with current treatment'
  }
];

export const dashboardStats: DashboardStats = {
  totalPatients: 1247,
  todayAppointments: 18,
  totalDoctors: 12,
  monthlyRevenue: 125000
};

export const mockInventoryItems: InventoryItem[] = [
  {
    id: '1',
    name: 'Paracetamol 500mg',
    category: 'medication',
    description: 'Pain relief and fever reducer tablets',
    currentStock: 250,
    minStock: 50,
    maxStock: 500,
    unit: 'tablets',
    unitPrice: 0.15,
    supplier: 'PharmaCorp Ltd',
    expiryDate: '2025-08-15',
    batchNumber: 'PC2024-001',
    location: 'Pharmacy - Shelf A1',
    status: 'in-stock',
    lastUpdated: '2024-01-15',
    createdAt: '2023-06-01'
  },
  {
    id: '2',
    name: 'Digital Thermometer',
    category: 'equipment',
    description: 'Non-contact infrared thermometer',
    currentStock: 5,
    minStock: 3,
    maxStock: 10,
    unit: 'pieces',
    unitPrice: 45.00,
    supplier: 'MedTech Solutions',
    location: 'Equipment Room - Cabinet B',
    status: 'in-stock',
    lastUpdated: '2024-01-10',
    createdAt: '2023-03-15'
  },
  {
    id: '3',
    name: 'Disposable Syringes 5ml',
    category: 'supplies',
    description: 'Sterile disposable syringes with needles',
    currentStock: 15,
    minStock: 50,
    maxStock: 200,
    unit: 'pieces',
    unitPrice: 0.75,
    supplier: 'Medical Supplies Co',
    expiryDate: '2026-12-31',
    batchNumber: 'MS2024-SYR',
    location: 'Supply Room - Drawer C3',
    status: 'low-stock',
    lastUpdated: '2024-01-14',
    createdAt: '2023-09-20'
  },
  {
    id: '4',
    name: 'Surgical Gloves (Latex)',
    category: 'consumables',
    description: 'Sterile latex surgical gloves - Size M',
    currentStock: 0,
    minStock: 20,
    maxStock: 100,
    unit: 'boxes',
    unitPrice: 12.50,
    supplier: 'SafeHands Medical',
    expiryDate: '2025-06-30',
    batchNumber: 'SH2024-GLV',
    location: 'Surgery Room - Cabinet A',
    status: 'out-of-stock',
    lastUpdated: '2024-01-12',
    createdAt: '2023-11-05'
  },
  {
    id: '5',
    name: 'Amoxicillin 250mg',
    category: 'medication',
    description: 'Antibiotic capsules for bacterial infections',
    currentStock: 80,
    minStock: 30,
    maxStock: 150,
    unit: 'capsules',
    unitPrice: 0.25,
    supplier: 'PharmaCorp Ltd',
    expiryDate: '2024-02-28',
    batchNumber: 'PC2023-AMX',
    location: 'Pharmacy - Shelf A2',
    status: 'expired',
    lastUpdated: '2024-01-13',
    createdAt: '2023-05-10'
  },
  {
    id: '6',
    name: 'Blood Pressure Monitor',
    category: 'equipment',
    description: 'Digital automatic blood pressure monitor',
    currentStock: 8,
    minStock: 5,
    maxStock: 15,
    unit: 'pieces',
    unitPrice: 85.00,
    supplier: 'HealthTech Devices',
    location: 'Consultation Room - Cabinet D',
    status: 'in-stock',
    lastUpdated: '2024-01-11',
    createdAt: '2023-07-22'
  },
  {
    id: '7',
    name: 'Gauze Bandages',
    category: 'supplies',
    description: 'Sterile gauze bandages 4x4 inches',
    currentStock: 120,
    minStock: 40,
    maxStock: 200,
    unit: 'pieces',
    unitPrice: 0.50,
    supplier: 'Medical Supplies Co',
    expiryDate: '2027-03-15',
    batchNumber: 'MS2024-GAU',
    location: 'Supply Room - Shelf E1',
    status: 'in-stock',
    lastUpdated: '2024-01-09',
    createdAt: '2023-08-18'
  }
];

export const mockDocuments: Document[] = [
  {
    id: '1',
    type: 'referral-letter',
    title: 'Cardiology Referral for John Doe',
    patientId: '1',
    doctorId: '1',
    content: 'Dear Dr. Smith,\n\nI am referring Mr. John Doe for cardiology consultation regarding his recent chest pain episodes and elevated blood pressure readings...',
    status: 'completed',
    createdAt: '2024-01-10',
    updatedAt: '2024-01-10',
    issuedDate: '2024-01-10',
    recipientName: 'Dr. Robert Smith',
    recipientAddress: 'Cardiology Department, City Hospital',
    notes: 'Urgent referral - patient experiencing chest pain'
  },
  {
    id: '2',
    type: 'medical-certificate',
    title: 'Medical Certificate - Sarah Wilson',
    patientId: '2',
    doctorId: '3',
    content: 'This is to certify that Ms. Sarah Wilson was under my medical care from January 8, 2024, due to seasonal allergies...',
    status: 'completed',
    createdAt: '2024-01-08',
    updatedAt: '2024-01-08',
    issuedDate: '2024-01-08',
    validUntil: '2024-01-15',
    notes: 'Medical leave for 7 days'
  },
  {
    id: '3',
    type: 'prescription',
    title: 'Prescription - Michael Johnson',
    patientId: '3',
    doctorId: '2',
    content: 'Patient: Michael Johnson\nDate: January 5, 2024\n\nRx:\n1. Ibuprofen 400mg - Take twice daily with food\n2. Physical therapy sessions - 3 times per week',
    status: 'completed',
    createdAt: '2024-01-05',
    updatedAt: '2024-01-05',
    issuedDate: '2024-01-05',
    notes: 'For knee pain management'
  },
  {
    id: '4',
    type: 'lab-report',
    title: 'Blood Test Results - John Doe',
    patientId: '1',
    doctorId: '1',
    content: 'Laboratory Report\nPatient: John Doe\nTest Date: January 12, 2024\n\nComplete Blood Count:\n- Hemoglobin: 14.2 g/dL (Normal)\n- White Blood Cells: 7,200/μL (Normal)',
    status: 'completed',
    createdAt: '2024-01-12',
    updatedAt: '2024-01-12',
    issuedDate: '2024-01-12',
    notes: 'Follow-up blood work'
  },
  {
    id: '5',
    type: 'insurance-claim',
    title: 'Insurance Claim - Sarah Wilson',
    patientId: '2',
    doctorId: '3',
    content: 'Insurance Claim Form\nPatient: Sarah Wilson\nPolicy Number: INS-2024-001\nTreatment: Pediatric consultation and allergy treatment',
    status: 'sent',
    createdAt: '2024-01-08',
    updatedAt: '2024-01-09',
    issuedDate: '2024-01-08',
    notes: 'Submitted to insurance company'
  }
];

export const mockVisits: Visit[] = [
  {
    id: '1',
    patientId: '1',
    doctorId: '1',
    queueNumber: 1,
    complaint: 'Chest pain and shortness of breath',
    timeIn: '2024-01-15T09:30:00',
    status: 'waiting'
  },
  {
    id: '2',
    patientId: '2',
    doctorId: '3',
    queueNumber: 2,
    complaint: 'Fever and cough for 3 days',
    timeIn: '2024-01-15T10:15:00',
    status: 'in-consultation'
  },
  {
    id: '3',
    patientId: '3',
    doctorId: '2',
    queueNumber: 3,
    complaint: 'Knee pain after sports injury',
    timeIn: '2024-01-15T10:45:00',
    status: 'waiting'
  }
];

export const queueStats: QueueStats = {
  totalWaiting: 3,
  averageWaitTime: 25,
  completedToday: 12
};