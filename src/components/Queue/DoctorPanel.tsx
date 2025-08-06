import React, { useState } from 'react';
import { User, Clock, Stethoscope, FileText, Pill, Save, X } from 'lucide-react';
import { Patient, Doctor, Visit } from '../../types';
import { mockPatients, mockDoctors } from '../../data/mockData';
import { format } from 'date-fns';

interface DoctorPanelProps {
  visits: Visit[];
  currentDoctorId: string;
  onStartConsultation: (visitId: string) => void;
  onEndConsultation: (visitId: string, diagnosis: string, medications: string[], notes: string) => void;
  onCancelConsultation: (visitId: string) => void; 
}

interface ConsultationData {
  diagnosis: string;
  medications: string[];
  notes: string;
}

export const DoctorPanel: React.FC<DoctorPanelProps> = ({
  visits,
  currentDoctorId,
  onStartConsultation,
  onEndConsultation,
  onCancelConsultation,
}) => {
  const [consultingVisit, setConsultingVisit] = useState<Visit | null>(null);
  const [consultationData, setConsultationData] = useState<ConsultationData>({
    diagnosis: '',
    medications: [],
    notes: '',
  });
  const [newMedication, setNewMedication] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentDoctor = mockDoctors.find(d => d.id === currentDoctorId);
  const doctorVisits = visits.filter(visit => visit.doctorId === currentDoctorId);
  const waitingVisits = doctorVisits.filter(visit => visit.status === 'waiting');
  const inConsultationVisit = doctorVisits.find(visit => visit.status === 'in-consultation');

  const getPatientName = (patientId: string) => {
    const patient = mockPatients.find(p => p.id === patientId);
    return patient ? `${patient.firstName} ${patient.lastName}` : 'Unknown';
  };

  const getPatient = (patientId: string) => {
    return mockPatients.find(p => p.id === patientId);
  };

  const getPatientAge = (patientId: string) => {
    const patient = mockPatients.find(p => p.id === patientId);
    if (!patient) return 0;
    return new Date().getFullYear() - new Date(patient.dateOfBirth).getFullYear();
  };

  const handleStartConsultation = (visit: Visit) => {
    setConsultingVisit(visit);
    setConsultationData({
      diagnosis: visit.diagnosis || '',
      medications: visit.medications || [],
      notes: visit.notes || '',
    });
    onStartConsultation(visit.id);
  };

  const handleAddMedication = () => {
    if (newMedication.trim() && !consultationData.medications.includes(newMedication.trim())) {
      setConsultationData(prev => ({
        ...prev,
        medications: [...prev.medications, newMedication.trim()]
      }));
      setNewMedication('');
    }
  };

  const handleRemoveMedication = (medication: string) => {
    setConsultationData(prev => ({
      ...prev,
      medications: prev.medications.filter(med => med !== medication)
    }));
  };

  const handleEndConsultation = async () => {
    if (!consultingVisit || !consultationData.diagnosis.trim()) return;

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    onEndConsultation(
      consultingVisit.id,
      consultationData.diagnosis,
      consultationData.medications,
      consultationData.notes
    );

    // Reset state
    setConsultingVisit(null);
    setConsultationData({
      diagnosis: '',
      medications: [],
      notes: '',
    });
    setIsSubmitting(false);
  };

  const handleCloseConsultation = () => {
    if (consultingVisit) {
      onCancelConsultation(consultingVisit.id);
    }
    setConsultingVisit(null);
    setConsultationData({
      diagnosis: '',
      medications: [],
      notes: '',
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Doctor Dashboard</h1>
        <p className="text-gray-600 mt-1">
          {currentDoctor ? `${currentDoctor.firstName} ${currentDoctor.lastName} - ${currentDoctor.specialization}` : 'Doctor View'}
        </p>
      </div>

      {/* Queue Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Waiting Patients</p>
              <p className="text-2xl font-bold text-blue-600">{waitingVisits.length}</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <Clock className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">In Consultation</p>
              <p className="text-2xl font-bold text-green-600">{inConsultationVisit ? 1 : 0}</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <Stethoscope className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Completed Today</p>
              <p className="text-2xl font-bold text-gray-600">
                {doctorVisits.filter(v => v.status === 'completed').length}
              </p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <User className="h-6 w-6 text-gray-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Patient Queue */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <Clock className="h-5 w-5 mr-2 text-blue-600" />
            Your Patient Queue
          </h3>
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
                        {getPatientAge(visit.patientId)} years
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 max-w-xs" title={visit.complaint}>
                      {visit.complaint}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {format(new Date(visit.timeIn), 'HH:mm')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
                      Waiting
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleStartConsultation(visit)}
                      disabled={!!inConsultationVisit}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center space-x-2"
                    >
                      <Stethoscope className="h-4 w-4" />
                      <span>Start Consultation</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {waitingVisits.length === 0 && (
            <div className="text-center py-12">
              <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No patients waiting</p>
            </div>
          )}
        </div>
      </div>

      {/* Consultation Modal */}
      {consultingVisit && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-xl">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-50 rounded-lg">
                  <Stethoscope className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Consultation</h2>
                  <p className="text-sm text-gray-500">
                    Queue #{consultingVisit.queueNumber} - {getPatientName(consultingVisit.patientId)}
                  </p>
                </div>
              </div>
              <button
                onClick={handleCloseConsultation}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Patient Information */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-blue-900 mb-3 flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Patient Information
                </h3>
                {(() => {
                  const patient = getPatient(consultingVisit.patientId);
                  if (!patient) return <p>Patient not found</p>;
                  
                  return (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-blue-700"><strong>Name:</strong> {patient.firstName} {patient.lastName}</p>
                        <p className="text-sm text-blue-700"><strong>Age:</strong> {getPatientAge(patient.id)} years</p>
                        <p className="text-sm text-blue-700"><strong>Gender:</strong> {patient.gender}</p>
                      </div>
                      <div>
                        <p className="text-sm text-blue-700"><strong>Phone:</strong> {patient.phone}</p>
                        <p className="text-sm text-blue-700"><strong>Blood Type:</strong> {patient.bloodType || 'Not specified'}</p>
                        <p className="text-sm text-blue-700"><strong>Allergies:</strong> {patient.allergies || 'None'}</p>
                      </div>
                      <div className="md:col-span-2">
                        <p className="text-sm text-blue-700"><strong>Chief Complaint:</strong> {consultingVisit.complaint}</p>
                      </div>
                    </div>
                  );
                })()}
              </div>

              {/* Diagnosis */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <FileText className="h-4 w-4 mr-2" />
                  Diagnosis *
                </label>
                <textarea
                  value={consultationData.diagnosis}
                  onChange={(e) => setConsultationData(prev => ({ ...prev, diagnosis: e.target.value }))}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Enter diagnosis and assessment..."
                  required
                />
              </div>

              {/* Medications */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <Pill className="h-4 w-4 mr-2" />
                  Medications
                </label>
                <div className="space-y-3">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={newMedication}
                      onChange={(e) => setNewMedication(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Add medication..."
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddMedication())}
                    />
                    <button
                      type="button"
                      onClick={handleAddMedication}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                    >
                      Add
                    </button>
                  </div>
                  
                  {consultationData.medications.length > 0 && (
                    <div className="space-y-2">
                      {consultationData.medications.map((medication, index) => (
                        <div key={index} className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-lg">
                          <span className="text-sm text-gray-900">{medication}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveMedication(medication)}
                            className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50 transition-colors duration-200"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Notes
                </label>
                <textarea
                  value={consultationData.notes}
                  onChange={(e) => setConsultationData(prev => ({ ...prev, notes: e.target.value }))}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Additional notes, follow-up instructions, etc..."
                />
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={handleCloseConsultation}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleEndConsultation}
                  disabled={!consultationData.diagnosis.trim() || isSubmitting}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Ending Consultation...</span>
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4" />
                      <span>End Consultation</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};