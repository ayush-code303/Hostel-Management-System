import React, { useState, useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function Toast({ message, type = 'success', onClose, duration = 4000 }) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      if (onClose) onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [message, duration, onClose]);

  if (!message) return null;

  const bgStyles = {
    success: 'bg-emerald-600 text-white border-emerald-500 shadow-emerald-500/20',
    error: 'bg-rose-600 text-white border-rose-500 shadow-rose-500/20',
    info: 'bg-blue-600 text-white border-blue-500 shadow-blue-500/20',
    warning: 'bg-amber-600 text-white border-amber-500 shadow-amber-500/20'
  };

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 shrink-0" />,
    error: <AlertCircle className="w-5 h-5 shrink-0" />,
    info: <Info className="w-5 h-5 shrink-0" />,
    warning: <AlertCircle className="w-5 h-5 shrink-0" />
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 animate-bounce-in max-w-sm w-full p-1">
      <div className={`flex items-start justify-between gap-3 p-4 rounded-2xl border shadow-xl backdrop-blur-md ${bgStyles[type] || bgStyles.info} transition-all`}>
        <div className="flex items-start gap-3">
          {icons[type] || icons.info}
          <div className="text-xs">
            <p className="font-extrabold text-sm leading-tight">
              {type === 'success' ? 'Success' : type === 'error' ? 'Notice' : 'System Update'}
            </p>
            <p className="mt-0.5 font-medium opacity-90">{message}</p>
          </div>
        </div>
        <button 
          onClick={onClose}
          className="p-1 hover:bg-white/20 rounded-lg transition-colors text-white/80 hover:text-white"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
