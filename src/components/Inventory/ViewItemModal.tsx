import React from 'react';
import { X, Package, Calendar, MapPin, DollarSign, AlertTriangle, User, Truck } from 'lucide-react';
import { InventoryItem } from '../../types';
import { format } from 'date-fns';

interface ViewItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: InventoryItem | null;
}

export const ViewItemModal: React.FC<ViewItemModalProps> = ({
  isOpen,
  onClose,
  item,
}) => {
  if (!isOpen || !item) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in-stock':
        return 'bg-green-100 text-green-800';
      case 'low-stock':
        return 'bg-orange-100 text-orange-800';
      case 'out-of-stock':
        return 'bg-red-100 text-red-800';
      case 'expired':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'medication':
        return 'bg-blue-100 text-blue-800';
      case 'equipment':
        return 'bg-purple-100 text-purple-800';
      case 'supplies':
        return 'bg-green-100 text-green-800';
      case 'consumables':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const stockPercentage = (item.currentStock / item.maxStock) * 100;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-xl">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Package className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Item Details</h2>
              <p className="text-sm text-gray-500">View inventory item information</p>
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
          {/* Basic Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Package className="h-5 w-5 mr-2 text-blue-600" />
              Basic Information
            </h3>
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">Name:</span>
                <span className="text-sm text-gray-900 font-medium">{item.name}</span>
              </div>
              <div className="flex items-start justify-between">
                <span className="text-sm font-medium text-gray-600">Description:</span>
                <span className="text-sm text-gray-900 text-right max-w-xs">{item.description}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">Category:</span>
                <span className={`px-2 py-1 text-xs font-medium rounded-full capitalize ${getCategoryColor(item.category)}`}>
                  {item.category}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">Status:</span>
                <span className={`px-2 py-1 text-xs font-medium rounded-full capitalize ${getStatusColor(item.status)}`}>
                  {item.status.replace('-', ' ')}
                </span>
              </div>
            </div>
          </div>

          {/* Stock Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2 text-blue-600" />
              Stock Information
            </h3>
            <div className="bg-gray-50 rounded-lg p-4 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">Current Stock:</span>
                <span className="text-lg font-bold text-gray-900">{item.currentStock} {item.unit}</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Stock Level</span>
                  <span className="text-gray-900">{stockPercentage.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      stockPercentage > 50 ? 'bg-green-500' : 
                      stockPercentage > 20 ? 'bg-orange-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${Math.min(stockPercentage, 100)}%` }}
                  ></div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-white rounded-lg">
                  <div className="text-sm text-gray-600">Minimum</div>
                  <div className="text-lg font-semibold text-orange-600">{item.minStock}</div>
                </div>
                <div className="text-center p-3 bg-white rounded-lg">
                  <div className="text-sm text-gray-600">Maximum</div>
                  <div className="text-lg font-semibold text-green-600">{item.maxStock}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Financial Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <DollarSign className="h-5 w-5 mr-2 text-blue-600" />
              Financial Information
            </h3>
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">Unit Price:</span>
                <span className="text-sm font-bold text-gray-900">${item.unitPrice}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">Total Value:</span>
                <span className="text-lg font-bold text-green-600">
                  ${(item.currentStock * item.unitPrice).toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Location & Supplier */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <MapPin className="h-5 w-5 mr-2 text-blue-600" />
              Location & Supplier
            </h3>
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">Location:</span>
                <span className="text-sm text-gray-900">{item.location}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">Supplier:</span>
                <span className="text-sm text-gray-900 flex items-center">
                  <Truck className="h-4 w-4 mr-1" />
                  {item.supplier}
                </span>
              </div>
            </div>
          </div>

          {/* Additional Details */}
          {(item.expiryDate || item.batchNumber) && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-blue-600" />
                Additional Details
              </h3>
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                {item.expiryDate && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">Expiry Date:</span>
                    <span className="text-sm text-gray-900">
                      {format(new Date(item.expiryDate), 'MMM dd, yyyy')}
                    </span>
                  </div>
                )}
                {item.batchNumber && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">Batch Number:</span>
                    <span className="text-sm text-gray-900">{item.batchNumber}</span>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600">Last Updated:</span>
                  <span className="text-sm text-gray-900">
                    {format(new Date(item.lastUpdated), 'MMM dd, yyyy')}
                  </span>
                </div>
              </div>
            </div>
          )}
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