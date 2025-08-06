import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  UserCheck,
  FileText,
  Package,
  Settings,
  Clock,
  CreditCard,
  X,
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Patients', href: '/patients', icon: Users },
  // { name: 'Appointments', href: '/appointments', icon: Calendar },
  { name: 'Doctors', href: '/doctors', icon: UserCheck },
  { name: 'Queue', href: '/queue', icon: Clock },
  { name: 'Medical Records', href: '/records', icon: FileText },
  { name: 'Inventory', href: '/inventory', icon: Package },
  { name: 'Documentation', href: '/documentation', icon: FileText },
  { name: 'Billing', href: '/billing', icon: CreditCard },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  return (
    <div
      className={`
        fixed z-40 inset-y-0 left-0 transform bg-white w-64 shadow-lg border-r border-gray-200
        transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:relative md:translate-x-0 md:block
      `}
    >
      <div className="p-6 flex items-center justify-between md:justify-start">
        <div className="flex items-center space-x-2">
          <img src="/TriQon-logo.jpeg" alt="Logo" className="h-8 w-8 rounded-full object-cover" />
          <h1 className="text-xl font-bold text-gray-900 hidden md:block">Clinic Management System</h1>
        </div>
        <button className="md:hidden" onClick={onClose}>
          <X className="h-6 w-6 text-gray-700" />
        </button>
      </div>

      <nav className="mt-6 px-3">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            onClick={onClose}
            className={({ isActive }) =>
              `group flex items-center px-3 py-2 text-sm font-medium rounded-md mb-1 transition-colors duration-200 ${
                isActive
                  ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`
            }
          >
            <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
            {item.name}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};
 