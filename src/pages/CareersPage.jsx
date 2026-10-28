import React, { useState } from 'react';
import {
  Briefcase,
  CheckCircle2,
  Mail,
  Send,
  UploadCloud,
  Phone,
  FileCheck2,
  CalendarCheck,
  ClipboardList
} from 'lucide-react';

export default function CareersPage() {
  const [applicantName, setApplicantName] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [applicantPhone, setApplicantPhone] = useState('');
  const [location, setLocation] = useState('');
  const [discipline, setDiscipline] = useState('Traffic & Movement Counts');
  const [coverNote, setCoverNote] = useState('');
  const [fileName, setFileName] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const featureBoxes = [
    {
      title: 'A Range of Survey Work',
      desc: 'Assignments may include traffic and pedestrian counts, parking observations and passenger or visitor interviews.',
      icon: Briefcase
    },
    {
      title: 'Clear Assignment Information',
      desc: 'The location, hours, agreed rate and any applicable expenses are confirmed before you accept an assignment.',
      icon: CalendarCheck
    },
    {
      title: 'Project Briefings',
      desc: 'Survey instructions and relevant site arrangements are explained before fieldwork begins.',
      icon: ClipboardList
    }
  ];

  const handleApplySubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setApplicantName('');
      setApplicantEmail('');
      setApplicantPhone('');
      setLocation('');
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

        {/* Page Hero & Single Introduction */}
        <div className="text-center max-w-4xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono uppercase tracking-widest backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            <Briefcase className="w-3.5 h-3.5" />
            <span>TALENT & FIELDWORK ASSIGNMENTS</span>
          </div>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold font-display tracking-tight leading-tight">
            <span className="text-gradient-silver">Work With</span>{' '}
            <span className="text-emerald-400">Fast Track Surveys</span>
          </h1>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto font-normal">
            We welcome expressions of interest from conscientious, reliable professionals passionate about traffic counts, automated sensor deployments, parking beat surveys, and passenger interviews.
          </p>
          <div className="pt-3 flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-emerald-400">
            <a href="mailto:mail@fasttracksurveys.co.uk" data-cursor-text="EMAIL" className="flex items-center gap-1.5 hover:text-emerald-300 transition-colors">
              <Mail className="w-4 h-4" />
              <span>Enquiries: <strong>mail@fasttracksurveys.co.uk</strong></span>
            </a>
            <span>•</span>
            <a href="tel:+447767597947" data-cursor-text="CALL" className="flex items-center gap-1.5 hover:text-emerald-300 transition-colors">
              <Phone className="w-4 h-4" />
              <span>+44 (0)7767 597947</span>
            </a>
          </div>
        </div>

        {/* 3 Assignment Information Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {featureBoxes.map((b, i) => {
            const Icon = b.icon;
            return (
              <div
                key={i}
                data-cursor-text="ASSIGNMENT"
                className="p-7 rounded-3xl luxury-glass luxury-card-hover border border-slate-800 flex flex-col justify-between space-y-4 relative overflow-hidden group shadow-lg"
              >
                <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white font-display group-hover:text-emerald-300 transition-colors">
                  {b.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                  {b.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Register Your Interest Form */}
        <div className="max-w-3xl mx-auto rounded-3xl glass-panel p-8 sm:p-12 border border-slate-800 shadow-2xl">
          <div className="border-b border-slate-800 pb-6 mb-8 text-center">
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-mono border border-emerald-500/30 mb-3 inline-block">
              SURVEYOR REGISTRATION
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-white">
              Register Your Interest
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-lg mx-auto">
              Send your CV or a short summary of your relevant experience, together with your location and availability.
            </p>
          </div>

          {isSubmitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold font-display text-white">
                Details Received
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed max-w-md mx-auto">
                Thank you, <strong>{applicantName}</strong>. Your details have been sent to <strong>mail@fasttracksurveys.co.uk</strong>. We will keep your information on file and contact you when suitable project opportunities arise in your area.
              </p>
            </div>
          ) : (
            <form onSubmit={handleApplySubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Your name"
                    value={applicantName}
                    onChange={(e) => setApplicantName(e.target.value)}
                    className="w-full bg-slate-900/90 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="you@example.co.uk"
                    value={applicantEmail}
                    onChange={(e) => setApplicantEmail(e.target.value)}
                    className="w-full bg-slate-900/90 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-1.5">
                    Phone Number (Optional)
                  </label>
                  <input
                    type="tel"
                    placeholder="e.g. 07700 900077"
                    value={applicantPhone}
                    onChange={(e) => setApplicantPhone(e.target.value)}
                    className="w-full bg-slate-900/90 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-1.5">
                    Your Location / Base
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. London / Manchester / Bristol"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full bg-slate-900/90 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-1.5">
                  Survey Types of Interest
                </label>
                <select
                  value={discipline}
                  onChange={(e) => setDiscipline(e.target.value)}
                  className="w-full bg-slate-900/90 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500 font-mono"
                >
                  <option>Traffic & Movement Counts</option>
                  <option>Parking Observations & Beat Surveys</option>
                  <option>Pedestrian & Cycle Counts</option>
                  <option>Public Transport Passenger Counts</option>
                  <option>Face-to-Face & Intercept Interviews</option>
                  <option>All Survey Types</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-1.5">
                  Experience & Availability Summary *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Outline your surveying experience, availability (weekdays/weekends), and preferred travel distance..."
                  value={coverNote}
                  onChange={(e) => setCoverNote(e.target.value)}
                  className="w-full bg-slate-900/90 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 font-mono"
                />
              </div>

              {/* CV Upload Box - with consistent accepted file formats */}
              <div>
                <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-1.5">
                  Attach CV Document (PDF, DOC, DOCX)
                </label>
                <div className="border-2 border-dashed border-slate-700 rounded-2xl p-6 text-center hover:border-emerald-500 transition-colors bg-slate-950/40">
                  <input
                    type="file"
                    id="cv-upload"
                    accept=".pdf,.doc,.docx"
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
                    <span className="text-xs text-slate-400 font-mono">Accepted formats: PDF, DOC, DOCX up to 10MB</span>
                  </label>
                </div>
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-500 hover:from-emerald-500 hover:to-teal-400 text-white font-mono font-bold text-xs uppercase tracking-wider shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Register Your Interest</span>
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
