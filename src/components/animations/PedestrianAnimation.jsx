import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Scan, Activity, ArrowRight, Shield } from 'lucide-react';

export default function PedestrianAnimation() {
  const [count, setCount] = useState(142);
  const [activeGate, setActiveGate] = useState('CORDON GATE ALPHA');

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(prev => prev + 1);
    }, 280);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-xl mx-auto h-72 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/95 border border-cyan-500/30 p-4 flex flex-col justify-between overflow-hidden shadow-[0_0_50px_rgba(6,182,212,0.15)]">
      {/* Background Optical Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />

      {/* Top Telemetry */}
      <div className="relative z-10 flex items-center justify-between border-b border-cyan-500/20 pb-2 text-xs">
        <div className="flex items-center gap-2 text-cyan-400 font-mono">
          <Scan className="w-4 h-4 animate-spin text-cyan-400" />
          <span>AI OPTICAL FLOW RECOGNITION</span>
        </div>
        <div className="flex items-center gap-3 text-slate-400 font-mono">
          <span>CORDON: <strong className="text-white">{activeGate}</strong></span>
          <span>FIDELITY: <strong className="text-cyan-400">99.4%</strong></span>
        </div>
      </div>

      {/* Main Pedestrian Flow Simulation Area */}
      <div className="relative z-10 flex-1 flex items-center justify-center my-2">
        <div className="relative w-full h-36 bg-slate-800/40 rounded-xl border border-slate-700/60 p-3 overflow-hidden flex items-center">
          
          {/* Virtual Crossing / Counting Laser Gate */}
          <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-gradient-to-b from-cyan-500 via-sky-400 to-cyan-500 shadow-[0_0_15px_#38bdf8] z-10">
            <div className="absolute top-2 -left-12 px-1.5 py-0.5 bg-cyan-950/90 border border-cyan-400/60 rounded text-[9px] font-mono text-cyan-300">
              GATE-01
            </div>
          </div>

          {/* Animated Pedestrian 1 */}
          <motion.div
            initial={{ x: -100 }}
            animate={{ x: 380 }}
            transition={{ repeat: Infinity, duration: 2.2, ease: 'linear' }}
            className="absolute flex items-center gap-1 z-20"
          >
            <div className="relative p-1.5 rounded-lg border border-cyan-400/80 bg-cyan-950/80 shadow-[0_0_12px_rgba(6,182,212,0.6)]">
              <div className="w-5 h-5 rounded-full bg-cyan-400 flex items-center justify-center text-slate-950 text-[10px] font-bold">
                🚶
              </div>
              <div className="absolute -top-3 -right-2 text-[8px] font-mono text-cyan-300 bg-black/80 px-1 rounded">
                #PED-01
              </div>
            </div>
          </motion.div>

          {/* Animated Pedestrian 2 (Opposite direction / lower speed) */}
          <motion.div
            initial={{ x: 380 }}
            animate={{ x: -100 }}
            transition={{ repeat: Infinity, duration: 2.8, ease: 'linear', delay: 0.4 }}
            className="absolute flex items-center gap-1 z-20 top-6"
          >
            <div className="relative p-1.5 rounded-lg border border-emerald-400/80 bg-emerald-950/80 shadow-[0_0_12px_rgba(16,185,129,0.6)]">
              <div className="w-5 h-5 rounded-full bg-emerald-400 flex items-center justify-center text-slate-950 text-[10px] font-bold">
                🚶‍♀️
              </div>
              <div className="absolute -top-3 -right-2 text-[8px] font-mono text-emerald-300 bg-black/80 px-1 rounded">
                #PED-02
              </div>
            </div>
          </motion.div>

          {/* Animated Pedestrian 3 (Group / wheelchair / stroller) */}
          <motion.div
            initial={{ x: -80 }}
            animate={{ x: 400 }}
            transition={{ repeat: Infinity, duration: 2.5, ease: 'linear', delay: 0.9 }}
            className="absolute flex items-center gap-1 z-20 bottom-3"
          >
            <div className="relative p-1.5 rounded-lg border border-amber-400/80 bg-amber-950/80 shadow-[0_0_12px_rgba(245,158,11,0.6)]">
              <div className="w-5 h-5 rounded-full bg-amber-400 flex items-center justify-center text-slate-950 text-[10px] font-bold">
                🚶‍♂️
              </div>
              <div className="absolute -top-3 -right-2 text-[8px] font-mono text-amber-300 bg-black/80 px-1 rounded">
                #PED-03
              </div>
            </div>
          </motion.div>

          {/* Heatmap overlay pulses */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent pointer-events-none" />
        </div>
      </div>

      {/* Bottom Live Data Bar */}
      <div className="relative z-10 flex items-center justify-between bg-slate-900/80 rounded-xl p-2.5 border border-slate-800 text-xs">
        <div className="flex items-center gap-3">
          <div className="p-1 rounded-md bg-cyan-500/20 text-cyan-400">
            <Activity className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <div className="text-[11px] text-slate-400 font-mono">LIVE FOOTFALL ACCUMULATOR</div>
            <div className="font-semibold text-white flex items-center gap-1 text-sm">
              <span className="text-cyan-400 font-mono font-bold text-base">{count}</span>
              <span className="text-[11px] text-slate-400">Pedestrians Logged</span>
            </div>
          </div>
        </div>
        <div className="text-right font-mono text-[11px] text-slate-300">
          <div>FLOW VELOCITY: <span className="text-cyan-400 font-bold">1.34 m/s</span></div>
          <div>INTERVAL PEAK: <span className="text-emerald-400 font-bold">+18.4%</span></div>
        </div>
      </div>
    </div>
  );
}
