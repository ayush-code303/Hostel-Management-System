import React from 'react';
import MainLayout from '../../layouts/MainLayout';
import { Users, Building, DoorOpen, AlertCircle, TrendingUp, CheckCircle, Clock } from 'lucide-react';

export default function AdminDashboard() {
  const stats = [
    { title: 'Total Registered Students', value: '450', icon: Users, color: 'bg-blue-500', growth: '+12% from last term' },
    { title: 'Total Hostels Managed', value: '4', icon: Building, color: 'bg-indigo-500', growth: 'Boys & Girls Blocks' },
    { title: 'Room Occupancy Rate', value: '88%', icon: DoorOpen, color: 'bg-emerald-500', growth: '352 / 400 Beds Filled' },
    { title: 'Pending Complaints', value: '7', icon: AlertCircle, color: 'bg-amber-500', growth: 'requires resolution' },
  ];

  const recentActivities = [
    { text: 'Student Rahul Sharma applied for Room Allocation in Block A.', time: '10 mins ago', type: 'info' },
    { text: 'Complaint #104 (Plumbing issue) marked as Resolved by Warden.', time: '1 hour ago', type: 'success' },
    { text: 'Fee payment receipt verified for Student Priya Verma (₹25,000).', time: '3 hours ago', type: 'success' },
    { text: 'Visitor Gate Entry logged for Student Ankit Kumar.', time: '5 hours ago', type: 'warning' },
  ];

  return (
    <MainLayout userRole="Admin">
      <div className="space-y-6">
        {/* Header Title Banner */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Admin Dashboard Overview</h2>
            <p className="text-sm text-slate-500">Welcome to Hostel Administration Command Center.</p>
          </div>
          <div className="flex space-x-3">
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-lg shadow-sm transition-colors">
              + Allocate New Room
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-start space-x-4">
                <div className={`${stat.color} p-3 rounded-lg text-white shadow-sm`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{stat.title}</p>
                  <h3 className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</h3>
                  <p className="text-xs text-slate-400 mt-1 flex items-center">
                    <TrendingUp className="w-3 h-3 text-emerald-500 mr-1" />
                    {stat.growth}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Analytics & Activity Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Hostel Occupancy Quick Overview */}
          <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-slate-900">Hostel Block Occupancy Summary</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm font-semibold mb-1">
                  <span>Block A (Boys Hostel)</span>
                  <span className="text-blue-600">92% Occupied (110/120 Beds)</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-3">
                  <div className="bg-blue-600 h-3 rounded-full" style={{ width: '92%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm font-semibold mb-1">
                  <span>Block B (Boys Hostel)</span>
                  <span className="text-indigo-600">85% Occupied (102/120 Beds)</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-3">
                  <div className="bg-indigo-600 h-3 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm font-semibold mb-1">
                  <span>Block C (Girls Hostel)</span>
                  <span className="text-emerald-600">88% Occupied (140/160 Beds)</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-3">
                  <div className="bg-emerald-600 h-3 rounded-full" style={{ width: '88%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity Log */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Recent Operations Log</h3>
            <div className="space-y-4">
              {recentActivities.map((act, i) => (
                <div key={i} className="flex items-start space-x-3 text-sm pb-3 border-b border-slate-100 last:border-0 last:pb-0">
                  <Clock className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-slate-800 font-medium leading-snug">{act.text}</p>
                    <span className="text-xs text-slate-400">{act.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
