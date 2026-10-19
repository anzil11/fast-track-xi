import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Car, CheckCircle2, Play, Pause, RotateCcw, FileText } from 'lucide-react';

export default function ParkingAnimation() {
  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const [isPlaying, setIsPlaying] = useState(!prefersReducedMotion);
  const [replayKey, setReplayKey] = useState(0);

  const [step, setStep] = useState(1);
  const totalCapacity = 50;
  const vehiclesParked = step >= 3 ? 38 : 37;
  const occupancyPercentage = Math.round((vehiclesParked / totalCapacity) * 100);

  useEffect(() => {
    if (!isPlaying) return;
    const t1 = setTimeout(() => {
      setStep(2);
    }, 900);

    const t2 = setTimeout(() => {
      setStep(3);
    }, 1800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [isPlaying, replayKey]);

  const handlePlayToggle = () => setIsPlaying(prev => !prev);
  const handleReplay = () => {
    setStep(1);
    setIsPlaying(true);
    setReplayKey(k => k + 1);
  };

  return (
    <div className="relative w-full max-w-xl mx-auto h-80 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/95 border border-amber-500/30 p-4 flex flex-col justify-between overflow-hidden shadow-[0_0_50px_rgba(245,158,11,0.15)]">
      {/* Background Parking Lot Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

      {/* Top Header & Controls */}
      <div className="relative z-10 flex items-center justify-between border-b border-amber-500/20 pb-2 text-xs">
        <div className="flex items-center gap-2 text-amber-400 font-mono">
          <Car className="w-4 h-4 text-amber-400" />
          <span className="font-semibold text-white">Parking Occupancy Example</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handlePlayToggle}
            className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-amber-300 font-mono text-[11px] transition-colors"
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

      {/* Main Interactive Stage */}
      <div className="relative z-10 flex-1 flex items-center justify-center my-2">
        {/* Parking Lot Structure */}
        <div className="relative w-full h-36 bg-slate-800/40 rounded-xl border border-slate-700/60 p-2 flex items-center justify-around">
          
          {/* Parking Bay 1: Occupied */}
          <div className="w-24 h-28 border-2 border-dashed border-slate-600 rounded-lg flex flex-col items-center justify-center bg-slate-900/40 relative">
            <span className="text-[10px] font-mono text-slate-400 absolute top-1 left-2">Bay 06</span>
            <div className="w-14 h-20 bg-slate-700/80 rounded-md flex items-center justify-center text-slate-400 text-xs shadow-inner">
              <Car className="w-8 h-8 rotate-90 text-slate-400" />
            </div>
            <span className="text-[9px] font-mono text-slate-400 mt-1">Parked</span>
          </div>

          {/* Parking Bay 2: Target Bay (Bay 08) */}
          <div className="w-28 h-28 border-2 border-dashed border-amber-400/80 rounded-lg flex flex-col items-center justify-center bg-amber-950/20 relative overflow-hidden">
            <span className="text-[10px] font-mono text-amber-400 absolute top-1 left-2">Bay 08</span>
            
            {/* The Animated Car */}
            {isPlaying && (
              <motion.div
                key={`car-${replayKey}-${step}`}
                initial={{ x: step === 1 ? 160 : step === 2 ? 60 : 0, y: step === 1 ? -30 : 0, rotate: step === 1 ? 0 : 90 }}
                animate={
                  step === 1
                    ? { x: 70, y: 0, rotate: 30 }
                    : step === 2
                    ? { x: 0, y: 0, rotate: 90 }
                    : { x: 0, y: 0, rotate: 90, scale: 1.02 }
                }
                transition={{ duration: 0.7, ease: 'easeInOut' }}
                className="w-16 h-22 bg-gradient-to-r from-amber-500 to-yellow-400 rounded-lg flex items-center justify-center shadow-[0_0_20px_rgba(245,158,11,0.6)] z-20 relative p-1"
              >
                <Car className="w-9 h-9 text-slate-950 transform -rotate-90" />
              </motion.div>
            )}
            {!isPlaying && (
              <div className="w-16 h-22 bg-gradient-to-r from-amber-500 to-yellow-400 rounded-lg flex items-center justify-center shadow-md z-20 relative p-1 rotate-90">
                <Car className="w-9 h-9 text-slate-950 transform -rotate-90" />
              </div>
            )}

            {step === 3 && (
              <div className="absolute inset-x-1 bottom-1 bg-emerald-500/90 text-slate-950 text-[10px] font-bold font-mono py-0.5 rounded text-center flex items-center justify-center gap-1 z-30">
                <CheckCircle2 className="w-3 h-3" />
                <span>Recorded</span>
              </div>
            )}
          </div>

          {/* Parking Bay 3: Occupied */}
          <div className="w-24 h-28 border-2 border-dashed border-slate-600 rounded-lg flex flex-col items-center justify-center bg-slate-900/40 relative">
            <span className="text-[10px] font-mono text-slate-400 absolute top-1 left-2">Bay 10</span>
            <div className="w-14 h-20 bg-slate-700/80 rounded-md flex items-center justify-center text-slate-400 text-xs shadow-inner">
              <Car className="w-8 h-8 rotate-90 text-slate-400" />
            </div>
            <span className="text-[9px] font-mono text-slate-400 mt-1">Parked</span>
          </div>

        </div>
      </div>

      {/* Bottom Status & Example Survey Record */}
      <div className="relative z-10 flex items-center justify-between bg-slate-900/80 rounded-xl p-2.5 border border-slate-800 text-xs">
        <div className="flex items-center gap-3">
          <div className="p-1 rounded-md bg-amber-500/20 text-amber-400">
            <FileText className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[11px] text-slate-400 font-mono">Example Survey Record</div>
            <div className="font-semibold text-white text-xs">Survey Round: Round 02 (10:00 - 11:00)</div>
          </div>
        </div>
        <div className="text-right font-mono text-[11px] text-slate-300">
          <div>AVAILABLE CAPACITY: <span className="text-slate-300 font-bold">{totalCapacity} Bays</span></div>
          <div>VEHICLES PARKED: <span className="text-amber-400 font-bold">{vehiclesParked}</span> | OCCUPANCY: <span className="text-emerald-400 font-bold">{occupancyPercentage}%</span></div>
        </div>
      </div>
    </div>
  );
}
