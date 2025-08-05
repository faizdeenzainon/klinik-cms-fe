import React from 'react';
import { X, User, Mail, Phone, Calendar, MapPin, Heart, AlertTriangle, Clock } from 'lucide-react';
import { Patient } from '../../types';
import { format } from 'date-fns';

interface ViewPatientModalProps {
  isOpen: boolean;
  onClose: () => void;
  patient: Patient | null;
}

export const ViewPatientModal: React.FC<ViewPatientModalProps> = ({
  isOpen,
  onClose,
  patient,
}) => {
  if (!isOpen || !patient) return null;

  const age = new Date().getFullYear() - new Date(patient.dateOfBirth).getFullYear();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-xl">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <User className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Patient Details</h2>
              <p className="text-sm text-gray-500">View patient information and medical history</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Personal Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <User className="h-5 w-5 mr-2 text-blue-600" />
              Personal Information
            </h3>
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">Full Name:</span>
                <span className="text-sm text-gray-900 font-medium">
                  {patient.firstName} {patient.lastName}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">Patient ID:</span>
                <span className="text-sm text-gray-900">{patient.id}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">Date of Birth:</span>
                <span className="text-sm text-gray-900">
                  {format(new Date(patient.dateOfBirth), 'MMM dd, yyyy')} ({age} years old)
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">Gender:</span>
                <span className="text-sm text-gray-900 capitalize">{patient.gender}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">Registration Date:</span>
                <span className="text-sm text-gray-900">
                  {format(new Date(patient.createdAt), 'MMM dd, yyyy')}
                </span>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Phone className="h-5 w-5 mr-2 text-blue-600" />
              Contact Information
            </h3>
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">Email:</span>
                <span className="text-sm text-gray-900 flex items-center">
                  <Mail className="h-4 w-4 mr-1" />
                  {patient.email}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">Phone:</span>
                <span className="text-sm text-gray-900 flex items-center">
                  <Phone className="h-4 w-4 mr-1" />
                  {patient.phone}
                </span>
              </div>
              <div className="flex items-start justify-between">
                <span className="text-sm font-medium text-gray-600">Address:</span>
                <span className="text-sm text-gray-900 text-right max-w-xs flex items-start">
                  <MapPin className="h-4 w-4 mr-1 mt-0.5 flex-shrink-0" />
                  {patient.address}
                </span>
              </div>
            </div>
          </div>

          {/* Emergency Contact */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2 text-blue-600" />
              Emergency Contact
            </h3>
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">Contact Name:</span>
                <span className="text-sm text-gray-900">{patient.emergencyContact}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">Contact Phone:</span>
                <span className="text-sm text-gray-900 flex items-center">
                  <Phone className="h-4 w-4 mr-1" />
                  {patient.emergencyPhone}
                </span>
              </div>
            </div>
          </div>

          {/* Medical Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Heart className="h-5 w-5 mr-2 text-blue-600" />
              Medical Information
            </h3>
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">Blood Type:</span>
                <span className="text-sm text-gray-900 font-medium">
                  {patient.bloodType || 'Not specified'}
                </span>
              </div>
              <div className="flex items-start justify-between">
                <span className="text-sm font-medium text-gray-600">Known Allergies:</span>
                <span className={`text-sm text-right max-w-xs ${
                  patient.allergies && patient.allergies !== 'None' 
                    ? 'text-red-600 font-medium' 
                    : 'text-gray-900'
                }`}>
                  {patient.allergies || 'None specified'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">Last Visit:</span>
                <span className="text-sm text-gray-900 flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {patient.lastVisit 
                    ? format(new Date(patient.lastVisit), 'MMM dd, yyyy')
                    : 'No previous visits'
                  }
                </span>
              </div>
            </div>
          </div>

          {/* Patient Status */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Patient Status</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="text-sm text-green-600 font-medium">Status</div>
                <div className="text-lg font-semibold text-green-700">Active</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="text-sm text-blue-600 font-medium">Total Visits</div>
                <div className="text-lg font-semibold text-blue-700">
                  {patient.lastVisit ? '1+' : '0'}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};