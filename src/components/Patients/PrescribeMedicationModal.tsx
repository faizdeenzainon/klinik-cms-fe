import React, { useState } from 'react';
import { X, Pill, Plus, Trash2, Search } from 'lucide-react';
import { InventoryItem, Patient } from '../../types';
import { mockInventoryItems } from '../../data/mockData';

interface Prescription {
  itemId: string;
  itemName: string;
  dosage: string;
  frequency: string;
  duration: string;
  quantity: number;
  instructions: string;
}

interface PrescribeMedicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  patient: Patient | null;
  onPrescribe: (prescriptions: Prescription[]) => void;
}

export const PrescribeMedicationModal: React.FC<PrescribeMedicationModalProps> = ({
  isOpen,
  onClose,
  patient,
  onPrescribe,
}) => {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([
    {
      itemId: '',
      itemName: '',
      dosage: '',
      frequency: '',
      duration: '',
      quantity: 1,
      instructions: '',
    },
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Filter medications from inventory
  const availableMedications = mockInventoryItems.filter(
    item => item.category === 'medication' && item.status === 'in-stock'
  );

  const filteredMedications = availableMedications.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addPrescription = () => {
    setPrescriptions([
      ...prescriptions,
      {
        itemId: '',
        itemName: '',
        dosage: '',
        frequency: '',
        duration: '',
        quantity: 1,
        instructions: '',
      },
    ]);
  };

  const removePrescription = (index: number) => {
    if (prescriptions.length > 1) {
      setPrescriptions(prescriptions.filter((_, i) => i !== index));
    }
  };

  const updatePrescription = (index: number, field: keyof Prescription, value: string | number) => {
    const updated = [...prescriptions];
    if (field === 'itemId') {
      const selectedItem = availableMedications.find(item => item.id === value);
      updated[index] = {
        ...updated[index],
        itemId: value as string,
        itemName: selectedItem?.name || '',
      };
    } else {
      updated[index] = { ...updated[index], [field]: value };
    }
    setPrescriptions(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate prescriptions
    const validPrescriptions = prescriptions.filter(
      p => p.itemId && p.dosage && p.frequency && p.duration && p.quantity > 0
    );

    if (validPrescriptions.length === 0) {
      alert('Please add at least one valid prescription');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    onPrescribe(validPrescriptions);
    
    // Reset form
    setPrescriptions([
      {
        itemId: '',
        itemName: '',
        dosage: '',
        frequency: '',
        duration: '',
        quantity: 1,
        instructions: '',
      },
    ]);
    
    setIsSubmitting(false);
    onClose();
  };

  if (!isOpen || !patient) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-xl">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Pill className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Prescribe Medication</h2>
              <p className="text-sm text-gray-500">
                Patient: {patient.firstName} {patient.lastName}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Patient Allergies Warning */}
          {patient.allergies && patient.allergies !== 'None' && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <div className="text-red-600 font-semibold">⚠️ Patient Allergies:</div>
                <div className="text-red-700">{patient.allergies}</div>
              </div>
            </div>
          )}

          {/* Medication Search */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search Available Medications
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Search medications..."
              />
            </div>
          </div>

          {/* Prescriptions */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Prescriptions</h3>
              <button
                type="button"
                onClick={addPrescription}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2"
              >
                <Plus className="h-4 w-4" />
                <span>Add Prescription</span>
              </button>
            </div>

            {prescriptions.map((prescription, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-gray-900">Prescription {index + 1}</h4>
                  {prescriptions.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removePrescription(index)}
                      className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50 transition-colors duration-200"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Medication *
                    </label>
                    <select
                      value={prescription.itemId}
                      onChange={(e) => updatePrescription(index, 'itemId', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Select medication</option>
                      {filteredMedications.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.name} (Stock: {item.currentStock})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Dosage *
                    </label>
                    <input
                      type="text"
                      value={prescription.dosage}
                      onChange={(e) => updatePrescription(index, 'dosage', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., 500mg"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Frequency *
                    </label>
                    <select
                      value={prescription.frequency}
                      onChange={(e) => updatePrescription(index, 'frequency', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Select frequency</option>
                      <option value="Once daily">Once daily</option>
                      <option value="Twice daily">Twice daily</option>
                      <option value="Three times daily">Three times daily</option>
                      <option value="Four times daily">Four times daily</option>
                      <option value="Every 4 hours">Every 4 hours</option>
                      <option value="Every 6 hours">Every 6 hours</option>
                      <option value="Every 8 hours">Every 8 hours</option>
                      <option value="As needed">As needed</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Duration *
                    </label>
                    <select
                      value={prescription.duration}
                      onChange={(e) => updatePrescription(index, 'duration', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Select duration</option>
                      <option value="3 days">3 days</option>
                      <option value="5 days">5 days</option>
                      <option value="7 days">7 days</option>
                      <option value="10 days">10 days</option>
                      <option value="14 days">14 days</option>
                      <option value="1 month">1 month</option>
                      <option value="2 months">2 months</option>
                      <option value="3 months">3 months</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Quantity *
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={prescription.quantity}
                      onChange={(e) => updatePrescription(index, 'quantity', parseInt(e.target.value) || 1)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Special Instructions
                    </label>
                    <input
                      type="text"
                      value={prescription.instructions}
                      onChange={(e) => updatePrescription(index, 'instructions', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., Take with food"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center space-x-2"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Prescribing...</span>
                </>
              ) : (
                <>
                  <Pill className="h-4 w-4" />
                  <span>Prescribe Medications</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};