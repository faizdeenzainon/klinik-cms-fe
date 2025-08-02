import React from 'react';
import { FileText, Calendar, User, Pill } from 'lucide-react';
import { mockMedicalRecords, mockPatients, mockDoctors } from '../data/mockData';
import { format } from 'date-fns';

export const MedicalRecords: React.FC = () => {
  const getPatientName = (patientId: string) => {
    const patient = mockPatients.find(p => p.id === patientId);
    return patient ? `${patient.firstName} ${patient.lastName}` : 'Unknown Patient';
  };

  const getDoctorName = (doctorId: string) => {
    const doctor = mockDoctors.find(d => d.id === doctorId);
    return doctor ? `${doctor.firstName} ${doctor.lastName}` : 'Unknown Doctor';
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Medical Records</h1>
        <p className="text-gray-600 mt-1">Access and manage patient medical history and records.</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Recent Medical Records</h3>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200">
              Add Record
            </button>
          </div>
        </div>
        
        <div className="p-6">
          <div className="space-y-6">
            {mockMedicalRecords.map((record) => (
              <div key={record.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-sm transition-shadow duration-200">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <FileText className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900">{record.diagnosis}</h4>
                      <p className="text-sm text-gray-500">Record ID: {record.id}</p>
                    </div>
                  </div>
                  <div className="text-right text-sm text-gray-500">
                    {format(new Date(record.date), 'MMM dd, yyyy')}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">Patient: {getPatientName(record.patientId)}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">Doctor: {getDoctorName(record.doctorId)}</span>
                  </div>
                </div>
                
                <div className="mb-4">
                  <h5 className="text-sm font-medium text-gray-900 mb-2">Treatment</h5>
                  <p className="text-sm text-gray-600">{record.treatment}</p>
                </div>
                
                {record.medications.length > 0 && (
                  <div className="mb-4">
                    <h5 className="text-sm font-medium text-gray-900 mb-2 flex items-center">
                      <Pill className="h-4 w-4 mr-1" />
                      Medications
                    </h5>
                    <div className="space-y-2">
                      {record.medications.map((medication, index) => (
                        <div key={index} className="bg-gray-50 p-3 rounded-lg">
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-gray-900">{medication.name}</span>
                            <span className="text-sm text-gray-500">{medication.dosage}</span>
                          </div>
                          <div className="text-sm text-gray-600 mt-1">
                            {medication.frequency} for {medication.duration}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {record.notes && (
                  <div className="mb-4">
                    <h5 className="text-sm font-medium text-gray-900 mb-2">Notes</h5>
                    <p className="text-sm text-gray-600">{record.notes}</p>
                  </div>
                )}
                
                {record.followUpDate && (
                  <div className="flex items-center space-x-2 text-sm text-orange-600">
                    <Calendar className="h-4 w-4" />
                    <span>Follow-up scheduled: {format(new Date(record.followUpDate), 'MMM dd, yyyy')}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};