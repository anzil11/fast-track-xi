import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calculator,
  X,
  CheckCircle2,
  MapPin,
  Clock,
  ShieldCheck,
  ArrowRight,
  FileSpreadsheet,
  Send,
  Zap
} from 'lucide-react';
import { useNavigation } from '../context/NavigationContext';
import { servicesData } from '../data/servicesData';
import ServiceIcon from './ServiceIcon';

export default function InteractiveQuoteCalculator({ isOpen, onClose }) {
  const [selectedServiceId, setSelectedServiceId] = useState(servicesData[0].id);
  const [region, setRegion] = useState('Greater London');
  const [duration, setDuration] = useState('24h Continuous');
  const [turnaround, setTurnaround] = useState('Standard (48h)');
  const [contactName, setContactName] = useState('');
  const [contactCompany, setContactCompany] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const currentService = servicesData.find(s => s.id === selectedServiceId) || servicesData[0];

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      // keep submitted view or close
    }, 3000);
  };

  const resetForm = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/85 backdrop-blur-xl overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          className="relative w-full max-w-3xl bg-slate-900 border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden my-8"
        >
          {/* Header */}
          <div className="flex items-start justify-between border-b border-slate-800 pb-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-brand-500/20 text-brand-400 border border-brand-500/30">
                <Calculator className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
                  Fast Track Survey Quotation Builder
                </h3>
                <p className="text-xs sm:text-sm text-slate-400">
                  Configure your project parameters for an instant scope estimate & technical consultation.
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white p-2 rounded-xl hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {isSubmitted ? (
            <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/40">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-2xl font-bold font-display text-white">
                Quotation Request Received!
              </h4>
              <p className="text-sm text-slate-400 max-w-md">
                Thank you, <strong>{contactName || 'Valued Client'}</strong>. Our senior transport survey consultant has received your configuration for <strong>{currentService.title}</strong> in {region}. We will email your formal proposal within 2 hours.
              </p>
              <div className="pt-4">
                <button
                  onClick={resetForm}
                  className="px-6 py-2.5 rounded-xl bg-brand-500 text-white font-mono font-bold text-xs"
                >
                  Return to Portal
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Step 1: Select Service */}
              <div>
                <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                  1. Select Survey Discipline
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {servicesData.map((svc) => {
                    const isSelected = svc.id === selectedServiceId;
                    return (
                      <button
                        key={svc.id}
                        type="button"
                        onClick={() => setSelectedServiceId(svc.id)}
                        className={`p-2.5 rounded-xl border text-left flex flex-col items-start gap-1.5 transition-all ${
                          isSelected
                            ? 'bg-brand-500/20 border-brand-400 text-white shadow-[0_0_15px_rgba(12,143,233,0.3)]'
                            : 'bg-slate-800/60 border-slate-700/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                        }`}
                      >
                        <div
                          className="w-7 h-7 rounded-lg flex items-center justify-center"
                          style={{
                            backgroundColor: `${svc.accentColor}20`,
                            color: svc.accentColor
                          }}
                        >
                          <ServiceIcon name={svc.icon} className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-semibold leading-tight line-clamp-1">
                          {svc.shortTitle || svc.title}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Location & Survey Scope */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                    2. Geographic Region
                  </label>
                  <select
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-3 py-2.5 text-xs font-mono text-white focus:outline-none focus:border-brand-500"
                  >
                    <option>Greater London (Inner/Outer)</option>
                    <option>South East England</option>
                    <option>Midlands (Birmingham / Nottingham)</option>
                    <option>North West (Manchester / Liverpool)</option>
                    <option>Yorkshire & Humber</option>
                    <option>South West & Wales</option>
                    <option>Scotland (Edinburgh / Glasgow)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                    3. Sampling Duration
                  </label>
                  <select
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-3 py-2.5 text-xs font-mono text-white focus:outline-none focus:border-brand-500"
                  >
                    <option>Single Day Peak (07:00-19:00)</option>
                    <option>24-Hour Continuous Telemetry</option>
                    <option>Overnight Lambeth Parking (00:30-05:30)</option>
                    <option>Multi-day 7-Day Continuous Survey</option>
                    <option>Custom Weekend & Weekday Blend</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                    4. Turnaround Speed
                  </label>
                  <select
                    value={turnaround}
                    onChange={(e) => setTurnaround(e.target.value)}
                    className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-3 py-2.5 text-xs font-mono text-white focus:outline-none focus:border-brand-500"
                  >
                    <option>Standard (48-72 hrs Deliverables)</option>
                    <option>Rapid Fast-Track (24h Express)</option>
                    <option>Live Same-Day Telemetry Feed</option>
                  </select>
                </div>
              </div>

              {/* Real-time Scope Summary Box */}
              <div className="bg-slate-950/80 rounded-2xl p-4 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs font-mono text-brand-400">
                    <Zap className="w-3.5 h-3.5" />
                    <span>SCOPE ESTIMATE MATRIX</span>
                  </div>
                  <div className="text-sm font-semibold text-white">
                    {currentService.title} • {region} • {duration}
                  </div>
                  <div className="text-xs text-slate-400 flex items-center gap-2">
                    <span>Accreditation: <strong>MRS / Chapter 8</strong></span>
                    <span>•</span>
                    <span>Accuracy Target: <strong>99.4%</strong></span>
                  </div>
                </div>

                <div className="px-4 py-2 rounded-xl bg-brand-500/10 border border-brand-500/30 text-brand-300 text-xs font-mono text-right">
                  <div>DISPATCH TIER:</div>
                  <div className="font-bold text-white text-sm">PRIORITY DISPATCH</div>
                </div>
              </div>

              {/* Step 3: Contact Details */}
              <div>
                <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                  5. Contact & Delivery Recipient
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="Full Name *"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="bg-slate-800/80 border border-slate-700 rounded-xl px-4 py-2.5 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Company / Local Authority *"
                    value={contactCompany}
                    onChange={(e) => setContactCompany(e.target.value)}
                    className="bg-slate-800/80 border border-slate-700 rounded-xl px-4 py-2.5 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Official Email Address *"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    className="bg-slate-800/80 border border-slate-700 rounded-xl px-4 py-2.5 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
                  />
                  <input
                    type="tel"
                    placeholder="Contact Telephone"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    className="bg-slate-800/80 border border-slate-700 rounded-xl px-4 py-2.5 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
                  />
                </div>
                <textarea
                  rows={2}
                  placeholder="Additional survey requirements, specific junctions, CPZ zones, or planning reference..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full mt-3 bg-slate-800/80 border border-slate-700 rounded-xl px-4 py-2.5 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
                />
              </div>

              {/* Submit Button */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                <span className="text-[11px] font-mono text-slate-500">
                  No obligation • Formal quote delivered within 2 hours
                </span>

                <button
                  type="submit"
                  className="bg-gradient-to-r from-brand-600 to-cyan-500 hover:from-brand-500 hover:to-cyan-400 text-white font-mono font-bold text-xs px-6 py-3 rounded-xl shadow-lg transition-all flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>REQUEST FORMAL QUOTATION</span>
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
