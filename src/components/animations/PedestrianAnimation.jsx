import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Users, ArrowRight, ArrowLeft, Activity, Info } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useSimulationPlayback } from './useSimulationPlayback';
import SimulationHeader from './SimulationHeader';

export default function PedestrianAnimation() {
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
    stepCount: 3,
    containerRef
  });

  // Start at eastbound 76 and westbound 63
  // Animate two eastbound and one westbound crossings
  // End at eastbound 78, westbound 64, total 142
  const showFinal = prefersReducedMotion || playbackState === 'completed';

  // Eastbound 1 crosses at ~0.35 -> 77
  // Westbound crosses at ~0.60 -> 64
  // Eastbound 2 crosses at ~0.85 -> 78
  const eastboundCount = showFinal
    ? 78
    : progress >= 0.85
    ? 78
    : progress >= 0.35
    ? 77
    : 76;

  const westboundCount = showFinal
    ? 64
    : progress >= 0.60
    ? 64
    : 63;

  const totalCount = eastboundCount + westboundCount;

  return (
    <div
      ref={containerRef}
      className={`relative w-full max-w-2xl mx-auto rounded-2xl p-4 sm:p-5 flex flex-col justify-between overflow-hidden transition-colors border shadow-xl ${
        isWhite
          ? 'bg-slate-50 border-slate-300 text-slate-800'
          : 'bg-slate-900/95 border-cyan-500/30 text-slate-100 shadow-[0_0_50px_rgba(6,182,212,0.12)]'
      }`}
    >
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />

      {/* Top Header & Controls */}
      <SimulationHeader
        title="Pedestrian Directional Count Example"
        icon={Users}
        accentColor="#06b6d4"
        playbackState={playbackState}
        onTogglePlay={togglePlay}
        onReplay={replay}
      />

      {/* Reduced Motion Notice */}
      {prefersReducedMotion && (
        <div className="relative z-10 mt-2 px-3 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-[11px] font-mono text-cyan-700 dark:text-cyan-300 flex items-center gap-2">
          <Info className="w-3.5 h-3.5 shrink-0" />
          <span>Reduced motion active: showing final pedestrian count interval results.</span>
        </div>
      )}

      {/* Main Pedestrian Scene */}
      <div className="relative z-10 my-3">
        <div
          className={`relative w-full h-44 rounded-xl border p-3 overflow-hidden flex flex-col justify-between ${
            isWhite ? 'bg-white border-slate-200' : 'bg-slate-950/80 border-slate-800'
          }`}
        >
          {/* Top Bar: Period Label & Direction Indicator */}
          <div className="flex items-center justify-between text-[11px] font-mono z-20">
            <span
              className={`px-2 py-0.5 rounded font-bold ${
                isWhite
                  ? 'bg-cyan-100 text-cyan-800 border border-cyan-200'
                  : 'bg-cyan-950/80 text-cyan-300 border border-cyan-500/30'
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
              Footway screenline observation
            </span>
          </div>

          {/* Visual Footway & Virtual Count Line */}
          <div className="relative flex-1 my-1 rounded-lg overflow-hidden flex items-center justify-center">
            {/* Pavement Surface */}
            <div
              className={`absolute inset-x-4 inset-y-2 rounded-lg border ${
                isWhite ? 'bg-slate-100 border-slate-300' : 'bg-slate-900/60 border-slate-700/60'
              }`}
            />

            {/* Central Marked Counting Line */}
            <div className="absolute top-2 bottom-2 left-1/2 w-0.5 border-l-2 border-dashed border-cyan-400 z-10">
              <div className="absolute -top-1 -left-12 px-1.5 py-0.5 bg-cyan-950 border border-cyan-400 rounded text-[9px] font-mono text-cyan-300 font-bold whitespace-nowrap">
                COUNT LINE
              </div>
            </div>

            {/* Direction Arrows & Badges */}
            <div className="absolute top-3 left-6 flex items-center gap-1 text-[10px] font-mono font-bold text-cyan-500 z-10">
              <span>Eastbound (Dir A)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>

            <div className="absolute bottom-3 right-6 flex items-center gap-1 text-[10px] font-mono font-bold text-emerald-500 z-10">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Westbound (Dir B)</span>
            </div>

            {/* Still Frame Pedestrians (when idle) */}
            {playbackState === 'idle' && !prefersReducedMotion && (
              <>
                <div
                  style={{ position: 'absolute', left: '25%', top: '38%', transform: 'translateY(-50%)' }}
                  className="z-20 flex items-center gap-1 opacity-80"
                >
                  <div className="w-6 h-6 rounded-full bg-cyan-400 text-slate-950 flex items-center justify-center font-bold text-xs shadow">
                    🚶
                  </div>
                  <span className="text-[9px] font-mono bg-slate-900 text-cyan-300 px-1 rounded border border-cyan-500/40">
                    Eastbound
                  </span>
                </div>

                <div
                  style={{ position: 'absolute', right: '25%', top: '62%', transform: 'translateY(-50%)' }}
                  className="z-20 flex items-center gap-1 opacity-80"
                >
                  <span className="text-[9px] font-mono bg-slate-900 text-emerald-300 px-1 rounded border border-emerald-500/40">
                    Westbound
                  </span>
                  <div className="w-6 h-6 rounded-full bg-emerald-400 text-slate-950 flex items-center justify-center font-bold text-xs shadow">
                    🚶‍♀️
                  </div>
                </div>
              </>
            )}

            {/* Animated Pedestrians during playback */}
            {!prefersReducedMotion && isPlaying && (
              <>
                {/* Eastbound 1: crosses around progress ~0.35 */}
                {progress >= 0.05 && progress <= 0.50 && (
                  <motion.div
                    style={{
                      position: 'absolute',
                      left: `${15 + (progress - 0.05) * 170}%`,
                      top: '38%',
                      transform: 'translateY(-50%)'
                    }}
                    className="z-20 flex items-center gap-1"
                  >
                    <div className="w-6 h-6 rounded-full bg-cyan-400 text-slate-950 flex items-center justify-center font-bold text-xs shadow-md">
                      🚶
                    </div>
                    <span className="text-[8px] font-mono bg-slate-950 text-cyan-300 px-1 rounded border border-cyan-500/30">
                      EB #1
                    </span>
                  </motion.div>
                )}

                {/* Westbound 1: crosses around progress ~0.60 */}
                {progress >= 0.30 && progress <= 0.75 && (
                  <motion.div
                    style={{
                      position: 'absolute',
                      right: `${15 + (progress - 0.30) * 170}%`,
                      top: '62%',
                      transform: 'translateY(-50%)'
                    }}
                    className="z-20 flex items-center gap-1"
                  >
                    <span className="text-[8px] font-mono bg-slate-950 text-emerald-300 px-1 rounded border border-emerald-500/30">
                      WB
                    </span>
                    <div className="w-6 h-6 rounded-full bg-emerald-400 text-slate-950 flex items-center justify-center font-bold text-xs shadow-md">
                      🚶‍♀️
                    </div>
                  </motion.div>
                )}

                {/* Eastbound 2: crosses around progress ~0.85 */}
                {progress >= 0.55 && progress <= 0.98 && (
                  <motion.div
                    style={{
                      position: 'absolute',
                      left: `${15 + (progress - 0.55) * 170}%`,
                      top: '38%',
                      transform: 'translateY(-50%)'
                    }}
                    className="z-20 flex items-center gap-1"
                  >
                    <div className="w-6 h-6 rounded-full bg-cyan-400 text-slate-950 flex items-center justify-center font-bold text-xs shadow-md">
                      🚶‍♂️
                    </div>
                    <span className="text-[8px] font-mono bg-slate-950 text-cyan-300 px-1 rounded border border-cyan-500/30">
                      EB #2
                    </span>
                  </motion.div>
                )}
              </>
            )}
          </div>

          {/* Directional Totals Counter Bar */}
          <div className="pt-2 border-t border-slate-700/60 flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-3">
              <span className="text-cyan-600 dark:text-cyan-400 font-bold">
                Eastbound: <strong>{eastboundCount}</strong>
              </span>
              <span>•</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                Westbound: <strong>{westboundCount}</strong>
              </span>
            </div>
            <div className="font-bold">
              Interval Total: <span className="text-cyan-600 dark:text-cyan-400 text-sm">{totalCount}</span> pedestrians
            </div>
          </div>
        </div>
      </div>

      {/* Takeaway & Summary Footer */}
      <div
        className={`relative z-10 rounded-xl p-3 border text-xs font-mono flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 ${
          isWhite ? 'bg-white border-slate-200' : 'bg-slate-950/80 border-slate-800'
        }`}
      >
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded bg-cyan-500/20 text-cyan-500">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[10px] text-slate-400 font-semibold uppercase">TAKEAWAY</div>
            <div className={`text-xs font-medium ${isWhite ? 'text-slate-800' : 'text-slate-200'}`}>
              Pedestrian movements are recorded by direction and time interval.
            </div>
          </div>
        </div>
        <div className="text-right text-[11px] shrink-0 font-semibold text-cyan-600 dark:text-cyan-400">
          Result: 142 Recorded
        </div>
      </div>
    </div>
  );
}
