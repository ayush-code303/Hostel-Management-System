import React, { useState } from 'react';
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
  Coffee 
} from 'lucide-react';
import { ThemeToggleButton } from '../context/ThemeContext';
import shardaLogo from '../assets/sharda_logo.png';

export default function LandingPage() {
  const [selectedHostelTab, setSelectedHostelTab] = useState('boys');
  const [activeFaq, setActiveFaq] = useState(0);
  const [selectedDayMenu, setSelectedDayMenu] = useState('Monday');

  const announcements = [
    { id: 1, title: 'Outstation Leave Gate Pass Deadline', date: '08 Sep 2026', type: 'Urgent', desc: 'All outstation requests for coming festival weekend must be logged before Friday 5 PM.' },
    { id: 2, title: 'Hostel Block-C Annual Maintenance Inspection', date: '10 Sep 2026', type: 'Info', desc: 'Routine AC and electrical safety audit will be conducted by campus engineering team.' },
    { id: 3, title: 'Special Festival Mess Menu Voting Opened', date: '12 Sep 2026', type: 'Event', desc: 'Cast your vote in the Student Portal for Sunday grand dinner menu choices.' },
  ];

  const hostelTypes = {
    boys: {
      title: 'Boys Hostel Wing (Block A & B)',
      image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80',
      capacity: '650 Beds',
      sharing: '2-Sharing & 3-Sharing AC/Non-AC',
      fee: '₹45,000 / Semester',
      features: ['High-Speed Wi-Fi 6', '24/7 Security Guard', 'Gym & Table Tennis Room', 'Solar Hot Water']
    },
    girls: {
      title: 'Girls Hostel Wing (Block C)',
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80',
      capacity: '480 Beds',
      sharing: '2-Sharing Attached Washroom',
      fee: '₹48,000 / Semester',
      features: ['Biometric Access Gate', 'Female Security Guards', 'Indoor Badminton Court', 'In-house Laundry Service']
    },
    pg: {
      title: 'PG & International Scholars Wing (Block D)',
      image: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80',
      capacity: '120 Beds',
      sharing: 'Single Occupancy Deluxe AC',
      fee: '₹65,000 / Semester',
      features: ['Private Balcony', 'Study Desk & Ergonomic Chair', 'Mini Fridge Option', 'Dedicated Quiet Lounge']
    }
  };

  const messMenuData = {
    Monday: { breakfast: 'Puri Aloo & Masala Tea', lunch: 'Rajma Chawal, Chapati, Salad & Boondi Raita', snacks: 'Veg Samosa & Hot Coffee', dinner: 'Dal Makhani, Mix Veg, Rice, Gulab Jamun' },
    Tuesday: { breakfast: 'Idli Sambhar & Filter Coffee', lunch: 'Kadi Pakoda, Jeera Rice, Chapati, Salad', snacks: 'Bread Pakoda & Tea', dinner: 'Paneer Do Pyaza, Arhar Dal, Rice, Roti, Kheer' },
    Wednesday: { breakfast: 'Aloo Paratha with Butter & Curd', lunch: 'Chole Bhature, Boondi Raita, Salad', snacks: 'Veg Patties & Tea', dinner: 'Chicken Curry / Shahi Paneer, Naan, Rice, Ice Cream' },
    Thursday: { breakfast: 'Poha, Sev & Hot Tea', lunch: 'Black Chana Curry, Mix Veg, Rice, Chapati', snacks: 'Biscuit & Tea', dinner: 'Kadhai Paneer, Yellow Dal, Steamed Rice, Roti, Halwa' },
    Friday: { breakfast: 'Uttapam & Coconut Chutney', lunch: 'Veg Biryani, Mirchi Salan, Raita', snacks: 'Pav Bhaji & Coffee', dinner: 'Dal Tadka, Matar Paneer, Chapati, Rice, Sevaiyan' },
  };

  const faqs = [
    { q: 'How do students apply for an outstation leave gate pass?', a: 'Students can log into their Student Portal dashboard, select "Apply Outstation Leave", fill in departure/return dates, and submit. An automatic notification is routed to the Chief Warden and registered parent mobile number.' },
    { q: 'What is the procedure for logging room maintenance issues?', a: 'Under the Maintenance section in the Student Portal, select the complaint category (Electrical, Plumbing, AC, Wi-Fi, Cleaning), choose priority level, and submit. Tickets are resolved within 24 hours by campus engineers.' },
    { q: 'What are the hostel entry and curfew timings?', a: 'Regular campus gate entry deadline for resident students is 09:30 PM. Late entry requires a valid gate pass pre-approved by the hostel warden.' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col font-sans transition-colors duration-300">

      {/* Main Navbar with Borderless Circular Logo */}
      <header className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md sticky top-0 z-40 border-b border-slate-200/80 dark:border-slate-800 shadow-sm transition-colors">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          
          {/* Logo & University Brand */}
          <div className="flex items-center space-x-3">
            {/* Borderless Circle Logo */}
            <div className="w-10 h-10 rounded-full overflow-hidden bg-blue-600 p-0.5 shadow-md shadow-blue-600/30 flex items-center justify-center shrink-0 border-0">
              <img 
                src={shardaLogo} 
                alt="Sharda University Agra Logo" 
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-extrabold text-slate-900 dark:text-white leading-none">Sharda University Agra</h1>
                <span className="text-[10px] bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-extrabold px-2 py-0.5 rounded-full border-0">
                  Agra Campus
                </span>
              </div>
              <p className="text-xs text-blue-600 dark:text-blue-400 font-bold tracking-wide uppercase mt-0.5">Hostel & Residence Life</p>
            </div>
          </div>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center space-x-8 text-sm font-bold text-slate-600 dark:text-slate-300">
            <a href="#about" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Hostel Wings</a>
            <a href="#facilities" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Amenities</a>
            <a href="#mess" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Mess Menu</a>
            <a href="#announcements" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Notices</a>
            <a href="#faqs" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">FAQ</a>
          </nav>

          {/* Action CTAs & Dark Mode Button */}
          <div className="flex items-center space-x-3">
            <ThemeToggleButton />

            <Link 
              to="/student" 
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-xs font-extrabold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950 hover:bg-blue-100 rounded-xl transition-all border border-blue-200 dark:border-blue-900/50 shadow-sm"
            >
              <UserCheck className="w-4 h-4 text-blue-600" />
              Student Portal
            </Link>
            <Link 
              to="/login" 
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-extrabold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md shadow-blue-600/30 hover:shadow-lg transition-all"
            >
              Portal Login <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-slate-950 text-white py-20 lg:py-28 overflow-hidden">
        {/* Background Overlay */}
        <div 
          className="absolute inset-0 opacity-15 bg-cover bg-center scale-105 transition-transform duration-10000"
          style={{ backgroundImage: `url('${shardaLogo}')` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/85 to-blue-950/40"></div>
        <div className="absolute top-1/4 right-10 w-96 h-96 bg-blue-600/30 rounded-full blur-[100px] pointer-events-none animate-pulse-glow"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero Text Left */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-xs font-bold backdrop-blur-md">
                <Sparkles className="w-4 h-4 text-amber-400 animate-spin" />
                <span>Official Sharda University Agra Residence Portal</span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-tight">
                Empowering Smart <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-300">Hostel Residence Life</span>
              </h1>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl font-normal">
                Welcome to the digital residence portal of Sharda University Agra. Manage your room allotments, track term fees, apply for digital outstation gate passes, lodge 24-hr maintenance tickets, and access real-time warden notices.
              </p>

              <div className="pt-3 flex flex-wrap justify-center lg:justify-start gap-4">
                <Link 
                  to="/student"
                  className="px-7 py-3.5 text-sm font-extrabold rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-xl shadow-blue-600/40 hover:shadow-blue-600/60 transition-all flex items-center gap-2 transform hover:-translate-y-0.5"
                >
                  <UserCheck className="w-4 h-4" /> Open Student Portal
                </Link>
                <Link 
                  to="/admin" 
                  className="px-7 py-3.5 text-sm font-extrabold rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-md transition-all flex items-center gap-2 transform hover:-translate-y-0.5"
                >
                  Warden & Admin Control
                </Link>
              </div>

              {/* 4 Live Stats */}
              <div className="pt-10 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center lg:text-left">
                <div>
                  <h3 className="text-3xl font-extrabold text-white">1,250+</h3>
                  <p className="text-xs text-blue-300 font-medium">Resident Scholars</p>
                </div>
                <div>
                  <h3 className="text-3xl font-extrabold text-white">4 Wings</h3>
                  <p className="text-xs text-cyan-300 font-medium">Boys & Girls Blocks</p>
                </div>
                <div>
                  <h3 className="text-3xl font-extrabold text-white">99.8%</h3>
                  <p className="text-xs text-emerald-300 font-medium">Complaint Speed</p>
                </div>
                <div>
                  <h3 className="text-3xl font-extrabold text-white">24/7</h3>
                  <p className="text-xs text-amber-300 font-medium">Security & Wi-Fi</p>
                </div>
              </div>
            </div>

            {/* Hero Card Right */}
            <div className="lg:col-span-5">
              <div className="bg-slate-900/90 backdrop-blur-md rounded-3xl p-6 shadow-2xl space-y-4 border border-white/15 relative overflow-hidden">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div className="flex items-center space-x-2">
                    <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping"></span>
                    <span className="text-xs font-bold text-white uppercase tracking-wider">Live System Modules</span>
                  </div>
                  <span className="text-[10px] bg-blue-500/30 text-blue-200 border border-blue-400/30 px-2 py-0.5 rounded-full font-mono">
                    Agra Campus
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="bg-slate-950/80 p-4 rounded-2xl border border-white/10 hover:border-blue-400/40 transition-all flex items-center justify-between group">
                    <div className="flex items-center space-x-3.5">
                      <div className="p-2.5 bg-blue-600/30 text-blue-400 rounded-xl group-hover:scale-110 transition-transform">
                        <Bed className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-bold text-white text-xs">Room Allocation Module</p>
                        <p className="text-slate-400 text-[11px]">Instant Bed & Block Allotment</p>
                      </div>
                    </div>
                    <Link to="/student" className="text-blue-400 font-bold text-xs group-hover:translate-x-1 transition-transform">
                      View &rarr;
                    </Link>
                  </div>

                  <div className="bg-slate-950/80 p-4 rounded-2xl border border-white/10 hover:border-amber-400/40 transition-all flex items-center justify-between group">
                    <div className="flex items-center space-x-3.5">
                      <div className="p-2.5 bg-amber-500/30 text-amber-300 rounded-xl group-hover:scale-110 transition-transform">
                        <Clock className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-bold text-white text-xs">Outstation Gate Pass</p>
                        <p className="text-slate-400 text-[11px]">Digital Warden Approval & SMS</p>
                      </div>
                    </div>
                    <Link to="/student" className="text-amber-400 font-bold text-xs group-hover:translate-x-1 transition-transform">
                      Apply &rarr;
                    </Link>
                  </div>

                  <div className="bg-slate-950/80 p-4 rounded-2xl border border-white/10 hover:border-emerald-400/40 transition-all flex items-center justify-between group">
                    <div className="flex items-center space-x-3.5">
                      <div className="p-2.5 bg-emerald-500/30 text-emerald-300 rounded-xl group-hover:scale-110 transition-transform">
                        <Award className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-bold text-white text-xs">Maintenance Triage Desk</p>
                        <p className="text-slate-400 text-[11px]">Electrical, AC & Plumbing 24h</p>
                      </div>
                    </div>
                    <Link to="/student" className="text-emerald-400 font-bold text-xs group-hover:translate-x-1 transition-transform">
                      Lodge &rarr;
                    </Link>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400 px-1">
                  <span>⚡ PBL College Project 2026</span>
                  <span className="text-blue-400 font-medium">Sharda Blue Theme</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Interactive Hostel Category Explorer */}
      <section id="about" className="py-16 bg-white dark:bg-slate-900 transition-colors">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-extrabold text-blue-600 dark:text-blue-400 uppercase tracking-widest bg-blue-50 dark:bg-blue-950 px-3 py-1 rounded-full border border-blue-100 dark:border-blue-900/50">
              Hostel Accommodation
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-3">Explore Resident Blocks & Rooms</h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm mt-2">
              Spacious, well-ventilated rooms fitted with modern study desks, individual almirahs, high-speed Wi-Fi, and 24/7 power backup.
            </p>

            {/* Interactive Tab Selector */}
            <div className="mt-6 inline-flex p-1.5 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
              <button
                onClick={() => setSelectedHostelTab('boys')}
                className={`px-5 py-2 rounded-xl text-xs font-extrabold transition-all ${
                  selectedHostelTab === 'boys' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Boys Hostel (Block A & B)
              </button>
              <button
                onClick={() => setSelectedHostelTab('girls')}
                className={`px-5 py-2 rounded-xl text-xs font-extrabold transition-all ${
                  selectedHostelTab === 'girls' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Girls Hostel (Block C)
              </button>
              <button
                onClick={() => setSelectedHostelTab('pg')}
                className={`px-5 py-2 rounded-xl text-xs font-extrabold transition-all ${
                  selectedHostelTab === 'pg' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                PG / Single AC Wing
              </button>
            </div>
          </div>

          {/* Active Hostel Display Card */}
          <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 lg:p-8 shadow-sm">
            <div className="grid lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-6 relative group overflow-hidden rounded-2xl">
                <img 
                  src={hostelTypes[selectedHostelTab].image} 
                  alt={hostelTypes[selectedHostelTab].title}
                  className="w-full h-72 lg:h-80 object-cover rounded-2xl group-hover:scale-105 transition-transform duration-700"
                />
                <span className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur text-white text-xs font-bold px-3 py-1 rounded-full border border-white/20">
                  {hostelTypes[selectedHostelTab].capacity}
                </span>
              </div>

              <div className="lg:col-span-6 space-y-4">
                <span className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-md uppercase tracking-wider">
                  ● Allotment Active 2026-27
                </span>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{hostelTypes[selectedHostelTab].title}</h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                  Configured with ergonomically designed student study units, individual lockable wardrobes, attached or floor-level luxury washrooms, and high-speed LAN ports.
                </p>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                    <span className="text-[11px] text-slate-400 block font-medium">Room Type</span>
                    <span className="text-xs font-bold text-slate-900 dark:text-white">{hostelTypes[selectedHostelTab].sharing}</span>
                  </div>
                  <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                    <span className="text-[11px] text-slate-400 block font-medium">Annual Term Fee</span>
                    <span className="text-xs font-bold text-blue-600 dark:text-blue-400">{hostelTypes[selectedHostelTab].fee}</span>
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <p className="text-xs font-bold text-slate-700 dark:text-slate-300">Included Amenities:</p>
                  <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-300">
                    {hostelTypes[selectedHostelTab].features.map((feat, idx) => (
                      <span key={idx} className="flex items-center gap-1.5 font-medium">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> {feat}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3">
                  <Link 
                    to="/student"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-xs shadow-md transition-all"
                  >
                    Select & Book Room in Portal &rarr;
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Campus Facilities Grid */}
      <section id="facilities" className="py-16 bg-slate-100 dark:bg-slate-950 border-y border-slate-200 dark:border-slate-800 transition-colors">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-extrabold text-blue-600 dark:text-blue-400 uppercase tracking-widest bg-blue-50 dark:bg-blue-950 px-3 py-1 rounded-full border border-blue-100 dark:border-blue-900/50">
              Campus Amenities
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-3">World-Class Hostel Infrastructure</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: ShieldCheck, title: '24/7 Biometric Security', desc: 'Round-the-clock security personnel, automated biometric gates, and total CCTV coverage across all building entry points.' },
              { icon: Wifi, title: '1 Gbps Fiber Wi-Fi', desc: 'Campus-wide seamless high-speed Wi-Fi with dedicated access points in every wing for uninterrupted study sessions.' },
              { icon: Utensils, title: 'Hygienic 4-Meal Mess', desc: 'Nutritious breakfast, lunch, evening tea & snacks, and dinner prepared in clean, modern stainless-steel kitchens.' },
              { icon: Clock, title: 'Digital Gate Pass System', desc: 'Apply for home or outstation leaves instantly through the student portal with automated SMS alert to parents.' },
              { icon: Award, title: '24h Maintenance Helpdesk', desc: 'Log room electrical, plumbing, or AC complaints directly from your phone for guaranteed 24-hour engineer resolution.' },
              { icon: BookOpen, title: 'Study & Recreation Lounges', desc: 'Quiet late-night reading rooms, gym equipment, table tennis, and lush green courtyards for relaxation.' }
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-800 hover:shadow-lg transition-all space-y-3 group">
                  <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-600/20 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">{item.title}</h3>
                  <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed font-normal">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mess Menu Section */}
      <section id="mess" className="py-16 bg-white dark:bg-slate-900 transition-colors">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-extrabold text-amber-600 dark:text-amber-400 uppercase tracking-widest bg-amber-50 dark:bg-amber-950 px-3 py-1 rounded-full border border-amber-200 dark:border-amber-900/50">
              Dining & Meals
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-3">Interactive Hostel Mess Menu</h2>

            {/* Day Selector */}
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map((day) => (
                <button
                  key={day}
                  onClick={() => setSelectedDayMenu(day)}
                  className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all ${
                    selectedDayMenu === day ? 'bg-blue-600 text-white shadow-md' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 max-w-4xl mx-auto shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 mb-6">
              <h3 className="font-bold text-slate-900 dark:text-white text-lg flex items-center gap-2">
                <Utensils className="w-5 h-5 text-blue-600" /> Meal Schedule for {selectedDayMenu}
              </h3>
              <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/80 px-3 py-1 rounded-full">
                100% Hygienic Meal Prep
              </span>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
                <span className="text-xs font-extrabold text-amber-600 dark:text-amber-400 uppercase flex items-center gap-1">
                  <Coffee className="w-3.5 h-3.5" /> Breakfast (07:30 AM)
                </span>
                <p className="text-slate-700 dark:text-slate-300 text-xs font-medium">{messMenuData[selectedDayMenu].breakfast}</p>
              </div>

              <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
                <span className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400 uppercase flex items-center gap-1">
                  <Utensils className="w-3.5 h-3.5" /> Lunch (12:30 PM)
                </span>
                <p className="text-slate-700 dark:text-slate-300 text-xs font-medium">{messMenuData[selectedDayMenu].lunch}</p>
              </div>

              <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
                <span className="text-xs font-extrabold text-indigo-600 dark:text-indigo-400 uppercase flex items-center gap-1">
                  <Coffee className="w-3.5 h-3.5" /> Evening Tea (05:00 PM)
                </span>
                <p className="text-slate-700 dark:text-slate-300 text-xs font-medium">{messMenuData[selectedDayMenu].snacks}</p>
              </div>

              <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
                <span className="text-xs font-extrabold text-blue-600 dark:text-blue-400 uppercase flex items-center gap-1">
                  <Star className="w-3.5 h-3.5" /> Dinner (08:00 PM)
                </span>
                <p className="text-slate-700 dark:text-slate-300 text-xs font-medium">{messMenuData[selectedDayMenu].dinner}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Notices */}
      <section id="announcements" className="py-16 bg-slate-100 dark:bg-slate-950 border-y border-slate-200 dark:border-slate-800 transition-colors">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-extrabold text-blue-600 dark:text-blue-400 uppercase tracking-widest">Warden Notices</span>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">Official Circulars & Bulletins</h2>
            </div>
            <Link to="/student" className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1">
              View All Notices in Student Portal &rarr;
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {announcements.map((ann) => (
              <div key={ann.id} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded ${
                    ann.type === 'Urgent' ? 'bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300' :
                    ann.type === 'Info' ? 'bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300' : 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                  }`}>
                    {ann.type}
                  </span>
                  <span className="text-xs text-slate-400 flex items-center gap-1 font-medium">
                    <Calendar className="w-3.5 h-3.5" /> {ann.date}
                  </span>
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white text-sm">{ann.title}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{ann.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section id="faqs" className="py-16 bg-white dark:bg-slate-900 transition-colors">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-10">
            <span className="text-xs font-extrabold text-blue-600 dark:text-blue-400 uppercase tracking-widest bg-blue-50 dark:bg-blue-950 px-3 py-1 rounded-full border border-blue-100 dark:border-blue-900/50">
              Student Helpdesk
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-3">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden bg-slate-50 dark:bg-slate-950">
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full p-5 text-left font-bold text-slate-900 dark:text-white text-sm flex justify-between items-center bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  <span>{faq.q}</span>
                  {activeFaq === idx ? <ChevronUp className="w-4 h-4 text-blue-600" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </button>
                {activeFaq === idx && (
                  <div className="p-5 text-xs text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer with Circular Logo */}
      <footer className="bg-slate-950 text-slate-400 text-xs py-12 border-t border-slate-900 mt-auto">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-white font-extrabold text-base">
                <div className="w-7 h-7 rounded-full overflow-hidden bg-blue-600 p-0.5 shrink-0 flex items-center justify-center border-0">
                  <img src={shardaLogo} alt="Sharda Logo" className="w-full h-full object-cover rounded-full" />
                </div>
                <span>Sharda University Agra Hostels</span>
              </div>
              <p className="text-slate-400 leading-relaxed text-[11px]">
                Providing safe, automated, transparent, and student-centered hostel management for academic excellence at Sharda University Agra.
              </p>
            </div>

            <div>
              <h4 className="text-white font-bold text-sm mb-3">Quick Navigation</h4>
              <ul className="space-y-2 text-[11px]">
                <li><Link to="/student" className="hover:text-white transition-colors">Student Portal</Link></li>
                <li><Link to="/login" className="hover:text-white transition-colors">Warden / Admin Login</Link></li>
                <li><Link to="/register" className="hover:text-white transition-colors">Student Registration</Link></li>
                <li><a href="#facilities" className="hover:text-white transition-colors">Campus Amenities</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold text-sm mb-3">Hostel Wings</h4>
              <ul className="space-y-2 text-[11px]">
                <li>Block A (Junior Boys Hostel)</li>
                <li>Block B (Senior Boys Hostel)</li>
                <li>Block C (Girls Main Wing)</li>
                <li>Block D (PG & International Wing)</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="text-white font-bold text-sm mb-3">Campus Warden Helpdesk</h4>
              <p className="flex items-center gap-2"><MapPin className="w-4 h-4 text-blue-500 shrink-0" /> Gate 2, Sharda University Agra</p>
              <p className="flex items-center gap-2"><Phone className="w-4 h-4 text-emerald-500 shrink-0" /> +91 562 2471000 / 01</p>
              <p className="flex items-center gap-2"><Mail className="w-4 h-4 text-amber-500 shrink-0" /> warden.office@sharda.ac.in</p>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-900 text-center flex flex-col md:flex-row items-center justify-between text-[11px]">
            <p>© 2026 Sharda University Agra. All Rights Reserved.</p>
            <p className="mt-2 md:mt-0 text-slate-500 font-medium">
              Designed by Ayush, Palak Saraswat, Anushka Upadhyay & Bhoomi Purushwani.
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
}
