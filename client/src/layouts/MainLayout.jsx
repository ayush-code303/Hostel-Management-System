import React from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

export default function MainLayout({ children, userRole = 'Admin' }) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Top Fixed Navbar */}
      <Navbar userRole={userRole} />

      {/* Main Container with Sidebar + Content */}
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
