import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, ArrowRight, ShieldCheck, Cpu, X, Sparkles } from 'lucide-react';
import ParkingAnimation from './animations/ParkingAnimation';
import PedestrianAnimation from './animations/PedestrianAnimation';
import TransportAnimation from './animations/TransportAnimation';
import RoadsideInterviewAnimation from './animations/RoadsideInterviewAnimation';
import HouseholdAnimation from './animations/HouseholdAnimation';
import CycleCountAnimation from './animations/CycleCountAnimation';
import MarketResearchAnimation from './animations/MarketResearchAnimation';

export default function ServiceTransitionModal({ service, isOpen, onClose, onCompleteNavigation }) {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('INITIALIZING TELEMETRY...');

  useEffect(() => {
    if (!isOpen || !service) {
      setProgress(0);
      return;
    }

    setProgress(0);
    setStatusText('CALIBRATING SENSORS & CORDON GATES...');

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const next = prev + 5;
        if (next === 30) setStatusText('ESTABLISHING ENCRYPTED FIELD CONNECTION...');
        if (next === 65) setStatusText('SYNCHRONIZING GIS & TELEMETRY STREAM...');
        if (next === 90) setStatusText('TARGET ACQUIRED • ENTERING INTELLIGENCE PORTAL...');
        return next;
      });
    }, 80);

    const finishTimeout = setTimeout(() => {
      if (onCompleteNavigation) {
        onCompleteNavigation(service);
      }
    }, 1850);

    return () => {
      clearInterval(interval);
      clearTimeout(finishTimeout);
    };
  }, [isOpen, service]);

  if (!isOpen || !service) return null;

  const renderAnimation = () => {
    switch (service.slug) {
      case 'parking-surveys':
        return <ParkingAnimation />;
      case 'pedestrian-counts':
        return <PedestrianAnimation />;
      case 'public-transport-surveys':
        return <TransportAnimation />;
      case 'pedestrian-road-side-interview-surveys':
        return <RoadsideInterviewAnimation />;
      case 'household-surveys':
        return <HouseholdAnimation />;
      case 'cycle-count-surveys':
        return <CycleCountAnimation />;
      case 'market-research':
        return <MarketResearchAnimation />;
      default:
        return <PedestrianAnimation />;
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/85 backdrop-blur-xl"
      >
        {/* Futuristic glowing orbital background effect */}
        <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />
        <div
          className="absolute w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
          style={{ backgroundColor: service.accentColor || '#38bdf8' }}
        />

        {/* Modal Container */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-2xl bg-slate-900/90 border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-[0_0_80px_rgba(0,0,0,0.8)] flex flex-col justify-between overflow-hidden"
          style={{ borderColor: `${service.accentColor}55` }}
        >
          {/* Top Header */}
          <div className="flex items-start justify-between mb-4 border-b border-slate-800 pb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span
                  className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold uppercase tracking-wider flex items-center gap-1.5"
                  style={{ backgroundColor: `${service.accentColor}22`, color: service.accentColor }}
                >
                  <Sparkles className="w-3 h-3" />
                  <span>Interactive Service Simulation</span>
                </span>
                <span className="text-xs text-slate-500 font-mono">CODE: FT-{service.id.toUpperCase().slice(0, 4)}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-display text-white tracking-tight flex items-center gap-2">
                <span>{service.title}</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-md">
                {service.tagline}
              </p>
            </div>

            {/* Quick Skip Button */}
            <button
              onClick={() => onCompleteNavigation(service)}
              className="flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-700 px-3 py-1.5 rounded-xl border border-slate-700 transition-all group"
            >
              <span>Skip</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Service-Specific Interactive Animation Canvas */}
          <div className="my-2">
            {renderAnimation()}
          </div>

          {/* Telemetry Progress & Navigation Footer */}
          <div className="mt-4 pt-4 border-t border-slate-800/80">
            <div className="flex items-center justify-between text-xs font-mono mb-2">
              <div className="flex items-center gap-2 text-slate-300">
                <Cpu className="w-4 h-4 animate-spin text-brand-400" />
                <span className="truncate max-w-xs">{statusText}</span>
              </div>
              <div className="text-brand-400 font-bold">
                {progress}%
              </div>
            </div>

            {/* Progress Bar with Glowing Head */}
            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden relative">
              <motion.div
                className="h-full rounded-full relative"
                style={{
                  width: `${progress}%`,
                  background: `linear-gradient(90deg, #0284c7, ${service.accentColor || '#38bdf8'})`
                }}
              >
                <div className="absolute right-0 top-0 bottom-0 w-3 bg-white blur-[2px]" />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
