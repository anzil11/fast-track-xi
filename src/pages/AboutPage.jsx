import React, { useState } from 'react';
import {
  Building2,
  ShieldCheck,
  CheckCircle2,
  MapPin,
  ArrowRight,
  FileText,
  Users,
  FileSpreadsheet,
  Phone,
  Mail,
  Send
} from 'lucide-react';
import { useNavigation } from '../context/NavigationContext';
import { companyInfo } from '../data/companyData';

export default function AboutPage() {
  const { navigateTo, openQuoteModal } = useNavigation();
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

  const approachSteps = [
    {
      step: '01',
      title: 'A Clear Survey Brief',
      desc: 'Locations, timings, recording categories and deliverables agreed before fieldwork.',
      icon: FileText,
      accent: '#0284c7'
    },
    {
      step: '02',
      title: 'Prepared Field Teams',
      desc: 'Surveyors briefed on the task, recording method and site arrangements.',
      icon: Users,
      accent: '#38bdf8'
    },
    {
      step: '03',
      title: 'Checks Throughout Delivery',
      desc: 'Fieldwork monitoring and data review, with issues recorded and communicated.',
      icon: ShieldCheck,
      accent: '#10b981'
    },
    {
      step: '04',
      title: 'Useful Results',
      desc: 'Structured datasets, clear summaries and supporting notes.',
      icon: FileSpreadsheet,
      accent: '#a855f7'
    }
  ];

  const whoWeSupport = [
    'Transport consultants & traffic engineering teams',
    'Town planners & highways authorities',
    'Commercial & residential developers',
    'Public transport operators & local authorities',
    'Research organisations & public sector bodies'
  ];

  return (
    <div className="relative min-h-screen text-slate-100 pt-8 pb-24 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header Hero */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-400 text-xs font-mono">
            <Building2 className="w-3.5 h-3.5" />
            <span>TRAFFIC & TRANSPORT SURVEYS</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold font-display text-white tracking-tight">
            About Fast Track Surveys
          </h1>
          <p className="text-xl sm:text-2xl font-light text-cyan-300 leading-relaxed font-display">
            Practical experience. Carefully organised fieldwork. Clear results.
          </p>
        </div>

        {/* Core Narrative / Company Story */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-24">

          {/* Left Narrative */}
          <div className="lg:col-span-7 space-y-6 text-slate-300 leading-relaxed text-base sm:text-lg">
            <div className="rounded-3xl glass-panel p-8 sm:p-10 border border-slate-800 space-y-6">
              <p className="text-white text-lg sm:text-xl font-medium leading-relaxed">
                Fast Track Surveys provides traffic, transport and research fieldwork for projects that need reliable information about how people travel and use places.
              </p>

              <p className="text-slate-300">
                Our approach starts with understanding the brief. We agree what needs to be recorded, organise the survey team and review the resulting data before delivery.
              </p>

              <p className="text-slate-300">
                We support transport consultants, planners, developers, operators and research organisations with survey information that fits their project requirements.
              </p>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => openQuoteModal(null)}
                  className="px-6 py-3.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-mono font-bold text-xs shadow-lg transition-all flex items-center gap-2 hover:-translate-y-0.5"
                >
                  <span>Request a Quote</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => navigateTo('services')}
                  className="px-6 py-3.5 rounded-xl glass-panel hover:bg-slate-800 text-slate-300 hover:text-white font-mono text-xs border border-slate-700 transition-colors"
                >
                  Explore Our Survey Services →
                </button>
              </div>
            </div>
          </div>

          {/* Right: Who We Support & Company Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-3xl glass-panel p-8 border border-slate-800 space-y-6">
              <div>
                <span className="text-xs font-mono text-cyan-400 font-semibold uppercase tracking-wider block mb-1">
                  SECTOR EXPERIENCE
                </span>
                <h3 className="text-xl font-bold font-display text-white">
                  Who We Support
                </h3>
              </div>

              <ul className="space-y-3">
                {whoWeSupport.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-6 border-t border-slate-800/80 space-y-3 text-xs font-mono text-slate-400">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-300 block font-sans font-medium">London Registered Office</span>
                    <span>86-90 Paul Street, London, EC2A 4NE</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <Building2 className="w-4 h-4 text-slate-500 shrink-0" />
                  <span>Company Registration: #13702594</span>
                </div>

                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-slate-500 shrink-0" />
                  <a href={`tel:${companyInfo.phone}`} className="hover:text-cyan-300 transition-colors">
                    {companyInfo.phoneDisplay}
                  </a>
                </div>

                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-slate-500 shrink-0" />
                  <a href={`mailto:${companyInfo.email}`} className="hover:text-cyan-300 transition-colors">
                    {companyInfo.email}
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>


        {/* ========================================================================= */}
        {/* Our Approach Section */}
        {/* ========================================================================= */}
        <div className="my-24">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30">
              FIELDWORK METHODOLOGY
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-white pt-2">
              Our Approach
            </h2>
            <p className="text-slate-400 text-sm">
              Carefully organised from initial consultation to final data delivery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {approachSteps.map((item) => {
              const IconComp = item.icon;
              return (
                <div
                  key={item.step}
                  className="p-6 sm:p-7 rounded-2xl glass-panel border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between space-y-6 group"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center border"
                        style={{
                          backgroundColor: `${item.accent}15`,
                          borderColor: `${item.accent}35`,
                          color: item.accent
                        }}
                      >
                        <IconComp className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-mono font-bold text-slate-500">
                        {item.step}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold font-display text-white group-hover:text-cyan-300 transition-colors">
                      {item.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>


        {/* ========================================================================= */}
        {/* Contact / Enquiry Module */}
        {/* ========================================================================= */}
        <div className="my-20 rounded-3xl glass-panel p-8 sm:p-12 border border-brand-500/30 shadow-[0_0_50px_rgba(12,143,233,0.12)] relative overflow-hidden">
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-8">
            <span className="px-3 py-1 rounded-full bg-brand-500/20 text-brand-300 text-xs font-mono border border-brand-500/30">
              SURVEY ENQUIRY
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-white">
              Surveys to Meet Your Exact Requirements
            </h2>
            <p className="text-slate-300 text-sm max-w-xl mx-auto leading-relaxed">
              Tell us about your upcoming survey, location and required outputs. We will review your brief and discuss the next steps.
            </p>
          </div>

          {requirementSubmitted ? (
            <div className="py-8 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Enquiry Received</h3>
              <p className="text-xs text-slate-300">Our survey team will review your requirements and respond shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSurveysRequirementSubmit} className="max-w-2xl mx-auto space-y-3">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  required
                  value={surveyRequirementEmail}
                  onChange={(e) => setSurveyRequirementEmail(e.target.value)}
                  placeholder="Your email address"
                  className="flex-1 bg-slate-900/90 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 font-mono"
                />
                <input
                  type="text"
                  required
                  value={surveyRequirementText}
                  onChange={(e) => setSurveyRequirementText(e.target.value)}
                  placeholder="Tell us the survey type, location, preferred dates and results you need."
                  className="flex-1 bg-slate-900/90 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 font-mono"
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-mono font-bold text-xs shadow-lg transition-all shrink-0 flex items-center justify-center gap-1.5 hover:-translate-y-0.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Enquiry</span>
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
