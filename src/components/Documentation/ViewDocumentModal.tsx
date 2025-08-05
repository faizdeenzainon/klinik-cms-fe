import React from 'react';
import { X, FileText, User, Calendar, MapPin, Clock, CheckCircle, Mail, Archive } from 'lucide-react';
import { Document } from '../../types';
import { mockPatients, mockDoctors } from '../../data/mockData';
import { format } from 'date-fns';

interface ViewDocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
  document: Document | null;
}

export const ViewDocumentModal: React.FC<ViewDocumentModalProps> = ({
  isOpen,
  onClose,
  document,
}) => {
  if (!isOpen || !document) return null;

  const getPatientName = (patientId: string) => {
    const patient = mockPatients.find(p => p.id === patientId);
    return patient ? `${patient.firstName} ${patient.lastName}` : 'Unknown Patient';
  };

  const getDoctorName = (doctorId: string) => {
    const doctor = mockDoctors.find(d => d.id === doctorId);
    return doctor ? `${doctor.firstName} ${doctor.lastName}` : 'Unknown Doctor';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'draft':
        return <Clock className="h-5 w-5 text-gray-600" />;
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'sent':
        return <Mail className="h-5 w-5 text-blue-600" />;
      case 'archived':
        return <Archive className="h-5 w-5 text-gray-600" />;
      default:
        return <Clock className="h-5 w-5 text-orange-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'sent':
        return 'bg-blue-100 text-blue-800';
      case 'archived':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-orange-100 text-orange-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'referral-letter':
        return 'bg-blue-100 text-blue-800';
      case 'medical-certificate':
        return 'bg-green-100 text-green-800';
      case 'prescription':
        return 'bg-purple-100 text-purple-800';
      case 'lab-report':
        return 'bg-orange-100 text-orange-800';
      case 'discharge-summary':
        return 'bg-red-100 text-red-800';
      case 'insurance-claim':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-xl">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Document Details</h2>
              <p className="text-sm text-gray-500">View document information and content</p>
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
          {/* Document Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <FileText className="h-5 w-5 mr-2 text-blue-600" />
              Document Information
            </h3>
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">Title:</span>
                <span className="text-sm text-gray-900 font-medium">{document.title}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">Document ID:</span>
                <span className="text-sm text-gray-900">{document.id}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">Type:</span>
                <span className={`px-2 py-1 text-xs font-medium rounded-full capitalize ${getTypeColor(document.type)}`}>
                  {document.type.replace('-', ' ')}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">Status:</span>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(document.status)}
                  <span className={`px-2 py-1 text-xs font-medium rounded-full capitalize ${getStatusColor(document.status)}`}>
                    {document.status}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Patient & Doctor Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <User className="h-5 w-5 mr-2 text-blue-600" />
              Patient & Doctor Information
            </h3>
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">Patient:</span>
                <span className="text-sm text-gray-900 font-medium">{getPatientName(document.patientId)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">Doctor:</span>
                <span className="text-sm text-gray-900 font-medium">{getDoctorName(document.doctorId)}</span>
              </div>
            </div>
          </div>

          {/* Document Dates */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-blue-600" />
              Document Dates
            </h3>
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">Created:</span>
                <span className="text-sm text-gray-900">
                  {format(new Date(document.createdAt), 'MMM dd, yyyy')}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">Last Updated:</span>
                <span className="text-sm text-gray-900">
                  {format(new Date(document.updatedAt), 'MMM dd, yyyy')}
                </span>
              </div>
              {document.issuedDate && (
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600">Issued Date:</span>
                  <span className="text-sm text-gray-900">
                    {format(new Date(document.issuedDate), 'MMM dd, yyyy')}
                  </span>
                </div>
              )}
              {document.validUntil && (
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600">Valid Until:</span>
                  <span className="text-sm text-gray-900">
                    {format(new Date(document.validUntil), 'MMM dd, yyyy')}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Recipient Information */}
          {(document.recipientName || document.recipientAddress) && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-blue-600" />
                Recipient Information
              </h3>
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                {document.recipientName && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">Recipient Name:</span>
                    <span className="text-sm text-gray-900">{document.recipientName}</span>
                  </div>
                )}
                {document.recipientAddress && (
                  <div className="flex items-start justify-between">
                    <span className="text-sm font-medium text-gray-600">Recipient Address:</span>
                    <span className="text-sm text-gray-900 text-right max-w-xs">{document.recipientAddress}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Document Content */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Document Content</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="whitespace-pre-wrap text-sm text-gray-900 leading-relaxed">
                {document.content}
              </div>
            </div>
          </div>

          {/* Notes */}
          {document.notes && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Notes</h3>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-sm text-yellow-800">{document.notes}</p>
              </div>
            </div>
          )}

          {/* Attachments */}
          {document.attachments && document.attachments.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Attachments</h3>
              <div className="space-y-2">
                {document.attachments.map((attachment, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-900">{attachment}</span>
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                      Download
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-between p-6 border-t border-gray-200">
          <div className="flex space-x-3">
            {document.status === 'completed' && (
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>Send Document</span>
              </button>
            )}
            <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200">
              Print
            </button>
          </div>
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