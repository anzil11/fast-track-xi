import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calculator,
  X,
  CheckCircle2,
  Send,
  Building2,
  Mail,
  Phone,
  User,
  MessageSquare,
  UploadCloud,
  FileText,
  FileSpreadsheet,
  File,
  Trash2,
  Tag,
  Copy,
  Check,
  ExternalLink
} from 'lucide-react';
import { servicesData } from '../data/servicesData';
import { useNavigation } from '../context/NavigationContext';
import { useTheme } from '../context/ThemeContext';

export default function InteractiveQuoteCalculator({ isOpen, onClose }) {
  const { quotePreselectedService } = useNavigation();
  const { isWhite } = useTheme();

  // Form states matching requested streamlined quote form
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [enquiry, setEnquiry] = useState('');
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const fileInputRef = useRef(null);

  // Derive service name if launched from a service detail page
  const [preselectedTitle, setPreselectedTitle] = useState('');

  useEffect(() => {
    if (isOpen) {
      if (quotePreselectedService) {
        const found = servicesData.find(
          (s) =>
            s.id === quotePreselectedService ||
            s.slug === quotePreselectedService ||
            s.title === quotePreselectedService
        );
        if (found) {
          setPreselectedTitle(found.title);
        } else if (typeof quotePreselectedService === 'string') {
          setPreselectedTitle(quotePreselectedService);
        }
      } else {
        setPreselectedTitle('');
      }
    }
  }, [quotePreselectedService, isOpen]);

  if (!isOpen) return null;

  const handleFiles = (incomingFiles) => {
    const selected = Array.from(incomingFiles);
    setFiles((prev) => [...prev, ...selected]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer?.files?.length) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const removeFile = (indexToRemove) => {
    setFiles((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return '0 B';
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const getFileIcon = (name) => {
    const ext = name.split('.').pop()?.toLowerCase();
    if (ext === 'pdf') {
      return <FileText className="w-4 h-4 text-rose-500 shrink-0" />;
    }
    if (['ppt', 'pptx'].includes(ext)) {
      return <FileText className="w-4 h-4 text-amber-500 shrink-0" />;
    }
    if (['xls', 'xlsx', 'csv'].includes(ext)) {
      return <FileSpreadsheet className="w-4 h-4 text-emerald-500 shrink-0" />;
    }
    return <File className="w-4 h-4 text-cyan-500 shrink-0" />;
  };

  const buildEmailContent = () => {
    const fileListText =
      files.length > 0
        ? files.map((f, i) => `${i + 1}. ${f.name} (${formatFileSize(f.size)})`).join('\n')
        : 'None selected';

    const bodyText = `FAST TRACK SURVEYS - QUOTE REQUEST
===================================================

CLIENT DETAILS:
---------------------------------------------------
Full Name:    ${firstName} ${lastName}
Company:      ${companyName || 'Not specified'}
Email:        ${emailAddress}
Telephone:    ${phone || 'Not provided'}
Service:      ${preselectedTitle || 'General Survey Enquiry'}

ENQUIRY & REQUIREMENTS:
---------------------------------------------------
${enquiry}

ATTACHED DOCUMENTS:
---------------------------------------------------
${fileListText}
${
  files.length > 0
    ? '\n(Please ensure the files listed above are attached to this email before sending.)'
    : ''
}

===================================================
Submitted via Fast Track Surveys Website (fasttracksurveys.co.uk)
`;

    const subject = `Fast Track Surveys - Quote Request: ${firstName} ${lastName}${
      companyName ? ` (${companyName})` : ''
    }${preselectedTitle ? ` - ${preselectedTitle}` : ''}`;

    const mailtoUrl = `mailto:mail@fasttracksurveys.co.uk?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(bodyText)}`;

    return { subject, bodyText, mailtoUrl };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);

    const { subject, mailtoUrl } = buildEmailContent();

    // 1. Post to form service in background to dispatch real email to mail@fasttracksurveys.co.uk
    try {
      const formData = new FormData();
      formData.append('_subject', subject);
      formData.append('First Name', firstName);
      formData.append('Last Name', lastName);
      formData.append('Company', companyName || 'Not specified');
      formData.append('Email', emailAddress);
      formData.append('Phone', phone || 'Not provided');
      formData.append('Service / Subject', preselectedTitle || 'General Survey Enquiry');
      formData.append('Enquiry Details', enquiry);
      if (files.length > 0) {
        formData.append(
          'Attached File Names',
          files.map((f) => `${f.name} (${formatFileSize(f.size)})`).join(', ')
        );
      }
      files.forEach((file, idx) => {
        formData.append(`attachment_${idx + 1}`, file);
      });

      await fetch('https://formsubmit.co/ajax/mail@fasttracksurveys.co.uk', {
        method: 'POST',
        body: formData
      });
    } catch (err) {
      // Continue even if network blocks external post
      console.log('Background form submission note:', err);
    }

    // 2. Open client's default email software pre-filled to mail@fasttracksurveys.co.uk
    try {
      const mailtoLink = document.createElement('a');
      mailtoLink.href = mailtoUrl;
      mailtoLink.target = '_self';
      document.body.appendChild(mailtoLink);
      mailtoLink.click();
      document.body.removeChild(mailtoLink);
    } catch (err) {
      console.log('Mailto launch error:', err);
    }

    setIsSending(false);
    setIsSubmitted(true);
  };

  const copySummary = () => {
    const { bodyText } = buildEmailContent();
    navigator.clipboard.writeText(bodyText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const resetForm = () => {
    setFirstName('');
    setLastName('');
    setCompanyName('');
    setEmailAddress('');
    setPhone('');
    setEnquiry('');
    setFiles([]);
    setIsSending(false);
    setIsSubmitted(false);
    setCopied(false);
    onClose();
  };

  const { mailtoUrl } = buildEmailContent();

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-xl overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          className={`relative w-full max-w-2xl rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden my-6 max-h-[92vh] flex flex-col justify-between transition-colors ${
            isWhite
              ? 'bg-white border border-slate-200 text-slate-800'
              : 'bg-slate-900 border border-slate-700/80 text-white'
          }`}
        >
          {/* Header */}
          <div
            className={`flex items-start justify-between border-b pb-5 mb-5 shrink-0 ${
              isWhite ? 'border-slate-200' : 'border-slate-800'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-brand-500/20 text-brand-400 border border-brand-500/30 shrink-0">
                <Calculator className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h2
                    className={`text-xl sm:text-2xl font-bold font-display ${
                      isWhite ? 'text-slate-900' : 'text-white'
                    }`}
                  >
                    Request a Quote
                  </h2>
                  {preselectedTitle && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium bg-brand-500/15 text-brand-400 border border-brand-500/30">
                      <Tag className="w-3 h-3" />
                      {preselectedTitle}
                    </span>
                  )}
                </div>
                <p
                  className={`text-xs sm:text-sm mt-1 max-w-lg ${
                    isWhite ? 'text-slate-600' : 'text-slate-300'
                  }`}
                >
                  Tell us about your project requirements and our survey team will review your specifications to provide a tailored quotation.
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className={`p-2 rounded-xl transition-colors shrink-0 ml-2 ${
                isWhite
                  ? 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form or Success State */}
          <div className="flex-1 overflow-y-auto pr-1">
            {isSubmitted ? (
              <div className="py-8 flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/40">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3
                  className={`text-2xl font-bold font-display ${
                    isWhite ? 'text-slate-900' : 'text-white'
                  }`}
                >
                  Quote Request Sent to Mail
                </h3>
                <p
                  className={`text-sm max-w-md leading-relaxed ${
                    isWhite ? 'text-slate-600' : 'text-slate-300'
                  }`}
                >
                  Thank you, <strong>{firstName} {lastName}</strong>. Your quotation request has been addressed and dispatched to{' '}
                  <strong className="text-brand-400 font-mono">mail@fasttracksurveys.co.uk</strong>.
                </p>

                {/* Summary Card */}
                <div
                  className={`w-full max-w-md text-left p-4 rounded-2xl text-xs font-mono space-y-1.5 border ${
                    isWhite
                      ? 'bg-slate-50 border-slate-200 text-slate-700'
                      : 'bg-slate-800/60 border-slate-700 text-slate-300'
                  }`}
                >
                  <div>
                    <span className="text-slate-400">Recipient:</span>{' '}
                    <strong className="text-brand-400">mail@fasttracksurveys.co.uk</strong>
                  </div>
                  <div>
                    <span className="text-slate-400">Client:</span> {firstName} {lastName}
                    {companyName ? ` (${companyName})` : ''}
                  </div>
                  <div>
                    <span className="text-slate-400">Email:</span> {emailAddress}
                  </div>
                  {phone && (
                    <div>
                      <span className="text-slate-400">Phone:</span> {phone}
                    </div>
                  )}
                  {preselectedTitle && (
                    <div>
                      <span className="text-slate-400">Service:</span> {preselectedTitle}
                    </div>
                  )}
                  {files.length > 0 && (
                    <div className="pt-1 text-[11px] text-brand-400">
                      {files.length} document{files.length > 1 ? 's' : ''} specified ({files.map((f) => f.name).join(', ')})
                    </div>
                  )}
                </div>

                {/* Quick Action Buttons for Mail */}
                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <a
                    href={mailtoUrl}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-mono font-bold text-xs transition-colors shadow-md"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Open in Email App</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>

                  <button
                    onClick={copySummary}
                    className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-mono text-xs border transition-colors ${
                      isWhite
                        ? 'border-slate-300 hover:bg-slate-100 text-slate-700'
                        : 'border-slate-700 hover:bg-slate-800 text-slate-200'
                    }`}
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span className="text-emerald-400">Copied to Clipboard!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Copy Email Summary</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={resetForm}
                    className={`px-5 py-2.5 rounded-xl font-mono text-xs transition-colors ${
                      isWhite
                        ? 'bg-slate-200 hover:bg-slate-300 text-slate-800'
                        : 'bg-slate-800 hover:bg-slate-700 text-white'
                    }`}
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Row 1: First Name & Last Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      className={`block text-xs font-mono mb-1.5 font-medium flex items-center gap-1.5 ${
                        isWhite ? 'text-slate-700' : 'text-slate-300'
                      }`}
                    >
                      <User className="w-3.5 h-3.5 text-brand-400" />
                      <span>First Name *</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sarah"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className={`w-full rounded-xl px-3.5 py-2.5 text-xs font-mono focus:outline-none transition-colors ${
                        isWhite
                          ? 'bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 focus:bg-white focus:border-brand-500'
                          : 'bg-slate-800/90 border border-slate-700 text-white placeholder-slate-500 focus:border-brand-500'
                      }`}
                    />
                  </div>

                  <div>
                    <label
                      className={`block text-xs font-mono mb-1.5 font-medium flex items-center gap-1.5 ${
                        isWhite ? 'text-slate-700' : 'text-slate-300'
                      }`}
                    >
                      <User className="w-3.5 h-3.5 text-brand-400" />
                      <span>Last Name *</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Jenkins"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className={`w-full rounded-xl px-3.5 py-2.5 text-xs font-mono focus:outline-none transition-colors ${
                        isWhite
                          ? 'bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 focus:bg-white focus:border-brand-500'
                          : 'bg-slate-800/90 border border-slate-700 text-white placeholder-slate-500 focus:border-brand-500'
                      }`}
                    />
                  </div>
                </div>

                {/* Row 2: Company Name & Email Address */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      className={`block text-xs font-mono mb-1.5 font-medium flex items-center gap-1.5 ${
                        isWhite ? 'text-slate-700' : 'text-slate-300'
                      }`}
                    >
                      <Building2 className="w-3.5 h-3.5 text-brand-400" />
                      <span>Company Name</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Transport Planning Ltd"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className={`w-full rounded-xl px-3.5 py-2.5 text-xs font-mono focus:outline-none transition-colors ${
                        isWhite
                          ? 'bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 focus:bg-white focus:border-brand-500'
                          : 'bg-slate-800/90 border border-slate-700 text-white placeholder-slate-500 focus:border-brand-500'
                      }`}
                    />
                  </div>

                  <div>
                    <label
                      className={`block text-xs font-mono mb-1.5 font-medium flex items-center gap-1.5 ${
                        isWhite ? 'text-slate-700' : 'text-slate-300'
                      }`}
                    >
                      <Mail className="w-3.5 h-3.5 text-brand-400" />
                      <span>Email Address *</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. s.jenkins@company.co.uk"
                      value={emailAddress}
                      onChange={(e) => setEmailAddress(e.target.value)}
                      className={`w-full rounded-xl px-3.5 py-2.5 text-xs font-mono focus:outline-none transition-colors ${
                        isWhite
                          ? 'bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 focus:bg-white focus:border-brand-500'
                          : 'bg-slate-800/90 border border-slate-700 text-white placeholder-slate-500 focus:border-brand-500'
                      }`}
                    />
                  </div>
                </div>

                {/* Row 3: Phone */}
                <div>
                  <label
                    className={`block text-xs font-mono mb-1.5 font-medium flex items-center gap-1.5 ${
                      isWhite ? 'text-slate-700' : 'text-slate-300'
                    }`}
                  >
                    <Phone className="w-3.5 h-3.5 text-brand-400" />
                    <span>Phone Number (Optional)</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="e.g. +44 (0)7767 597947"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={`w-full rounded-xl px-3.5 py-2.5 text-xs font-mono focus:outline-none transition-colors ${
                      isWhite
                        ? 'bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 focus:bg-white focus:border-brand-500'
                        : 'bg-slate-800/90 border border-slate-700 text-white placeholder-slate-500 focus:border-brand-500'
                    }`}
                  />
                </div>

                {/* Row 4: Your Enquiry */}
                <div>
                  <label
                    className={`block text-xs font-mono mb-1.5 font-medium flex items-center gap-1.5 ${
                      isWhite ? 'text-slate-700' : 'text-slate-300'
                    }`}
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-brand-400" />
                    <span>Your Enquiry *</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us about the survey type, location or boundary, preferred dates, required outputs or any questions..."
                    value={enquiry}
                    onChange={(e) => setEnquiry(e.target.value)}
                    className={`w-full rounded-xl px-3.5 py-2.5 text-xs font-mono focus:outline-none transition-colors ${
                      isWhite
                        ? 'bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 focus:bg-white focus:border-brand-500'
                        : 'bg-slate-800/90 border border-slate-700 text-white placeholder-slate-500 focus:border-brand-500'
                    }`}
                  />
                </div>

                {/* Row 5: Attach Files (PDF, PPT, Word, Excel, Images) - Optional */}
                <div>
                  <label
                    className={`block text-xs font-mono mb-1.5 font-medium flex items-center justify-between ${
                      isWhite ? 'text-slate-700' : 'text-slate-300'
                    }`}
                  >
                    <span className="flex items-center gap-1.5">
                      <UploadCloud className="w-3.5 h-3.5 text-brand-400" />
                      Attach Files / Brief Documents (Optional)
                    </span>
                    <span className="text-[11px] text-slate-500 font-normal">
                      PDF, PPT, Word, Excel, CSV, Images
                    </span>
                  </label>

                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept=".pdf,.ppt,.pptx,.doc,.docx,.xls,.xlsx,.csv,.png,.jpg,.jpeg"
                    onChange={(e) => handleFiles(e.target.files)}
                    className="hidden"
                  />

                  {/* Drop zone */}
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-2xl p-4 text-center cursor-pointer transition-all ${
                      isDragging
                        ? 'border-brand-500 bg-brand-500/10'
                        : isWhite
                        ? 'border-slate-300 bg-slate-50/70 hover:bg-slate-100 hover:border-brand-500'
                        : 'border-slate-700 bg-slate-800/40 hover:bg-slate-800/80 hover:border-brand-500'
                    }`}
                  >
                    <UploadCloud className="w-6 h-6 text-brand-400 mx-auto mb-1.5" />
                    <p
                      className={`text-xs font-mono font-medium ${
                        isWhite ? 'text-slate-800' : 'text-slate-200'
                      }`}
                    >
                      Click to upload or drag & drop files
                    </p>
                    <p
                      className={`text-[11px] mt-0.5 ${
                        isWhite ? 'text-slate-500' : 'text-slate-400'
                      }`}
                    >
                      Attach site plans, project briefs, PPT presentations or PDF specifications
                    </p>
                  </div>

                  {/* Uploaded File List */}
                  {files.length > 0 && (
                    <div className="mt-2.5 space-y-1.5">
                      {files.map((file, idx) => (
                        <div
                          key={`${file.name}-${idx}`}
                          className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-mono transition-colors ${
                            isWhite
                              ? 'bg-slate-100 border border-slate-200 text-slate-800'
                              : 'bg-slate-800/80 border border-slate-700 text-slate-200'
                          }`}
                        >
                          <div className="flex items-center gap-2 overflow-hidden pr-2">
                            {getFileIcon(file.name)}
                            <span className="truncate">{file.name}</span>
                            <span className="text-[10px] text-slate-400 shrink-0">
                              ({formatFileSize(file.size)})
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeFile(idx);
                            }}
                            className="text-slate-400 hover:text-rose-400 p-1 rounded-lg transition-colors shrink-0"
                            aria-label={`Remove ${file.name}`}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Submit Button & Disclaimer */}
                <div
                  className={`pt-3 border-t space-y-2.5 ${
                    isWhite ? 'border-slate-200' : 'border-slate-800'
                  }`}
                >
                  <button
                    type="submit"
                    disabled={isSending}
                    className="w-full bg-brand-500 hover:bg-brand-600 disabled:opacity-70 text-white font-mono font-bold text-xs sm:text-sm py-3.5 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 hover:-translate-y-0.5 active:translate-y-0"
                  >
                    {isSending ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Sending Quote Request to Mail...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Quote Request</span>
                      </>
                    )}
                  </button>

                  <p
                    className={`text-center text-[11px] font-mono leading-relaxed px-2 ${
                      isWhite ? 'text-slate-500' : 'text-slate-400'
                    }`}
                  >
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
