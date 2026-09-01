import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Building2, Lock, Mail, UserCheck } from 'lucide-react';

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
    console.log('Logging in with:', formData);
    // Redirect based on role for prototype preview
    if (formData.role === 'admin' || formData.role === 'warden') {
      navigate('/admin');
    } else {
      navigate('/student/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
        {/* Header Banner */}
        <div className="bg-blue-600 p-6 text-center text-white">
          <div className="inline-flex bg-white/20 p-3 rounded-xl mb-3">
            <Building2 className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold">Hostel Portal Login</h2>
          <p className="text-blue-100 text-xs mt-1">Sharda University Agra - Hostel Management</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Role Selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase mb-2">Select User Role</label>
            <div className="grid grid-cols-3 gap-2">
              {['student', 'warden', 'admin'].map((roleOption) => (
                <button
                  type="button"
                  key={roleOption}
                  onClick={() => setFormData({ ...formData, role: roleOption })}
                  className={`py-2 text-xs font-bold uppercase rounded-lg border transition-all ${
                    formData.role === roleOption
                      ? 'bg-blue-50 border-blue-600 text-blue-600 shadow-sm'
                      : 'border-slate-200 text-slate-500 hover:border-slate-300'
                  }`}
                >
                  {roleOption}
                </button>
              ))}
            </div>
          </div>

          {/* Email Input */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-5 h-5 text-slate-400 absolute left-3 top-3" />
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="student@sharda.ac.in"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Password</label>
            <div className="relative">
              <Lock className="w-5 h-5 text-slate-400 absolute left-3 top-3" />
              <input
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-lg shadow-sm transition-colors flex items-center justify-center space-x-2"
          >
            <UserCheck className="w-4 h-4" />
            <span>Login to Account</span>
          </button>

          {/* Registration Link */}
          <p className="text-center text-xs text-slate-500 pt-2">
            Don't have a student account?{' '}
            <Link to="/register" className="text-blue-600 font-semibold hover:underline">
              Register Here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
