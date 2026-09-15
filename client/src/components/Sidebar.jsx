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
  Bell 
} from 'lucide-react';

export default function Sidebar() {
  const navItems = [
    { label: 'Admin Dashboard', path: '/admin', tab: 'overview', icon: LayoutDashboard },
    { label: 'Student Directory', path: '/admin/students', tab: 'students', icon: Users },
    { label: 'Hostels & Blocks', path: '/admin/hostels', tab: 'hostels', icon: Building },
    { label: 'Rooms & Occupancy', path: '/admin/rooms', tab: 'rooms', icon: DoorOpen },
    { label: 'Room Allocations', path: '/admin/allocations', tab: 'allocations', icon: CheckSquare },
    { label: 'Fee Management', path: '/admin/fees', tab: 'fees', icon: CreditCard },
    { label: 'Complaints Triage', path: '/admin/complaints', tab: 'complaints', icon: AlertCircle },
    { label: 'Attendance Desk', path: '/admin/attendance', tab: 'attendance', icon: CalendarCheck },
    { label: 'Leave Approvals', path: '/admin/leave', tab: 'leave', icon: FileText },
    { label: 'Visitor Registry', path: '/admin/visitors', tab: 'visitors', icon: UserCheck },
    { label: 'Notice Board', path: '/admin/notices', tab: 'notices', icon: Bell },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 dark:bg-slate-950 dark:border-r dark:border-slate-800 min-h-[calc(100vh-61px)] p-4 flex flex-col justify-between shrink-0 transition-colors duration-300">
      <div className="space-y-1">
        <div className="px-3 py-1 flex items-center justify-between mb-2">
          <p className="text-[11px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
            Administration
          </p>
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping"></span>
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
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
        <p className="font-bold text-slate-300">Sharda University Agra</p>
        <p className="text-[10px]">Hostel Portal • PBL Project 2026</p>
      </div>
    </aside>
  );
}
