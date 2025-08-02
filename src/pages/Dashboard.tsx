import React, { useState } from 'react';
import { Users, Calendar, UserCheck, DollarSign } from 'lucide-react';
import { StatsCard } from '../components/Dashboard/StatsCard';
import { RecentActivity } from '../components/Dashboard/RecentActivity';
import { PatientModal } from '../components/Patients/PatientModal';
import { dashboardStats } from '../data/mockData';
import { Patient } from '../types';

export const Dashboard: React.FC = () => {
  const [isAddPatientModalOpen, setIsAddPatientModalOpen] = useState(false);

  const handleAddPatient = (newPatientData: Omit<Patient, 'id' | 'createdAt'>) => {
    // In a real app, this would make an API call
    console.log('New patient added:', newPatientData);
    // You could also update a global state or refetch data here
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome back! Here's what's happening at your clinic today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Patients"
          value={dashboardStats.totalPatients.toLocaleString()}
          icon={Users}
          trend={{ value: 12, isPositive: true }}
          color="blue"
        />
        <StatsCard
          title="Today's Appointments"
          value={dashboardStats.todayAppointments}
          icon={Calendar}
          trend={{ value: 8, isPositive: true }}
          color="green"
        />
        <StatsCard
          title="Active Doctors"
          value={dashboardStats.totalDoctors}
          icon={UserCheck}
          color="purple"
        />
        <StatsCard
          title="Monthly Revenue"
          value={`$${(dashboardStats.monthlyRevenue / 1000).toFixed(0)}K`}
          icon={DollarSign}
          trend={{ value: 15, isPositive: true }}
          color="orange"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentActivity />
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => setIsAddPatientModalOpen(true)}
                className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors duration-200 text-center"
              >
                <Users className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <span className="text-sm font-medium text-gray-900">Add Patient</span>
              </button>
              <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors duration-200 text-center">
                <Calendar className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <span className="text-sm font-medium text-gray-900">Schedule Appointment</span>
              </button>
              <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors duration-200 text-center">
                <UserCheck className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <span className="text-sm font-medium text-gray-900">Add Doctor</span>
              </button>
              <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors duration-200 text-center">
                <DollarSign className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <span className="text-sm font-medium text-gray-900">Process Payment</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <PatientModal
        isOpen={isAddPatientModalOpen}
        onClose={() => setIsAddPatientModalOpen(false)}
        onAddPatient={handleAddPatient}
      />
    </div>
  );
};