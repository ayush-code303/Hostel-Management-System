import React from 'react';
import { Building2, Bell, User, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Navbar({ userRole = 'Admin' }) {
  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200 px-6 py-3 shadow-sm">
      <div className="flex items-center justify-between">
        {/* Brand Logo & System Name */}
        <div className="flex items-center space-x-3">
          <div className="bg-blue-600 p-2 rounded-lg text-white">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-900 leading-tight">Hostel Management System</h1>
            <p className="text-xs text-slate-500 font-medium">Sharda University Agra</p>
          </div>
        </div>

        {/* Right Nav Actions */}
        <div className="flex items-center space-x-4">
          {/* Role Badge */}
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 uppercase tracking-wide">
            {userRole}
          </span>

          {/* Notifications Button */}
          <button className="relative p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* User Profile Pill */}
          <div className="flex items-center space-x-3 pl-3 border-l border-slate-200">
            <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-700 font-semibold text-sm">
              <User className="w-4 h-4" />
            </div>
            <div className="hidden md:block text-left">
              <p className="text-sm font-semibold text-slate-800 leading-tight">Ayush Admin</p>
              <p className="text-xs text-slate-500">ayush@hostel.edu</p>
            </div>
            <Link to="/login" className="p-2 text-slate-400 hover:text-red-600 rounded-lg transition-colors" title="Logout">
              <LogOut className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
