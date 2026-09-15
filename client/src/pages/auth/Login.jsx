import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, Mail, UserCheck, ArrowLeft } from 'lucide-react';
import { ThemeToggleButton } from '../../context/ThemeContext';
import shardaLogo from '../../assets/sharda_logo.png';

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'student'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.role === 'admin' || formData.role === 'warden') {
      navigate('/admin');
    } else {
      navigate('/student');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col justify-between p-4 transition-colors duration-300">
      
      {/* Top Navbar */}
      <header className="container mx-auto flex items-center justify-between py-2">
        <Link to="/" className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline">
          <ArrowLeft className="w-4 h-4" /> Back to Sharda Homepage
        </Link>
        <ThemeToggleButton />
      </header>

      {/* Main Login Card */}
      <div className="max-w-md w-full mx-auto bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-2xl overflow-hidden my-auto">
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-950 p-6 text-center text-white space-y-2">
          {/* Borderless Circular Logo */}
          <div className="w-14 h-14 bg-blue-600 rounded-full overflow-hidden p-0.5 mx-auto shadow-md border-0 flex items-center justify-center shrink-0">
            <img src={shardaLogo} alt="Sharda Logo" className="w-full h-full object-cover rounded-full" />
          </div>
          <h2 className="text-2xl font-black">Sharda Portal Login</h2>
          <p className="text-blue-100 text-xs font-medium">Sharda University Agra - Residence Life</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Role Selector */}
          <div>
            <label className="block text-xs font-extrabold text-slate-600 dark:text-slate-400 uppercase mb-2">
              Select User Role
            </label>
            <div className="grid grid-cols-3 gap-2">
              {['student', 'warden', 'admin'].map((roleOption) => (
                <button
                  type="button"
                  key={roleOption}
                  onClick={() => setFormData({ ...formData, role: roleOption })}
                  className={`py-2 text-xs font-extrabold uppercase rounded-xl border transition-all ${
                    formData.role === roleOption
                      ? 'bg-blue-50 dark:bg-blue-950 border-blue-600 text-blue-600 dark:text-blue-400 shadow-sm'
                      : 'border-slate-200 dark:border-slate-700 text-slate-500 hover:border-slate-300 dark:hover:border-slate-600'
                  }`}
                >
                  {roleOption}
                </button>
              ))}
            </div>
          </div>

          {/* Email Input */}
          <div>
            <label className="block text-xs font-extrabold text-slate-600 dark:text-slate-400 uppercase mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="student@sharda.ac.in"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:ring-2 focus:ring-blue-600 outline-none font-medium dark:text-white"
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-xs font-extrabold text-slate-600 dark:text-slate-400 uppercase mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:ring-2 focus:ring-blue-600 outline-none font-medium dark:text-white"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl shadow-md transition-colors flex items-center justify-center space-x-2"
          >
            <UserCheck className="w-4 h-4" />
            <span>Login to Account</span>
          </button>

          {/* Registration Link */}
          <p className="text-center text-xs text-slate-500 dark:text-slate-400 pt-2 font-medium">
            Don't have a student account?{' '}
            <Link to="/register" className="text-blue-600 dark:text-blue-400 font-extrabold hover:underline">
              Register Here
            </Link>
          </p>
        </form>
      </div>

      <footer className="text-center text-[11px] text-slate-400 py-2">
        © 2026 Sharda University Agra. All Rights Reserved.
      </footer>
    </div>
  );
}
