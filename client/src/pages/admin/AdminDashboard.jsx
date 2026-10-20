import React, { useState, useEffect } from 'react';
import MainLayout from '../../layouts/MainLayout';
import { 
  Users, 
  Building, 
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
  Printer
} from 'lucide-react';
import { 
  studentAPI, 
  complaintAPI, 
  leaveAPI, 
  visitorAPI, 
  noticeAPI, 
  feeAPI, 
  messAPI 
} from '../../services/api';
import socket from '../../services/socket';
import Toast from '../../components/Toast';
import DigitalGatePassModal from '../../components/DigitalGatePassModal';

export default function AdminDashboard({ defaultPanel = 'overview' }) {
  const [activeTab, setActiveTab] = useState(defaultPanel);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModal, setActiveModal] = useState(null); // 'notice' | 'qrpass' | null
  const [selectedPass, setSelectedPass] = useState(null);

  // Toast Notification State
  const [toast, setToast] = useState({ message: '', type: 'info' });
  const showToast = (message, type = 'success') => setToast({ message, type });

  // Data States with Complete Default Fallbacks
  const [students, setStudents] = useState([
    { id: 1, name: 'Ayush', rollNo: '25ASETCSE019', dept: 'CSE', block: 'Block B', room: '204', phone: '+91 9876543210', status: 'Active' },
    { id: 2, name: 'Priya Verma', rollNo: '2026BECE045', dept: 'ECE', block: 'Block C', room: '108', phone: '+91 9876543211', status: 'Active' },
    { id: 3, name: 'Ankit Kumar', rollNo: '2026BME112', dept: 'ME', block: 'Block A', room: '302', phone: '+91 9876543212', status: 'Active' },
    { id: 4, name: 'Sneha Gupta', rollNo: '2026BCSE201', dept: 'CSE', block: 'Block C', room: '215', phone: '+91 9876543213', status: 'Active' },
  ]);

  const [complaints, setComplaints] = useState([
    { id: 'CMP-2026-104', student: 'Ayush', room: '204', category: 'Air Conditioner', priority: 'High', date: '06 Sep 2026', status: 'In Progress' },
    { id: 'CMP-2026-105', student: 'Ankit Kumar', room: '302', category: 'Plumbing', priority: 'Medium', date: '07 Sep 2026', status: 'Pending Review' },
    { id: 'CMP-2026-089', student: 'Priya Verma', room: '108', category: 'Wi-Fi Network', priority: 'Low', date: '28 Aug 2026', status: 'Resolved' },
  ]);

  const [leaves, setLeaves] = useState([
    { id: 'LV-2026-042', student: 'Ayush', rollNo: '25ASETCSE019', reason: 'Weekend Home Visit', dates: '12 Sep - 14 Sep 2026', parent: '+91 9876543210', status: 'Pending Warden Approval', gatePassCode: 'PASS-SUA-2026-904' },
    { id: 'LV-2026-040', student: 'Priya Verma', rollNo: '2026BECE045', reason: 'Family Function', dates: '10 Sep - 12 Sep 2026', parent: '+91 9876543211', status: 'Approved', gatePassCode: 'PASS-SUA-2026-812' },
  ]);

  const [visitors, setVisitors] = useState([
    { id: 'VIS-901', name: 'Ramesh Sharma (Father)', student: 'Ayush (Room 204)', entry: '02:30 PM', exit: '04:15 PM', status: 'Exited' },
    { id: 'VIS-902', name: 'Sunita Verma (Mother)', student: 'Priya Verma (Room 108)', entry: '05:00 PM', exit: 'On Premises', status: 'Inside Campus' },
  ]);

  const [notices, setNotices] = useState([
    { id: 1, title: 'Mandatory Night Biometric Attendance', audience: 'All Hostel Residents', date: 'Today', author: 'Chief Warden' },
    { id: 2, title: 'Annual Block C AC Maintenance Inspection', audience: 'Girls Hostel Block C', date: '10 Sep 2026', author: 'Estate Maintenance' },
  ]);

  const [messFeedbacks, setMessFeedbacks] = useState([
    { _id: 'fb-1', studentName: 'Ayush', mealType: 'Dinner', rating: 5, comment: 'Paneer butter masala and gulab jamun were delicious tonight!', date: 'Today' },
    { _id: 'fb-2', studentName: 'Priya Verma', mealType: 'Lunch', rating: 4, comment: 'Rajma rice was very good, please keep curd cold.', date: 'Today' },
    { _id: 'fb-3', studentName: 'Ankit Kumar', mealType: 'Breakfast', rating: 4, comment: 'Aloo parathas were crispy and fresh.', date: 'Yesterday' }
  ]);

  const [newNoticeTitle, setNewNoticeTitle] = useState('');
  const [newNoticeContent, setNewNoticeContent] = useState('');
  const [newNoticeAudience, setNewNoticeAudience] = useState('All Hostel Residents');

  // Load Data from Live Express API on Mount
  useEffect(() => {
    studentAPI.getAll()
      .then(res => {
        if (res?.data && Array.isArray(res.data) && res.data.length > 0) {
          const formatted = res.data.map((s, idx) => ({
            id: s._id || idx + 1,
            name: s.user?.name || s.name || 'Student',
            rollNo: s.rollNumber || '25ASETCSE019',
            dept: s.department || 'CSE',
            block: s.hostel?.name || 'Block B',
            room: s.room?.roomNumber || '204',
            phone: s.phone || '+91 9876543210',
            status: 'Active'
          }));
          setStudents(formatted);
        }
      })
      .catch(() => {});

    complaintAPI.getAll()
      .then(res => {
        if (res?.data && Array.isArray(res.data) && res.data.length > 0) {
          const formatted = res.data.map(c => ({
            id: c.id || c._id,
            student: c.student?.user?.name || c.student?.name || 'Ayush',
            room: c.student?.room?.roomNumber || c.roomNumber || '204',
            category: c.category || 'General',
            priority: c.priority || 'Medium',
            date: c.date || 'Today',
            status: c.status === 'resolved' || c.status === 'Resolved' ? 'Resolved' : 'In Progress'
          }));
          setComplaints(formatted);
        }
      })
      .catch(() => {});

    leaveAPI.getAll()
      .then(res => {
        if (res?.data && Array.isArray(res.data) && res.data.length > 0) {
          const formatted = res.data.map(l => ({
            id: l.id || l._id,
            student: l.student?.user?.name || l.student?.name || 'Ayush',
            rollNo: l.student?.rollNumber || '25ASETCSE019',
            reason: l.reason,
            dates: l.dates || `${new Date(l.startDate).toLocaleDateString()} - ${new Date(l.endDate).toLocaleDateString()}`,
            parent: l.parentContact || '+91 9876543210',
            status: l.status === 'approved' || l.status === 'Approved' ? 'Approved' : 'Pending Warden Approval',
            gatePassCode: l.gatePassCode || `PASS-SUA-2026-${Math.floor(100 + Math.random() * 900)}`
          }));
          setLeaves(formatted);
        }
      })
      .catch(() => {});

    visitorAPI.getAll()
      .then(res => {
        if (res?.data && Array.isArray(res.data) && res.data.length > 0) {
          setVisitors(res.data);
        }
      })
      .catch(() => {});

    noticeAPI.getActive()
      .then(res => {
        if (res?.data && Array.isArray(res.data) && res.data.length > 0) {
          setNotices(res.data);
        }
      })
      .catch(() => {});

    messAPI.getFeedback()
      .then(res => {
        if (res?.data?.feedbacks && res.data.feedbacks.length > 0) {
          setMessFeedbacks(res.data.feedbacks);
        }
      })
      .catch(() => {});
  }, []);

  // Listen to Real-Time Socket.IO WebSocket Events
  useEffect(() => {
    if (!socket) return;

    socket.on('complaint:created', (newCmp) => {
      showToast(`⚡ New Maintenance Ticket Logged: ${newCmp.category} (${newCmp.student?.name || 'Student'})`, 'info');
      setComplaints(prev => [{
        id: newCmp.id || newCmp._id,
        student: newCmp.student?.name || 'Ayush',
        room: newCmp.student?.room || '204',
        category: newCmp.category,
        priority: newCmp.priority,
        date: 'Just Now',
        status: 'In Progress'
      }, ...prev]);
    });

    socket.on('leave:applied', (newL) => {
      showToast(`📝 New Gate Pass Request: ${newL.student?.name || 'Ayush'} (${newL.reason})`, 'info');
      setLeaves(prev => [{
        id: newL.id || newL._id,
        student: newL.student?.name || 'Ayush',
        rollNo: newL.student?.rollNumber || '25ASETCSE019',
        reason: newL.reason,
        dates: newL.dates || 'Upcoming Weekend',
        parent: newL.parentContact || '+91 9876543210',
        status: 'Pending Warden Approval',
        gatePassCode: `PASS-SUA-2026-${Math.floor(100 + Math.random() * 900)}`
      }, ...prev]);
    });

    socket.on('payment:success', (pay) => {
      showToast(`💳 Fee Collection Alert: ₹${pay.amount} received from ${pay.studentName || 'Student'}`, 'success');
    });

    socket.on('feedback:submitted', (fb) => {
      showToast(`⭐ New Dining Review (${fb.rating}★): "${fb.comment}"`, 'info');
      setMessFeedbacks(prev => [fb, ...prev]);
    });

    return () => {
      socket.off('complaint:created');
      socket.off('leave:applied');
      socket.off('payment:success');
      socket.off('feedback:submitted');
    };
  }, []);

  // Actions Handlers
  const handleCreateNotice = async (e) => {
    e.preventDefault();
    if (!newNoticeTitle) return;
    try {
      const res = await noticeAPI.create({
        title: newNoticeTitle,
        content: newNoticeContent || newNoticeTitle,
        targetAudience: newNoticeAudience,
        category: 'general'
      });
      const item = res?.data || {
        id: notices.length + 1,
        title: newNoticeTitle,
        audience: newNoticeAudience,
        date: 'Just Now',
        author: 'Chief Warden'
      };
      setNotices([item, ...notices]);
      showToast('Warden Announcement broadcasted to all residents!', 'success');
    } catch {
      const item = {
        id: notices.length + 1,
        title: newNoticeTitle,
        audience: newNoticeAudience,
        date: 'Just Now',
        author: 'Chief Warden'
      };
      setNotices([item, ...notices]);
      showToast('Warden Announcement broadcasted (Local Mode)!', 'success');
    }
    setNewNoticeTitle('');
    setNewNoticeContent('');
    setActiveModal(null);
  };

  const handleApproveLeave = async (id) => {
    try {
      const res = await leaveAPI.review(id, { status: 'approved', reviewComments: 'Approved by Warden' });
      const passCode = res?.data?.gatePassCode || `PASS-SUA-2026-${Math.floor(100 + Math.random() * 900)}`;
      setLeaves(leaves.map(l => (l.id === id || l._id === id) ? { ...l, status: 'Approved', gatePassCode: passCode } : l));
      showToast(`Gate Pass #${passCode} Authorized! QR Security Token Generated.`, 'success');
    } catch {
      const passCode = `PASS-SUA-2026-${Math.floor(100 + Math.random() * 900)}`;
      setLeaves(leaves.map(l => (l.id === id || l._id === id) ? { ...l, status: 'Approved', gatePassCode: passCode } : l));
      showToast(`Gate Pass Authorized! QR Token Generated (Local Mode).`, 'success');
    }
  };

  const handleResolveComplaint = async (id) => {
    try {
      await complaintAPI.updateStatus(id, { status: 'resolved', resolutionNotes: 'Resolved by estate maintenance' });
      setComplaints(complaints.map(c => (c.id === id || c._id === id) ? { ...c, status: 'Resolved' } : c));
      showToast(`Maintenance Complaint #${id} marked as RESOLVED!`, 'success');
    } catch {
      setComplaints(complaints.map(c => (c.id === id || c._id === id) ? { ...c, status: 'Resolved' } : c));
      showToast(`Complaint marked Resolved (Local Mode)!`, 'success');
    }
  };

  const openQrPass = (leave) => {
    setSelectedPass({
      id: leave.gatePassCode || leave.id || 'PASS-SUA-2026',
      studentName: leave.student || 'Ayush',
      rollNumber: leave.rollNo || '25ASETCSE019',
      hostel: 'Boys Hostel (Block B)',
      room: '204',
      dates: leave.dates || '12 Sep - 14 Sep 2026',
      reason: leave.reason || 'Home Visit',
      status: 'APPROVED',
      qrPayload: JSON.stringify({
        token: leave.gatePassCode || leave.id || 'PASS-SUA-2026',
        name: leave.student || 'Ayush',
        status: 'VERIFIED_GATE_PASS'
      })
    });
    setActiveModal('qrpass');
  };

  return (
    <MainLayout userRole="Lead Warden">
      
      {/* Toast Notification Popup */}
      <Toast message={toast.message} type={toast.type} onClose={() => setToast({ message: '', type: 'info' })} />

      <div className="space-y-6">

        {/* Header & Navigation Switcher */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm transition-colors">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse"></span>
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white capitalize">
                {activeTab === 'overview' ? 'Administration Command Center' : `${activeTab} Management Panel`}
              </h2>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-medium">
              Sharda University Agra Hostel Control & Verification Desk
            </p>
          </div>

          {/* Quick Panel Filter Tabs */}
          <div className="flex flex-wrap gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-extrabold">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'students', label: 'Students' },
              { id: 'hostels', label: 'Hostels' },
              { id: 'rooms', label: 'Rooms' },
              { id: 'fees', label: 'Fees' },
              { id: 'complaints', label: 'Complaints' },
              { id: 'leave', label: 'Leaves (QR)' },
              { id: 'visitors', label: 'Visitors' },
              { id: 'notices', label: 'Notices' },
              { id: 'mess', label: 'Mess Feedback' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* ---------------- 1. OVERVIEW PANEL ---------------- */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* 4 Key Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                { title: 'Total Resident Students', val: `${students.length} Registered`, sub: '1250 Total Capacity', icon: Users, color: 'bg-blue-600' },
                { title: 'Hostel Blocks Managed', val: '4 Wings', sub: 'Block A, B, C, D', icon: Building, color: 'bg-indigo-600' },
                { title: 'Room Occupancy Rate', val: '88.4%', sub: '352 / 400 Beds Filled', icon: DoorOpen, color: 'bg-emerald-600' },
                { title: 'Active Complaints', val: complaints.filter(c => c.status !== 'Resolved').length.toString(), sub: 'Requires Warden Action', icon: AlertCircle, color: 'bg-amber-600' },
              ].map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <div key={i} className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-start space-x-4">
                    <div className={`${stat.color} p-3 rounded-xl text-white shadow-md shadow-blue-600/20`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">{stat.title}</p>
                      <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-0.5">{stat.val}</h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">{stat.sub}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Block Occupancy Summary & Realtime Operations */}
            <div className="grid lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
                <div className="flex justify-between items-center pb-2 border-b border-slate-100 dark:border-slate-800">
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white">Hostel Block Occupancy Summary</h3>
                  <button onClick={() => setActiveTab('hostels')} className="text-xs font-extrabold text-blue-600 dark:text-blue-400 hover:underline">
                    View All Blocks &rarr;
                  </button>
                </div>

                <div className="space-y-4">
                  {[
                    { block: 'Block A (Junior Boys Hostel)', occ: '92%', count: '110 / 120 Beds', color: 'bg-blue-600' },
                    { block: 'Block B (Senior Boys Hostel)', occ: '85%', count: '102 / 120 Beds', color: 'bg-indigo-600' },
                    { block: 'Block C (Girls Main Wing)', occ: '88%', count: '140 / 160 Beds', color: 'bg-emerald-600' },
                    { block: 'Block D (PG & Deluxe Wing)', occ: '75%', count: '30 / 40 Beds', color: 'bg-amber-600' },
                  ].map((b, idx) => (
                    <div key={idx} className="space-y-1.5">
                      <div className="flex justify-between text-xs font-bold text-slate-800 dark:text-slate-200">
                        <span>{b.block}</span>
                        <span className="font-mono">{b.occ} ({b.count})</span>
                      </div>
                      <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2.5 overflow-hidden">
                        <div className={`${b.color} h-full rounded-full`} style={{ width: b.occ }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Realtime Operations Feed */}
              <div className="lg:col-span-5 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
                <div className="flex justify-between items-center pb-2 border-b border-slate-100 dark:border-slate-800">
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white">Realtime Operations Log</h3>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                </div>

                <div className="space-y-3.5 text-xs">
                  <div className="flex items-start space-x-3 p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-800">
                    <Clock className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-slate-800 dark:text-slate-200">Ayush applied for Outstation Gate Pass.</p>
                      <span className="text-[10px] text-slate-400">Live Socket Sync Active</span>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-800">
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-slate-800 dark:text-slate-200">Razorpay Fee Payment (₹45,000) verified automatically.</p>
                      <span className="text-[10px] text-slate-400">Term 2 Settled</span>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-800">
                    <UserCheck className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-slate-800 dark:text-slate-200">Visitor Ramesh Sharma logged at Campus Gate 2.</p>
                      <span className="text-[10px] text-slate-400">Security Biometric Registry</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ---------------- 2. STUDENT DIRECTORY PANEL ---------------- */}
        {(activeTab === 'students' || activeTab === 'allocations') && (
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden space-y-4 p-5">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input 
                  type="text"
                  placeholder="Search by Roll No, Name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:ring-2 focus:ring-blue-600 outline-none dark:text-white"
                />
              </div>

              <div className="flex space-x-2">
                <button 
                  onClick={() => {
                    const csvContent = "data:text/csv;charset=utf-8,Roll Number,Name,Department,Wing,Room\n" + 
                      students.map(s => `${s.rollNo},${s.name},${s.dept},${s.block},${s.room}`).join("\n");
                    const encodedUri = encodeURI(csvContent);
                    const link = document.createElement("a");
                    link.setAttribute("href", encodedUri);
                    link.setAttribute("download", "student_directory_sharda.csv");
                    document.body.appendChild(link);
                    link.click();
                    showToast('Student Directory CSV exported successfully!', 'success');
                  }}
                  className="px-3.5 py-2 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 dark:text-slate-200"
                >
                  <Download className="w-3.5 h-3.5" /> Export CSV List
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600 dark:text-slate-300">
                <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-extrabold uppercase text-[10px] tracking-wider border-b border-slate-200 dark:border-slate-700">
                  <tr>
                    <th className="p-3.5">Roll Number</th>
                    <th className="p-3.5">Student Name</th>
                    <th className="p-3.5">Department</th>
                    <th className="p-3.5">Allocated Wing</th>
                    <th className="p-3.5">Room No</th>
                    <th className="p-3.5">Guardian Contact</th>
                    <th className="p-3.5">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {students
                    .filter(s => (s.name || '').toLowerCase().includes(searchQuery.toLowerCase()) || (s.rollNo || '').toLowerCase().includes(searchQuery.toLowerCase()))
                    .map((s) => (
                      <tr key={s.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                        <td className="p-3.5 font-mono font-bold text-blue-600 dark:text-blue-400">{s.rollNo}</td>
                        <td className="p-3.5 font-bold text-slate-900 dark:text-white">{s.name}</td>
                        <td className="p-3.5 font-medium">{s.dept}</td>
                        <td className="p-3.5 font-medium">{s.block}</td>
                        <td className="p-3.5 font-bold text-indigo-600 dark:text-indigo-400">Room {s.room}</td>
                        <td className="p-3.5 font-mono text-slate-500">{s.phone}</td>
                        <td className="p-3.5">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300">
                            {s.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ---------------- 3. HOSTELS & ROOMS PANEL ---------------- */}
        {(activeTab === 'hostels' || activeTab === 'rooms') && (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { code: 'Block A', name: 'Boys Junior Hostel', warden: 'Dr. S. K. Mishra', capacity: '120 Beds', occ: '110 Occupied', status: 'Full' },
              { code: 'Block B', name: 'Boys Senior Hostel', warden: 'Prof. Virendra Verma', capacity: '120 Beds', occ: '102 Occupied', status: 'Available' },
              { code: 'Block C', name: 'Girls Main Hostel', warden: 'Dr. Sunita Sen', capacity: '160 Beds', occ: '140 Occupied', status: 'Available' },
              { code: 'Block D', name: 'PG & International Wing', warden: 'Dr. R. K. Sharma', capacity: '40 Beds', occ: '30 Occupied', status: 'Available' },
            ].map((h, i) => (
              <div key={i} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2.5 py-1 rounded-lg">
                    {h.code}
                  </span>
                  <span className="text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 px-2 py-0.5 rounded">
                    ● {h.status}
                  </span>
                </div>
                <h3 className="font-extrabold text-slate-900 dark:text-white text-base">{h.name}</h3>
                <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                  <p><span className="text-slate-400">Chief Warden:</span> {h.warden}</p>
                  <p><span className="text-slate-400">Total Capacity:</span> {h.capacity}</p>
                  <p><span className="text-slate-400">Current Occupancy:</span> {h.occ}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ---------------- 4. FEE MANAGEMENT PANEL ---------------- */}
        {activeTab === 'fees' && (
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base">Hostel Term Fee Management & Ledger</h3>
                <p className="text-xs text-slate-500 font-medium">Academic Term 2026-27 Fee Collections via Razorpay</p>
              </div>
              <span className="text-xs font-mono font-bold bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full">
                Total Collections: ₹1.85 Cr
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600 dark:text-slate-300">
                <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-extrabold uppercase text-[10px] border-b border-slate-200 dark:border-slate-700">
                  <tr>
                    <th className="p-3.5">Student Name</th>
                    <th className="p-3.5">Roll No</th>
                    <th className="p-3.5">Term Fee</th>
                    <th className="p-3.5">Amount Paid</th>
                    <th className="p-3.5">Payment Method</th>
                    <th className="p-3.5">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {students.map((s) => (
                    <tr key={s.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                      <td className="p-3.5 font-bold text-slate-900 dark:text-white">{s.name}</td>
                      <td className="p-3.5 font-mono text-blue-600 dark:text-blue-400">{s.rollNo}</td>
                      <td className="p-3.5 font-bold">₹45,000</td>
                      <td className="p-3.5 font-bold text-emerald-600">₹45,000</td>
                      <td className="p-3.5 text-slate-500">Razorpay UPI / Netbanking</td>
                      <td className="p-3.5">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-800">
                          Clear (Paid)
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ---------------- 5. COMPLAINTS TRIAGE PANEL ---------------- */}
        {activeTab === 'complaints' && (
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-slate-900 dark:text-white text-base">Hostel Maintenance Complaints Triage Desk</h3>
              <span className="text-xs font-bold text-amber-600 bg-amber-50 dark:bg-amber-950 px-2.5 py-1 rounded-lg">
                {complaints.filter(c => c.status !== 'Resolved').length} Tickets Awaiting Action
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600 dark:text-slate-300">
                <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-extrabold uppercase text-[10px] border-b border-slate-200 dark:border-slate-700">
                  <tr>
                    <th className="p-3.5">Ticket ID</th>
                    <th className="p-3.5">Student & Room</th>
                    <th className="p-3.5">Category</th>
                    <th className="p-3.5">Priority</th>
                    <th className="p-3.5">Logged Date</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {complaints.map((c, idx) => (
                    <tr key={c.id || idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                      <td className="p-3.5 font-mono font-bold text-blue-600 dark:text-blue-400">{c.id}</td>
                      <td className="p-3.5 font-bold text-slate-900 dark:text-white">{c.student} (Room {c.room})</td>
                      <td className="p-3.5 font-medium">{c.category}</td>
                      <td className="p-3.5">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${
                          c.priority === 'High' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                        }`}>
                          {c.priority}
                        </span>
                      </td>
                      <td className="p-3.5 text-slate-400">{c.date}</td>
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
                            className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-[10px] transition-colors shadow-sm"
                          >
                            Mark Resolved
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

        {/* ---------------- 6. LEAVE APPROVALS PANEL (WITH QR GATE PASSES) ---------------- */}
        {activeTab === 'leave' && (
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-slate-900 dark:text-white text-base">Outstation Gate Pass Approvals & QR Security Desk</h3>
              <span className="text-xs font-bold text-blue-600 bg-blue-50 dark:bg-blue-950 px-2.5 py-1 rounded-lg">
                Automated QR Code Verification
              </span>
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
                    <th className="p-3.5">Warden Decision</th>
                    <th className="p-3.5">QR Pass</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {leaves.map((l, idx) => {
                    const isApproved = l.status === 'Approved' || l.status === 'approved';
                    return (
                      <tr key={l.id || idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                        <td className="p-3.5 font-mono font-bold text-blue-600">{l.id}</td>
                        <td className="p-3.5 font-bold text-slate-900 dark:text-white">{l.student}</td>
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
                              onClick={() => handleApproveLeave(l.id)}
                              className="px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-[10px] transition-colors shadow-sm"
                            >
                              Approve Pass
                            </button>
                          ) : (
                            <span className="text-emerald-600 text-[11px] font-bold">Authorized</span>
                          )}
                        </td>
                        <td className="p-3.5">
                          {isApproved && (
                            <button
                              onClick={() => openQrPass(l)}
                              className="px-2.5 py-1 bg-slate-900 dark:bg-slate-800 hover:bg-blue-600 text-white rounded-lg font-bold text-[10px] flex items-center gap-1 transition-colors"
                            >
                              <QrCode className="w-3.5 h-3.5 text-amber-300" /> View QR
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

        {/* ---------------- 7. VISITOR REGISTRY PANEL ---------------- */}
        {activeTab === 'visitors' && (
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-slate-900 dark:text-white text-base">Campus Gate Visitor Registry</h3>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg">
                Biometric Gate 2 Logging Active
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600 dark:text-slate-300">
                <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-extrabold uppercase text-[10px] border-b border-slate-200 dark:border-slate-700">
                  <tr>
                    <th className="p-3.5">Visitor ID</th>
                    <th className="p-3.5">Visitor Name & Relation</th>
                    <th className="p-3.5">Student to Visit</th>
                    <th className="p-3.5">Entry Time</th>
                    <th className="p-3.5">Exit Time</th>
                    <th className="p-3.5">Campus Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {visitors.map((v, idx) => (
                    <tr key={v.id || idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                      <td className="p-3.5 font-mono font-bold text-blue-600 dark:text-blue-400">{v.id}</td>
                      <td className="p-3.5 font-bold text-slate-900 dark:text-white">{v.name}</td>
                      <td className="p-3.5 font-medium">{v.student}</td>
                      <td className="p-3.5 text-slate-400">{v.entry}</td>
                      <td className="p-3.5 text-slate-400">{v.exit}</td>
                      <td className="p-3.5">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
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

        {/* ---------------- 8. NOTICE BOARD PANEL ---------------- */}
        {activeTab === 'notices' && (
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-slate-900 dark:text-white text-base">Hostel Bulletin & Warden Announcements</h3>
              <button 
                onClick={() => setActiveModal('notice')}
                className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition-colors flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" /> Post Announcement
              </button>
            </div>

            <div className="space-y-3">
              {notices.map((n, idx) => (
                <div key={n.id || idx} className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/80 dark:border-slate-800 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 rounded">
                      {n.audience || n.targetAudience || 'All Residents'}
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">{n.date || 'Today'}</span>
                  </div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">{n.title}</h4>
                  <p className="text-slate-600 dark:text-slate-300 text-xs">{n.content}</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Issued by: {n.author || 'Chief Warden'}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ---------------- 9. MESS FOOD FEEDBACK & DINING INSPECTION PANEL ---------------- */}
        {activeTab === 'mess' && (
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base">Dining Hall & Mess Committee Quality Inspector</h3>
                <p className="text-xs text-slate-500 font-medium">Daily student food reviews & meal satisfaction metrics</p>
              </div>
              <div className="flex items-center gap-2 bg-amber-50 dark:bg-amber-950 px-3 py-1.5 rounded-xl border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300 text-xs font-bold">
                <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                <span>4.6 / 5.0 Average Quality Score</span>
              </div>
            </div>

            <div className="space-y-3">
              {messFeedbacks.map((f, idx) => (
                <div key={f._id || idx} className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/80 dark:border-slate-800 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-slate-900 dark:text-white text-xs">{f.studentName || 'Ayush'}</span>
                      <span className="text-[10px] bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-bold px-2 py-0.5 rounded">
                        {f.mealType}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-3.5 h-3.5 ${
                            i < f.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300 dark:text-slate-600'
                          }`} 
                        />
                      ))}
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-300 ml-1">
                        {f.rating}/5
                      </span>
                    </div>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 text-xs font-medium">"{f.comment}"</p>
                  <p className="text-[10px] text-slate-400">Date: {f.date || 'Today'}</p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

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
                  placeholder="e.g. Hostel Inspection Schedule"
                  value={newNoticeTitle}
                  onChange={(e) => setNewNoticeTitle(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none font-medium dark:text-white"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Announcement Content</label>
                <textarea 
                  rows={3}
                  required
                  placeholder="Detailed guidelines for students..."
                  value={newNoticeContent}
                  onChange={(e) => setNewNoticeContent(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none font-medium dark:text-white"
                ></textarea>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Target Audience</label>
                <select 
                  value={newNoticeAudience}
                  onChange={(e) => setNewNoticeAudience(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none font-medium dark:text-white"
                >
                  <option value="All Hostel Residents">All Hostel Residents</option>
                  <option value="Boys Hostel (Block A & B)">Boys Hostel (Block A & B)</option>
                  <option value="Girls Hostel (Block C)">Girls Hostel (Block C)</option>
                  <option value="PG Wing (Block D)">PG Wing (Block D)</option>
                </select>
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button 
                  type="button" 
                  onClick={() => setActiveModal(null)} 
                  className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-600 dark:text-slate-300 font-bold hover:bg-slate-50 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-md flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" /> Broadcast Notice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* QR Digital Pass Modal for Admin/Warden inspection */}
      {activeModal === 'qrpass' && (
        <DigitalGatePassModal 
          passData={selectedPass}
          onClose={() => setActiveModal(null)}
        />
      )}

    </MainLayout>
  );
}
