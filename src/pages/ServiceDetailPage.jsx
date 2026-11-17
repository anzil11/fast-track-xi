import React, { lazy, Suspense } from 'react';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  FileSpreadsheet,
  Layers,
  MapPin,
  ChevronRight,
  Calculator,
  Camera,
  PlaySquare
} from 'lucide-react';
import { useNavigation } from '../context/NavigationContext';
import { useTheme } from '../context/ThemeContext';
import { servicesData } from '../data/servicesData';
import ServiceIcon from '../components/ServiceIcon';

// Lazily load simulation modules on demand
const TrafficAnimation = lazy(() => import('../components/animations/TrafficAnimation'));
const ATCAnimation = lazy(() => import('../components/animations/ATCAnimation'));
const ParkingAnimation = lazy(() => import('../components/animations/ParkingAnimation'));
const PedestrianAnimation = lazy(() => import('../components/animations/PedestrianAnimation'));
const TransportAnimation = lazy(() => import('../components/animations/TransportAnimation'));
const RoadsideInterviewAnimation = lazy(() => import('../components/animations/RoadsideInterviewAnimation'));
const HouseholdAnimation = lazy(() => import('../components/animations/HouseholdAnimation'));
const CycleCountAnimation = lazy(() => import('../components/animations/CycleCountAnimation'));
const MarketResearchAnimation = lazy(() => import('../components/animations/MarketResearchAnimation'));

