import React, { useState } from 'react';
import { DoctorGrid } from '../components/Doctors/DoctorGrid';
import { AddDoctorModal } from '../components/Doctors/AddDoctorModal';
import { mockDoctors } from '../data/mockData';
import { Doctor } from '../types';

export const Doctors: React.FC = () => {
  const [doctors] = useState<Doctor[]>(mockDoctors);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleAddDoctor = (newDoctorData: Omit<Doctor, 'id'>) => {
    // const newDoctor: Doctor = {
    //   ...newDoctorData,
    //   id: (doctors.length + 1).toString(),
    // };
    // setDoctors(prev => [newDoctor, ...prev]);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Medical Staff</h1>
        <p className="text-gray-600 mt-1">Manage your clinic's medical professionals and their schedules.</p>
      </div>

      <DoctorGrid doctors={doctors} onAddDoctor={() => setIsAddModalOpen(true)} />

      <AddDoctorModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddDoctor={handleAddDoctor}
      />
    </div>
  );
};