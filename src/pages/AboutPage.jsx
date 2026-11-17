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
  Send,
  Cpu,
  Layers,
  Compass,
  Sparkles
} from 'lucide-react';
import { useNavigation } from '../context/NavigationContext';
import { useTheme } from '../context/ThemeContext';
import { companyInfo } from '../data/companyData';

export default function AboutPage() {
  const { navigateTo, openQuoteModal } = useNavigation();
  const { isWhite } = useTheme();

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

  const operationalStandards = [
    {
      title: 'Site Briefings & Safety Compliance',
      description:
        'Every deployment is governed by project-specific risk assessments, Chapter 8 highway awareness, and strict adherence to local authority and rail platform safety protocols.',
      icon: ShieldCheck,
      accentColor: '#0284c7'
    },
    {
      title: 'Hands-On Field Supervision',
      description:
        'Projects are overseen by dedicated coordinators managing team rosters, ensuring enumerator positioning, verifying vantage points, and mitigating on-site anomalies in real time.',
      icon: Users,
      accentColor: '#016a97'
    },
    {
      title: 'Transparent Quality Assurance',
      description:
        'Data integrity checks are applied at every stage—from equipment calibration and battery monitoring to raw data verification before delivery.',
      icon: CheckCircle2,
      accentColor: '#10b981'
    }
  ];

  const technicalCapabilities = [
    {
      title: 'Hardware & Sensor Precision',
      description:
        'Deploys certified roadside technology, including MetroCount® roadside units (RSU) for continuous axle-level monitoring, high-definition video masts for junction analysis, and digital field logging tools.',
      icon: Cpu,
      tag: 'SENSOR PRECISION'
    },
    {
      title: 'DfT & Industry Compliance',
      description:
        'Data logging aligns with UK classification benchmarks, including Scheme F, COBA standards, and client-specified speed/headway metrics.',
      icon: Layers,
      tag: 'UK BENCHMARKS'
    },
    {
      title: 'Simulation-Ready Deliverables',
      description:
        'Clean, QA-checked data delivered in structured .xlsx, .csv, and MTE formats configured for direct import into modeling software such as LinSig, ARCADY, PICADY, TRICS, and VISSIM.',
      icon: FileSpreadsheet,
      tag: 'DIRECT MODEL IMPORT'
    },
    {
      title: 'Agile UK Deployment',
      description:
        'Scaled to coordinate multi-site regional survey networks simultaneously or mobilize rapid single-site counts on short notice.',
      icon: Compass,
      tag: 'NATIONWIDE RAPID MOBILISATION'
    }
  ];

  return (
    <div className={`relative min-h-screen pt-8 pb-24 overflow-hidden transition-colors ${
      isWhite ? 'bg-white text-slate-800' : 'text-slate-100'
    }`}>
      {/* Ambient background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ========================================================================= */}
        {/* 1. HERO / INTRODUCTION */}
        {/* ========================================================================= */}
        <div className="max-w-4xl mx-auto mb-16 space-y-6 text-center">
          <div
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border text-xs font-mono uppercase tracking-widest backdrop-blur-md shadow-sm"
            style={{
              backgroundColor: isWhite ? '#e0f2fe' : 'rgba(6, 182, 212, 0.1)',
              borderColor: isWhite ? '#bae6fd' : 'rgba(6, 182, 212, 0.3)',
              color: isWhite ? '#0369a1' : '#22d3ee'
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-ping" style={{ backgroundColor: isWhite ? '#0284c7' : '#22d3ee' }} />
            <Building2 className="w-3.5 h-3.5" />
            <span>OPERATIONAL INTEGRITY & FIELDWORK EXCELLENCE</span>
          </div>

          <h1 className={`text-4xl sm:text-6xl lg:text-7xl font-extrabold font-display tracking-tight leading-tight ${
            isWhite ? 'text-slate-900' : 'text-white'
          }`}>
            <span className={isWhite ? 'text-slate-900' : 'text-gradient-silver'}>About</span>{' '}
            <span className={isWhite ? 'text-[#016a97]' : 'text-[#2ea3d9]'}>Fast Track Surveys</span>
          </h1>

          <p className={`text-lg sm:text-2xl font-medium leading-relaxed font-display max-w-3xl mx-auto ${
            isWhite ? 'text-slate-700' : 'text-cyan-200'
          }`}>
            Fast Track Surveys is an independent transport and traffic data collection consultancy based in London, serving highway authorities, transport planners, civil engineering firms, and infrastructure developers across the United Kingdom.
          </p>
        </div>

        {/* Narrative & Company Overview Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-20">
          <div className="lg:col-span-8">
            <div className={`rounded-3xl p-8 sm:p-12 border relative overflow-hidden shadow-xl ${
              isWhite ? 'bg-white border-slate-200 text-slate-800' : 'luxury-glass border-slate-800/90 text-slate-200'
            }`}>
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#2ea3d9] to-transparent" />

              <p className={`text-lg sm:text-xl font-normal leading-relaxed mb-6 ${
                isWhite ? 'text-slate-700' : 'text-slate-200'
              }`}>
                Accurate traffic data forms the critical baseline for transport assessments, micro-simulation models, and infrastructure design. We bridge hands-on operational site management with modern digital and hardware capture technologies to deliver objective, validated datasets that industry professionals can rely on.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => openQuoteModal(null)}
                  className="px-7 py-4 rounded-2xl bg-gradient-to-r from-[#016a97] via-[#0284c7] to-[#2ea3d9] text-white font-mono font-bold text-xs uppercase tracking-wider shadow-xl hover:shadow-[0_0_25px_rgba(46,163,217,0.55)] transition-all flex items-center gap-2 hover:-translate-y-0.5 shimmer-btn"
                >
                  <span>Request a Consultation</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => navigateTo('services')}
                  className={`px-7 py-4 rounded-2xl font-mono text-xs uppercase tracking-wider border transition-all shadow-md hover:-translate-y-0.5 ${
                    isWhite
                      ? 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-300'
                      : 'luxury-glass hover:bg-slate-800 text-slate-200 hover:text-white border-slate-700'
                  }`}
                >
                  Explore Our Services →
                </button>
              </div>
            </div>
          </div>

          {/* Quick London Office / Company Registration Panel */}
          <div className="lg:col-span-4">
            <div className={`rounded-3xl p-8 border space-y-5 shadow-xl relative overflow-hidden ${
              isWhite ? 'bg-white border-slate-200 text-slate-800' : 'luxury-glass border-slate-800/90 text-slate-200'
            }`}>
              <div>
                <span className={`text-xs font-mono font-bold uppercase tracking-widest block mb-1.5 ${
                  isWhite ? 'text-sky-700' : 'text-cyan-400'
                }`}>
                  HEADQUARTERS
                </span>
                <h3 className={`text-xl font-bold font-display ${isWhite ? 'text-slate-900' : 'text-white'}`}>
                  London Consultancy
                </h3>
              </div>

              <div className={`space-y-3.5 text-xs font-mono border-t pt-5 ${
                isWhite ? 'border-slate-200 text-slate-600' : 'border-slate-800/80 text-slate-400'
              }`}>
                <div className="flex items-start gap-2.5">
                  <MapPin className={`w-4 h-4 shrink-0 mt-0.5 ${isWhite ? 'text-sky-600' : 'text-cyan-400'}`} />
                  <div>
                    <span className={`block font-sans font-semibold ${isWhite ? 'text-slate-800' : 'text-slate-300'}`}>
                      London Registered Office
                    </span>
                    <span>86-90 Paul Street, London, EC2A 4NE</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <Building2 className={`w-4 h-4 shrink-0 ${isWhite ? 'text-sky-600' : 'text-cyan-400'}`} />
                  <span>Company Registration: #13702594</span>
                </div>

                <div className="flex items-center gap-2.5">
                  <Phone className={`w-4 h-4 shrink-0 ${isWhite ? 'text-sky-600' : 'text-cyan-400'}`} />
                  <a href={`tel:${companyInfo.phone}`} className={isWhite ? 'hover:text-sky-700 transition-colors' : 'hover:text-cyan-300 transition-colors'}>
                    {companyInfo.phoneDisplay}
                  </a>
                </div>

                <div className="flex items-center gap-2.5">
                  <Mail className={`w-4 h-4 shrink-0 ${isWhite ? 'text-sky-600' : 'text-cyan-400'}`} />
                  <a href={`mailto:${companyInfo.email}`} className={isWhite ? 'hover:text-sky-700 transition-colors' : 'hover:text-cyan-300 transition-colors'}>
                    {companyInfo.email}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. OPERATIONAL STANDARDS & SITE MANAGEMENT */}
        {/* ========================================================================= */}
        <section aria-label="Operational Standards & Site Management" className="my-20 scroll-mt-28">
          <div className="mb-10 max-w-3xl">
            <span className={`text-xs font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full border ${
              isWhite ? 'bg-sky-50 border-sky-200 text-sky-800' : 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400'
            }`}>
              SITE EXCELLENCE & HEALTH & SAFETY
            </span>
            <h2 className={`text-3xl sm:text-4xl font-extrabold font-display mt-3 mb-4 tracking-tight ${
              isWhite ? 'text-slate-900' : 'text-white'
            }`}>
              Operational Standards & Site Management
            </h2>
            <p className={`text-base sm:text-lg leading-relaxed ${isWhite ? 'text-slate-700' : 'text-slate-300'}`}>
              High-quality traffic data depends on how rigorously site operations are coordinated. Our field teams operate under structured operational management tailored to the complexities of live highways, transit hubs, and public spaces:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {operationalStandards.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div
                  key={idx}
                  className={`p-7 rounded-3xl border flex flex-col justify-between transition-all space-y-4 shadow-sm ${
                    isWhite
                      ? 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-md'
                      : 'glass-panel border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="space-y-4">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center border shadow-sm"
                      style={{
                        backgroundColor: isWhite ? '#f0f9ff' : `${item.accentColor}18`,
                        borderColor: isWhite ? '#bae6fd' : `${item.accentColor}40`,
                        color: isWhite ? '#0284c7' : '#38bdf8'
                      }}
                    >
                      <IconComp className="w-6 h-6" />
                    </div>

                    <h3 className={`text-lg font-bold font-display ${isWhite ? 'text-slate-900' : 'text-white'}`}>
                      {item.title}
                    </h3>

                    <p className={`text-sm leading-relaxed ${isWhite ? 'text-slate-700' : 'text-slate-300'}`}>
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. TECHNICAL CAPABILITIES & MODEL-READY DATA */}
        {/* ========================================================================= */}
        <section aria-label="Technical Capabilities & Model-Ready Data" className="my-20 scroll-mt-28">
          <div className="mb-10 max-w-3xl">
            <span className={`text-xs font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full border ${
              isWhite ? 'bg-sky-50 border-sky-200 text-sky-800' : 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400'
            }`}>
              TRANSPORT MODELLING INTEGRATION
            </span>
            <h2 className={`text-3xl sm:text-4xl font-extrabold font-display mt-3 mb-4 tracking-tight ${
              isWhite ? 'text-slate-900' : 'text-white'
            }`}>
              Technical Capabilities & Model-Ready Data
            </h2>
            <p className={`text-base sm:text-lg leading-relaxed ${isWhite ? 'text-slate-700' : 'text-slate-300'}`}>
              Our workflows are built to integrate directly with UK transport modeling and planning workflows:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {technicalCapabilities.map((tech, idx) => {
              const TechIcon = tech.icon;
              return (
                <div
                  key={idx}
                  className={`p-7 rounded-3xl border transition-all flex flex-col justify-between space-y-4 shadow-sm ${
                    isWhite
                      ? 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-md'
                      : 'glass-panel border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div
                        className="w-11 h-11 rounded-2xl flex items-center justify-center border shadow-sm"
                        style={{
                          backgroundColor: isWhite ? '#f0f9ff' : 'rgba(46, 163, 217, 0.12)',
                          borderColor: isWhite ? '#bae6fd' : 'rgba(46, 163, 217, 0.35)',
                          color: isWhite ? '#0284c7' : '#38bdf8'
                        }}
                      >
                        <TechIcon className="w-5 h-5" />
                      </div>

                      <span className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-full border ${
                        isWhite
                          ? 'bg-slate-100 text-slate-700 border-slate-200'
                          : 'bg-slate-900 text-slate-300 border-slate-800'
                      }`}>
                        {tech.tag}
                      </span>
                    </div>

                    <h3 className={`text-lg font-bold font-display ${isWhite ? 'text-slate-900' : 'text-white'}`}>
                      {tech.title}
                    </h3>

                    <p className={`text-sm leading-relaxed ${isWhite ? 'text-slate-700' : 'text-slate-300'}`}>
                      {tech.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. SURVEY ENQUIRY MODULE */}
        {/* ========================================================================= */}
        <div className={`my-20 rounded-3xl p-8 sm:p-12 border shadow-xl relative overflow-hidden ${
          isWhite
            ? 'bg-gradient-to-r from-sky-50 via-cyan-50/50 to-sky-50 border-sky-200 text-slate-900'
            : 'glass-panel border-brand-500/30 text-white shadow-[0_0_50px_rgba(12,143,233,0.12)]'
        }`}>
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-8">
            <span className={`px-3 py-1 rounded-full text-xs font-mono border ${
              isWhite ? 'bg-sky-100 text-sky-800 border-sky-200' : 'bg-brand-500/20 text-brand-300 border-brand-500/30'
            }`}>
              SURVEY ENQUIRY
            </span>
            <h2 className={`text-2xl sm:text-3xl font-bold font-display ${isWhite ? 'text-slate-900' : 'text-white'}`}>
              Surveys to Meet Your Exact Requirements
            </h2>
            <p className={`text-sm max-w-xl mx-auto leading-relaxed ${isWhite ? 'text-slate-700' : 'text-slate-300'}`}>
              Tell us about your upcoming survey, location and required outputs. We will review your brief and discuss the next steps.
            </p>
          </div>

          {requirementSubmitted ? (
            <div className="py-8 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className={`text-xl font-bold ${isWhite ? 'text-slate-900' : 'text-white'}`}>Enquiry Received</h3>
              <p className={`text-xs ${isWhite ? 'text-slate-600' : 'text-slate-300'}`}>
                Our survey team will review your requirements and respond shortly.
              </p>
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
                  className={`flex-1 rounded-xl px-4 py-3 text-sm font-mono border focus:outline-none ${
                    isWhite
                      ? 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:border-brand-500'
                      : 'bg-slate-900/90 border-slate-700 text-white placeholder-slate-500 focus:border-brand-500'
                  }`}
                />
                <input
                  type="text"
                  required
                  value={surveyRequirementText}
                  onChange={(e) => setSurveyRequirementText(e.target.value)}
                  placeholder="Survey type, location, preferred dates and outputs"
                  className={`flex-1 rounded-xl px-4 py-3 text-sm font-mono border focus:outline-none ${
                    isWhite
                      ? 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:border-brand-500'
                      : 'bg-slate-900/90 border-slate-700 text-white placeholder-slate-500 focus:border-brand-500'
                  }`}
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-mono font-bold text-xs shadow-lg transition-all shrink-0 flex items-center justify-center gap-1.5 hover:-translate-y-0.5 text-white-always"
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
