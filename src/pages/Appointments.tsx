import React from 'react';
import { AppointmentCalendar } from '../components/Appointments/AppointmentCalendar';

export const Appointments: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Appointments</h1>
        <p className="text-gray-600 mt-1">Schedule and manage patient appointments efficiently.</p>
      </div>

      <AppointmentCalendar />
    </div>
  );
};