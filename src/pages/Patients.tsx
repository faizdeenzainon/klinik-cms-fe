import React, { useState, useEffect  } from 'react';
import { PatientTable } from '../components/Patients/PatientTable';
import { PatientModal } from '../components/Patients/PatientModal';
import { AddPatientModal } from '../components/Patients/AddPatientModal';
import { Patient } from '../types';
import { PrescribeMedicationModal } from '../components/Patients/PrescribeMedicationModal';
import { ViewPatientModal } from '../components/Patients/ViewPatientModal';
import axios from 'axios';

export const Patients: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [, setLoading] = useState<boolean>(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [patientToEdit, setPatientToEdit] = useState<Patient | null>(null);
  const [isViewOnly, setIsViewOnly] = useState<boolean>(false);
  const [isPrescribeModalOpen, setIsPrescribeModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  useEffect(() => {
  axios.get<Patient[]>('http://localhost:8080/api/patients')
    .then(response => {
      setPatients(response.data);
    })
    .catch(error => {
      console.error('Error fetching patients:', error);
    })
    .finally(() => setLoading(false));
}, []);

  const handleEditPatient = (patient: Patient) => {
    // Implement edit functionality
  };

  const handleUpdatePatient = (updatedPatient: Patient) => {
    console.log('handleUpdatePatient:', updatedPatient);
    setPatients(prev =>
      prev.map(p => (p.id === updatedPatient.id ? updatedPatient : p))
    );
    setPatientToEdit(null);
  };

  const handleDeletePatient = (patientId: string) => {
    console.log('Delete patient:', patientId);
    // Implement delete functionality
  };

  const handlePrescribeMedication = (patient: Patient) => {
    setSelectedPatient(patient);
    setIsPrescribeModalOpen(true);
  };

  const handlePrescriptionSubmit = (prescriptions: any[]) => {
    console.log('Prescriptions for', selectedPatient?.firstName, ':', prescriptions);
    // Here you would typically update the patient's medical records
    // and reduce inventory stock accordingly
  };

  const handleViewPatient = (patient: Patient) => {
    setSelectedPatient(patient);
    setIsViewModalOpen(true);
  };

  const handleAddPatient = async (newPatientData: Omit<Patient, 'id' | 'createdAt'>) => {
  try {
    const response = await axios.post<Patient>('http://localhost:8080/api/patients', newPatientData);
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
        onPrescribeMedication={handlePrescribeMedication}
      />

      {/* <PatientModal
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
      /> */}

      <AddPatientModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddPatient={handleAddPatient}
      />

      <PrescribeMedicationModal
        isOpen={isPrescribeModalOpen}
        onClose={() => setIsPrescribeModalOpen(false)}
        patient={selectedPatient}
        onPrescribe={handlePrescriptionSubmit}
      />

      <ViewPatientModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        patient={selectedPatient}
      />
    </div>
  );
};