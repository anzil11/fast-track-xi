import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, ShoppingBag, Play, Pause, RotateCcw, CheckCircle2 } from 'lucide-react';

export default function MarketResearchAnimation() {
  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const [isPlaying, setIsPlaying] = useState(!prefersReducedMotion);
  const [replayKey, setReplayKey] = useState(0);

  const [completedInterviews, setCompletedInterviews] = useState(185);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCompletedInterviews(prev => prev + 1);
    }, 1200);
    return () => clearInterval(interval);
  }, [isPlaying, replayKey]);

  const handlePlayToggle = () => setIsPlaying(prev => !prev);
  const handleReplay = () => {
    setCompletedInterviews(185);
    setIsPlaying(true);
    setReplayKey(k => k + 1);
  };

  return (
    <div className="relative w-full max-w-xl mx-auto h-80 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/95 border border-orange-500/30 p-4 flex flex-col justify-between overflow-hidden shadow-[0_0_50px_rgba(249,115,22,0.15)]">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

      {/* Top Header & Controls */}
      <div className="relative z-10 flex items-center justify-between border-b border-orange-500/20 pb-2 text-xs">
        <div className="flex items-center gap-2 text-orange-400 font-mono">
          <BarChart3 className="w-4 h-4 text-orange-400" />
          <span className="font-semibold text-white">Visitor Feedback Example</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handlePlayToggle}
            className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-orange-300 font-mono text-[11px] transition-colors"
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

      {/* Feedback Visualizer Stage */}
      <div className="relative z-10 flex-1 flex items-center justify-center my-2">
        <div className="relative w-full h-36 bg-slate-800/40 rounded-xl border border-slate-700/60 p-3 flex items-center justify-between gap-4">
          
          {/* Survey Location Icon Box */}
          <div className="relative w-28 h-28 rounded-2xl border border-orange-500/40 bg-orange-950/20 flex flex-col items-center justify-center gap-2 shrink-0">
            <ShoppingBag className="w-7 h-7 text-orange-400" />
            <div className="text-center font-mono">
              <div className="text-[10px] text-white font-bold">RETAIL SITE</div>
              <div className="text-[8px] text-slate-400">Visitor Intercepts</div>
            </div>
          </div>

          {/* Visit Purpose & Satisfaction Responses */}
          <div className="flex-1 h-28 bg-slate-900/80 rounded-lg border border-slate-800 p-2.5 flex flex-col justify-between text-[10px] font-mono">
            <div className="flex items-center justify-between text-slate-400 border-b border-slate-800 pb-1">
              <span>VISIT PURPOSE & RESPONSES</span>
              <span className="text-orange-400 font-bold">{completedInterviews} INTERVIEWS</span>
            </div>

            {/* Purpose Breakdown Bars */}
            <div className="space-y-1.5 py-1">
              <div>
                <div className="flex justify-between text-[9px] text-slate-300 mb-0.5">
                  <span>Retail / Shopping</span>
                  <span className="text-orange-400 font-bold">54%</span>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-orange-500 h-full rounded-full" style={{ width: '54%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[9px] text-slate-300 mb-0.5">
                  <span>Dining & Leisure</span>
                  <span className="text-amber-400 font-bold">31%</span>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-amber-500 h-full rounded-full" style={{ width: '31%' }} />
                </div>
              </div>
            </div>

            <div className="text-[9px] font-mono text-emerald-400 flex items-center justify-between border-t border-slate-800 pt-1">
              <span>SATISFACTION RESPONSE:</span>
              <span className="font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                88% Positive / Satisfied
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Status */}
      <div className="relative z-10 flex items-center justify-between bg-slate-900/80 rounded-xl p-2.5 border border-slate-800 text-xs">
        <div className="flex items-center gap-2">
          <div className="p-1 rounded-md bg-orange-500/20 text-orange-400">
            <BarChart3 className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[11px] text-slate-400 font-mono">COMPLETED INTERVIEWS</div>
            <div className="font-semibold text-white text-xs">{completedInterviews} Responses Logged</div>
          </div>
        </div>
        <div className="text-right font-mono text-[11px] text-slate-300">
          <div>VISIT PURPOSE: <span className="text-orange-400 font-bold">Retail & Leisure</span></div>
          <div>SATISFACTION: <span className="text-emerald-400 font-bold">88% Satisfied</span></div>
        </div>
      </div>
    </div>
  );
}
