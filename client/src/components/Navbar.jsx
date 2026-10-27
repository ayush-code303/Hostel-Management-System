import React, { useState, useEffect } from 'react';
import { 
  Bell, 
  LogOut, 
  User, 
  ShieldCheck, 
  Building2, 
  Clock, 
  ChevronDown, 
  Globe, 
  Sparkles 
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { ThemeToggleButton, AccessibilityToolbar } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { INSTITUTIONS } from '../services/multiCollegeData';
import ProfileModal from './ProfileModal';
import shardaLogo from '../assets/sharda_logo.png';

export default function Navbar({ userRole }) {
  const { user, institution, logout, setInstitution } = useAuth();
  const navigate = useNavigate();

  const [currentTime, setCurrentTime] = useState('');
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showCollegeDropdown, setShowCollegeDropdown] = useState(false);

  // Live IST Digital Clock Ticker
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = { 
        timeZone: 'Asia/Kolkata', 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit',
        hour12: true,
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      };
      setCurrentTime(now.toLocaleString('en-IN', options) + ' IST');
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const activeRole = (userRole || user?.role || 'admin').toLowerCase();

  return (
    <>
      {/* 1. TOP GOVERNMENT & INSTITUTIONAL UTILITY BAR */}
      <div className="bg-slate-900 text-slate-300 text-[11px] border-b border-slate-800 px-4 py-1.5 flex flex-wrap items-center justify-between gap-2 z-40 transition-colors">
        
        {/* National Flag / Accreditation Ticker */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 font-bold text-white tracking-wide">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
            <span>NATIONAL CAMPUS RESIDENCE & HOSTEL ERP</span>
          </div>
          <span className="text-slate-600 hidden sm:inline">|</span>
          <span className="text-slate-400 font-medium hidden md:inline">
            Ministry of Education • Central Residential Authority
          </span>
        </div>

        {/* Right Utility: Time, Helpline & Accessibility */}
        <div className="flex items-center gap-4">
          <div className="hidden lg:flex items-center gap-1 font-mono text-slate-300 text-[11px]">
            <Clock className="w-3 h-3 text-blue-400" />
            <span>{currentTime || 'IST Live'}</span>
          </div>

          <span className="text-slate-600 hidden lg:inline">|</span>

          {/* GIGW Accessibility Controls */}
          <AccessibilityToolbar />

          <span className="text-slate-600 hidden sm:inline">|</span>

          <span className="text-amber-400 font-bold hidden sm:inline">
            Helpline: 1800-HOSTEL-HELP
          </span>
        </div>

      </div>

      {/* 2. MAIN INSTITUTIONAL NAVIGATION BAR */}
      <header className="sticky top-0 z-30 bg-white dark:bg-slate-900 border-b border-blue-100 dark:border-slate-800 px-4 lg:px-6 py-2.5 shadow-sm transition-colors duration-300">
        <div className="flex items-center justify-between">
          
          {/* Institutional Crest & College Name */}
          <div className="flex items-center space-x-3">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-blue-600 p-0.5 shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform flex items-center justify-center shrink-0 border-0">
                <img 
                  src={shardaLogo} 
                  alt="University Seal" 
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white leading-tight">
                    {institution?.name || 'Sharda University Agra'}
                  </h1>
                  <span className="text-[10px] bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-extrabold px-2 py-0.5 rounded-full border-0 hidden sm:inline">
                    {institution?.campusCode || 'SUA-AGRA'}
                  </span>
                </div>
                <p className="text-[11px] text-blue-600 dark:text-blue-400 font-bold tracking-wide uppercase">
                  Central Campus Residence & Hostels
                </p>
              </div>
            </Link>

            {/* Quick Multi-College Switcher Dropdown */}
            <div className="relative hidden xl:block ml-3">
              <button
                type="button"
                onClick={() => setShowCollegeDropdown(!showCollegeDropdown)}
                className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-[11px] font-bold rounded-lg flex items-center gap-1.5 transition-colors"
                title="Switch University Campus"
              >
                <Building2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span>Switch Campus</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {showCollegeDropdown && (
                <div className="absolute left-0 mt-2 w-72 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl p-2 z-50 text-xs animate-in fade-in">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 py-1">
                    Select University Residence
                  </p>
                  {Object.values(INSTITUTIONS).map((inst) => (
                    <button
                      key={inst.id}
                      onClick={() => {
                        setInstitution(inst);
                        setShowCollegeDropdown(false);
                      }}
                      className={`w-full text-left p-2 rounded-xl flex items-center justify-between transition-colors ${
                        institution?.id === inst.id ? 'bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-bold' : 'hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <div>
                        <p className="font-extrabold">{inst.name}</p>
                        <p className="text-[10px] text-slate-400">{inst.state} • {inst.hostels.length} Hostels</p>
                      </div>
                      {institution?.id === inst.id && (
                        <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Actions: Role Switcher / Profile / Theme */}
          <div className="flex items-center space-x-3">
            
            {/* Dark / Light Toggle Button */}
            <ThemeToggleButton />

            {/* Role Badge */}
            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
              activeRole === 'admin' ? 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300' :
              activeRole === 'warden' ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300' :
              'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300'
            }`}>
              {activeRole === 'admin' ? 'Campus Admin' : activeRole === 'warden' ? 'Chief Warden' : 'Scholar'}
            </span>

            {/* Profile Avatar & Details Button */}
            <button
              onClick={() => setShowProfileModal(true)}
              className="flex items-center space-x-2 p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors text-left"
              title="Click to view & edit Profile / Photo"
            >
              <img 
                src={user?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80'} 
                alt="Avatar" 
                className="w-8 h-8 rounded-full object-cover border-2 border-blue-600 shadow-sm"
              />
              <div className="hidden sm:block text-xs leading-tight">
                <p className="font-extrabold text-slate-900 dark:text-white">{user?.name || 'Ayush'}</p>
                <p className="text-[10px] text-slate-400 font-mono">
                  {user?.student?.rollNumber || user?.username || 'Active'}
                </p>
              </div>
            </button>

            {/* Logout Button */}
            <button 
              onClick={() => {
                logout();
                navigate('/login');
              }}
              className="p-2 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Logout from Campus Portal"
            >
              <LogOut className="w-4 h-4" />
            </button>

          </div>

        </div>
      </header>

      {/* Profile Details & Photo Uploader Modal */}
      {showProfileModal && (
        <ProfileModal 
          onClose={() => setShowProfileModal(false)} 
          onProfileUpdated={(msg) => alert(msg)}
        />
      )}
    </>
  );
}
