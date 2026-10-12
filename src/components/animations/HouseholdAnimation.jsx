import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Home, ShieldCheck, PieChart, Users2, Check } from 'lucide-react';

export default function HouseholdAnimation() {
  const [householdLogged, setHouseholdLogged] = useState(18);
  const [diaryStage, setDiaryStage] = useState('Aggregating 7-Day Travel Diaries...');

  useEffect(() => {
    const t1 = setTimeout(() => {
      setDiaryStage('Stratified Quota Complete (MRS Code Compliant)');
      setHouseholdLogged(prev => prev + 1);
    }, 750);
    return () => clearTimeout(t1);
  }, []);

  return (
    <div className="relative w-full max-w-xl mx-auto h-72 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/95 border border-pink-500/30 p-4 flex flex-col justify-between overflow-hidden shadow-[0_0_50px_rgba(236,72,153,0.15)]">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />

      {/* Top Telemetry */}
      <div className="relative z-10 flex items-center justify-between border-b border-pink-500/20 pb-2 text-xs">
        <div className="flex items-center gap-2 text-pink-400 font-mono">
          <Home className="w-4 h-4 text-pink-400" />
          <span>RESIDENTIAL TRAVEL DIARY & DEMOGRAPHIC SAMPLING</span>
        </div>
        <div className="flex items-center gap-3 text-slate-400 font-mono">
          <span>GDPR / MRS: <strong className="text-pink-400">100% AUDITED</strong></span>
        </div>
      </div>

      {/* Neighborhood Stage */}
      <div className="relative z-10 flex-1 flex items-center justify-center my-2">
        <div className="relative w-full h-36 bg-slate-800/40 rounded-xl border border-slate-700/60 p-3 flex items-center justify-around">
          
          {/* House Node 1 */}
          <div className="flex flex-col items-center gap-1">
            <motion.div
              animate={{ scale: [1, 1.08, 1], borderColor: ['rgba(236,72,153,0.4)', 'rgba(236,72,153,0.9)', 'rgba(236,72,153,0.4)'] }}
              transition={{ repeat: Infinity, duration: 1.6 }}
              className="w-14 h-14 rounded-xl bg-pink-950/40 border-2 border-pink-500/50 flex items-center justify-center shadow-lg relative"
            >
              <Home className="w-7 h-7 text-pink-400" />
              <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center text-black text-[9px] font-bold">
                ✓
              </div>
            </motion.div>
            <span className="text-[10px] font-mono text-slate-300">HOUSEHOLD A</span>
          </div>

          {/* Connection Wave Pulse */}
          <div className="flex flex-col items-center justify-center gap-1">
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-ping" />
              <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-ping delay-100" />
              <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-ping delay-200" />
            </div>
            <span className="text-[9px] font-mono text-pink-300 bg-pink-950/80 px-1.5 py-0.5 rounded border border-pink-500/30">
              TRAVEL DIARY
            </span>
          </div>

          {/* House Node 2 (Central Hub) */}
          <div className="flex flex-col items-center gap-1">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-600 to-rose-600 flex items-center justify-center shadow-[0_0_25px_rgba(236,72,153,0.5)]">
              <PieChart className="w-8 h-8 text-white" />
            </div>
            <span className="text-[10px] font-mono text-pink-300 font-semibold">FAST TRACK HUB</span>
          </div>

          {/* Connection Wave Pulse */}
          <div className="flex flex-col items-center justify-center gap-1">
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-ping" />
              <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-ping delay-100" />
              <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-ping delay-200" />
            </div>
            <span className="text-[9px] font-mono text-rose-300 bg-pink-950/80 px-1.5 py-0.5 rounded border border-pink-500/30">
              MODAL SPLIT
            </span>
          </div>

          {/* House Node 3 */}
          <div className="flex flex-col items-center gap-1">
            <motion.div
              animate={{ scale: [1, 1.08, 1], borderColor: ['rgba(236,72,153,0.4)', 'rgba(236,72,153,0.9)', 'rgba(236,72,153,0.4)'] }}
              transition={{ repeat: Infinity, duration: 1.6, delay: 0.3 }}
              className="w-14 h-14 rounded-xl bg-pink-950/40 border-2 border-pink-500/50 flex items-center justify-center shadow-lg relative"
            >
              <Home className="w-7 h-7 text-pink-400" />
              <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center text-black text-[9px] font-bold">
                ✓
              </div>
            </motion.div>
            <span className="text-[10px] font-mono text-slate-300">HOUSEHOLD B</span>
          </div>

        </div>
      </div>

      {/* Bottom Status */}
      <div className="relative z-10 flex items-center justify-between bg-slate-900/80 rounded-xl p-2.5 border border-slate-800 text-xs">
        <div className="flex items-center gap-2">
          <div className="p-1 rounded-md bg-pink-500/20 text-pink-400">
            <Users2 className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[11px] text-slate-400 font-mono">STATUS</div>
            <div className="font-semibold text-white text-xs">{diaryStage}</div>
          </div>
        </div>
        <div className="text-right font-mono text-[11px] text-slate-300">
          <div>COMPLETION: <span className="text-pink-400 font-bold">100% Verified</span></div>
          <div>HOUSEHOLDS: <span className="text-emerald-400 font-bold">{householdLogged} Diaries</span></div>
        </div>
      </div>
    </div>
  );
}
