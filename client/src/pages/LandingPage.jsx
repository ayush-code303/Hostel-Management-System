import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Wifi, 
  Utensils, 
  Award, 
  BookOpen, 
  Clock, 
  UserCheck, 
  ArrowRight, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar, 
  Sparkles, 
  ChevronDown, 
  ChevronUp, 
  Bed, 
  Star, 
  Building2, 
  QrCode, 
  CreditCard, 
  Layers, 
  CheckCircle2, 
  TrendingUp 
} from 'lucide-react';
import { ThemeToggleButton, AccessibilityToolbar } from '../context/ThemeContext';
import { INSTITUTIONS, MULTI_COLLEGE_USERS } from '../services/multiCollegeData';
import shardaLogo from '../assets/sharda_logo.png';

export default function LandingPage() {
  const [selectedHostelTab, setSelectedHostelTab] = useState('boys');
  const [activeFaq, setActiveFaq] = useState(0);
  const [currentTime, setCurrentTime] = useState('');

  // Live IST Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleString('en-IN', { 
        timeZone: 'Asia/Kolkata', 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit',
        hour12: true,
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      }) + ' IST');
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const hostelTypes = {
    boys: {
      title: 'Boys Hostel Wing (Block A & B)',
      image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80',
      capacity: '650 Beds',
      sharing: '2-Sharing & 3-Sharing AC/Non-AC',
      fee: '₹45,000 / Semester',
      features: ['High-Speed Wi-Fi 6', '24/7 Security Biometric Gates', 'Gym & Recreation Room', 'Solar Hot Water Grid']
    },
    girls: {
      title: 'Girls Hostel Wing (Block C)',
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80',
      capacity: '480 Beds',
      sharing: '2-Sharing Attached Washroom',
      fee: '₹48,000 / Semester',
      features: ['Biometric Access Gate', 'Dedicated Warden Desk', 'Indoor Badminton Court', 'In-house Laundry Service']
    },
    pg: {
      title: 'PG & Scholars Wing (Block D)',
      image: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80',
      capacity: '120 Beds',
      sharing: 'Single Occupancy Deluxe AC',
      fee: '₹65,000 / Semester',
      features: ['Private Balcony', 'Study Desk & Ergonomic Chair', 'Mini Fridge Option', 'Dedicated Quiet Lounge']
    }
  };

  const faqs = [
    { q: 'How does the Multi-College ID detection work at login?', a: 'Users simply enter their University Roll Number (e.g. 25ASETCSE019 for Sharda, 2026DTUCSE042 for DTU, or 2026IITDCS104 for IIT Delhi) or institutional email. The system dynamically detects the college, hostel block, and user role, instantly routing to their customized portal.' },
    { q: 'How do students apply for an outstation leave gate pass?', a: 'Scholars log into the Student Portal, choose "Apply Outstation Leave", fill in dates and parent contacts. Upon warden clearance, a dynamic SVG QR code pass is generated that can be scanned at campus security checkpoints.' },
    { q: 'How does the Razorpay fee settlement work?', a: 'Students can pay semester fees directly via Razorpay UPI, Netbanking, or Debit Card in instant sandbox/live mode. Immediate official printable PDF receipts with verification tokens are generated.' },
    { q: 'What is the role difference between University Admin and Hostel Warden?', a: 'University Admins oversee campus-wide analytics, financial ledgers, and capacity planning. Wardens manage daily ground operations: 09:30 PM night biometric roll calls, outstation leave clearance with email notification dispatch, and maintenance repair assignments.' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col font-sans transition-colors duration-300">

      {/* 1. TOP GOVERNMENT & INSTITUTIONAL UTILITY BAR */}
      <div className="bg-slate-900 text-slate-300 text-[11px] border-b border-slate-800 px-4 py-1.5 flex flex-wrap items-center justify-between gap-2 z-40">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 font-bold text-white tracking-wide">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
            <span>NATIONAL CAMPUS RESIDENCE & HOSTEL ERP</span>
          </div>
          <span className="text-slate-600 hidden sm:inline">|</span>
          <span className="text-slate-400 font-medium hidden md:inline">
            Ministry of Education Guidelines (GIGW Compliant)
          </span>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden lg:flex items-center gap-1 font-mono text-slate-300 text-[11px]">
            <Clock className="w-3 h-3 text-blue-400" />
            <span>{currentTime || 'IST Live'}</span>
          </div>
          <span className="text-slate-600 hidden lg:inline">|</span>
          <AccessibilityToolbar />
          <span className="text-slate-600 hidden sm:inline">|</span>
          <span className="text-amber-400 font-bold hidden sm:inline">
            Toll-Free Helpline: 1800-HOSTEL-HELP
          </span>
        </div>
      </div>

      {/* 2. MAIN HEADER */}
      <header className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md sticky top-0 z-40 border-b border-slate-200/80 dark:border-slate-800 shadow-sm transition-colors">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-blue-600 p-0.5 shadow-md shadow-blue-600/30 flex items-center justify-center shrink-0 border-0">
              <img src={shardaLogo} alt="Institutional Seal" className="w-full h-full object-cover rounded-full" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-extrabold text-slate-900 dark:text-white leading-tight">
                  Central Campus Residence ERP
                </h1>
                <span className="text-[10px] bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-extrabold px-2 py-0.5 rounded-full border-0 hidden sm:inline">
                  Multi-Hostel Portal
                </span>
              </div>
              <p className="text-[11px] text-blue-600 dark:text-blue-400 font-bold tracking-wide uppercase">
                Academic & Residential Governance
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <ThemeToggleButton />
            <Link 
              to="/login"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-black text-xs rounded-xl shadow-md shadow-blue-600/20 transition-all flex items-center gap-1.5"
            >
              <span>Single Sign-On (Login)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </header>

      {/* 3. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-950 via-slate-900 to-slate-950 text-white py-16 lg:py-24 px-4">
        <div className="container mx-auto max-w-6xl relative z-10 grid lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Heading & Vision */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left animate-in fade-in">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-bold text-blue-200 border border-white/15">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Multi-College University Residence Network</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              Enterprise Hostel Management & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-emerald-300">Smart Resident Care</span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl mx-auto lg:mx-0 font-normal">
              A comprehensive digital ERP for higher education residences. Seamlessly connects Scholars, Hostel Wardens, and University Directors with automated biometric roll calls, dynamic QR gate passes, Razorpay fee settlement, and dining reviews.
            </p>

            <div className="flex flex-wrap gap-3 justify-center lg:justify-start pt-2">
              <Link
                to="/login"
                className="px-6 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-black text-xs sm:text-sm rounded-2xl shadow-xl shadow-blue-600/30 transition-all flex items-center gap-2"
              >
                <span>Access University Portal</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/register"
                className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-extrabold text-xs sm:text-sm rounded-2xl backdrop-blur-md border border-white/20 transition-all"
              >
                Apply for Room Allocation
              </Link>
            </div>

            {/* Supported Campuses Badges */}
            <div className="pt-4 border-t border-white/10 text-xs space-y-2">
              <p className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                Supported Campuses & University Residences:
              </p>
              <div className="flex flex-wrap gap-2 justify-center lg:justify-start text-[11px] font-bold">
                {Object.values(INSTITUTIONS).map(inst => (
                  <span key={inst.id} className="px-2.5 py-1 rounded-lg bg-white/10 backdrop-blur border border-white/15 text-slate-200">
                    🏛️ {inst.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Multi-Campus ID Simulator */}
          <div className="lg:col-span-5 bg-white/10 backdrop-blur-xl p-6 rounded-3xl border border-white/20 shadow-2xl space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-white/15">
              <span className="text-xs font-black uppercase text-amber-300 tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" /> Smart ID Routing Demo
              </span>
              <span className="text-[10px] bg-emerald-400 text-slate-950 font-black px-2 py-0.5 rounded">
                LIVE DEMO
              </span>
            </div>

            <p className="text-xs text-slate-200 leading-relaxed">
              Enter any student roll number or institutional email to preview instant college & hostel wing recognition:
            </p>

            <div className="space-y-2">
              <div className="p-3 bg-slate-900/80 rounded-2xl border border-white/15 text-xs space-y-2">
                <div className="flex justify-between items-center text-slate-400 text-[11px]">
                  <span>Student ID: <strong className="text-white font-mono">25ASETCSE019</strong></span>
                  <span className="text-blue-400 font-bold">Sharda University Agra</span>
                </div>
                <div className="flex justify-between items-center text-slate-400 text-[11px]">
                  <span>Allocated Wing:</span>
                  <span className="text-emerald-400 font-bold">Nelson Mandela Boys Block B</span>
                </div>
                <div className="flex justify-between items-center text-slate-400 text-[11px]">
                  <span>Duty Warden:</span>
                  <span className="text-slate-200">Prof. Virendra Verma</span>
                </div>
              </div>

              <div className="p-3 bg-slate-900/80 rounded-2xl border border-white/15 text-xs space-y-2">
                <div className="flex justify-between items-center text-slate-400 text-[11px]">
                  <span>Student ID: <strong className="text-white font-mono">2026DTUCSE042</strong></span>
                  <span className="text-teal-400 font-bold">Delhi Technological Univ</span>
                </div>
                <div className="flex justify-between items-center text-slate-400 text-[11px]">
                  <span>Allocated Wing:</span>
                  <span className="text-emerald-400 font-bold">Kalpana Chawla Girls Hall</span>
                </div>
              </div>
            </div>

            <Link
              to="/login"
              className="block w-full text-center py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold rounded-xl text-xs shadow-md"
            >
              Test Single Sign-On Gateway &rarr;
            </Link>
          </div>

        </div>
      </section>

      {/* 4. THREE DISTINCT ROLE PILLARS */}
      <section className="py-16 px-4 bg-white dark:bg-slate-900 transition-colors">
        <div className="container mx-auto max-w-6xl space-y-10">
          <div className="text-center space-y-2">
            <span className="text-xs font-black uppercase text-blue-600 tracking-wider">Enterprise Architecture</span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              Three Dedicated Portals for Equalized Campus Ownership
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-2xl mx-auto">
              Clean separation of concerns ensuring streamlined operations from individual student rooms to executive directorate decisions.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            
            {/* 1. Scholar Portal */}
            <div className="bg-slate-50 dark:bg-slate-800/60 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 space-y-4 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-950 text-blue-600 rounded-2xl flex items-center justify-center">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white">Student Residence Portal</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Personal scholar residence desk: profile photo updates, room card, outstation gate pass with dynamic SVG QR code, Razorpay fee settlement, and mess timetable rating.
              </p>
              <ul className="text-xs space-y-1.5 font-bold text-slate-700 dark:text-slate-300">
                <li className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Verifiable QR Gate Pass</li>
                <li className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Instant PDF Fee Receipts</li>
                <li className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Daily Dining Star Ratings</li>
              </ul>
              <Link to="/login" className="inline-block text-xs font-black text-blue-600 hover:underline pt-2">
                Launch Scholar Portal &rarr;
              </Link>
            </div>

            {/* 2. Warden Desk */}
            <div className="bg-slate-50 dark:bg-slate-800/60 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 space-y-4 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-amber-100 dark:bg-amber-950 text-amber-600 rounded-2xl flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white">Hostel Warden Desk</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Ground-level discipline, safety, and care: 09:30 PM night biometric roll calls, outstation leave triage with official student & parent email notification dispatch.
              </p>
              <ul className="text-xs space-y-1.5 font-bold text-slate-700 dark:text-slate-300">
                <li className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Night Roll Call Marking</li>
                <li className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Official Email Clearance</li>
                <li className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Maintenance Dispatch Desk</li>
              </ul>
              <Link to="/login" className="inline-block text-xs font-black text-amber-600 hover:underline pt-2">
                Launch Warden Desk &rarr;
              </Link>
            </div>

            {/* 3. University Admin Hub */}
            <div className="bg-slate-50 dark:bg-slate-800/60 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 space-y-4 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-950 text-purple-600 rounded-2xl flex items-center justify-center">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white">University Admin Command Center</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Institutional governance: multi-hostel capacity configuration, interactive SVG analytics charts, annual fee recovery audits, and one-click regulatory CSV exporters.
              </p>
              <ul className="text-xs space-y-1.5 font-bold text-slate-700 dark:text-slate-300">
                <li className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Visual Analytics & Trends</li>
                <li className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Capacity Quota Management</li>
                <li className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> CSV Regulatory Exporters</li>
              </ul>
              <Link to="/login" className="inline-block text-xs font-black text-purple-600 hover:underline pt-2">
                Launch Admin Center &rarr;
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* 5. HOSTEL WINGS SHOWCASE */}
      <section className="py-16 px-4 bg-slate-50 dark:bg-slate-950 transition-colors border-t border-slate-200/80 dark:border-slate-800">
        <div className="container mx-auto max-w-5xl space-y-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs font-black uppercase text-blue-600 tracking-wider">Campus Facilities</span>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">Campus Residential Wings</h2>
            </div>

            <div className="flex gap-2 p-1 bg-slate-200 dark:bg-slate-800 rounded-2xl text-xs font-extrabold">
              {['boys', 'girls', 'pg'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setSelectedHostelTab(tab)}
                  className={`px-4 py-2 rounded-xl capitalize transition-all ${
                    selectedHostelTab === tab ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-300'
                  }`}
                >
                  {tab === 'pg' ? 'PG & Scholars' : `${tab} Hostel`}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-lg grid md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-6 h-64 md:h-full">
              <img 
                src={hostelTypes[selectedHostelTab].image} 
                alt={hostelTypes[selectedHostelTab].title} 
                className="w-full h-full object-cover"
              />
            </div>

            <div className="md:col-span-6 p-6 sm:p-8 space-y-4">
              <span className="text-xs font-mono font-bold text-blue-600 bg-blue-50 dark:bg-blue-950 px-2.5 py-1 rounded-lg">
                Capacity: {hostelTypes[selectedHostelTab].capacity}
              </span>
              <h3 className="text-xl font-black text-slate-900 dark:text-white">
                {hostelTypes[selectedHostelTab].title}
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Sharing Model: <strong>{hostelTypes[selectedHostelTab].sharing}</strong> • Fee: <strong className="text-emerald-600">{hostelTypes[selectedHostelTab].fee}</strong>
              </p>

              <div className="grid grid-cols-2 gap-2 text-xs text-slate-700 dark:text-slate-300">
                {hostelTypes[selectedHostelTab].features.map((feat, i) => (
                  <div key={i} className="flex items-center gap-1.5 font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <Link
                  to="/login"
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl shadow-md inline-flex items-center gap-1.5"
                >
                  View Floor Vacancy & Allotment
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FAQ ACCORDION */}
      <section className="py-16 px-4 bg-white dark:bg-slate-900 border-t border-slate-200/80 dark:border-slate-800 transition-colors">
        <div className="container mx-auto max-w-4xl space-y-8">
          <div className="text-center space-y-1">
            <span className="text-xs font-black uppercase text-blue-600 tracking-wider">Evaluation & FAQ</span>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div 
                key={i} 
                className="p-5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200/80 dark:border-slate-800 cursor-pointer transition-colors"
                onClick={() => setActiveFaq(activeFaq === i ? -1 : i)}
              >
                <div className="flex justify-between items-center">
                  <h4 className="font-extrabold text-slate-900 dark:text-white text-xs sm:text-sm">{faq.q}</h4>
                  <span className="text-slate-400 font-bold">{activeFaq === i ? '−' : '+'}</span>
                </div>
                {activeFaq === i && (
                  <p className="mt-2 text-xs text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-200/60 dark:border-slate-700 pt-2">
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. ACADEMIC PBL SHOWCASE FOOTER */}
      <footer className="bg-slate-950 text-slate-400 py-12 px-4 border-t border-slate-800 text-xs">
        <div className="container mx-auto max-w-6xl space-y-8">
          <div className="grid md:grid-cols-12 gap-8 pb-8 border-b border-slate-800">
            <div className="md:col-span-5 space-y-2">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-black text-xs">
                  SUA
                </div>
                <h4 className="font-extrabold text-white text-sm">Sharda University Agra - PBL Showcase</h4>
              </div>
              <p className="text-slate-500 text-[11px] leading-relaxed">
                Project-Based Learning Course Showcase Project • Department of Computer Science & Engineering.
                Architected with React 18, Vite, Tailwind CSS, Node.js, Express, Socket.IO, and MongoDB dual-engine execution.
              </p>
            </div>

            <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-4 text-[11px]">
              <div>
                <p className="font-bold text-white uppercase text-[10px] mb-2 text-blue-400">Ayush (25%)</p>
                <p>Lead Architect</p>
                <p className="text-slate-500">Core Backend & Schemas</p>
                <p className="text-slate-500">Razorpay Gateway</p>
              </div>
              <div>
                <p className="font-bold text-white uppercase text-[10px] mb-2 text-blue-400">Anushka (25%)</p>
                <p>Frontend Lead</p>
                <p className="text-slate-500">Student Residence UX</p>
                <p className="text-slate-500">Axios API Client</p>
              </div>
              <div>
                <p className="font-bold text-white uppercase text-[10px] mb-2 text-blue-400">Bhoomi (25%)</p>
                <p>Admin Operations</p>
                <p className="text-slate-500">Command Center</p>
                <p className="text-slate-500">Data Analytics</p>
              </div>
              <div>
                <p className="font-bold text-white uppercase text-[10px] mb-2 text-blue-400">Palak (25%)</p>
                <p>Security & QA</p>
                <p className="text-slate-500">Postman Test Suite</p>
                <p className="text-slate-500">Gate Pass QR Engine</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-500">
            <p>© 2026 National Campus Residence ERP • Academic Showcase Version</p>
            <div className="flex gap-4">
              <Link to="/login" className="hover:text-white">SSO Login</Link>
              <Link to="/register" className="hover:text-white">Resident Registration</Link>
              <Link to="/warden" className="hover:text-white">Warden Desk</Link>
              <Link to="/admin" className="hover:text-white">Admin Command</Link>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
