import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Car, CheckCircle2, ShieldCheck, MapPin, Gauge } from 'lucide-react';

export default function ParkingAnimation({ onComplete }) {
  const [telemetry, setTelemetry] = useState({
    bay: 'P-08 (EV Charging)',
    stressIndex: '74.2%',
    turnover: '2.4 veh/hr',
    status: 'Detecting Available Space...'
  });

  const [step, setStep] = useState(1);

  useEffect(() => {
    const t1 = setTimeout(() => {
      setStep(2);
      setTelemetry(prev => ({ ...prev, status: 'Maneuvering Vehicle to Bay P-08...' }));
    }, 500);

    const t2 = setTimeout(() => {
      setStep(3);
      setTelemetry(prev => ({ ...prev, status: 'Vehicle Parked & Session Logged!' }));
    }, 1100);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <div className="relative w-full max-w-xl mx-auto h-72 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/95 border border-amber-500/30 p-4 flex flex-col justify-between overflow-hidden shadow-[0_0_50px_rgba(245,158,11,0.15)]">
      {/* Background Parking Lot Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />

      {/* Top Telemetry Bar */}
      <div className="relative z-10 flex items-center justify-between border-b border-amber-500/20 pb-2 text-xs">
        <div className="flex items-center gap-2 text-amber-400 font-mono">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
          <span>LAMBETH METHODOLOGY TELEMETRY</span>
        </div>
        <div className="flex items-center gap-3 text-slate-400 font-mono">
          <span>ZONE: <strong className="text-white">CPZ-LONDON-E1</strong></span>
          <span>STRESS: <strong className="text-amber-400">{telemetry.stressIndex}</strong></span>
        </div>
      </div>

      {/* Main Interactive Stage */}
      <div className="relative z-10 flex-1 flex items-center justify-center my-2">
        {/* Parking Lot Structure */}
        <div className="relative w-full h-36 bg-slate-800/40 rounded-xl border border-slate-700/60 p-2 flex items-center justify-around">
          
          {/* Parking Bay 1: Occupied */}
          <div className="w-24 h-28 border-2 border-dashed border-red-500/40 rounded-lg flex flex-col items-center justify-center bg-red-950/20 relative">
            <span className="text-[10px] font-mono text-red-400 absolute top-1 left-2">P-06</span>
            <div className="w-14 h-20 bg-slate-700/80 rounded-md flex items-center justify-center text-slate-400 text-xs shadow-inner">
              <Car className="w-8 h-8 rotate-90 text-slate-400" />
            </div>
            <span className="text-[9px] font-mono text-red-400 mt-1 font-semibold">OCCUPIED</span>
          </div>

          {/* Parking Bay 2: Target Bay (P-08) */}
          <div className="w-28 h-28 border-2 border-dashed border-amber-400/80 rounded-lg flex flex-col items-center justify-center bg-amber-950/20 relative overflow-hidden">
            <span className="text-[10px] font-mono text-amber-400 absolute top-1 left-2">P-08 [TARGET]</span>
            
            {/* Target sensor ring */}
            {step < 3 && (
              <motion.div
                animate={{ scale: [1, 1.4, 1], opacity: [0.8, 0.2, 0.8] }}
                transition={{ repeat: Infinity, duration: 1.2 }}
                className="absolute inset-0 rounded-lg border-2 border-amber-400"
              />
            )}

            {/* The Animated Car */}
            <motion.div
              initial={{ x: 180, y: -40, rotate: 0 }}
              animate={
                step === 1
                  ? { x: 90, y: 0, rotate: 20 }
                  : step === 2
                  ? { x: 0, y: 0, rotate: 90 }
                  : { x: 0, y: 0, rotate: 90, scale: 1.05 }
              }
              transition={{ duration: 0.6, ease: 'easeInOut' }}
              className="w-16 h-22 bg-gradient-to-r from-amber-500 to-yellow-400 rounded-lg flex items-center justify-center shadow-[0_0_20px_rgba(245,158,11,0.6)] z-20 relative p-1"
            >
              <Car className="w-9 h-9 text-slate-950 transform -rotate-90" />
              {/* Headlights */}
              <div className="absolute -top-1 left-2 w-2 h-2 bg-yellow-100 rounded-full shadow-[0_0_12px_#fff]" />
              <div className="absolute -top-1 right-2 w-2 h-2 bg-yellow-100 rounded-full shadow-[0_0_12px_#fff]" />
            </motion.div>

            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute inset-x-1 bottom-1 bg-emerald-500/90 text-slate-950 text-[10px] font-bold font-mono py-0.5 rounded text-center flex items-center justify-center gap-1"
              >
                <CheckCircle2 className="w-3 h-3" />
                <span>BAY OCCUPIED</span>
              </motion.div>
            )}
          </div>

          {/* Parking Bay 3: Occupied */}
          <div className="w-24 h-28 border-2 border-dashed border-red-500/40 rounded-lg flex flex-col items-center justify-center bg-red-950/20 relative">
            <span className="text-[10px] font-mono text-red-400 absolute top-1 left-2">P-10</span>
            <div className="w-14 h-20 bg-slate-700/80 rounded-md flex items-center justify-center text-slate-400 text-xs shadow-inner">
              <Car className="w-8 h-8 rotate-90 text-slate-400" />
            </div>
            <span className="text-[9px] font-mono text-red-400 mt-1 font-semibold">OCCUPIED</span>
          </div>

        </div>
      </div>

      {/* Bottom Status & Sensor Feeds */}
      <div className="relative z-10 flex items-center justify-between bg-slate-900/80 rounded-xl p-2.5 border border-slate-800 text-xs">
        <div className="flex items-center gap-2">
          <div className="p-1 rounded-md bg-amber-500/20 text-amber-400">
            <Gauge className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[11px] text-slate-400 font-mono">LIVE SENSOR TELEMETRY</div>
            <div className="font-semibold text-white text-xs">{telemetry.status}</div>
          </div>
        </div>
        <div className="text-right font-mono text-[11px] text-slate-300">
          <div>BAY: <span className="text-amber-400 font-bold">{telemetry.bay}</span></div>
          <div>TURNOVER: <span className="text-emerald-400 font-bold">{telemetry.turnover}</span></div>
        </div>
      </div>
    </div>
  );
}
