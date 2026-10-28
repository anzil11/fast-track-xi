import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Car,
  Users,
  Compass,
  BarChart3,
  ArrowRight,
  Calculator,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Layers,
  Activity,
  Play,
  Pause
} from 'lucide-react';
import { useNavigation } from '../context/NavigationContext';
import { useTheme } from '../context/ThemeContext';

export default function HeroIntro() {
  const { navigateTo, setIsQuoteModalOpen, openQuoteModal } = useNavigation();
  const { isWhite } = useTheme();

  // Full-width background slider slides
  const slides = [
    {
      id: 'highways-corridors',
      tag: '01 / HIGHWAYS',
      category: 'Motorway & Trunk Road Traffic Counts',
      title: 'Highways & Strategic Corridors',
      image: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=2200&q=85'
    },
    {
      id: 'junctions-turning',
      tag: '02 / JUNCTIONS',
      category: 'Classified Turning Movement Counts',
      title: 'Interchanges & Complex Roundabouts',
      image: 'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=2200&q=85'
    },
    {
      id: 'urban-pedestrians',
      tag: '03 / ACTIVE TRAVEL',
      category: 'Pedestrian & Cycle Corridor Tracking',
      title: 'Urban Mobility & Crossings',
      image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=2200&q=85'
    },
    {
      id: 'transit-interchange',
      tag: '04 / PUBLIC TRANSIT',
      category: 'Passenger Origin-Destination Surveys',
      title: 'Multi-Modal Hubs & Terminals',
      image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=2200&q=85'
    },
    {
      id: 'parking-infrastructure',
      tag: '05 / PARKING BEAT',
      category: 'Parking Duration & Turnover Studies',
      title: 'Commercial Infrastructure & Logistics',
      image: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=2200&q=85'
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-advance full-width background slider
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused, slides.length]);

  const handlePrevSlide = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNextSlide = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const handleSelectSlide = (idx) => {
    setDirection(idx > currentSlide ? 1 : -1);
    setCurrentSlide(idx);
  };

  const handleExploreServices = () => {
    const el = document.getElementById('services');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigateTo('services');
    }
  };

  const handleRequestQuote = () => {
    if (openQuoteModal) {
      openQuoteModal(null);
    } else {
      setIsQuoteModalOpen(true);
    }
  };

  const featureBoxes = [
    {
      id: 'traffic-transport-parking',
      title: 'Traffic, Transport & Parking',
      badge: 'Survey Services',
      description: 'Traffic counts, parking surveys, passenger studies and interviews planned around your project.',
      icon: Car,
      accent: '#2ea3d9' // Official Brand Cyan
    },
    {
      id: 'experienced-field-teams',
      title: 'Experienced Field Teams',
      badge: 'Fieldwork Delivery',
      description: 'Survey teams briefed on the location, recording method and requirements of each project.',
      icon: Users,
      accent: '#10b981'
    },
    {
      id: 'project-specific-plans',
      title: 'Project-Specific Survey Plans',
      badge: 'Your Survey Brief',
      description: 'Locations, timings, recording categories and deliverables agreed before fieldwork begins.',
      icon: Compass,
      accent: '#f59e0b'
    },
    {
      id: 'clear-data-reporting',
      title: 'Clear Data & Reporting',
      badge: 'Survey Results',
      description: 'Structured datasets, clear tables and useful summaries in the formats agreed for your project.',
      icon: BarChart3,
      accent: '#016a97' // Official Deep Ocean Blue
    }
  ];

  return (
    <section
      className="relative w-full overflow-hidden min-h-[700px] lg:min-h-[780px] flex items-center pt-6 pb-16 lg:pb-20"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* ========================================================================= */}
      {/* 1. FULL-WIDTH BACKGROUND IMAGE SLIDER (ONLY BG IMAGE SLIDES FULL WIDTH) */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentSlide}
            custom={direction}
            variants={{
              enter: (dir) => ({
                x: dir > 0 ? '100%' : '-100%',
                opacity: 0.6,
                scale: 1.05
              }),
              center: {
                x: 0,
                opacity: 1,
                scale: 1,
                transition: {
                  x: { type: 'spring', stiffness: 220, damping: 28, mass: 1 },
                  opacity: { duration: 0.6 },
                  scale: { duration: 7, ease: 'easeOut' }
                }
              },
              exit: (dir) => ({
                x: dir > 0 ? '-100%' : '100%',
                opacity: 0.4,
                scale: 1.05,
                transition: {
                  x: { type: 'spring', stiffness: 220, damping: 28, mass: 1 },
                  opacity: { duration: 0.6 }
                }
              })
            }}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 w-full h-full"
          >
            <img
              src={slides[currentSlide].image}
              alt={slides[currentSlide].title}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </AnimatePresence>

        {/* Directional Logo-Brand Gradient Mask Over Full-Width Background */}
        <div
          className={`absolute inset-0 transition-colors duration-500 ${
            isWhite
              ? 'bg-gradient-to-r from-white/95 via-white/88 to-white/70'
              : 'bg-gradient-to-r from-[#060a17]/96 via-[#091127]/88 to-[#060a17]/65'
          }`}
        />

        {/* Bottom Fade to Smoothly Blend with Content Below */}
        <div
          className={`absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t pointer-events-none ${
            isWhite
              ? 'from-white via-white/60 to-transparent'
              : 'from-[#070c1a] via-[#070c1a]/60 to-transparent'
          }`}
        />

        {/* Tech Grid Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none" />

        {/* Subtle Ambient Radial Light Halos */}
        <div className="absolute top-10 left-10 w-[600px] h-[400px] bg-[#2ea3d9]/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/2 right-10 w-[500px] h-[400px] bg-[#016a97]/20 rounded-full blur-[130px] pointer-events-none" />
      </div>

      {/* ========================================================================= */}
      {/* 2. FULL-WIDTH EDGE SLIDER NAVIGATION ARROWS */}
      {/* ========================================================================= */}
      <button
        onClick={handlePrevSlide}
        aria-label="Previous Slide"
        data-cursor-text="PREV"
        className={`absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full border flex items-center justify-center transition-all backdrop-blur-md hover:scale-110 shadow-lg ${
          isWhite
            ? 'bg-white/90 border-[#b9e6f9] text-[#26335d] hover:bg-white hover:text-[#016a97] hover:border-[#016a97]'
            : 'bg-[#091126]/80 border-[#26335d] text-slate-300 hover:text-white hover:border-[#2ea3d9] hover:bg-[#0f1b3e] shadow-[0_0_15px_rgba(46,163,217,0.25)]'
        }`}
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        onClick={handleNextSlide}
        aria-label="Next Slide"
        data-cursor-text="NEXT"
        className={`absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full border flex items-center justify-center transition-all backdrop-blur-md hover:scale-110 shadow-lg ${
          isWhite
            ? 'bg-white/90 border-[#b9e6f9] text-[#26335d] hover:bg-white hover:text-[#016a97] hover:border-[#016a97]'
            : 'bg-[#091126]/80 border-[#26335d] text-slate-300 hover:text-white hover:border-[#2ea3d9] hover:bg-[#0f1b3e] shadow-[0_0_15px_rgba(46,163,217,0.25)]'
        }`}
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* ========================================================================= */}
      {/* 3. HERO CONTENT AREA (STABLE & RAZOR-SHARP ON TOP OF SLIDING BG) */}
      {/* ========================================================================= */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Main Hero Card Container */}
        <div
          className={`relative rounded-3xl overflow-hidden border transition-all duration-500 shadow-2xl ${
            isWhite
              ? 'bg-white/90 backdrop-blur-xl border-[#b9e6f9]/80 shadow-slate-200/50'
              : 'bg-[#080e22]/85 backdrop-blur-xl border-[#26335d]/80 shadow-[0_20px_60px_rgba(3,6,18,0.8)]'
          }`}
        >
          {/* Subtle Hairline Rim Light */}
          {!isWhite && (
            <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#2ea3d9]/40 to-transparent pointer-events-none" />
          )}

          <div className="relative z-10 p-6 sm:p-10 lg:p-14 flex flex-col justify-between">
            {/* Top Row: Eyebrow Badge + Live Telemetry Status Indicators */}
            <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-3">
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className={`inline-flex items-center gap-2.5 px-4 py-2 rounded-full border text-xs font-mono font-bold uppercase tracking-wider backdrop-blur-md shadow-sm ${
                    isWhite
                      ? 'bg-sky-50/90 border-sky-200 text-[#016a97]'
                      : 'bg-[#0a142e]/90 border-[#2ea3d9]/40 text-[#2ea3d9] shadow-[0_0_15px_rgba(46,163,217,0.25)]'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full animate-ping ${isWhite ? 'bg-[#016a97]' : 'bg-[#2ea3d9]'}`} />
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Traffic & Transport Surveys</span>
                </motion.div>

                {/* Audit & Accuracy Micro-Badge */}
                <div
                  className={`hidden md:inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-[10px] font-mono tracking-wider uppercase backdrop-blur-md ${
                    isWhite
                      ? 'bg-slate-50 border-slate-200 text-slate-600'
                      : 'bg-[#091126]/80 border-[#26335d] text-slate-300'
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>99.8% Fieldwork Precision</span>
                </div>
              </div>

              {/* Active Full-Width Background Slide Telemetry Pill */}
              <div
                className={`inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border text-[11px] font-mono transition-all backdrop-blur-md ${
                  isWhite
                    ? 'bg-white/90 border-[#b9e6f9] text-[#26335d] shadow-sm'
                    : 'bg-[#0c1633]/90 border-[#26335d] text-slate-300 shadow-[0_0_12px_rgba(4,8,20,0.5)]'
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${isWhite ? 'bg-[#016a97]' : 'bg-[#2ea3d9]'}`} />
                <span className="font-bold text-[#2ea3d9]">{slides[currentSlide].tag}</span>
                <span className={isWhite ? 'text-[#b9e6f9]' : 'text-[#26335d]'}>•</span>
                <span className="truncate max-w-[200px] sm:max-w-none">{slides[currentSlide].category}</span>
              </div>
            </div>

            {/* Main Introduction Headlines & Content */}
            <div className="max-w-4xl space-y-6">
              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-4xl sm:text-6xl lg:text-7xl font-extrabold font-display tracking-tight leading-[1.06]"
              >
                <span className={isWhite ? 'text-[#26335d]' : 'text-gradient-silver'}>
                  Data That Makes
                </span>{' '}
                <span className="text-[#2ea3d9] drop-shadow-[0_0_25px_rgba(46,163,217,0.4)]">
                  Sense.
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg sm:text-2xl font-semibold font-display tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#016a97] via-[#0284c7] to-[#2ea3d9]"
              >
                Reliable survey data for transport planning, development and better places.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className={`text-sm sm:text-base lg:text-lg leading-relaxed font-normal max-w-3xl ${
                  isWhite ? 'text-slate-600' : 'text-slate-300'
                }`}
              >
                Fast Track Surveys provides traffic counts, parking surveys, pedestrian and cycle counts, public transport surveys and face-to-face interviews. We work with clients to agree the survey coverage, organise the fieldwork and deliver clear results in the format their project needs.
              </motion.p>

              {/* Action Buttons: Explore Our Services | Request a Quote */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex flex-wrap items-center gap-4 pt-4"
              >
                <button
                  onClick={handleExploreServices}
                  data-cursor-text="EXPLORE"
                  className="px-8 py-4 rounded-2xl text-white font-mono font-bold text-xs tracking-wider uppercase shadow-xl transition-all flex items-center gap-2 group bg-gradient-to-r from-[#016a97] via-[#0284c7] to-[#2ea3d9] hover:from-[#01557a] hover:to-[#2ea3d9] shadow-[0_0_24px_rgba(46,163,217,0.4)] hover:shadow-[0_0_36px_rgba(46,163,217,0.65)] hover:-translate-y-0.5 shimmer-btn"
                >
                  <span>Explore Our Services</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </button>

                <button
                  onClick={handleRequestQuote}
                  data-cursor-text="QUOTE"
                  className={`px-8 py-4 rounded-2xl font-mono text-xs font-bold uppercase tracking-wider border transition-all flex items-center gap-2.5 hover:-translate-y-0.5 backdrop-blur-md ${
                    isWhite
                      ? 'bg-white/95 hover:bg-slate-50 border-[#b9e6f9] text-[#26335d] shadow-sm hover:border-[#016a97]'
                      : 'bg-[#0b142d]/85 hover:bg-[#121f44] border-[#26335d] text-slate-200 hover:text-white shadow-[0_0_20px_rgba(38,51,93,0.35)] hover:border-[#2ea3d9]/50'
                  }`}
                >
                  <Calculator className="w-4 h-4 text-[#2ea3d9]" />
                  <span>Request a Quote</span>
                </button>
              </motion.div>
            </div>

            {/* ========================================================================= */}
            {/* 4. SLIDER CONTROLS BAR: INTERACTIVE PILLS WITH SMOOTH PROGRESS */}
            {/* ========================================================================= */}
            <div className={`mt-8 pt-4 border-t flex flex-wrap items-center justify-between gap-3 ${
              isWhite ? 'border-[#b9e6f9]' : 'border-[#26335d]/60'
            }`}>
              <div className="flex items-center gap-2">
                <span className={`text-[10px] font-mono uppercase tracking-wider font-bold ${
                  isWhite ? 'text-[#016a97]' : 'text-[#2ea3d9]'
                }`}>
                  Survey Domains:
                </span>
                <div className="flex flex-wrap items-center gap-1.5">
                  {slides.map((s, idx) => {
                    const isActive = idx === currentSlide;
                    return (
                      <button
                        key={s.id}
                        onClick={() => handleSelectSlide(idx)}
                        className={`px-3 py-1.5 rounded-lg text-[10px] font-mono transition-all border ${
                          isActive
                            ? 'bg-gradient-to-r from-[#016a97] to-[#2ea3d9] text-white border-transparent shadow-[0_0_12px_rgba(46,163,217,0.5)] font-bold'
                            : isWhite
                              ? 'bg-slate-100 border-[#b9e6f9] text-slate-600 hover:bg-slate-200'
                              : 'bg-[#0b142d]/80 border-[#26335d] text-slate-400 hover:text-white hover:bg-[#121f42]'
                        }`}
                      >
                        {s.tag}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Slide Counter & Play State */}
              <div className={`text-[10px] font-mono flex items-center gap-2 ${
                isWhite ? 'text-slate-500' : 'text-slate-400'
              }`}>
                <span className="font-bold text-[#2ea3d9]">{`0${currentSlide + 1} / 0${slides.length}`}</span>
                <span>•</span>
                <span>{isPaused ? 'Paused' : 'Auto-sliding'}</span>
              </div>
            </div>

            {/* ========================================================================= */}
            {/* 5. FOUR FEATURE BOXES SECTION */}
            {/* ========================================================================= */}
            <div
              className={`mt-8 pt-8 border-t ${
                isWhite ? 'border-slate-200' : 'border-[#26335d]/60'
              }`}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {featureBoxes.map((feature, idx) => {
                  const IconComponent = feature.icon;
                  return (
                    <motion.div
                      key={feature.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.2 + idx * 0.1 }}
                      data-cursor-text="SURVEY"
                      data-cursor-accent={feature.accent}
                      className={`p-6 rounded-2xl border transition-all duration-300 flex flex-col justify-between luxury-card-hover group relative overflow-hidden ${
                        isWhite
                          ? 'bg-white/95 border-[#e2e8f0] shadow-md hover:border-[#016a97]'
                          : 'bg-[#0c1633]/80 backdrop-blur-md border-[#26335d]/80 shadow-lg hover:border-[#2ea3d9]/60 hover:shadow-[0_15px_30px_rgba(4,8,20,0.6)]'
                      }`}
                    >
                      {/* Top Hairline Accent Bar on Hover */}
                      <div
                        className="absolute top-0 inset-x-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                        style={{
                          background: `linear-gradient(90deg, transparent, ${feature.accent}, transparent)`
                        }}
                      />

                      <div>
                        {/* Top: Icon + Small Label */}
                        <div className="flex items-center justify-between mb-4">
                          <div
                            className="w-12 h-12 rounded-xl flex items-center justify-center border shadow-md transition-transform duration-300 group-hover:scale-105"
                            style={{
                              backgroundColor: `${feature.accent}18`,
                              borderColor: `${feature.accent}40`,
                              color: feature.accent
                            }}
                          >
                            <IconComponent className="w-5 h-5" />
                          </div>

                          <span
                            className="text-[10px] font-mono px-2.5 py-1 rounded-full border font-semibold tracking-wide"
                            style={{
                              backgroundColor: `${feature.accent}14`,
                              borderColor: `${feature.accent}35`,
                              color: feature.accent
                            }}
                          >
                            {feature.badge}
                          </span>
                        </div>

                        {/* Card Title */}
                        <h3
                          className={`text-base font-bold font-display tracking-tight transition-colors ${
                            isWhite ? 'text-[#26335d] group-hover:text-[#016a97]' : 'text-white group-hover:text-cyan-300'
                          }`}
                        >
                          {feature.title}
                        </h3>

                        {/* Description */}
                        <p
                          className={`text-xs mt-2.5 leading-relaxed ${
                            isWhite ? 'text-slate-600' : 'text-slate-300'
                          }`}
                        >
                          {feature.description}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
