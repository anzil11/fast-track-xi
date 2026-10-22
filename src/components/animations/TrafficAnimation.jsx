import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Car, ArrowUp, ArrowLeft, ArrowRight, Gauge, Info } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useSimulationPlayback } from './useSimulationPlayback';
import SimulationHeader from './SimulationHeader';

export default function TrafficAnimation() {
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
    totalDurationMs: 4800,
    stepCount: 4,
    containerRef
  });

  // Starting baseline counts
  // Final target counts: left 142, ahead 588, right 96, approach total 826
  const baseLeft = 141;
  const baseAhead = 586;
  const baseRight = 95;

  // As vehicles cross during finite sequence:
  // Car 1 (left): crosses around progress ~ 0.35 -> left becomes 142
  // Car 2 (ahead 1): crosses around progress ~ 0.50 -> ahead becomes 587
  // Car 3 (ahead 2): crosses around progress ~ 0.70 -> ahead becomes 588
  // Car 4 (right): crosses around progress ~ 0.85 -> right becomes 96
  const showFinal = prefersReducedMotion || playbackState === 'completed';

  const leftCount = showFinal ? 142 : progress >= 0.35 ? 142 : baseLeft;
  const aheadCount = showFinal
    ? 588
    : progress >= 0.70
    ? 588
    : progress >= 0.50
    ? 587
    : baseAhead;
  const rightCount = showFinal ? 96 : progress >= 0.85 ? 96 : baseRight;
  const approachTotal = leftCount + aheadCount + rightCount;

  return (
    <div
      ref={containerRef}
      className={`relative w-full max-w-2xl mx-auto rounded-2xl p-4 sm:p-5 flex flex-col justify-between overflow-hidden transition-colors border shadow-xl ${
        isWhite
          ? 'bg-slate-50 border-slate-300 text-slate-800'
          : 'bg-slate-900/95 border-sky-500/30 text-slate-100 shadow-[0_0_50px_rgba(14,165,233,0.12)]'
      }`}
    >
      {/* Background Track Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />

      {/* Top Header & Controls */}
      <SimulationHeader
        title="Junction Turning Count Example"
        icon={Car}
        accentColor="#0284c7"
        playbackState={playbackState}
        onTogglePlay={togglePlay}
        onReplay={replay}
      />

      {/* Reduced Motion Notice */}
      {prefersReducedMotion && (
        <div className="relative z-10 mt-2 px-3 py-1.5 rounded-lg bg-sky-500/10 border border-sky-500/30 text-[11px] font-mono text-sky-700 dark:text-sky-300 flex items-center gap-2">
          <Info className="w-3.5 h-3.5 shrink-0" />
          <span>Reduced motion active: showing final junction turning counts.</span>
        </div>
      )}

      {/* Junction Flow Stage */}
      <div className="relative z-10 my-3">
        <div
          className={`relative w-full h-44 rounded-xl border p-3 overflow-hidden flex flex-col justify-between ${
            isWhite ? 'bg-white border-slate-200' : 'bg-slate-950/80 border-slate-800'
          }`}
        >
          {/* Top Bar inside Scene: Period & Scene Label */}
          <div className="flex items-center justify-between text-[11px] font-mono z-20">
            <span
              className={`px-2 py-0.5 rounded font-bold ${
                isWhite
                  ? 'bg-sky-100 text-sky-800 border border-sky-200'
                  : 'bg-sky-950/80 text-sky-300 border border-sky-500/30'
              }`}
            >
              Example period: 08:00-09:00
            </span>
            <span
              className={`text-[10px] px-2 py-0.5 rounded border ${
                isWhite
                  ? 'bg-slate-100 text-slate-600 border-slate-200'
                  : 'bg-slate-900/90 text-slate-400 border-slate-700'
              }`}
            >
              Selected movements illustrated
            </span>
          </div>

          {/* Visual Junction Diagram */}
          <div className="relative flex-1 my-1 rounded-lg overflow-hidden flex items-center justify-center">
            {/* Roadway Surface */}
            <div
              className={`absolute inset-x-8 inset-y-2 rounded-lg border ${
                isWhite ? 'bg-slate-100 border-slate-300' : 'bg-slate-900/60 border-slate-700/60'
              }`}
            />

            {/* Virtual Count Line (Highlighted Approach) */}
            <div className="absolute left-1/3 top-2 bottom-2 w-0.5 border-l-2 border-dashed border-sky-400 z-10">
              <span className="absolute -top-1 -left-10 text-[9px] font-mono font-bold text-sky-500">
                COUNT LINE
              </span>
            </div>

            {/* Turn Movement Arrows in Junction Node */}
            <div className="absolute right-4 top-2 bottom-2 flex flex-col justify-around text-[10px] font-mono z-10">
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-slate-900/90 text-cyan-300 border border-cyan-500/40">
                <ArrowLeft className="w-3 h-3 text-cyan-400" />
                <span>Left: <strong>{leftCount}</strong> veh/h</span>
              </div>
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-slate-900/90 text-sky-300 border border-sky-500/40">
                <ArrowUp className="w-3 h-3 text-sky-400" />
                <span>Ahead: <strong>{aheadCount}</strong> veh/h</span>
              </div>
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-slate-900/90 text-amber-300 border border-amber-500/40">
                <ArrowRight className="w-3 h-3 text-amber-400" />
                <span>Right: <strong>{rightCount}</strong> veh/h</span>
              </div>
            </div>

            {/* Animated Sample Vehicles crossing the line */}
            {!prefersReducedMotion && isPlaying && (
              <>
                {/* Vehicle 1: Left turn (t: 0.1 to 0.45) */}
                {progress >= 0.05 && progress <= 0.45 && (
                  <motion.div
                    style={{
                      position: 'absolute',
                      left: `${15 + (progress - 0.05) * 160}%`,
                      top: progress > 0.3 ? `${45 - (progress - 0.3) * 120}%` : '50%',
                      transform: 'translateY(-50%)'
                    }}
                    className="z-20 flex items-center gap-1"
                  >
                    <div className="w-7 h-5 rounded bg-cyan-400 text-slate-950 flex items-center justify-center shadow-md font-bold text-[9px]">
                      <Car className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-[8px] font-mono bg-slate-950 text-cyan-300 px-1 rounded border border-cyan-500/30">
                      Left
                    </span>
                  </motion.div>
                )}

                {/* Vehicle 2: Ahead (t: 0.35 to 0.75) */}
                {progress >= 0.35 && progress <= 0.75 && (
                  <motion.div
                    style={{
                      position: 'absolute',
                      left: `${15 + (progress - 0.35) * 180}%`,
                      top: '50%',
                      transform: 'translateY(-50%)'
                    }}
                    className="z-20 flex items-center gap-1"
                  >
                    <div className="w-7 h-5 rounded bg-sky-500 text-slate-950 flex items-center justify-center shadow-md font-bold text-[9px]">
                      <Car className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-[8px] font-mono bg-slate-950 text-sky-300 px-1 rounded border border-sky-500/30">
                      Ahead
                    </span>
                  </motion.div>
                )}

                {/* Vehicle 3: Right turn (t: 0.65 to 0.95) */}
                {progress >= 0.65 && progress <= 0.98 && (
                  <motion.div
                    style={{
                      position: 'absolute',
                      left: `${15 + (progress - 0.65) * 150}%`,
                      top: progress > 0.8 ? `${50 + (progress - 0.8) * 120}%` : '50%',
                      transform: 'translateY(-50%)'
                    }}
                    className="z-20 flex items-center gap-1"
                  >
                    <div className="w-7 h-5 rounded bg-amber-400 text-slate-950 flex items-center justify-center shadow-md font-bold text-[9px]">
                      <Car className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-[8px] font-mono bg-slate-950 text-amber-300 px-1 rounded border border-amber-500/30">
                      Right
                    </span>
                  </motion.div>
                )}
              </>
            )}

            {/* Static Initial Frame Car when idle */}
            {playbackState === 'idle' && !prefersReducedMotion && (
              <div
                style={{ position: 'absolute', left: '20%', top: '50%', transform: 'translateY(-50%)' }}
                className="z-20 flex items-center gap-1 opacity-90"
              >
                <div className="w-7 h-5 rounded bg-sky-500 text-slate-950 flex items-center justify-center shadow font-bold text-[9px]">
                  <Car className="w-3.5 h-3.5" />
                </div>
                <span className="text-[8px] font-mono bg-slate-950 text-sky-300 px-1 rounded border border-sky-500/30">
                  Sample
                </span>
              </div>
            )}
          </div>

          {/* Approach total bar */}
          <div className="pt-2 border-t border-slate-700/60 flex items-center justify-between text-xs font-mono">
            <span className={isWhite ? 'text-slate-600' : 'text-slate-400'}>
              Surveyed Approach
            </span>
            <span className="font-bold">
              Approach Total: <span className="text-sky-500 text-sm">{approachTotal}</span> vehicles
            </span>
          </div>
        </div>
      </div>

      {/* Takeaway & Reporting Breakdown */}
      <div
        className={`relative z-10 rounded-xl p-3 border text-xs font-mono flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 ${
          isWhite ? 'bg-white border-slate-200' : 'bg-slate-950/80 border-slate-800'
        }`}
      >
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded bg-sky-500/20 text-sky-500">
            <Gauge className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[10px] text-slate-400 font-semibold uppercase">TAKEAWAY</div>
            <div className={`text-xs font-medium ${isWhite ? 'text-slate-800' : 'text-slate-200'}`}>
              Counts are grouped by movement and reporting period.
            </div>
          </div>
        </div>
        <div className="text-right text-[11px] shrink-0 font-semibold text-sky-500">
          Period Total: 826 veh/h
        </div>
      </div>
    </div>
  );
}
