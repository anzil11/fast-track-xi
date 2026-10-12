import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Building2,
  ShieldCheck,
  Zap,
  Users2,
  CheckCircle2,
  MapPin,
  Cpu,
  ArrowRight,
  Sparkles,
  Award,
  Clock,
  Compass,
  Send
} from 'lucide-react';
import { useNavigation } from '../context/NavigationContext';
import { companyInfo } from '../data/companyData';

export default function AboutPage() {
  const { navigateTo, setIsQuoteModalOpen } = useNavigation();
  const [surveyRequirementEmail, setSurveyRequirementEmail] = useState('');
  const [surveyRequirementText, setSurveyRequirementText] = useState('');
  const [requirementSubmitted, setRequirementSubmitted] = useState(false);

  const handleSurveysRequirementSubmit = (e) => {
    e.preventDefault();
    if (surveyRequirementEmail && surveyRequirementText) {
      setRequirementSubmitted(true);
      setTimeout(() => {
        setRequirementSubmitted(false);
        setSurveyRequirementEmail('');
        setSurveyRequirementText('');
      }, 4000);
    }
  };

  const milestones = [
    {
      year: 'Founding',
      title: 'Established in Central London',
      desc: 'Founded with a clear vision: to revolutionize transport and traffic data collection with modern digital telemetry and absolute transparency.'
    },
    {
      year: 'Expansion',
      title: 'UK-Wide Surveyor Fleet',
      desc: 'Scaled operations across Greater London, the Midlands, and the North with accredited Chapter 8 safety field teams.'
    },
    {
      year: 'Innovation',
      title: 'AI Video Telemetry & CAPI Systems',
      desc: 'Pioneered encrypted tablet CAPI interviewing, Lambeth parking stress automation, and high-definition video neural counting.'
    },
    {
      year: 'Present',
      title: 'Trusted by Planners & Developers',
      desc: 'Delivering over 1,450+ verified survey packs for major highway schemes, residential masterplans, and public realm transformations.'
    }
  ];

  return (
    <div className="relative min-h-screen text-slate-100 pt-8 pb-24 overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header Hero */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-400 text-xs font-mono">
            <Building2 className="w-3.5 h-3.5" />
            <span>ABOUT FAST TRACK SURVEYS LTD</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold font-display text-white tracking-tight">
            Data That Makes Sense.
          </h1>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-light">
            Fast Track Surveys is a London-based technology-forward surveying firm dedicated to providing accurate, productive, and transparent data across the UK.
          </p>
        </div>

        {/* Core Narrative / Company Story (Exact content from original site enhanced) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">

          <div className="lg:col-span-7 space-y-6 text-slate-300 leading-relaxed text-sm sm:text-base">
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-white">
              Surveying & Data Collection by Agile Professionals
            </h2>

            <p>
              Surveying and data collecting is a specialized skill that demands professionals who can think on their feet. Fast Track Surveys has on board experienced professionals who know their job intimately and are trained to collect data in the most accurate and transparent form.
            </p>

            <p>
              Our professionals have a keen eye for uncovering granular details in tandem with client requirements. You can trust our field teams to capture every parameter necessary for your transport modeling, engineering simulations, and planning submissions.
            </p>

            <p>
              Our commitment to excellence fuels us to look beyond basic briefs and deliver bespoke services. Our quality data empowers civil engineers and planning consultancies to design and model structures with absolute confidence and knowledge.
            </p>

            <p>
              From pedestrian counts and roadside interview surveys to parking stress, public transport, and household travel diaries, Fast Track Surveys caters to a broad spectrum of clients, including local authorities, engineering corporations, and public institutions.
            </p>

            <div className="pt-2 flex items-center gap-4">
              <button
                onClick={() => setIsQuoteModalOpen(true)}
                className="px-6 py-3.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-mono font-bold text-xs shadow-lg transition-all flex items-center gap-2"
              >
                <span>CONSULT WITH OUR TEAM</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Visual & Key Stats Box */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-3xl glass-panel p-8 border border-slate-700 shadow-2xl relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
                <span className="text-xs font-mono text-cyan-400 font-semibold">
                  FAST TRACK STANDARDS
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-400">
                  MRS CODE AUDITED
                </span>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-white">100% Quality Assurance</h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Double-blind spot verification audits on all video and on-street counts.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-3">
                  <Cpu className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-white">Digital-First Approach</h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Modern optical arrays, GPS time-stamping, and automated reporting pipelines.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-white">London Registered HQ</h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      86-90 Paul Street, London, EC2A 4NE • Company #13702594
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>


        {/* ========================================================================= */}
        {/* Growth & Capability Timeline */}
        {/* ========================================================================= */}
        <div className="my-24">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
              PROVEN TRACK RECORD
            </span>
            <h3 className="text-3xl font-bold font-display text-white mt-1">
              Our Journey of Continuous Excellence
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {milestones.map((item, idx) => (
              <div
                key={item.year}
                className="p-6 rounded-2xl glass-panel border border-slate-800 flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="text-xs font-mono font-bold text-brand-400 mb-2">
                    {item.year.toUpperCase()}
                  </div>
                  <h4 className="text-lg font-bold font-display text-white">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
                <div className="text-[10px] font-mono text-slate-600">
                  PHASE 0{idx + 1}
                </div>
              </div>
            ))}
          </div>
        </div>


        {/* ========================================================================= */}
        {/* Interactive "Surveys to Meet Your Requirements" Module (From Original Site) */}
        {/* ========================================================================= */}
        <div className="my-20 rounded-3xl glass-panel p-8 sm:p-12 border border-brand-500/40 shadow-[0_0_50px_rgba(12,143,233,0.15)] relative overflow-hidden">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-8">
            <span className="px-3 py-1 rounded-full bg-brand-500/20 text-brand-300 text-xs font-mono border border-brand-500/30">
              TAILORED DATA SPECIFICATION
            </span>
            <h3 className="text-2xl sm:text-4xl font-bold font-display text-white">
              Surveys to Meet Your Exact Requirements
            </h3>
            <p className="text-slate-400 text-sm">
              Have a bespoke survey challenge or special zoning requirements? Share your brief directly with our survey directors.
            </p>
          </div>

          {requirementSubmitted ? (
            <div className="py-8 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-white">Requirement Submitted!</h4>
              <p className="text-xs text-slate-400">Our senior survey planner will contact you directly within 2 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSurveysRequirementSubmit} className="max-w-2xl mx-auto space-y-3">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  required
                  value={surveyRequirementEmail}
                  onChange={(e) => setSurveyRequirementEmail(e.target.value)}
                  placeholder="Type your official email address"
                  className="flex-1 bg-slate-900/90 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 font-mono"
                />
                <input
                  type="text"
                  required
                  value={surveyRequirementText}
                  onChange={(e) => setSurveyRequirementText(e.target.value)}
                  placeholder="Describe your survey needs here..."
                  className="flex-1 bg-slate-900/90 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 font-mono"
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-mono font-bold text-xs shadow-lg transition-all shrink-0 flex items-center justify-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>SUBMIT</span>
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
