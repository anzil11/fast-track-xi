import React from 'react';
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
import { servicesData } from '../data/servicesData';
import ServiceIcon from '../components/ServiceIcon';
import TrafficAnimation from '../components/animations/TrafficAnimation';
import ParkingAnimation from '../components/animations/ParkingAnimation';
import PedestrianAnimation from '../components/animations/PedestrianAnimation';
import TransportAnimation from '../components/animations/TransportAnimation';
import RoadsideInterviewAnimation from '../components/animations/RoadsideInterviewAnimation';
import HouseholdAnimation from '../components/animations/HouseholdAnimation';
import CycleCountAnimation from '../components/animations/CycleCountAnimation';
import MarketResearchAnimation from '../components/animations/MarketResearchAnimation';

export default function ServiceDetailPage() {
  const { selectedService, triggerServiceTransition, openQuoteModal, navigateTo } = useNavigation();
  const service = selectedService || servicesData[0];

  const renderInteractiveSimulator = () => {
    switch (service.slug) {
      case 'traffic-counts-junction-surveys':
      case 'traffic-counts':
        return <TrafficAnimation />;
      case 'parking-surveys':
        return <ParkingAnimation />;
      case 'pedestrian-counts':
        return <PedestrianAnimation />;
      case 'public-transport-surveys':
        return <TransportAnimation />;
      case 'pedestrian-road-side-interview-surveys':
      case 'travel-passenger-interviews':
        return <RoadsideInterviewAnimation />;
      case 'household-surveys':
      case 'household-travel-surveys':
        return <HouseholdAnimation />;
      case 'cycle-count-surveys':
      case 'cycle-active-travel-surveys':
        return <CycleCountAnimation />;
      case 'market-research':
      case 'visitor-customer-interviews':
        return <MarketResearchAnimation />;
      default:
        return <TrafficAnimation />;
    }
  };

  const otherServices = servicesData.filter((s) => s.id !== service.id);

  return (
    <div className="relative min-h-screen text-slate-100 pt-6 pb-24 overflow-hidden">
      {/* Dynamic Background Glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ backgroundColor: service.accentColor }}
      />
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-8">
          <button onClick={() => navigateTo('home')} className="hover:text-white transition-colors">
            HOME
          </button>
          <span>/</span>
          <button onClick={() => navigateTo('services')} className="hover:text-white transition-colors">
            SERVICES
          </button>
          <span>/</span>
          <span className="text-white font-bold" style={{ color: service.accentColor }}>
            {service.title.toUpperCase()}
          </span>
        </nav>

        {/* ========================================================================= */}
        {/* 1. INTRODUCTION */}
        {/* ========================================================================= */}
        <header className="space-y-6 mb-16 max-w-4xl">
          <div className="flex items-center gap-3">
            <span
              className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 border"
              style={{
                backgroundColor: `${service.accentColor}18`,
                color: service.accentColor,
                borderColor: `${service.accentColor}40`
              }}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{service.heroTag || 'TRAFFIC & TRANSPORT SURVEYS'}</span>
            </span>
            <span className="px-2.5 py-1 rounded-full text-[11px] font-mono bg-slate-900 border border-slate-800 text-slate-400">
              {service.badge}
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold font-display text-white tracking-tight leading-tight">
            {service.title}
          </h1>

          <p className="text-lg sm:text-xl font-light text-slate-300 leading-relaxed">
            {service.tagline}
          </p>

          <div className="text-slate-300 text-sm sm:text-base leading-relaxed space-y-3">
            {(typeof service.fullDescription === 'string'
              ? service.fullDescription.split('\n\n')
              : [service.fullDescription]
            ).map((paragraph, pIdx) => (
              <p key={pIdx}>{paragraph}</p>
            ))}
          </div>

          {/* Feature Boxes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
            {(service.featureBoxes || service.stats || []).map((item, idx) => (
              <div key={idx} className="bg-slate-900/80 rounded-xl p-4 border border-slate-800 flex flex-col justify-between">
                <div>
                  <div className="text-sm font-bold font-display text-white" style={{ color: service.accentColor }}>
                    {item.title || item.value}
                  </div>
                  {(item.desc || item.label) && (
                    <div className="text-xs text-slate-400 mt-1 leading-relaxed">
                      {item.desc || item.label}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-4">
            <button
              onClick={() => openQuoteModal(service.id)}
              className="px-8 py-4 rounded-xl font-mono font-bold text-xs shadow-lg transition-all flex items-center gap-2 hover:-translate-y-0.5"
              style={{
                backgroundColor: service.accentColor,
                color: '#07090e',
                boxShadow: `0 0 25px ${service.accentColor}55`
              }}
            >
              <Calculator className="w-4 h-4" />
              <span>{service.quoteButtonText || `REQUEST A QUOTE`}</span>
            </button>

            <a
              href="#recording-scope"
              className="px-6 py-4 rounded-xl glass-panel hover:bg-slate-800 text-slate-300 hover:text-white font-mono text-xs border border-slate-700 transition-colors"
            >
              What We Can Record ↓
            </a>
            <a
              href="#results"
              className="px-6 py-4 rounded-xl glass-panel hover:bg-slate-800 text-slate-300 hover:text-white font-mono text-xs border border-slate-700 transition-colors"
            >
              Survey Results ↓
            </a>
            <a
              href="#simulation"
              className="px-6 py-4 rounded-xl glass-panel hover:bg-slate-800 text-slate-300 hover:text-white font-mono text-xs border border-slate-700 transition-colors"
            >
              Survey Example ↓
            </a>
          </div>
        </header>

        {/* Video-Based Survey Options (Traffic, pedestrian, and cycle surveys) */}
        {['traffic-counts-junction-surveys', 'pedestrian-counts', 'cycle-count-surveys'].includes(service.slug) && (
          <section aria-label="Video-Based Survey Options" className="mb-20 rounded-2xl glass-panel p-6 border border-sky-500/30 bg-gradient-to-r from-sky-950/30 via-slate-900/80 to-slate-950/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
            <div className="space-y-1.5 max-w-2xl">
              <div className="flex items-center gap-2 text-xs font-mono text-sky-400">
                <Camera className="w-4 h-4" />
                <span className="font-bold">Video-Based Survey Options</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Where suitable for the site and project, video recording can support traffic, pedestrian and cycle surveys. Footage is reviewed to produce the agreed counts and movement summaries.
              </p>
              <p className="text-[11px] font-mono text-slate-400">
                Availability, camera coverage, installation arrangements and data handling requirements are confirmed during project scoping.
              </p>
            </div>
            <button
              onClick={() => openQuoteModal(service.id)}
              className="px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-mono font-bold text-xs shrink-0 transition-colors shadow-md"
            >
              Confirm Camera Scope →
            </button>
          </section>
        )}

        {/* ========================================================================= */}
        {/* 2. WHAT WE CAN RECORD */}
        {/* ========================================================================= */}
        <section id="recording-scope" className="mb-20">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-2">
            <Layers className="w-4 h-4" />
            <span>RECORDING SCOPE</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold font-display text-white mb-2">
            What We Can Record
          </h2>
          <p className="text-slate-400 text-sm mb-8 max-w-2xl">
            Classifications, directions, timings and data categories agreed for each survey project.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(service.features || []).map((feat, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl glass-panel border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between space-y-4"
              >
                <div className="flex items-start gap-3">
                  <div
                    className="p-2 rounded-xl shrink-0 mt-0.5"
                    style={{
                      backgroundColor: `${service.accentColor}20`,
                      color: service.accentColor
                    }}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <p className="text-slate-200 text-sm font-medium leading-relaxed">
                    {feat}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. YOUR SURVEY RESULTS */}
        {/* ========================================================================= */}
        <section id="results" className="mb-20">
          <div className="rounded-3xl glass-panel p-8 sm:p-12 border border-slate-800">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-2">
              <FileSpreadsheet className="w-4 h-4" />
              <span>SURVEY RESULTS</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold font-display text-white mb-4">
              Your Survey Results
            </h2>
            <p className="text-slate-300 text-sm sm:text-base mb-8 max-w-3xl leading-relaxed">
              Structured datasets, clear tables and useful summaries prepared to the agreed project specification.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {(service.deliverables || []).map((deliv, idx) => (
                <div key={idx} className="flex items-start gap-3 text-sm text-slate-300 bg-slate-900/60 p-3.5 rounded-xl border border-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                  <span>{deliv}</span>
                </div>
              ))}
            </div>

            <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono">
              <span className="text-slate-300">Formats: Excel, CSV and PDF. Other formats by agreement.</span>
              <span className="text-emerald-400 font-semibold">Delivery schedule agreed before fieldwork.</span>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. EXAMPLE ANIMATION */}
        {/* ========================================================================= */}
        <section id="simulation" className="mb-20">
          <div className="rounded-3xl glass-panel p-6 sm:p-8 border border-slate-700 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-6 text-xs font-mono">
              <div className="flex items-center gap-2" style={{ color: service.accentColor }}>
                <PlaySquare className="w-4 h-4" />
                <span className="font-bold">SURVEY EXAMPLE</span>
              </div>
              <span className="text-slate-400 bg-slate-900 border border-slate-800 px-2.5 py-1 rounded">
                ILLUSTRATIVE ANIMATION
              </span>
            </div>

            {renderInteractiveSimulator()}

            <div className="mt-6 text-center">
              <p className="text-xs font-mono text-slate-300 max-w-2xl mx-auto leading-relaxed">
                Illustrative example using fictional data. This animation demonstrates survey recording and presentation; it is not a live feed or a result from a completed project.
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 5. DELIVERY PROCESS */}
        {/* ========================================================================= */}
        <section id="methodology" className="mb-20 rounded-3xl glass-panel p-8 sm:p-12 border border-slate-800">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-brand-400 text-xs font-mono">
              DELIVERY PROCESS
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-white mt-3">
              How Your Survey Is Delivered
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-2">
              Four structured stages from initial project brief to final results delivery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {(service.methodology || []).map((m) => (
              <div
                key={m.step}
                className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800 flex flex-col justify-between group hover:border-slate-700 transition-colors"
              >
                <div className="space-y-3">
                  <div
                    className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center text-lg font-black font-display"
                    style={{ color: service.accentColor }}
                  >
                    {m.step}
                  </div>
                  <h3 className="text-base font-bold text-white font-display">
                    {m.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {m.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 6. HOW CLIENTS USE THIS DATA */}
        {/* ========================================================================= */}
        <section className="mb-20 rounded-3xl glass-panel p-8 sm:p-12 border border-slate-800">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-2">
            <MapPin className="w-4 h-4" />
            <span>APPLICATIONS & PLANNING</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold font-display text-white mb-3">
            How Clients Use This Data
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mb-8 max-w-3xl leading-relaxed">
            Our survey results can support the following activities, alongside the client's own assessment and analysis.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(service.useCases || []).map((uc, idx) => (
              <div key={idx} className="flex items-start gap-3 p-4 rounded-xl bg-slate-950/60 border border-slate-800">
                <ChevronRight className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                <span className="text-sm text-slate-300 leading-relaxed">{uc}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 7. ENQUIRY */}
        {/* ========================================================================= */}
        <section className="mb-20 rounded-3xl bg-gradient-to-r from-slate-900 via-sky-950/40 to-slate-900 border border-slate-800 p-8 sm:p-12 text-center">
          <div className="max-w-2xl mx-auto space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-white">
              Discuss Your Survey Requirements
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Tell us where your survey is needed and what information you want to collect. We will prepare a clear specification and quotation for your project.
            </p>
            <div className="pt-4 flex flex-wrap justify-center gap-4">
              <button
                onClick={() => openQuoteModal(service.id)}
                className="px-8 py-4 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-mono font-bold text-xs transition-colors shadow-lg hover:-translate-y-0.5"
              >
                Request a Quote →
              </button>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 8. EXPLORE OTHER SERVICES */}
        {/* ========================================================================= */}
        <section className="my-16">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold font-display text-white">
                Explore Other Services
              </h2>
              <p className="text-slate-400 text-xs sm:text-sm mt-1">
                Explore what we can record, how each survey is delivered and the results you can receive.
              </p>
            </div>
            <button
              onClick={() => navigateTo('services')}
              className="text-xs font-mono font-bold text-cyan-400 hover:text-cyan-300 self-start sm:self-auto"
            >
              View All Services →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherServices.slice(0, 3).map((other) => (
              <div
                key={other.id}
                onClick={() => triggerServiceTransition(other)}
                className="p-6 rounded-2xl glass-panel border border-slate-800 hover:border-slate-600 transition-all cursor-pointer group flex flex-col justify-between"
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
                        color: other.accentColor,
                        borderColor: `${other.accentColor}40`
                      }}
                    >
                      <ServiceIcon name={other.icon} className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded">
                      {other.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold font-display text-white group-hover:text-cyan-300 transition-colors">
                    {other.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                    {other.summary}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400 group-hover:text-white">
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
