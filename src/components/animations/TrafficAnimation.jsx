import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Car, Compass, ArrowUp, ArrowLeft, ArrowRight, Gauge, Play, Pause, RotateCcw } from 'lucide-react';

export default function TrafficAnimation() {
  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const [isPlaying, setIsPlaying] = useState(!prefersReducedMotion);
  const [replayKey, setReplayKey] = useState(0);

  const [vehicleCount, setVehicleCount] = useState(247);
  const [activeMovement, setActiveMovement] = useState('Ahead');

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setVehicleCount(prev => prev + 1);
      const moves = ['Left Turn', 'Ahead', 'Right Turn'];
      setActiveMovement(moves[Math.floor(Math.random() * moves.length)]);
    }, 600);
    return () => clearInterval(interval);
  }, [isPlaying, replayKey]);

  const handlePlayToggle = () => setIsPlaying(prev => !prev);
  const handleReplay = () => {
    setVehicleCount(247);
    setActiveMovement('Ahead');
    setIsPlaying(true);
    setReplayKey(k => k + 1);
  };

  return (
    <div className="relative w-full max-w-xl mx-auto h-80 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/95 border border-sky-500/30 p-4 flex flex-col justify-between overflow-hidden shadow-[0_0_50px_rgba(14,165,233,0.15)]">
      {/* Background Track Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

      {/* Top Controls & Header */}
      <div className="relative z-10 flex items-center justify-between border-b border-sky-500/20 pb-2 text-xs">
        <div className="flex items-center gap-2 text-sky-400 font-mono">
          <Car className="w-4 h-4 text-sky-400" />
          <span className="font-semibold text-white">Traffic Junction Turning Count Example</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handlePlayToggle}
            className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-sky-300 font-mono text-[11px] transition-colors"
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

      {/* Junction Flow Stage */}
      <div className="relative z-10 flex-1 flex items-center justify-center my-2">
        <div className="relative w-full h-36 bg-slate-800/40 rounded-xl border border-slate-700/60 p-3 overflow-hidden flex items-center justify-between">
          
          {/* Junction Roadway Visual */}
          <div className="relative w-full h-28 bg-slate-950/80 rounded-lg border border-slate-700 overflow-hidden flex items-center justify-center">
            {/* Road Markings */}
            <div className="absolute inset-x-0 h-0.5 bg-slate-700 border-dashed border-t border-slate-500/40" />
            <div className="absolute inset-y-0 w-0.5 bg-slate-700 border-dashed border-l border-slate-500/40" />

            {/* Junction Node Centre */}
            <div className="w-16 h-16 rounded-xl border-2 border-sky-400/40 bg-sky-950/30 flex items-center justify-center relative shadow-[0_0_20px_rgba(14,165,233,0.2)]">
              <Compass className={`w-6 h-6 text-sky-400 ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '10s' }} />
              <div className="absolute -top-2 px-1 bg-slate-900 border border-sky-400 rounded text-[8px] font-mono text-sky-300">
                JCT-01
              </div>
            </div>

            {/* Animated Car 1: Ahead */}
            {isPlaying && (
              <motion.div
                key={`ahead-${replayKey}`}
                initial={{ x: -120, y: -10 }}
                animate={{ x: 220, y: -10 }}
                transition={{ repeat: Infinity, duration: 2.2, ease: 'linear' }}
                className="absolute z-20 flex items-center gap-1"
              >
                <div className="w-8 h-6 rounded bg-sky-500 flex items-center justify-center shadow-[0_0_12px_rgba(14,165,233,0.8)] text-slate-950">
                  <Car className="w-4 h-4" />
                </div>
                <span className="text-[8px] font-mono text-sky-300 bg-slate-900/90 px-1 rounded">
                  Ahead
                </span>
              </motion.div>
            )}

            {/* Animated Car 2: Left Turn */}
            {isPlaying && (
              <motion.div
                key={`left-${replayKey}`}
                initial={{ x: -100, y: 15 }}
                animate={{ x: [ -100, 0, 0 ], y: [ 15, 15, -45 ] }}
                transition={{ repeat: Infinity, duration: 2.8, ease: 'easeInOut', delay: 0.8 }}
                className="absolute z-20 flex items-center gap-1"
              >
                <div className="w-8 h-6 rounded bg-cyan-400 flex items-center justify-center shadow-[0_0_12px_rgba(6,182,212,0.8)] text-slate-950">
                  <Car className="w-4 h-4" />
                </div>
                <span className="text-[8px] font-mono text-cyan-300 bg-slate-900/90 px-1 rounded">
                  Left Turn
                </span>
              </motion.div>
            )}

            {/* Turning Vector Indicators */}
            <div className="absolute right-3 top-1 flex flex-col gap-1 text-[9px] font-mono text-slate-300">
              <div className="flex items-center gap-1 bg-slate-900/80 px-2 py-0.5 rounded border border-slate-700">
                <ArrowLeft className="w-3 h-3 text-cyan-400" />
                <span>Left turn: 142 veh/h</span>
              </div>
              <div className="flex items-center gap-1 bg-slate-900/80 px-2 py-0.5 rounded border border-slate-700">
                <ArrowUp className="w-3 h-3 text-sky-400" />
                <span>Ahead: 588 veh/h</span>
              </div>
              <div className="flex items-center gap-1 bg-slate-900/80 px-2 py-0.5 rounded border border-slate-700">
                <ArrowRight className="w-3 h-3 text-amber-400" />
                <span>Right turn: 96 veh/h</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Status: Interval Total */}
      <div className="relative z-10 flex items-center justify-between bg-slate-900/80 rounded-xl p-2.5 border border-slate-800 text-xs">
        <div className="flex items-center gap-3">
          <div className="p-1 rounded-md bg-sky-500/20 text-sky-400">
            <Gauge className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[11px] text-slate-400 font-mono">EXAMPLE INTERVAL TOTAL</div>
            <div className="font-semibold text-white flex items-center gap-1">
              <span className="text-sky-400 font-mono font-bold text-base">{vehicleCount}</span>
              <span className="text-[11px] text-slate-400">Vehicles Logged</span>
            </div>
          </div>
        </div>
        <div className="text-right font-mono text-[11px] text-slate-300">
          <div>CURRENT FLOW: <span className="text-sky-400 font-bold">{activeMovement}</span></div>
          <div>ARM: <span className="text-emerald-400 font-bold">North Approach</span></div>
        </div>
      </div>
    </div>
  );
}
