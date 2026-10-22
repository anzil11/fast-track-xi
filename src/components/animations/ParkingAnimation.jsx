import React, { useRef } from 'react';
import { Car, BarChart2, Info } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useSimulationPlayback } from './useSimulationPlayback';
import SimulationHeader from './SimulationHeader';

export default function ParkingAnimation() {
  const containerRef = useRef(null);
  const { isWhite } = useTheme();

  const {
    playbackState,
    progress,
    prefersReducedMotion,
    togglePlay,
    replay
  } = useSimulationPlayback({
    totalDurationMs: 5000,
    stepCount: 3,
    containerRef
  });

  const capacity = 50;

  // 3 distinct observation rounds:
  // Round 1: 09:00 - 30 occupied (60%)
  // Round 2: 10:00 - 38 occupied (76%)
  // Round 3: 11:00 - 35 occupied (70%)
  const rounds = [
    { time: '09:00', occupied: 30, pct: 60, label: 'Round 1 (09:00)' },
    { time: '10:00', occupied: 38, pct: 76, label: 'Round 2 (10:00)' },
    { time: '11:00', occupied: 35, pct: 70, label: 'Round 3 (11:00)' }
  ];

  const currentRoundIndex = prefersReducedMotion || playbackState === 'completed'
    ? 2
    : progress >= 0.66
    ? 2
    : progress >= 0.33
    ? 1
    : 0;

  const currentRound = rounds[currentRoundIndex];

  // Visual sample bays representation (10 representative bays to illustrate occupancy)
  // At 60%: 6 occupied, 4 empty
  // At 76%: ~8 occupied, 2 empty
  // At 70%: 7 occupied, 3 empty
  const bayStatusPattern = [
    [true, true, false, true, true, false, true, false, true, false], // 60%
    [true, true, true, true, true, false, true, true, true, false],   // 76% (8/10)
    [true, true, true, true, true, false, true, false, true, true]    // 70% (7/10)
  ];
  const activeBays = bayStatusPattern[currentRoundIndex];

  return (
    <div
      ref={containerRef}
      className={`relative w-full max-w-2xl mx-auto rounded-2xl p-4 sm:p-5 flex flex-col justify-between overflow-hidden transition-colors border shadow-xl ${
        isWhite
          ? 'bg-slate-50 border-slate-300 text-slate-800'
          : 'bg-slate-900/95 border-amber-500/30 text-slate-100 shadow-[0_0_50px_rgba(245,158,11,0.12)]'
      }`}
    >
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />

      {/* Top Header & Controls */}
      <SimulationHeader
        title="Parking Occupancy Example"
        icon={Car}
        accentColor="#f59e0b"
        playbackState={playbackState}
        onTogglePlay={togglePlay}
        onReplay={replay}
      />

      {/* Reduced Motion Notice */}
      {prefersReducedMotion && (
        <div className="relative z-10 mt-2 px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-[11px] font-mono text-amber-700 dark:text-amber-300 flex items-center gap-2">
          <Info className="w-3.5 h-3.5 shrink-0" />
          <span>Reduced motion active: showing repeated observation rounds across the survey.</span>
        </div>
      )}

      {/* Main Interactive Stage */}
      <div className="relative z-10 my-3">
        <div
          className={`relative w-full rounded-xl border p-3.5 flex flex-col justify-between ${
            isWhite ? 'bg-white border-slate-200' : 'bg-slate-950/80 border-slate-800'
          }`}
        >
          {/* Header Bar with Capacity & Scope Label */}
          <div className="flex items-center justify-between text-[11px] font-mono mb-3">
            <span
              className={`px-2.5 py-0.5 rounded font-bold ${
                isWhite
                  ? 'bg-amber-100 text-amber-900 border border-amber-200'
                  : 'bg-amber-950/80 text-amber-300 border border-amber-500/30'
              }`}
            >
              Capacity: {capacity} spaces
            </span>
            <span
              className={`text-[10px] px-2 py-0.5 rounded border ${
                isWhite
                  ? 'bg-slate-100 text-slate-600 border-slate-200'
                  : 'bg-slate-900/90 text-slate-400 border-slate-700'
              }`}
            >
              Selected bays shown
            </span>
          </div>

          {/* Parking Bay Diagram & Occupancy Chart Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 mb-2">
            {/* Bay Diagram (Left) */}
            <div
              className={`md:col-span-6 rounded-lg p-3 border flex flex-col justify-between ${
                isWhite ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/60 border-slate-800'
              }`}
            >
              <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-2">
                <span>BAY OBSERVATION SAMPLE</span>
                <span className="font-bold text-amber-500">{currentRound.label}</span>
              </div>

              {/* 10 Representative Bays */}
              <div className="grid grid-cols-5 gap-1.5 py-1">
                {activeBays.map((isOccupied, idx) => (
                  <div
                    key={idx}
                    className={`h-10 rounded border-2 border-dashed flex flex-col items-center justify-center transition-all ${
                      isOccupied
                        ? 'border-amber-500/80 bg-amber-500/20 text-amber-500'
                        : isWhite
                        ? 'border-slate-300 bg-white text-slate-400'
                        : 'border-slate-700 bg-slate-950/50 text-slate-600'
                    }`}
                  >
                    {isOccupied ? (
                      <Car className="w-4 h-4" />
                    ) : (
                      <span className="text-[9px] font-mono">Empty</span>
                    )}
                  </div>
                ))}
              </div>

              <div className="text-[10px] font-mono text-slate-400 text-center mt-2">
                Occupied: <strong>{currentRound.occupied}</strong> / {capacity} ({currentRound.pct}%)
              </div>
            </div>

            {/* Occupancy Chart (Right) */}
            <div
              className={`md:col-span-6 rounded-lg p-3 border flex flex-col justify-between ${
                isWhite ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/60 border-slate-800'
              }`}
            >
              <div className="text-[10px] font-mono text-slate-400 mb-2">
                OCCUPANCY BY OBSERVATION ROUND
              </div>

              <div className="space-y-2 py-0.5">
                {rounds.map((r, rIdx) => {
                  const isCurrent = rIdx === currentRoundIndex;
                  const isPastOrCurrent = rIdx <= currentRoundIndex || prefersReducedMotion;

                  return (
                    <div key={r.time} className="space-y-0.5">
                      <div className="flex justify-between text-[10px] font-mono">
                        <span className={isCurrent ? 'font-bold text-amber-500' : 'text-slate-400'}>
                          {r.time} Beat
                        </span>
                        <span className={isCurrent ? 'font-bold text-amber-500' : 'text-slate-400'}>
                          {isPastOrCurrent ? `${r.occupied} spaces (${r.pct}%)` : '—'}
                        </span>
                      </div>
                      <div
                        className={`w-full h-2 rounded-full overflow-hidden ${
                          isWhite ? 'bg-slate-200' : 'bg-slate-800'
                        }`}
                      >
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            isCurrent
                              ? 'bg-amber-500'
                              : isPastOrCurrent
                              ? 'bg-amber-600/60'
                              : 'bg-transparent'
                          }`}
                          style={{ width: isPastOrCurrent ? `${r.pct}%` : '0%' }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="text-[10px] font-mono text-slate-400 pt-1 text-right">
                Beat method: Discrete repeated observations
              </div>
            </div>
          </div>

          {/* Current Observation Status */}
          <div className="pt-2 border-t border-slate-700/60 flex items-center justify-between text-xs font-mono">
            <span className={isWhite ? 'text-slate-600' : 'text-slate-400'}>
              Observation Round: <strong className="text-amber-500">{currentRound.time}</strong>
            </span>
            <span className="font-bold">
              Current Stress: <span className="text-amber-500">{currentRound.pct}%</span>
            </span>
          </div>
        </div>
      </div>

      {/* Takeaway & Footnote */}
      <div
        className={`relative z-10 rounded-xl p-3 border text-xs font-mono flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 ${
          isWhite ? 'bg-white border-slate-200' : 'bg-slate-950/80 border-slate-800'
        }`}
      >
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded bg-amber-500/20 text-amber-500">
            <BarChart2 className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[10px] text-slate-400 font-semibold uppercase">TAKEAWAY</div>
            <div className={`text-xs font-medium ${isWhite ? 'text-slate-800' : 'text-slate-200'}`}>
              Repeated observations show how parking demand changes over time.
            </div>
          </div>
        </div>
        <div className="text-right text-[11px] shrink-0 font-semibold text-amber-600 dark:text-amber-400">
          Peak Beat: 10:00 (76%)
        </div>
      </div>
    </div>
  );
}
