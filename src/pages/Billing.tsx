import React, { useState } from 'react';
import { CreditCard, DollarSign, Clock, CheckCircle, AlertCircle, Filter, User, FileText } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockPatients, mockVisits, mockPrescriptions } from '../data/mockData';

interface BillingRecord {
  id: string;
  patientName: string;
  service: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue';
  date: string;
  dueDate: string;
  paymentMethod?: string;
}

const mockBillingData: BillingRecord[] = [
  {
    id: 'INV-001',
    patientName: 'John Doe',
    service: 'Cardiology Consultation',
    amount: 250,
    status: 'paid',
    date: '2024-01-10',
    dueDate: '2024-01-25',
    paymentMethod: 'Credit Card'
  },
  {
    id: 'INV-002',
    patientName: 'Sarah Wilson',
    service: 'Pediatric Check-up',
    amount: 150,
    status: 'pending',
    date: '2024-01-12',
    dueDate: '2024-01-27'
  },
  {
    id: 'INV-003',
    patientName: 'Michael Johnson',
    service: 'Orthopedic Surgery',
    amount: 2500,
    status: 'overdue',
    date: '2023-12-15',
    dueDate: '2023-12-30'
  },
  {
    id: 'INV-004',
    patientName: 'Emily Chen',
    service: 'Physical Therapy Session',
    amount: 100,
    status: 'paid',
    date: '2024-01-14',
    dueDate: '2024-01-29',
    paymentMethod: 'Insurance'
  },
  {
    id: 'INV-005',
    patientName: 'David Miller',
    service: 'Dental Cleaning',
    amount: 120,
    status: 'pending',
    date: '2024-01-15',
    dueDate: '2024-01-30'
  }
];

export const Billing: React.FC = () => {
  const { visitId } = useParams<{ visitId: string }>();
  const navigate = useNavigate();
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'paid' | 'pending' | 'overdue'>('all');
  
  // If visitId is provided, show visit-specific billing
  if (visitId) {
    const visit = mockVisits.find(v => v.id === visitId);
    const patient = visit ? mockPatients.find(p => p.id === visit.patientId) : null;
    const prescriptions = mockPrescriptions.filter(p => p.visitId === visitId);
    
    if (!visit || !patient) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-600 text-lg">Visit or patient not found</p>
            <button 
              onClick={() => navigate('/billing')}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Back to Billing
            </button>
          </div>
        </div>
      );
    }

    const consultationFee = 50;
    const medicationTotal = prescriptions.reduce((total, p) => total + (p.quantity * 2), 0); // $2 per unit
    const totalAmount = consultationFee + medicationTotal;

    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                  <CreditCard className="h-6 w-6 mr-2 text-blue-600" />
                  Billing - Payment Processing
                </h1>
                <p className="text-gray-600 mt-1">Process payment for consultation and medications</p>
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
                <p className="text-sm text-gray-600">Payment Type</p>
                <p className="text-lg font-semibold text-gray-900 capitalize">
                  {visit.paymentType || 'Cash'}
                  {visit.panelName && ` - ${visit.panelName}`}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Status</p>
                <span className={`px-2 py-1 text-sm font-medium rounded-full ${
                  visit.billingStatus === 'paid' ? 'bg-green-100 text-green-800' :
                  visit.billingStatus === 'to-be-claimed' ? 'bg-orange-100 text-orange-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {visit.billingStatus?.replace('-', ' ') || 'Pending'}
                </span>
              </div>
            </div>
          </div>

          {/* Billing Details */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <FileText className="h-5 w-5 mr-2 text-blue-600" />
              Billing Details
            </h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-gray-700">Consultation Fee</span>
                <span className="font-semibold">${consultationFee}</span>
              </div>
              
              {prescriptions.map((prescription, index) => (
                <div key={prescription.id} className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-gray-700">
                    {prescription.medicineName} ({prescription.quantity} units)
                  </span>
                  <span className="font-semibold">${prescription.quantity * 2}</span>
                </div>
              ))}
              
              <div className="flex justify-between items-center py-3 border-t-2 border-gray-300 text-lg font-bold">
                <span>Total Amount</span>
                <span className="text-green-600">${totalAmount}</span>
              </div>
            </div>
            
            <div className="mt-6 flex justify-between">
              <button
                onClick={() => navigate('/pharmacy/' + visitId)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Back to Pharmacy
              </button>
              
              <div className="space-x-3">
                {visit.paymentType === 'panel' ? (
                  <button className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700">
                    Submit to Panel
                  </button>
                ) : (
                  <>
                    <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                      Process Cash Payment
                    </button>
                    <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                      Process Card Payment
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Regular billing page
  const filteredBilling = selectedFilter === 'all' 
    ? mockBillingData 
    : mockBillingData.filter(record => record.status === selectedFilter);

  const totalRevenue = mockBillingData.filter(r => r.status === 'paid').reduce((sum, r) => sum + r.amount, 0);
  const pendingAmount = mockBillingData.filter(r => r.status === 'pending').reduce((sum, r) => sum + r.amount, 0);
  const overdueAmount = mockBillingData.filter(r => r.status === 'overdue').reduce((sum, r) => sum + r.amount, 0);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-orange-600" />;
      case 'overdue':
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-orange-100 text-orange-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Billing & Payments</h1>
        <p className="text-gray-600 mt-1">Manage invoices, payments, and financial records.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-green-600">${totalRevenue.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Payments</p>
              <p className="text-2xl font-bold text-orange-600">${pendingAmount.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-orange-50 rounded-lg">
              <Clock className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Overdue Amount</p>
              <p className="text-2xl font-bold text-red-600">${overdueAmount.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-red-50 rounded-lg">
              <AlertCircle className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Billing Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Recent Invoices</h3>
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-gray-400" />
                <select
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value as any)}
                  className="text-sm border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Status</option>
                  <option value="paid">Paid</option>
                  <option value="pending">Pending</option>
                  <option value="overdue">Overdue</option>
                </select>
              </div>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200">
                Create Invoice
              </button>
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Invoice
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Patient
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Service
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Due Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredBilling.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{record.id}</div>
                    <div className="text-sm text-gray-500">{record.date}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{record.patientName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{record.service}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-bold text-gray-900">${record.amount}</div>
                    {record.paymentMethod && (
                      <div className="text-xs text-gray-500">{record.paymentMethod}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(record.status)}
                      <span className={`px-2 py-1 text-xs font-medium rounded-full capitalize ${getStatusColor(record.status)}`}>
                        {record.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {record.dueDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button className="text-blue-600 hover:text-blue-900 hover:bg-blue-50 px-2 py-1 rounded transition-colors duration-200">
                        View
                      </button>
                      {record.status !== 'paid' && (
                        <button className="text-green-600 hover:text-green-900 hover:bg-green-50 px-2 py-1 rounded transition-colors duration-200">
                          Process Payment
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Payment Methods</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 hover:bg-blue-50 transition-colors duration-200 cursor-pointer">
              <CreditCard className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-900">Credit Card</p>
              <p className="text-xs text-gray-500">Visa, Mastercard, Amex</p>
            </div>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 hover:bg-blue-50 transition-colors duration-200 cursor-pointer">
              <DollarSign className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-900">Cash Payment</p>
              <p className="text-xs text-gray-500">In-person payments</p>
            </div>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 hover:bg-blue-50 transition-colors duration-200 cursor-pointer">
              <CheckCircle className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-900">Insurance</p>
              <p className="text-xs text-gray-500">Direct billing</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};