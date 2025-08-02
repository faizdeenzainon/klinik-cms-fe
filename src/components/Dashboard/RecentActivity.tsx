import React from 'react';
import { Clock, CheckCircle, AlertCircle, XCircle } from 'lucide-react';
import { mockAppointments, mockPatients, mockDoctors } from '../../data/mockData';
import { format } from 'date-fns';

const statusIcons = {
  scheduled: Clock,
  completed: CheckCircle,
  cancelled: XCircle,
  'no-show': AlertCircle,
};

const statusColors = {
  scheduled: 'text-blue-600 bg-blue-50',
  completed: 'text-green-600 bg-green-50',
  cancelled: 'text-red-600 bg-red-50',
  'no-show': 'text-orange-600 bg-orange-50',
};

export const RecentActivity: React.FC = () => {
  const recentAppointments = mockAppointments.slice(0, 5);

  const getPatientName = (patientId: string) => {
    const patient = mockPatients.find(p => p.id === patientId);
    return patient ? `${patient.firstName} ${patient.lastName}` : 'Unknown Patient';
  };

  const getDoctorName = (doctorId: string) => {
    const doctor = mockDoctors.find(d => d.id === doctorId);
    return doctor ? `${doctor.firstName} ${doctor.lastName}` : 'Unknown Doctor';
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {recentAppointments.map((appointment) => {
            const StatusIcon = statusIcons[appointment.status];
            return (
              <div key={appointment.id} className="flex items-center space-x-4">
                <div className={`p-2 rounded-full ${statusColors[appointment.status]}`}>
                  <StatusIcon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {getPatientName(appointment.patientId)} - {getDoctorName(appointment.doctorId)}
                  </p>
                  <p className="text-sm text-gray-500">
                    {format(new Date(appointment.date), 'MMM dd, yyyy')} at {appointment.time}
                  </p>
                </div>
                <div className="text-sm text-gray-500 capitalize">
                  {appointment.status}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};