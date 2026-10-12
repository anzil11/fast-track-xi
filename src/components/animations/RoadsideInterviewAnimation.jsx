import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquareText, MapPin, CheckCircle, Navigation, Radio } from 'lucide-react';

export default function RoadsideInterviewAnimation() {
  const [activeQuestion, setActiveQuestion] = useState('Capturing Trip Origin & Destination (O-D)...');
  const [responsesLogged, setResponsesLogged] = useState(28);

  useEffect(() => {
    const t1 = setTimeout(() => {
      setActiveQuestion('Trip Purpose Verified: Commute / Professional');
      setResponsesLogged(29);
    }, 600);
    const t2 = setTimeout(() => {
      setActiveQuestion('GPS Coordinates & Postcode Zone Validated!');
      setResponsesLogged(30);
    }, 1100);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <div className="relative w-full max-w-xl mx-auto h-72 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/95 border border-emerald-500/30 p-4 flex flex-col justify-between overflow-hidden shadow-[0_0_50px_rgba(16,185,129,0.15)]">
      {/* Background Matrix Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />

      {/* Top Telemetry */}
      <div className="relative z-10 flex items-center justify-between border-b border-emerald-500/20 pb-2 text-xs">
        <div className="flex items-center gap-2 text-emerald-400 font-mono">
          <Radio className="w-4 h-4 animate-pulse text-emerald-400" />
          <span>ROADSIDE INTERCEPT & CAPI INTERVIEW</span>
        </div>
        <div className="flex items-center gap-3 text-slate-400 font-mono">
          <span>LOCATION: <strong className="text-white">A401 / KINGSWAY</strong></span>
          <span>COMPLIANCE: <strong className="text-emerald-400">CHAPTER 8</strong></span>
        </div>
      </div>

      {/* Tablet / Fieldwork Intercept Visualizer */}
      <div className="relative z-10 flex-1 flex items-center justify-center my-2">
        <div className="relative w-full h-36 bg-slate-800/50 rounded-xl border border-slate-700/70 p-3 flex items-center justify-between gap-3">
          
          {/* Surveyor Tablet Card */}
          <div className="flex-1 h-full bg-slate-900/90 rounded-lg border border-emerald-500/40 p-2.5 flex flex-col justify-between">
            <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 border-b border-slate-800 pb-1">
              <span className="text-emerald-400 font-semibold">SURVEY FORM #RSI-804</span>
              <span>TIME: 08:24:12</span>
            </div>
            
            {/* Live Waveform Equalizer */}
            <div className="flex items-center gap-1 my-1 justify-center h-6">
              {[40, 70, 95, 30, 85, 60, 90, 45, 80, 100, 50, 75, 30].map((h, idx) => (
                <motion.div
                  key={idx}
                  animate={{ height: [`${h * 0.3}%`, `${h}%`, `${h * 0.4}%`] }}
                  transition={{ repeat: Infinity, duration: 0.8, delay: idx * 0.05 }}
                  className="w-1 bg-emerald-400 rounded-full shadow-[0_0_6px_rgba(16,185,129,0.8)]"
                />
              ))}
            </div>

            <div className="text-[11px] font-mono text-emerald-300 bg-emerald-950/60 rounded px-2 py-1 flex items-center gap-1.5 border border-emerald-500/30">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="truncate">{activeQuestion}</span>
            </div>
          </div>

          {/* O-D Origin Destination Routing Diagram */}
          <div className="w-44 h-full bg-slate-900/90 rounded-lg border border-slate-800 p-2 flex flex-col justify-between text-[10px] font-mono">
            <div className="text-slate-400 border-b border-slate-800 pb-1">ORIGIN-DESTINATION</div>
            
            <div className="flex items-center justify-between text-xs py-1">
              <div className="text-cyan-400 flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                <span>EC1V</span>
              </div>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1 }}
                className="text-emerald-400 font-bold"
              >
                ➔ ➔
              </motion.div>
              <div className="text-amber-400 flex items-center gap-1">
                <Navigation className="w-3 h-3" />
                <span>W1D</span>
              </div>
            </div>

            <div className="bg-slate-800/80 rounded px-1.5 py-0.5 text-[9px] text-slate-300 text-center">
              MODE: CAR DRIVER • SINGLE OCCUPANT
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Status */}
      <div className="relative z-10 flex items-center justify-between bg-slate-900/80 rounded-xl p-2.5 border border-slate-800 text-xs">
        <div className="flex items-center gap-2">
          <div className="p-1 rounded-md bg-emerald-500/20 text-emerald-400">
            <MessageSquareText className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[11px] text-slate-400 font-mono">INTERVIEWS AUDITED</div>
            <div className="font-semibold text-white text-xs">{responsesLogged} Surveys Complete</div>
          </div>
        </div>
        <div className="text-right font-mono text-[11px] text-slate-300">
          <div>RESPONSE RATE: <span className="text-emerald-400 font-bold">88.5%</span></div>
          <div>SAMPLE VALIDITY: <span className="text-cyan-400 font-bold">p &lt; 0.01</span></div>
        </div>
      </div>
    </div>
  );
}
