import React from 'react';
import { X, UserCheck, Mail, Phone, Award, Calendar, Clock } from 'lucide-react';
import { Doctor } from '../../types';

interface ViewDoctorModalProps {
  isOpen: boolean;
  onClose: () => void;
  doctor: Doctor | null;
}

export const ViewDoctorModal: React.FC<ViewDoctorModalProps> = ({
  isOpen,
  onClose,
  doctor,
}) => {
  if (!isOpen || !doctor) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-xl">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <UserCheck className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Doctor Details</h2>
              <p className="text-sm text-gray-500">View doctor information and schedule</p>
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
              <UserCheck className="h-5 w-5 mr-2 text-blue-600" />
              Personal Information
            </h3>
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">Full Name:</span>
                <span className="text-sm text-gray-900 font-medium">
                  {doctor.firstName} {doctor.lastName}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">Doctor ID:</span>
                <span className="text-sm text-gray-900">{doctor.id}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">Specialization:</span>
                <span className="text-sm text-blue-600 font-medium">{doctor.specialization}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">Experience:</span>
                <span className="text-sm text-gray-900 flex items-center">
                  <Award className="h-4 w-4 mr-1" />
                  {doctor.experience} years
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
                  {doctor.email}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">Phone:</span>
                <span className="text-sm text-gray-900 flex items-center">
                  <Phone className="h-4 w-4 mr-1" />
                  {doctor.phone}
                </span>
              </div>
            </div>
          </div>

          {/* Schedule */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-blue-600" />
              Weekly Schedule
            </h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="space-y-3">
                {doctor.schedule.map((schedule, index) => (
                  <div key={index} className="flex items-center justify-between py-2 border-b border-gray-200 last:border-b-0">
                    <span className="text-sm font-medium text-gray-900">{schedule.day}</span>
                    <div className="flex items-center space-x-2">
                      {schedule.isAvailable ? (
                        <>
                          <Clock className="h-4 w-4 text-green-600" />
                          <span className="text-sm text-green-600">
                            {schedule.startTime} - {schedule.endTime}
                          </span>
                        </>
                      ) : (
                        <span className="text-sm text-red-600">Not Available</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Status */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Status</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="text-sm text-green-600 font-medium">Status</div>
                <div className="text-lg font-semibold text-green-700">Active</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="text-sm text-blue-600 font-medium">Availability</div>
                <div className="text-lg font-semibold text-blue-700">Available</div>
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