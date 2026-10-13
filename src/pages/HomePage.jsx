import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Zap,
  Activity,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  MapPin,
  Clock,
  Sparkles,
  ChevronRight,
  Phone,
  Mail,
  Send,
  Building2,
  FileSpreadsheet,
  Layers,
  Cpu,
  Calculator,
  Compass
} from 'lucide-react';
import { useNavigation } from '../context/NavigationContext';
import { servicesData } from '../data/servicesData';
import { companyInfo } from '../data/companyData';
import ServiceCard from '../components/ServiceCard';
import ServiceIcon from '../components/ServiceIcon';
import HeroIntro from '../components/HeroIntro';

export default function HomePage() {
  const { navigateTo, triggerServiceTransition, setIsQuoteModalOpen } = useNavigation();

  // Contact form states
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    city: '',
    phone: '',
    email: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeMethodologyTab, setActiveMethodologyTab] = useState(0);
  const [selectedRegion, setSelectedRegion] = useState(companyInfo.coverageRegions[0]);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', company: '', city: '', phone: '', email: '', message: '' });
    }, 4500);
  };

  const methodologies = [
    {
      title: 'Video-Based Survey Options',
      desc: 'Where suitable for the site and project, video recording can support traffic, pedestrian and cycle surveys. Footage is reviewed to produce the agreed counts and movement summaries.\n\nAvailability, camera coverage, installation arrangements and data handling requirements are confirmed during project scoping.',
      metrics: 'Site & Project Dependent • Confirmed During Scoping',
      icon: 'Camera',
      color: '#38bdf8'
    },
    {
      title: 'Lambeth Methodology Parking Beats',
      desc: 'Systematic 15-to-60 minute recurring beats during overnight peak stress (00:30–05:30) and diurnal business peaks for planning justification.',
      metrics: '100% Planning Compliant • CPZ Geospatial Layers',
      icon: 'Car',
      color: '#fbbf24'
    },
    {
      title: 'Digital CAPI Tablet Fieldwork',
      desc: 'Encrypted handheld tablet interviews with real-time GPS time-stamping, logic branching, and zero data loss for origin-destination studies.',
      metrics: 'MRS Certified • Instant Cloud Sync',
      icon: 'MessageSquareText',
      color: '#10b981'
    },
    {
      title: 'Active Travel & Micro-Mobility Audit',
      desc: 'Continuous classification of pedal cycles, cargo bikes, e-scooters, and shared mobility networks aligned with DfT national release standards.',
      metrics: 'DfT Standard Compliant • Peak Hour Flow Vectors',
      icon: 'Bike',
      color: '#22c55e'
    }
  ];

  return (
    <div className="relative min-h-screen text-slate-100 overflow-hidden">

      {/* ========================================================================= */}
      {/* 1. HOMEPAGE INTRODUCTION & FOUR FEATURE BOXES */}
      {/* ========================================================================= */}
      <HeroIntro />


      {/* ========================================================================= */}
      {/* 2. THE SERVICES SECTION (INTERACTIVE CARDS WITH ANIMATION TRIGGERS) */}
      {/* ========================================================================= */}
      <section id="services" className="py-24 relative bg-slate-950/60 border-t border-b border-slate-800/80">
        <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono uppercase tracking-widest mb-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>Interactive Disciplines • Click to Launch Custom Simulation</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-white tracking-tight">
                Our Survey Services
              </h2>
              <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-xl">
                Click any service card to experience its dedicated, animated telemetry simulation before entering full technical specifications.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => navigateTo('services')}
                className="text-xs font-mono font-bold text-brand-400 hover:text-brand-300 flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 border border-slate-700"
              >
                <span>FULL SERVICES DIRECTORY</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Interactive Service Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {servicesData.map((service, index) => (
              <ServiceCard
                key={service.id}
                service={service}
                index={index}
              />
            ))}
          </div>

        </div>
      </section>


      {/* ========================================================================= */}
      {/* 3. METHODOLOGY & SENSOR SIMULATOR SECTION */}
      {/* ========================================================================= */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-400 text-xs font-mono mb-3">
              <Cpu className="w-3.5 h-3.5" />
              <span>STANDARDS & FIELD METHODOLOGY</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-white">
              Engineered for Audit-Ready Precision
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2">
              Our quality data enables civil engineers, local authorities, and transport consultants to design and model infrastructure with absolute confidence.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

            {/* Left Selector Tabs */}
            <div className="lg:col-span-5 space-y-3">
              {methodologies.map((meth, idx) => {
                const isActive = activeMethodologyTab === idx;
                return (
                  <div
                    key={meth.title}
                    onClick={() => setActiveMethodologyTab(idx)}
                    className={`p-5 rounded-2xl border transition-all cursor-pointer ${isActive
                        ? 'bg-slate-800/90 border-brand-400/80 shadow-[0_0_30px_rgba(12,143,233,0.2)] translate-x-2'
                        : 'bg-slate-900/40 border-slate-800 hover:bg-slate-800/40 text-slate-400'
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border"
                        style={{
                          backgroundColor: `${meth.color}20`,
                          color: meth.color,
                          borderColor: `${meth.color}40`
                        }}
                      >
                        <ServiceIcon name={meth.icon} className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-bold text-white font-display">
                          {meth.title}
                        </h4>
                        <span className="text-[11px] font-mono text-slate-400 block mt-0.5">
                          {meth.metrics}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right Interactive Detail Pane */}
            <div className="lg:col-span-7">
              <div className="rounded-3xl glass-panel p-6 sm:p-8 border border-slate-700 shadow-2xl relative overflow-hidden">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
                  <div className="flex items-center gap-2 text-xs font-mono text-brand-400">
                    <Activity className="w-4 h-4 animate-pulse" />
                    <span>METHODOLOGY BREAKDOWN #0{activeMethodologyTab + 1}</span>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                    100% QA VERIFIED
                  </span>
                </div>

                <h3 className="text-2xl font-bold font-display text-white mb-4">
                  {methodologies[activeMethodologyTab].title}
                </h3>

                <p className="text-slate-300 text-sm leading-relaxed mb-6">
                  {methodologies[activeMethodologyTab].desc}
                </p>

                <div className="grid grid-cols-2 gap-4 bg-slate-950/80 p-4 rounded-2xl border border-slate-800 text-xs font-mono">
                  <div>
                    <span className="text-slate-500 block">STANDARD SPECIFICATION</span>
                    <span className="font-bold text-white mt-1 block">
                      {methodologies[activeMethodologyTab].metrics}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">DATA INTEGRATION</span>
                    <span className="font-bold text-brand-400 mt-1 block">
                      CSV / GIS / CAD / PDF Deck
                    </span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-400">
                    Need custom parameters for your project?
                  </span>
                  <button
                    onClick={() => setIsQuoteModalOpen(true)}
                    className="text-xs font-mono font-bold text-brand-400 hover:text-brand-300 flex items-center gap-1"
                  >
                    <span>Request Technical Scope</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>


      {/* ========================================================================= */}
      {/* 4. UK COVERAGE & REGIONAL MOBILIZATION HUB */}
      {/* ========================================================================= */}
      <section id="coverage" className="py-20 relative bg-slate-950/40 border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="rounded-3xl glass-panel p-8 sm:p-12 border border-slate-800 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-10">

            <div className="max-w-xl space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
                <MapPin className="w-4 h-4 text-cyan-400" />
                <span>NATIONWIDE LOGISTICS & SURVEYOR DEPLOYMENT</span>
              </div>
              <h3 className="text-2xl sm:text-4xl font-bold font-display text-white">
                London Headquarters with Rapid UK Mobilization
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Operating from our central London base at 86-90 Paul Street, our accredited survey teams deploy daily across England, Wales, and Scotland with 24-48 hour turnaround capability.
              </p>

              <div className="pt-2 flex flex-wrap gap-2">
                {companyInfo.coverageRegions.map((reg) => (
                  <button
                    key={reg.name}
                    onClick={() => setSelectedRegion(reg)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all ${selectedRegion.name === reg.name
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400'
                        : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                  >
                    {reg.name.split('&')[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* Region Detail Card */}
            <div className="w-full lg:w-96 bg-slate-950/90 rounded-2xl p-6 border border-slate-700/80 space-y-4 font-mono text-xs">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-slate-400">REGION</span>
                <span className="text-cyan-400 font-bold">{selectedRegion.name}</span>
              </div>
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-slate-400">DISPATCH SLA</span>
                <span className="text-emerald-400 font-bold">{selectedRegion.coverage}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">KEY HUBS</span>
                <span className="text-white text-right font-semibold">{selectedRegion.hubs}</span>
              </div>
              <div className="pt-2">
                <a
                  href="#contact"
                  className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-center font-bold block transition-colors border border-slate-700"
                >
                  Book Field Team in {selectedRegion.name.split(' ')[0]}
                </a>
              </div>
            </div>

          </div>

        </div>
      </section>


      {/* ========================================================================= */}
      {/* 5. CONTACT US & DIRECT INQUIRY SECTION (ENHANCED FROM ORIGINAL) */}
      {/* ========================================================================= */}
      <section id="contact" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-400 text-xs font-mono mb-3">
              <Mail className="w-3.5 h-3.5" />
              <span>DIRECT SURVEY INQUIRY</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-white">
              Contact Fast Track Surveys
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2">
              Interested to know more about our data services, methodologies, or project scheduling? Send us your brief below.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

            {/* Left Contact Information Card */}
            <div className="lg:col-span-5 rounded-3xl glass-panel p-8 border border-slate-800 flex flex-col justify-between space-y-8">
              <div>
                <h3 className="text-2xl font-bold font-display text-white mb-2">
                  Headquarters & Consultation
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Our survey coordination team is available Monday to Friday, 08:00 to 18:00 GMT for immediate planning inquiries and emergency counts.
                </p>

                <div className="space-y-4 mt-8 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-xl bg-brand-500/20 text-brand-400 shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h5 className="font-semibold text-white">Registered Office</h5>
                      <p className="text-slate-400 text-xs mt-0.5">
                        86-90 Paul Street, London, England, United Kingdom, EC2A 4NE
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400 shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <h5 className="font-semibold text-white">Direct Line</h5>
                      <a href="tel:00447767597947" className="text-slate-300 text-xs hover:text-white font-mono">
                        00447767 597947 / +44 (0) 7767 597947
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-xl bg-purple-500/20 text-purple-400 shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <h5 className="font-semibold text-white">Email Address</h5>
                      <a href="mailto:mail@fasttracksurveys.co.uk" className="text-slate-300 text-xs hover:text-white font-mono">
                        mail@fasttracksurveys.co.uk
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs font-mono text-slate-400">
                <span className="text-brand-400 font-bold block mb-1">COMPANY REGISTRATION</span>
                Fast Track Surveys Ltd • Company Number: 13702594
              </div>
            </div>

            {/* Right Interactive Form (From Original Website) */}
            <div className="lg:col-span-7 rounded-3xl glass-panel p-8 border border-slate-800 shadow-2xl">
              {isSubmitted ? (
                <div className="py-16 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-2xl font-bold font-display text-white">
                    Message Sent Successfully!
                  </h4>
                  <p className="text-sm text-slate-400 max-w-md mx-auto">
                    Thank you, <strong>{formData.name || 'Valued Client'}</strong>. Your survey inquiry has been routed to our London technical team. We will get back to you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-1.5">
                        Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Your full name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-slate-900/90 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-1.5">
                        Company *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Company / Authority"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full bg-slate-900/90 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-1.5">
                        City / Town *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. London, Manchester, Leeds"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full bg-slate-900/90 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-1.5">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        placeholder="Contact phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-slate-900/90 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="Official email for proposal delivery"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-slate-900/90 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-1.5">
                      Survey Brief / Messages *
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Specify survey type (Pedestrian, Parking, RSI, Transit, Household, Cycle, Market), location coordinates, and preferred timeline..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-slate-900/90 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 font-mono"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-4 rounded-xl bg-gradient-to-r from-brand-600 via-sky-500 to-cyan-500 hover:from-brand-500 hover:to-cyan-400 text-white font-mono font-bold text-xs tracking-wider uppercase shadow-[0_0_25px_rgba(12,143,233,0.5)] transition-all flex items-center justify-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      <span>SUBMIT INQUIRY TO FAST TRACK SURVEYS</span>
                    </button>
                  </div>
                </form>
              )}
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
