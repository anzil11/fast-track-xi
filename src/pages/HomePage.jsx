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
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono uppercase tracking-widest mb-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>Survey Services</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-white tracking-tight">
                Our Survey Services
              </h2>
              <p className="text-slate-300 text-sm sm:text-base mt-2 max-w-xl">
                Explore what we can record, how each survey is delivered and the results you can receive.
              </p>
              <div className="mt-3">
                <a
                  href="/services"
                  onClick={(e) => {
                    e.preventDefault();
                    navigateTo('services');
                  }}
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 hover:text-cyan-300 underline underline-offset-4 transition-colors"
                >
                  <span>Explore our services and watch illustrated survey examples.</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => navigateTo('services')}
                className="text-xs font-mono font-bold text-brand-400 hover:text-brand-300 flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 border border-slate-700"
              >
                <span>VIEW ALL SERVICES</span>
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
      {/* 3. SURVEY METHODS & DATA CHECKS (AUDIT SECTION 5) */}
      {/* ========================================================================= */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-white">
              Survey Methods & Data Checks
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              We agree the recording method, survey coverage and checks around the information your project needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl glass-panel border border-slate-800 flex flex-col justify-between space-y-3">
              <div>
                <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center mb-4 border border-sky-500/30">
                  <Car className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold font-display text-white mb-2">
                  Traffic & Movement Counts
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Vehicle, pedestrian and cycle movements recorded at agreed locations, with classifications and time intervals set out in the survey brief.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-2xl glass-panel border border-slate-800 flex flex-col justify-between space-y-3">
              <div>
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-4 border border-amber-500/30">
                  <Compass className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold font-display text-white mb-2">
                  Parking Beat Surveys
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Repeated observations of parking activity, supported by a record of capacity and visible restrictions. Survey dates, times and beat frequency are agreed for the project.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-2xl glass-panel border border-slate-800 flex flex-col justify-between space-y-3">
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4 border border-emerald-500/30">
                  <Users className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold font-display text-white mb-2">
                  Face-to-Face Interviews
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Responses collected using an agreed questionnaire and recording system, with checks for completeness and consistency.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-2xl glass-panel border border-slate-800 flex flex-col justify-between space-y-3">
              <div>
                <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center mb-4 border border-purple-500/30">
                  <FileSpreadsheet className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold font-display text-white mb-2">
                  Data Review & Reporting
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Survey records reviewed for missing information, inconsistencies and unusual conditions before the agreed datasets and summaries are prepared.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={() => {
                if (openQuoteModal) openQuoteModal(null);
                else setIsQuoteModalOpen(true);
              }}
              className="px-8 py-4 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-mono font-bold text-xs tracking-wider transition-all shadow-lg inline-flex items-center gap-2 hover:-translate-y-0.5"
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
      <section id="coverage" className="py-20 relative bg-slate-950/40 border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="rounded-3xl glass-panel p-8 sm:p-12 border border-slate-800 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-10">

            <div className="max-w-xl space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
                <MapPin className="w-4 h-4 text-cyan-400" />
                <span>SURVEY LOCATIONS</span>
              </div>
              <h3 className="text-2xl sm:text-4xl font-bold font-display text-white">
                Discuss Your Survey Location
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Tell us where your survey is needed and your preferred dates. We will confirm staffing availability, access requirements and the programme for your project.
              </p>
              <p className="text-slate-300 text-sm leading-relaxed">
                For work across multiple locations, we can discuss coordinated fieldwork and a consistent reporting format.
              </p>

              <div className="pt-2">
                <button
                  onClick={() => {
                    if (openQuoteModal) openQuoteModal(null);
                    else setIsQuoteModalOpen(true);
                  }}
                  className="px-6 py-3.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-mono font-bold text-xs transition-colors shadow-md inline-flex items-center gap-2 hover:-translate-y-0.5"
                >
                  <span>Check Availability for Your Project</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Coverage Areas considered on request card */}
            <div className="w-full lg:w-96 bg-slate-950/90 rounded-2xl p-6 border border-slate-700/80 space-y-4 font-mono text-xs">
              <div className="border-b border-slate-800 pb-3">
                <span className="text-slate-400 block text-[11px]">COVERAGE STATUS</span>
                <span className="text-cyan-400 font-bold text-sm">Survey locations considered on request</span>
              </div>
              <p className="text-slate-300 text-xs font-sans leading-relaxed">
                We coordinate fieldwork across Greater London, the South East, Midlands, North, South West, Wales and Scotland based on client project briefs.
              </p>
              <div className="space-y-2 pt-2 border-t border-slate-800 text-[11px] text-slate-400">
                <div>• Single-junction or multiday cordon counts</div>
                <div>• Coordinated regional surveys</div>
                <div>• Tailored fieldwork programmes</div>
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
                      className="w-full py-4 rounded-xl bg-gradient-to-r from-brand-600 via-sky-500 to-cyan-500 hover:from-brand-500 hover:to-cyan-400 text-white font-mono font-bold text-xs tracking-wider uppercase shadow-[0_0_25px_rgba(12,143,233,0.5)] transition-all flex items-center justify-center gap-2 hover:-translate-y-0.5"
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
