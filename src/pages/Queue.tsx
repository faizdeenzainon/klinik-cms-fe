import React, { useState } from 'react';
import { Users, Stethoscope } from 'lucide-react';
import { ReceptionistPanel } from '../components/Queue/ReceptionistPanel';
import { DoctorPanel } from '../components/Queue/DoctorPanel';
import { Visit } from '../types';
import { mockVisits } from '../data/mockData';
import { useAuth } from '../contexts/AuthContext';

export const Queue: React.FC = () => {
  const { user } = useAuth();
  const [visits, setVisits] = useState<Visit[]>(mockVisits);
  const [activeView, setActiveView] = useState<'receptionist' | 'doctor'>('receptionist');

  // For demo purposes, we'll use the first doctor's ID if user is a doctor
  const currentDoctorId = user?.role === 'doctor' ? '1' : '1';

  const handleCreateVisit = (visitData: Omit<Visit, 'id' | 'queueNumber' | 'timeIn' | 'status'>) => {
    const newVisit: Visit = {
      ...visitData,
      id: (visits.length + 1).toString(),
      queueNumber: Math.max(...visits.map(v => v.queueNumber), 0) + 1,
      timeIn: new Date().toISOString(),
      status: 'waiting',
    };
    
    setVisits(prev => [...prev, newVisit]);
  };

  const handleCancelVisit = (visitId: string) => {
    setVisits(prev => 
      prev.map(visit => 
        visit.id === visitId 
          ? { ...visit, status: 'cancelled' as const }
          : visit
      )
    );
  };

  const handleStartConsultation = (visitId: string) => {
    setVisits(prev => 
      prev.map(visit => 
        visit.id === visitId 
          ? { ...visit, status: 'in-consultation' as const }
          : visit
      )
    );
  };

  const handleEndConsultation = (visitId: string, diagnosis: string, medications: string[], notes: string) => {
    setVisits(prev => 
      prev.map(visit => 
        visit.id === visitId 
          ? { 
              ...visit, 
              status: 'completed' as const,
              diagnosis,
              medications,
              notes,
              timeOut: new Date().toISOString()
            }
          : visit
      )
    );
  };

  const handleCancelConsultation = (visitId: string) => {
    setVisits(prev =>
      prev.map(visit =>
        visit.id === visitId ? { ...visit, status: 'waiting' } : visit
      )
    );
  };

  return (
    <div className="space-y-6">
      {/* View Toggle */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setActiveView('receptionist')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
              activeView === 'receptionist'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Users className="h-4 w-4" />
            <span>Receptionist View</span>
          </button>
          <button
            onClick={() => setActiveView('doctor')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
              activeView === 'doctor'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Stethoscope className="h-4 w-4" />
            <span>Doctor View</span>
          </button>
        </div>
      </div>

      {/* Content */}
      {activeView === 'receptionist' ? (
        <ReceptionistPanel
          visits={visits}
          onCreateVisit={handleCreateVisit}
          onCancelVisit={handleCancelVisit}
        />
      ) : (
        <DoctorPanel
          visits={visits}
          currentDoctorId={currentDoctorId}
          onStartConsultation={handleStartConsultation}
          onEndConsultation={handleEndConsultation}
          onCancelConsultation={handleCancelConsultation}
        />
      )}
    </div>
  );
};