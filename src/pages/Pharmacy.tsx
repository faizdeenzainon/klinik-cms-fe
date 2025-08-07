import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Pill, User, Clock, CheckCircle, Edit, Trash2, ArrowRight } from 'lucide-react';
import { mockPrescriptions, mockPatients, mockVisits } from '../data/mockData';
import { Prescription, Patient, Visit } from '../types';

export const Pharmacy: React.FC = () => {
  const { visitId } = useParams<{ visitId: string }>();
  const navigate = useNavigate();
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [patient, setPatient] = useState<Patient | null>(null);
  const [visit, setVisit] = useState<Visit | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isConfirming, setIsConfirming] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const isListingView = !visitId;
  const [pendingVisits, setPendingVisits] = useState<Visit[]>([]);

  useEffect(() => {
    // Simulate API calls
    const fetchData = async () => {
      setIsLoading(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Fetch prescriptions for this visit
      const visitPrescriptions = mockPrescriptions.filter(p => p.visitId === visitId);
      setPrescriptions(visitPrescriptions);
      
      // Fetch visit details
      const visitData = mockVisits.find(v => v.id === visitId);
      setVisit(visitData || null);
      
      // Fetch patient details
      if (visitData) {
        const patientData = mockPatients.find(p => p.id === visitData.patientId);
        setPatient(patientData || null);
      }
      
      setIsLoading(false);
    };

    if (visitId) {
      fetchData();
    }
  }, [visitId]);

  useEffect(() => {
  if (!isListingView) return;

  const fetchPending = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000)); // simulate delay

    const pending = mockVisits.filter(v => v.status === 'completed'); // can add filter like !v.prescriptionConfirmed
    setPendingVisits(pending);
    setIsLoading(false);
  };

  fetchPending();
}, [isListingView]);

  const handleEditPrescription = (prescriptionId: string, field: string, value: string | number) => {
    setPrescriptions(prev => 
      prev.map(p => 
        p.id === prescriptionId 
          ? { ...p, [field]: value }
          : p
      )
    );
  };

  const handleRemovePrescription = (prescriptionId: string) => {
    if (confirm('Are you sure you want to remove this prescription?')) {
      setPrescriptions(prev => prev.filter(p => p.id !== prescriptionId));
    }
  };

  const handleConfirmAndProceed = async () => {
    setIsConfirming(true);
    
    try {
      // Simulate API call to confirm prescriptions
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mark all prescriptions as confirmed
      setPrescriptions(prev => 
        prev.map(p => ({ 
          ...p, 
          confirmed: true, 
          confirmedAt: new Date().toISOString(),
          pharmacistId: 'current-user-id' 
        }))
      );
      
      // Show success message and redirect
      alert('Prescriptions confirmed successfully. Redirected to billing.');
      navigate(`/billing/${visitId}`);
      
    } catch (error) {
      alert('Error confirming prescriptions. Please try again.');
    } finally {
      setIsConfirming(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading prescription details...</p>
        </div>
      </div>
    );
  }

  if (isListingView) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <h1 className="text-2xl font-bold mb-6 flex items-center">
          <Pill className="h-6 w-6 mr-2 text-blue-600" />
          Pharmacy - Pending Prescriptions
        </h1>

        {pendingVisits.length === 0 ? (
          <p className="text-gray-500">No patients waiting for medication.</p>
        ) : (
          <table className="min-w-full bg-white rounded-lg border">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left px-4 py-2 text-sm font-medium">Patient</th>
                <th className="text-left px-4 py-2 text-sm font-medium">Visit ID</th>
                <th className="text-left px-4 py-2 text-sm font-medium">Time In</th>
                <th className="text-left px-4 py-2 text-sm font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {pendingVisits.map(v => {
                const patient = mockPatients.find(patient => patient.id === v.patientId);
                return (
                  <tr key={v.id} className="border-t">
                    <td className="px-4 py-2">{patient ? `${patient.firstName} ${patient.lastName}` : 'Unknown'}</td>
                    <td className="px-4 py-2">#{v.id}</td>
                    <td className="px-4 py-2">{new Date(v.timeIn).toLocaleTimeString()}</td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => navigate(`/pharmacy/${v.id}`)}
                        className="text-blue-600 hover:text-blue-800 font-medium"
                      >
                        Process
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    );
  }

  if (!visit || !patient) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg">Visit or patient not found</p>
          <button 
            onClick={() => navigate('/queue')}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Back to Queue
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                <Pill className="h-6 w-6 mr-2 text-blue-600" />
                Pharmacy - Prescription Review
              </h1>
              <p className="text-gray-600 mt-1">Review and confirm prescribed medications</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Visit ID</p>
              <p className="text-lg font-semibold text-gray-900">#{visitId}</p>
            </div>
          </div>
        </div>

        {/* Patient Information */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <User className="h-5 w-5 mr-2 text-blue-600" />
            Patient Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-gray-600">Patient Name</p>
              <p className="text-lg font-semibold text-gray-900">
                {patient.firstName} {patient.lastName}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Age</p>
              <p className="text-lg font-semibold text-gray-900">
                {new Date().getFullYear() - new Date(patient.dateOfBirth).getFullYear()} years
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Phone</p>
              <p className="text-lg font-semibold text-gray-900">{patient.phone}</p>
            </div>
          </div>
          
          {patient.allergies && patient.allergies !== 'None' && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm font-medium text-red-800">⚠️ Patient Allergies: {patient.allergies}</p>
            </div>
          )}
        </div>

        {/* Prescriptions */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <Pill className="h-5 w-5 mr-2 text-blue-600" />
              Prescribed Medications ({prescriptions.length})
            </h3>
          </div>
          
          <div className="p-6">
            {prescriptions.length === 0 ? (
              <div className="text-center py-8">
                <Pill className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No prescriptions found for this visit</p>
              </div>
            ) : (
              <div className="space-y-4">
                {prescriptions.map((prescription, index) => (
                  <div key={prescription.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-gray-900">
                        {index + 1}. {prescription.medicineName}
                      </h4>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => setEditingId(editingId === prescription.id ? null : prescription.id)}
                          className="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-50"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleRemovePrescription(prescription.id)}
                          className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    
                    {editingId === prescription.id ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">Dosage</label>
                          <input
                            type="text"
                            value={prescription.dosage}
                            onChange={(e) => handleEditPrescription(prescription.id, 'dosage', e.target.value)}
                            className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">Quantity</label>
                          <input
                            type="number"
                            value={prescription.quantity}
                            onChange={(e) => handleEditPrescription(prescription.id, 'quantity', parseInt(e.target.value) || 0)}
                            className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">Frequency</label>
                          <input
                            type="text"
                            value={prescription.frequency}
                            onChange={(e) => handleEditPrescription(prescription.id, 'frequency', e.target.value)}
                            className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">Duration</label>
                          <input
                            type="text"
                            value={prescription.duration}
                            onChange={(e) => handleEditPrescription(prescription.id, 'duration', e.target.value)}
                            className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                          />
                        </div>
                        <div className="md:col-span-2 lg:col-span-4">
                          <label className="block text-xs font-medium text-gray-700 mb-1">Instructions</label>
                          <input
                            type="text"
                            value={prescription.instructions || ''}
                            onChange={(e) => handleEditPrescription(prescription.id, 'instructions', e.target.value)}
                            className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                            placeholder="Special instructions..."
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
                        <div>
                          <span className="text-gray-600">Dosage:</span>
                          <span className="ml-2 font-medium">{prescription.dosage}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Quantity:</span>
                          <span className="ml-2 font-medium">{prescription.quantity}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Frequency:</span>
                          <span className="ml-2 font-medium">{prescription.frequency}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Duration:</span>
                          <span className="ml-2 font-medium">{prescription.duration}</span>
                        </div>
                        {prescription.instructions && (
                          <div className="md:col-span-2 lg:col-span-4">
                            <span className="text-gray-600">Instructions:</span>
                            <span className="ml-2 font-medium">{prescription.instructions}</span>
                          </div>
                        )}
                      </div>
                    )}
                    
                    {prescription.confirmed && (
                      <div className="mt-3 flex items-center text-green-600">
                        <CheckCircle className="h-4 w-4 mr-1" />
                        <span className="text-sm">Confirmed by pharmacist</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        {prescriptions.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <button
                onClick={() => navigate('/queue')}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                Back to Queue
              </button>
              
              <button
                onClick={handleConfirmAndProceed}
                disabled={isConfirming}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center space-x-2"
              >
                {isConfirming ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Confirming...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle className="h-4 w-4" />
                    <span>Confirm & Proceed to Billing</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};