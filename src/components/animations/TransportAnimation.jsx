import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Train, Users, Calculator, Info } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useSimulationPlayback } from './useSimulationPlayback';
import SimulationHeader from './SimulationHeader';

export default function TransportAnimation() {
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
    totalDurationMs: 5000,
    stepCount: 3,
    containerRef
  });

  // Data specification:
  // Starting onboard load 126
  // Alighting: 18
  // Boarding: 34
  // Departing load: 142
  // Calculation: 126 - 18 + 34 = 142
  const showFinal = prefersReducedMotion || playbackState === 'completed';

  // Progression:
  // Step 1: Train arrives at stop with 126 onboard (t: 0 to 0.3)
  // Step 2: Passengers alight (-18) -> onboard becomes 108 (t: 0.3 to 0.6)
  // Step 3: Passengers board (+34) -> departing load becomes 142 (t: 0.6 to 1.0)
  const currentAlighting = showFinal ? 18 : progress >= 0.3 ? (progress >= 0.55 ? 18 : Math.round(18 * ((progress - 0.3) / 0.25))) : 0;
  const currentBoarding = showFinal ? 34 : progress >= 0.6 ? Math.round(34 * ((progress - 0.6) / 0.35)) : 0;
  const currentOnboard = showFinal
    ? 142
    : progress < 0.3
    ? 126
    : Math.max(108, Math.min(142, 126 - currentAlighting + currentBoarding));

  return (
    <div
      ref={containerRef}
      className={`relative w-full max-w-2xl mx-auto rounded-2xl p-4 sm:p-5 flex flex-col justify-between overflow-hidden transition-colors border shadow-xl ${
        isWhite
          ? 'bg-slate-50 border-slate-300 text-slate-900'
          : 'bg-slate-900/95 border-purple-500/30 text-slate-100 shadow-[0_0_50px_rgba(168,85,247,0.12)]'
      }`}
    >
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />

      {/* Top Header & Controls */}
      <SimulationHeader
        title="Passenger Boarding & Alighting Example"
        icon={Train}
        accentColor="#a855f7"
        playbackState={playbackState}
        onTogglePlay={togglePlay}
        onReplay={replay}
      />

      {/* Reduced Motion Notice */}
      {prefersReducedMotion && (
        <div className="relative z-10 mt-2 px-3 py-1.5 rounded-lg bg-purple-500/10 border border-purple-500/30 text-[11px] font-mono text-purple-700 dark:text-purple-300 flex items-center gap-2">
          <Info className="w-3.5 h-3.5 shrink-0" />
          <span>Reduced motion active: showing passenger load calculations.</span>
        </div>
      )}

      {/* Main Transport Scene */}
      <div className="relative z-10 my-3">
        <div
          className={`relative w-full rounded-xl border p-3.5 overflow-hidden flex flex-col justify-between ${
            isWhite ? 'bg-white border-slate-200' : 'bg-slate-950/80 border-slate-800'
          }`}
        >
          {/* Top Bar: Station Label & Representative Note */}
          <div className="flex items-center justify-between text-[11px] font-mono mb-2">
            <span
              className={`px-2.5 py-0.5 rounded font-bold ${
                isWhite
                  ? 'bg-purple-100 text-purple-900 border border-purple-200'
                  : 'bg-purple-950/80 text-purple-300 border border-purple-500/30'
              }`}
            >
              Station Stop Observation
            </span>
            <span
              className={`text-[10px] px-2 py-0.5 rounded border ${
                isWhite
                  ? 'bg-slate-100 text-slate-600 border-slate-200'
                  : 'bg-slate-900/90 text-slate-400 border-slate-700'
              }`}
            >
              Representative figures animated
            </span>
          </div>

          {/* Platform & Train Track Stage */}
          <div className="relative h-28 my-1 rounded-lg overflow-hidden flex flex-col justify-between p-2 border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900/60">
            {/* Station Platform Edge */}
            <div className="flex items-center justify-between px-2 py-1 bg-slate-200 dark:bg-slate-800 rounded border-b-2 border-amber-400 text-[10px] font-mono">
              <span className="font-bold text-slate-700 dark:text-slate-300">
                PLATFORM 1
              </span>
              <div className="flex items-center gap-3">
                <span className="text-cyan-600 dark:text-cyan-400 font-semibold">
                  Alighting: -{currentAlighting}
                </span>
                <span className="text-purple-600 dark:text-purple-400 font-semibold">
                  Boarding: +{currentBoarding}
                </span>
              </div>
            </div>

            {/* Track Area with Train Carriages */}
            <div className="relative h-14 flex items-center overflow-hidden">
              {/* Rails */}
              <div className="absolute top-2 left-0 right-0 h-0.5 bg-slate-300 dark:bg-slate-700" />
              <div className="absolute bottom-2 left-0 right-0 h-0.5 bg-slate-300 dark:bg-slate-700" />

              {/* Train Carriage */}
              <div className="flex items-center gap-1.5 z-10 w-full justify-center">
                {/* Locomotive */}
                <div className="w-36 h-10 bg-gradient-to-r from-purple-700 to-indigo-700 rounded-l-2xl rounded-r-md flex items-center justify-between px-3 text-white shadow-md">
                  <div className="w-2.5 h-2 bg-yellow-300 rounded-full" />
                  <span className="text-[10px] font-mono font-bold">SERVICE-01</span>
                  <div className="flex gap-1">
                    <div className="w-3 h-2 bg-sky-200/90 rounded" />
                    <div className="w-3 h-2 bg-sky-200/90 rounded" />
                  </div>
                </div>

                {/* Carriage 2 */}
                <div className="w-32 h-10 bg-gradient-to-r from-purple-800 to-indigo-800 rounded-md flex items-center justify-around px-2 text-white shadow-sm">
                  <div className="w-3 h-2 bg-sky-200/90 rounded" />
                  <span className="text-[9px] font-mono text-purple-200 font-semibold">PASSENGER CAR</span>
                  <div className="w-3 h-2 bg-sky-200/90 rounded" />
                </div>
              </div>

              {/* Representative animated passenger icons */}
              {!prefersReducedMotion && isPlaying && (
                <>
                  {/* Alighting representative icon moving down */}
                  {progress >= 0.3 && progress <= 0.58 && (
                    <motion.div
                      initial={{ y: -6, opacity: 0 }}
                      animate={{ y: 12, opacity: 1 }}
                      className="absolute left-1/3 top-1 z-20 flex items-center gap-0.5 bg-cyan-500 text-slate-950 px-1 py-0.5 rounded text-[8px] font-mono font-bold shadow"
                    >
                      <span>Alighting</span>
                      <span>↓</span>
                    </motion.div>
                  )}

                  {/* Boarding representative icon moving up */}
                  {progress >= 0.6 && progress <= 0.95 && (
                    <motion.div
                      initial={{ y: 14, opacity: 0 }}
                      animate={{ y: -4, opacity: 1 }}
                      className="absolute right-1/3 bottom-1 z-20 flex items-center gap-0.5 bg-purple-500 text-white px-1 py-0.5 rounded text-[8px] font-mono font-bold shadow"
                    >
                      <span>Boarding</span>
                      <span>↑</span>
                    </motion.div>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Explicit Calculation Display: 126 - 18 + 34 = 142 */}
          <div
            className={`mt-2 p-2.5 rounded-lg border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs font-mono ${
              isWhite ? 'bg-purple-50/60 border-purple-200' : 'bg-purple-950/40 border-purple-800/60'
            }`}
          >
            <div className="flex items-center gap-2">
              <Calculator className="w-4 h-4 text-purple-500 shrink-0" />
              <span className="font-semibold text-slate-700 dark:text-slate-200">
                Calculation:
              </span>
              <span className="font-bold text-sm tracking-wide text-purple-700 dark:text-purple-300">
                126 - 18 + 34 = 142
              </span>
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400">
              Departing Load: <strong className="text-purple-600 dark:text-purple-400 text-sm">{currentOnboard}</strong>
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
          <div className="p-1.5 rounded bg-purple-500/20 text-purple-500">
            <Users className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[10px] text-slate-400 font-semibold uppercase">TAKEAWAY</div>
            <div className={`text-xs font-medium ${isWhite ? 'text-slate-800' : 'text-slate-200'}`}>
              Boarding and alighting counts help describe passenger loads along a route.
            </div>
          </div>
        </div>
        <div className="text-right text-[11px] shrink-0 font-semibold text-purple-600 dark:text-purple-400">
          Load Profile: 126 ➔ 142
        </div>
      </div>
    </div>
  );
}
