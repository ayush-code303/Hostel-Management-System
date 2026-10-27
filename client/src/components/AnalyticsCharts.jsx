import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  PieChart as PieIcon, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  DollarSign, 
  Users 
} from 'lucide-react';

export default function AnalyticsCharts({ hostelData }) {
  const [activeMetric, setActiveMetric] = useState('occupancy'); // 'occupancy' | 'revenue' | 'complaints'

  // Sample or Passed Hostel Wings Data
  const blocks = hostelData || [
    { name: 'Block A (Junior Boys)', total: 180, occupied: 165, color: '#2563EB' },
    { name: 'Block B (Senior Boys)', total: 180, occupied: 158, color: '#4F46E5' },
    { name: 'Block C (Girls Main)', total: 160, occupied: 142, color: '#059669' },
    { name: 'Block D (PG Scholars)', total: 60, occupied: 50, color: '#D97706' },
  ];

  const revenueMonths = [
    { month: 'Jul 26', amount: 32.5, count: '₹32.5 L' },
    { month: 'Aug 26', amount: 58.2, count: '₹58.2 L' },
    { month: 'Sep 26', amount: 64.8, count: '₹64.8 L' },
    { month: 'Oct 26', amount: 29.4, count: '₹29.4 L' },
  ];

  const complaintStats = [
    { cat: 'Electrical & Power', count: 34, percent: 38, color: '#3B82F6' },
    { cat: 'Plumbing & Water', count: 25, percent: 28, color: '#06B6D4' },
    { cat: 'HVAC & Air Cooling', count: 18, percent: 20, color: '#F59E0B' },
    { cat: 'Wi-Fi & LAN Network', count: 12, percent: 14, color: '#10B981' },
  ];

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm space-y-6">
      
      {/* Analytics Header & Tab Selector */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 rounded-xl">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 dark:text-white text-base">
                Operational Analytics & Data Pipelines
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Live resident occupancy, fee recovery, and service level metrics
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold">
          <button
            onClick={() => setActiveMetric('occupancy')}
            className={`px-3 py-1.5 rounded-lg transition-all ${activeMetric === 'occupancy' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'}`}
          >
            Occupancy
          </button>
          <button
            onClick={() => setActiveMetric('revenue')}
            className={`px-3 py-1.5 rounded-lg transition-all ${activeMetric === 'revenue' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'}`}
          >
            Term Fees
          </button>
          <button
            onClick={() => setActiveMetric('complaints')}
            className={`px-3 py-1.5 rounded-lg transition-all ${activeMetric === 'complaints' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'}`}
          >
            Maintenance SLA
          </button>
        </div>
      </div>

      {/* METRIC 1: OCCUPANCY COMPARISON BARS */}
      {activeMetric === 'occupancy' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center text-xs font-extrabold text-slate-500">
            <span>Hostel Wing / Residence Block</span>
            <span>Occupancy Rate (Occupied / Total Capacity)</span>
          </div>

          <div className="space-y-3">
            {blocks.map((block, idx) => {
              const rate = Math.round((block.occupied / block.total) * 100);
              return (
                <div key={idx} className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-2">
                  <div className="flex justify-between text-xs font-bold text-slate-800 dark:text-slate-200">
                    <span className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: block.color }}></span>
                      {block.name}
                    </span>
                    <span className="font-mono text-blue-600 dark:text-blue-400 font-extrabold">
                      {rate}% ({block.occupied} / {block.total} Beds)
                    </span>
                  </div>

                  {/* SVG Bar Visualization */}
                  <div className="w-full bg-slate-200 dark:bg-slate-700 h-3 rounded-full overflow-hidden flex">
                    <div 
                      className="h-full rounded-full transition-all duration-700" 
                      style={{ width: `${rate}%`, backgroundColor: block.color }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-3 gap-3 pt-2 text-center text-xs">
            <div className="p-3 bg-blue-50 dark:bg-blue-950/40 rounded-xl border border-blue-100 dark:border-blue-900/50">
              <span className="text-slate-500 font-medium block">Total University Beds</span>
              <span className="text-lg font-black text-blue-600 dark:text-blue-400">580</span>
            </div>
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-100 dark:border-emerald-900/50">
              <span className="text-slate-500 font-medium block">Total Occupied</span>
              <span className="text-lg font-black text-emerald-600 dark:text-emerald-400">515</span>
            </div>
            <div className="p-3 bg-indigo-50 dark:bg-indigo-950/40 rounded-xl border border-indigo-100 dark:border-indigo-900/50">
              <span className="text-slate-500 font-medium block">Campus Occupancy</span>
              <span className="text-lg font-black text-indigo-600 dark:text-indigo-400">88.8%</span>
            </div>
          </div>
        </div>
      )}

      {/* METRIC 2: REVENUE TREND (SVG AREA GRAPH) */}
      {activeMetric === 'revenue' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center text-xs font-extrabold text-slate-500">
            <span>2026-27 Term Fee Collections (Razorpay Digital Pipeline)</span>
            <span className="text-emerald-600 font-black">Total Invoiced: ₹1.85 Cr</span>
          </div>

          {/* SVG Area Chart */}
          <div className="bg-slate-50 dark:bg-slate-800/40 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800">
            <svg viewBox="0 0 500 160" className="w-full h-40 overflow-visible">
              <defs>
                <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10B981" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              <line x1="40" y1="20" x2="480" y2="20" stroke="#94a3b8" strokeDasharray="3 3" opacity="0.3" />
              <line x1="40" y1="60" x2="480" y2="60" stroke="#94a3b8" strokeDasharray="3 3" opacity="0.3" />
              <line x1="40" y1="100" x2="480" y2="100" stroke="#94a3b8" strokeDasharray="3 3" opacity="0.3" />
              <line x1="40" y1="140" x2="480" y2="140" stroke="#94a3b8" opacity="0.4" />

              {/* Area path */}
              <polygon 
                points="80,140 80,90 180,45 300,30 420,95 420,140" 
                fill="url(#revenueGrad)" 
              />

              {/* Stroke line */}
              <polyline 
                fill="none" 
                stroke="#10B981" 
                strokeWidth="3.5" 
                points="80,90 180,45 300,30 420,95" 
              />

              {/* Data Points */}
              {[
                { x: 80, y: 90, val: '₹32.5L', label: 'Jul' },
                { x: 180, y: 45, val: '₹58.2L', label: 'Aug' },
                { x: 300, y: 30, val: '₹64.8L', label: 'Sep' },
                { x: 420, y: 95, val: '₹29.4L', label: 'Oct' }
              ].map((pt, i) => (
                <g key={i}>
                  <circle cx={pt.x} cy={pt.y} r="5" fill="#10B981" stroke="#ffffff" strokeWidth="2" />
                  <text x={pt.x} y={pt.y - 10} textAnchor="middle" fontSize="10" fontWeight="bold" fill="#059669">
                    {pt.val}
                  </text>
                  <text x={pt.x} y="155" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#64748b">
                    {pt.label}
                  </text>
                </g>
              ))}
            </svg>
          </div>

          <div className="flex justify-between items-center p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-900/50 text-xs">
            <span className="font-bold text-emerald-800 dark:text-emerald-300">
              ⚡ Razorpay Instant Verification Gateway: 100% Online Compliance
            </span>
            <span className="font-mono text-emerald-700 font-extrabold">98.4% On-time</span>
          </div>
        </div>
      )}

      {/* METRIC 3: COMPLAINT RESOLUTION SLA */}
      {activeMetric === 'complaints' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center text-xs font-extrabold text-slate-500">
            <span>Maintenance Category Breakdown</span>
            <span>Average Resolution: 2.4 Hours</span>
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            {complaintStats.map((item, idx) => (
              <div key={idx} className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-1.5">
                <div className="flex justify-between text-xs font-bold text-slate-800 dark:text-slate-200">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></span>
                    {item.cat}
                  </span>
                  <span className="font-mono">{item.percent}%</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${item.percent}%`, backgroundColor: item.color }}></div>
                </div>
                <p className="text-[10px] text-slate-400">{item.count} tickets recorded this academic term</p>
              </div>
            ))}
          </div>

          <div className="p-3 bg-blue-50 dark:bg-blue-950/40 rounded-xl border border-blue-200 dark:border-blue-900/50 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-600" />
              <span className="font-bold text-blue-900 dark:text-blue-300">Warden SLA Compliance</span>
            </div>
            <span className="font-extrabold text-blue-600 dark:text-blue-400">96.8% Resolved within 24h</span>
          </div>
        </div>
      )}

    </div>
  );
}
