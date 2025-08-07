import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Layout } from './components/Layout/Layout';
import { LoginForm } from './components/Auth/LoginForm';
import { Dashboard } from './pages/Dashboard';
import { Patients } from './pages/Patients';
import { Appointments } from './pages/Appointments';
import { Queue } from './pages/Queue';
import { Doctors } from './pages/Doctors';
import { MedicalRecords } from './pages/MedicalRecords';
import { Inventory } from './pages/Inventory';
import { Documentation } from './pages/Documentation';
import { Billing } from './pages/Billing';
import { Pharmacy } from './pages/Pharmacy';
import { Settings } from './pages/Settings';

const AppContent: React.FC = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <LoginForm />;
  }

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/patients" element={<Patients />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/queue" element={<Queue />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/records" element={<MedicalRecords />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/documentation" element={<Documentation />} />
        <Route path="/billing" element={<Billing />} />
        <Route path="/billing/:visitId" element={<Billing />} />
        <Route path="/pharmacy" element={<Pharmacy />} />
        <Route path="/pharmacy/:visitId" element={<Pharmacy />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Layout>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;