import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquareText, MapPin, CheckCircle, Navigation, Radio, Play, Pause, RotateCcw } from 'lucide-react';

export default function RoadsideInterviewAnimation() {
  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const [isPlaying, setIsPlaying] = useState(!prefersReducedMotion);
  const [replayKey, setReplayKey] = useState(0);

  const [activeQuestion, setActiveQuestion] = useState('Recording Journey Origin & Destination...');
  const [responsesLogged, setResponsesLogged] = useState(28);

  useEffect(() => {
    if (!isPlaying) return;
    const t1 = setTimeout(() => {
      setActiveQuestion('Trip Purpose: Commute / Business Travel');
      setResponsesLogged(29);
    }, 800);
    const t2 = setTimeout(() => {
      setActiveQuestion('Travel Mode: Car Driver (Single Occupant)');
      setResponsesLogged(30);
    }, 1600);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [isPlaying, replayKey]);

  const handlePlayToggle = () => setIsPlaying(prev => !prev);
  const handleReplay = () => {
    setActiveQuestion('Recording Journey Origin & Destination...');
    setResponsesLogged(28);
    setIsPlaying(true);
    setReplayKey(k => k + 1);
  };

  return (
    <div className="relative w-full max-w-xl mx-auto h-80 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/95 border border-emerald-500/30 p-4 flex flex-col justify-between overflow-hidden shadow-[0_0_50px_rgba(16,185,129,0.15)]">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

      {/* Top Header & Controls */}
      <div className="relative z-10 flex items-center justify-between border-b border-emerald-500/20 pb-2 text-xs">
        <div className="flex items-center gap-2 text-emerald-400 font-mono">
          <MessageSquareText className="w-4 h-4 text-emerald-400" />
          <span className="font-semibold text-white">Travel Interview Example</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handlePlayToggle}
            className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-emerald-300 font-mono text-[11px] transition-colors"
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

      {/* Tablet / Fieldwork Intercept Visualizer */}
      <div className="relative z-10 flex-1 flex items-center justify-center my-2">
        <div className="relative w-full h-36 bg-slate-800/50 rounded-xl border border-slate-700/70 p-3 flex items-center justify-between gap-3">
          
          {/* Surveyor Recording Card */}
          <div className="flex-1 h-full bg-slate-900/90 rounded-lg border border-emerald-500/40 p-2.5 flex flex-col justify-between">
            <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 border-b border-slate-800 pb-1">
              <span className="text-emerald-400 font-semibold">QUESTIONNAIRE RECORD</span>
              <span>SAMPLE #028</span>
            </div>
            
            {/* Live Audio / Recording Waveform Indicator */}
            <div className="flex items-center gap-1 my-1 justify-center h-6">
              {[40, 70, 95, 30, 85, 60, 90, 45, 80, 100, 50, 75, 30].map((h, idx) => (
                <div
                  key={idx}
                  className="w-1 bg-emerald-400 rounded-full shadow-[0_0_6px_rgba(16,185,129,0.8)]"
                  style={{
                    height: isPlaying ? `${h}%` : '40%',
                    transition: 'height 0.3s ease'
                  }}
                />
              ))}
            </div>

            <div className="text-[11px] font-mono text-emerald-300 bg-emerald-950/60 rounded px-2 py-1 flex items-center gap-1.5 border border-emerald-500/30">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="truncate">{activeQuestion}</span>
            </div>
          </div>

          {/* Journey Details Box */}
          <div className="w-48 h-full bg-slate-900/90 rounded-lg border border-slate-800 p-2 flex flex-col justify-between text-[10px] font-mono">
            <div className="text-slate-400 border-b border-slate-800 pb-1">JOURNEY PARTICULARS</div>
            
            <div className="flex items-center justify-between text-xs py-1">
              <div className="text-cyan-400 flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                <span>Zone A (Origin)</span>
              </div>
              <span className="text-emerald-400 font-bold">➔</span>
              <div className="text-amber-400 flex items-center gap-1">
                <Navigation className="w-3 h-3" />
                <span>Zone B (Dest)</span>
              </div>
            </div>

            <div className="space-y-0.5 text-[9px] text-slate-300">
              <div>PURPOSE: <span className="text-white">Commute / Business</span></div>
              <div>MODE: <span className="text-emerald-400 font-semibold">Car Driver</span></div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Status */}
      <div className="relative z-10 flex items-center justify-between bg-slate-900/80 rounded-xl p-2.5 border border-slate-800 text-xs">
        <div className="flex items-center gap-2">
          <div className="p-1 rounded-md bg-emerald-500/20 text-emerald-400">
            <Radio className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[11px] text-slate-400 font-mono">COMPLETED INTERVIEWS</div>
            <div className="font-semibold text-white text-xs">{responsesLogged} Surveys Recorded</div>
          </div>
        </div>
        <div className="text-right font-mono text-[11px] text-slate-300">
          <div>ORIGIN: <span className="text-cyan-400 font-bold">Zone A</span></div>
          <div>DESTINATION: <span className="text-amber-400 font-bold">Zone B</span></div>
        </div>
      </div>
    </div>
  );
}
