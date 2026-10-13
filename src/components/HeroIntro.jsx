import React from 'react';
import { motion } from 'framer-motion';
import {
  Car,
  Users,
  Compass,
  BarChart3,
  ArrowRight,
  Calculator,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { useNavigation } from '../context/NavigationContext';
import { useTheme } from '../context/ThemeContext';

export default function HeroIntro() {
  const { navigateTo, setIsQuoteModalOpen } = useNavigation();
  const { isWhite } = useTheme();

  const handleExploreServices = () => {
    const el = document.getElementById('services');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigateTo('services');
    }
  };

  const handleRequestQuote = () => {
    setIsQuoteModalOpen(true);
  };

  const featureBoxes = [
    {
      id: 'traffic-transport-parking',
      title: 'Traffic, Transport & Parking',
      description: 'Comprehensive vehicle turning counts, kerbside inventory & Lambeth parking stress studies.',
      icon: Car,
      accent: '#0284c7', // Brand blue
      badge: 'Multimodal Surveys',
      onClick: handleExploreServices
    },
    {
      id: 'experienced-field-teams',
      title: 'Experienced Field Teams',
      description: 'Accredited, Chapter 8 certified survey crews and skilled CAPI enumerators deployed nationwide.',
      icon: Users,
      accent: '#10b981', // Emerald
      badge: 'Certified Surveyors',
      onClick: () => {
        const el = document.getElementById('coverage');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        } else {
          navigateTo('about');
        }
      }
    },
    {
      id: 'project-specific-plans',
      title: 'Project-Specific Survey Plans',
      description: 'Bespoke survey design and agreed sensor cordons tailored to your planning brief.',
      icon: Compass,
      accent: '#f59e0b', // Amber
      badge: 'Tailored Scope',
      onClick: handleRequestQuote
    },
    {
      id: 'clear-data-reporting',
      title: 'Clear Data & Reporting',
      description: 'Audit-ready datasets formatted for GIS, CAD, CSV and executive planning decks.',
      icon: BarChart3,
      accent: '#8b5cf6', // Violet
      badge: 'Audit-Ready Outputs',
      onClick: handleRequestQuote
    }
  ];

  return (
    <section className="relative w-full overflow-hidden pt-4 pb-16 lg:pb-20">
      {/* Background Ambient Glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[550px] rounded-full blur-3xl opacity-20 pointer-events-none transition-all duration-700"
        style={{ backgroundColor: '#0284c7' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Hero Container Card */}
        <div
          className={`relative rounded-3xl overflow-hidden border shadow-2xl transition-all duration-500 ${
            isWhite
              ? 'bg-white border-slate-200 shadow-slate-200/50'
              : 'glass-panel border-slate-800 shadow-black/60'
          }`}
        >
          {/* Subtle Background Layer with High-Res Urban Transport Overlay */}
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1800&q=80"
              alt="Transport Network Data"
              className="w-full h-full object-cover opacity-20"
            />
            <div
              className={`absolute inset-0 ${
                isWhite
                  ? 'bg-gradient-to-r from-white via-white/95 to-white/80'
                  : 'bg-gradient-to-r from-slate-950 via-slate-950/95 to-slate-950/80'
              }`}
            />
            <div className="absolute inset-0 bg-grid-pattern opacity-25 pointer-events-none" />
          </div>

          {/* Hero Content Area */}
          <div className="relative z-10 p-6 sm:p-10 lg:p-14 flex flex-col justify-between">
            {/* Top Eyebrow Badge */}
            <div className="mb-6">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-mono font-bold uppercase tracking-wider backdrop-blur-md ${
                  isWhite
                    ? 'bg-sky-50 border-sky-200 text-sky-700'
                    : 'bg-brand-500/10 border-brand-500/30 text-brand-400'
                }`}
              >
                <span className="w-2 h-2 rounded-full animate-ping bg-brand-400" />
                <Sparkles className="w-3.5 h-3.5 text-brand-400" />
                <span>Traffic & Transport Surveys</span>
              </motion.div>
            </div>

            {/* Main Introduction Headlines & Content */}
            <div className="max-w-4xl space-y-5">
              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className={`text-4xl sm:text-6xl lg:text-7xl font-extrabold font-display tracking-tight leading-[1.08] ${
                  isWhite ? 'text-slate-900' : 'text-white'
                }`}
              >
                Data That Makes Sense
                <span className="text-brand-400">.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg sm:text-2xl font-semibold font-display tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-brand-400 via-sky-400 to-cyan-300"
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
                  className="px-7 py-4 rounded-2xl text-white font-mono font-bold text-xs tracking-wider uppercase shadow-lg transition-all flex items-center gap-2 group bg-gradient-to-r from-brand-600 via-sky-500 to-cyan-500 hover:from-brand-500 hover:to-cyan-400 shadow-brand-500/25 hover:shadow-brand-500/40 hover:-translate-y-0.5"
                >
                  <span>Explore Our Services</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </button>

                <button
                  onClick={handleRequestQuote}
                  className={`px-7 py-4 rounded-2xl font-mono text-xs font-bold uppercase tracking-wider border transition-all flex items-center gap-2 hover:-translate-y-0.5 ${
                    isWhite
                      ? 'bg-slate-50 hover:bg-slate-100 border-slate-300 text-slate-800 shadow-sm'
                      : 'glass-panel hover:bg-slate-800 border-slate-700 text-slate-200 hover:text-white'
                  }`}
                >
                  <Calculator className="w-4 h-4 text-brand-400" />
                  <span>Request a Quote</span>
                </button>
              </motion.div>
            </div>

            {/* Four Feature Boxes Section */}
            <div
              className={`mt-12 pt-10 border-t ${
                isWhite ? 'border-slate-200' : 'border-slate-800/80'
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
                      onClick={feature.onClick}
                      className={`group p-5 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between hover:-translate-y-1 ${
                        isWhite
                          ? 'bg-slate-50 hover:bg-white border-slate-200 hover:border-slate-300 hover:shadow-lg shadow-sm'
                          : 'bg-slate-900/60 hover:bg-slate-900/90 border-slate-800 hover:border-slate-700 hover:shadow-xl'
                      }`}
                    >
                      <div>
                        {/* Top: Icon + Badge */}
                        <div className="flex items-center justify-between mb-4">
                          <div
                            className="w-11 h-11 rounded-xl flex items-center justify-center border transition-transform duration-300 group-hover:scale-110"
                            style={{
                              backgroundColor: `${feature.accent}15`,
                              borderColor: `${feature.accent}35`,
                              color: feature.accent
                            }}
                          >
                            <IconComponent className="w-5 h-5" />
                          </div>

                          <span
                            className="text-[10px] font-mono px-2 py-0.5 rounded-full border"
                            style={{
                              backgroundColor: `${feature.accent}10`,
                              borderColor: `${feature.accent}30`,
                              color: feature.accent
                            }}
                          >
                            {feature.badge}
                          </span>
                        </div>

                        {/* Title */}
                        <h3
                          className={`text-base font-bold font-display tracking-tight transition-colors ${
                            isWhite
                              ? 'text-slate-900 group-hover:text-brand-600'
                              : 'text-white group-hover:text-brand-400'
                          }`}
                        >
                          {feature.title}
                        </h3>

                        {/* Description */}
                        <p
                          className={`text-xs mt-2 leading-relaxed ${
                            isWhite ? 'text-slate-500' : 'text-slate-400'
                          }`}
                        >
                          {feature.description}
                        </p>
                      </div>

                      {/* Bottom Link Cue */}
                      <div className="mt-4 pt-3 border-t border-slate-200/50 dark:border-slate-800/60 flex items-center justify-between text-[11px] font-mono text-brand-400 group-hover:text-brand-300">
                        <span>Learn More</span>
                        <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
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
