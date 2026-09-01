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
    { label: 'Admin Dashboard', path: '/admin', icon: LayoutDashboard },
    { label: 'Student Directory', path: '/admin/students', icon: Users },
    { label: 'Hostels & Blocks', path: '/admin/hostels', icon: Building },
    { label: 'Rooms & Occupancy', path: '/admin/rooms', icon: DoorOpen },
    { label: 'Room Allocations', path: '/admin/allocations', icon: CheckSquare },
    { label: 'Fee Management', path: '/admin/fees', icon: CreditCard },
    { label: 'Complaints Triage', path: '/admin/complaints', icon: AlertCircle },
    { label: 'Attendance Desk', path: '/warden/attendance', icon: CalendarCheck },
    { label: 'Leave Approvals', path: '/admin/leave', icon: FileText },
    { label: 'Visitor Registry', path: '/admin/visitors', icon: UserCheck },
    { label: 'Notice Board', path: '/admin/notices', icon: Bell },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 min-h-[calc(100vh-61px)] p-4 flex flex-col justify-between">
      <div className="space-y-1">
        <p className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
          Management Portal
        </p>
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`
              }
            >
              <Icon className="w-4 h-4" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </div>

      {/* Footer Info */}
      <div className="pt-4 border-t border-slate-800 text-xs text-slate-500 px-3">
        <p className="font-semibold text-slate-400">PBL College Project v1.0</p>
        <p>© 2026 Hostel Management</p>
      </div>
    </aside>
  );
}
