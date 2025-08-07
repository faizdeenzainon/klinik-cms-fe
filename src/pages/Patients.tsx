import React, { useState } from 'react';
import { PatientTable } from '../components/Patients/PatientTable';
import { AddPatientModal } from '../components/Patients/AddPatientModal';
import { PrescribeMedicationModal } from '../components/Patients/PrescribeMedicationModal';
import { ViewPatientModal } from '../components/Patients/ViewPatientModal';
import { EditPatientModal } from '../components/Patients/EditPatientModal';
import { mockPatients } from '../data/mockData';
import { Patient } from '../types';

export const Patients: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>(mockPatients);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isPrescribeModalOpen, setIsPrescribeModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  const handleEditPatient = (patient: Patient) => {
    setSelectedPatient(patient);
    setIsEditModalOpen(true);
  };

  const handleViewPatient = (patient: Patient) => {
    setSelectedPatient(patient);
    setIsViewModalOpen(true);
  };

  const handleDeletePatient = (patientId: string) => {
    console.log('Delete patient:', patientId);
    // Implement delete functionality
  };

  const handleAddPatient = (newPatientData: Omit<Patient, 'id' | 'createdAt'>) => {
    const newPatient: Patient = {
      ...newPatientData,
      id: (patients.length + 1).toString(),
      createdAt: new Date().toISOString().split('T')[0],
    };
    setPatients(prev => [newPatient, ...prev]);
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

  const handleSavePatient = (updatedPatient: Patient) => {
    setPatients(prev => 
      prev.map(patient => 
        patient.id === updatedPatient.id ? updatedPatient : patient
      )
    );
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

      <EditPatientModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        patient={selectedPatient}
        onSave={handleSavePatient}
      />
    </div>
  );
};