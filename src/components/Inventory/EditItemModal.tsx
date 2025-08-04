import React, { useState, useEffect } from 'react';
import { X, Package, Save } from 'lucide-react';
import { InventoryItem } from '../../types';

interface EditItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: InventoryItem | null;
  onSave: (updatedItem: InventoryItem) => void;
}

export const EditItemModal: React.FC<EditItemModalProps> = ({
  isOpen,
  onClose,
  item,
  onSave,
}) => {
  const [formData, setFormData] = useState<Partial<InventoryItem>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (item) {
      setFormData(item);
    }
  }, [item]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name?.trim()) newErrors.name = 'Name is required';
    if (!formData.description?.trim()) newErrors.description = 'Description is required';
    if (!formData.currentStock || formData.currentStock < 0) newErrors.currentStock = 'Valid current stock is required';
    if (!formData.minStock || formData.minStock < 0) newErrors.minStock = 'Valid minimum stock is required';
    if (!formData.maxStock || formData.maxStock < 0) newErrors.maxStock = 'Valid maximum stock is required';
    if (!formData.unitPrice || formData.unitPrice < 0) newErrors.unitPrice = 'Valid unit price is required';
    if (!formData.supplier?.trim()) newErrors.supplier = 'Supplier is required';
    if (!formData.location?.trim()) newErrors.location = 'Location is required';

    if (formData.minStock && formData.maxStock && formData.minStock >= formData.maxStock) {
      newErrors.minStock = 'Minimum stock must be less than maximum stock';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm() || !item) return;

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Determine status based on stock levels
    let status: InventoryItem['status'] = 'in-stock';
    if (formData.currentStock === 0) {
      status = 'out-of-stock';
    } else if (formData.currentStock! <= formData.minStock!) {
      status = 'low-stock';
    } else if (formData.expiryDate && new Date(formData.expiryDate) < new Date()) {
      status = 'expired';
    }

    const updatedItem: InventoryItem = {
      ...item,
      ...formData,
      status,
      lastUpdated: new Date().toISOString().split('T')[0],
    } as InventoryItem;

    onSave(updatedItem);
    setIsSubmitting(false);
    onClose();
  };

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  if (!isOpen || !item) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-xl">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Package className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Edit Inventory Item</h2>
              <p className="text-sm text-gray-500">Update item information and stock levels</p>
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
                  Item Name *
                </label>
                <input
                  type="text"
                  value={formData.name || ''}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                    errors.name ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder="Enter item name"
                />
                {errors.name && (
                  <p className="text-red-600 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  value={formData.category || ''}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="medication">Medication</option>
                  <option value="equipment">Equipment</option>
                  <option value="supplies">Supplies</option>
                  <option value="consumables">Consumables</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  rows={3}
                  value={formData.description || ''}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none ${
                    errors.description ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder="Enter item description"
                />
                {errors.description && (
                  <p className="text-red-600 text-sm mt-1">{errors.description}</p>
                )}
              </div>
            </div>
          </div>

          {/* Stock Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Stock Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Stock *
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.currentStock || ''}
                  onChange={(e) => handleInputChange('currentStock', parseInt(e.target.value) || 0)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                    errors.currentStock ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder="0"
                />
                {errors.currentStock && (
                  <p className="text-red-600 text-sm mt-1">{errors.currentStock}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Minimum Stock *
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.minStock || ''}
                  onChange={(e) => handleInputChange('minStock', parseInt(e.target.value) || 0)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                    errors.minStock ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder="0"
                />
                {errors.minStock && (
                  <p className="text-red-600 text-sm mt-1">{errors.minStock}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Maximum Stock *
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.maxStock || ''}
                  onChange={(e) => handleInputChange('maxStock', parseInt(e.target.value) || 0)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                    errors.maxStock ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder="0"
                />
                {errors.maxStock && (
                  <p className="text-red-600 text-sm mt-1">{errors.maxStock}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Unit
                </label>
                <input
                  type="text"
                  value={formData.unit || ''}
                  onChange={(e) => handleInputChange('unit', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="e.g., pieces, tablets, boxes"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Unit Price *
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.unitPrice || ''}
                  onChange={(e) => handleInputChange('unitPrice', parseFloat(e.target.value) || 0)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                    errors.unitPrice ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder="0.00"
                />
                {errors.unitPrice && (
                  <p className="text-red-600 text-sm mt-1">{errors.unitPrice}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location *
                </label>
                <input
                  type="text"
                  value={formData.location || ''}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                    errors.location ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder="Storage location"
                />
                {errors.location && (
                  <p className="text-red-600 text-sm mt-1">{errors.location}</p>
                )}
              </div>
            </div>
          </div>

          {/* Supplier Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Supplier Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Supplier *
                </label>
                <input
                  type="text"
                  value={formData.supplier || ''}
                  onChange={(e) => handleInputChange('supplier', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                    errors.supplier ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder="Supplier name"
                />
                {errors.supplier && (
                  <p className="text-red-600 text-sm mt-1">{errors.supplier}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Batch Number
                </label>
                <input
                  type="text"
                  value={formData.batchNumber || ''}
                  onChange={(e) => handleInputChange('batchNumber', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Batch number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expiry Date
                </label>
                <input
                  type="date"
                  value={formData.expiryDate || ''}
                  onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>
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
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};