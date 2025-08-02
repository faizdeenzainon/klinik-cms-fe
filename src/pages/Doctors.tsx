import React, { useState } from 'react';
import { DoctorGrid } from '../components/Doctors/DoctorGrid';
import { mockDoctors } from '../data/mockData';
import { Doctor } from '../types';

export const Doctors: React.FC = () => {
  const [doctors] = useState<Doctor[]>(mockDoctors);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Medical Staff</h1>
        <p className="text-gray-600 mt-1">Manage your clinic's medical professionals and their schedules.</p>
      </div>

      <DoctorGrid doctors={doctors} />
    </div>
  );
};