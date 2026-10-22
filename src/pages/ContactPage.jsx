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
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-400 text-xs font-mono">
            <Mail className="w-3.5 h-3.5" />
            <span>DIRECT ENQUIRIES & QUOTATIONS</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold font-display text-white tracking-tight">
            Contact & Consultation
          </h1>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-light">
            Interested to know more about our survey services? Speak directly with our survey team.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

          {/* Left: Office & Contact Info */}
          <div className="lg:col-span-5 rounded-3xl glass-panel p-8 border border-slate-800 space-y-8 flex flex-col justify-between shadow-2xl">
            <div>
              <h2 className="text-2xl font-bold font-display text-white mb-2">
                Survey Enquiries
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed mb-4">
                Fast Track Surveys provides traffic, transport, parking and interview surveys. We organise fieldwork around your project requirements and deliver clear data to support planning and operational decisions.
              </p>
              <p className="text-slate-400 text-xs leading-relaxed mb-8">
                Contact our survey coordination team to discuss your location, preferred dates and reporting requirements. We will confirm availability and the next steps for your project.
              </p>

              <div className="space-y-5 text-sm">
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-brand-500/20 text-brand-400 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Registered Office</h3>
                    <p className="text-slate-400 text-xs mt-0.5">
                      86-90 Paul Street, London, England, United Kingdom, EC2A 4NE
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-cyan-500/20 text-cyan-400 shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Telephone</h3>
                    <a href="tel:+447767597947" className="text-slate-300 text-xs hover:text-white font-mono block">
                      +44 (0)7767 597947
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-purple-500/20 text-purple-400 shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Email Address</h3>
                    <a href="mailto:mail@fasttracksurveys.co.uk" className="text-slate-300 text-xs hover:text-white font-mono block">
                      mail@fasttracksurveys.co.uk
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800">
              <button
                onClick={() => openQuoteModal(null)}
                className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-brand-400 font-mono font-bold text-xs flex items-center justify-center gap-2 transition-all"
              >
                <Calculator className="w-4 h-4" />
                <span>Request a Quote →</span>
              </button>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="lg:col-span-7 rounded-3xl glass-panel p-8 border border-slate-800 shadow-2xl">
            <h2 className="text-xl font-bold font-display text-white mb-6">
              Send a Survey Enquiry
            </h2>

            {isSubmitted ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold font-display text-white">
                  Enquiry Sent Successfully!
                </h3>
                <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                  Thank you, <strong>{formData.name || 'Valued Client'}</strong>. Our survey team will review your brief and contact you shortly.
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
                      className="w-full bg-slate-900/90 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-1.5 font-medium">
                      Company
                    </label>
                    <input
                      type="text"
                      placeholder="Company name"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full bg-slate-900/90 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 font-mono"
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
                      className="w-full bg-slate-900/90 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 font-mono"
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
                      className="w-full bg-slate-900/90 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 font-mono"
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
                    className="w-full bg-slate-900/90 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 font-mono"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-mono font-bold text-xs uppercase tracking-wider shadow-lg transition-all flex items-center justify-center gap-2"
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
