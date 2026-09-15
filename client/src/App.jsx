import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import StudentDashboard from './pages/student/StudentDashboard';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import AdminDashboard from './pages/admin/AdminDashboard';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main Web Page / Public Homepage */}
        <Route path="/" element={<LandingPage />} />

        {/* Public Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Student Portal Module */}
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/student/dashboard" element={<StudentDashboard />} />

        {/* Admin Operational Routes - Dynamic Panels */}
        <Route path="/admin" element={<AdminDashboard defaultPanel="overview" />} />
        <Route path="/admin/students" element={<AdminDashboard defaultPanel="students" />} />
        <Route path="/admin/hostels" element={<AdminDashboard defaultPanel="hostels" />} />
        <Route path="/admin/rooms" element={<AdminDashboard defaultPanel="rooms" />} />
        <Route path="/admin/allocations" element={<AdminDashboard defaultPanel="students" />} />
        <Route path="/admin/fees" element={<AdminDashboard defaultPanel="fees" />} />
        <Route path="/admin/complaints" element={<AdminDashboard defaultPanel="complaints" />} />
        <Route path="/admin/attendance" element={<AdminDashboard defaultPanel="overview" />} />
        <Route path="/admin/leave" element={<AdminDashboard defaultPanel="leave" />} />
        <Route path="/admin/visitors" element={<AdminDashboard defaultPanel="visitors" />} />
        <Route path="/admin/notices" element={<AdminDashboard defaultPanel="notices" />} />

        {/* Fallback Redirect to Landing Page */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
