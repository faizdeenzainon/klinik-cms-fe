import React, { useState } from 'react';
import { FileText, Plus, Search, Filter, Eye, Edit, Trash2, Send, Archive, Clock, CheckCircle, Mail } from 'lucide-react';
import { mockDocuments, mockPatients, mockDoctors } from '../data/mockData';
import { Document } from '../types';
import { format } from 'date-fns';
import { ViewDocumentModal } from '../components/Documentation/ViewDocumentModal';
import { EditDocumentModal } from '../components/Documentation/EditDocumentModal';
import { AddDocumentModal } from '../components/Documentation/AddDocumentModal';

export const Documentation: React.FC = () => {
  const [documents] = useState<Document[]>(mockDocuments);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         getPatientName(doc.patientId).toLowerCase().includes(searchTerm.toLowerCase()) ||
                         getDoctorName(doc.doctorId).toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || doc.type === selectedType;
    const matchesStatus = selectedStatus === 'all' || doc.status === selectedStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

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
        return <Edit className="h-4 w-4 text-gray-600" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'sent':
        return <Mail className="h-4 w-4 text-blue-600" />;
      case 'archived':
        return <Archive className="h-4 w-4 text-gray-600" />;
      default:
        return <Clock className="h-4 w-4 text-orange-600" />;
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

  const handleViewDocument = (document: Document) => {
    setSelectedDocument(document);
    setViewModalOpen(true);
  };

  const handleEditDocument = (document: Document) => {
    setSelectedDocument(document);
    setEditModalOpen(true);
  };

  const handleAddDocument = (newDocumentData: Omit<Document, 'id' | 'createdAt' | 'updatedAt'>) => {
    // const newDocument: Document = {
    //   ...newDocumentData,
    //   id: (documents.length + 1).toString(),
    //   createdAt: new Date().toISOString().split('T')[0],
    //   updatedAt: new Date().toISOString().split('T')[0],
    // };
    // setDocuments(prev => [newDocument, ...prev]);
  };

  const handleSaveDocument = (updatedDocument: Document) => {
    // setDocuments(prevDocs => 
    //   prevDocs.map(doc => 
    //     doc.id === updatedDocument.id ? updatedDocument : doc
    //   )
    // );
  };

  const handleDeleteDocument = (documentId: string) => {
    // if (confirm('Are you sure you want to delete this document?')) {
    //   setDocuments(prevDocs => prevDocs.filter(doc => doc.id !== documentId));
    // }
  };

  // Stats
  const totalDocuments = documents.length;
  const draftDocuments = documents.filter(d => d.status === 'draft').length;
  const completedDocuments = documents.filter(d => d.status === 'completed').length;
  const sentDocuments = documents.filter(d => d.status === 'sent').length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Documentation</h1>
        <p className="text-gray-600 mt-1">Manage medical documents, referral letters, certificates, and reports.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Documents</p>
              <p className="text-2xl font-bold text-gray-900">{totalDocuments}</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Draft</p>
              <p className="text-2xl font-bold text-gray-600">{draftDocuments}</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <Edit className="h-6 w-6 text-gray-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-green-600">{completedDocuments}</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Sent</p>
              <p className="text-2xl font-bold text-blue-600">{sentDocuments}</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <Send className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Documents Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
            <h3 className="text-lg font-semibold text-gray-900">Documents</h3>
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-3 w-full sm:w-auto">
              <div className="relative w-full sm:w-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search documents..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-64"
                />
              </div>
              <div className="flex items-center space-x-2 w-full sm:w-auto">
                <Filter className="h-4 w-4 text-gray-400" />
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                >
                  <option value="all">All Types</option>
                  <option value="referral-letter">Referral Letter</option>
                  <option value="medical-certificate">Medical Certificate</option>
                  <option value="prescription">Prescription</option>
                  <option value="lab-report">Lab Report</option>
                  <option value="discharge-summary">Discharge Summary</option>
                  <option value="insurance-claim">Insurance Claim</option>
                </select>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                >
                  <option value="all">All Status</option>
                  <option value="draft">Draft</option>
                  <option value="completed">Completed</option>
                  <option value="sent">Sent</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
              <button 
                onClick={() => setAddModalOpen(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2 w-full sm:w-auto justify-center"
              >
                <Plus className="h-4 w-4" />
                <span>New Document</span>
              </button>
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Document
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Patient
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Doctor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredDocuments.map((document) => (
                <tr key={document.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{document.title}</div>
                      <div className="text-sm text-gray-500">ID: {document.id}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full capitalize ${getTypeColor(document.type)}`}>
                      {document.type.replace('-', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {getPatientName(document.patientId)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {getDoctorName(document.doctorId)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(document.status)}
                      <span className={`px-2 py-1 text-xs font-medium rounded-full capitalize ${getStatusColor(document.status)}`}>
                        {document.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {format(new Date(document.createdAt), 'MMM dd, yyyy')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => handleViewDocument(document)}
                        className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50 transition-colors duration-200"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => handleEditDocument(document)}
                        className="text-green-600 hover:text-green-900 p-1 rounded hover:bg-green-50 transition-colors duration-200"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => handleDeleteDocument(document.id)}
                        className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50 transition-colors duration-200"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors duration-200 text-center">
              <FileText className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <span className="text-sm font-medium text-gray-900">Create Referral Letter</span>
            </button>
            <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors duration-200 text-center">
              <CheckCircle className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <span className="text-sm font-medium text-gray-900">Issue Medical Certificate</span>
            </button>
            <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors duration-200 text-center">
              <Edit className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <span className="text-sm font-medium text-gray-900">Generate Prescription</span>
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
      <ViewDocumentModal
        isOpen={viewModalOpen}
        onClose={() => setViewModalOpen(false)}
        document={selectedDocument}
      />

      <EditDocumentModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        document={selectedDocument}
        onSave={handleSaveDocument}
      />

      <AddDocumentModal
        isOpen={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onAddDocument={handleAddDocument}
      />
    </div>
  );
};