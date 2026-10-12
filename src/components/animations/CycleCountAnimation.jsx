import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Bike, Gauge, Zap, TrendingUp, Check } from 'lucide-react';

export default function CycleCountAnimation() {
  const [cycleCount, setCycleCount] = useState(89);
  const [lastSpeed, setLastSpeed] = useState('22.4 km/h');

  useEffect(() => {
    const interval = setInterval(() => {
      setCycleCount(prev => prev + 1);
      setLastSpeed((20 + Math.random() * 8).toFixed(1) + ' km/h');
    }, 380);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-xl mx-auto h-72 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/95 border border-emerald-500/30 p-4 flex flex-col justify-between overflow-hidden shadow-[0_0_50px_rgba(16,185,129,0.15)]">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />

      {/* Top Telemetry */}
      <div className="relative z-10 flex items-center justify-between border-b border-emerald-500/20 pb-2 text-xs">
        <div className="flex items-center gap-2 text-emerald-400 font-mono">
          <Bike className="w-4 h-4 text-emerald-400" />
          <span>ACTIVE TRAVEL & CLASSIFIED CYCLE TELEMETRY</span>
        </div>
        <div className="flex items-center gap-3 text-slate-400 font-mono">
          <span>STANDARD: <strong className="text-emerald-400">DfT BENCHMARK</strong></span>
          <span>GROWTH: <strong className="text-emerald-400">+45.7%</strong></span>
        </div>
      </div>

      {/* Cycle Superhighway Stage */}
      <div className="relative z-10 flex-1 flex items-center justify-center my-2">
        <div className="relative w-full h-36 bg-slate-800/40 rounded-xl border border-slate-700/60 p-3 overflow-hidden flex flex-col justify-between">
          
          {/* Cycle Superhighway Lane */}
          <div className="relative w-full h-24 bg-emerald-950/40 rounded-lg border-2 border-emerald-500/40 overflow-hidden flex items-center">
            
            {/* Green Lane Markings */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 border-t-2 border-dashed border-emerald-400/40" />

            {/* Laser Counting Gate */}
            <div className="absolute top-0 bottom-0 left-2/3 w-0.5 bg-emerald-400 shadow-[0_0_15px_#22c55e] z-10">
              <div className="absolute -top-1 -left-12 px-1.5 py-0.5 bg-emerald-950 border border-emerald-400 rounded text-[9px] font-mono text-emerald-300">
                GATE-04
              </div>
            </div>

            {/* Animated Cyclist 1: Commuter */}
            <motion.div
              initial={{ x: -80 }}
              animate={{ x: 420 }}
              transition={{ repeat: Infinity, duration: 1.8, ease: 'linear' }}
              className="absolute z-20 flex items-center gap-1.5"
            >
              <div className="w-9 h-9 rounded-full bg-emerald-500 flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.8)] text-slate-950">
                <Bike className="w-6 h-6" />
              </div>
              <span className="text-[9px] font-mono text-emerald-300 bg-slate-900/80 px-1 rounded">
                #BIKE-01
              </span>
            </motion.div>

            {/* Animated Cyclist 2: Cargo E-Bike */}
            <motion.div
              initial={{ x: -140 }}
              animate={{ x: 420 }}
              transition={{ repeat: Infinity, duration: 2.3, ease: 'linear', delay: 0.6 }}
              className="absolute z-20 flex items-center gap-1.5 top-1"
            >
              <div className="w-9 h-9 rounded-full bg-cyan-500 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.8)] text-slate-950">
                <Bike className="w-6 h-6" />
              </div>
              <span className="text-[9px] font-mono text-cyan-300 bg-slate-900/80 px-1 rounded">
                #CARGO-E
              </span>
            </motion.div>

          </div>
        </div>
      </div>

      {/* Bottom Status */}
      <div className="relative z-10 flex items-center justify-between bg-slate-900/80 rounded-xl p-2.5 border border-slate-800 text-xs">
        <div className="flex items-center gap-3">
          <div className="p-1 rounded-md bg-emerald-500/20 text-emerald-400">
            <Gauge className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <div className="text-[11px] text-slate-400 font-mono">ACTIVE COUNTER BAROMETER</div>
            <div className="font-semibold text-white flex items-center gap-1">
              <span className="text-emerald-400 font-mono font-bold text-base">{cycleCount}</span>
              <span className="text-[11px] text-slate-400">Cycles Logged Today</span>
            </div>
          </div>
        </div>
        <div className="text-right font-mono text-[11px] text-slate-300">
          <div>AVERAGE SPEED: <span className="text-emerald-400 font-bold">{lastSpeed}</span></div>
          <div>MODAL SPLIT: <span className="text-cyan-400 font-bold">28.4% Active</span></div>
        </div>
      </div>
    </div>
  );
}
