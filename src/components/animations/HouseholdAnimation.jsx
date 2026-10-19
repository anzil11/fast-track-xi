import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Home, PieChart, Users2, Play, Pause, RotateCcw } from 'lucide-react';

export default function HouseholdAnimation() {
  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const [isPlaying, setIsPlaying] = useState(!prefersReducedMotion);
  const [replayKey, setReplayKey] = useState(0);

  const [householdsParticipating, setHouseholdsParticipating] = useState(45);
  const [diariesReceived, setDiariesReceived] = useState(42);
  const [recordedJourneys, setRecordedJourneys] = useState(218);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setRecordedJourneys(prev => prev + 1);
    }, 1100);
    return () => clearInterval(interval);
  }, [isPlaying, replayKey]);

  const handlePlayToggle = () => setIsPlaying(prev => !prev);
  const handleReplay = () => {
    setHouseholdsParticipating(45);
    setDiariesReceived(42);
    setRecordedJourneys(218);
    setIsPlaying(true);
    setReplayKey(k => k + 1);
  };

  return (
    <div className="relative w-full max-w-xl mx-auto h-80 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/95 border border-pink-500/30 p-4 flex flex-col justify-between overflow-hidden shadow-[0_0_50px_rgba(236,72,153,0.15)]">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

      {/* Top Header & Controls */}
      <div className="relative z-10 flex items-center justify-between border-b border-pink-500/20 pb-2 text-xs">
        <div className="flex items-center gap-2 text-pink-400 font-mono">
          <Home className="w-4 h-4 text-pink-400" />
          <span className="font-semibold text-white">Household Travel Diary Example</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handlePlayToggle}
            className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-pink-300 font-mono text-[11px] transition-colors"
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

      {/* Neighborhood Stage */}
      <div className="relative z-10 flex-1 flex items-center justify-center my-2">
        <div className="relative w-full h-36 bg-slate-800/40 rounded-xl border border-slate-700/60 p-3 flex items-center justify-around">
          
          {/* House Node 1 */}
          <div className="flex flex-col items-center gap-1">
            <div className="w-14 h-14 rounded-xl bg-pink-950/40 border-2 border-pink-500/50 flex items-center justify-center shadow-lg relative">
              <Home className="w-7 h-7 text-pink-400" />
              <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center text-black text-[9px] font-bold">
                ✓
              </div>
            </div>
            <span className="text-[10px] font-mono text-slate-300">HOUSEHOLD 01</span>
          </div>

          {/* Connection Indicator */}
          <div className="flex flex-col items-center justify-center gap-1">
            <div className="flex items-center gap-1">
              <span className={`w-1.5 h-1.5 rounded-full bg-pink-400 ${isPlaying ? 'animate-ping' : ''}`} />
              <span className={`w-1.5 h-1.5 rounded-full bg-pink-400 ${isPlaying ? 'animate-ping delay-100' : ''}`} />
            </div>
            <span className="text-[9px] font-mono text-pink-300 bg-pink-950/80 px-1.5 py-0.5 rounded border border-pink-500/30">
              7-DAY DIARY
            </span>
          </div>

          {/* House Node 2 (Dataset Aggregation) */}
          <div className="flex flex-col items-center gap-1">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-600 to-rose-600 flex items-center justify-center shadow-[0_0_25px_rgba(236,72,153,0.5)]">
              <PieChart className="w-8 h-8 text-white" />
            </div>
            <span className="text-[10px] font-mono text-pink-300 font-semibold">DATA SUMMARY</span>
          </div>

          {/* Connection Indicator */}
          <div className="flex flex-col items-center justify-center gap-1">
            <div className="flex items-center gap-1">
              <span className={`w-1.5 h-1.5 rounded-full bg-rose-400 ${isPlaying ? 'animate-ping delay-100' : ''}`} />
              <span className={`w-1.5 h-1.5 rounded-full bg-rose-400 ${isPlaying ? 'animate-ping delay-200' : ''}`} />
            </div>
            <span className="text-[9px] font-mono text-rose-300 bg-pink-950/80 px-1.5 py-0.5 rounded border border-pink-500/30">
              MODAL SPLIT
            </span>
          </div>

          {/* House Node 3 */}
          <div className="flex flex-col items-center gap-1">
            <div className="w-14 h-14 rounded-xl bg-pink-950/40 border-2 border-pink-500/50 flex items-center justify-center shadow-lg relative">
              <Home className="w-7 h-7 text-pink-400" />
              <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center text-black text-[9px] font-bold">
                ✓
              </div>
            </div>
            <span className="text-[10px] font-mono text-slate-300">HOUSEHOLD 02</span>
          </div>

        </div>
      </div>

      {/* Bottom Status: Households participating, diaries received, recorded journeys */}
      <div className="relative z-10 flex items-center justify-between bg-slate-900/80 rounded-xl p-2.5 border border-slate-800 text-xs">
        <div className="flex items-center gap-2">
          <div className="p-1 rounded-md bg-pink-500/20 text-pink-400">
            <Users2 className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[11px] text-slate-400 font-mono">RECORDED JOURNEYS</div>
            <div className="font-semibold text-white text-xs">{recordedJourneys} Journeys Logged</div>
          </div>
        </div>
        <div className="text-right font-mono text-[11px] text-slate-300">
          <div>PARTICIPATING: <span className="text-pink-400 font-bold">{householdsParticipating} Households</span></div>
          <div>DIARIES RECEIVED: <span className="text-emerald-400 font-bold">{diariesReceived}</span></div>
        </div>
      </div>
    </div>
  );
}
