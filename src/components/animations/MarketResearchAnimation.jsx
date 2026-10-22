import React, { useRef } from 'react';
import { BarChart3, ShoppingBag, Utensils, Compass, CheckCircle2, Info } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useSimulationPlayback } from './useSimulationPlayback';
import SimulationHeader from './SimulationHeader';

export default function MarketResearchAnimation() {
  const containerRef = useRef(null);
  const { isWhite } = useTheme();

  const {
    playbackState,
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
  // End at 185 completed interviews.
  // Visit-purpose counts:
  // - Shopping 100 (54%, rounded)
  // - Dining/Leisure 57 (31%, rounded)
  // - Other 28 (15%, rounded)
  // Satisfaction: "163 of 185 respondents satisfied (88%, rounded)."
  // Label: "One response per respondent with all 185 answering."
  const showFinal = prefersReducedMotion || playbackState === 'completed';

  // Baseline start at 184 completed (Shopping 99), then 185th interview response arrives
  const responseLogged = showFinal || progress >= 0.55;

  const totalInterviews = responseLogged ? 185 : 184;
  const shoppingCount = responseLogged ? 100 : 99;
  const diningCount = 57;
  const otherCount = 28;

  const shoppingPct = 54;
  const diningPct = 31;
  const otherPct = 15;

  return (
    <div
      ref={containerRef}
      className={`relative w-full max-w-2xl mx-auto rounded-2xl p-4 sm:p-5 flex flex-col justify-between overflow-hidden transition-colors border shadow-xl ${
        isWhite
          ? 'bg-slate-50 border-slate-300 text-slate-900'
          : 'bg-slate-900/95 border-orange-500/30 text-slate-100 shadow-[0_0_50px_rgba(249,115,22,0.12)]'
      }`}
    >
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />

      {/* Top Header & Controls */}
      <SimulationHeader
        title="Visitor Feedback Example"
        icon={BarChart3}
        accentColor="#f97316"
        playbackState={playbackState}
        onTogglePlay={togglePlay}
        onReplay={replay}
      />

      {/* Reduced Motion Notice */}
      {prefersReducedMotion && (
        <div className="relative z-10 mt-2 px-3 py-1.5 rounded-lg bg-orange-500/10 border border-orange-500/30 text-[11px] font-mono text-orange-700 dark:text-orange-300 flex items-center gap-2">
          <Info className="w-3.5 h-3.5 shrink-0" />
          <span>Reduced motion active: showing final visitor feedback summaries.</span>
        </div>
      )}

      {/* Main Feedback Scene */}
      <div className="relative z-10 my-3">
        <div
          className={`relative w-full rounded-xl border p-3.5 overflow-hidden flex flex-col justify-between ${
            isWhite ? 'bg-white border-slate-200' : 'bg-slate-950/80 border-slate-800'
          }`}
        >
          {/* Header Bar with Respondent Methodology Label */}
          <div className="flex items-center justify-between text-[11px] font-mono mb-3">
            <span
              className={`px-2.5 py-0.5 rounded font-bold ${
                isWhite
                  ? 'bg-orange-100 text-orange-900 border border-orange-200'
                  : 'bg-orange-950/80 text-orange-300 border border-orange-500/30'
              }`}
            >
              Completed dataset: {totalInterviews} interviews
            </span>
            <span
              className={`text-[10px] px-2 py-0.5 rounded border ${
                isWhite
                  ? 'bg-slate-100 text-slate-600 border-slate-200'
                  : 'bg-slate-900/90 text-slate-400 border-slate-700'
              }`}
            >
              One response per respondent with all 185 answering
            </span>
          </div>

          {/* Grid Layout: Interview Response Box + Purpose & Satisfaction Chart */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 mb-2">
            {/* Left: Latest Intercept Response */}
            <div
              className={`md:col-span-4 rounded-lg p-3 border flex flex-col justify-between ${
                isWhite ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/60 border-slate-800'
              }`}
            >
              <div className="text-[10px] font-mono text-slate-400 border-b border-slate-200 dark:border-slate-800 pb-1">
                INCOMING INTERVIEW #185
              </div>

              <div className="my-2 space-y-1.5 text-xs font-mono">
                <div>
                  <span className="text-[9px] text-slate-400 block">VISIT PURPOSE</span>
                  <span className="font-bold text-orange-600 dark:text-orange-400 flex items-center gap-1">
                    <ShoppingBag className="w-3.5 h-3.5" />
                    Shopping
                  </span>
                </div>

                <div>
                  <span className="text-[9px] text-slate-400 block">SATISFACTION</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Satisfied
                  </span>
                </div>
              </div>

              <div className="text-[10px] font-mono text-slate-500 pt-1 border-t border-slate-200 dark:border-slate-800">
                {responseLogged ? (
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                    ✓ Recorded into summary
                  </span>
                ) : (
                  <span className="italic">Interview in progress...</span>
                )}
              </div>
            </div>

            {/* Right: Visit-Purpose Chart & Satisfaction Metric */}
            <div
              className={`md:col-span-8 rounded-lg p-3 border space-y-2.5 ${
                isWhite ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/60 border-slate-800'
              }`}
            >
              <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 border-b border-slate-200 dark:border-slate-800 pb-1">
                <span>VISIT PURPOSE BREAKDOWN</span>
                <span className="font-bold text-slate-700 dark:text-slate-300">
                  {totalInterviews} RESPONSES
                </span>
              </div>

              {/* 3 Categories with Color + Text & Symbols */}
              <div className="space-y-2 text-xs font-mono">
                {/* 1. Shopping */}
                <div className="space-y-0.5">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="flex items-center gap-1 font-semibold text-slate-700 dark:text-slate-200">
                      <ShoppingBag className="w-3 h-3 text-orange-500" />
                      <span>Shopping: <strong>{shoppingCount}</strong></span>
                    </span>
                    <span className="font-bold text-orange-600 dark:text-orange-400">
                      {shoppingPct}%
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-orange-500 transition-all duration-500"
                      style={{ width: `${shoppingPct}%` }}
                    />
                  </div>
                </div>

                {/* 2. Dining / Leisure */}
                <div className="space-y-0.5">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="flex items-center gap-1 font-semibold text-slate-700 dark:text-slate-200">
                      <Utensils className="w-3 h-3 text-amber-500" />
                      <span>Dining & Leisure: <strong>{diningCount}</strong></span>
                    </span>
                    <span className="font-bold text-amber-600 dark:text-amber-400">
                      {diningPct}%
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-amber-500 transition-all duration-500"
                      style={{ width: `${diningPct}%` }}
                    />
                  </div>
                </div>

                {/* 3. Other */}
                <div className="space-y-0.5">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="flex items-center gap-1 font-semibold text-slate-700 dark:text-slate-200">
                      <Compass className="w-3 h-3 text-cyan-500" />
                      <span>Other: <strong>{otherCount}</strong></span>
                    </span>
                    <span className="font-bold text-cyan-600 dark:text-cyan-400">
                      {otherPct}%
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-cyan-500 transition-all duration-500"
                      style={{ width: `${otherPct}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Satisfaction Summary Callout */}
              <div
                className={`pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs font-mono ${
                  isWhite ? 'text-slate-800' : 'text-slate-200'
                }`}
              >
                <span className="text-slate-500 text-[11px]">Satisfaction:</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  163 of 185 respondents satisfied (88%, rounded)
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Bar: Final Status */}
          <div className="pt-2 border-t border-slate-700/60 flex items-center justify-between text-xs font-mono">
            <span className={isWhite ? 'text-slate-600' : 'text-slate-400'}>
              Target Sample: <strong>185 Completed</strong>
            </span>
            <span className="font-bold">
              Breakdown:{' '}
              <span className="text-orange-600 dark:text-orange-400">100 Shop</span> •{' '}
              <span className="text-amber-600 dark:text-amber-400">57 Dining</span> •{' '}
              <span className="text-cyan-600 dark:text-cyan-400">28 Other</span>
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
          <div className="p-1.5 rounded bg-orange-500/20 text-orange-500">
            <BarChart3 className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[10px] text-slate-400 font-semibold uppercase">TAKEAWAY</div>
            <div className={`text-xs font-medium ${isWhite ? 'text-slate-800' : 'text-slate-200'}`}>
              Interview responses are grouped into clear summaries.
            </div>
          </div>
        </div>
        <div className="text-right text-[11px] shrink-0 font-semibold text-orange-600 dark:text-orange-400">
          Sample: 185 Completed
        </div>
      </div>
    </div>
  );
}
