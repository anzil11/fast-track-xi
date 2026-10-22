import React, { useRef } from 'react';
import { MessageSquareText, MapPin, CheckCircle2, User, UserCheck, Info } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useSimulationPlayback } from './useSimulationPlayback';
import SimulationHeader from './SimulationHeader';

export default function RoadsideInterviewAnimation() {
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
    stepCount: 4,
    containerRef
  });

  // Specification:
  // Example record 028
  // Reveal responses one at a time:
  // 1. Origin: Zone A
  // 2. Destination: Zone B
  // 3. Purpose: "Commuting" (Do not combine commuting and business into one response)
  // 4. Travel Mode: "Car driver"
  // On completion, change completed-interview counter from 27 to 28.
  const showFinal = prefersReducedMotion || playbackState === 'completed';

  const revealOrigin = showFinal || progress >= 0.22;
  const revealDest = showFinal || progress >= 0.45;
  const revealPurpose = showFinal || progress >= 0.68;
  const revealMode = showFinal || progress >= 0.88;

  const completedInterviews = showFinal ? 28 : (revealMode ? 28 : 27);

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
        title="Travel Interview Example"
        icon={MessageSquareText}
        accentColor="#10b981"
        playbackState={playbackState}
        onTogglePlay={togglePlay}
        onReplay={replay}
      />

      {/* Reduced Motion Notice */}
      {prefersReducedMotion && (
        <div className="relative z-10 mt-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-[11px] font-mono text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
          <Info className="w-3.5 h-3.5 shrink-0" />
          <span>Reduced motion active: showing completed travel interview record.</span>
        </div>
      )}

      {/* Main Fieldwork Intercept & Questionnaire Scene */}
      <div className="relative z-10 my-3">
        <div
          className={`relative w-full rounded-xl border p-3.5 overflow-hidden flex flex-col justify-between ${
            isWhite ? 'bg-white border-slate-200' : 'bg-slate-950/80 border-slate-800'
          }`}
        >
          {/* Top Bar: Sample Identifier & Counter */}
          <div className="flex items-center justify-between text-[11px] font-mono mb-3">
            <span
              className={`px-2.5 py-0.5 rounded font-bold ${
                isWhite
                  ? 'bg-emerald-100 text-emerald-900 border border-emerald-200'
                  : 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/30'
              }`}
            >
              Questionnaire Record: Sample #028
            </span>
            <span
              className={`text-[10px] px-2 py-0.5 rounded border ${
                isWhite
                  ? 'bg-slate-100 text-slate-600 border-slate-200'
                  : 'bg-slate-900/90 text-slate-400 border-slate-700'
              }`}
            >
              Face-to-face fieldwork intercept
            </span>
          </div>

          {/* Interviewer & Questionnaire Layout */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 mb-2">
            {/* Left: Interviewer and Participant Scene */}
            <div
              className={`md:col-span-4 rounded-lg p-3 border flex flex-col items-center justify-center gap-2 text-center ${
                isWhite ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/60 border-slate-800'
              }`}
            >
              <div className="flex items-center gap-3">
                {/* Interviewer */}
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                    <UserCheck className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono font-bold mt-1 text-slate-700 dark:text-slate-300">
                    Interviewer
                  </span>
                </div>

                <div className="text-emerald-500 text-xs font-mono font-bold">
                  ➔
                </div>

                {/* Participant */}
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-cyan-600 dark:text-cyan-400 flex items-center justify-center">
                    <User className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono font-bold mt-1 text-slate-700 dark:text-slate-300">
                    Participant
                  </span>
                </div>
              </div>

              <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400 mt-1">
                Agreed survey questionnaire
              </div>
            </div>

            {/* Right: Step-by-step Question Responses */}
            <div
              className={`md:col-span-8 rounded-lg p-3 border space-y-2 ${
                isWhite ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/60 border-slate-800'
              }`}
            >
              <div className="text-[10px] font-mono text-slate-400 border-b border-slate-200 dark:border-slate-800 pb-1">
                RECORDED QUESTIONS & RESPONSES
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                {/* 1. Origin */}
                <div className="p-2 rounded bg-white dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="text-[9px] text-slate-400">1. ORIGIN</div>
                    <div className="font-bold text-slate-800 dark:text-white">
                      {revealOrigin ? (
                        <span className="text-cyan-600 dark:text-cyan-400">Zone A</span>
                      ) : (
                        <span className="text-slate-400 italic">Asking...</span>
                      )}
                    </div>
                  </div>
                  {revealOrigin && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />}
                </div>

                {/* 2. Destination */}
                <div className="p-2 rounded bg-white dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="text-[9px] text-slate-400">2. DESTINATION</div>
                    <div className="font-bold text-slate-800 dark:text-white">
                      {revealDest ? (
                        <span className="text-amber-600 dark:text-amber-400">Zone B</span>
                      ) : (
                        <span className="text-slate-400 italic">Pending...</span>
                      )}
                    </div>
                  </div>
                  {revealDest && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />}
                </div>

                {/* 3. Purpose */}
                <div className="p-2 rounded bg-white dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="text-[9px] text-slate-400">3. PURPOSE</div>
                    <div className="font-bold text-slate-800 dark:text-white">
                      {revealPurpose ? (
                        <span className="text-emerald-600 dark:text-emerald-400">Commuting</span>
                      ) : (
                        <span className="text-slate-400 italic">Pending...</span>
                      )}
                    </div>
                  </div>
                  {revealPurpose && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />}
                </div>

                {/* 4. Travel Mode */}
                <div className="p-2 rounded bg-white dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="text-[9px] text-slate-400">4. TRAVEL MODE</div>
                    <div className="font-bold text-slate-800 dark:text-white">
                      {revealMode ? (
                        <span className="text-purple-600 dark:text-purple-400">Car driver</span>
                      ) : (
                        <span className="text-slate-400 italic">Pending...</span>
                      )}
                    </div>
                  </div>
                  {revealMode && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Completed Counter Bar */}
          <div className="pt-2 border-t border-slate-700/60 flex items-center justify-between text-xs font-mono">
            <span className={isWhite ? 'text-slate-600' : 'text-slate-400'}>
              Journey: <strong className="text-cyan-600 dark:text-cyan-400">Zone A</strong> ➔ <strong className="text-amber-600 dark:text-amber-400">Zone B</strong>
            </span>
            <span className="font-bold">
              Completed Interviews:{' '}
              <span className="text-emerald-600 dark:text-emerald-400 text-sm">
                {completedInterviews}
              </span>
              <span className="text-[10px] text-slate-500 ml-1">
                {completedInterviews === 28 ? '(incremented from 27)' : ''}
              </span>
            </span>
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
          <div className="p-1.5 rounded bg-emerald-500/20 text-emerald-500">
            <MessageSquareText className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[10px] text-slate-400 font-semibold uppercase">TAKEAWAY</div>
            <div className={`text-xs font-medium ${isWhite ? 'text-slate-800' : 'text-slate-200'}`}>
              Agreed questions capture journey details and travel choices.
            </div>
          </div>
        </div>
        <div className="text-right text-[11px] shrink-0 font-semibold text-emerald-600 dark:text-emerald-400">
          Record #028 Logged
        </div>
      </div>
    </div>
  );
}
