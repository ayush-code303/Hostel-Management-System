import React, { useState } from 'react';
import { 
  X, 
  Mail, 
  Send, 
  CheckCircle2, 
  ShieldCheck, 
  Calendar, 
  Clock, 
  FileText, 
  Printer, 
  Loader2 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function EmailDispatchModal({ leaveData, onClose, onSent }) {
  const { user, institution } = useAuth();
  const [sending, setSending] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);

  const studentName = leaveData?.student || 'Ayush';
  const rollNumber = leaveData?.rollNo || '25ASETCSE019';
  const passId = leaveData?.gatePassCode || leaveData?.id || 'PASS-SUA-2026-904';
  const dates = leaveData?.dates || '24 Oct 2026 - 26 Oct 2026';
  const reason = leaveData?.reason || 'Home Visit Weekend';
  const parentContact = leaveData?.parent || '+91 9876543210';

  const wardenEmail = user?.email || `warden.${institution?.id?.toLowerCase() || 'sua'}@sharda.ac.in`;
  const studentEmail = `${rollNumber.toLowerCase()}@${institution?.id?.toLowerCase() || 'sua'}.ac.in`;

  const handleSendEmail = async () => {
    setSending(true);
    // Simulate real SMTP dispatch handshake
    await new Promise(r => setTimeout(r, 1200));
    setSending(false);
    setSentSuccess(true);
    if (onSent) onSent(`Official email clearance dispatched to ${studentEmail} and Guardian!`);
    setTimeout(() => {
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 max-w-xl w-full rounded-3xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 animate-in fade-in zoom-in-95 flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-white/20 rounded-2xl backdrop-blur">
              <Mail className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm tracking-wide">Official Warden Email Dispatch</h3>
              <p className="text-[10px] text-blue-200 font-bold uppercase tracking-wider">
                Automated Student & Guardian Clearance Notification
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 hover:bg-white/20 rounded-xl text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Email Preview Body */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs text-slate-700 dark:text-slate-300">
          
          {/* Email Headers Meta */}
          <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-2 font-mono text-[11px]">
            <div className="flex">
              <span className="w-16 text-slate-400 font-bold">FROM:</span>
              <span className="font-bold text-slate-900 dark:text-white">
                Warden Office &lt;{wardenEmail}&gt;
              </span>
            </div>
            <div className="flex">
              <span className="w-16 text-slate-400 font-bold">TO:</span>
              <span className="text-blue-600 dark:text-blue-400 font-bold">
                {studentName} &lt;{studentEmail}&gt;
              </span>
            </div>
            <div className="flex">
              <span className="w-16 text-slate-400 font-bold">CC:</span>
              <span className="text-slate-600 dark:text-slate-300">
                Guardian Registered Contact ({parentContact})
              </span>
            </div>
            <div className="flex">
              <span className="w-16 text-slate-400 font-bold">SUBJECT:</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">
                [OFFICIAL CLEARANCE] Outstation Gate Pass Approved #{passId} - {institution?.name}
              </span>
            </div>
          </div>

          {/* Formatted Letter Body */}
          <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-inner space-y-3 font-sans leading-relaxed">
            <div className="border-b border-slate-200 dark:border-slate-800 pb-2 flex justify-between items-center">
              <div>
                <h4 className="font-black text-slate-900 dark:text-white text-xs uppercase tracking-wide">
                  {institution?.name || 'SHARDA UNIVERSITY AGRA'}
                </h4>
                <p className="text-[10px] text-slate-500">OFFICE OF THE CHIEF HOSTEL WARDEN</p>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-100 text-emerald-800 font-extrabold">
                ● AUTHORIZED
              </span>
            </div>

            <p className="text-xs text-slate-800 dark:text-slate-200">
              Dear <strong>{studentName}</strong> (Roll No: <span className="font-mono text-blue-600">{rollNumber}</span>),
            </p>

            <p className="text-slate-600 dark:text-slate-300 text-xs">
              This is to formally notify you and your guardian that your request for <strong>Outstation Leave</strong> has been reviewed and <strong className="text-emerald-600">APPROVED</strong> by the Hostel Warden Secretariat.
            </p>

            <div className="bg-slate-50 dark:bg-slate-800/80 p-3 rounded-xl border border-slate-200/80 dark:border-slate-700 space-y-1.5 text-[11px]">
              <div className="flex justify-between">
                <span className="text-slate-500">Digital Gate Pass ID:</span>
                <span className="font-mono font-bold text-blue-600 dark:text-blue-400">{passId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Authorized Dates:</span>
                <span className="font-semibold">{dates}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Reason of Absence:</span>
                <span>{reason}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Security Gate Scanners:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">Main Gate 1 & Gate 2 Checkpoints</span>
              </div>
            </div>

            <p className="text-[11px] text-slate-500 italic">
              * Note for Security: Please scan the dynamic SVG QR Code from the Student Residence Portal at the checkpoint upon entry and exit.
            </p>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-between items-end text-[11px]">
              <div>
                <p className="font-bold text-slate-900 dark:text-white">{user?.name || 'Prof. Virendra Verma'}</p>
                <p className="text-slate-500">Hostel Warden & Safety Incharge</p>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">
                Digitally Stamped: {new Date().toLocaleDateString()}
              </span>
            </div>
          </div>

          {/* Action Footer */}
          <div className="pt-2 flex justify-end gap-2 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              disabled={sending}
              className="px-4 py-2.5 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-bold rounded-xl hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSendEmail}
              disabled={sending || sentSuccess}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-xl shadow-md transition-all flex items-center gap-2"
            >
              {sending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Transmitting via SMTP...</span>
                </>
              ) : sentSuccess ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                  <span>Email Dispatched!</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Dispatch Email Notification</span>
                </>
              )}
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