export default function ServiceDetailPage() {
  const { selectedService, triggerServiceTransition, openQuoteModal, navigateTo } = useNavigation();
  const { isWhite } = useTheme();
  const service = selectedService || servicesData[0];

  // Helper for WCAG AA/AAA compliant high-contrast text color based on active theme
  const getContrastTextColor = (accent, isLight) => {
    if (isLight) {
      if (accent === '#38bdf8') return '#0284c7'; // Deep sky blue on white
      if (accent === '#fbbf24') return '#b45309'; // Deep amber on white
      if (accent === '#22c55e') return '#15803d'; // Deep forest green on white
      if (accent === '#ec4899') return '#be185d'; // Deep pink on white
      return accent;
    } else {
      if (accent === '#0284c7') return '#38bdf8'; // Bright vibrant sky for dark mode
      if (accent === '#a855f7') return '#c084fc'; // Bright lilac purple for dark mode
      return accent;
    }
  };

  // Button text color matching background luminosity
  const getButtonTextColor = (accent) => {
    if (accent === '#fbbf24') return '#07090e'; // Dark text for bright yellow
    return '#ffffff'; // Pure white text for all other vibrant backgrounds
  };

  const renderInteractiveSimulator = () => {
    let SimulatorComponent;
    switch (service.slug) {
      case 'automatic-traffic-counts':
      case 'automatic-traffic-counts-atc':
      case 'atc':
        SimulatorComponent = ATCAnimation;
        break;
      case 'traffic-counts-junction-surveys':
      case 'traffic-counts':
        SimulatorComponent = TrafficAnimation;
        break;
      case 'parking-surveys':
        SimulatorComponent = ParkingAnimation;
        break;
      case 'pedestrian-counts':
        SimulatorComponent = PedestrianAnimation;
        break;
      case 'public-transport-surveys':
        SimulatorComponent = TransportAnimation;
        break;
      case 'pedestrian-road-side-interview-surveys':
      case 'travel-passenger-interviews':
        SimulatorComponent = RoadsideInterviewAnimation;
        break;
      case 'household-surveys':
      case 'household-travel-surveys':
        SimulatorComponent = HouseholdAnimation;
        break;
      case 'cycle-count-surveys':
      case 'cycle-active-travel-surveys':
        SimulatorComponent = CycleCountAnimation;
        break;
      case 'market-research':
      case 'visitor-customer-interviews':
        SimulatorComponent = MarketResearchAnimation;
        break;
      default:
        SimulatorComponent = TrafficAnimation;
    }

    return (
      <Suspense fallback={
        <div className={`w-full h-64 rounded-2xl border flex items-center justify-center ${
          isWhite ? 'border-slate-200 bg-slate-50' : 'border-slate-800 bg-slate-900/60'
        }`}>
          <div className="w-6 h-6 rounded-full border-2 border-sky-400 border-t-transparent animate-spin" />
        </div>
      }>
        <SimulatorComponent />
      </Suspense>
    );
  };

  const otherServices = servicesData.filter((s) => s.id !== service.id);

  return (
    <div className={`relative min-h-screen pt-6 pb-24 overflow-hidden transition-colors ${
      isWhite ? 'bg-white text-slate-800' : 'text-slate-100'
    }`}>
      {/* Dynamic Background Glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ backgroundColor: service.accentColor }}
      />
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className={`flex items-center gap-2 text-xs font-mono mb-8 ${
          isWhite ? 'text-slate-500' : 'text-slate-400'
        }`}>
          <button onClick={() => navigateTo('home')} className={`transition-colors ${
            isWhite ? 'hover:text-slate-900' : 'hover:text-white'
          }`}>
            HOME
          </button>
          <span>/</span>
          <button onClick={() => navigateTo('services')} className={`transition-colors ${
            isWhite ? 'hover:text-slate-900' : 'hover:text-white'
          }`}>
            SERVICES
          </button>
          <span>/</span>
          <span className="font-bold" style={{ color: getContrastTextColor(service.accentColor, isWhite) }}>
            {service.title.toUpperCase()}
          </span>
        </nav>

        {/* ========================================================================= */}
        {/* 1. INTRODUCTION */}
        {/* ========================================================================= */}
        <section aria-label="Service Overview" className="space-y-7 mb-16 max-w-4xl">
          <div className="flex flex-wrap items-center gap-3">
            <span
              className="px-3.5 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2 border shadow-sm backdrop-blur-md"
              style={{
                backgroundColor: `${service.accentColor}18`,
                color: getContrastTextColor(service.accentColor, isWhite),
                borderColor: `${service.accentColor}45`
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full animate-ping" style={{ backgroundColor: service.accentColor }} />
              <Sparkles className="w-3.5 h-3.5" />
              <span>{service.heroTag || 'TRAFFIC & TRANSPORT SURVEYS'}</span>
            </span>

            <span className={`px-3 py-1.5 rounded-full text-[11px] font-mono font-semibold border ${
              isWhite
                ? 'bg-slate-100 border-slate-300 text-slate-700 shadow-sm'
                : 'bg-slate-900/90 border-slate-800 text-slate-300 shadow-inner'
            }`}>
              {service.badge}
            </span>
          </div>

          <h1 className={`text-4xl sm:text-6xl lg:text-7xl font-extrabold font-display tracking-tight leading-[1.08] ${
            isWhite ? 'text-slate-900' : 'text-white'
          }`}>
            <span className={isWhite ? 'text-slate-900' : 'text-gradient-silver'}>{service.title}</span>
          </h1>

          <p className={`text-xl sm:text-2xl font-bold font-display tracking-tight ${
            isWhite
              ? 'text-[#016a97]'
              : 'text-[#38bdf8]'
          }`}>
            {service.tagline}
          </p>

          <div className="text-base sm:text-lg leading-relaxed space-y-4 font-normal">
            {(typeof service.fullDescription === 'string'
              ? service.fullDescription.split('\n\n')
              : [service.fullDescription]
            ).map((paragraph, pIdx) => (
              <p key={pIdx} className={isWhite ? 'text-slate-800' : 'text-slate-200'}>
                {paragraph}
              </p>
            ))}
          </div>

          {/* Feature Boxes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
            {(service.featureBoxes || service.stats || []).map((item, idx) => (
              <div
                key={idx}
                className={`rounded-2xl p-5 border flex flex-col justify-between relative overflow-hidden transition-all ${
                  isWhite
                    ? 'bg-white border-slate-200 shadow-sm hover:border-slate-300'
                    : 'luxury-glass luxury-card-hover border-slate-800'
                }`}
              >
                <div
                  className="absolute top-0 inset-x-0 h-[2px] opacity-70"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${service.accentColor}, transparent)`
                  }}
                />
                <div>
                  <div
                    className="text-base font-bold font-display tracking-tight"
                    style={{ color: getContrastTextColor(service.accentColor, isWhite) }}
                  >
                    {item.title || item.value}
                  </div>
                  {(item.desc || item.label) && (
                    <div className={`text-xs mt-2 leading-relaxed ${isWhite ? 'text-slate-700' : 'text-slate-300'}`}>
                      {item.desc || item.label}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-6">
            <button
              onClick={() => openQuoteModal(service.id)}
              data-cursor-text="QUOTE"
              className="px-8 py-4 rounded-2xl font-mono font-bold text-xs uppercase tracking-wider shadow-xl transition-all flex items-center gap-2.5 hover:-translate-y-0.5 shimmer-btn"
              style={{
                backgroundColor: service.accentColor,
                color: getButtonTextColor(service.accentColor),
                boxShadow: `0 0 30px ${service.accentColor}55`
              }}
            >
              <Calculator className="w-4 h-4" />
              <span>{service.quoteButtonText || `REQUEST A QUOTE`}</span>
            </button>

            <a
              href="#simulation"
              data-cursor-text="PLAY"
              className={`px-7 py-4 rounded-2xl font-mono text-xs uppercase tracking-wider border transition-all flex items-center gap-2 shadow-md hover:-translate-y-0.5 ${
                isWhite
                  ? 'bg-white hover:bg-slate-100 text-slate-800 border-slate-300'
                  : 'luxury-glass hover:bg-slate-800/80 text-slate-200 hover:text-white border-slate-700'
              }`}
            >
              <PlaySquare className={`w-4 h-4 ${isWhite ? 'text-sky-700' : 'text-cyan-400'}`} />
              <span>Watch Interactive Simulation ↓</span>
            </a>
          </div>
        </section>

        {/* Video-Based Survey Options (Traffic, pedestrian, and cycle surveys) */}
        {['traffic-counts-junction-surveys', 'pedestrian-counts', 'cycle-count-surveys'].includes(service.slug) && (
          <section
            aria-label="Video-Based Survey Options"
            className={`mb-12 rounded-2xl p-6 border flex flex-col md:flex-row items-start md:items-center justify-between gap-5 ${
              isWhite
                ? 'bg-sky-50/80 border-sky-200 text-slate-800 shadow-sm'
                : 'glass-panel border-sky-500/30 bg-gradient-to-r from-sky-950/30 via-slate-900/80 to-slate-950/80 text-white'
            }`}
          >
            <div className="space-y-1.5 max-w-2xl">
              <div className={`flex items-center gap-2 text-xs font-mono ${isWhite ? 'text-sky-700 font-bold' : 'text-sky-400'}`}>
                <Camera className="w-4 h-4" />
                <span className="font-bold">VIDEO SURVEY OPTIONS</span>
              </div>
              <h3 className={`text-base font-bold ${isWhite ? 'text-slate-900' : 'text-white'}`}>
                Video-Based Survey Options
              </h3>
              <p className={`text-xs sm:text-sm leading-relaxed ${isWhite ? 'text-slate-700' : 'text-slate-300'}`}>
                Where suitable for the site and project, video recording can support traffic, pedestrian and cycle surveys. Footage is reviewed to produce the agreed counts and movement summaries.
              </p>
              <p className={`text-[11px] font-mono ${isWhite ? 'text-slate-500' : 'text-slate-400'}`}>
                Availability, camera coverage, installation arrangements and data handling requirements are confirmed during project scoping.
              </p>
            </div>
            <button
              onClick={() => openQuoteModal(service.id)}
              className="px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-mono font-bold text-xs shrink-0 transition-colors shadow-md text-white-always"
            >
              Confirm Camera Scope →
            </button>
          </section>
        )}

        {/* ========================================================================= */}
        {/* 3. RELEVANT ANIMATED EXAMPLE PANEL */}
        {/* ========================================================================= */}
        <section id="simulation" className="mb-20 scroll-mt-28">
          <div className={`rounded-3xl p-6 sm:p-8 border shadow-2xl relative ${
            isWhite ? 'bg-white border-slate-200 text-slate-900' : 'glass-panel border-slate-700 text-white'
          }`}>
            <div className={`border-b pb-4 mb-6 ${isWhite ? 'border-slate-200' : 'border-slate-800'}`}>
              <span className={`text-xs font-mono font-bold tracking-wider uppercase block mb-1 ${
                isWhite ? 'text-sky-700' : 'text-sky-400'
              }`}>
                See How This Survey Works
              </span>
              <h2 className={`text-xl sm:text-2xl font-bold font-display ${isWhite ? 'text-slate-900' : 'text-white'}`}>
                Watch a short example of how observations are recorded and presented.
              </h2>
            </div>

            {renderInteractiveSimulator()}

            <div className="mt-6 text-center">
              <p className={`text-xs font-mono max-w-2xl mx-auto leading-relaxed ${isWhite ? 'text-slate-600' : 'text-slate-400'}`}>
                Illustrative example using fictional data. This animation demonstrates survey recording and presentation; it is not a live feed or a result from a completed project.
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. WHAT WE CAN RECORD */}
        {/* ========================================================================= */}
        <section id="recording-scope" className="mb-20 scroll-mt-28">
          <div className={`flex items-center gap-2 text-xs font-mono mb-2 ${isWhite ? 'text-sky-700 font-bold' : 'text-cyan-400'}`}>
            <Layers className="w-4 h-4" />
            <span>RECORDING SCOPE</span>
          </div>
          <h2 className={`text-2xl sm:text-4xl font-bold font-display mb-2 ${isWhite ? 'text-slate-900' : 'text-white'}`}>
            What We Can Record
          </h2>
          <p className={`text-sm mb-8 max-w-2xl leading-relaxed ${isWhite ? 'text-slate-600' : 'text-slate-300'}`}>
            {['pedestrian-road-side-interview-surveys', 'household-surveys', 'market-research'].includes(service.slug)
              ? 'Question topics, interview locations and sample requirements are agreed before fieldwork.'
              : 'Classifications, directions, timings and data categories agreed for each survey project.'}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(service.features || []).map((feat, idx) => (
              <div
                key={idx}
                className={`p-6 rounded-2xl border transition-all flex flex-col justify-between space-y-4 ${
                  isWhite
                    ? 'bg-white border-slate-200 shadow-sm hover:border-slate-300'
                    : 'glass-panel border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className="p-2 rounded-xl shrink-0 mt-0.5"
                    style={{
                      backgroundColor: `${service.accentColor}20`,
                      color: getContrastTextColor(service.accentColor, isWhite)
                    }}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <p className={`text-sm font-medium leading-relaxed ${isWhite ? 'text-slate-800' : 'text-slate-200'}`}>
                    {feat}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 5. YOUR SURVEY RESULTS */}
        {/* ========================================================================= */}
        <section id="results" className="mb-20 scroll-mt-28">
          <div className={`rounded-3xl p-8 sm:p-12 border ${
            isWhite ? 'bg-white border-slate-200 text-slate-900 shadow-sm' : 'glass-panel border-slate-800 text-white'
          }`}>
            <div className={`flex items-center gap-2 text-xs font-mono mb-2 ${isWhite ? 'text-emerald-700 font-bold' : 'text-emerald-400'}`}>
              <FileSpreadsheet className="w-4 h-4" />
              <span>SURVEY RESULTS</span>
            </div>
            <h2 className={`text-2xl sm:text-4xl font-bold font-display mb-4 ${isWhite ? 'text-slate-900' : 'text-white'}`}>
              Your Survey Results
            </h2>
            <p className={`text-sm sm:text-base mb-8 max-w-3xl leading-relaxed ${isWhite ? 'text-slate-600' : 'text-slate-300'}`}>
              Structured datasets, clear tables and useful summaries prepared to the agreed project specification.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {(service.deliverables || []).map((deliv, idx) => (
                <div
                  key={idx}
                  className={`flex items-start gap-3 text-sm p-3.5 rounded-xl border ${
                    isWhite
                      ? 'bg-slate-50 text-slate-800 border-slate-200'
                      : 'bg-slate-900/60 text-slate-200 border-slate-800'
                  }`}
                >
                  <CheckCircle2 className={`w-4 h-4 mt-0.5 shrink-0 ${isWhite ? 'text-emerald-600' : 'text-emerald-400'}`} />
                  <span className="leading-relaxed">{deliv}</span>
                </div>
              ))}
            </div>

            <div className={`pt-6 border-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono ${
              isWhite ? 'border-slate-200 text-slate-600' : 'border-slate-800 text-slate-300'
            }`}>
              <span>Formats: Excel, CSV and PDF. Other formats by agreement.</span>
              <span className={isWhite ? 'text-emerald-700 font-bold' : 'text-emerald-400 font-semibold'}>
                Delivery schedule agreed before fieldwork.
              </span>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 6. HOW YOUR SURVEY IS DELIVERED */}
        {/* ========================================================================= */}
        <section id="methodology" className={`mb-20 rounded-3xl p-8 sm:p-12 border ${
          isWhite ? 'bg-slate-50 border-slate-200 text-slate-900 shadow-sm' : 'glass-panel border-slate-800 text-white'
        }`}>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold ${
              isWhite ? 'bg-sky-100 border border-sky-200 text-sky-800' : 'bg-slate-900 border border-slate-700 text-sky-400'
            }`}>
              DELIVERY PROCESS
            </span>
            <h2 className={`text-3xl sm:text-4xl font-bold font-display mt-3 ${isWhite ? 'text-slate-900' : 'text-white'}`}>
              How Your Survey Is Delivered
            </h2>
            <p className={`text-xs sm:text-sm mt-2 ${isWhite ? 'text-slate-600' : 'text-slate-400'}`}>
              Four structured stages from initial project brief to final results delivery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {(service.methodology || []).map((m) => (
              <div
                key={m.step}
                className={`p-6 rounded-2xl border flex flex-col justify-between group transition-colors ${
                  isWhite
                    ? 'bg-white border-slate-200 shadow-sm hover:border-sky-300'
                    : 'bg-slate-950/80 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="space-y-3">
                  <div
                    className={`w-10 h-10 rounded-xl border flex items-center justify-center text-lg font-black font-display ${
                      isWhite ? 'bg-slate-100 border-slate-200' : 'bg-slate-900 border-slate-700'
                    }`}
                    style={{ color: getContrastTextColor(service.accentColor, isWhite) }}
                  >
                    {m.step}
                  </div>
                  <h3 className={`text-base font-bold font-display ${isWhite ? 'text-slate-900' : 'text-white'}`}>
                    {m.title}
                  </h3>
                  <p className={`text-xs leading-relaxed ${isWhite ? 'text-slate-600' : 'text-slate-300'}`}>
                    {m.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 7. HOW CLIENTS USE THIS DATA */}
        {/* ========================================================================= */}
        <section className={`mb-20 rounded-3xl p-8 sm:p-12 border ${
          isWhite ? 'bg-white border-slate-200 shadow-sm' : 'glass-panel border-slate-800 text-white'
        }`}>
          <div className={`flex items-center gap-2 text-xs font-mono mb-2 ${isWhite ? 'text-sky-700 font-bold' : 'text-cyan-400'}`}>
            <MapPin className="w-4 h-4" />
            <span>APPLICATIONS & PLANNING</span>
          </div>
          <h2 className={`text-2xl sm:text-4xl font-bold font-display mb-3 ${isWhite ? 'text-slate-900' : 'text-white'}`}>
            How Clients Use This Data
          </h2>
          <p className={`text-sm sm:text-base mb-8 max-w-3xl leading-relaxed ${isWhite ? 'text-slate-600' : 'text-slate-300'}`}>
            Our survey results can support the following activities, alongside the client's own assessment and analysis.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(service.useCases || []).map((uc, idx) => (
              <div
                key={idx}
                className={`flex items-start gap-3 p-4 rounded-xl border ${
                  isWhite
                    ? 'bg-slate-50 border-slate-200 text-slate-800'
                    : 'bg-slate-950/60 border-slate-800 text-slate-200'
                }`}
              >
                <ChevronRight className={`w-4 h-4 mt-0.5 shrink-0 ${isWhite ? 'text-sky-600' : 'text-cyan-400'}`} />
                <span className="text-sm leading-relaxed">{uc}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 8. ENQUIRY / CALL TO ACTION */}
        {/* ========================================================================= */}
        <section className={`mb-20 rounded-3xl border p-8 sm:p-12 text-center ${
          isWhite
            ? 'bg-gradient-to-r from-sky-50 via-cyan-50/50 to-sky-50 border-sky-200 text-slate-900 shadow-sm'
            : 'bg-gradient-to-r from-slate-900 via-sky-950/40 to-slate-900 border-slate-800 text-white'
        }`}>
          <div className="max-w-2xl mx-auto space-y-4">
            <h2 className={`text-2xl sm:text-3xl font-bold font-display ${isWhite ? 'text-slate-900' : 'text-white'}`}>
              Discuss Your Survey Requirements
            </h2>
            <p className={`text-sm leading-relaxed ${isWhite ? 'text-slate-700' : 'text-slate-300'}`}>
              Tell us where your survey is needed and what information you want to collect. We will prepare a clear specification and quotation for your project.
            </p>
            <div className="pt-4 flex flex-wrap justify-center gap-4">
              <button
                onClick={() => openQuoteModal(service.id)}
                className="px-8 py-4 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-mono font-bold text-xs transition-colors shadow-lg hover:-translate-y-0.5 text-white-always"
              >
                Request a Quote →
              </button>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 9. EXPLORE OTHER SERVICES */}
        {/* ========================================================================= */}
        <section className="my-16">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
            <div>
              <h2 className={`text-2xl sm:text-3xl font-bold font-display ${isWhite ? 'text-slate-900' : 'text-white'}`}>
                Explore Other Services
              </h2>
              <p className={`text-xs sm:text-sm mt-1 ${isWhite ? 'text-slate-600' : 'text-slate-400'}`}>
                Explore what we can record, how each survey is delivered and the results you can receive.
              </p>
            </div>
            <button
              onClick={() => navigateTo('services')}
              className={`text-xs font-mono font-bold self-start sm:self-auto ${
                isWhite ? 'text-sky-700 hover:text-sky-900' : 'text-cyan-400 hover:text-cyan-300'
              }`}
            >
              View All Services →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherServices.slice(0, 3).map((other) => (
              <div
                key={other.id}
                onClick={() => triggerServiceTransition(other)}
                className={`p-6 rounded-2xl border transition-all cursor-pointer group flex flex-col justify-between ${
                  isWhite
                    ? 'bg-white border-slate-200 hover:border-slate-400 shadow-sm'
                    : 'glass-panel border-slate-800 hover:border-slate-600'
                }`}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    triggerServiceTransition(other);
                  }
                }}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center border"
                      style={{
                        backgroundColor: `${other.accentColor}20`,
                        color: getContrastTextColor(other.accentColor, isWhite),
                        borderColor: `${other.accentColor}40`
                      }}
                    >
                      <ServiceIcon name={other.icon} className="w-5 h-5" />
                    </div>
                    <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded font-semibold border ${
                      isWhite
                        ? 'bg-slate-100 text-slate-700 border-slate-200'
                        : 'bg-slate-900 text-slate-300 border-slate-800'
                    }`}>
                      {other.badge}
                    </span>
                  </div>

                  <h3 className={`text-lg font-bold font-display transition-colors ${
                    isWhite ? 'text-slate-900 group-hover:text-sky-600' : 'text-white group-hover:text-cyan-300'
                  }`}>
                    {other.title}
                  </h3>
                  <p className={`text-xs mt-1 line-clamp-2 ${isWhite ? 'text-slate-600' : 'text-slate-300'}`}>
                    {other.summary}
                  </p>
                </div>

                <div className={`mt-4 pt-3 border-t flex items-center justify-between text-xs font-mono ${
                  isWhite
                    ? 'border-slate-200 text-slate-600 group-hover:text-slate-900'
                    : 'border-slate-800 text-slate-400 group-hover:text-white'
                }`}>
                  <span>View Service</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
