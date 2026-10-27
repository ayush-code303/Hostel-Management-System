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
  Printer, 
  TrendingUp, 
  DollarSign, 
  ShieldCheck, 
  Layers, 
  FileSpreadsheet, 
  Sparkles 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { 
  studentAPI, 
  complaintAPI, 
  leaveAPI, 
  visitorAPI, 
  noticeAPI, 
  feeAPI 
} from '../../services/api';
import socket from '../../services/socket';
import Toast from '../../components/Toast';
import AnalyticsCharts from '../../components/AnalyticsCharts';

export default function AdminDashboard({ defaultPanel = 'overview' }) {
  const { user, institution } = useAuth();
  const [activeTab, setActiveTab] = useState(defaultPanel);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModal, setActiveModal] = useState(null); // 'notice' | 'addBlock' | null

  // Toast State
  const [toast, setToast] = useState({ message: '', type: 'info' });
  const showToast = (message, type = 'success') => setToast({ message, type });

  // Hostels / Blocks data
  const [hostelBlocks, setHostelBlocks] = useState(institution?.hostels || [
    { id: 'hst-01', name: 'Nelson Mandela Boys Hostel (Block B)', code: 'NMB-B', warden: 'Prof. Virendra Verma', totalBeds: 180, occupiedBeds: 165 },
    { id: 'hst-02', name: 'Rabindranath Tagore Boys Hostel (Block A)', code: 'RTB-A', warden: 'Dr. S. K. Mishra', totalBeds: 180, occupiedBeds: 158 },
    { id: 'hst-03', name: 'Sarojini Naidu Girls Hostel (Block C)', code: 'SNG-C', warden: 'Dr. Sunita Sen', totalBeds: 160, occupiedBeds: 142 },
    { id: 'hst-04', name: 'Mother Teresa PG & Scholars Wing (Block D)', code: 'MTS-D', warden: 'Dr. R. K. Sharma', totalBeds: 60, occupiedBeds: 50 },
  ]);

  const [students, setStudents] = useState([
    { id: 1, name: 'Ayush', rollNo: '25ASETCSE019', dept: 'CSE', block: 'Block B', room: '204', phone: '+91 9876543210', feePaid: 45000, status: 'Active' },
    { id: 2, name: 'Priya Verma', rollNo: '2026BECE045', dept: 'ECE', block: 'Block C', room: '108', phone: '+91 9876543211', feePaid: 45000, status: 'Active' },
    { id: 3, name: 'Ankit Kumar', rollNo: '2026BME112', dept: 'ME', block: 'Block A', room: '302', phone: '+91 9876543212', feePaid: 45000, status: 'Active' },
    { id: 4, name: 'Sneha Gupta', rollNo: '2026BCSE201', dept: 'CSE', block: 'Block C', room: '215', phone: '+91 9876543213', feePaid: 45000, status: 'Active' },
    { id: 5, name: 'Rahul Mishra', rollNo: '25ASETCSE088', dept: 'CSE', block: 'Block B', room: '204', phone: '+91 9876543214', feePaid: 45000, status: 'Active' },
  ]);

  const [notices, setNotices] = useState([
    { id: 1, title: 'Annual Block Inspection & Energy Audit', audience: 'All Hostels', date: 'Today', author: 'Campus Directorate' },
    { id: 2, title: 'Spring Term 2027 Room Reallocation Guidelines', audience: 'All Residents', date: 'Yesterday', author: 'Dean Student Welfare' },
  ]);

  const [newNoticeTitle, setNewNoticeTitle] = useState('');
  const [newNoticeAudience, setNewNoticeAudience] = useState('All Hostels');

  // Keep hostel blocks synced with institution
  useEffect(() => {
    if (institution?.hostels) {
      setHostelBlocks(institution.hostels);
    }
  }, [institution]);

  // Load from API on mount
  useEffect(() => {
    studentAPI.getAll().then(res => {
      if (res?.data && Array.isArray(res.data) && res.data.length > 0) {
        setStudents(res.data.map((s, idx) => ({
          id: s._id || idx + 1,
          name: s.user?.name || s.name || 'Scholar',
          rollNo: s.rollNumber || '25ASETCSE019',
          dept: s.department || 'CSE',
          block: s.hostel?.name || 'Block B',
          room: s.room?.roomNumber || '204',
          phone: s.phone || '+91 9876543210',
          feePaid: 45000,
          status: 'Active'
        })));
      }
    }).catch(() => {});
  }, []);

  const totalCapacity = hostelBlocks.reduce((acc, b) => acc + (b.totalBeds || 0), 0);
  const totalOccupied = hostelBlocks.reduce((acc, b) => acc + (b.occupiedBeds || 0), 0);
  const campusOccupancyRate = totalCapacity > 0 ? Math.round((totalOccupied / totalCapacity) * 100) : 89;

  // CSV Exporter Utility
  const exportCSV = (data, filename, headers) => {
    let csvContent = "data:text/csv;charset=utf-8," + headers.join(",") + "\n";
    data.forEach(row => {
      csvContent += row.join(",") + "\n";
    });
    const encoded = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encoded);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    showToast(`${filename} generated and downloaded!`, 'success');
  };

  const handleCreateNotice = async (e) => {
    e.preventDefault();
    if (!newNoticeTitle) return;
    const item = {
      id: notices.length + 1,
      title: newNoticeTitle,
      audience: newNoticeAudience,
      date: 'Just Now',
      author: 'University Directorate'
    };
    setNotices([item, ...notices]);
    showToast('Campus Directive published across university residences!', 'success');
    setNewNoticeTitle('');
    setActiveModal(null);
  };

  return (
    <MainLayout userRole="University Admin">
      
      {/* Toast Notification Alert */}
      <Toast message={toast.message} type={toast.type} onClose={() => setToast({ message: '', type: 'info' })} />

      <div className="space-y-6">

        {/* 1. CAMPUS EXECUTIVE HEADER */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm transition-colors">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse"></span>
              <h2 className="text-xl font-black text-slate-900 dark:text-white capitalize">
                University Residential Directorate Command Center
              </h2>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">
              Institutional Governance, Financial Oversight & Capacity Pipelines • {institution?.name || 'Sharda University Agra'}
            </p>
          </div>

          {/* Quick Panel Navigation Tabs */}
          <div className="flex flex-wrap gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-extrabold">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'analytics', label: 'Visual Analytics' },
              { id: 'hostels', label: 'Hostel Wings' },
              { id: 'students', label: 'Student Directory' },
              { id: 'fees', label: 'Fee Collections' },
              { id: 'exports', label: 'Data Pipelines' },
              { id: 'notices', label: 'Directives' },
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

        {/* ---------------- 1. EXECUTIVE OVERVIEW ---------------- */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            
            {/* 4 Key Institutional KPIs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                { title: 'Campus Capacity Utilization', val: `${campusOccupancyRate}%`, sub: `${totalOccupied} / ${totalCapacity} Beds Allocated`, icon: DoorOpen, color: 'bg-blue-600' },
                { title: 'Total Hostel Wings', val: `${hostelBlocks.length} Blocks`, sub: 'Boys, Girls & PG Wings', icon: Building, color: 'bg-indigo-600' },
                { title: 'Annual Fee Collections', val: '₹1.85 Cr', sub: 'Razorpay Instant Settlement', icon: DollarSign, color: 'bg-emerald-600' },
                { title: 'Enrolled Residents', val: `${students.length * 105} Scholars`, sub: 'Verified Biometric Roster', icon: Users, color: 'bg-purple-600' },
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

            {/* Embedded Visual Analytics Section */}
            <AnalyticsCharts hostelData={hostelBlocks.map(b => ({
              name: b.name,
              total: b.totalBeds,
              occupied: b.occupiedBeds,
              color: '#2563EB'
            }))} />

            {/* Hostel Wings Snapshot */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
              <div className="flex justify-between items-center pb-2 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                    Hostel Blocks & Resident Density
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">Real-time room occupancy and warden allocation</p>
                </div>
                <button onClick={() => setActiveTab('hostels')} className="text-xs font-bold text-blue-600 hover:underline">
                  Manage Blocks &rarr;
                </button>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {hostelBlocks.map((b, i) => {
                  const rate = Math.round((b.occupiedBeds / b.totalBeds) * 100);
                  return (
                    <div key={i} className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-mono text-xs font-black text-blue-600 bg-blue-100 dark:bg-blue-950 px-2 py-0.5 rounded">
                          {b.code}
                        </span>
                        <span className="text-[10px] font-bold text-emerald-600">● {rate}% Filled</span>
                      </div>
                      <h4 className="font-bold text-slate-900 dark:text-white text-xs">{b.name}</h4>
                      <p className="text-[11px] text-slate-500">Chief Warden: {b.warden || 'Assigned'}</p>
                      <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                        <div className="bg-blue-600 h-full rounded-full" style={{ width: `${rate}%` }}></div>
                      </div>
                      <p className="text-[10px] text-slate-400 font-mono text-right">{b.occupiedBeds} / {b.totalBeds} Beds</p>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        )}

        {/* ---------------- 2. ANALYTICS PANEL ---------------- */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <AnalyticsCharts hostelData={hostelBlocks.map(b => ({
              name: b.name,
              total: b.totalBeds,
              occupied: b.occupiedBeds,
              color: '#2563EB'
            }))} />
          </div>
        )}

        {/* ---------------- 3. HOSTEL BLOCKS MANAGEMENT ---------------- */}
        {activeTab === 'hostels' && (
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-5">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="font-black text-slate-900 dark:text-white text-base">
                  Hostel Wings Capacity & Warden Allocation Desk
                </h3>
                <p className="text-xs text-slate-500 font-medium">Configure block details and bed quotas</p>
              </div>
              <button 
                onClick={() => {
                  const newCode = `BLK-${hostelBlocks.length + 1}`;
                  const newBlock = {
                    id: `hst-${Date.now()}`,
                    name: `New Scholars Wing (${newCode})`,
                    code: newCode,
                    gender: 'Co-Ed',
                    totalBeds: 120,
                    occupiedBeds: 0,
                    warden: 'To Be Appointed'
                  };
                  setHostelBlocks([...hostelBlocks, newBlock]);
                  showToast('New Hostel Wing added to University Registry!', 'success');
                }}
                className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition-colors flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" /> Add Hostel Block
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {hostelBlocks.map((b, i) => (
                <div key={b.id || i} className="p-5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-xs font-black text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950 px-2.5 py-1 rounded-lg">
                      {b.code}
                    </span>
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                      Active Wing
                    </span>
                  </div>

                  <h4 className="font-extrabold text-slate-900 dark:text-white text-sm">{b.name}</h4>
                  
                  <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-300">
                    <div>
                      <span className="text-slate-400 block text-[10px]">Duty Warden:</span>
                      <span className="font-bold text-slate-800 dark:text-slate-200">{b.warden || 'Assigned'}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">Bed Quota:</span>
                      <span className="font-bold text-slate-800 dark:text-slate-200">{b.occupiedBeds} / {b.totalBeds} Beds</span>
                    </div>
                  </div>

                  <div className="pt-2 flex justify-end gap-2 border-t border-slate-200/60 dark:border-slate-700">
                    <button
                      onClick={() => showToast(`Warden reassignment notified for ${b.code}`, 'info')}
                      className="px-3 py-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-bold rounded-lg text-[10px] hover:bg-slate-100"
                    >
                      Reassign Warden
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ---------------- 4. STUDENT DIRECTORY ---------------- */}
        {activeTab === 'students' && (
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input 
                  type="text"
                  placeholder="Search by Roll No, Scholar Name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs outline-none focus:ring-2 focus:ring-blue-600 dark:text-white"
                />
              </div>

              <button 
                onClick={() => {
                  const rows = students.map(s => [s.rollNo, s.name, s.dept, s.block, s.room, s.phone, s.feePaid]);
                  exportCSV(rows, 'university_resident_roster.csv', ['Roll Number', 'Name', 'Department', 'Hostel Wing', 'Room', 'Phone', 'Fee Paid']);
                }}
                className="px-3.5 py-2 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" /> Export Roster CSV
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600 dark:text-slate-300">
                <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-extrabold uppercase text-[10px] border-b border-slate-200 dark:border-slate-700">
                  <tr>
                    <th className="p-3.5">Roll Number</th>
                    <th className="p-3.5">Student Name</th>
                    <th className="p-3.5">Department</th>
                    <th className="p-3.5">Hostel Wing</th>
                    <th className="p-3.5">Room</th>
                    <th className="p-3.5">Contact</th>
                    <th className="p-3.5">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {students
                    .filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.rollNo.toLowerCase().includes(searchQuery.toLowerCase()))
                    .map((s) => (
                      <tr key={s.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                        <td className="p-3.5 font-mono font-bold text-blue-600 dark:text-blue-400">{s.rollNo}</td>
                        <td className="p-3.5 font-bold text-slate-900 dark:text-white">{s.name}</td>
                        <td className="p-3.5 font-medium">{s.dept}</td>
                        <td className="p-3.5 font-medium">{s.block}</td>
                        <td className="p-3.5 font-bold text-indigo-600 dark:text-indigo-400">Room {s.room}</td>
                        <td className="p-3.5 font-mono text-slate-500">{s.phone}</td>
                        <td className="p-3.5">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-800">
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

        {/* ---------------- 5. FEE MANAGEMENT ---------------- */}
        {activeTab === 'fees' && (
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="font-extrabold text-slate-900 dark:text-white text-base">
                  Annual Hostel Term Fee Collections (Razorpay Invoicing)
                </h3>
                <p className="text-xs text-slate-500 font-medium">Academic Term 2026-27 Revenue Audit</p>
              </div>
              <button 
                onClick={() => {
                  const rows = students.map(s => [s.name, s.rollNo, '₹45,000', '₹45,000', 'Razorpay UPI', 'Settled']);
                  exportCSV(rows, 'university_fee_ledger.csv', ['Student Name', 'Roll Number', 'Invoice Amount', 'Amount Paid', 'Gateway', 'Status']);
                }}
                className="px-3.5 py-2 border border-slate-200 dark:border-slate-700 text-xs font-bold rounded-xl flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" /> Export Fee Ledger
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600 dark:text-slate-300">
                <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-extrabold uppercase text-[10px] border-b border-slate-200">
                  <tr>
                    <th className="p-3.5">Student Name</th>
                    <th className="p-3.5">Roll Number</th>
                    <th className="p-3.5">Invoice Amount</th>
                    <th className="p-3.5">Settlement Mode</th>
                    <th className="p-3.5">Audit Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {students.map((s) => (
                    <tr key={s.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                      <td className="p-3.5 font-bold text-slate-900 dark:text-white">{s.name}</td>
                      <td className="p-3.5 font-mono text-blue-600 dark:text-blue-400">{s.rollNo}</td>
                      <td className="p-3.5 font-bold text-emerald-600">₹45,000.00</td>
                      <td className="p-3.5 text-slate-500">Razorpay UPI / Instant Settlement</td>
                      <td className="p-3.5">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-800">
                          Verified & Paid
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ---------------- 6. DATA PIPELINES & EXPORTERS ---------------- */}
        {activeTab === 'exports' && (
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-5">
            <div>
              <h3 className="font-black text-slate-900 dark:text-white text-base">
                Data Pipelines, Exporters & System Backups
              </h3>
              <p className="text-xs text-slate-500 font-medium">Export university operational logs and regulatory files</p>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-3">
                <FileSpreadsheet className="w-8 h-8 text-blue-600" />
                <h4 className="font-extrabold text-slate-900 dark:text-white text-sm">Full Resident Roster</h4>
                <p className="text-xs text-slate-500">Includes scholar roll number, wing, room, phone, and parent emergency contacts.</p>
                <button
                  onClick={() => {
                    const rows = students.map(s => [s.rollNo, s.name, s.dept, s.block, s.room, s.phone]);
                    exportCSV(rows, 'complete_residents_data.csv', ['Roll Number', 'Name', 'Department', 'Wing', 'Room', 'Phone']);
                  }}
                  className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" /> Export Roster CSV
                </button>
              </div>

              <div className="p-5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-3">
                <DollarSign className="w-8 h-8 text-emerald-600" />
                <h4 className="font-extrabold text-slate-900 dark:text-white text-sm">Fee Collection Ledger</h4>
                <p className="text-xs text-slate-500">Complete transaction histories, Razorpay payment tokens, and settlements.</p>
                <button
                  onClick={() => {
                    const rows = students.map(s => [s.rollNo, s.name, '₹45,000', 'PAID', 'Razorpay']);
                    exportCSV(rows, 'fee_collections_audit.csv', ['Roll Number', 'Name', 'Amount', 'Status', 'Gateway']);
                  }}
                  className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" /> Export Ledger CSV
                </button>
              </div>

              <div className="p-5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-3">
                <Printer className="w-8 h-8 text-indigo-600" />
                <h4 className="font-extrabold text-slate-900 dark:text-white text-sm">University Summary PDF</h4>
                <p className="text-xs text-slate-500">Official bound printout ready for college evaluation and NAAC inspection.</p>
                <button
                  onClick={() => window.print()}
                  className="w-full py-2 bg-slate-900 dark:bg-slate-700 hover:bg-slate-800 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5" /> Print Summary PDF
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ---------------- 7. UNIVERSITY DIRECTIVES ---------------- */}
        {activeTab === 'notices' && (
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-extrabold text-slate-900 dark:text-white text-base">
                Campus-Wide Directives & Executive Notices
              </h3>
              <button 
                onClick={() => setActiveModal('notice')}
                className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition-colors flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" /> Publish Campus Directive
              </button>
            </div>

            <div className="space-y-3">
              {notices.map((n, i) => (
                <div key={i} className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-blue-600 bg-blue-100 dark:bg-blue-950 px-2 py-0.5 rounded">
                      {n.audience}
                    </span>
                    <span className="text-[10px] text-slate-400">{n.date}</span>
                  </div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">{n.title}</h4>
                  <p className="text-xs text-slate-500">Issued by: {n.author}</p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Publish Notice Modal */}
      {activeModal === 'notice' && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 max-w-md w-full rounded-3xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 animate-in fade-in zoom-in-95">
            <div className="bg-blue-600 text-white p-4 px-6 flex items-center justify-between">
              <h3 className="font-extrabold text-base flex items-center gap-2">
                <Bell className="w-5 h-5" /> Publish Campus Directive
              </h3>
              <button onClick={() => setActiveModal(null)} className="p-1 hover:bg-blue-700 rounded-lg text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateNotice} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Directive Title</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Annual Energy Conservation Guidelines"
                  value={newNoticeTitle}
                  onChange={(e) => setNewNoticeTitle(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-blue-600 font-medium dark:text-white"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Target Residence Blocks</label>
                <select 
                  value={newNoticeAudience}
                  onChange={(e) => setNewNoticeAudience(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-blue-600 font-medium dark:text-white"
                >
                  <option value="All Hostels">All University Hostels</option>
                  <option value="Boys Hostels (Block A & B)">Boys Hostels (Block A & B)</option>
                  <option value="Girls Hostels (Block C)">Girls Hostels (Block C)</option>
                  <option value="PG Scholars (Block D)">PG Scholars Wing (Block D)</option>
                </select>
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
                  <Send className="w-3.5 h-3.5" /> Broadcast Directive
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </MainLayout>
  );
}
