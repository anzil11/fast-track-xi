import React from 'react';
import { ShieldCheck, Lock, Eye, FileText, CheckCircle2 } from 'lucide-react';
import { useNavigation } from '../context/NavigationContext';

export default function PrivacyPolicyPage() {
  const { navigateTo } = useNavigation();

  return (
    <div className="relative min-h-screen text-slate-100 pt-8 pb-24 overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-6">
          <button onClick={() => navigateTo('home')} className="hover:text-white transition-colors">
            HOME
          </button>
          <span>/</span>
          <span className="text-white font-bold">PRIVACY POLICY</span>
        </div>

        <div className="rounded-3xl glass-panel p-8 sm:p-12 border border-slate-800 shadow-2xl space-y-8">
          
          <div className="border-b border-slate-800 pb-6">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-2">
              <ShieldCheck className="w-4 h-4" />
              <span>UK GDPR & DATA PROTECTION COMPLIANCE</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold font-display text-white">
              Privacy Policy
            </h1>
            <p className="text-xs font-mono text-slate-400 mt-2">
              Last Updated: October 2024 • Fast Track Surveys Ltd
            </p>
          </div>

          <section className="space-y-4 text-sm text-slate-300 leading-relaxed">
            <h3 className="text-xl font-bold font-display text-white">1. Introduction</h3>
            <p>
              Your privacy is paramount to us at Fast Track Surveys Ltd ("the Company"). We believe it is essential that you know what personal data we collect from you, why we collect it, how we use it, and what rights you are entitled to as a data subject under the UK General Data Protection Regulation (UK GDPR) and Data Protection Act 2018.
            </p>
            <p>
              Fast Track Surveys is committed to ensuring your privacy is protected. Should we request certain information when using this website (https://www.fasttracksurveys.co.uk) or engaging in our field surveys, you can be confident that it will strictly be handled in accordance with this privacy statement.
            </p>
          </section>

          <section className="space-y-4 text-sm text-slate-300 leading-relaxed">
            <h3 className="text-xl font-bold font-display text-white">2. How We Collect & Use Personal Data</h3>
            <p>
              Fast Track Surveys collects personal data in several ways for legitimate commercial and statistical purposes:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-slate-300">
              <li><strong>Website Visits & Connectivity:</strong> IP addresses, browser specifications, device identifiers, session durations, and referral traffic to measure site health and performance.</li>
              <li><strong>Inquiry & Consultation Forms:</strong> Name, professional email address, telephone number, and company name to fulfill survey quotation requests.</li>
              <li><strong>On-Street & Household Research:</strong> Demographic strata, origin-destination travel routes, and modal preferences gathered with explicit participant consent adhering to the Market Research Society (MRS) Code of Conduct.</li>
            </ul>
          </section>

          <section className="space-y-4 text-sm text-slate-300 leading-relaxed">
            <h3 className="text-xl font-bold font-display text-white">3. Information Security & Storage</h3>
            <p>
              We enforce appropriate physical, managerial, and cryptographic safeguards to protect against unauthorized access, alteration, or disclosure of survey datasets. All digital survey tablets (CAPI) are encrypted with zero local storage retention after cloud synchronization.
            </p>
          </section>

          <section className="space-y-4 text-sm text-slate-300 leading-relaxed">
            <h3 className="text-xl font-bold font-display text-white">4. Your Data Subject Rights</h3>
            <p>
              Under UK GDPR, you retain the right to request access to your data, rectify inaccuracies, request erasure, or withdraw consent at any time without detriment. For any inquiries regarding personal data, contact:
            </p>
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-mono text-slate-300 space-y-1">
              <div><strong>Data Protection Officer</strong></div>
              <div>Fast Track Surveys Ltd</div>
              <div>86-90 Paul Street, London, England, EC2A 4NE</div>
              <div>Email: <a href="mailto:mail@fasttracksurveys.co.uk" className="text-cyan-400 underline">mail@fasttracksurveys.co.uk</a></div>
            </div>
          </section>

        </div>

      </div>
    </div>
  );
}
