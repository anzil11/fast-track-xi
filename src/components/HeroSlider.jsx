import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Zap,
  ArrowRight,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Calculator,
  Sparkles,
  Car,
  Users,
  Bike,
  Activity,
  CheckCircle2,
  TrendingUp,
  MapPin
} from 'lucide-react';
import { useNavigation } from '../context/NavigationContext';
import { useTheme } from '../context/ThemeContext';
import { servicesData } from '../data/servicesData';

export default function HeroSlider() {
  const { navigateTo, triggerServiceTransition, setIsQuoteModalOpen } = useNavigation();
  const { isWhite } = useTheme();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const slides = [
    {
      id: 'multimodal-intelligence',
      badge: 'UK MOBILITY & TRANSPORT INTELLIGENCE',
      badgeColor: 'text-brand-400 bg-brand-500/10 border-brand-500/30',
      title: 'Data That Makes Sense.',
      titleHighlight: 'High-Precision Transport Surveys',
      description: 'A sophisticated information portal delivering rigorous, audit-ready data on pedestrian flow, parking stress, transit networks, and active travel across the UK.',
      metrics: [
        { label: 'Surveys Completed', value: '1,450+' },
        { label: 'Verified Accuracy', value: '99.4%' },
        { label: 'UK Coverage', value: 'Nationwide' },
        { label: 'Delivery SLA', value: '24-48h' }
      ],
      primaryActionText: 'EXPLORE INTERACTIVE SERVICES',
      primaryActionType: 'scroll_services',
      secondaryActionText: 'CALCULATE SURVEY QUOTE',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=80',
      accent: '#0c8fe9'
    },
    {
      id: 'parking-stress',
      serviceSlug: 'parking-surveys',
      badge: 'LAMBETH METHODOLOGY CERTIFIED',
      badgeColor: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
      title: 'Parking Stress & Beat Surveys.',
      titleHighlight: 'Planning Permission Ready',
      description: 'Comprehensive duration of stay, kerbside inventory mapping, and overnight beat surveys (00:30–05:30) for town planning applications and CPZ reviews.',
      metrics: [
        { label: 'Stress Precision', value: '100% Certified' },
        { label: 'Beat Interval', value: '15-60 mins' },
        { label: 'Bays Evaluated', value: '10,000+' },
        { label: 'Planning Acceptance', value: '100% Approved' }
      ],
      primaryActionText: 'LAUNCH PARKING SIMULATION',
      primaryActionType: 'service_transition',
      secondaryActionText: 'VIEW PARKING SPECS',
      image: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=1600&q=80',
      accent: '#fbbf24'
    },
    {
      id: 'pedestrian-flow',
      serviceSlug: 'pedestrian-counts',
      badge: 'AI OPTICAL FLOW & BI-DIRECTIONAL GATES',
      badgeColor: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30',
      title: 'Pedestrian Flow & Footfall.',
      titleHighlight: 'Granular Heatmap Analytics',
      description: 'Multi-gate cordon tracking, junction safety improvements, desire line mapping, and high-density footfall volume for retail centres and transit hubs.',
      metrics: [
        { label: 'Optical Fidelity', value: '99.4%' },
        { label: 'Tracking Interval', value: 'Sub-minute' },
        { label: 'Gate Channels', value: 'Up to 16' },
        { label: 'Heatmap Resolution', value: 'High Definition' }
      ],
      primaryActionText: 'LAUNCH PEDESTRIAN SIMULATION',
      primaryActionType: 'service_transition',
      secondaryActionText: 'VIEW PEDESTRIAN SPECS',
      image: 'https://images.unsplash.com/photo-1477959858617-67f30bc75b82?auto=format&fit=crop&w=1600&q=80',
      accent: '#38bdf8'
    },
    {
      id: 'active-cycles',
      serviceSlug: 'cycle-count-surveys',
      badge: 'DfT ACTIVE TRAVEL STANDARD',
      badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
      title: 'Active Travel & Cycle Counts.',
      titleHighlight: 'Superhighway Surge Telemetry',
      description: 'Classified bicycles, e-bikes, cargo cycles, and e-scooter telemetry providing empirical evidence for Active Travel England grants and cycleway schemes.',
      metrics: [
        { label: 'Active Travel Growth', value: '+45.7%' },
        { label: 'Classified Modes', value: 'Bikes, Cargo, EV' },
        { label: 'Sensor Duration', value: '24/7 Continuous' },
        { label: 'Compliance Level', value: 'DfT Benchmark' }
      ],
      primaryActionText: 'LAUNCH CYCLE SIMULATION',
      primaryActionType: 'service_transition',
      secondaryActionText: 'VIEW ACTIVE TRAVEL SPECS',
      image: 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=1600&q=80',
      accent: '#22c55e'
    }
  ];

  // Auto slide rotation every 6 seconds
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused, slides.length]);

  const activeSlide = slides[currentSlide];

  const handlePrimaryClick = () => {
    if (activeSlide.primaryActionType === 'service_transition' && activeSlide.serviceSlug) {
      const found = servicesData.find((s) => s.slug === activeSlide.serviceSlug);
      if (found) triggerServiceTransition(found);
    } else {
      const el = document.getElementById('services');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSecondaryClick = () => {
    if (activeSlide.serviceSlug) {
      const found = servicesData.find((s) => s.slug === activeSlide.serviceSlug);
      if (found) navigateTo('service-detail', found);
    } else {
      setIsQuoteModalOpen(true);
    }
  };

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div
      className="relative w-full overflow-hidden pt-4 pb-16 lg:pb-24"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Ambient Glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[550px] rounded-full blur-3xl opacity-20 pointer-events-none transition-all duration-700"
        style={{ backgroundColor: activeSlide.accent }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Slide Card Container */}
        <div className={`relative rounded-3xl overflow-hidden border shadow-2xl transition-all duration-500 ${isWhite
            ? 'bg-white border-slate-200'
            : 'glass-panel border-slate-800'
          }`}>

          {/* Background Image with Ambient Gradient Overlay */}
          <div className="absolute inset-0 z-0">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeSlide.id}
                src={activeSlide.image}
                alt={activeSlide.title}
                initial={{ opacity: 0, scale: 1.08 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="w-full h-full object-cover"
              />
            </AnimatePresence>

            <div className={`absolute inset-0 ${isWhite
                ? 'bg-gradient-to-r from-white via-white/95 to-white/70'
                : 'bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-950/70'
              }`} />
            <div className="absolute inset-0 bg-grid-pattern opacity-25" />
          </div>

          {/* Slide Content Area */}
          <div className="relative z-10 p-6 sm:p-10 lg:p-14 min-h-[540px] flex flex-col justify-between">

            {/* Top Bar: Slide Badge & Step Indicators */}
            <div className="flex items-center justify-between gap-4 mb-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSlide.id}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-mono font-bold uppercase tracking-wider backdrop-blur-md"
                  style={{
                    backgroundColor: `${activeSlide.accent}15`,
                    borderColor: `${activeSlide.accent}40`,
                    color: activeSlide.accent
                  }}
                >
                  <span className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: activeSlide.accent }} />
                  <span>{activeSlide.badge}</span>
                </motion.div>
              </AnimatePresence>

              {/* 4 Interactive Slide Pill Selectors */}
              <div className="flex items-center gap-2">
                {slides.map((s, idx) => (
                  <button
                    key={s.id}
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-2 rounded-full transition-all duration-300 ${currentSlide === idx
                        ? 'w-8 bg-brand-500 shadow-md'
                        : isWhite
                          ? 'w-2 bg-slate-300 hover:bg-slate-400'
                          : 'w-2 bg-slate-700 hover:bg-slate-500'
                      }`}
                    title={`Slide 0${idx + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Main Animated Text Stage */}
            <div className="max-w-3xl my-auto py-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSlide.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-4"
                >
                  <h1 className={`text-3xl sm:text-5xl lg:text-6xl font-extrabold font-display tracking-tight leading-[1.1] ${isWhite ? 'text-slate-900' : 'text-white'
                    }`}>
                    {activeSlide.title} <br />
                    <span
                      className="bg-clip-text text-transparent bg-gradient-to-r"
                      style={{
                        backgroundImage: `linear-gradient(to right, ${activeSlide.accent}, #00f2fe)`
                      }}
                    >
                      {activeSlide.titleHighlight}
                    </span>
                  </h1>

                  <p className={`text-sm sm:text-lg leading-relaxed font-light max-w-2xl ${isWhite ? 'text-slate-600' : 'text-slate-300'
                    }`}>
                    {activeSlide.description}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Interactive CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-6">
                <button
                  onClick={handlePrimaryClick}
                  className="px-7 py-3.5 rounded-2xl text-white font-mono font-bold text-xs tracking-wide shadow-lg transition-all flex items-center gap-2 group"
                  style={{
                    backgroundColor: activeSlide.accent,
                    boxShadow: `0 0 25px ${activeSlide.accent}55`
                  }}
                >
                  <span>{activeSlide.primaryActionText}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </button>

                <button
                  onClick={handleSecondaryClick}
                  className={`px-6 py-3.5 rounded-2xl font-mono text-xs font-semibold border transition-all flex items-center gap-2 ${isWhite
                      ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-800'
                      : 'glass-panel hover:bg-slate-800 border-slate-700 text-slate-200 hover:text-white'
                    }`}
                >
                  <Calculator className="w-4 h-4 text-cyan-400" />
                  <span>{activeSlide.secondaryActionText}</span>
                </button>
              </div>
            </div>

            {/* Bottom Metrics Bar & Slider Navigation Controls */}
            <div className={`mt-8 pt-6 border-t flex flex-col md:flex-row items-center justify-between gap-6 ${isWhite ? 'border-slate-200' : 'border-slate-800/80'
              }`}>

              {/* 4 Metrics from Active Slide */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full md:w-auto flex-1 max-w-2xl">
                {activeSlide.metrics.map((m) => (
                  <div key={m.label} className={`p-2.5 rounded-xl border ${isWhite ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/60 border-slate-800'
                    }`}>
                    <div className="text-[10px] font-mono text-slate-500">{m.label}</div>
                    <div className="text-base font-bold font-display" style={{ color: activeSlide.accent }}>
                      {m.value}
                    </div>
                  </div>
                ))}
              </div>

              {/* Slider Arrow Navigation Controls */}
              <div className="flex items-center gap-3">
                <button
                  onClick={prevSlide}
                  className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all ${isWhite
                      ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-800'
                      : 'bg-slate-900 hover:bg-slate-800 border-slate-700 text-white'
                    }`}
                  aria-label="Previous Slide"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <span className="text-xs font-mono font-bold px-2 text-slate-400">
                  0{currentSlide + 1} / 04
                </span>

                <button
                  onClick={nextSlide}
                  className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all ${isWhite
                      ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-800'
                      : 'bg-slate-900 hover:bg-slate-800 border-slate-700 text-white'
                    }`}
                  aria-label="Next Slide"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
