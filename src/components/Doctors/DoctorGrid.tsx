import React from 'react';
import { Mail, Phone, Clock, Award, Eye, Edit, Trash2 } from 'lucide-react';
import { Doctor } from '../../types';

interface DoctorGridProps {
  doctors: Doctor[];
  onAddDoctor: () => void;
  onEditDoctor: (doctor: Doctor) => void;
  onViewDoctor: (doctor: Doctor) => void;
  onDeleteDoctor: (doctorId: string) => void;
}

export const DoctorGrid: React.FC<DoctorGridProps> = ({ 
  doctors, 
  onAddDoctor, 
  onEditDoctor, 
  onViewDoctor, 
  onDeleteDoctor 
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Medical Staff</h3>
          <button 
          onClick={() => onAddDoctor()}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200">
            Add Doctor
          </button>
        </div>
      </div>
      
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors.map((doctor) => (
            <div key={doctor.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
              <div className="text-center mb-4">
                <div className="h-16 w-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-semibold text-lg">
                    {doctor.firstName.charAt(0)}{doctor.lastName.charAt(0)}
                  </span>
                </div>
                <h4 className="text-lg font-semibold text-gray-900">{doctor.firstName} {doctor.lastName}</h4>
                <p className="text-blue-600 font-medium">{doctor.specialization}</p>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center text-sm text-gray-600">
                  <Award className="h-4 w-4 mr-2 text-gray-400" />
                  {doctor.experience} years experience
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Mail className="h-4 w-4 mr-2 text-gray-400" />
                  {doctor.email}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Phone className="h-4 w-4 mr-2 text-gray-400" />
                  {doctor.phone}
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Availability</span>
                  <div className="flex items-center text-green-600">
                    <Clock className="h-4 w-4 mr-1" />
                    Available
                  </div>
                </div>
              </div>
              
              <div className="mt-4 flex justify-center space-x-2">
                <button
                  onClick={() => onViewDoctor(doctor)}
                  className="text-blue-600 hover:text-blue-900 p-2 rounded hover:bg-blue-50 transition-colors duration-200"
                  title="View Doctor"
                >
                  <Eye className="h-4 w-4" />
                </button>
                <button
                  onClick={() => onEditDoctor(doctor)}
                  className="text-green-600 hover:text-green-900 p-2 rounded hover:bg-green-50 transition-colors duration-200"
                  title="Edit Doctor"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  onClick={() => onDeleteDoctor(doctor.id)}
                  className="text-red-600 hover:text-red-900 p-2 rounded hover:bg-red-50 transition-colors duration-200"
                  title="Delete Doctor"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};