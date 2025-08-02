import { Patient, Doctor, Appointment, MedicalRecord, DashboardStats } from '../types';

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