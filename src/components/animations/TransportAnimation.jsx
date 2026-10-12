import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Train, Clock, Users, ArrowUpRight, Zap } from 'lucide-react';

export default function TransportAnimation() {
  const [stationState, setStationState] = useState('Approaching Platform 3');
  const [loadFactor, setLoadFactor] = useState('68% (Optimal)');

  useEffect(() => {
    const t1 = setTimeout(() => {
      setStationState('Arrived • Boarding & Alighting');
      setLoadFactor('84% (Peak Load)');
    }, 700);
    return () => clearTimeout(t1);
  }, []);

  return (
    <div className="relative w-full max-w-xl mx-auto h-72 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/95 border border-purple-500/30 p-4 flex flex-col justify-between overflow-hidden shadow-[0_0_50px_rgba(168,85,247,0.15)]">
      {/* Background Track Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />

      {/* Top Telemetry */}
      <div className="relative z-10 flex items-center justify-between border-b border-purple-500/20 pb-2 text-xs">
        <div className="flex items-center gap-2 text-purple-400 font-mono">
          <Train className="w-4 h-4 text-purple-400" />
          <span>TRANSIT MULTIMODAL TELEMETRY</span>
        </div>
        <div className="flex items-center gap-3 text-slate-400 font-mono">
          <span>PLATFORM: <strong className="text-white">PL-03 EASTBOUND</strong></span>
          <span>DWELL TIME: <strong className="text-purple-400">42s</strong></span>
        </div>
      </div>

      {/* Train & Platform Stage */}
      <div className="relative z-10 flex-1 flex items-center justify-center my-2">
        <div className="relative w-full h-36 bg-slate-800/40 rounded-xl border border-slate-700/60 p-3 overflow-hidden flex flex-col justify-between">
          
          {/* Station Platform */}
          <div className="w-full h-10 bg-slate-900/90 rounded border-b-2 border-yellow-500 flex items-center justify-between px-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] font-mono text-slate-300">PLATFORM 03 • ST PANCRAS EXPRESS</span>
            </div>
            <div className="text-[10px] font-mono text-purple-300 bg-purple-950/80 px-2 py-0.5 rounded border border-purple-500/40">
              BOARDING: 184 PAX
            </div>
          </div>

          {/* Electric Neon Railway Track */}
          <div className="relative w-full h-16 flex items-center overflow-hidden">
            <div className="absolute top-2 left-0 right-0 h-1 bg-purple-950 border-t border-b border-purple-500/30" />
            <div className="absolute bottom-2 left-0 right-0 h-1 bg-purple-950 border-t border-b border-purple-500/30" />

            {/* High Speed Train Carriages */}
            <motion.div
              initial={{ x: 280 }}
              animate={{ x: 0 }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
              className="flex items-center gap-1 z-20"
            >
              {/* Locomotive Nose */}
              <div className="w-28 h-10 bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-800 rounded-l-full rounded-r-md flex items-center justify-between px-3 shadow-[0_0_20px_rgba(168,85,247,0.6)] relative">
                <div className="w-3 h-2 bg-yellow-300 rounded-full shadow-[0_0_8px_#fff]" />
                <span className="text-[9px] font-mono font-bold text-white">FT-TRAIN</span>
                <div className="flex gap-1">
                  <div className="w-3 h-2 bg-sky-200/80 rounded" />
                  <div className="w-3 h-2 bg-sky-200/80 rounded" />
                </div>
              </div>

              {/* Carriage 2 */}
              <div className="w-24 h-10 bg-gradient-to-r from-purple-700 to-indigo-700 rounded-md flex items-center justify-around px-2 shadow-md">
                <div className="w-3 h-2 bg-sky-200/80 rounded" />
                <div className="w-3 h-2 bg-sky-200/80 rounded" />
                <div className="w-3 h-2 bg-sky-200/80 rounded" />
              </div>

              {/* Carriage 3 */}
              <div className="w-24 h-10 bg-gradient-to-r from-purple-700 to-indigo-700 rounded-md flex items-center justify-around px-2 shadow-md">
                <div className="w-3 h-2 bg-sky-200/80 rounded" />
                <div className="w-3 h-2 bg-sky-200/80 rounded" />
                <div className="w-3 h-2 bg-sky-200/80 rounded" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom Status */}
      <div className="relative z-10 flex items-center justify-between bg-slate-900/80 rounded-xl p-2.5 border border-slate-800 text-xs">
        <div className="flex items-center gap-3">
          <div className="p-1 rounded-md bg-purple-500/20 text-purple-400">
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[11px] text-slate-400 font-mono">STATUS</div>
            <div className="font-semibold text-white text-xs">{stationState}</div>
          </div>
        </div>
        <div className="text-right font-mono text-[11px] text-slate-300">
          <div>LOAD FACTOR: <span className="text-purple-400 font-bold">{loadFactor}</span></div>
          <div>PUNCTUALITY: <span className="text-emerald-400 font-bold">99.8%</span></div>
        </div>
      </div>
    </div>
  );
}
