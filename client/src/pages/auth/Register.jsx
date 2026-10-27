import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  User, 
  Mail, 
  Lock, 
  Phone, 
  ArrowLeft, 
  Building2, 
  DoorOpen, 
  ShieldCheck 
} from 'lucide-react';
import { ThemeToggleButton, AccessibilityToolbar } from '../../context/ThemeContext';
import { INSTITUTIONS } from '../../services/multiCollegeData';
import shardaLogo from '../../assets/sharda_logo.png';

export default function Register() {
  const navigate = useNavigate();
  const [selectedInst, setSelectedInst] = useState('SUA');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rollNumber: '',
    phone: '',
    department: 'Computer Science & Engineering',
    hostelBlock: 'Nelson Mandela Boys Hostel (Block B)',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const currentInstitution = INSTITUTIONS[selectedInst] || INSTITUTIONS['SUA'];

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Registration successful for ${currentInstitution.name}! Please login with your student ID: ${formData.rollNumber || '25ASETCSE019'}`);
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col justify-between transition-colors duration-300">
      
      {/* Top Header */}
      <div className="bg-slate-900 text-slate-300 text-[11px] border-b border-slate-800 px-4 py-2 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
          <span className="font-bold text-white tracking-wide">
            NATIONAL RESIDENCE REGISTRY • SCHOLAR ENROLLMENT
          </span>
        </div>
        <div className="flex items-center gap-3">
          <AccessibilityToolbar />
          <ThemeToggleButton />
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 flex-1 flex flex-col justify-center items-center">
        
        <div className="w-full max-w-lg mb-3 flex justify-between items-center text-xs">
          <Link to="/login" className="inline-flex items-center gap-1.5 font-bold text-blue-600 dark:text-blue-400 hover:underline">
            <ArrowLeft className="w-4 h-4" /> Already have an account? Login
          </Link>
          <span className="text-slate-400">Hostel Allocation Form</span>
        </div>

        {/* Register Card */}
        <div className="max-w-lg w-full bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95">
          
          <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-950 p-6 text-center text-white space-y-2">
            <div className="w-12 h-12 bg-white/20 rounded-full overflow-hidden p-0.5 mx-auto shadow-md border border-white/30 flex items-center justify-center shrink-0">
              <img src={shardaLogo} alt="Seal" className="w-full h-full object-cover rounded-full" />
            </div>
            <h2 className="text-xl font-black">Resident Scholar Registration</h2>
            <p className="text-blue-200 text-xs">Apply for Campus Residence & Hostel Bed Allotment</p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
            
            {/* Institution Selector */}
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                Select Your University / College
              </label>
              <div className="relative">
                <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <select
                  value={selectedInst}
                  onChange={(e) => setSelectedInst(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-blue-600 font-bold dark:text-white"
                >
                  {Object.values(INSTITUTIONS).map(inst => (
                    <option key={inst.id} value={inst.id}>{inst.name} ({inst.campusCode})</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Full Name & Roll Number */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Scholar Full Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="e.g. Ayush"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-blue-600 font-medium dark:text-white"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">University Roll Number</label>
                <input
                  type="text"
                  name="rollNumber"
                  required
                  placeholder="e.g. 25ASETCSE019"
                  value={formData.rollNumber}
                  onChange={handleChange}
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-blue-600 font-mono font-bold dark:text-white uppercase"
                />
              </div>
            </div>

            {/* Department & Hostel Wing */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Academic Department</label>
                <input
                  type="text"
                  name="department"
                  required
                  value={formData.department}
                  onChange={handleChange}
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-blue-600 font-medium dark:text-white"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Preferred Hostel Wing</label>
                <select
                  name="hostelBlock"
                  value={formData.hostelBlock}
                  onChange={handleChange}
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-blue-600 font-semibold dark:text-white text-[11px]"
                >
                  {currentInstitution.hostels.map(h => (
                    <option key={h.id} value={h.name}>{h.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Email & Phone */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Institutional Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="student@university.ac.in"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-blue-600 font-medium dark:text-white"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Mobile Contact</label>
                <input
                  type="text"
                  name="phone"
                  required
                  placeholder="+91 9876543210"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-blue-600 font-mono dark:text-white"
                />
              </div>
            </div>

            {/* Password */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Password</label>
                <input
                  type="password"
                  name="password"
                  required
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-blue-600 font-medium dark:text-white"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  required
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-blue-600 font-medium dark:text-white"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-extrabold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              <span>Submit Registration & Request Bed Allotment</span>
            </button>

          </form>

        </div>

      </div>

      <footer className="text-center py-4 text-xs text-slate-400 border-t border-slate-200 dark:border-slate-800">
        © 2026 National Campus Residence ERP • Central Higher Education Directorate
      </footer>

    </div>
  );
}
