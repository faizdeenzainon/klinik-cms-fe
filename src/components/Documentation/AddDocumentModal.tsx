import React, { useState } from 'react';
import { X, FileText, Save } from 'lucide-react';
import { Document } from '../../types';
import { mockPatients, mockDoctors } from '../../data/mockData';

interface AddDocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddDocument: (document: Omit<Document, 'id' | 'createdAt' | 'updatedAt'>) => void;
}

export const AddDocumentModal: React.FC<AddDocumentModalProps> = ({
  isOpen,
  onClose,
  onAddDocument,
}) => {
  const [formData, setFormData] = useState({
    type: 'referral-letter' as Document['type'],
    title: '',
    patientId: '',
    doctorId: '',
    content: '',
    status: 'draft' as Document['status'],
    issuedDate: '',
    validUntil: '',
    recipientName: '',
    recipientAddress: '',
    notes: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const documentTemplates = {
    'referral-letter': `Dear Dr. [Recipient Name],

I am referring [Patient Name] for your specialist consultation regarding [condition/symptoms].

Patient Details:
- Name: [Patient Name]
- Date of Birth: [DOB]
- Medical Record Number: [MRN]

Clinical History:
[Brief clinical history and current symptoms]

Current Medications:
[List current medications]

Reason for Referral:
[Specific reason for referral and what you're seeking]

Please find attached relevant test results and medical records.

Thank you for your time and expertise.

Sincerely,
[Doctor Name]
[Clinic Name]`,

    'medical-certificate': `MEDICAL CERTIFICATE

This is to certify that [Patient Name] was under my medical care from [Start Date] to [End Date].

Patient Details:
- Name: [Patient Name]
- Date of Birth: [DOB]
- Address: [Patient Address]

Medical Condition:
[Brief description of medical condition]

Recommendation:
The patient is advised to [rest/avoid work/specific restrictions] for a period of [duration].

This certificate is issued at the patient's request for [purpose - work/school/insurance].

Date of Issue: [Issue Date]
Valid Until: [Valid Until Date]

[Doctor Name]
[Medical License Number]
[Clinic Name]`,

    'prescription': `PRESCRIPTION

Patient: [Patient Name]
Date: [Date]
DOB: [Date of Birth]

Rx:
1. [Medication Name] [Strength] - [Instructions]
2. [Medication Name] [Strength] - [Instructions]

Special Instructions:
[Any special instructions or warnings]

Prescriber: [Doctor Name]
License: [License Number]
Date: [Date]`,

    'lab-report': `LABORATORY REPORT

Patient: [Patient Name]
DOB: [Date of Birth]
Test Date: [Test Date]
Report Date: [Report Date]

Tests Performed:
[List of tests]

Results:
[Test results with normal ranges]

Clinical Interpretation:
[Doctor's interpretation of results]

Recommendations:
[Follow-up recommendations]

Reported by: [Doctor Name]
[Clinic Name]`,

    'discharge-summary': `DISCHARGE SUMMARY

Patient: [Patient Name]
Admission Date: [Admission Date]
Discharge Date: [Discharge Date]

Diagnosis:
Primary: [Primary diagnosis]
Secondary: [Secondary diagnoses]

Hospital Course:
[Brief summary of hospital stay]

Medications at Discharge:
[List of discharge medications]

Follow-up Instructions:
[Follow-up care instructions]

Discharge Condition: [Condition]

[Doctor Name]
Attending Physician`,

    'insurance-claim': `INSURANCE CLAIM FORM

Patient Information:
- Name: [Patient Name]
- Policy Number: [Policy Number]
- Date of Birth: [DOB]
- Claim Number: [Claim Number]

Treatment Details:
- Date of Service: [Service Date]
- Diagnosis: [Diagnosis Code and Description]
- Treatment Provided: [Treatment Description]
- Provider: [Doctor Name]

Charges:
[Itemized charges]

Total Amount: $[Amount]

This claim is submitted for reimbursement under the patient's insurance policy.

Provider: [Doctor Name]
License: [License Number]
Date: [Date]`
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.content.trim()) newErrors.content = 'Content is required';
    if (!formData.patientId) newErrors.patientId = 'Patient is required';
    if (!formData.doctorId) newErrors.doctorId = 'Doctor is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newDocument: Omit<Document, 'id' | 'createdAt' | 'updatedAt'> = {
      ...formData,
      templateId: undefined,
      attachments: undefined,
    };

    onAddDocument(newDocument);
    
    // Reset form
    setFormData({
      type: 'referral-letter',
      title: '',
      patientId: '',
      doctorId: '',
      content: '',
      status: 'draft',
      issuedDate: '',
      validUntil: '',
      recipientName: '',
      recipientAddress: '',
      notes: '',
    });
    
    setIsSubmitting(false);
    onClose();
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleTypeChange = (type: Document['type']) => {
    setFormData(prev => ({
      ...prev,
      type,
      content: documentTemplates[type] || '',
      title: `${type.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())} - ${prev.patientId ? mockPatients.find(p => p.id === prev.patientId)?.firstName + ' ' + mockPatients.find(p => p.id === prev.patientId)?.lastName : '[Patient Name]'}`
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-xl">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Create New Document</h2>
              <p className="text-sm text-gray-500">Create a new medical document</p>
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
          {/* Basic Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Document Type *
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => handleTypeChange(e.target.value as Document['type'])}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="referral-letter">Referral Letter</option>
                  <option value="medical-certificate">Medical Certificate</option>
                  <option value="prescription">Prescription</option>
                  <option value="lab-report">Lab Report</option>
                  <option value="discharge-summary">Discharge Summary</option>
                  <option value="insurance-claim">Insurance Claim</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Document Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                    errors.title ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder="Enter document title"
                />
                {errors.title && (
                  <p className="text-red-600 text-sm mt-1">{errors.title}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Patient *
                </label>
                <select
                  value={formData.patientId}
                  onChange={(e) => handleInputChange('patientId', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                    errors.patientId ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select patient</option>
                  {mockPatients.map((patient) => (
                    <option key={patient.id} value={patient.id}>
                      {patient.firstName} {patient.lastName}
                    </option>
                  ))}
                </select>
                {errors.patientId && (
                  <p className="text-red-600 text-sm mt-1">{errors.patientId}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Doctor *
                </label>
                <select
                  value={formData.doctorId}
                  onChange={(e) => handleInputChange('doctorId', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                    errors.doctorId ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select doctor</option>
                  {mockDoctors.map((doctor) => (
                    <option key={doctor.id} value={doctor.id}>
                      {doctor.firstName} {doctor.lastName}
                    </option>
                  ))}
                </select>
                {errors.doctorId && (
                  <p className="text-red-600 text-sm mt-1">{errors.doctorId}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => handleInputChange('status', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="draft">Draft</option>
                  <option value="completed">Completed</option>
                  <option value="sent">Sent</option>
                  <option value="archived">Archived</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Issued Date
                </label>
                <input
                  type="date"
                  value={formData.issuedDate}
                  onChange={(e) => handleInputChange('issuedDate', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Valid Until
                </label>
                <input
                  type="date"
                  value={formData.validUntil}
                  onChange={(e) => handleInputChange('validUntil', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Recipient Name
                </label>
                <input
                  type="text"
                  value={formData.recipientName}
                  onChange={(e) => handleInputChange('recipientName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Recipient name"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Recipient Address
              </label>
              <textarea
                rows={2}
                value={formData.recipientAddress}
                onChange={(e) => handleInputChange('recipientAddress', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                placeholder="Recipient address"
              />
            </div>
          </div>

          {/* Document Content */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Document Content</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content * (Template loaded based on document type)
              </label>
              <textarea
                rows={15}
                value={formData.content}
                onChange={(e) => handleInputChange('content', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none font-mono text-sm ${
                  errors.content ? 'border-red-300 bg-red-50' : 'border-gray-300'
                }`}
                placeholder="Document content will be populated based on selected type..."
              />
              {errors.content && (
                <p className="text-red-600 text-sm mt-1">{errors.content}</p>
              )}
              <p className="text-xs text-gray-500 mt-1">
                Replace placeholders in brackets (e.g., [Patient Name]) with actual information.
              </p>
            </div>
          </div>

          {/* Notes */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Notes</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Notes
              </label>
              <textarea
                rows={3}
                value={formData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                placeholder="Additional notes or comments..."
              />
            </div>
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
                  <span>Creating...</span>
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  <span>Create Document</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};