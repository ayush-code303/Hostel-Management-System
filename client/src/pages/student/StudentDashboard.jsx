import React, { useState } from 'react';
import { 
  User, 
  DoorOpen, 
  CreditCard, 
  CalendarCheck, 
  AlertCircle, 
  Clock, 
  FileText, 
  CheckCircle2, 
  Plus, 
  Bell, 
  Utensils, 
  LogOut, 
  ShieldCheck, 
  X,
  Send,
  Download,
  Printer
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { ThemeToggleButton } from '../../context/ThemeContext';
import shardaLogo from '../../assets/sharda_logo.png';

export default function StudentDashboard() {
  const [activeModal, setActiveModal] = useState(null); // 'complaint' | 'leave' | 'mess' | 'receipt' | null
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'complaints' | 'leaves'

  const [complaintForm, setComplaintForm] = useState({ category: 'Electrical', roomNumber: '204', description: '', priority: 'Medium' });
  const [leaveForm, setLeaveForm] = useState({ reason: 'Outstation Home Visit', startDate: '2026-09-12', endDate: '2026-09-14', parentContact: '+91 9876543210' });

  const [complaintsList, setComplaintsList] = useState([
    { id: 'CMP-2026-104', category: 'Air Conditioner', date: '06 Sep 2026', status: 'In Progress', priority: 'High', desc: 'Cooling insufficient in Room 204' },
    { id: 'CMP-2026-089', category: 'Plumbing', date: '28 Aug 2026', status: 'Resolved', priority: 'Medium', desc: 'Bathroom tap leaking solved by plumber' },
  ]);

  const [leaveList, setLeaveList] = useState([
    { id: 'LV-2026-042', reason: 'Home Visit Weekend', dates: '12 Sep - 14 Sep 2026', status: 'Approved', warden: 'Dr. R. K. Verma' },
    { id: 'LV-2026-015', reason: 'Family Function', dates: '15 Aug - 18 Aug 2026', status: 'Completed', warden: 'Dr. R. K. Verma' },
  ]);

  const handleCreateComplaint = (e) => {
    e.preventDefault();
    const newCmp = {
      id: `CMP-2026-${Math.floor(100 + Math.random() * 900)}`,
      category: complaintForm.category,
      date: 'Just Now',
      status: 'Pending Warden Review',
      priority: complaintForm.priority,
      desc: complaintForm.description || 'Maintenance request submitted.'
    };
    setComplaintsList([newCmp, ...complaintsList]);
    setActiveModal(null);
    setComplaintForm({ category: 'Electrical', roomNumber: '204', description: '', priority: 'Medium' });
  };

  const handleCreateLeave = (e) => {
    e.preventDefault();
    const newL = {
      id: `LV-2026-${Math.floor(100 + Math.random() * 900)}`,
      reason: leaveForm.reason,
      dates: `${leaveForm.startDate} to ${leaveForm.endDate}`,
      status: 'Approved',
      warden: 'Dr. R. K. Verma'
    };
    setLeaveList([newL, ...leaveList]);
    setActiveModal(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col font-sans transition-colors duration-300">
      
      {/* Student Navbar with Circular Logo */}
      <header className="bg-white dark:bg-slate-900 border-b border-blue-100 dark:border-slate-800 sticky top-0 z-30 shadow-sm transition-colors">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          
          <div className="flex items-center space-x-3">
            <Link to="/" className="w-10 h-10 rounded-full overflow-hidden bg-blue-600 p-0.5 shadow-md shadow-blue-500/20 flex items-center justify-center shrink-0 border-0">
              <img src={shardaLogo} alt="Sharda Logo" className="w-full h-full object-cover rounded-full" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-extrabold text-slate-900 dark:text-white leading-none">Student Residence Portal</h1>
                <span className="text-[10px] bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-extrabold px-1.5 py-0.5 rounded border-0">
                  ● Verified
                </span>
              </div>
              <p className="text-xs text-blue-600 dark:text-blue-400 font-bold uppercase mt-0.5">Sharda University Agra</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <ThemeToggleButton />

            <button className="relative p-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-600 rounded-full animate-ping"></span>
            </button>

            <div className="flex items-center space-x-3 pl-3 border-l border-slate-200 dark:border-slate-800">
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80" 
                alt="Ayush Avatar"
                className="w-9 h-9 rounded-full object-cover border-2 border-blue-600 shadow-sm"
              />
              <div className="hidden md:block text-left text-xs">
                <p className="font-extrabold text-slate-900 dark:text-white leading-tight">Ayush</p>
                <p className="text-slate-500 dark:text-slate-400 font-mono text-[11px]">25ASETCSE019</p>
              </div>
              <Link to="/login" className="p-2 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 rounded-xl transition-colors" title="Logout">
                <LogOut className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>
      </header>

      {/* Main Content Area */}
      <main className="container mx-auto px-4 py-6 flex-1 space-y-6">

        {/* Welcome Profile Banner - Royal Blue Gradient */}
        <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-950 text-white rounded-3xl p-6 lg:p-8 shadow-xl relative overflow-hidden">
          <div className="absolute right-0 bottom-0 opacity-15 pointer-events-none transform translate-x-12 translate-y-12">
            <img src={shardaLogo} alt="Sharda Logo Watermark" className="w-96 h-96 object-contain" />
          </div>

          <div className="relative z-10 grid md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-8 space-y-3">
              <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-blue-100 border border-white/20">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
                <span>Verified Scholar • Semester 5 (2026-27)</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                Welcome back, Ayush! 👋
              </h2>
              <p className="text-blue-100 text-xs sm:text-sm font-normal">
                Computer Science & Engineering | Block B Senior Boys Wing | Room 204
              </p>

              <div className="pt-2 flex flex-wrap gap-2 text-xs">
                <button 
                  onClick={() => setActiveModal('complaint')}
                  className="px-4 py-2 rounded-xl bg-white text-blue-800 font-extrabold hover:bg-blue-50 shadow-md transition-all flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4 text-blue-600" /> Lodge Room Complaint
                </button>
                <button 
                  onClick={() => setActiveModal('leave')}
                  className="px-4 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-white font-extrabold backdrop-blur border border-white/20 transition-all flex items-center gap-1.5"
                >
                  <FileText className="w-4 h-4 text-amber-300" /> Apply Gate Pass
                </button>
              </div>
            </div>

            <div className="md:col-span-4 bg-slate-950/70 backdrop-blur-md p-5 rounded-2xl border border-white/15 text-xs space-y-2.5">
              <div className="flex justify-between items-center text-slate-200">
                <span className="text-slate-400 font-medium">Hostel Wing:</span>
                <span className="font-bold text-white">Boys Block B</span>
              </div>
              <div className="flex justify-between items-center text-slate-200">
                <span className="text-slate-400 font-medium">Allocated Room:</span>
                <span className="font-bold text-cyan-300 bg-blue-500/20 px-2 py-0.5 rounded border border-blue-400/30">
                  Room 204 (Bed 2)
                </span>
              </div>
              <div className="flex justify-between items-center text-slate-200">
                <span className="text-slate-400 font-medium">Chief Warden:</span>
                <span className="font-semibold text-slate-200">Dr. R. K. Verma</span>
              </div>
              <div className="flex justify-between items-center text-slate-200">
                <span className="text-slate-400 font-medium">Emergency Contact:</span>
                <span className="font-mono text-emerald-400">+91 9876543210</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-all space-y-2 group">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">Room Allocation</span>
              <div className="p-2 bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 rounded-xl group-hover:scale-110 transition-transform">
                <DoorOpen className="w-5 h-5" />
              </div>
            </div>
            <p className="text-2xl font-black text-slate-900 dark:text-white">Block B - 204</p>
            <p className="text-xs text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Bed Occupied (Active)
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-all space-y-2 group">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">Term Fee Status</span>
              <div className="p-2 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 rounded-xl group-hover:scale-110 transition-transform">
                <CreditCard className="w-5 h-5" />
              </div>
            </div>
            <p className="text-2xl font-black text-slate-900 dark:text-white">₹45,000 Paid</p>
            <button 
              onClick={() => setActiveModal('receipt')}
              className="text-xs text-blue-600 dark:text-blue-400 font-bold hover:underline flex items-center gap-1"
            >
              <Download className="w-3.5 h-3.5" /> Download Fee Receipt PDF
            </button>
          </div>

          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-all space-y-2 group">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">Night Attendance</span>
              <div className="p-2 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 rounded-xl group-hover:scale-110 transition-transform">
                <CalendarCheck className="w-5 h-5" />
              </div>
            </div>
            <p className="text-2xl font-black text-slate-900 dark:text-white">94.2% Rate</p>
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div className="bg-blue-600 h-full w-[94%] rounded-full"></div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-all space-y-2 group">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">Active Tickets</span>
              <div className="p-2 bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 rounded-xl group-hover:scale-110 transition-transform">
                <AlertCircle className="w-5 h-5" />
              </div>
            </div>
            <p className="text-2xl font-black text-slate-900 dark:text-white">{complaintsList.filter(c => c.status !== 'Resolved').length} Pending</p>
            <p className="text-xs text-amber-600 dark:text-amber-400 font-bold">
              1 Complaint In Resolution
            </p>
          </div>

        </div>

        {/* Tab Switcher & Action Bar */}
        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all ${
                activeTab === 'overview' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              All Modules
            </button>
            <button
              onClick={() => setActiveTab('complaints')}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all ${
                activeTab === 'complaints' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              Complaints ({complaintsList.length})
            </button>
            <button
              onClick={() => setActiveTab('leaves')}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all ${
                activeTab === 'leaves' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              Gate Passes ({leaveList.length})
            </button>
          </div>

          <button 
            onClick={() => setActiveModal('mess')}
            className="px-4 py-2 bg-amber-50 dark:bg-amber-950/60 hover:bg-amber-100 text-amber-800 dark:text-amber-300 font-extrabold text-xs rounded-xl border border-amber-200 dark:border-amber-900/50 transition-colors flex items-center gap-1.5"
          >
            <Utensils className="w-4 h-4 text-amber-600" /> View Mess Menu
          </button>
        </div>

        {/* Content Layout Grid */}
        <div className="grid lg:grid-cols-12 gap-6">

          {/* Left Column (8 cols) */}
          <div className="lg:col-span-8 space-y-6">

            {/* Complaints Management Table */}
            {(activeTab === 'overview' || activeTab === 'complaints') && (
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden">
                <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-950/50">
                  <div className="flex items-center space-x-2">
                    <div className="p-2 bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 rounded-lg">
                      <AlertCircle className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white text-sm">Room Maintenance Complaints</h3>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">Log & track room repair tickets</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setActiveModal('complaint')}
                    className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1 shadow-sm"
                  >
                    <Plus className="w-3.5 h-3.5" /> Lodge Ticket
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-600 dark:text-slate-300">
                    <thead className="bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-extrabold uppercase text-[10px] tracking-wider border-b border-slate-200 dark:border-slate-700">
                      <tr>
                        <th className="p-3.5">Ticket ID</th>
                        <th className="p-3.5">Category</th>
                        <th className="p-3.5">Logged Date</th>
                        <th className="p-3.5">Priority</th>
                        <th className="p-3.5">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      {complaintsList.map((item) => (
                        <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                          <td className="p-3.5 font-mono font-bold text-blue-600 dark:text-blue-400">{item.id}</td>
                          <td className="p-3.5 font-semibold text-slate-900 dark:text-white">{item.category}</td>
                          <td className="p-3.5 text-slate-500 font-medium">{item.date}</td>
                          <td className="p-3.5">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${
                              item.priority === 'High' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                            }`}>
                              {item.priority}
                            </span>
                          </td>
                          <td className="p-3.5">
                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold ${
                              item.status === 'Resolved' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800 animate-pulse'
                            }`}>
                              {item.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Outstation Leave Requests Table */}
            {(activeTab === 'overview' || activeTab === 'leaves') && (
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden">
                <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-950/50">
                  <div className="flex items-center space-x-2">
                    <div className="p-2 bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 rounded-lg">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white text-sm">Outstation Leave & Gate Passes</h3>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">Digital warden leave clearance</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setActiveModal('leave')}
                    className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1 shadow-sm"
                  >
                    <Plus className="w-3.5 h-3.5" /> Apply Pass
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-600 dark:text-slate-300">
                    <thead className="bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-extrabold uppercase text-[10px] tracking-wider border-b border-slate-200 dark:border-slate-700">
                      <tr>
                        <th className="p-3.5">Pass ID</th>
                        <th className="p-3.5">Reason</th>
                        <th className="p-3.5">Duration</th>
                        <th className="p-3.5">Approver Warden</th>
                        <th className="p-3.5">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      {leaveList.map((item) => (
                        <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                          <td className="p-3.5 font-mono font-bold text-blue-600 dark:text-blue-400">{item.id}</td>
                          <td className="p-3.5 font-semibold text-slate-900 dark:text-white">{item.reason}</td>
                          <td className="p-3.5 text-slate-500 font-medium">{item.dates}</td>
                          <td className="p-3.5 text-slate-600 dark:text-slate-400 font-medium">{item.warden}</td>
                          <td className="p-3.5">
                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold ${
                              item.status === 'Approved' ? 'bg-emerald-100 text-emerald-800' :
                              item.status === 'Completed' ? 'bg-slate-200 text-slate-700' : 'bg-amber-100 text-amber-800'
                            }`}>
                              {item.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

          </div>

          {/* Right Column (4 cols) */}
          <div className="lg:col-span-4 space-y-6">

            {/* In-app Warden Bulletin */}
            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center space-x-2">
                  <Bell className="w-5 h-5 text-blue-600" />
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm">Warden Announcements</h3>
                </div>
                <span className="text-[10px] bg-blue-100 text-blue-700 font-extrabold px-2 py-0.5 rounded">Live</span>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3.5 bg-blue-50 dark:bg-blue-950/40 rounded-xl border border-blue-200/80 dark:border-blue-900/50 space-y-1">
                  <p className="font-bold text-blue-900 dark:text-blue-300">⚡ Mandatory Night Biometric Roll Call</p>
                  <p className="text-slate-700 dark:text-slate-300 text-[11px] leading-relaxed">All residents of Block B must report for evening attendance at 09:30 PM today.</p>
                  <p className="text-[10px] text-blue-600 font-medium pt-1">Posted by Warden Office • Today 05:00 PM</p>
                </div>

                <div className="p-3.5 bg-amber-50 dark:bg-amber-950/40 rounded-xl border border-amber-200/80 dark:border-amber-900/50 space-y-1">
                  <p className="font-bold text-amber-900 dark:text-amber-300">🍲 Sunday Festival Special Dinner</p>
                  <p className="text-slate-700 dark:text-slate-300 text-[11px] leading-relaxed">Student mess committee has voted for Paneer Butter Masala & Gulab Jamun for Sunday dinner.</p>
                  <p className="text-[10px] text-amber-700 font-medium pt-1">Posted by Mess Committee • Yesterday</p>
                </div>
              </div>
            </div>

            {/* Student Credentials Box */}
            <div className="bg-slate-950 text-slate-100 p-5 rounded-2xl border border-slate-800 shadow-md space-y-4 relative overflow-hidden">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <h3 className="font-bold text-white text-sm">Digital Gate Credentials</h3>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              </div>
              
              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Student Name:</span>
                  <span className="font-bold text-white">Ayush</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Roll Number:</span>
                  <span className="font-mono text-blue-400 font-bold">25ASETCSE019</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Hostel Allocation:</span>
                  <span className="text-emerald-400 font-bold">Block B - 204</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Security Code:</span>
                  <span className="font-mono bg-slate-800 px-2 py-0.5 rounded text-amber-300 font-bold">GP-9982</span>
                </div>
              </div>

              <button 
                onClick={() => setActiveModal('receipt')}
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-md"
              >
                <Download className="w-3.5 h-3.5" /> Download Fee Receipt (PDF)
              </button>
            </div>

          </div>

        </div>

      </main>

      {/* Complaint Modal */}
      {activeModal === 'complaint' && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 max-w-md w-full rounded-3xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800">
            <div className="bg-blue-600 text-white p-4 px-6 flex items-center justify-between">
              <h3 className="font-extrabold text-base flex items-center gap-2">
                <AlertCircle className="w-5 h-5" /> Lodge Maintenance Complaint
              </h3>
              <button onClick={() => setActiveModal(null)} className="p-1 hover:bg-blue-700 rounded-lg text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateComplaint} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Issue Category</label>
                <select 
                  value={complaintForm.category}
                  onChange={(e) => setComplaintForm({ ...complaintForm, category: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none font-medium dark:text-white"
                >
                  <option value="Electrical">Electrical (Fan, Light, Socket)</option>
                  <option value="Plumbing">Plumbing (Tap, Basin, Shower)</option>
                  <option value="Air Conditioner">Air Conditioner / Cooler</option>
                  <option value="Furniture">Furniture (Bed, Study Table, Almirah)</option>
                  <option value="Wi-Fi / Internet">Wi-Fi & LAN Network</option>
                  <option value="Cleaning">Room Cleaning / Hygiene</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Priority Level</label>
                <div className="grid grid-cols-3 gap-2">
                  {['Low', 'Medium', 'High'].map((p) => (
                    <button
                      type="button"
                      key={p}
                      onClick={() => setComplaintForm({ ...complaintForm, priority: p })}
                      className={`py-2 rounded-xl border font-bold text-center transition-all ${
                        complaintForm.priority === p ? 'bg-blue-50 border-blue-600 text-blue-600 shadow-sm' : 'border-slate-200 dark:border-slate-700 text-slate-500'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Description of Issue</label>
                <textarea 
                  rows={3}
                  required
                  placeholder="Describe the issue in room 204..."
                  value={complaintForm.description}
                  onChange={(e) => setComplaintForm({ ...complaintForm, description: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none font-medium dark:text-white"
                ></textarea>
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
                  <Send className="w-3.5 h-3.5" /> Submit Ticket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Outstation Leave Pass Modal */}
      {activeModal === 'leave' && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 max-w-md w-full rounded-3xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800">
            <div className="bg-blue-600 text-white p-4 px-6 flex items-center justify-between">
              <h3 className="font-extrabold text-base flex items-center gap-2">
                <Clock className="w-5 h-5" /> Apply Outstation Leave Pass
              </h3>
              <button onClick={() => setActiveModal(null)} className="p-1 hover:bg-blue-700 rounded-lg text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateLeave} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Reason for Leave</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Home Visit Weekend"
                  value={leaveForm.reason}
                  onChange={(e) => setLeaveForm({ ...leaveForm, reason: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none font-medium dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Departure Date</label>
                  <input 
                    type="date" 
                    required
                    value={leaveForm.startDate}
                    onChange={(e) => setLeaveForm({ ...leaveForm, startDate: e.target.value })}
                    className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none font-medium dark:text-white"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Return Date</label>
                  <input 
                    type="date" 
                    required
                    value={leaveForm.endDate}
                    onChange={(e) => setLeaveForm({ ...leaveForm, endDate: e.target.value })}
                    className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none font-medium dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Parent Contact Number</label>
                <input 
                  type="text" 
                  required
                  value={leaveForm.parentContact}
                  onChange={(e) => setLeaveForm({ ...leaveForm, parentContact: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none font-medium dark:text-white"
                />
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
                  <Send className="w-3.5 h-3.5" /> Submit to Warden
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Mess Menu Modal */}
      {activeModal === 'mess' && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 max-w-lg w-full rounded-3xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800">
            <div className="bg-blue-600 text-white p-4 px-6 flex items-center justify-between">
              <h3 className="font-extrabold text-base flex items-center gap-2">
                <Utensils className="w-5 h-5" /> Weekly Mess Menu Schedule
              </h3>
              <button onClick={() => setActiveModal(null)} className="p-1 hover:bg-blue-700 rounded-lg text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
                  <span className="font-bold text-blue-600 dark:text-blue-400 text-xs block mb-1">☕ Breakfast (07:30 - 09:30 AM)</span>
                  <p className="text-slate-600 dark:text-slate-300 text-[11px]">Aloo Paratha, Curd, Butter, Tea / Coffee</p>
                </div>
                <div className="p-3.5 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
                  <span className="font-bold text-blue-600 dark:text-blue-400 text-xs block mb-1">🍛 Lunch (12:30 - 02:30 PM)</span>
                  <p className="text-slate-600 dark:text-slate-300 text-[11px]">Dal Tadka, Mix Veg, Jeera Rice, Chapati, Raita</p>
                </div>
                <div className="p-3.5 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
                  <span className="font-bold text-blue-600 dark:text-blue-400 text-xs block mb-1">🥪 Evening Tea (05:00 - 06:00 PM)</span>
                  <p className="text-slate-600 dark:text-slate-300 text-[11px]">Veg Samosa / Sandwich & Hot Tea</p>
                </div>
                <div className="p-3.5 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
                  <span className="font-bold text-blue-600 dark:text-blue-400 text-xs block mb-1">🍲 Dinner (08:00 - 09:30 PM)</span>
                  <p className="text-slate-600 dark:text-slate-300 text-[11px]">Paneer Butter Masala, Shahi Dal, Rice, Gulab Jamun</p>
                </div>
              </div>

              <div className="pt-2 text-right">
                <button 
                  onClick={() => setActiveModal(null)} 
                  className="px-5 py-2 bg-slate-900 dark:bg-slate-800 text-white rounded-xl font-bold hover:bg-slate-800"
                >
                  Close Menu
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Fee Invoice Receipt Modal */}
      {activeModal === 'receipt' && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 max-w-md w-full rounded-3xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800">
            <div className="bg-blue-600 text-white p-4 px-6 flex items-center justify-between">
              <h3 className="font-extrabold text-base flex items-center gap-2">
                <Printer className="w-5 h-5 text-amber-300" /> Official Fee Receipt
              </h3>
              <button onClick={() => setActiveModal(null)} className="p-1 hover:bg-blue-700 rounded-lg text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <div className="text-center border-b border-slate-200 dark:border-slate-800 pb-3">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-blue-600 p-0.5 mx-auto mb-1 flex items-center justify-center shrink-0 border-0">
                  <img src={shardaLogo} alt="Sharda Logo" className="w-full h-full object-cover rounded-full" />
                </div>
                <h4 className="font-extrabold text-slate-900 dark:text-white text-sm">SHARDA UNIVERSITY AGRA</h4>
                <p className="text-slate-500 text-[11px]">Hostel Term Fee Receipt (2026-27)</p>
                <span className="inline-block mt-2 text-[10px] bg-emerald-100 text-emerald-800 font-extrabold px-3 py-0.5 rounded-full">
                  ✓ Payment Status: SUCCESS (PAID)
                </span>
              </div>

              <div className="space-y-2 text-slate-700 dark:text-slate-300">
                <div className="flex justify-between"><span>Receipt No:</span><span className="font-mono font-bold">REC-2026-99041</span></div>
                <div className="flex justify-between"><span>Student Name:</span><span className="font-bold">Ayush</span></div>
                <div className="flex justify-between"><span>Roll Number:</span><span className="font-mono text-blue-600 dark:text-blue-400">25ASETCSE019</span></div>
                <div className="flex justify-between"><span>Hostel Block & Room:</span><span className="font-bold">Boys Block B - 204</span></div>
                <div className="flex justify-between"><span>Payment Method:</span><span>Online UPI / Netbanking</span></div>
                <div className="flex justify-between border-t border-slate-200 dark:border-slate-800 pt-2 font-bold text-slate-900 dark:text-white text-sm">
                  <span>Total Amount Paid:</span>
                  <span className="text-blue-600 dark:text-blue-400">₹45,000.00</span>
                </div>
              </div>

              <div className="pt-3 flex justify-end space-x-2">
                <button 
                  onClick={() => alert('Printing Hostel Fee Receipt PDF...')}
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold rounded-xl shadow-md flex items-center gap-1.5"
                >
                  <Download className="w-4 h-4" /> Download PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
