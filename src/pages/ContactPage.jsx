import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Send,
  CheckCircle2,
  Calculator
} from 'lucide-react';
import { companyInfo } from '../data/companyData';
import { useNavigation } from '../context/NavigationContext';

export default function ContactPage() {
  const { openQuoteModal } = useNavigation();
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    city: '',
    phone: '',
    email: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', company: '', city: '', phone: '', email: '', message: '' });
    }, 4500);
  };

  return (
    <div className="relative min-h-screen text-slate-100 pt-8 pb-24 overflow-hidden">
      {/* Background patterns */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-widest backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
            <Mail className="w-3.5 h-3.5" />
            <span>DIRECT ENQUIRIES & TECHNICAL CONSULTATION</span>
          </div>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold font-display tracking-tight leading-tight">
            <span className="text-gradient-silver">Contact &</span>{' '}
            <span className="text-[#2ea3d9]">Consultation</span>
          </h1>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto font-normal">
            Ready to discuss your survey location, camera vantages, or sample sizes? Connect directly with our survey directors and technical team.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

          {/* Left: Office & Contact Info */}
          <div className="lg:col-span-5 rounded-3xl luxury-glass p-8 sm:p-10 border border-slate-800/90 space-y-8 flex flex-col justify-between shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-widest">
                  LONDON HEADQUARTERS
                </span>
                <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  <span>DESK ACTIVE</span>
                </span>
              </div>
              <h2 className="text-2xl font-bold font-display text-white mb-3">
                Survey Enquiries
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed mb-4">
                Fast Track Surveys provides classified traffic counts, parking studies, passenger journey surveys, and face-to-face interviewing across the UK.
              </p>
              <p className="text-slate-400 text-xs leading-relaxed mb-8 font-mono">
                Contact our survey desk to establish staffing availability, site safety plans, and deliverable specifications for your scheme.
              </p>

              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3.5 p-3 rounded-2xl bg-slate-900/60 border border-slate-800">
                  <div className="p-2.5 rounded-xl bg-brand-500/20 text-cyan-400 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Registered Office</h3>
                    <p className="text-slate-300 text-xs mt-0.5">
                      86-90 Paul Street, London, England, United Kingdom, EC2A 4NE
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-3 rounded-2xl bg-slate-900/60 border border-slate-800">
                  <div className="p-2.5 rounded-xl bg-cyan-500/20 text-cyan-400 shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Telephone</h3>
                    <a href="tel:+447767597947" data-cursor-text="CALL" className="text-slate-300 text-xs hover:text-cyan-300 font-mono block mt-0.5 font-bold">
                      +44 (0)7767 597947
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-3 rounded-2xl bg-slate-900/60 border border-slate-800">
                  <div className="p-2.5 rounded-xl bg-purple-500/20 text-purple-400 shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Email Address</h3>
                    <a href="mailto:mail@fasttracksurveys.co.uk" data-cursor-text="EMAIL" className="text-slate-300 text-xs hover:text-cyan-300 font-mono block mt-0.5 font-bold">
                      mail@fasttracksurveys.co.uk
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800/80">
              <button
                onClick={() => openQuoteModal(null)}
                data-cursor-text="QUOTE"
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#016a97] to-[#2ea3d9] hover:from-[#01557a] hover:to-[#2ea3d9] text-white font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-[0_0_20px_rgba(46,163,217,0.45)] shimmer-btn"
              >
                <Calculator className="w-4 h-4" />
                <span>Launch Interactive Quote Calculator →</span>
              </button>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="lg:col-span-7 rounded-3xl luxury-glass p-8 sm:p-10 border border-slate-800/90 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#2ea3d9] to-transparent" />
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold font-display text-white">
                Send a Survey Enquiry
              </h2>
              <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 border border-cyan-500/30 px-2.5 py-1 rounded-full">
                SAME DAY RESPONSE
              </span>
            </div>

            {isSubmitted ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold font-display text-white">
                  Enquiry Sent Successfully!
                </h3>
                <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                  Thank you, <strong>{formData.name || 'Valued Client'}</strong>. Our survey director and technical team will review your brief and contact you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-1.5 font-medium">
                      Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Your name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-slate-900/90 border border-slate-700/80 rounded-2xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 font-mono transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-1.5 font-medium">
                      Company
                    </label>
                    <input
                      type="text"
                      placeholder="Company / Authority"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full bg-slate-900/90 border border-slate-700/80 rounded-2xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 font-mono transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-1.5 font-medium">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="you@company.co.uk"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-slate-900/90 border border-slate-700/80 rounded-2xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 font-mono transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-1.5 font-medium">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      placeholder="Contact phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-slate-900/90 border border-slate-700/80 rounded-2xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 font-mono transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-1.5 font-medium">
                    Message / Survey Requirements *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us the survey type, location, preferred dates and results you need."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-slate-900/90 border border-slate-700/80 rounded-2xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 font-mono transition-all"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    data-cursor-text="SUBMIT"
                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#016a97] via-[#0284c7] to-[#2ea3d9] hover:from-[#01557a] hover:to-[#2ea3d9] text-white font-mono font-bold text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(46,163,217,0.45)] transition-all flex items-center justify-center gap-2.5 hover:-translate-y-0.5 shimmer-btn"
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
    </div>
  );
}
