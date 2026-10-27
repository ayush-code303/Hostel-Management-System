import React, { useState, useEffect } from 'react';
import MainLayout from '../../layouts/MainLayout';
import { 
  Users, 
  DoorOpen, 
  AlertCircle, 
  CheckCircle, 
  Clock, 
  Search, 
  Plus, 
  Download, 
  Bell, 
  UserCheck, 
  Send, 
  X, 
  QrCode, 
  Utensils, 
  Star, 
  Mail, 
  CalendarCheck, 
  CheckCircle2, 
  ShieldCheck, 
  Wrench, 
  Flame, 
  Filter 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { 
  studentAPI, 
  complaintAPI, 
  leaveAPI, 
  visitorAPI, 
  noticeAPI, 
  messAPI 
} from '../../services/api';
import socket from '../../services/socket';
import Toast from '../../components/Toast';
import DigitalGatePassModal from '../../components/DigitalGatePassModal';
import EmailDispatchModal from '../../components/EmailDispatchModal';

export default function WardenDashboard({ defaultPanel = 'overview' }) {
  const { user, institution } = useAuth();
  const [activeTab, setActiveTab] = useState(defaultPanel);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modals state
  const [activeModal, setActiveModal] = useState(null); // 'notice' | 'qrpass' | 'email' | null
  const [selectedPass, setSelectedPass] = useState(null);
  const [emailPassData, setEmailPassData] = useState(null);

  // Toast
  const [toast, setToast] = useState({ message: '', type: 'info' });
  const showToast = (message, type = 'success') => setToast({ message, type });

  // Data States for Assigned Hostel Wing
  const assignedWingName = user?.warden?.assignedHostel || 'Nelson Mandela Boys Hostel (Block B)';

  const [residents, setResidents] = useState([
    { id: 1, name: 'Ayush', rollNo: '25ASETCSE019', dept: 'CSE', room: '204', bed: 'Bed 2', attendance: 'Present', phone: '+91 9876543210' },
    { id: 2, name: 'Priya Verma', rollNo: '2026BECE045', dept: 'ECE', room: '108', bed: 'Bed 1', attendance: 'Present', phone: '+91 9876543211' },
    { id: 3, name: 'Ankit Kumar', rollNo: '2026BME112', dept: 'ME', room: '302', bed: 'Bed 1', attendance: 'Leave', phone: '+91 9876543212' },
    { id: 4, name: 'Rahul Mishra', rollNo: '25ASETCSE088', dept: 'CSE', room: '204', bed: 'Bed 1', attendance: 'Present', phone: '+91 9876543214' },
    { id: 5, name: 'Deepak Singh', rollNo: '25ASETME033', dept: 'ME', room: '208', bed: 'Bed 2', attendance: 'Late Entry', phone: '+91 9876543215' }
  ]);

  const [leaves, setLeaves] = useState([
    { id: 'LV-2026-042', student: 'Ayush', rollNo: '25ASETCSE019', reason: 'Home Visit Weekend', dates: '24 Oct - 26 Oct 2026', parent: '+91 9876543210', status: 'Pending Warden Approval', gatePassCode: 'PASS-SUA-2026-904' },
    { id: 'LV-2026-040', student: 'Priya Verma', rollNo: '2026BECE045', reason: 'Family Function', dates: '22 Oct - 24 Oct 2026', parent: '+91 9876543211', status: 'Approved', gatePassCode: 'PASS-SUA-2026-812' },
  ]);

  const [complaints, setComplaints] = useState([
    { id: 'CMP-2026-104', student: 'Ayush', room: '204', category: 'Air Conditioner', priority: 'High', date: 'Today', status: 'In Progress', assignedTech: 'Rajesh (HVAC Tech)' },
    { id: 'CMP-2026-105', student: 'Ankit Kumar', room: '302', category: 'Plumbing', priority: 'Medium', date: 'Yesterday', status: 'Pending Review', assignedTech: 'Unassigned' },
    { id: 'CMP-2026-089', student: 'Priya Verma', room: '108', category: 'Wi-Fi Network', priority: 'Low', date: '20 Oct 2026', status: 'Resolved', assignedTech: 'Campus IT' },
  ]);

  const [visitors, setVisitors] = useState([
    { id: 'VIS-901', name: 'Ramesh Sharma (Father)', student: 'Ayush (Room 204)', entry: '02:30 PM', exit: '04:15 PM', status: 'Exited' },
    { id: 'VIS-902', name: 'Sunita Verma (Mother)', student: 'Priya Verma (Room 108)', entry: '05:00 PM', exit: 'On Premises', status: 'Inside Campus' },
  ]);

  const [notices, setNotices] = useState([
    { id: 1, title: 'Mandatory Night Biometric Attendance at 09:30 PM', audience: 'Block B Residents', date: 'Today', author: 'Warden Office' },
    { id: 2, title: 'Hot Water Geyser Maintenance Inspection', audience: 'Block B Floors 1-3', date: 'Yesterday', author: 'Hostel Maintenance' },
  ]);

  const [messFeedbacks, setMessFeedbacks] = useState([
    { _id: 'fb-1', studentName: 'Ayush', mealType: 'Dinner', rating: 5, comment: 'Paneer butter masala and gulab jamun were delicious!', date: 'Today' },
    { _id: 'fb-2', studentName: 'Ankit Kumar', mealType: 'Lunch', rating: 4, comment: 'Rajma rice was hot and fresh.', date: 'Today' }
  ]);

  const [newNoticeTitle, setNewNoticeTitle] = useState('');
  const [newNoticeContent, setNewNoticeContent] = useState('');

  // Fetch live records on mount
  useEffect(() => {
    leaveAPI.getAll().then(res => {
      if (res?.data && Array.isArray(res.data) && res.data.length > 0) {
        setLeaves(res.data);
      }
    }).catch(() => {});

    complaintAPI.getAll().then(res => {
      if (res?.data && Array.isArray(res.data) && res.data.length > 0) {
        setComplaints(res.data);
      }
    }).catch(() => {});

    noticeAPI.getActive().then(res => {
      if (res?.data && Array.isArray(res.data) && res.data.length > 0) {
        setNotices(res.data);
      }
    }).catch(() => {});
  }, []);

  // Socket.IO real-time event updates
  useEffect(() => {
    if (!socket) return;

    socket.on('leave:applied', (newL) => {
      showToast(`📝 New Gate Pass Request: ${newL.student?.name || 'Student'} (${newL.reason})`, 'info');
      setLeaves(prev => [newL, ...prev]);
    });

    socket.on('complaint:created', (newCmp) => {
      showToast(`⚡ New Maintenance Complaint: ${newCmp.category} in Room ${newCmp.student?.room || '204'}`, 'info');
      setComplaints(prev => [newCmp, ...prev]);
    });

    return () => {
      socket.off('leave:applied');
      socket.off('complaint:created');
    };
  }, []);

  // Handlers
  const handleApproveLeave = async (leaveItem) => {
    try {
      const res = await leaveAPI.review(leaveItem.id || leaveItem._id, { status: 'approved', reviewComments: 'Approved by Warden' });
      const passCode = res?.data?.gatePassCode || `PASS-SUA-2026-${Math.floor(100 + Math.random() * 900)}`;
      setLeaves(leaves.map(l => (l.id === leaveItem.id || l._id === leaveItem._id) ? { ...l, status: 'Approved', gatePassCode: passCode } : l));
      showToast(`Pass #${passCode} Authorized! Digital QR code generated.`, 'success');
      
      // Prompt warden to send official email notification
      setEmailPassData({ ...leaveItem, gatePassCode: passCode });
      setActiveModal('email');
    } catch {
      const passCode = `PASS-SUA-2026-${Math.floor(100 + Math.random() * 900)}`;
      setLeaves(leaves.map(l => (l.id === leaveItem.id || l._id === leaveItem._id) ? { ...l, status: 'Approved', gatePassCode: passCode } : l));
      showToast(`Pass Authorized! (Local Mode)`, 'success');
      setEmailPassData({ ...leaveItem, gatePassCode: passCode });
      setActiveModal('email');
    }
  };

  const handleResolveComplaint = async (id) => {
    try {
      await complaintAPI.updateStatus(id, { status: 'resolved', resolutionNotes: 'Repaired by maintenance team' });
      setComplaints(complaints.map(c => (c.id === id || c._id === id) ? { ...c, status: 'Resolved' } : c));
      showToast(`Complaint #${id} marked as RESOLVED!`, 'success');
    } catch {
      setComplaints(complaints.map(c => (c.id === id || c._id === id) ? { ...c, status: 'Resolved' } : c));
      showToast(`Complaint marked Resolved (Local Mode)!`, 'success');
    }
  };

  const handleCreateNotice = async (e) => {
    e.preventDefault();
    if (!newNoticeTitle) return;
    try {
      const res = await noticeAPI.create({
        title: newNoticeTitle,
        content: newNoticeContent || newNoticeTitle,
        targetAudience: assignedWingName
      });
      const item = res?.data || {
        id: notices.length + 1,
        title: newNoticeTitle,
        audience: assignedWingName,
        date: 'Just Now',
        author: user?.name || 'Chief Warden'
      };
      setNotices([item, ...notices]);
      showToast('Warden Notice broadcasted to hostel residents!', 'success');
    } catch {
      const item = {
        id: notices.length + 1,
        title: newNoticeTitle,
        audience: assignedWingName,
        date: 'Just Now',
        author: user?.name || 'Chief Warden'
      };
      setNotices([item, ...notices]);
      showToast('Warden Notice broadcasted (Local Mode)!', 'success');
    }
    setNewNoticeTitle('');
    setNewNoticeContent('');
    setActiveModal(null);
  };

  const markAttendance = (id, status) => {
    setResidents(residents.map(r => r.id === id ? { ...r, attendance: status } : r));
    showToast(`Resident attendance marked: ${status}`, 'success');
  };

  const markAllPresent = () => {
    setResidents(residents.map(r => r.attendance === 'Leave' ? r : { ...r, attendance: 'Present' }));
    showToast('All in-house residents recorded as PRESENT for night roll call!', 'success');
  };

  const presentCount = residents.filter(r => r.attendance === 'Present').length;
  const attendanceRate = Math.round((presentCount / residents.length) * 100);

  return (
    <MainLayout userRole="Hostel Warden">
      
      {/* Toast Notification Alert */}
      <Toast message={toast.message} type={toast.type} onClose={() => setToast({ message: '', type: 'info' })} />

      <div className="space-y-6">

        {/* 1. WARDEN OPERATIONAL BANNER */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-950 text-white rounded-3xl p-6 lg:p-8 shadow-xl relative overflow-hidden">
          <div className="relative z-10 grid md:grid-cols-12 gap-6 items-center">
            
            <div className="md:col-span-8 space-y-3">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-blue-200 border border-white/15">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Duty Warden In-Charge • {institution?.name || 'Sharda University Agra'}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                {user?.name || 'Prof. Virendra Verma'}’s Warden Desk 🛡️
              </h2>
              <p className="text-blue-200 text-xs sm:text-sm font-normal">
                Assigned Wing: <span className="font-bold text-white">{assignedWingName}</span> • Office: Ground Floor Secretariat
              </p>

              <div className="pt-2 flex flex-wrap gap-2 text-xs">
                <button 
                  onClick={() => setActiveTab('attendance')}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold shadow-md transition-all flex items-center gap-1.5"
                >
                  <CalendarCheck className="w-4 h-4 text-white" /> Night Biometric Roll Call
                </button>
                <button 
                  onClick={() => setActiveTab('leave')}
                  className="px-4 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-white font-extrabold backdrop-blur border border-white/20 transition-all flex items-center gap-1.5"
                >
                  <Clock className="w-4 h-4 text-amber-300" /> Review Gate Passes ({leaves.filter(l => l.status.includes('Pending')).length})
                </button>
                <button 
                  onClick={() => setActiveModal('notice')}
                  className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black shadow-md transition-all flex items-center gap-1.5"
                >
                  <Bell className="w-4 h-4 text-slate-950" /> Broadcast Wing Notice
                </button>
              </div>
            </div>

            {/* Wing Quick Statistics */}
            <div className="md:col-span-4 bg-slate-950/80 backdrop-blur-md p-5 rounded-2xl border border-white/15 text-xs space-y-2.5">
              <div className="flex justify-between items-center text-slate-200">
                <span className="text-slate-400 font-medium">Assigned Block:</span>
                <span className="font-bold text-white">Block B Senior Boys</span>
              </div>
              <div className="flex justify-between items-center text-slate-200">
                <span className="text-slate-400 font-medium">Night Roll Call Status:</span>
                <span className="font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                  {attendanceRate}% Present ({presentCount}/{residents.length})
                </span>
              </div>
              <div className="flex justify-between items-center text-slate-200">
                <span className="text-slate-400 font-medium">Pending Gate Passes:</span>
                <span className="font-mono text-amber-300 font-bold">
                  {leaves.filter(l => l.status.includes('Pending')).length} Awaiting
                </span>
              </div>
              <div className="flex justify-between items-center text-slate-200">
                <span className="text-slate-400 font-medium">Campus Gate Security:</span>
                <span className="font-mono text-emerald-400">Gate 1 & Gate 2 Active</span>
              </div>
            </div>

          </div>
        </div>

        {/* 2. SUB-PANEL NAVIGATION TABS */}
        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-1.5 text-xs font-extrabold">
            {[
              { id: 'overview', label: 'Overview Desk' },
              { id: 'attendance', label: `Night Roll Call (${presentCount}/${residents.length})` },
              { id: 'leave', label: `Gate Pass Triage (${leaves.length})` },
              { id: 'complaints', label: `Maintenance Dispatch (${complaints.length})` },
              { id: 'visitors', label: `Visitors Registry (${visitors.length})` },
              { id: 'mess', label: 'Mess Food Feedback' },
              { id: 'notices', label: 'Warden Notices' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1.5 rounded-xl transition-all ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* ---------------- PANEL 1: OVERVIEW DESK ---------------- */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-1">
                <div className="flex justify-between items-center text-slate-400 text-xs font-bold uppercase">
                  <span>Present In Wing</span>
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
                <p className="text-2xl font-black text-slate-900 dark:text-white">{presentCount} / {residents.length}</p>
                <p className="text-xs text-emerald-600 font-bold">{attendanceRate}% Roll Call Compliance</p>
              </div>

              <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-1">
                <div className="flex justify-between items-center text-slate-400 text-xs font-bold uppercase">
                  <span>Outstation Passes</span>
                  <Clock className="w-5 h-5 text-amber-500" />
                </div>
                <p className="text-2xl font-black text-slate-900 dark:text-white">
                  {leaves.filter(l => l.status.includes('Pending')).length} Pending
                </p>
                <p className="text-xs text-slate-500">Requires Warden Decision</p>
              </div>

              <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-1">
                <div className="flex justify-between items-center text-slate-400 text-xs font-bold uppercase">
                  <span>Room Repairs</span>
                  <Wrench className="w-5 h-5 text-indigo-500" />
                </div>
                <p className="text-2xl font-black text-slate-900 dark:text-white">
                  {complaints.filter(c => c.status !== 'Resolved').length} Active
                </p>
                <p className="text-xs text-amber-600 font-bold">1 High Priority AC Ticket</p>
              </div>

              <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-1">
                <div className="flex justify-between items-center text-slate-400 text-xs font-bold uppercase">
                  <span>Campus Visitors</span>
                  <UserCheck className="w-5 h-5 text-emerald-500" />
                </div>
                <p className="text-2xl font-black text-slate-900 dark:text-white">1 On Premises</p>
                <p className="text-xs text-slate-500">Gate 2 Biometric Logging</p>
              </div>
            </div>

            {/* Quick Actions Row */}
            <div className="grid lg:grid-cols-12 gap-6">
              
              {/* Recent Gate Pass Applications */}
              <div className="lg:col-span-7 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
                <div className="flex justify-between items-center pb-2 border-b border-slate-100 dark:border-slate-800">
                  <h3 className="font-extrabold text-slate-900 dark:text-white text-sm">
                    Pending Outstation Gate Pass Requests
                  </h3>
                  <button onClick={() => setActiveTab('leave')} className="text-xs font-bold text-blue-600 hover:underline">
                    View All &rarr;
                  </button>
                </div>

                <div className="space-y-3">
                  {leaves.slice(0, 3).map((l, i) => (
                    <div key={i} className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-slate-900 dark:text-white">{l.student}</span>
                          <span className="text-[10px] font-mono text-blue-600 bg-blue-50 dark:bg-blue-950 px-2 py-0.5 rounded">
                            {l.rollNo}
                          </span>
                        </div>
                        <p className="text-slate-500 text-[11px] mt-0.5">{l.reason} • {l.dates}</p>
                      </div>

                      <div className="flex items-center gap-2">
                        {l.status.includes('Pending') ? (
                          <button
                            onClick={() => handleApproveLeave(l)}
                            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-lg shadow-sm"
                          >
                            Approve Pass
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              setEmailPassData(l);
                              setActiveModal('email');
                            }}
                            className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 text-blue-600 font-bold text-[11px] rounded-lg border border-slate-200 dark:border-slate-700 flex items-center gap-1"
                          >
                            <Mail className="w-3.5 h-3.5" /> Email Slip
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Maintenance Work Orders */}
              <div className="lg:col-span-5 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
                <div className="flex justify-between items-center pb-2 border-b border-slate-100 dark:border-slate-800">
                  <h3 className="font-extrabold text-slate-900 dark:text-white text-sm">
                    Maintenance Tickets Assigned
                  </h3>
                  <button onClick={() => setActiveTab('complaints')} className="text-xs font-bold text-blue-600 hover:underline">
                    Dispatch Desk &rarr;
                  </button>
                </div>

                <div className="space-y-3">
                  {complaints.slice(0, 3).map((c, i) => (
                    <div key={i} className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/80 dark:border-slate-800 space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-slate-900 dark:text-white text-xs">{c.category} (Room {c.room})</span>
                        <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded ${
                          c.status === 'Resolved' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {c.status}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500">Technician: {c.assignedTech || 'Rajesh (Maintenance)'}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ---------------- PANEL 2: NIGHT BIOMETRIC ROLL CALL DESK ---------------- */}
        {activeTab === 'attendance' && (
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm p-6 space-y-5">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                  Night Roll Call & Biometric Attendance Desk (09:30 PM Roll Call)
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  {assignedWingName} • Current Status: {attendanceRate}% Present
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={markAllPresent}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" /> Mark In-House Scholars Present
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600 dark:text-slate-300">
                <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-extrabold uppercase text-[10px] tracking-wider border-b border-slate-200 dark:border-slate-700">
                  <tr>
                    <th className="p-3.5">Roll Number</th>
                    <th className="p-3.5">Student Name</th>
                    <th className="p-3.5">Room & Bed</th>
                    <th className="p-3.5">Current Status</th>
                    <th className="p-3.5">Warden Marking Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {residents.map((r) => (
                    <tr key={r.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="p-3.5 font-mono font-bold text-blue-600 dark:text-blue-400">{r.rollNo}</td>
                      <td className="p-3.5 font-bold text-slate-900 dark:text-white">{r.name}</td>
                      <td className="p-3.5 font-semibold text-slate-800 dark:text-slate-200">Room {r.room} ({r.bed})</td>
                      <td className="p-3.5">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold ${
                          r.attendance === 'Present' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' :
                          r.attendance === 'Leave' ? 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300' :
                          'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                        }`}>
                          ● {r.attendance}
                        </span>
                      </td>
                      <td className="p-3.5">
                        <div className="flex gap-1.5">
                          <button
                            onClick={() => markAttendance(r.id, 'Present')}
                            className="px-2 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-lg text-[10px] font-bold"
                          >
                            Present
                          </button>
                          <button
                            onClick={() => markAttendance(r.id, 'Absent')}
                            className="px-2 py-1 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-lg text-[10px] font-bold"
                          >
                            Absent
                          </button>
                          <button
                            onClick={() => markAttendance(r.id, 'Late Entry')}
                            className="px-2 py-1 bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 rounded-lg text-[10px] font-bold"
                          >
                            Late
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ---------------- PANEL 3: OUTSTATION GATE PASS TRIAGE ---------------- */}
        {activeTab === 'leave' && (
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="font-extrabold text-slate-900 dark:text-white text-base">
                  Outstation Gate Pass Approvals & Email Notification Dispatch
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  Approving a gate pass automatically generates the student QR Code and official email dispatch to parent.
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600 dark:text-slate-300">
                <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-extrabold uppercase text-[10px] border-b border-slate-200 dark:border-slate-700">
                  <tr>
                    <th className="p-3.5">Pass ID</th>
                    <th className="p-3.5">Student Name</th>
                    <th className="p-3.5">Reason</th>
                    <th className="p-3.5">Dates</th>
                    <th className="p-3.5">Parent Contact</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5">Warden Clearance</th>
                    <th className="p-3.5">Email Slip</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {leaves.map((l, idx) => {
                    const isApproved = l.status === 'Approved' || l.status === 'approved';
                    return (
                      <tr key={l.id || idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                        <td className="p-3.5 font-mono font-bold text-blue-600">{l.gatePassCode || l.id}</td>
                        <td className="p-3.5 font-bold text-slate-900 dark:text-white">{l.student} ({l.rollNo})</td>
                        <td className="p-3.5 font-medium">{l.reason}</td>
                        <td className="p-3.5 text-slate-400">{l.dates}</td>
                        <td className="p-3.5 font-mono text-slate-500">{l.parent}</td>
                        <td className="p-3.5">
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                            isApproved ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                          }`}>
                            {l.status}
                          </span>
                        </td>
                        <td className="p-3.5">
                          {!isApproved ? (
                            <button 
                              onClick={() => handleApproveLeave(l)}
                              className="px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-[10px] transition-colors shadow-sm"
                            >
                              Authorize Pass
                            </button>
                          ) : (
                            <span className="text-emerald-600 text-[11px] font-bold">Authorized</span>
                          )}
                        </td>
                        <td className="p-3.5">
                          {isApproved && (
                            <button
                              onClick={() => {
                                setEmailPassData(l);
                                setActiveModal('email');
                              }}
                              className="px-2.5 py-1 bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 text-indigo-700 dark:text-indigo-300 font-bold rounded-lg text-[10px] flex items-center gap-1 border border-indigo-200 dark:border-indigo-800 transition-colors"
                            >
                              <Mail className="w-3.5 h-3.5" /> Send Email
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ---------------- PANEL 4: MAINTENANCE DISPATCH DESK ---------------- */}
        {activeTab === 'complaints' && (
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-extrabold text-slate-900 dark:text-white text-base">
                Hostel Wing Maintenance & Repair Dispatch Desk
              </h3>
              <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-lg">
                Estate Management Team On-Call
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600 dark:text-slate-300">
                <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-extrabold uppercase text-[10px] border-b border-slate-200 dark:border-slate-700">
                  <tr>
                    <th className="p-3.5">Ticket ID</th>
                    <th className="p-3.5">Room & Student</th>
                    <th className="p-3.5">Category</th>
                    <th className="p-3.5">Assigned Technician</th>
                    <th className="p-3.5">Priority</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {complaints.map((c, idx) => (
                    <tr key={c.id || idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                      <td className="p-3.5 font-mono font-bold text-blue-600">{c.id}</td>
                      <td className="p-3.5 font-bold text-slate-900 dark:text-white">Room {c.room} ({c.student})</td>
                      <td className="p-3.5 font-medium">{c.category}</td>
                      <td className="p-3.5 text-slate-600 dark:text-slate-300 font-medium">{c.assignedTech || 'Rajesh (Maintenance)'}</td>
                      <td className="p-3.5">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${
                          c.priority === 'High' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                        }`}>
                          {c.priority}
                        </span>
                      </td>
                      <td className="p-3.5">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                          c.status === 'Resolved' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {c.status}
                        </span>
                      </td>
                      <td className="p-3.5">
                        {c.status !== 'Resolved' && (
                          <button
                            onClick={() => handleResolveComplaint(c.id)}
                            className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-[10px] transition-colors"
                          >
                            Mark Repaired
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ---------------- PANEL 5: MESS QUALITY & FEEDBACK ---------------- */}
        {activeTab === 'mess' && (
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-extrabold text-slate-900 dark:text-white text-base">
                Hostel Dining Quality & Food Safety Inspection
              </h3>
              <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-lg">
                Warden Daily Mess Tasting Log
              </span>
            </div>

            <div className="space-y-3">
              {messFeedbacks.map((f, i) => (
                <div key={i} className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/80 dark:border-slate-800 space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-900 dark:text-white">{f.studentName} ({f.mealType})</span>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, idx) => (
                        <Star key={idx} className={`w-3.5 h-3.5 ${idx < f.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`} />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300">"{f.comment}"</p>
                  <p className="text-[10px] text-slate-400">Recorded: {f.date}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ---------------- PANEL 6: VISITORS REGISTRY ---------------- */}
        {activeTab === 'visitors' && (
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm p-6 space-y-4">
            <h3 className="font-extrabold text-slate-900 dark:text-white text-base pb-3 border-b border-slate-100 dark:border-slate-800">
              Campus Security Gate 2 Visitor Register
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600 dark:text-slate-300">
                <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-extrabold uppercase text-[10px]">
                  <tr>
                    <th className="p-3">Visitor ID</th>
                    <th className="p-3">Visitor Name</th>
                    <th className="p-3">Resident Scholar</th>
                    <th className="p-3">Check-in Time</th>
                    <th className="p-3">Check-out Time</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {visitors.map((v) => (
                    <tr key={v.id}>
                      <td className="p-3 font-mono font-bold text-blue-600">{v.id}</td>
                      <td className="p-3 font-bold text-slate-900 dark:text-white">{v.name}</td>
                      <td className="p-3 font-medium">{v.student}</td>
                      <td className="p-3 text-slate-500">{v.entry}</td>
                      <td className="p-3 text-slate-500">{v.exit}</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          v.status === 'Exited' ? 'bg-slate-100 text-slate-700' : 'bg-emerald-100 text-emerald-800'
                        }`}>
                          {v.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ---------------- PANEL 7: WARDEN NOTICES ---------------- */}
        {activeTab === 'notices' && (
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-extrabold text-slate-900 dark:text-white text-base">
                Hostel Wing Bulletin & Announcements
              </h3>
              <button 
                onClick={() => setActiveModal('notice')}
                className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition-colors flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" /> Post Announcement
              </button>
            </div>

            <div className="space-y-3">
              {notices.map((n, idx) => (
                <div key={idx} className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/80 dark:border-slate-800 space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-blue-600 bg-blue-50 dark:bg-blue-950 px-2 py-0.5 rounded">
                      {n.audience}
                    </span>
                    <span className="text-[10px] text-slate-400">{n.date}</span>
                  </div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">{n.title}</h4>
                  <p className="text-slate-600 dark:text-slate-300 text-xs">{n.content}</p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Official Email Dispatch Modal */}
      {activeModal === 'email' && emailPassData && (
        <EmailDispatchModal 
          leaveData={emailPassData}
          onClose={() => setActiveModal(null)}
          onSent={(msg) => showToast(msg, 'success')}
        />
      )}

      {/* Post New Announcement Modal */}
      {activeModal === 'notice' && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 max-w-md w-full rounded-3xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 animate-in fade-in zoom-in-95">
            <div className="bg-blue-600 text-white p-4 px-6 flex items-center justify-between">
              <h3 className="font-extrabold text-base flex items-center gap-2">
                <Bell className="w-5 h-5" /> Post Warden Notice
              </h3>
              <button onClick={() => setActiveModal(null)} className="p-1 hover:bg-blue-700 rounded-lg text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateNotice} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Announcement Title</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Night Attendance Timing Update"
                  value={newNoticeTitle}
                  onChange={(e) => setNewNoticeTitle(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-blue-600 font-medium dark:text-white"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Detailed Content</label>
                <textarea 
                  rows={3}
                  required
                  placeholder="Instructions for wing residents..."
                  value={newNoticeContent}
                  onChange={(e) => setNewNoticeContent(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-blue-600 font-medium dark:text-white"
                ></textarea>
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button 
                  type="button" 
                  onClick={() => setActiveModal(null)} 
                  className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-600 dark:text-slate-300 font-bold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-md flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" /> Dispatch to Wing
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </MainLayout>
  );
}
