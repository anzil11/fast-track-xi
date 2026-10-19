import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Bike, Gauge, Play, Pause, RotateCcw } from 'lucide-react';

export default function CycleCountAnimation() {
  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const [isPlaying, setIsPlaying] = useState(!prefersReducedMotion);
  const [replayKey, setReplayKey] = useState(0);

  const [countDirA, setCountDirA] = useState(48);
  const [countDirB, setCountDirB] = useState(41);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      if (Math.random() > 0.5) {
        setCountDirA(prev => prev + 1);
      } else {
        setCountDirB(prev => prev + 1);
      }
    }, 700);
    return () => clearInterval(interval);
  }, [isPlaying, replayKey]);

  const handlePlayToggle = () => setIsPlaying(prev => !prev);
  const handleReplay = () => {
    setCountDirA(48);
    setCountDirB(41);
    setIsPlaying(true);
    setReplayKey(k => k + 1);
  };

  const totalCycles = countDirA + countDirB;

  return (
    <div className="relative w-full max-w-xl mx-auto h-80 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/95 border border-emerald-500/30 p-4 flex flex-col justify-between overflow-hidden shadow-[0_0_50px_rgba(16,185,129,0.15)]">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

      {/* Top Header & Controls */}
      <div className="relative z-10 flex items-center justify-between border-b border-emerald-500/20 pb-2 text-xs">
        <div className="flex items-center gap-2 text-emerald-400 font-mono">
          <Bike className="w-4 h-4 text-emerald-400" />
          <span className="font-semibold text-white">Directional Cycle Count Example</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handlePlayToggle}
            className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-emerald-300 font-mono text-[11px] transition-colors"
            title={isPlaying ? 'Pause animation' : 'Play example'}
            aria-label={isPlaying ? 'Pause animation' : 'Play example'}
          >
            {isPlaying ? (
              <>
                <Pause className="w-3 h-3" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-3 h-3" />
                <span>Play example</span>
              </>
            )}
          </button>
          <button
            onClick={handleReplay}
            className="flex items-center gap-1 px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-[11px] transition-colors"
            title="Replay animation"
            aria-label="Replay animation"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Replay</span>
          </button>
        </div>
      </div>

      {/* Cycle Track Stage */}
      <div className="relative z-10 flex-1 flex items-center justify-center my-2">
        <div className="relative w-full h-36 bg-slate-800/40 rounded-xl border border-slate-700/60 p-3 overflow-hidden flex flex-col justify-between">
          
          {/* Cycle Lane */}
          <div className="relative w-full h-24 bg-emerald-950/40 rounded-lg border-2 border-emerald-500/40 overflow-hidden flex items-center">
            
            {/* Lane Markings */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 border-t-2 border-dashed border-emerald-400/40" />

            {/* Virtual Screenline / Count Gate */}
            <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-emerald-400 shadow-[0_0_15px_#22c55e] z-10">
              <div className="absolute -top-1 -left-12 px-1.5 py-0.5 bg-emerald-950 border border-emerald-400 rounded text-[9px] font-mono text-emerald-300">
                POINT 01
              </div>
            </div>

            {/* Direction A Cyclist */}
            {isPlaying && (
              <motion.div
                key={`cyclist1-${replayKey}`}
                initial={{ x: -80 }}
                animate={{ x: 420 }}
                transition={{ repeat: Infinity, duration: 2.1, ease: 'linear' }}
                className="absolute z-20 flex items-center gap-1.5"
              >
                <div className="w-9 h-9 rounded-full bg-emerald-500 flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.8)] text-slate-950">
                  <Bike className="w-6 h-6" />
                </div>
                <span className="text-[9px] font-mono text-emerald-300 bg-slate-900/80 px-1 rounded">
                  Dir A (Standard)
                </span>
              </motion.div>
            )}

            {/* Direction B Cyclist */}
            {isPlaying && (
              <motion.div
                key={`cyclist2-${replayKey}`}
                initial={{ x: 420 }}
                animate={{ x: -80 }}
                transition={{ repeat: Infinity, duration: 2.5, ease: 'linear', delay: 0.6 }}
                className="absolute z-20 flex items-center gap-1.5 top-1"
              >
                <div className="w-9 h-9 rounded-full bg-cyan-500 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.8)] text-slate-950">
                  <Bike className="w-6 h-6" />
                </div>
                <span className="text-[9px] font-mono text-cyan-300 bg-slate-900/80 px-1 rounded">
                  Dir B (Cargo)
                </span>
              </motion.div>
            )}

          </div>

          <div className="flex items-center justify-between text-[10px] font-mono text-slate-300 px-1">
            <span>Direction A: {countDirA}</span>
            <span className="text-emerald-400">Agreed Categories: Standard / Cargo / E-Cycle</span>
            <span>Direction B: {countDirB}</span>
          </div>
        </div>
      </div>

      {/* Bottom Status */}
      <div className="relative z-10 flex items-center justify-between bg-slate-900/80 rounded-xl p-2.5 border border-slate-800 text-xs">
        <div className="flex items-center gap-3">
          <div className="p-1 rounded-md bg-emerald-500/20 text-emerald-400">
            <Gauge className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[11px] text-slate-400 font-mono">INTERVAL TOTAL</div>
            <div className="font-semibold text-white flex items-center gap-1">
              <span className="text-emerald-400 font-mono font-bold text-base">{totalCycles}</span>
              <span className="text-[11px] text-slate-400">Cycles Recorded</span>
            </div>
          </div>
        </div>
        <div className="text-right font-mono text-[11px] text-slate-300">
          <div>COUNT TYPE: <span className="text-cyan-400 font-bold">Directional</span></div>
          <div>CATEGORIES: <span className="text-emerald-400 font-bold">Classified</span></div>
        </div>
      </div>
    </div>
  );
}
