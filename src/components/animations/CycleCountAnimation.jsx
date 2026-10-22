import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Bike, ArrowRight, ArrowLeft, Activity, Info } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useSimulationPlayback } from './useSimulationPlayback';
import SimulationHeader from './SimulationHeader';

export default function CycleCountAnimation() {
  const containerRef = useRef(null);
  const { isWhite } = useTheme();

  const {
    playbackState,
    isPlaying,
    progress,
    prefersReducedMotion,
    togglePlay,
    replay
  } = useSimulationPlayback({
    totalDurationMs: 4600,
    stepCount: 2,
    containerRef
  });

  // Specification:
  // "Example period: 08:00-08:15."
  // Start at direction A 47 and B 40
  // Add one crossing in each direction
  // End at A 48, B 41, total 89
  // Replace "Standard / Cargo / E-Cycle" with "Agreed cycle categories."
  const showFinal = prefersReducedMotion || playbackState === 'completed';

  // Direction A crossing around progress ~0.45
  // Direction B crossing around progress ~0.75
  const countDirA = showFinal ? 48 : progress >= 0.45 ? 48 : 47;
  const countDirB = showFinal ? 41 : progress >= 0.75 ? 41 : 40;
  const totalCycles = countDirA + countDirB;

  return (
    <div
      ref={containerRef}
      className={`relative w-full max-w-2xl mx-auto rounded-2xl p-4 sm:p-5 flex flex-col justify-between overflow-hidden transition-colors border shadow-xl ${
        isWhite
          ? 'bg-slate-50 border-slate-300 text-slate-900'
          : 'bg-slate-900/95 border-emerald-500/30 text-slate-100 shadow-[0_0_50px_rgba(16,185,129,0.12)]'
      }`}
    >
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />

      {/* Top Header & Controls */}
      <SimulationHeader
        title="Directional Cycle Count Example"
        icon={Bike}
        accentColor="#10b981"
        playbackState={playbackState}
        onTogglePlay={togglePlay}
        onReplay={replay}
      />

      {/* Reduced Motion Notice */}
      {prefersReducedMotion && (
        <div className="relative z-10 mt-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-[11px] font-mono text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
          <Info className="w-3.5 h-3.5 shrink-0" />
          <span>Reduced motion active: showing final directional cycle count results.</span>
        </div>
      )}

      {/* Main Cycle Track & Screenline Scene */}
      <div className="relative z-10 my-3">
        <div
          className={`relative w-full rounded-xl border p-3.5 overflow-hidden flex flex-col justify-between ${
            isWhite ? 'bg-white border-slate-200' : 'bg-slate-950/80 border-slate-800'
          }`}
        >
          {/* Top Bar: Period Label & Categories Note */}
          <div className="flex items-center justify-between text-[11px] font-mono mb-2">
            <span
              className={`px-2.5 py-0.5 rounded font-bold ${
                isWhite
                  ? 'bg-emerald-100 text-emerald-900 border border-emerald-200'
                  : 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/30'
              }`}
            >
              Example period: 08:00-08:15
            </span>
            <span
              className={`text-[10px] px-2 py-0.5 rounded border ${
                isWhite
                  ? 'bg-slate-100 text-slate-600 border-slate-200'
                  : 'bg-slate-900/90 text-slate-400 border-slate-700'
              }`}
            >
              Agreed cycle categories
            </span>
          </div>

          {/* Cycle Lane Surface */}
          <div className="relative h-28 my-1 rounded-lg overflow-hidden flex items-center justify-center p-2 border border-slate-200 dark:border-slate-800 bg-emerald-50/50 dark:bg-emerald-950/20">
            {/* Lane Divider Dashed Line */}
            <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 border-t-2 border-dashed border-emerald-400/50" />

            {/* Central Count Screenline Gate */}
            <div className="absolute top-2 bottom-2 left-1/2 w-0.5 border-l-2 border-emerald-500 z-10 shadow-[0_0_10px_rgba(16,185,129,0.5)]">
              <div className="absolute -top-1 -left-12 px-1.5 py-0.5 bg-emerald-950 border border-emerald-400 rounded text-[9px] font-mono text-emerald-300 font-bold whitespace-nowrap">
                COUNT GATE
              </div>
            </div>

            {/* Direction Labels */}
            <div className="absolute top-3 left-4 flex items-center gap-1 text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400 z-10">
              <span>Direction A</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>

            <div className="absolute bottom-3 right-4 flex items-center gap-1 text-[10px] font-mono font-bold text-cyan-600 dark:text-cyan-400 z-10">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Direction B</span>
            </div>

            {/* Still Frame Cyclists (idle) */}
            {playbackState === 'idle' && !prefersReducedMotion && (
              <>
                <div
                  style={{ position: 'absolute', left: '20%', top: '32%', transform: 'translateY(-50%)' }}
                  className="z-20 flex items-center gap-1 opacity-80"
                >
                  <div className="w-7 h-7 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center shadow font-bold text-xs">
                    <Bike className="w-4 h-4" />
                  </div>
                  <span className="text-[9px] font-mono bg-slate-900 text-emerald-300 px-1 rounded border border-emerald-500/40">
                    Dir A
                  </span>
                </div>

                <div
                  style={{ position: 'absolute', right: '20%', top: '68%', transform: 'translateY(-50%)' }}
                  className="z-20 flex items-center gap-1 opacity-80"
                >
                  <span className="text-[9px] font-mono bg-slate-900 text-cyan-300 px-1 rounded border border-cyan-500/40">
                    Dir B
                  </span>
                  <div className="w-7 h-7 rounded-full bg-cyan-500 text-slate-950 flex items-center justify-center shadow font-bold text-xs">
                    <Bike className="w-4 h-4" />
                  </div>
                </div>
              </>
            )}

            {/* Animated Cyclists during Playback */}
            {!prefersReducedMotion && isPlaying && (
              <>
                {/* Cyclist 1 (Dir A): crosses at progress ~0.45 */}
                {progress >= 0.05 && progress <= 0.60 && (
                  <motion.div
                    style={{
                      position: 'absolute',
                      left: `${15 + (progress - 0.05) * 170}%`,
                      top: '32%',
                      transform: 'translateY(-50%)'
                    }}
                    className="z-20 flex items-center gap-1"
                  >
                    <div className="w-7 h-7 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center shadow-md font-bold text-xs">
                      <Bike className="w-4 h-4" />
                    </div>
                    <span className="text-[8px] font-mono bg-slate-950 text-emerald-300 px-1 rounded border border-emerald-500/30">
                      Dir A
                    </span>
                  </motion.div>
                )}

                {/* Cyclist 2 (Dir B): crosses at progress ~0.75 */}
                {progress >= 0.40 && progress <= 0.95 && (
                  <motion.div
                    style={{
                      position: 'absolute',
                      right: `${15 + (progress - 0.40) * 170}%`,
                      top: '68%',
                      transform: 'translateY(-50%)'
                    }}
                    className="z-20 flex items-center gap-1"
                  >
                    <span className="text-[8px] font-mono bg-slate-950 text-cyan-300 px-1 rounded border border-cyan-500/30">
                      Dir B
                    </span>
                    <div className="w-7 h-7 rounded-full bg-cyan-500 text-slate-950 flex items-center justify-center shadow-md font-bold text-xs">
                      <Bike className="w-4 h-4" />
                    </div>
                  </motion.div>
                )}
              </>
            )}
          </div>

          {/* Table for Agreed Observable Categories */}
          <div
            className={`mt-2 p-2.5 rounded-lg border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs font-mono ${
              isWhite ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/60 border-slate-800'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                Direction A: <strong>{countDirA}</strong>
                <span className="text-[10px] text-slate-400 ml-1">
                  ({countDirA === 48 ? '47 ➔ 48' : '47'})
                </span>
              </span>
              <span>•</span>
              <span className="text-cyan-600 dark:text-cyan-400 font-bold">
                Direction B: <strong>{countDirB}</strong>
                <span className="text-[10px] text-slate-400 ml-1">
                  ({countDirB === 41 ? '40 ➔ 41' : '40'})
                </span>
              </span>
            </div>
            <div className="font-bold">
              Interval Total: <span className="text-emerald-600 dark:text-emerald-400 text-sm">{totalCycles}</span> cycles
            </div>
          </div>
        </div>
      </div>

      {/* Takeaway & Footer */}
      <div
        className={`relative z-10 rounded-xl p-3 border text-xs font-mono flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 ${
          isWhite ? 'bg-white border-slate-200' : 'bg-slate-950/80 border-slate-800'
        }`}
      >
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded bg-emerald-500/20 text-emerald-500">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[10px] text-slate-400 font-semibold uppercase">TAKEAWAY</div>
            <div className={`text-xs font-medium ${isWhite ? 'text-slate-800' : 'text-slate-200'}`}>
              Cycle movements are recorded by direction and agreed classification.
            </div>
          </div>
        </div>
        <div className="text-right text-[11px] shrink-0 font-semibold text-emerald-600 dark:text-emerald-400">
          Result: 89 Cycles
        </div>
      </div>
    </div>
  );
}
