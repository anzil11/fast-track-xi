import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Train, Users, Play, Pause, RotateCcw } from 'lucide-react';

export default function TransportAnimation() {
  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const [isPlaying, setIsPlaying] = useState(!prefersReducedMotion);
  const [replayKey, setReplayKey] = useState(0);

  const [boardingCount, setBoardingCount] = useState(34);
  const [alightingCount, setAlightingCount] = useState(18);
  const [passengersOnboard, setPassengersOnboard] = useState(142);

  useEffect(() => {
    if (!isPlaying) return;
    const t = setInterval(() => {
      setBoardingCount(prev => prev + 1);
      setPassengersOnboard(prev => prev + 1);
    }, 1200);
    return () => clearInterval(t);
  }, [isPlaying, replayKey]);

  const handlePlayToggle = () => setIsPlaying(prev => !prev);
  const handleReplay = () => {
    setBoardingCount(34);
    setAlightingCount(18);
    setPassengersOnboard(142);
    setIsPlaying(true);
    setReplayKey(k => k + 1);
  };

  return (
    <div className="relative w-full max-w-xl mx-auto h-80 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/95 border border-purple-500/30 p-4 flex flex-col justify-between overflow-hidden shadow-[0_0_50px_rgba(168,85,247,0.15)]">
      {/* Background Track Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

      {/* Top Header & Controls */}
      <div className="relative z-10 flex items-center justify-between border-b border-purple-500/20 pb-2 text-xs">
        <div className="flex items-center gap-2 text-purple-400 font-mono">
          <Train className="w-4 h-4 text-purple-400" />
          <span className="font-semibold text-white">Passenger Count Example</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handlePlayToggle}
            className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-purple-300 font-mono text-[11px] transition-colors"
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

      {/* Train & Platform Stage */}
      <div className="relative z-10 flex-1 flex items-center justify-center my-2">
        <div className="relative w-full h-36 bg-slate-800/40 rounded-xl border border-slate-700/60 p-3 overflow-hidden flex flex-col justify-between">
          
          {/* Station Platform */}
          <div className="w-full h-10 bg-slate-900/90 rounded border-b-2 border-yellow-500 flex items-center justify-between px-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] font-mono text-slate-300">Example Station - Platform 1</span>
            </div>
            <div className="text-[10px] font-mono text-purple-300 bg-purple-950/80 px-2 py-0.5 rounded border border-purple-500/40">
              BOARDING: {boardingCount} | ALIGHTING: {alightingCount}
            </div>
          </div>

          {/* Electric Neon Railway Track */}
          <div className="relative w-full h-16 flex items-center overflow-hidden">
            <div className="absolute top-2 left-0 right-0 h-1 bg-purple-950 border-t border-b border-purple-500/30" />
            <div className="absolute bottom-2 left-0 right-0 h-1 bg-purple-950 border-t border-b border-purple-500/30" />

            {/* Train Carriages */}
            {isPlaying ? (
              <motion.div
                key={`train-${replayKey}`}
                initial={{ x: 260 }}
                animate={{ x: 0 }}
                transition={{ duration: 0.9, ease: 'easeOut' }}
                className="flex items-center gap-1 z-20"
              >
                {/* Locomotive Nose */}
                <div className="w-28 h-10 bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-800 rounded-l-full rounded-r-md flex items-center justify-between px-3 shadow-[0_0_20px_rgba(168,85,247,0.6)] relative">
                  <div className="w-3 h-2 bg-yellow-300 rounded-full shadow-[0_0_8px_#fff]" />
                  <span className="text-[9px] font-mono font-bold text-white">CAR-01</span>
                  <div className="flex gap-1">
                    <div className="w-3 h-2 bg-sky-200/80 rounded" />
                    <div className="w-3 h-2 bg-sky-200/80 rounded" />
                  </div>
                </div>

                {/* Carriage 2 */}
                <div className="w-24 h-10 bg-gradient-to-r from-purple-700 to-indigo-700 rounded-md flex items-center justify-around px-2 shadow-md">
                  <div className="w-3 h-2 bg-sky-200/80 rounded" />
                  <div className="w-3 h-2 bg-sky-200/80 rounded" />
                  <div className="w-3 h-2 bg-sky-200/80 rounded" />
                </div>

                {/* Carriage 3 */}
                <div className="w-24 h-10 bg-gradient-to-r from-purple-700 to-indigo-700 rounded-md flex items-center justify-around px-2 shadow-md">
                  <div className="w-3 h-2 bg-sky-200/80 rounded" />
                  <div className="w-3 h-2 bg-sky-200/80 rounded" />
                  <div className="w-3 h-2 bg-sky-200/80 rounded" />
                </div>
              </motion.div>
            ) : (
              <div className="flex items-center gap-1 z-20">
                <div className="w-28 h-10 bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-800 rounded-l-full rounded-r-md flex items-center justify-between px-3 shadow-md relative">
                  <div className="w-3 h-2 bg-yellow-300 rounded-full" />
                  <span className="text-[9px] font-mono font-bold text-white">CAR-01</span>
                </div>
                <div className="w-24 h-10 bg-gradient-to-r from-purple-700 to-indigo-700 rounded-md shadow-md" />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Status: Boarding, Alighting, Passengers Onboard */}
      <div className="relative z-10 flex items-center justify-between bg-slate-900/80 rounded-xl p-2.5 border border-slate-800 text-xs">
        <div className="flex items-center gap-3">
          <div className="p-1 rounded-md bg-purple-500/20 text-purple-400">
            <Users className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[11px] text-slate-400 font-mono">OBSERVED PASSENGERS ONBOARD</div>
            <div className="font-semibold text-white text-xs">{passengersOnboard} Passengers</div>
          </div>
        </div>
        <div className="text-right font-mono text-[11px] text-slate-300">
          <div>BOARDING: <span className="text-purple-400 font-bold">{boardingCount}</span></div>
          <div>ALIGHTING: <span className="text-cyan-400 font-bold">{alightingCount}</span></div>
        </div>
      </div>
    </div>
  );
}
