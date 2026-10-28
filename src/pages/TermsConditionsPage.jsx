import React from 'react';
import { FileText } from 'lucide-react';
import { useNavigation } from '../context/NavigationContext';

export default function TermsConditionsPage() {
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
          <span className="text-white font-bold">TERMS & CONDITIONS</span>
        </nav>

        <div className="rounded-3xl luxury-glass p-8 sm:p-12 border border-slate-700/60 shadow-2xl space-y-8 relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent pointer-events-none" />
          
          <div className="border-b border-slate-700/60 pb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/30 text-xs font-mono text-cyan-400 mb-3">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              <FileText className="w-3.5 h-3.5" />
              <span className="font-semibold tracking-wider">COMMERCIAL TERMS OF SERVICE</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black font-display">
              <span className="text-gradient-silver">Terms &amp;</span>{' '}
              <span className="text-gradient-cyan">Conditions</span>
            </h1>
            <p className="text-xs font-mono text-slate-400 mt-2">
              Fast Track Surveys Ltd • Company Number: 13702594
            </p>
          </div>

          {/* Section 1: CONTRACT */}
          <section className="space-y-3 text-sm text-slate-300 leading-relaxed">
            <h2 className="text-xl font-bold font-display text-white">1. Contract</h2>
            <p>
              <strong>1.1.</strong> An order is regarded as accepted only on the date and time that Fast Track Surveys Ltd ("the Company") issues a formal written confirmation or agreement of the survey brief.
            </p>
            <p>
              <strong>1.2.</strong> These conditions exclude any additional terms that the client may seek to impose, unless expressly agreed in writing by the Company.
            </p>
            <p>
              <strong>1.3.</strong> By confirming an order or instruction, you agree to acquire surveying services in accordance with these terms.
            </p>
            <p>
              <strong>1.4.</strong> Quotations issued by the Company are valid for thirty (30) days from the date of issue, after which they are subject to reconfirmation.
            </p>
          </section>

          {/* Section 2: SERVICES */}
          <section className="space-y-3 text-sm text-slate-300 leading-relaxed">
            <h2 className="text-xl font-bold font-display text-white">2. Services</h2>
            <p>
              <strong>2.1.</strong> The Company retains the right to modify the fieldwork arrangements where necessary to comply with safety requirements, highway authority regulations, or police instructions.
            </p>
            <p>
              <strong>2.2.</strong> The Company delivers services with reasonable skill, care, and professional diligence.
            </p>
            <p>
              <strong>2.3.</strong> Fieldwork dates and delivery schedules are agreed with the client prior to commencing work.
            </p>
            <p>
              <strong>2.4.</strong> Survey dates and times may be subject to adjustment in the event of severe adverse weather, unexpected road closures, or safety-critical site conditions.
            </p>
          </section>

          {/* Section 3: CANCELLATION */}
          <section className="space-y-3 text-sm text-slate-300 leading-relaxed">
            <h2 className="text-xl font-bold font-display text-white">3. Cancellation</h2>
            <p>
              <strong>3.1.</strong> The Company reserves the right to charge reasonable cancellation fees to cover site planning, staff scheduling, or permit expenses incurred prior to written cancellation.
            </p>
            <p>
              <strong>3.2.</strong> The client remains liable for the proportion of services completed or fieldwork undertaken prior to receipt of written cancellation.
            </p>
            <p>
              <strong>3.3.</strong> Cancellation notices must be submitted in writing via email to <code>mail@fasttracksurveys.co.uk</code>.
            </p>
          </section>

          {/* Section 4: CHARGES & INVOICING */}
          <section className="space-y-3 text-sm text-slate-300 leading-relaxed">
            <h2 className="text-xl font-bold font-display text-white">4. Charges & Invoicing</h2>
            <p>
              <strong>4.1.</strong> Fees will be invoiced at the rate and schedule agreed upon in the written quotation or project specification.
            </p>
            <p>
              <strong>4.2.</strong> Unless otherwise agreed in writing, invoices are payable within thirty (30) days from the date of issue.
            </p>
          </section>

        </div>

      </div>
    </div>
  );
}
