import React, { useState } from 'react';
import { DoctorGrid } from '../components/Doctors/DoctorGrid';
import { AddDoctorModal } from '../components/Doctors/AddDoctorModal';
import { EditDoctorModal } from '../components/Doctors/EditDoctorModal';
import { ViewDoctorModal } from '../components/Doctors/ViewDoctorModal';
import { mockDoctors } from '../data/mockData';
import { Doctor } from '../types';

export const Doctors: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>(mockDoctors);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

  const handleAddDoctor = (newDoctorData: Omit<Doctor, 'id'>) => {
    const newDoctor: Doctor = {
      ...newDoctorData,
      id: (doctors.length + 1).toString(),
    };
    setDoctors(prev => [newDoctor, ...prev]);
  };

  const handleEditDoctor = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setIsEditModalOpen(true);
  };

  const handleViewDoctor = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setIsViewModalOpen(true);
  };

  const handleSaveDoctor = (updatedDoctor: Doctor) => {
    setDoctors(prev => 
      prev.map(doctor => 
        doctor.id === updatedDoctor.id ? updatedDoctor : doctor
      )
    );
  };

  const handleDeleteDoctor = (doctorId: string) => {
    if (confirm('Are you sure you want to delete this doctor?')) {
      setDoctors(prev => prev.filter(doctor => doctor.id !== doctorId));
    }
  };
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Medical Staff</h1>
        <p className="text-gray-600 mt-1">Manage your clinic's medical professionals and their schedules.</p>
      </div>

      <DoctorGrid 
        doctors={doctors} 
        onAddDoctor={() => setIsAddModalOpen(true)}
        onEditDoctor={handleEditDoctor}
        onViewDoctor={handleViewDoctor}
        onDeleteDoctor={handleDeleteDoctor}
      />

      <AddDoctorModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddDoctor={handleAddDoctor}
      />

      <EditDoctorModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        doctor={selectedDoctor}
        onSave={handleSaveDoctor}
      />

      <ViewDoctorModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        doctor={selectedDoctor}
      />
    </div>
  );
};