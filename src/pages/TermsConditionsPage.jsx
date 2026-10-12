import React from 'react';
import { FileText, ShieldAlert, CheckCircle2, Building2 } from 'lucide-react';
import { useNavigation } from '../context/NavigationContext';

export default function TermsConditionsPage() {
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
          <span className="text-white font-bold">TERMS & CONDITIONS</span>
        </div>

        <div className="rounded-3xl glass-panel p-8 sm:p-12 border border-slate-800 shadow-2xl space-y-8">
          
          <div className="border-b border-slate-800 pb-6">
            <div className="flex items-center gap-2 text-xs font-mono text-brand-400 mb-2">
              <FileText className="w-4 h-4" />
              <span>COMMERCIAL TERMS OF SERVICE</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold font-display text-white">
              Terms and Conditions
            </h1>
            <p className="text-xs font-mono text-slate-400 mt-2">
              Fast Track Surveys Ltd • Company Number: 13702594
            </p>
          </div>

          {/* Section 1: CONTRACT */}
          <section className="space-y-3 text-sm text-slate-300 leading-relaxed">
            <h3 className="text-xl font-bold font-display text-white">1. Contract</h3>
            <p>
              <strong>1.1.</strong> The Order is regarded as accepted only on the date and the time that Fast Track Surveys Ltd ("the Company") issues a formal written acceptance of the Order.
            </p>
            <p>
              <strong>1.2.</strong> These Conditions exclude any additional terms that the Client might try to impose or incorporate, or that are implied by trade, custom, practice, or course of dealing.
            </p>
            <p>
              <strong>1.3.</strong> By placing an Order, you are making an offer to acquire Surveying Services in accordance with these formal Terms.
            </p>
            <p>
              <strong>1.4.</strong> Quotations issued by the Company are valid for thirty (30) days from the date of issuance, after which they are considered withdrawn unless confirmed in writing by the Company.
            </p>
          </section>

          {/* Section 2: SERVICES */}
          <section className="space-y-3 text-sm text-slate-300 leading-relaxed">
            <h3 className="text-xl font-bold font-display text-white">2. Services</h3>
            <p>
              <strong>2.1.</strong> The Company retains the right to alter the scope of the Services if necessary to comply with any relevant highway authority laws, health & safety regulations, or police directions.
            </p>
            <p>
              <strong>2.2.</strong> The Company delivers services with reasonable skill, care, and professional diligence in accordance with the Market Research Society (MRS) standards.
            </p>
            <p>
              <strong>2.3.</strong> Reasonable efforts will be made to fulfill survey mobilization and deliverable performance deadlines stated in the agreed Quotation.
            </p>
            <p>
              <strong>2.4.</strong> Target dates and times are approximations subject to extreme weather interruptions or unforeseen on-street highway closures.
            </p>
          </section>

          {/* Section 3: CANCELLATION */}
          <section className="space-y-3 text-sm text-slate-300 leading-relaxed">
            <h3 className="text-xl font-bold font-display text-white">3. Cancellation</h3>
            <p>
              <strong>3.1.</strong> The Company reserves the right to impose cancellation charges to cover field logistics, equipment deployment, and pre-booking expenses incurred prior to written notice.
            </p>
            <p>
              <strong>3.2.</strong> The Client will be liable for the full fee for services rendered or field surveys completed prior to cancellation receipt.
            </p>
            <p>
              <strong>3.3.</strong> All cancellation notices must be provided to the Company in writing via official email to <code>mail@fasttracksurveys.co.uk</code>.
            </p>
          </section>

          {/* Section 4: CHARGES & INVOICING */}
          <section className="space-y-3 text-sm text-slate-300 leading-relaxed">
            <h3 className="text-xl font-bold font-display text-white">4. Charges & Invoicing</h3>
            <p>
              <strong>4.1.</strong> Customers shall pay for services performed at the rate agreed upon in the written quotation or formal scope schedule.
            </p>
            <p>
              <strong>4.2.</strong> The aforementioned charges include agreed equipment rigging, data QA auditing, and technical reporting administration.
            </p>
            <p>
              <strong>4.3.</strong> Invoices shall be payable within thirty (30) days from the date of issuance to the Company's nominated UK bank account.
            </p>
          </section>

        </div>

      </div>
    </div>
  );
}
