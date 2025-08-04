export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  address: string;
  emergencyContact: string;
  emergencyPhone: string;
  bloodType: string;
  allergies: string;
  createdAt: string;
  lastVisit?: string;
}

export interface Doctor {
  id: string;
  firstName: string;
  lastName: string;
  specialization: string;
  email: string;
  phone: string;
  experience: number;
  avatar?: string;
  schedule: DoctorSchedule[];
}

export interface DoctorSchedule {
  day: string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  date: string;
  time: string;
  duration: number;
  type: 'consultation' | 'follow-up' | 'emergency' | 'surgery';
  status: 'scheduled' | 'completed' | 'cancelled' | 'no-show';
  notes?: string;
  symptoms?: string;
}

export interface MedicalRecord {
  id: string;
  patientId: string;
  doctorId: string;
  date: string;
  diagnosis: string;
  treatment: string;
  medications: Medication[];
  notes: string;
  followUpDate?: string;
}

export interface Medication {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
}

export interface DashboardStats {
  totalPatients: number;
  todayAppointments: number;
  totalDoctors: number;
  monthlyRevenue: number;
}

export interface InventoryItem {
  id: string;
  name: string;
  category: 'medication' | 'equipment' | 'supplies' | 'consumables';
  description: string;
  currentStock: number;
  minStock: number;
  maxStock: number;
  unit: string;
  unitPrice: number;
  supplier: string;
  expiryDate?: string;
  batchNumber?: string;
  location: string;
  status: 'in-stock' | 'low-stock' | 'out-of-stock' | 'expired';
  lastUpdated: string;
  createdAt: string;
}