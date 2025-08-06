import React, { useState } from 'react';
import { Search, Plus, Clock, User, Phone, Calendar, AlertCircle, X } from 'lucide-react';
import { Patient, Doctor, Visit } from '../../types';
import { mockPatients, mockDoctors, mockVisits } from '../../data/mockData';
import { format } from 'date-fns';

interface ReceptionistPanelProps {
  visits: Visit[];
  onCreateVisit: (visit: Omit<Visit, 'id' | 'queueNumber' | 'timeIn' | 'status'>) => void;
  onCancelVisit: (visitId: string) => void;
}

export const ReceptionistPanel: React.FC<ReceptionistPanelProps> = ({
  visits,
  onCreateVisit,
  onCancelVisit,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [selectedDoctorId, setSelectedDoctorId] = useState('');
  const [complaint, setComplaint] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const searchPatients = (term: string) => {
    if (!term.trim()) return [];
    return mockPatients.filter(patient =>
      patient.firstName.toLowerCase().includes(term.toLowerCase()) ||
      patient.lastName.toLowerCase().includes(term.toLowerCase()) ||
      patient.phone.includes(term) ||
      patient.email.toLowerCase().includes(term.toLowerCase())
    );
  };

  const searchResults = searchPatients(searchTerm);

  const handlePatientSelect = (patient: Patient) => {
    setSelectedPatient(patient);
    setSearchTerm('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPatient || !selectedDoctorId || !complaint.trim()) return;

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    onCreateVisit({
      patientId: selectedPatient.id,
      doctorId: selectedDoctorId,
      complaint: complaint.trim(),
    });

    // Reset form
    setSelectedPatient(null);
    setSelectedDoctorId('');
    setComplaint('');
    setIsSubmitting(false);
  };

  const getPatientName = (patientId: string) => {
    const patient = mockPatients.find(p => p.id === patientId);
    return patient ? `${patient.firstName} ${patient.lastName}` : 'Unknown';
  };

  const getDoctorName = (doctorId: string) => {
    const doctor = mockDoctors.find(d => d.id === doctorId);
    return doctor ? `${doctor.firstName} ${doctor.lastName}` : 'Unknown';
  };

  const getPatientAge = (patientId: string) => {
    const patient = mockPatients.find(p => p.id === patientId);
    if (!patient) return 0;
    return new Date().getFullYear() - new Date(patient.dateOfBirth).getFullYear();
  };

  const getPatientPhone = (patientId: string) => {
    const patient = mockPatients.find(p => p.id === patientId);
    return patient?.phone || '';
  };

  const waitingVisits = visits.filter(visit => visit.status === 'waiting' || visit.status === 'in-consultation');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Patient Queue Management</h1>
        <p className="text-gray-600 mt-1">Register patient visits and manage the waiting queue.</p>
      </div>

      {/* Registration Form */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <Plus className="h-5 w-5 mr-2 text-blue-600" />
            Register Patient Visit
          </h3>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Patient Search */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search Patient (IC Number, Name, Phone, Email)
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Search by IC, name, phone, or email..."
                disabled={!!selectedPatient}
              />
            </div>
            
            {/* Search Results */}
            {searchTerm && !selectedPatient && searchResults.length > 0 && (
              <div className="mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                {searchResults.map((patient) => (
                  <button
                    key={patient.id}
                    type="button"
                    onClick={() => handlePatientSelect(patient)}
                    className="w-full text-left p-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                  >
                    <div className="font-medium text-gray-900">
                      {patient.firstName} {patient.lastName}
                    </div>
                    <div className="text-sm text-gray-500">
                      {patient.phone} • {patient.email}
                    </div>
                  </button>
                ))}
              </div>
            )}

            {searchTerm && !selectedPatient && searchResults.length === 0 && (
              <div className="mt-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-yellow-800 text-sm">No patients found. Please check the search term.</p>
              </div>
            )}
          </div>

          {/* Selected Patient Info */}
          {selectedPatient && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-blue-900">Selected Patient</h4>
                <button
                  type="button"
                  onClick={() => setSelectedPatient(null)}
                  className="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-100"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4 text-blue-600" />
                  <span className="text-sm text-blue-900">
                    {selectedPatient.firstName} {selectedPatient.lastName}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-blue-600" />
                  <span className="text-sm text-blue-900">
                    {new Date().getFullYear() - new Date(selectedPatient.dateOfBirth).getFullYear()} years old
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-blue-600" />
                  <span className="text-sm text-blue-900">{selectedPatient.phone}</span>
                </div>
              </div>
            </div>
          )}

          {/* Doctor Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Assign Doctor *
            </label>
            <select
              value={selectedDoctorId}
              onChange={(e) => setSelectedDoctorId(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="">Select a doctor</option>
              {mockDoctors.map((doctor) => (
                <option key={doctor.id} value={doctor.id}>
                  {doctor.firstName} {doctor.lastName} - {doctor.specialization}
                </option>
              ))}
            </select>
          </div>

          {/* Complaint */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Chief Complaint *
            </label>
            <textarea
              value={complaint}
              onChange={(e) => setComplaint(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="Enter patient's main complaint or reason for visit..."
              required
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={!selectedPatient || !selectedDoctorId || !complaint.trim() || isSubmitting}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center space-x-2"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Creating Visit...</span>
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4" />
                  <span>Create Visit</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Current Queue */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <Clock className="h-5 w-5 mr-2 text-blue-600" />
              Current Queue ({waitingVisits.length} patients)
            </h3>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Queue #
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Patient
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Complaint
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Time In
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Doctor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {waitingVisits.map((visit) => (
                <tr key={visit.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-lg font-bold text-blue-600">#{visit.queueNumber}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {getPatientName(visit.patientId)}
                      </div>
                      <div className="text-sm text-gray-500">
                        {getPatientAge(visit.patientId)} years • {getPatientPhone(visit.patientId)}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 max-w-xs truncate" title={visit.complaint}>
                      {visit.complaint}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {format(new Date(visit.timeIn), 'HH:mm')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {getDoctorName(visit.doctorId)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full capitalize ${
                      visit.status === 'waiting' ? 'bg-yellow-100 text-yellow-800' :
                      visit.status === 'in-consultation' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {visit.status.replace('-', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {visit.status === 'waiting' && (
                      <button
                        onClick={() => onCancelVisit(visit.id)}
                        className="text-red-600 hover:text-red-900 hover:bg-red-50 px-2 py-1 rounded transition-colors duration-200"
                      >
                        Cancel
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {waitingVisits.length === 0 && (
            <div className="text-center py-12">
              <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No patients in queue</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};