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
  Compass,
  Car,
  Users
} from 'lucide-react';
import { useNavigation } from '../context/NavigationContext';
import { servicesData } from '../data/servicesData';
import { companyInfo } from '../data/companyData';
import ServiceCard from '../components/ServiceCard';
import ServiceIcon from '../components/ServiceIcon';
import HeroIntro from '../components/HeroIntro';

export default function HomePage() {
  const { navigateTo, triggerServiceTransition, setIsQuoteModalOpen, openQuoteModal } = useNavigation();

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

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', company: '', city: '', phone: '', email: '', message: '' });
    }, 4500);
  };

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
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-mono uppercase tracking-widest mb-3 backdrop-blur-md">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                <Sparkles className="w-3.5 h-3.5" />
                <span>Survey Disciplines</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight">
                <span className="text-gradient-silver">Our Survey</span>{' '}
                <span className="text-[#2ea3d9]">Services</span>
              </h2>
              <p className="text-slate-300 text-sm sm:text-base mt-2 max-w-xl leading-relaxed">
                Explore what we record, how each survey is delivered, and the high-fidelity results you can receive.
              </p>
              <div className="mt-4">
                <a
                  href="/services"
                  data-cursor-text="EXPLORE"
                  onClick={(e) => {
                    e.preventDefault();
                    navigateTo('services');
                  }}
                  className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-cyan-400 hover:text-cyan-300 transition-colors group"
                >
                  <span className="underline underline-offset-4">Explore all survey services & watch illustrated simulations</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => navigateTo('services')}
                data-cursor-text="SERVICES"
                className="text-xs font-mono font-bold text-cyan-300 hover:text-white flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900/90 border border-[#26335d] hover:border-cyan-500/50 transition-all shadow-md hover:-translate-y-0.5"
              >
                <span>VIEW ALL SERVICES</span>
                <ChevronRight className="w-4 h-4 text-cyan-400" />
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
      {/* 3. SURVEY METHODS & DATA CHECKS (AUDIT SECTION 5) */}
      {/* ========================================================================= */}
      <section className="py-24 relative telemetry-border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-sky-500/30 bg-sky-500/10 text-sky-400 text-xs font-mono uppercase tracking-widest backdrop-blur-md">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Rigorous Data Audit</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight">
              <span className="text-gradient-silver">Survey Methods &</span>{' '}
              <span className="text-[#2ea3d9]">Data Checks</span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
              We agree the recording method, survey coverage, and quality checks around the exact specifications your project demands.
            </p>
          </div>

          {/* Survey Methods Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-7 rounded-3xl glass-panel luxury-card-hover border border-slate-800 flex flex-col justify-between space-y-4 group relative overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-sky-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div>
                <div className="w-13 h-13 rounded-2xl bg-sky-500/15 text-sky-400 flex items-center justify-center mb-5 border border-sky-500/30 shadow-md group-hover:scale-105 transition-transform">
                  <Car className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold font-display text-white group-hover:text-sky-300 transition-colors mb-2.5">
                  Traffic & Movement Counts
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Vehicle, pedestrian and cycle movements recorded at agreed locations, with classifications and time intervals set out in the survey brief.
                </p>
              </div>
              <div className="pt-2 text-[11px] font-mono text-sky-400/80 font-semibold">
                Interval: 15-min & hourly bins
              </div>
            </div>

            <div className="p-7 rounded-3xl glass-panel luxury-card-hover border border-slate-800 flex flex-col justify-between space-y-4 group relative overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div>
                <div className="w-13 h-13 rounded-2xl bg-amber-500/15 text-amber-400 flex items-center justify-center mb-5 border border-amber-500/30 shadow-md group-hover:scale-105 transition-transform">
                  <Compass className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold font-display text-white group-hover:text-amber-300 transition-colors mb-2.5">
                  Parking Beat Surveys
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Repeated observations of parking activity, supported by a record of capacity and visible restrictions. Survey dates, times and beat frequency are agreed for the project.
                </p>
              </div>
              <div className="pt-2 text-[11px] font-mono text-amber-400/80 font-semibold">
                Frequency: 30-60 min patrol beats
              </div>
            </div>

            <div className="p-7 rounded-3xl glass-panel luxury-card-hover border border-slate-800 flex flex-col justify-between space-y-4 group relative overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div>
                <div className="w-13 h-13 rounded-2xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center mb-5 border border-emerald-500/30 shadow-md group-hover:scale-105 transition-transform">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold font-display text-white group-hover:text-emerald-300 transition-colors mb-2.5">
                  Face-to-Face Interviews
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Responses collected using an agreed questionnaire and recording system, with checks for completeness and consistency.
                </p>
              </div>
              <div className="pt-2 text-[11px] font-mono text-emerald-400/80 font-semibold">
                Verification: 100% digital validation
              </div>
            </div>

            <div className="p-7 rounded-3xl glass-panel luxury-card-hover border border-slate-800 flex flex-col justify-between space-y-4 group relative overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-purple-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div>
                <div className="w-13 h-13 rounded-2xl bg-purple-500/15 text-purple-400 flex items-center justify-center mb-5 border border-purple-500/30 shadow-md group-hover:scale-105 transition-transform">
                  <FileSpreadsheet className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold font-display text-white group-hover:text-purple-300 transition-colors mb-2.5">
                  Data Review & Reporting
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Survey records reviewed for missing information, inconsistencies and unusual conditions before the agreed datasets and summaries are prepared.
                </p>
              </div>
              <div className="pt-2 text-[11px] font-mono text-purple-400/80 font-semibold">
                Formats: Excel, PDF & CAD diagrams
              </div>
            </div>
          </div>

          <div className="mt-14 text-center">
            <button
              onClick={() => {
                if (openQuoteModal) openQuoteModal(null);
                else setIsQuoteModalOpen(true);
              }}
              data-cursor-text="DISCUSS"
              className="px-9 py-4 rounded-2xl bg-gradient-to-r from-[#016a97] via-[#0284c7] to-[#2ea3d9] text-white font-mono font-bold text-xs tracking-wider uppercase transition-all shadow-xl hover:shadow-[0_0_30px_rgba(46,163,217,0.55)] inline-flex items-center gap-2 hover:-translate-y-0.5 shimmer-btn"
            >
              <span>Discuss Your Survey Requirements</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </section>


      {/* ========================================================================= */}
      {/* 4. DISCUSS YOUR SURVEY LOCATION (AUDIT SECTION 8) */}
      {/* ========================================================================= */}
      <section id="coverage" className="py-24 relative bg-slate-950/40 border-t border-slate-800/80 telemetry-border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="rounded-3xl luxury-glass p-8 sm:p-14 border border-slate-800/90 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#2ea3d9]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-xl space-y-5 relative z-10">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-mono uppercase tracking-widest backdrop-blur-md">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                <MapPin className="w-3.5 h-3.5" />
                <span>UK Fieldwork Logistics</span>
              </div>
              <h3 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight leading-tight">
                <span className="text-gradient-silver">Discuss Your</span>{' '}
                <span className="text-[#2ea3d9]">Survey Location</span>
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Tell us where your survey is needed and your preferred timeline. We confirm surveyor availability, equipment mobilization, and project milestones across the United Kingdom.
              </p>
              <p className="text-slate-300 text-sm leading-relaxed">
                For work spanning multiple junctions, roundabouts or multiday cordons, our operations team coordinates simultaneous fieldwork with harmonized datasets.
              </p>

              <div className="pt-3">
                <button
                  onClick={() => {
                    if (openQuoteModal) openQuoteModal(null);
                    else setIsQuoteModalOpen(true);
                  }}
                  data-cursor-text="SCHEDULE"
                  className="px-8 py-4 rounded-2xl bg-gradient-to-r from-[#016a97] via-[#0284c7] to-[#2ea3d9] text-white font-mono font-bold text-xs uppercase tracking-wider transition-all shadow-xl hover:shadow-[0_0_28px_rgba(46,163,217,0.55)] inline-flex items-center gap-2.5 hover:-translate-y-0.5 shimmer-btn"
                >
                  <span>Check Availability for Your Project</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Coverage Areas command card */}
            <div className="w-full lg:w-[440px] rounded-3xl p-7 border border-slate-700/80 shadow-2xl relative bg-[#091127]/95 backdrop-blur-xl space-y-4 font-mono text-xs z-10">
              <div className="border-b border-slate-800/90 pb-4 flex items-center justify-between">
                <div>
                  <span className="text-slate-400 block text-[11px] uppercase tracking-wider">UK WIDE MOBILISATION</span>
                  <span className="text-cyan-400 font-bold text-sm tracking-tight">Active Survey Deployment Hubs</span>
                </div>
                <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px]">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>ONLINE</span>
                </div>
              </div>

              <p className="text-slate-300 text-xs font-sans leading-relaxed">
                We coordinate survey teams across Greater London, the South East, Midlands, North, South West, Wales, and Scotland based on client specifications.
              </p>

              {/* Regional Quick Pills */}
              <div className="grid grid-cols-2 gap-2.5 text-[11px] pt-1">
                <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center gap-2 text-slate-200">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_6px_#2ea3d9]" />
                  <span className="font-semibold">London & South East</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center gap-2 text-slate-200">
                  <span className="w-2 h-2 rounded-full bg-sky-400 shadow-[0_0_6px_#38bdf8]" />
                  <span className="font-semibold">Midlands & Central</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center gap-2 text-slate-200">
                  <span className="w-2 h-2 rounded-full bg-indigo-400 shadow-[0_0_6px_#818cf8]" />
                  <span className="font-semibold">North & Scotland</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center gap-2 text-slate-200">
                  <span className="w-2 h-2 rounded-full bg-purple-400 shadow-[0_0_6px_#c084fc]" />
                  <span className="font-semibold">South West & Wales</span>
                </div>
              </div>

              <div className="space-y-1.5 pt-3 border-t border-slate-800/80 text-[11px] text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="text-cyan-400 font-bold">✓</span>
                  <span>Single-junction & multiday cordon tracking</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-cyan-400 font-bold">✓</span>
                  <span>Coordinated regional highway counts</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-cyan-400 font-bold">✓</span>
                  <span>Direct client data deliverables in agreed formats</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>


      {/* ========================================================================= */}
      {/* 5. CONTACT US & DIRECT INQUIRY SECTION (ENHANCED FROM ORIGINAL) */}
      {/* ========================================================================= */}
      <section id="contact" className="py-24 relative telemetry-border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-widest backdrop-blur-md">
              <Mail className="w-3.5 h-3.5" />
              <span>DIRECT SURVEY CONSULTATION</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight">
              <span className="text-gradient-silver">Contact</span>{' '}
              <span className="text-[#2ea3d9]">Fast Track Surveys</span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-base mt-2 max-w-xl mx-auto leading-relaxed">
              Have a question regarding methodologies, equipment, or timelines? Send us your brief for a direct technical review and quotation.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

            {/* Left Contact Information Card */}
            <div className="lg:col-span-5 rounded-3xl glass-panel p-8 border border-slate-800 flex flex-col justify-between space-y-8">
              <div>
                <h3 className="text-2xl font-bold font-display text-white mb-2">
                  Survey Enquiries
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Contact our survey coordination team to discuss your location, preferred dates and reporting requirements. We will confirm availability and the next steps for your project.
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
                      <a href="tel:+447767597947" className="text-slate-300 text-xs hover:text-white font-mono">
                        +44 (0)7767 597947
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
                      placeholder="Tell us the survey type, location, preferred dates and results you need."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-slate-900/90 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 font-mono"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      data-cursor-text="SUBMIT"
                      className="w-full py-4 rounded-xl bg-gradient-to-r from-[#016a97] via-[#0284c7] to-[#2ea3d9] hover:from-[#01557a] hover:to-[#2ea3d9] text-white font-mono font-bold text-xs tracking-wider uppercase shadow-[0_0_25px_rgba(46,163,217,0.45)] transition-all flex items-center justify-center gap-2 hover:-translate-y-0.5 shimmer-btn"
                    >
                      <Send className="w-4 h-4" />
                      <span>Send Enquiry</span>
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
