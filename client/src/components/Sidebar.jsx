import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Building, 
  DoorOpen, 
  CheckSquare, 
  CreditCard, 
  AlertCircle, 
  CalendarCheck, 
  FileText, 
  UserCheck, 
  Bell, 
  Utensils, 
  TrendingUp, 
  ShieldCheck, 
  Home 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Sidebar() {
  const { user, institution } = useAuth();
  const role = (user?.role || 'admin').toLowerCase();

  // Admin Navigation (Institutional & Campus Oversight)
  const adminNav = [
    { label: 'Executive Dashboard', path: '/admin', icon: LayoutDashboard },
    { label: 'Student Directory', path: '/admin/students', icon: Users },
    { label: 'Hostel Wings & Blocks', path: '/admin/hostels', icon: Building },
    { label: 'Room Capacity & Beds', path: '/admin/rooms', icon: DoorOpen },
    { label: 'Fee Revenue Ledger', path: '/admin/fees', icon: CreditCard },
    { label: 'Operational Analytics', path: '/admin/analytics', icon: TrendingUp },
    { label: 'Complaints Governance', path: '/admin/complaints', icon: AlertCircle },
    { label: 'Gate Pass Records', path: '/admin/leave', icon: FileText },
    { label: 'Campus Notices', path: '/admin/notices', icon: Bell },
  ];

  // Warden Navigation (Ground Operations & Safety)
  const wardenNav = [
    { label: 'Warden Command Desk', path: '/warden', icon: ShieldCheck },
    { label: 'Resident Directory', path: '/warden/residents', icon: Users },
    { label: 'Night Biometric Roll Call', path: '/warden/attendance', icon: CalendarCheck },
    { label: 'Outstation Pass Triage', path: '/warden/leave', icon: FileText },
    { label: 'Maintenance Dispatch', path: '/warden/complaints', icon: AlertCircle },
    { label: 'Campus Gate Visitors', path: '/warden/visitors', icon: UserCheck },
    { label: 'Mess & Food Quality', path: '/warden/mess', icon: Utensils },
    { label: 'Hostel Bulletin', path: '/warden/notices', icon: Bell },
  ];

  // Student Navigation (Resident Self-Service)
  const studentNav = [
    { label: 'Student Residence Portal', path: '/student', icon: Home },
    { label: 'Room Complaints', path: '/student?tab=complaints', icon: AlertCircle },
    { label: 'Outstation Gate Passes', path: '/student?tab=leaves', icon: FileText },
    { label: 'Mess Timetable & Rating', path: '/student?action=mess', icon: Utensils },
    { label: 'Fee Receipts & Invoicing', path: '/student?action=receipt', icon: CreditCard },
  ];

  const currentNav = role === 'warden' ? wardenNav : (role === 'student' ? studentNav : adminNav);
  const portalTitle = role === 'warden' ? 'Warden Desk' : (role === 'student' ? 'Resident Portal' : 'Admin Hub');

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 dark:bg-slate-950 dark:border-r dark:border-slate-800 min-h-[calc(100vh-80px)] p-4 flex flex-col justify-between shrink-0 transition-colors duration-300">
      <div className="space-y-1">
        
        {/* Module Indicator Badge */}
        <div className="px-3 py-1 flex items-center justify-between mb-2">
          <p className="text-[10px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
            {portalTitle}
          </p>
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping"></span>
        </div>

        {/* Dynamic Navigation Items */}
        {currentNav.map((item, idx) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={idx}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-extrabold transition-all duration-200 ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 translate-x-1'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/80 dark:hover:bg-slate-900'
                }`
              }
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span className="truncate">{item.label}</span>
            </NavLink>
          );
        })}
      </div>

      {/* Footer Info */}
      <div className="pt-4 border-t border-slate-800/80 text-[11px] text-slate-500 px-3 space-y-1">
        <p className="font-bold text-slate-300">{institution?.name || 'Sharda University Agra'}</p>
        <p className="text-[10px] text-slate-400 font-mono">
          Campus Code: {institution?.campusCode || 'SUA-AGRA'}
        </p>
        <p className="text-[9px] text-slate-600 pt-0.5">National Central Hostel ERP</p>
      </div>
    </aside>
  );
}
