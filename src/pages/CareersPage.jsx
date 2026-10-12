import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Briefcase,
  TrendingUp,
  Award,
  CheckCircle2,
  Mail,
  Send,
  UploadCloud,
  Zap,
  Phone,
  Building2,
  Sparkles
} from 'lucide-react';
import { companyInfo } from '../data/companyData';

export default function CareersPage() {
  const [applicantName, setApplicantName] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [applicantPhone, setApplicantPhone] = useState('');
  const [discipline, setDiscipline] = useState('Traffic & Transport Surveying');
  const [coverNote, setCoverNote] = useState('');
  const [fileName, setFileName] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const benefits = [
    { title: 'Accelerated Progression', desc: 'Clear career roadmap from Field Surveyor to Regional Director with formal training.', icon: 'TrendingUp' },
    { title: 'Competitive UK Compensation', desc: 'Industry-leading day and shift rates, overtime bonuses, and travel allowances.', icon: 'Award' },
    { title: 'Cutting-Edge Telemetry Tools', desc: 'Hands-on experience with state-of-the-art AI optical counting and CAPI tablet systems.', icon: 'Zap' },
    { title: 'Accredited Safety Training', desc: 'Company-sponsored certifications in Chapter 8 Street Works and MRS Code of Conduct.', icon: 'CheckCircle2' }
  ];

  const handleApplySubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setApplicantName('');
      setApplicantEmail('');
      setApplicantPhone('');
      setCoverNote('');
      setFileName('');
    }, 5000);
  };

  return (
    <div className="relative min-h-screen text-slate-100 pt-8 pb-24 overflow-hidden">
      {/* Background patterns */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Page Hero */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
            <Briefcase className="w-3.5 h-3.5" />
            <span>JOIN FAST TRACK SURVEYS LTD</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold font-display text-white tracking-tight">
            Careers & Opportunities
          </h1>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-light">
            Looking for a new challenge? Are you a qualified surveyor with industry experience seeking rapid progression and technological innovation?
          </p>
        </div>

        {/* The Invitation Statement (From Original Site) */}
        <div className="rounded-3xl glass-panel p-8 sm:p-12 border border-slate-800 mb-16 shadow-2xl relative overflow-hidden">
          <div className="max-w-3xl space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-white">
              Maximise Your Skills in a Fast-Growing Technology Company
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              At Fast Track Surveys, we are keen to hear from surveyors who are highly motivated, eager to progress, and ready to train in a high-tech environment. Whether you wish to specialize in a specific surveying discipline or broaden your skillset across multi-modal transit and AI video analytics, we provide an unparalleled platform for growth.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-emerald-400">
              <span className="flex items-center gap-1.5">
                <Mail className="w-4 h-4" />
                <span>Direct recruitment: <strong>mail@fasttracksurveys.co.uk</strong></span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Phone className="w-4 h-4" />
                <span>00447767 597947</span>
              </span>
            </div>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {benefits.map((b, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl glass-panel border border-slate-800 flex flex-col justify-between space-y-3"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white font-display">
                {b.title}
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                {b.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Focused Direct CV Submission Section */}
        <div className="max-w-3xl mx-auto rounded-3xl glass-panel p-8 sm:p-12 border border-slate-800 shadow-2xl">
          <div className="border-b border-slate-800 pb-6 mb-8 text-center">
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-mono border border-emerald-500/30 mb-3 inline-block">
              DIRECT CV SUBMISSION
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold font-display text-white">
              Send Your CV to Fast Track Surveys
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-lg mx-auto">
              Please provide your contact details, covering letter, and attach your CV. Our recruitment team reviews all submissions directly.
            </p>
          </div>

          {isSubmitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-2xl font-bold font-display text-white">
                CV & Application Received!
              </h4>
              <p className="text-sm text-slate-400 leading-relaxed max-w-md mx-auto">
                Thank you, <strong>{applicantName}</strong>. Your CV and covering letter have been dispatched to our recruitment directors at <strong>mail@fasttracksurveys.co.uk</strong>. We will review your application within 2 business days.
              </p>
            </div>
          ) : (
            <form onSubmit={handleApplySubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Your legal name"
                    value={applicantName}
                    onChange={(e) => setApplicantName(e.target.value)}
                    className="w-full bg-slate-900/90 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="you@company.co.uk"
                    value={applicantEmail}
                    onChange={(e) => setApplicantEmail(e.target.value)}
                    className="w-full bg-slate-900/90 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-1.5">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 07700 900077"
                    value={applicantPhone}
                    onChange={(e) => setApplicantPhone(e.target.value)}
                    className="w-full bg-slate-900/90 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-1.5">
                    Primary Discipline / Interest
                  </label>
                  <select
                    value={discipline}
                    onChange={(e) => setDiscipline(e.target.value)}
                    className="w-full bg-slate-900/90 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500 font-mono"
                  >
                    <option>Traffic & Transport Surveying (General)</option>
                    <option>Parking Surveys & Lambeth Beats</option>
                    <option>Pedestrian Counts & Footfall Telemetry</option>
                    <option>Cycle & Active Travel Monitoring</option>
                    <option>Roadside (RSI) & Household Interviews</option>
                    <option>AI Video Telemetry & Data Analytics</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-1.5">
                  Covering Letter / Summary of Experience *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Explain your surveying experience, certifications, and why you should be considered..."
                  value={coverNote}
                  onChange={(e) => setCoverNote(e.target.value)}
                  className="w-full bg-slate-900/90 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 font-mono"
                />
              </div>

              {/* CV Upload Box */}
              <div>
                <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-1.5">
                  Attach CV Document (PDF / DOCX / RTF) *
                </label>
                <div className="border-2 border-dashed border-slate-700 rounded-2xl p-6 text-center hover:border-emerald-500 transition-colors bg-slate-950/40">
                  <input
                    type="file"
                    id="cv-upload"
                    required={!fileName}
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setFileName(e.target.files[0].name);
                      }
                    }}
                  />
                  <label htmlFor="cv-upload" className="cursor-pointer flex flex-col items-center gap-2">
                    <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                      <UploadCloud className="w-6 h-6" />
                    </div>
                    <span className="text-sm font-mono font-semibold text-slate-200">
                      {fileName ? fileName : 'Click to select or drag your CV file here'}
                    </span>
                    <span className="text-xs text-slate-500 font-mono">Accepted formats: PDF, DOCX, DOC up to 10MB</span>
                  </label>
                </div>
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-500 hover:from-emerald-500 hover:to-teal-400 text-white font-mono font-bold text-xs uppercase tracking-wider shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>EMAIL CV WITH COVERING LETTER TO FAST TRACK SURVEYS</span>
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
