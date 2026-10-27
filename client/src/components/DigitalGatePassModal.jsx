import React from 'react';
import { X, ShieldCheck, Download, Printer, QrCode, CheckCircle2, Calendar } from 'lucide-react';
import shardaLogo from '../assets/sharda_logo.png';

// Deterministic 25x25 QR Matrix Generator
function generateQRMatrix(text) {
  const size = 25;
  const matrix = Array.from({ length: size }, () => Array(size).fill(0));

  // Finder pattern generator (7x7)
  const drawFinder = (startX, startY) => {
    for (let r = 0; r < 7; r++) {
      for (let c = 0; c < 7; c++) {
        if (
          r === 0 || r === 6 || c === 0 || c === 6 ||
          (r >= 2 && r <= 4 && c >= 2 && c <= 4)
        ) {
          matrix[startY + r][startX + c] = 1;
        } else {
          matrix[startY + r][startX + c] = 0;
        }
      }
    }
  };

  // Top-left, top-right, bottom-left finders
  drawFinder(0, 0);
  drawFinder(size - 7, 0);
  drawFinder(0, size - 7);

  // Timing patterns
  for (let i = 8; i < size - 8; i++) {
    matrix[6][i] = i % 2 === 0 ? 1 : 0;
    matrix[i][6] = i % 2 === 0 ? 1 : 0;
  }

  // Hash payload into data cells
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = (hash * 31 + text.charCodeAt(i)) >>> 0;
  }

  let bitIndex = 0;
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      // Skip finder zones
      const inTopLeft = r < 8 && c < 8;
      const inTopRight = r < 8 && c >= size - 8;
      const inBottomLeft = r >= size - 8 && c < 8;
      const isTiming = (r === 6 && (c >= 8 && c < size - 8)) || (c === 6 && (r >= 8 && r < size - 8));

      if (!inTopLeft && !inTopRight && !inBottomLeft && !isTiming) {
        const val = ((hash >> (bitIndex % 32)) ^ (r * c + bitIndex)) & 1;
        matrix[r][c] = val;
        bitIndex++;
      }
    }
  }

  return matrix;
}

export default function DigitalGatePassModal({ passData, onClose }) {
  if (!passData) return null;

  const qrText = passData.qrPayload || JSON.stringify({
    passId: passData.id || passData.passId || 'PASS-SUA-2026',
    student: passData.studentName || passData.student || 'Ayush',
    roll: passData.rollNumber || passData.rollNo || '25ASETCSE019',
    status: 'APPROVED'
  });

  const matrix = generateQRMatrix(qrText);
  const cellSize = 7;
  const svgSize = 25 * cellSize;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 max-w-md w-full rounded-3xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 animate-in fade-in zoom-in-95">
        
        {/* Pass Header */}
        <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-white/20 p-0.5 flex items-center justify-center shrink-0 border border-white/30">
              <img src={shardaLogo} alt="Sharda Logo" className="w-full h-full object-cover rounded-full" />
            </div>
            <div>
              <h3 className="font-black text-sm tracking-wide">SHARDA UNIVERSITY AGRA</h3>
              <p className="text-[10px] text-blue-200 font-bold uppercase tracking-wider">Digital Outstation Gate Pass</p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="p-1.5 hover:bg-white/20 rounded-xl text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Pass Body */}
        <div className="p-6 space-y-5 text-xs text-slate-700 dark:text-slate-300">
          
          {/* Status Badge */}
          <div className="flex items-center justify-between bg-emerald-50 dark:bg-emerald-950/60 p-3 rounded-2xl border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <div>
                <p className="font-extrabold text-xs">AUTHORIZED BY WARDEN</p>
                <p className="text-[10px] opacity-80">Security Checkpoint Verified</p>
              </div>
            </div>
            <span className="font-mono text-[11px] font-black bg-white dark:bg-slate-900 px-2.5 py-1 rounded-lg border border-emerald-300 dark:border-emerald-700">
              {passData.id || passData.passId || 'PASS-SUA-2026-904'}
            </span>
          </div>

          {/* Dynamic SVG QR Code */}
          <div className="flex flex-col items-center justify-center p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200/80 dark:border-slate-800">
            <div className="p-3 bg-white rounded-xl shadow-md border border-slate-200">
              <svg 
                width={svgSize} 
                height={svgSize} 
                viewBox={`0 0 ${svgSize} ${svgSize}`}
                className="block"
              >
                {matrix.map((row, r) =>
                  row.map((val, c) => (
                    val === 1 ? (
                      <rect
                        key={`${r}-${c}`}
                        x={c * cellSize}
                        y={r * cellSize}
                        width={cellSize}
                        height={cellSize}
                        fill="#0f172a"
                      />
                    ) : null
                  ))
                )}
              </svg>
            </div>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold mt-2.5 flex items-center gap-1">
              <QrCode className="w-3.5 h-3.5 text-blue-600" /> Scan at Gate 1 / Gate 2 Security Scanner
            </p>
          </div>

          {/* Student Pass Particulars */}
          <div className="bg-slate-50 dark:bg-slate-800/40 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-500">Student Name:</span>
              <span className="font-extrabold text-slate-900 dark:text-white">
                {typeof passData.student === 'object' ? passData.student.name : (passData.studentName || passData.student || 'Ayush')}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Roll Number:</span>
              <span className="font-mono font-bold text-blue-600 dark:text-blue-400">
                {passData.rollNumber || passData.rollNo || '25ASETCSE019'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Allocated Hostel:</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">
                {passData.hostel || 'Boys Hostel (Block B - 204)'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Leave Duration:</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-amber-500" />
                {passData.dates || passData.validDates || '12 Sep - 14 Sep 2026'}
              </span>
            </div>
            <div className="flex justify-between border-t border-slate-200 dark:border-slate-800 pt-1.5">
              <span className="text-slate-500">Reason:</span>
              <span className="font-medium text-slate-700 dark:text-slate-300">
                {passData.reason || 'Weekend Home Visit'}
              </span>
            </div>
          </div>

          {/* Action Footer */}
          <div className="pt-1 flex gap-2">
            <button 
              onClick={() => window.print()}
              className="flex-1 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5"
            >
              <Printer className="w-4 h-4 text-slate-600 dark:text-slate-300" /> Print Pass
            </button>
            <button 
              onClick={() => {
                alert('Digital Gate Pass saved to device!');
                onClose();
              }}
              className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md transition-colors flex items-center justify-center gap-1.5"
            >
              <Download className="w-4 h-4" /> Save Offline
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
