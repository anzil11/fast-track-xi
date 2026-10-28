import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { useNavigation } from '../context/NavigationContext';

export default function PrivacyPolicyPage() {
  const { navigateTo } = useNavigation();

  return (
    <div className="relative min-h-screen text-slate-100 pt-8 pb-24 overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-6">
          <button onClick={() => navigateTo('home')} className="hover:text-white transition-colors">
            HOME
          </button>
          <span>/</span>
          <span className="text-white font-bold">PRIVACY POLICY</span>
        </nav>

        <div className="rounded-3xl luxury-glass p-8 sm:p-12 border border-slate-700/60 shadow-2xl space-y-8 relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent pointer-events-none" />
          
          <div className="border-b border-slate-700/60 pb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/30 text-xs font-mono text-cyan-400 mb-3">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              <ShieldCheck className="w-3.5 h-3.5" />
              <span className="font-semibold tracking-wider">DATA PROTECTION & PRIVACY STATEMENT</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black font-display">
              <span className="text-gradient-silver">Privacy</span>{' '}
              <span className="text-gradient-cyan">Policy</span>
            </h1>
            <p className="text-xs font-mono text-slate-400 mt-2">
              Last Updated: October 2026 • Fast Track Surveys Ltd
            </p>
          </div>

          <section className="space-y-4 text-sm text-slate-300 leading-relaxed">
            <h2 className="text-xl font-bold font-display text-white">1. Introduction</h2>
            <p>
              Fast Track Surveys Ltd ("the Company") is committed to protecting the privacy of our website visitors and clients. This privacy statement explains how we collect, store, and process personal data in accordance with the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018.
            </p>
            <p>
              When you use this website or enquire about our survey services, any information you provide is handled strictly in accordance with this policy.
            </p>
          </section>

          <section className="space-y-4 text-sm text-slate-300 leading-relaxed">
            <h2 className="text-xl font-bold font-display text-white">2. Information We Collect</h2>
            <p>
              We collect information to respond to enquiries, discuss survey scopes, and plan fieldwork:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-slate-300">
              <li><strong>Website Enquiries:</strong> Name, professional email address, telephone number, company or organisation name, and project specifications provided when requesting a quotation or sending an enquiry.</li>
              <li><strong>Website Analytics & Performance:</strong> Aggregated, non-identifying data on site traffic, browser types, and pages visited to help improve navigation and site usability.</li>
              <li><strong>Survey Fieldwork:</strong> Any questionnaire responses, observational counts, or interview data are collected in accordance with agreed project briefs and relevant data handling agreements.</li>
            </ul>
          </section>

          <section className="space-y-4 text-sm text-slate-300 leading-relaxed">
            <h2 className="text-xl font-bold font-display text-white">3. Data Security & Handling</h2>
            <p>
              We implement appropriate technical and organisational measures to protect survey datasets and project information against unauthorised access, alteration, or disclosure. Survey data is processed and stored on secure systems in line with project requirements and client agreements.
            </p>
          </section>

          <section className="space-y-4 text-sm text-slate-300 leading-relaxed">
            <h2 className="text-xl font-bold font-display text-white">4. Your Data Rights & Enquiries</h2>
            <p>
              Under UK GDPR, you have the right to request access to personal data held about you, request corrections, or ask for your information to be deleted. For questions about this policy or our data handling arrangements, contact:
            </p>
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-mono text-slate-300 space-y-1">
              <div><strong>Privacy & Data Enquiries</strong></div>
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
