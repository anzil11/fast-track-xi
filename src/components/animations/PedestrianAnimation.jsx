import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Activity, Play, Pause, RotateCcw } from 'lucide-react';

export default function PedestrianAnimation() {
  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const [isPlaying, setIsPlaying] = useState(!prefersReducedMotion);
  const [replayKey, setReplayKey] = useState(0);

  const [countDirA, setCountDirA] = useState(78);
  const [countDirB, setCountDirB] = useState(64);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      if (Math.random() > 0.5) {
        setCountDirA(prev => prev + 1);
      } else {
        setCountDirB(prev => prev + 1);
      }
    }, 800);
    return () => clearInterval(interval);
  }, [isPlaying, replayKey]);

  const handlePlayToggle = () => setIsPlaying(prev => !prev);
  const handleReplay = () => {
    setCountDirA(78);
    setCountDirB(64);
    setIsPlaying(true);
    setReplayKey(k => k + 1);
  };

  const totalCount = countDirA + countDirB;

  return (
    <div className="relative w-full max-w-xl mx-auto h-80 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/95 border border-cyan-500/30 p-4 flex flex-col justify-between overflow-hidden shadow-[0_0_50px_rgba(6,182,212,0.15)]">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

      {/* Top Header & Controls */}
      <div className="relative z-10 flex items-center justify-between border-b border-cyan-500/20 pb-2 text-xs">
        <div className="flex items-center gap-2 text-cyan-400 font-mono">
          <Users className="w-4 h-4 text-cyan-400" />
          <span className="font-semibold text-white">Pedestrian Count Example</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handlePlayToggle}
            className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-cyan-300 font-mono text-[11px] transition-colors"
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

      {/* Main Pedestrian Flow Simulation Area */}
      <div className="relative z-10 flex-1 flex items-center justify-center my-2">
        <div className="relative w-full h-36 bg-slate-800/40 rounded-xl border border-slate-700/60 p-3 overflow-hidden flex items-center">
          
          {/* Virtual Counting Line */}
          <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-gradient-to-b from-cyan-500 via-sky-400 to-cyan-500 shadow-[0_0_15px_#38bdf8] z-10">
            <div className="absolute top-2 -left-16 px-1.5 py-0.5 bg-cyan-950/90 border border-cyan-400/60 rounded text-[9px] font-mono text-cyan-300">
              Counting Point A
            </div>
          </div>

          {/* Animated Pedestrian 1: Direction A */}
          {isPlaying && (
            <motion.div
              key={`dirA-${replayKey}`}
              initial={{ x: -80 }}
              animate={{ x: 380 }}
              transition={{ repeat: Infinity, duration: 2.4, ease: 'linear' }}
              className="absolute flex items-center gap-1 z-20"
            >
              <div className="relative p-1.5 rounded-lg border border-cyan-400/80 bg-cyan-950/80 shadow-[0_0_12px_rgba(6,182,212,0.6)]">
                <div className="w-5 h-5 rounded-full bg-cyan-400 flex items-center justify-center text-slate-950 text-[10px] font-bold">
                  🚶
                </div>
                <div className="absolute -top-3 -right-2 text-[8px] font-mono text-cyan-300 bg-black/80 px-1 rounded">
                  Dir A
                </div>
              </div>
            </motion.div>
          )}

          {/* Animated Pedestrian 2: Direction B */}
          {isPlaying && (
            <motion.div
              key={`dirB-${replayKey}`}
              initial={{ x: 380 }}
              animate={{ x: -80 }}
              transition={{ repeat: Infinity, duration: 2.8, ease: 'linear', delay: 0.5 }}
              className="absolute flex items-center gap-1 z-20 top-6"
            >
              <div className="relative p-1.5 rounded-lg border border-emerald-400/80 bg-emerald-950/80 shadow-[0_0_12px_rgba(16,185,129,0.6)]">
                <div className="w-5 h-5 rounded-full bg-emerald-400 flex items-center justify-center text-slate-950 text-[10px] font-bold">
                  🚶‍♀️
                </div>
                <div className="absolute -top-3 -right-2 text-[8px] font-mono text-emerald-300 bg-black/80 px-1 rounded">
                  Dir B
                </div>
              </div>
            </motion.div>
          )}

          {/* Flow Direction Overlay Labels */}
          <div className="absolute bottom-2 left-4 text-[10px] font-mono text-cyan-400 bg-slate-900/80 px-2 py-0.5 rounded border border-slate-700">
            Direction A (Eastbound): {countDirA}
          </div>
          <div className="absolute bottom-2 right-4 text-[10px] font-mono text-emerald-400 bg-slate-900/80 px-2 py-0.5 rounded border border-slate-700">
            Direction B (Westbound): {countDirB}
          </div>
        </div>
      </div>

      {/* Bottom Status: Example Total */}
      <div className="relative z-10 flex items-center justify-between bg-slate-900/80 rounded-xl p-2.5 border border-slate-800 text-xs">
        <div className="flex items-center gap-3">
          <div className="p-1 rounded-md bg-cyan-500/20 text-cyan-400">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[11px] text-slate-400 font-mono">EXAMPLE INTERVAL TOTAL</div>
            <div className="font-semibold text-white flex items-center gap-1 text-sm">
              <span className="text-cyan-400 font-mono font-bold text-base">{totalCount}</span>
              <span className="text-[11px] text-slate-400">Pedestrians Recorded</span>
            </div>
          </div>
        </div>
        <div className="text-right font-mono text-[11px] text-slate-300">
          <div>LOCATION: <span className="text-cyan-400 font-bold">Counting Point A</span></div>
          <div>BREAKDOWN: <span className="text-emerald-400 font-bold">{countDirA} Dir A / {countDirB} Dir B</span></div>
        </div>
      </div>
    </div>
  );
}
