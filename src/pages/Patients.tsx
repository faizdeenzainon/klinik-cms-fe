import React, { useState, useEffect  } from 'react';
import { PatientTable } from '../components/Patients/PatientTable';
import { PatientModal } from '../components/Patients/PatientModal';
import { Patient } from '../types';
import axios from 'axios';

export const Patients: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [, setLoading] = useState<boolean>(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [patientToEdit, setPatientToEdit] = useState<Patient | null>(null);
  const [isViewOnly, setIsViewOnly] = useState<boolean>(false);

  useEffect(() => {
  axios.get<Patient[]>('https://shortcuts-bo-memo-optimization.trycloudflare.com/api/patients')
    .then(response => {
      setPatients(response.data);
    })
    .catch(error => {
      console.error('Error fetching patients:', error);
    })
    .finally(() => setLoading(false));
}, []);

  const handleEditPatient = (patient: Patient) => {
    setPatientToEdit(patient);
    setIsViewOnly(false);
    setIsAddModalOpen(true);
  };

  const handleUpdatePatient = (updatedPatient: Patient) => {
    console.log('handleUpdatePatient:', updatedPatient);
    setPatients(prev =>
      prev.map(p => (p.id === updatedPatient.id ? updatedPatient : p))
    );
    setPatientToEdit(null);
  };

  const handleViewPatient = (patient: Patient) => {
    setPatientToEdit(patient);
    setIsViewOnly(true);
    setIsAddModalOpen(true);
  };

  const handleDeletePatient = (patientId: string) => {
    console.log('Delete patient:', patientId);
    // Implement delete functionality
  };

  const handleAddPatient = async (newPatientData: Omit<Patient, 'id' | 'createdAt'>) => {
  try {
    const response = await axios.post<Patient>('https://shortcuts-bo-memo-optimization.trycloudflare.com/api/patients', newPatientData);
    setPatients(prev => [response.data, ...prev]);
  } catch (error) {
    console.error('Error adding patient:', error);
  }
};

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Patients</h1>
        <p className="text-gray-600 mt-1">Manage your clinic's patient records and information.</p>
      </div>

      <PatientTable
        patients={patients}
        onAddPatient={() => setIsAddModalOpen(true)}
        onEditPatient={handleEditPatient}
        onViewPatient={handleViewPatient}
        onDeletePatient={handleDeletePatient}
      />

      <PatientModal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setPatientToEdit(null);
          setIsViewOnly(false);
        }}
        onAddPatient={handleAddPatient}
        onUpdatePatient={handleUpdatePatient}
        patientToEdit={patientToEdit || undefined}
        isViewOnly={isViewOnly}
      />
    </div>
  );
};