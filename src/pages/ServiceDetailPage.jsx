import React from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  FileSpreadsheet,
  Layers,
  MapPin,
  Clock,
  Zap,
  Cpu,
  ChevronRight,
  Share2,
  FileText,
  Calculator
} from 'lucide-react';
import { useNavigation } from '../context/NavigationContext';
import { servicesData } from '../data/servicesData';
import ServiceIcon from '../components/ServiceIcon';
import ParkingAnimation from '../components/animations/ParkingAnimation';
import PedestrianAnimation from '../components/animations/PedestrianAnimation';
import TransportAnimation from '../components/animations/TransportAnimation';
import RoadsideInterviewAnimation from '../components/animations/RoadsideInterviewAnimation';
import HouseholdAnimation from '../components/animations/HouseholdAnimation';
import CycleCountAnimation from '../components/animations/CycleCountAnimation';
import MarketResearchAnimation from '../components/animations/MarketResearchAnimation';

export default function ServiceDetailPage() {
  const { selectedService, triggerServiceTransition, setIsQuoteModalOpen, navigateTo } = useNavigation();
  const service = selectedService || servicesData[0];

  const renderInteractiveSimulator = () => {
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

  const otherServices = servicesData.filter((s) => s.id !== service.id);

  return (
    <div className="relative min-h-screen text-slate-100 pt-6 pb-24 overflow-hidden">
      {/* Dynamic Background Glow matching service accent color */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ backgroundColor: service.accentColor }}
      />
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-8">
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
        </div>

        {/* Top Hero Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-20">

          <div className="lg:col-span-7 space-y-6">
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
                <span>{service.heroTag}</span>
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

            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              {service.fullDescription}
            </p>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              {service.stats.map((st) => (
                <div key={st.label} className="bg-slate-900/80 rounded-xl p-3 border border-slate-800">
                  <div className="text-[10px] font-mono text-slate-500">{st.label}</div>
                  <div className="text-base font-bold font-display text-white mt-0.5" style={{ color: service.accentColor }}>
                    {st.value}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={() => setIsQuoteModalOpen(true)}
                className="px-8 py-4 rounded-xl text-white font-mono font-bold text-xs shadow-lg transition-all flex items-center gap-2"
                style={{
                  backgroundColor: service.accentColor,
                  color: '#07090e',
                  boxShadow: `0 0 25px ${service.accentColor}55`
                }}
              >
                <Calculator className="w-4 h-4" />
                <span>REQUEST {service.title.toUpperCase()} QUOTE</span>
              </button>

              <a
                href="#methodology"
                className="px-6 py-4 rounded-xl glass-panel hover:bg-slate-800 text-slate-300 hover:text-white font-mono text-xs border border-slate-700 transition-colors"
              >
                Explore Methodology ↓
              </a>
            </div>
          </div>

          {/* Right: Live Interactive Telemetry Simulator Widget */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl glass-panel p-4 sm:p-6 border border-slate-700 shadow-2xl relative">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4 text-xs font-mono">
                <div className="flex items-center gap-2" style={{ color: service.accentColor }}>
                  <Cpu className="w-4 h-4 animate-spin" />
                  <span>LIVE SIMULATOR ENGINE</span>
                </div>
                <span className="text-slate-500">INTERACTIVE RUNTIME</span>
              </div>

              {renderInteractiveSimulator()}

              <div className="mt-4 text-center">
                <span className="text-[11px] font-mono text-slate-400">
                  Simulation reflects Fast Track Surveys real-time data collection feeds.
                </span>
              </div>
            </div>
          </div>

        </div>


        {/* ========================================================================= */}
        {/* Core Capabilities & Features Breakdown */}
        {/* ========================================================================= */}
        <div className="my-20">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-2">
            <Layers className="w-4 h-4" />
            <span>CAPABILITIES & METHODOLOGICAL SCOPE</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold font-display text-white mb-8">
            Key Features & Telemetry Modules
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.features.map((feat, idx) => (
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
                <div className="text-[10px] font-mono text-slate-500 text-right">
                  MODULE 0{idx + 1}
                </div>
              </div>
            ))}
          </div>
        </div>


        {/* ========================================================================= */}
        {/* Step-by-Step 4-Stage Methodology */}
        {/* ========================================================================= */}
        <div id="methodology" className="my-20 rounded-3xl glass-panel p-8 sm:p-12 border border-slate-800">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-brand-400 text-xs font-mono">
              RIGOROUS 4-STAGE EXECUTION
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-white mt-3">
              Standard Operating Procedure
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              Every survey adheres to our quality-assured, MRS and Highway Authority compliant workflow.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.methodology.map((m, idx) => (
              <div
                key={m.step}
                className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800 flex flex-col justify-between relative group hover:border-slate-700 transition-colors"
              >
                <div className="space-y-3">
                  <div
                    className="text-3xl font-black font-display opacity-80"
                    style={{ color: service.accentColor }}
                  >
                    {m.step}
                  </div>
                  <h4 className="text-base font-bold text-white font-display">
                    {m.title}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {m.desc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-800/80 text-[10px] font-mono text-slate-500">
                  STAGE 0{idx + 1} VERIFIED
                </div>
              </div>
            ))}
          </div>
        </div>


        {/* ========================================================================= */}
        {/* Deliverables Pack & Real-World Use Cases */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 my-20">

          {/* Deliverables */}
          <div className="rounded-3xl glass-panel p-8 border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-2">
                <FileSpreadsheet className="w-4 h-4" />
                <span>CLIENT DELIVERABLES</span>
              </div>
              <h3 className="text-2xl font-bold font-display text-white mb-4">
                What You Receive
              </h3>
              <p className="text-slate-400 text-sm mb-6">
                All data packs are formatted ready for immediate insertion into Transport Assessments, Statements, and planning submission appendices.
              </p>

              <ul className="space-y-3">
                {service.deliverables.map((deliv, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                    <span>{deliv}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-800 text-xs font-mono text-slate-400 flex items-center justify-between">
              <span>FORMATS: CSV / XLSX / PDF / GIS / CAD</span>
              <span className="text-emerald-400 font-bold">24-48h SLA</span>
            </div>
          </div>

          {/* Use Cases */}
          <div className="rounded-3xl glass-panel p-8 border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-2">
                <MapPin className="w-4 h-4" />
                <span>PLANNING & URBAN ENGINEERING</span>
              </div>
              <h3 className="text-2xl font-bold font-display text-white mb-4">
                Industry Use Cases
              </h3>
              <p className="text-slate-400 text-sm mb-6">
                Tailored for civil engineering contractors, transport planners, highway authorities, and commercial developers.
              </p>

              <ul className="space-y-3">
                {service.useCases.map((uc, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-slate-300">
                    <ChevronRight className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                    <span>{uc}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-800">
              <button
                onClick={() => setIsQuoteModalOpen(true)}
                className="w-full py-3 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-mono font-bold text-xs transition-colors text-center"
              >
                Discuss Your Specific Project Scope →
              </button>
            </div>
          </div>

        </div>


        {/* ========================================================================= */}
        {/* Explore Other Services (With Interactive Animation Triggers) */}
        {/* ========================================================================= */}
        <div className="my-20">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold font-display text-white">
                Explore Other Survey Disciplines
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm mt-1">
                Click any discipline below to launch its tailored transition animation and full specifications.
              </p>
            </div>
            <button
              onClick={() => navigateTo('services')}
              className="text-xs font-mono font-bold text-cyan-400 hover:text-cyan-300"
            >
              All Services →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherServices.slice(0, 3).map((other) => (
              <div
                key={other.id}
                onClick={() => triggerServiceTransition(other)}
                className="p-6 rounded-2xl glass-panel border border-slate-800 hover:border-slate-600 transition-all cursor-pointer group flex flex-col justify-between"
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

                  <h4 className="text-lg font-bold font-display text-white group-hover:text-cyan-300 transition-colors">
                    {other.title}
                  </h4>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                    {other.summary}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400 group-hover:text-white">
                  <span>Launch Simulation</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
