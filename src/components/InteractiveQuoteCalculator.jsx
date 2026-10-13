import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calculator,
  X,
  CheckCircle2,
  MapPin,
  Clock,
  Calendar,
  Send,
  Building2,
  FileText,
  FileSpreadsheet,
  AlertCircle
} from 'lucide-react';
import { servicesData } from '../data/servicesData';
import { useNavigation } from '../context/NavigationContext';

export default function InteractiveQuoteCalculator({ isOpen, onClose }) {
  const { selectedService } = useNavigation();

  // Form states matching requested specification
  const [surveyType, setSurveyType] = useState(servicesData[0].title);
  const [siteAddress, setSiteAddress] = useState('');
  const [numberOfSites, setNumberOfSites] = useState('');
  const [preferredDates, setPreferredDates] = useState('');
  const [durationOption, setDurationOption] = useState('Peak-period survey');
  const [surveyHours, setSurveyHours] = useState('');
  const [requiredCounts, setRequiredCounts] = useState('');
  const [requiredDeliverables, setRequiredDeliverables] = useState('');
  const [deliveryOption, setDeliveryOption] = useState('Standard delivery — timing to be agreed');
  const [preferredDeliveryDate, setPreferredDeliveryDate] = useState('');
  const [accessArrangements, setAccessArrangements] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactCompany, setContactCompany] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Sync survey type if opened from a specific service page
  useEffect(() => {
    if (selectedService?.title) {
      setSurveyType(selectedService.title);
    }
  }, [selectedService, isOpen]);

  if (!isOpen) return null;

  const durationOptions = [
    'Peak-period survey',
    'Full-day survey',
    'Overnight survey',
    'Multiple days',
    'Other / Please advise'
  ];

  const deliveryOptions = [
    'Standard delivery — timing to be agreed',
    'Urgent delivery — please confirm availability',
    'Specific deadline — enter date'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const resetForm = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-xl overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          className="relative w-full max-w-3xl bg-slate-900 border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden my-6 max-h-[92vh] flex flex-col justify-between"
        >
          {/* Header */}
          <div className="flex items-start justify-between border-b border-slate-800 pb-5 mb-6 shrink-0">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-brand-500/20 text-brand-400 border border-brand-500/30">
                <Calculator className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
                  Request a Survey Quote
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
                  Tell us what you need to measure and where the survey will take place. We will review your requirements and contact you to confirm the scope and quotation.
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white p-2 rounded-xl hover:bg-slate-800 transition-colors shrink-0 ml-2"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form or Success State */}
          <div className="flex-1 overflow-y-auto pr-1">
            {isSubmitted ? (
              <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/40">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-2xl font-bold font-display text-white">
                  Quote Request Received
                </h4>
                <p className="text-sm text-slate-300 max-w-md leading-relaxed">
                  Thank you, <strong>{contactName || 'Valued Client'}</strong>. We have received your request for <strong>{surveyType}</strong>. We will review your requirements and contact you to confirm the scope and quotation.
                </p>
                <div className="pt-4">
                  <button
                    onClick={resetForm}
                    className="px-6 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-mono font-bold text-xs transition-colors"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">

                {/* Section 1: Survey Requirements */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-semibold border-b border-slate-800/80 pb-2">
                    <FileText className="w-4 h-4" />
                    <span>SURVEY SPECIFICATIONS</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Survey Type */}
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1.5 font-medium">
                        Survey type *
                      </label>
                      <select
                        value={surveyType}
                        onChange={(e) => setSurveyType(e.target.value)}
                        className="w-full bg-slate-800/90 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs font-mono text-white focus:outline-none focus:border-brand-500"
                        required
                      >
                        {servicesData.map((svc) => (
                          <option key={svc.id} value={svc.title}>
                            {svc.title}
                          </option>
                        ))}
                        <option value="Multi-Discipline / Bespoke Survey">
                          Multi-Discipline / Bespoke Survey
                        </option>
                        <option value="Other Survey Requirements">
                          Other Survey Requirements
                        </option>
                      </select>
                    </div>

                    {/* Number of sites or locations */}
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1.5 font-medium">
                        Number of sites or locations *
                      </label>
                      <input
                        type="text"
                        required
                        value={numberOfSites}
                        onChange={(e) => setNumberOfSites(e.target.value)}
                        placeholder="e.g. 1 junction, 4 counting points, CPZ area"
                        className="w-full bg-slate-800/90 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
                      />
                    </div>
                  </div>

                  {/* Site address or survey area */}
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1.5 font-medium">
                      Site address or survey area *
                    </label>
                    <input
                      type="text"
                      required
                      value={siteAddress}
                      onChange={(e) => setSiteAddress(e.target.value)}
                      placeholder="Road name, junction, postcode or survey boundary description"
                      className="w-full bg-slate-800/90 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
                    />
                  </div>

                  {/* Dates & Duration */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Preferred survey dates */}
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1.5 font-medium">
                        Preferred survey dates *
                      </label>
                      <input
                        type="text"
                        required
                        value={preferredDates}
                        onChange={(e) => setPreferredDates(e.target.value)}
                        placeholder="e.g. W/C 10th November, or neutral school term weekday"
                        className="w-full bg-slate-800/90 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
                      />
                    </div>

                    {/* Survey duration options */}
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1.5 font-medium">
                        Survey duration options *
                      </label>
                      <select
                        value={durationOption}
                        onChange={(e) => setDurationOption(e.target.value)}
                        className="w-full bg-slate-800/90 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs font-mono text-white focus:outline-none focus:border-brand-500"
                      >
                        {durationOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Survey hours and number of days */}
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1.5 font-medium">
                      Survey hours and number of days
                    </label>
                    <input
                      type="text"
                      value={surveyHours}
                      onChange={(e) => setSurveyHours(e.target.value)}
                      placeholder="e.g. 07:00–10:00 and 16:00–19:00 across 2 weekdays"
                      className="w-full bg-slate-800/90 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
                    />
                  </div>

                  {/* Required counts, classifications or interview sample */}
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1.5 font-medium">
                      Required counts, classifications or interview sample
                    </label>
                    <textarea
                      rows={2}
                      value={requiredCounts}
                      onChange={(e) => setRequiredCounts(e.target.value)}
                      placeholder="e.g. Classified vehicle turning counts, pedestrian directional flows, or target of 150 customer interviews"
                      className="w-full bg-slate-800/90 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
                    />
                  </div>
                </div>

                {/* Section 2: Deliverables & Timeline */}
                <div className="space-y-4 pt-2">
                  <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-semibold border-b border-slate-800/80 pb-2">
                    <FileSpreadsheet className="w-4 h-4" />
                    <span>DELIVERABLES & TIMING</span>
                  </div>

                  {/* Required deliverables */}
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1.5 font-medium">
                      Required deliverables
                    </label>
                    <input
                      type="text"
                      value={requiredDeliverables}
                      onChange={(e) => setRequiredDeliverables(e.target.value)}
                      placeholder="e.g. Classified tables, turning diagrams, peak-period summaries, Excel & CSV"
                      className="w-full bg-slate-800/90 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Delivery options */}
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1.5 font-medium">
                        Delivery options *
                      </label>
                      <select
                        value={deliveryOption}
                        onChange={(e) => setDeliveryOption(e.target.value)}
                        className="w-full bg-slate-800/90 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs font-mono text-white focus:outline-none focus:border-brand-500"
                      >
                        {deliveryOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Preferred delivery date */}
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1.5 font-medium">
                        Preferred delivery date
                      </label>
                      <input
                        type="text"
                        value={preferredDeliveryDate}
                        onChange={(e) => setPreferredDeliveryDate(e.target.value)}
                        placeholder="e.g. Specific deadline date, or W/C date"
                        className="w-full bg-slate-800/90 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
                      />
                    </div>
                  </div>

                  {/* Access arrangements or other requirements */}
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1.5 font-medium">
                      Access arrangements or other requirements
                    </label>
                    <textarea
                      rows={2}
                      value={accessArrangements}
                      onChange={(e) => setAccessArrangements(e.target.value)}
                      placeholder="e.g. Private site access required, security clearance, highway license or specific safety constraints"
                      className="w-full bg-slate-800/90 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
                    />
                  </div>
                </div>

                {/* Section 3: Contact Details */}
                <div className="space-y-4 pt-2">
                  <div className="flex items-center gap-2 text-xs font-mono text-brand-400 font-semibold border-b border-slate-800/80 pb-2">
                    <Building2 className="w-4 h-4" />
                    <span>CONTACT DETAILS</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1.5 font-medium">
                        Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        placeholder="Your full name"
                        className="w-full bg-slate-800/90 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
                      />
                    </div>

                    {/* Company or organisation */}
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1.5 font-medium">
                        Company or organisation
                      </label>
                      <input
                        type="text"
                        value={contactCompany}
                        onChange={(e) => setContactCompany(e.target.value)}
                        placeholder="Company, local authority or practice"
                        className="w-full bg-slate-800/90 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
                      />
                    </div>

                    {/* Email address */}
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1.5 font-medium">
                        Email address *
                      </label>
                      <input
                        type="email"
                        required
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        placeholder="name@company.co.uk"
                        className="w-full bg-slate-800/90 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
                      />
                    </div>

                    {/* Telephone number */}
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1.5 font-medium">
                        Telephone number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={contactPhone}
                        onChange={(e) => setContactPhone(e.target.value)}
                        placeholder="Contact phone number"
                        className="w-full bg-slate-800/90 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Submit Button & Disclaimer */}
                <div className="pt-4 border-t border-slate-800 space-y-3">
                  <button
                    type="submit"
                    className="w-full bg-brand-500 hover:bg-brand-600 text-white font-mono font-bold text-sm py-3.5 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 hover:-translate-y-0.5"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Quote Request</span>
                  </button>

                  <p className="text-center text-[11px] font-mono text-slate-400 leading-relaxed px-2">
                    Submitting this form does not confirm a booking. Survey arrangements and delivery dates will be agreed in your quotation.
                  </p>
                </div>

              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
