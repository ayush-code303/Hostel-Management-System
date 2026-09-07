import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, 
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
  Bell, 
  CheckCircle2,
  Calendar,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Bed,
  Users,
  Star,
  Coffee,
  Check
} from 'lucide-react';

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
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">

      {/* Top Banner Notice Ticker */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-blue-100 text-xs py-2 px-4 border-b border-blue-800/60 sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3 overflow-hidden">
            <span className="bg-blue-600 text-white font-bold px-2 py-0.5 rounded text-[10px] uppercase tracking-wider shrink-0 animate-pulse">
              ★ Official Announcement
            </span>
            <p className="truncate text-slate-200">
              📢 Academic Year 2026-27 Hostel Room Allotment is now active! All resident scholars must complete digital verification before Sept 15.
            </p>
          </div>
          <div className="hidden lg:flex items-center space-x-5 text-[11px] shrink-0 text-blue-200">
            <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-blue-400" /> Helpline: +91 562 2471000</span>
            <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-emerald-400" /> hostel@sharda.ac.in</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header className="bg-white/90 backdrop-blur-md sticky top-[33px] z-40 border-b border-slate-200/80 shadow-sm">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          
          {/* Logo & University Brand */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-600/30 animate-float-slow">
                <Building2 className="w-6 h-6" />
              </div>
              <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white"></span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-extrabold text-slate-900 leading-none">Sharda University Agra</h1>
                <span className="text-[10px] bg-blue-100 text-blue-700 font-bold px-1.5 py-0.5 rounded">PBL Project</span>
              </div>
              <p className="text-xs text-blue-600 font-semibold tracking-wide uppercase mt-0.5">Hostel & Residence Life Portal</p>
            </div>
          </div>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center space-x-8 text-sm font-semibold text-slate-600">
            <a href="#about" className="hover:text-blue-600 transition-colors">Hostel Blocks</a>
            <a href="#facilities" className="hover:text-blue-600 transition-colors">Amenities</a>
            <a href="#mess" className="hover:text-blue-600 transition-colors">Mess Menu</a>
            <a href="#announcements" className="hover:text-blue-600 transition-colors">Notice Board</a>
            <a href="#faqs" className="hover:text-blue-600 transition-colors">FAQ</a>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center space-x-3">
            <Link 
              to="/student" 
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-xl transition-all border border-blue-200/80 shadow-sm"
            >
              <UserCheck className="w-4 h-4 text-blue-600" />
              Student Portal
            </Link>
            <Link 
              to="/login" 
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-xl shadow-md shadow-blue-500/20 hover:shadow-lg transition-all"
            >
              Login Access <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section with Glassmorphism & High Res Campus Background */}
      <section className="relative bg-slate-950 text-white py-20 lg:py-28 overflow-hidden">
        {/* Background Image with Dark Vignette Overlay */}
        <div 
          className="absolute inset-0 opacity-25 bg-cover bg-center scale-105 transition-transform duration-10000 hover:scale-100"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1600&q=80')` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent"></div>
        <div className="absolute top-1/4 right-10 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px] pointer-events-none animate-pulse-glow"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero Text Left */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold backdrop-blur-md animate-float">
                <Sparkles className="w-4 h-4 text-blue-400 animate-spin" />
                <span>Next-Gen Smart Campus Residence System</span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-none">
                Modern, Safe & <br />
                <span className="shimmer-text">Smart Hostel Living</span>
              </h1>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl font-normal">
                Welcome to the official digital residence portal of Sharda University Agra. Manage your room allotments, track term fees, apply for digital outstation gate passes, lodge 24-hr maintenance tickets, and access real-time warden notices.
              </p>

              <div className="pt-3 flex flex-wrap justify-center lg:justify-start gap-4">
                <Link 
                  to="/student"
                  className="px-7 py-3.5 text-sm font-bold rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-xl shadow-blue-600/30 hover:shadow-blue-600/50 transition-all flex items-center gap-2 transform hover:-translate-y-0.5"
                >
                  <UserCheck className="w-4 h-4" /> Open Student Portal
                </Link>
                <Link 
                  to="/admin" 
                  className="px-7 py-3.5 text-sm font-bold rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-md transition-all flex items-center gap-2 transform hover:-translate-y-0.5"
                >
                  Warden & Admin Desk
                </Link>
              </div>

              {/* 4 Animated Live Stats */}
              <div className="pt-10 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center lg:text-left">
                <div>
                  <h3 className="text-3xl font-extrabold text-white">1,250+</h3>
                  <p className="text-xs text-blue-300 font-medium">Resident Scholars</p>
                </div>
                <div>
                  <h3 className="text-3xl font-extrabold text-white">4 Blocks</h3>
                  <p className="text-xs text-indigo-300 font-medium">Boys & Girls Wings</p>
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

            {/* Hero Interactive Floating Card Right */}
            <div className="lg:col-span-5">
              <div className="glass-panel-dark rounded-3xl p-6 shadow-2xl space-y-4 border border-white/15 relative overflow-hidden">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div className="flex items-center space-x-2">
                    <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping"></span>
                    <span className="text-xs font-bold text-white uppercase tracking-wider">Live System Preview</span>
                  </div>
                  <span className="text-[10px] bg-blue-500/30 text-blue-200 border border-blue-400/30 px-2 py-0.5 rounded-full font-mono">
                    v1.0 Ready
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="bg-slate-900/80 p-4 rounded-2xl border border-white/10 hover:border-blue-400/40 transition-all flex items-center justify-between group">
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

                  <div className="bg-slate-900/80 p-4 rounded-2xl border border-white/10 hover:border-emerald-400/40 transition-all flex items-center justify-between group">
                    <div className="flex items-center space-x-3.5">
                      <div className="p-2.5 bg-emerald-600/30 text-emerald-400 rounded-xl group-hover:scale-110 transition-transform">
                        <Clock className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-bold text-white text-xs">Outstation Gate Pass</p>
                        <p className="text-slate-400 text-[11px]">Digital Approval & SMS Notice</p>
                      </div>
                    </div>
                    <Link to="/student" className="text-emerald-400 font-bold text-xs group-hover:translate-x-1 transition-transform">
                      Apply &rarr;
                    </Link>
                  </div>

                  <div className="bg-slate-900/80 p-4 rounded-2xl border border-white/10 hover:border-amber-400/40 transition-all flex items-center justify-between group">
                    <div className="flex items-center space-x-3.5">
                      <div className="p-2.5 bg-amber-600/30 text-amber-400 rounded-xl group-hover:scale-110 transition-transform">
                        <Award className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-bold text-white text-xs">Maintenance Triage</p>
                        <p className="text-slate-400 text-[11px]">Electrical, AC & Plumbing 24h</p>
                      </div>
                    </div>
                    <Link to="/student" className="text-amber-400 font-bold text-xs group-hover:translate-x-1 transition-transform">
                      Lodge &rarr;
                    </Link>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400 px-1">
                  <span>⚡ 100% Client Prototype Ready</span>
                  <span className="text-blue-400 font-medium">Click any module to test!</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Interactive Hostel Category Explorer */}
      <section id="about" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-extrabold text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
              Hostel Accommodation
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 mt-3">Explore Resident Blocks & Rooms</h2>
            <p className="text-slate-600 text-sm mt-2">
              Spacious, well-ventilated rooms fitted with modern study desks, individual almirahs, high-speed Wi-Fi, and 24/7 power backup.
            </p>

            {/* Interactive Tab Selector */}
            <div className="mt-6 inline-flex p-1.5 bg-slate-100 rounded-2xl border border-slate-200">
              <button
                onClick={() => setSelectedHostelTab('boys')}
                className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedHostelTab === 'boys' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Boys Hostel (Block A & B)
              </button>
              <button
                onClick={() => setSelectedHostelTab('girls')}
                className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedHostelTab === 'girls' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Girls Hostel (Block C)
              </button>
              <button
                onClick={() => setSelectedHostelTab('pg')}
                className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedHostelTab === 'pg' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                PG / Single AC Wing
              </button>
            </div>
          </div>

          {/* Active Hostel Display Card */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-3xl p-6 lg:p-8 shadow-sm">
            <div className="grid lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-6 relative group overflow-hidden rounded-2xl">
                <img 
                  src={hostelTypes[selectedHostelTab].image} 
                  alt={hostelTypes[selectedHostelTab].title}
                  className="w-full h-72 lg:h-80 object-cover rounded-2xl group-hover:scale-105 transition-transform duration-700"
                />
                <span className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur text-white text-xs font-bold px-3 py-1 rounded-full border border-white/20">
                  {hostelTypes[selectedHostelTab].capacity}
                </span>
              </div>

              <div className="lg:col-span-6 space-y-4">
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md uppercase tracking-wider">
                  ● Admissions Open 2026-27
                </span>
                <h3 className="text-2xl font-bold text-slate-900">{hostelTypes[selectedHostelTab].title}</h3>
                <p className="text-xs text-slate-600 font-medium">
                  Configured with ergonomically designed student study units, individual lockable wardrobes, attached or floor-level luxury washrooms, and high-speed LAN ports.
                </p>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-3 bg-white rounded-xl border border-slate-200">
                    <span className="text-[11px] text-slate-400 block font-medium">Room Type</span>
                    <span className="text-xs font-bold text-slate-800">{hostelTypes[selectedHostelTab].sharing}</span>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-slate-200">
                    <span className="text-[11px] text-slate-400 block font-medium">Annual Term Fee</span>
                    <span className="text-xs font-bold text-blue-600">{hostelTypes[selectedHostelTab].fee}</span>
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <p className="text-xs font-bold text-slate-700">Included Amenities:</p>
                  <div className="grid grid-cols-2 gap-2 text-xs text-slate-600">
                    {hostelTypes[selectedHostelTab].features.map((feat, idx) => (
                      <span key={idx} className="flex items-center gap-1.5">
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
      <section id="facilities" className="py-16 bg-slate-100 border-y border-slate-200">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-extrabold text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
              Campus Experience
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 mt-3">World-Class Hostel Facilities</h2>
            <p className="text-slate-600 text-sm mt-2">
              Everything resident students need for academic success, health, safety, and a thriving campus community.
            </p>
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
                <div key={idx} className="p-6 bg-white rounded-2xl border border-slate-200/80 hover:border-blue-300 hover:shadow-lg transition-all space-y-3 group">
                  <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-600/20 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
                  <p className="text-slate-600 text-xs leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Interactive Weekly Mess Menu Section */}
      <section id="mess" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-extrabold text-emerald-600 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
              Dining & Nutrition
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 mt-3">Interactive Hostel Mess Menu</h2>
            <p className="text-slate-600 text-sm mt-2">
              Supervised by certified student mess committees to ensure high nutritional standards and delicious daily meals.
            </p>

            {/* Day Selector */}
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map((day) => (
                <button
                  key={day}
                  onClick={() => setSelectedDayMenu(day)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    selectedDayMenu === day ? 'bg-emerald-600 text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 max-w-4xl mx-auto shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-6">
              <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2">
                <Utensils className="w-5 h-5 text-emerald-600" /> Meal Schedule for {selectedDayMenu}
              </h3>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
                100% Hygienic Vegetarian Options
              </span>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-2">
                <span className="text-xs font-extrabold text-amber-600 uppercase flex items-center gap-1">
                  <Coffee className="w-3.5 h-3.5" /> Breakfast (07:30 AM)
                </span>
                <p className="text-slate-700 text-xs font-medium">{messMenuData[selectedDayMenu].breakfast}</p>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-2">
                <span className="text-xs font-extrabold text-emerald-600 uppercase flex items-center gap-1">
                  <Utensils className="w-3.5 h-3.5" /> Lunch (12:30 PM)
                </span>
                <p className="text-slate-700 text-xs font-medium">{messMenuData[selectedDayMenu].lunch}</p>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-2">
                <span className="text-xs font-extrabold text-indigo-600 uppercase flex items-center gap-1">
                  <Coffee className="w-3.5 h-3.5" /> Evening Tea (05:00 PM)
                </span>
                <p className="text-slate-700 text-xs font-medium">{messMenuData[selectedDayMenu].snacks}</p>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-2">
                <span className="text-xs font-extrabold text-blue-600 uppercase flex items-center gap-1">
                  <Star className="w-3.5 h-3.5" /> Dinner (08:00 PM)
                </span>
                <p className="text-slate-700 text-xs font-medium">{messMenuData[selectedDayMenu].dinner}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Announcements & Notices */}
      <section id="announcements" className="py-16 bg-slate-100 border-y border-slate-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-extrabold text-blue-600 uppercase tracking-widest">Warden Notices</span>
              <h2 className="text-2xl font-bold text-slate-900 mt-1">Official Circulars & Bulletins</h2>
            </div>
            <Link to="/student" className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1">
              View All Notices in Student Portal &rarr;
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {announcements.map((ann) => (
              <div key={ann.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded ${
                    ann.type === 'Urgent' ? 'bg-red-100 text-red-700' :
                    ann.type === 'Info' ? 'bg-blue-100 text-blue-700' : 'bg-emerald-100 text-emerald-700'
                  }`}>
                    {ann.type}
                  </span>
                  <span className="text-xs text-slate-400 flex items-center gap-1 font-medium">
                    <Calendar className="w-3.5 h-3.5" /> {ann.date}
                  </span>
                </div>
                <h3 className="font-bold text-slate-900 text-sm">{ann.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{ann.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive FAQ Accordion */}
      <section id="faqs" className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-10">
            <span className="text-xs font-extrabold text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full">
              Student Helpdesk
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 mt-3">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border border-slate-200 rounded-2xl overflow-hidden bg-slate-50">
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full p-5 text-left font-bold text-slate-800 text-sm flex justify-between items-center bg-white hover:bg-slate-50 transition-colors"
                >
                  <span>{faq.q}</span>
                  {activeFaq === idx ? <ChevronUp className="w-4 h-4 text-blue-600" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </button>
                {activeFaq === idx && (
                  <div className="p-5 text-xs text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 text-xs py-12 border-t border-slate-800 mt-auto">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-white font-extrabold text-base">
                <Building2 className="w-5 h-5 text-blue-500" />
                <span>Sharda University Hostels</span>
              </div>
              <p className="text-slate-400 leading-relaxed text-[11px]">
                Providing safe, automated, transparent, and student-centered hostel management for academic excellence.
              </p>
            </div>

            <div>
              <h4 className="text-white font-semibold text-sm mb-3">Quick Links</h4>
              <ul className="space-y-2 text-[11px]">
                <li><Link to="/student" className="hover:text-white transition-colors">Student Portal</Link></li>
                <li><Link to="/login" className="hover:text-white transition-colors">Warden / Admin Login</Link></li>
                <li><Link to="/register" className="hover:text-white transition-colors">Student Registration</Link></li>
                <li><a href="#facilities" className="hover:text-white transition-colors">Campus Amenities</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold text-sm mb-3">Hostel Wings</h4>
              <ul className="space-y-2 text-[11px]">
                <li>Block A (Junior Boys Hostel)</li>
                <li>Block B (Senior Boys Hostel)</li>
                <li>Block C (Girls Main Wing)</li>
                <li>Block D (PG & International Wing)</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="text-white font-semibold text-sm mb-3">Campus Warden Helpdesk</h4>
              <p className="flex items-center gap-2"><MapPin className="w-4 h-4 text-blue-500 shrink-0" /> Gate 2, Sharda University Agra</p>
              <p className="flex items-center gap-2"><Phone className="w-4 h-4 text-emerald-500 shrink-0" /> +91 562 2471000 / 01</p>
              <p className="flex items-center gap-2"><Mail className="w-4 h-4 text-amber-500 shrink-0" /> warden.office@sharda.ac.in</p>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-900 text-center flex flex-col md:flex-row items-center justify-between text-[11px]">
            <p>© 2026 Sharda University Agra. All Rights Reserved.</p>
            <p className="mt-2 md:mt-0 text-slate-500 font-medium">
              Frontend Module Designed by Ayush, Palak Saraswat, Anushka Upadhyay & Bhoomi Purushwani.
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
}
