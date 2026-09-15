import React, { useState } from 'react';
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
  X
} from 'lucide-react';

export default function AdminDashboard({ defaultPanel = 'overview' }) {
  const [activeTab, setActiveTab] = useState(defaultPanel);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModal, setActiveModal] = useState(null); // 'notice' | null

  // Dummy State Data for Admin Panels
  const [students] = useState([
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
    { id: 'LV-2026-042', student: 'Ayush', rollNo: '25ASETCSE019', reason: 'Weekend Home Visit', dates: '12 Sep - 14 Sep 2026', parent: '+91 9876543210', status: 'Pending Warden Approval' },
    { id: 'LV-2026-040', student: 'Priya Verma', rollNo: '2026BECE045', reason: 'Family Function', dates: '10 Sep - 12 Sep 2026', parent: '+91 9876543211', status: 'Approved' },
  ]);

  const [visitors] = useState([
    { id: 'VIS-901', name: 'Ramesh Sharma (Father)', student: 'Ayush (Room 204)', entry: '02:30 PM', exit: '04:15 PM', status: 'Exited' },
    { id: 'VIS-902', name: 'Sunita Verma (Mother)', student: 'Priya Verma (Room 108)', entry: '05:00 PM', exit: 'On Premises', status: 'Inside Campus' },
  ]);

  const [notices, setNotices] = useState([
    { id: 1, title: 'Mandatory Night Biometric Attendance', audience: 'All Hostel Residents', date: 'Today', author: 'Chief Warden' },
    { id: 2, title: 'Annual Block C AC Maintenance Inspection', audience: 'Girls Hostel Block C', date: '10 Sep 2026', author: 'Estate Maintenance' },
  ]);

  const [newNoticeTitle, setNewNoticeTitle] = useState('');
  const [newNoticeAudience, setNewNoticeAudience] = useState('All Hostel Residents');

  const handleCreateNotice = (e) => {
    e.preventDefault();
    if (!newNoticeTitle) return;
    const item = {
      id: notices.length + 1,
      title: newNoticeTitle,
      audience: newNoticeAudience,
      date: 'Just Now',
      author: 'Lead Warden'
    };
    setNotices([item, ...notices]);
    setNewNoticeTitle('');
    setActiveModal(null);
  };

  const handleApproveLeave = (id) => {
    setLeaves(leaves.map(l => l.id === id ? { ...l, status: 'Approved' } : l));
  };

  const handleResolveComplaint = (id) => {
    setComplaints(complaints.map(c => c.id === id ? { ...c, status: 'Resolved' } : c));
  };

  return (
    <MainLayout userRole="Lead Warden">
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
              { id: 'leave', label: 'Leaves' },
              { id: 'visitors', label: 'Visitors' },
              { id: 'notices', label: 'Notices' },
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
                { title: 'Total Resident Students', val: '450', sub: '1250 Total Capacity', icon: Users, color: 'bg-blue-600' },
                { title: 'Hostel Blocks Managed', val: '4 Wings', sub: 'Block A, B, C, D', icon: Building, color: 'bg-indigo-600' },
                { title: 'Room Occupancy Rate', val: '88.4%', sub: '352 / 400 Beds Filled', icon: DoorOpen, color: 'bg-emerald-600' },
                { title: 'Pending Complaints', val: complaints.filter(c => c.status !== 'Resolved').length.toString(), sub: 'Requires Action', icon: AlertCircle, color: 'bg-amber-600' },
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

            {/* Block Occupancy Summary */}
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

              {/* Operations Activity Feed */}
              <div className="lg:col-span-5 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
                <div className="flex justify-between items-center pb-2 border-b border-slate-100 dark:border-slate-800">
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white">Realtime Operations Log</h3>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                </div>

                <div className="space-y-3.5 text-xs">
                  <div className="flex items-start space-x-3 p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-800">
                    <Clock className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-slate-800 dark:text-slate-200">Ayush (Room 204) applied for Outstation Leave.</p>
                      <span className="text-[10px] text-slate-400">10 mins ago</span>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-800">
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-slate-800 dark:text-slate-200">Complaint #CMP-089 (Wi-Fi) marked Resolved by Warden.</p>
                      <span className="text-[10px] text-slate-400">1 hour ago</span>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-800">
                    <UserCheck className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-slate-800 dark:text-slate-200">Visitor Ramesh Sharma checked in at Campus Gate 2.</p>
                      <span className="text-[10px] text-slate-400">3 hours ago</span>
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
                  onClick={() => alert('Exporting Student Directory CSV...')}
                  className="px-3.5 py-2 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 dark:text-slate-200"
                >
                  <Download className="w-3.5 h-3.5" /> Export List
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
                    .filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.rollNo.toLowerCase().includes(searchQuery.toLowerCase()))
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
              { code: 'Block B', name: 'Boys Senior Hostel', warden: 'Dr. R. K. Verma', capacity: '120 Beds', occ: '102 Occupied', status: 'Available' },
              { code: 'Block C', name: 'Girls Main Hostel', warden: 'Mrs. Anita Rao', capacity: '160 Beds', occ: '140 Occupied', status: 'Available' },
              { code: 'Block D', name: 'PG & International Wing', warden: 'Prof. A. Sharma', capacity: '40 Beds', occ: '30 Occupied', status: 'Available' },
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
                <h3 className="font-bold text-slate-900 dark:text-white text-base">Hostel Term Fee Management</h3>
                <p className="text-xs text-slate-500 font-medium">Academic Term 2026-27 Fee Collections</p>
              </div>
              <span className="text-xs font-mono font-bold bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full">
                Total Collected: ₹1.85 Cr
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
                    <th className="p-3.5">Due Date</th>
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
                      <td className="p-3.5 text-slate-400">15 Sep 2026</td>
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
              <h3 className="font-bold text-slate-900 dark:text-white text-base">Hostel Maintenance Complaints Triage</h3>
              <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-lg">
                2 Tickets Awaiting Warden Action
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
                  {complaints.map((c) => (
                    <tr key={c.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
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
                            className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-[10px] transition-colors"
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

        {/* ---------------- 6. LEAVE APPROVALS PANEL ---------------- */}
        {activeTab === 'leave' && (
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-slate-900 dark:text-white text-base">Outstation Gate Pass Approvals</h3>
              <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg">
                Automated Parent SMS Verification
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
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {leaves.map((l) => (
                    <tr key={l.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                      <td className="p-3.5 font-mono font-bold text-blue-600">{l.id}</td>
                      <td className="p-3.5 font-bold text-slate-900 dark:text-white">{l.student}</td>
                      <td className="p-3.5 font-medium">{l.reason}</td>
                      <td className="p-3.5 text-slate-400">{l.dates}</td>
                      <td className="p-3.5 font-mono text-slate-500">{l.parent}</td>
                      <td className="p-3.5">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                          l.status === 'Approved' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {l.status}
                        </span>
                      </td>
                      <td className="p-3.5">
                        {l.status !== 'Approved' && (
                          <button 
                            onClick={() => handleApproveLeave(l.id)}
                            className="px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-[10px] transition-colors"
                          >
                            Approve Pass
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

        {/* ---------------- 7. VISITOR REGISTRY PANEL ---------------- */}
        {activeTab === 'visitors' && (
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-slate-900 dark:text-white text-base">Campus Gate Visitor Registry</h3>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg">
                Biometric Gate 2 Logging
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
                  {visitors.map((v) => (
                    <tr key={v.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
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
              {notices.map((n) => (
                <div key={n.id} className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/80 dark:border-slate-800 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 rounded">
                      {n.audience}
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">{n.date}</span>
                  </div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">{n.title}</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Issued by: {n.author}</p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Post New Announcement Modal */}
      {activeModal === 'notice' && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 max-w-md w-full rounded-3xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800">
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

    </MainLayout>
  );
}
