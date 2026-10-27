import React, { useState } from 'react';
import { 
  X, 
  User, 
  Camera, 
  Phone, 
  Mail, 
  Building, 
  ShieldCheck, 
  Save, 
  CheckCircle2, 
  Sparkles,
  MapPin,
  Heart
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const PRESET_AVATARS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
  'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
];

export default function ProfileModal({ onClose, onProfileUpdated }) {
  const { user, institution, updateProfile } = useAuth();

  const isStudent = user?.role === 'student';
  const isWarden = user?.role === 'warden';

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    avatarUrl: user?.avatarUrl || PRESET_AVATARS[0],
    phone: isStudent ? (user?.student?.phone || '+91 9876543210') : (user?.warden?.helpline || '+91 9876543210'),
    guardianName: user?.student?.guardianName || 'Ramesh Sharma',
    guardianPhone: user?.student?.guardianPhone || '+91 9876543219',
    bloodGroup: user?.student?.bloodGroup || 'B+',
    address: 'Flat 402, Sharda Staff & Scholar Enclave, Agra',
  });

  const [customAvatar, setCustomAvatar] = useState('');
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updated = {
      name: formData.name,
      avatarUrl: formData.avatarUrl,
      student: isStudent ? {
        phone: formData.phone,
        guardianName: formData.guardianName,
        guardianPhone: formData.guardianPhone,
        bloodGroup: formData.bloodGroup,
      } : null,
      warden: isWarden ? {
        helpline: formData.phone,
      } : null,
    };

    updateProfile(updated);
    setSaved(true);
    if (onProfileUpdated) onProfileUpdated('Profile details and photo updated successfully!');
    setTimeout(() => {
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 max-w-lg w-full rounded-3xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 animate-in fade-in zoom-in-95 flex flex-col max-h-[90vh]">
        
        {/* Modal Top Banner */}
        <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-950 text-white p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-white/20 rounded-2xl backdrop-blur">
              <User className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm tracking-wide">University Resident Profile</h3>
              <p className="text-[10px] text-blue-200 font-bold uppercase tracking-wider">
                {institution?.name || 'Sharda University Agra'} • {user?.role?.toUpperCase()}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 hover:bg-white/20 rounded-xl text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5 text-xs text-slate-700 dark:text-slate-300">
          
          {/* Profile Photo Selector */}
          <div className="flex flex-col sm:flex-row items-center gap-4 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800">
            <div className="relative group">
              <img 
                src={formData.avatarUrl} 
                alt="Profile Preview" 
                className="w-20 h-20 rounded-full object-cover border-4 border-blue-600 shadow-md"
              />
              <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera className="w-5 h-5 text-white" />
              </div>
            </div>

            <div className="flex-1 space-y-2 text-center sm:text-left">
              <p className="font-bold text-slate-900 dark:text-white text-xs">Choose Profile Avatar / Photo</p>
              <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                {PRESET_AVATARS.map((url, i) => (
                  <button
                    type="button"
                    key={i}
                    onClick={() => setFormData({ ...formData, avatarUrl: url })}
                    className={`w-8 h-8 rounded-full overflow-hidden border-2 transition-transform hover:scale-110 ${
                      formData.avatarUrl === url ? 'border-blue-600 ring-2 ring-blue-500/50 scale-105' : 'border-slate-300 dark:border-slate-700'
                    }`}
                  >
                    <img src={url} alt={`Avatar ${i}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>

              {/* Custom Image URL input */}
              <div className="pt-1 flex gap-2">
                <input 
                  type="url"
                  placeholder="Or paste image URL..."
                  value={customAvatar}
                  onChange={(e) => setCustomAvatar(e.target.value)}
                  className="w-full px-2.5 py-1 text-[11px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:ring-1 focus:ring-blue-600"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (customAvatar) setFormData({ ...formData, avatarUrl: customAvatar });
                  }}
                  className="px-2.5 py-1 bg-slate-800 text-white font-bold rounded-lg text-[10px] hover:bg-slate-700"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>

          {/* Academic & Resident Info (Read Only Badges) */}
          <div className="grid grid-cols-2 gap-3 bg-blue-50/50 dark:bg-blue-950/20 p-4 rounded-2xl border border-blue-100 dark:border-blue-900/40 text-xs">
            <div>
              <span className="text-slate-400 block font-medium">Institution / Campus:</span>
              <span className="font-bold text-slate-900 dark:text-white">{institution?.name}</span>
            </div>
            <div>
              <span className="text-slate-400 block font-medium">Official ID / Roll No:</span>
              <span className="font-mono font-bold text-blue-600 dark:text-blue-400">
                {user?.student?.rollNumber || user?.username || '25ASETCSE019'}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block font-medium">Assigned Hostel:</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">
                {user?.student?.hostelName || user?.warden?.assignedHostel || 'Block B Senior Boys'}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block font-medium">Room Allocation:</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">
                {user?.student ? `Room ${user?.student?.room} (${user?.student?.bed})` : 'Warden Office'}
              </span>
            </div>
          </div>

          {/* Editable Contact Fields */}
          <div className="space-y-3">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
              <input 
                type="text" 
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-blue-600 font-semibold dark:text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Mobile Contact</label>
                <input 
                  type="text" 
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-blue-600 font-mono dark:text-white"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Blood Group</label>
                <select 
                  value={formData.bloodGroup}
                  onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-blue-600 font-bold dark:text-white"
                >
                  {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map(b => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>
            </div>

            {isStudent && (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Guardian / Parent Name</label>
                  <input 
                    type="text" 
                    required
                    value={formData.guardianName}
                    onChange={(e) => setFormData({ ...formData, guardianName: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-blue-600 font-medium dark:text-white"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Guardian Emergency Contact</label>
                  <input 
                    type="text" 
                    required
                    value={formData.guardianPhone}
                    onChange={(e) => setFormData({ ...formData, guardianPhone: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-blue-600 font-mono dark:text-white"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Permanent Residential Address</label>
              <input 
                type="text" 
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-blue-600 font-medium dark:text-white"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex justify-end gap-2 border-t border-slate-100 dark:border-slate-800">
            <button 
              type="button" 
              onClick={onClose}
              className="px-4 py-2.5 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-bold rounded-xl hover:bg-slate-50"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold rounded-xl shadow-md flex items-center gap-2 transition-all"
            >
              <Save className="w-4 h-4" />
              <span>{saved ? 'Updated!' : 'Save Profile Changes'}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
