import React from 'react';
import { Bell, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ThemeToggleButton } from '../context/ThemeContext';
import shardaLogo from '../assets/sharda_logo.png';

export default function Navbar({ userRole = 'Admin' }) {
  return (
    <header className="sticky top-0 z-30 bg-white dark:bg-slate-900 border-b border-blue-100 dark:border-slate-800 px-6 py-3 shadow-sm transition-colors duration-300">
      <div className="flex items-center justify-between">
        
        {/* Circular Logo & System Name */}
        <div className="flex items-center space-x-3">
          <Link to="/" className="flex items-center space-x-3 group">
            {/* Borderless Circular Logo Badge */}
            <div className="w-10 h-10 rounded-full overflow-hidden bg-blue-600 p-0.5 shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform flex items-center justify-center shrink-0 border-0">
              <img 
                src={shardaLogo} 
                alt="Sharda Logo" 
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-extrabold text-slate-900 dark:text-white leading-tight">Sharda University Agra</h1>
                <span className="text-[10px] bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-extrabold px-2 py-0.5 rounded-full border-0">
                  Hostel Portal
                </span>
              </div>
              <p className="text-xs text-blue-600 dark:text-blue-400 font-bold tracking-wide uppercase">Residence Life & Administration</p>
            </div>
          </Link>
        </div>

        {/* Right Nav Actions */}
        <div className="flex items-center space-x-3">
          
          {/* Theme Toggle Button (Light / Dark Mode) */}
          <ThemeToggleButton />

          {/* Role Badge */}
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-extrabold bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 uppercase tracking-wider border-0">
            {userRole}
          </span>

          {/* Notifications Button */}
          <button className="relative p-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-blue-600 rounded-full animate-ping"></span>
          </button>

          {/* User Profile Pill */}
          <div className="flex items-center space-x-3 pl-3 border-l border-slate-200 dark:border-slate-800">
            <div className="w-9 h-9 rounded-full bg-blue-600 text-white font-extrabold flex items-center justify-center text-sm shadow-sm">
              AU
            </div>
            <div className="hidden md:block text-left">
              <p className="text-xs font-bold text-slate-900 dark:text-white leading-tight">Ayush</p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">ayush@sharda.ac.in</p>
            </div>
            <Link 
              to="/login" 
              className="p-2 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/40 rounded-xl transition-colors" 
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </div>
    </header>
  );
}
