import React, { useRef } from 'react';
import { Home, Table, CheckCircle2, ArrowRight, Info } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useSimulationPlayback } from './useSimulationPlayback';
import SimulationHeader from './SimulationHeader';

export default function HouseholdAnimation() {
  const containerRef = useRef(null);
  const { isWhite } = useTheme();

  const {
    playbackState,
    progress,
    prefersReducedMotion,
    togglePlay,
    replay
  } = useSimulationPlayback({
    totalDurationMs: 4800,
    stepCount: 3,
    containerRef
  });

  // Specification:
  // 45 participating households
  // Completed diaries change from 41 to 42
  // Add the final diary's three journeys to change recorded journeys from 215 to 218
  // Label as an illustrative project summary.
  // Do not imply a fixed seven-day diary is standard for every project.
  const showFinal = prefersReducedMotion || playbackState === 'completed';

  const participatingHouseholds = 45;

  // Journey rows in final diary:
  // 1. Work (progress >= 0.35) -> +1 journey (216)
  // 2. Shops (progress >= 0.60) -> +2 journeys (217)
  // 3. Leisure (progress >= 0.85) -> +3 journeys (218) and diary completes (42)
  const journey1Logged = showFinal || progress >= 0.35;
  const journey2Logged = showFinal || progress >= 0.60;
  const journey3Logged = showFinal || progress >= 0.85;

  const completedDiaries = showFinal ? 42 : journey3Logged ? 42 : 41;
  const recordedJourneys = showFinal
    ? 218
    : journey3Logged
    ? 218
    : journey2Logged
    ? 217
    : journey1Logged
    ? 216
    : 215;

  return (
    <div
      ref={containerRef}
      className={`relative w-full max-w-2xl mx-auto rounded-2xl p-4 sm:p-5 flex flex-col justify-between overflow-hidden transition-colors border shadow-xl ${
        isWhite
          ? 'bg-slate-50 border-slate-300 text-slate-900'
          : 'bg-slate-900/95 border-pink-500/30 text-slate-100 shadow-[0_0_50px_rgba(236,72,153,0.12)]'
      }`}
    >
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />

      {/* Top Header & Controls */}
      <SimulationHeader
        title="Household Travel Diary Example"
        icon={Home}
        accentColor="#ec4899"
        playbackState={playbackState}
        onTogglePlay={togglePlay}
        onReplay={replay}
      />

      {/* Reduced Motion Notice */}
      {prefersReducedMotion && (
        <div className="relative z-10 mt-2 px-3 py-1.5 rounded-lg bg-pink-500/10 border border-pink-500/30 text-[11px] font-mono text-pink-700 dark:text-pink-300 flex items-center gap-2">
          <Info className="w-3.5 h-3.5 shrink-0" />
          <span>Reduced motion active: showing final household travel diary summary.</span>
        </div>
      )}

      {/* Main Household Diary Scene */}
      <div className="relative z-10 my-3">
        <div
          className={`relative w-full rounded-xl border p-3.5 overflow-hidden flex flex-col justify-between ${
            isWhite ? 'bg-white border-slate-200' : 'bg-slate-950/80 border-slate-800'
          }`}
        >
          {/* Header Bar with Project Summary Label */}
          <div className="flex items-center justify-between text-[11px] font-mono mb-3">
            <span
              className={`px-2.5 py-0.5 rounded font-bold ${
                isWhite
                  ? 'bg-pink-100 text-pink-900 border border-pink-200'
                  : 'bg-pink-950/80 text-pink-300 border border-pink-500/30'
              }`}
            >
              Illustrative project summary
            </span>
            <span
              className={`text-[10px] px-2 py-0.5 rounded border ${
                isWhite
                  ? 'bg-slate-100 text-slate-600 border-slate-200'
                  : 'bg-slate-900/90 text-slate-400 border-slate-700'
              }`}
            >
              Agreed survey duration
            </span>
          </div>

          {/* Grid Layout: Diary Submissions feeding into Summary */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 mb-2">
            {/* Left: Final Household Diary Submission (3 journeys) */}
            <div
              className={`md:col-span-7 rounded-lg p-3 border space-y-2 ${
                isWhite ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/60 border-slate-800'
              }`}
            >
              <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 border-b border-slate-200 dark:border-slate-800 pb-1">
                <span>SUBMITTED DIARY: HOUSEHOLD #42</span>
                <span className="text-pink-500 font-bold">3 JOURNEYS</span>
              </div>

              {/* 3 Example Journey Rows */}
              <div className="space-y-1.5 text-xs font-mono">
                {/* Row 1: Work */}
                <div className="p-2 rounded bg-white dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 block">JOURNEY 1</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                      Home ➔ Work
                    </span>
                    <span className="text-[10px] text-pink-600 dark:text-pink-400 ml-2">
                      (Purpose: Work)
                    </span>
                  </div>
                  {journey1Logged ? (
                    <span className="flex items-center gap-1 text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Logged
                    </span>
                  ) : (
                    <span className="text-[10px] text-slate-400 italic">Submitting...</span>
                  )}
                </div>

                {/* Row 2: Shops */}
                <div className="p-2 rounded bg-white dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 block">JOURNEY 2</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                      Work ➔ Shops
                    </span>
                    <span className="text-[10px] text-pink-600 dark:text-pink-400 ml-2">
                      (Purpose: Shops)
                    </span>
                  </div>
                  {journey2Logged ? (
                    <span className="flex items-center gap-1 text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Logged
                    </span>
                  ) : (
                    <span className="text-[10px] text-slate-400 italic">Pending...</span>
                  )}
                </div>

                {/* Row 3: Leisure */}
                <div className="p-2 rounded bg-white dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 block">JOURNEY 3</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                      Shops ➔ Leisure
                    </span>
                    <span className="text-[10px] text-pink-600 dark:text-pink-400 ml-2">
                      (Purpose: Leisure)
                    </span>
                  </div>
                  {journey3Logged ? (
                    <span className="flex items-center gap-1 text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Logged
                    </span>
                  ) : (
                    <span className="text-[10px] text-slate-400 italic">Pending...</span>
                  )}
                </div>
              </div>
            </div>

            {/* Right: Aggregated Summary feeding into project totals */}
            <div
              className={`md:col-span-5 rounded-lg p-3 border flex flex-col justify-between ${
                isWhite ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/60 border-slate-800'
              }`}
            >
              <div className="text-[10px] font-mono text-slate-400 border-b border-slate-200 dark:border-slate-800 pb-1 flex items-center gap-1.5">
                <Table className="w-3.5 h-3.5 text-pink-500" />
                <span>PROJECT AGGREGATION</span>
              </div>

              <div className="space-y-3 py-2 text-xs font-mono">
                <div>
                  <div className="text-[10px] text-slate-400">PARTICIPATING HOUSEHOLDS</div>
                  <div className="text-base font-bold text-slate-800 dark:text-white">
                    {participatingHouseholds} Households
                  </div>
                </div>

                <div>
                  <div className="text-[10px] text-slate-400">COMPLETED DIARIES</div>
                  <div className="text-base font-bold text-pink-600 dark:text-pink-400 flex items-center gap-1.5">
                    <span>{completedDiaries}</span>
                    <span className="text-[10px] text-slate-400 font-normal">
                      ({completedDiaries === 42 ? '41 ➔ 42' : '41'}) of 45
                    </span>
                  </div>
                </div>

                <div>
                  <div className="text-[10px] text-slate-400">TOTAL RECORDED JOURNEYS</div>
                  <div className="text-base font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                    <span>{recordedJourneys}</span>
                    <span className="text-[10px] text-slate-400 font-normal">
                      ({recordedJourneys === 218 ? '215 + 3 ➔ 218' : '215'})
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-[10px] font-mono text-slate-500 pt-1 text-right">
                All records validated
              </div>
            </div>
          </div>

          {/* Bottom Feed Status */}
          <div className="pt-2 border-t border-slate-700/60 flex items-center justify-between text-xs font-mono">
            <span className={isWhite ? 'text-slate-600' : 'text-slate-400'}>
              Participating: <strong>45 Households</strong>
            </span>
            <span className="font-bold">
              Diaries Completed:{' '}
              <span className="text-pink-600 dark:text-pink-400">{completedDiaries} / 45</span>
              {' • '}
              Journeys:{' '}
              <span className="text-emerald-600 dark:text-emerald-400">{recordedJourneys}</span>
            </span>
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
          <div className="p-1.5 rounded bg-pink-500/20 text-pink-500">
            <Home className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[10px] text-slate-400 font-semibold uppercase">TAKEAWAY</div>
            <div className={`text-xs font-medium ${isWhite ? 'text-slate-800' : 'text-slate-200'}`}>
              Travel diaries record journeys over an agreed period.
            </div>
          </div>
        </div>
        <div className="text-right text-[11px] shrink-0 font-semibold text-pink-600 dark:text-pink-400">
          218 Total Journeys
        </div>
      </div>
    </div>
  );
}
