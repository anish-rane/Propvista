import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './componets/Navbar';
import Login from './componets/Login';
import Register from './componets/Regester';
import AboutUs from './componets/AboutUs';
import ContactUs from './componets/ContactUs';
import AdminDashboard from './componets/AdminDashboard';
import AgentDashboard from './componets/AgentDashboard';
import ClientDashboard from './componets/ClientDashboard';
import { ToastContainer } from 'react-toastify';

function App() {
  const role = localStorage.getItem('role');

  const ProtectedRoute = ({ children, allowedRoles }) => {
    if (!role) return <Navigate to="/" />;
    if (!allowedRoles.includes(role)) return <Navigate to="/" />;
    return children;
  };

  const DashboardRedirect = () => {
    if (role === 'Admin') return <Navigate to="/admin-dashboard" />;
    if (role === 'Agent') return <Navigate to="/agent-dashboard" />;
    if (role === 'Client') return <Navigate to="/client-dashboard" />;
    return <Navigate to="/" />;
  };

  return (
    <div>
      <Navbar />
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path="/" element={role ? <DashboardRedirect /> : <Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />

        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute allowedRoles={['Admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/agent-dashboard"
          element={
            <ProtectedRoute allowedRoles={['Agent']}>
              <AgentDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/client-dashboard"
          element={
            <ProtectedRoute allowedRoles={['Client']}>
              <ClientDashboard />
            </ProtectedRoute>
          }
        />

        <Route path="/dashboard" element={<DashboardRedirect />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
