import React, { useState } from 'react';
import { Edit, Eye, Trash2, Phone, Mail, Pill, Plus, Search } from 'lucide-react';
import { Patient } from '../../types';
import { format } from 'date-fns';

interface PatientTableProps {
  patients: Patient[];
  onAddPatient: () => void;
  onEditPatient: (patient: Patient) => void;
  onViewPatient: (patient: Patient) => void;
  onDeletePatient: (patientId: string) => void;
  onPrescribeMedication?: (patient: Patient) => void;
}

export const PatientTable: React.FC<PatientTableProps> = ({
  patients,
  onAddPatient,
  onEditPatient,
  onViewPatient,
  onDeletePatient,
  onPrescribeMedication,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPatients = patients.filter(patient =>
    `${patient.firstName} ${patient.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.phone.includes(searchTerm)
  );

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        <h2 className="text-xl font-bold text-gray-800">🧑‍⚕️ Patient List</h2>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search patients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-64"
            />
          </div>
          <button 
            onClick={onAddPatient}
            className="bg-blue-600 text-white flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-sm"
          >
            <Plus className="w-4 h-4" />
            Add Patient
          </button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-100 text-gray-600 uppercase tracking-wider text-xs">
            <tr>
              <th className="px-6 py-3 text-left">Patient</th>
              <th className="px-6 py-3 text-left">Contact</th>
              <th className="px-6 py-3 text-left">Age/Gender</th>
              <th className="px-6 py-3 text-left">Last Visit</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredPatients.map((patient) => {
              const age = new Date().getFullYear() - new Date(patient.dateOfBirth).getFullYear();
              return (
                <tr key={patient.id} className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-6 py-4">
                    <div className="font-semibold text-gray-900">
                      {patient.firstName} {patient.lastName}
                    </div>
                    <div className="text-gray-500 text-xs">ID: {patient.id}</div>
                  </td>
                  <td className="px-6 py-4 space-y-1">
                    <div className="flex items-center text-gray-800">
                      <Mail className="h-4 w-4 mr-2 text-gray-400" />
                      {patient.email}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Phone className="h-4 w-4 mr-2 text-gray-400" />
                      {patient.phone}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-800">
                    {age} years, {patient.gender}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {patient.lastVisit ? format(new Date(patient.lastVisit), 'MMM dd, yyyy') : 'No visits'}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => onViewPatient(patient)}
                        className="text-blue-600 hover:bg-blue-50 p-1 rounded"
                        title="View"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => onEditPatient(patient)}
                        className="text-green-600 hover:bg-green-50 p-1 rounded"
                        title="Edit"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      {onPrescribeMedication && (
                        <button
                          onClick={() => onPrescribeMedication(patient)}
                          className="text-purple-600 hover:bg-purple-50 p-1 rounded"
                          title="Prescribe Medication"
                        >
                          <Pill className="h-4 w-4" />
                        </button>
                      )}
                      <button
                        onClick={() => onDeletePatient(patient.id)}
                        className="text-red-600 hover:bg-red-50 p-1 rounded"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
