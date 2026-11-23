import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Phone,
  Mail,
  MapPin,
  Building2,
  ShieldCheck,
  Zap,
  ArrowRight,
  CheckCircle2,
  FileText,
  Activity
} from 'lucide-react';
import { useNavigation } from '../context/NavigationContext';
import { useTheme } from '../context/ThemeContext';
import { servicesData } from '../data/servicesData';
import { companyInfo } from '../data/companyData';
import logoMark from '../img/logo-mark.png';

export default function Footer() {
  const { navigateTo, openQuoteModal, setIsQuoteModalOpen } = useNavigation();
  const { isWhite } = useTheme();

  const handleDiscussSurvey = () => {
    if (openQuoteModal) {
      openQuoteModal(null);
    } else if (setIsQuoteModalOpen) {
      setIsQuoteModalOpen(true);
    } else {
      navigateTo('contact');
    }
  };

  return (
    <footer className="relative border-t transition-colors duration-300 bg-[#0b2a49] border-white/15 text-white overflow-hidden shadow-[0_-10px_35px_rgba(11,42,73,0.25)]">
      {/* Background Decorative Pattern & Ambient Light Halos */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-64 bg-cyan-300/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-64 bg-white/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Main Footer Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-12">

        {/* Main Footer Grid with Proportional Columns (Wide Contact Column for Full Email Display) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-12 border-b border-white/20">

          {/* Column 1: Company Profile (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div
              onClick={() => navigateTo('home')}
              className="cursor-pointer flex items-center gap-3 group"
            >
              <div className="relative w-9 h-9 rounded-xl bg-white p-[1.5px] shadow-md group-hover:shadow-lg transition-shadow">
                <div className="w-full h-full rounded-[9.5px] flex items-center justify-center overflow-hidden bg-white">
                  <img
                    src={logoMark}
                    alt="FAST TRACK TRANSPORT RESEARCH LTD Logo"
                    className="w-6 h-6 object-contain group-hover:scale-110 group-hover:rotate-3 transition-all duration-300"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold font-nexa transition-colors text-white group-hover:text-cyan-100">
                  Fast<span className="text-cyan-200">Track</span>
                </span>
                <span className="text-[8.5px] font-nexa font-semibold tracking-widest uppercase text-white/90">
                  TRANSPORT RESEARCH
                </span>
              </div>
            </div>

            <p className="text-sm leading-relaxed text-white/90">
              FAST TRACK TRANSPORT RESEARCH LTD provides traffic, transport, parking and interview surveys. We organise fieldwork around your project requirements and deliver clear data to support planning and operational decisions.
            </p>

            <div className="pt-2 flex flex-col gap-2 text-xs font-mono">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border w-fit bg-white/15 backdrop-blur-sm border-white/25 text-white shadow-sm">
                <Building2 className="w-4 h-4 text-cyan-200 shrink-0" />
                <span>Company No: <strong className="text-white font-bold">{companyInfo.companyNumber}</strong></span>
              </div>
            </div>
          </div>

          {/* Column 2: Navigation Links (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest mb-4 border-b pb-2 flex items-center gap-2 border-white/25 text-white">
              <span className="w-2 h-2 rounded-full bg-white shadow-[0_0_8px_#ffffff]" />
              <span>NAVIGATION</span>
            </h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { name: 'Home', path: '/', page: 'home' },
                { name: 'About Us', path: '/about', page: 'about' },
                { name: 'Services Overview', path: '/services', page: 'services' },
                { name: 'Careers', path: '/careers', page: 'careers' },
                { name: 'Contact & Quotation', path: '/contact', page: 'contact' }
              ].map((item) => (
                <li key={item.name}>
                  <a
                    href={item.path}
                    onClick={(e) => {
                      e.preventDefault();
                      navigateTo(item.page);
                    }}
                    className="inline-flex items-center gap-2 transition-all hover:translate-x-1 group text-white/90 hover:text-white font-medium"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-200 group-hover:bg-white group-hover:scale-125 transition-transform" />
                    <span>{item.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Survey Services (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest mb-4 border-b pb-2 flex items-center gap-2 border-white/25 text-white">
              <span className="w-2 h-2 rounded-full bg-white shadow-[0_0_8px_#ffffff]" />
              <span>SURVEYS</span>
            </h4>
            <ul className="space-y-2.5 text-sm">
              {servicesData.map((svc) => (
                <li key={svc.id}>
                  <a
                    href={`/services/${svc.slug}`}
                    onClick={(e) => {
                      e.preventDefault();
                      navigateTo('service-detail', svc);
                    }}
                    className="transition-all text-left flex items-center gap-2 group hover:translate-x-1 text-white/90 hover:text-white font-medium"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-200 group-hover:bg-white group-hover:scale-125 transition-transform shrink-0" />
                    <span className="truncate">{svc.title}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & London HQ Details (4 cols - Extra Wide for Full Email Visibility) */}
          <div className="lg:col-span-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest mb-4 border-b pb-2 flex items-center gap-2 border-white/25 text-white">
              <span className="w-2 h-2 rounded-full bg-white shadow-[0_0_8px_#ffffff]" />
              <span>REGISTERED OFFICE & CONTACT</span>
            </h4>

            <div className="p-4 sm:p-5 rounded-2xl space-y-4 text-sm border shadow-md bg-white/10 backdrop-blur-md border-white/20 text-white">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-cyan-300 mt-1 shrink-0" />
                <div className="text-white text-xs leading-relaxed">
                  <p className="font-bold text-white tracking-wide text-sm">FAST TRACK TRANSPORT RESEARCH LTD</p>
                  <p className="text-white/90 mt-1">124 City Road, London, EC1V 2NX</p>
                  <p className="text-white/70">United Kingdom</p>
                </div>
              </div>

              <div className="pt-3 border-t flex items-center gap-3 border-white/15">
                <Phone className="w-4 h-4 text-cyan-300 shrink-0" />
                <div>
                  <span className="block text-[10px] text-white/60 uppercase font-mono tracking-wider">Phone</span>
                  <a
                    href="tel:+447767597947"
                    className="font-mono text-xs transition-colors text-white hover:text-cyan-200 font-semibold"
                  >
                    +447942676213
                  </a>
                </div>
              </div>

              <div className="pt-3 border-t flex items-start gap-3 border-white/15">
                <Mail className="w-4 h-4 text-cyan-300 shrink-0 mt-1" />
                <div className="flex-1 min-w-0">
                  <span className="block text-[10px] text-white/60 uppercase font-mono tracking-wider">Direct Email</span>
                  <a
                    href="mailto:enquiries@fasttracktransportresearch.com"
                    className="font-mono text-xs text-white hover:text-cyan-200 font-semibold break-all leading-normal block select-all transition-colors underline decoration-cyan-400/40 hover:decoration-cyan-400"
                  >
                    enquiries@fasttracktransportresearch.com
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Legal & Copyright Bar with Live Coverage Pill */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-white/80">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <span className="text-white/85">© {new Date().getFullYear()} FAST TRACK TRANSPORT RESEARCH LTD. Registered in England & Wales #17595521.</span>
            <div className="hidden md:flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-white/15 border border-white/25 text-[10px] text-white shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-300 animate-pulse" />
              <span className="font-semibold">UK-WIDE FIELD SURVEYS</span>
            </div>
          </div>

          <div className="flex items-center gap-4 sm:gap-6 text-white/85 flex-wrap justify-center">
            <button
              onClick={() => navigateTo('policies')}
              className="transition-colors hover:text-white hover:underline text-white/85"
            >
              Privacy Policy
            </button>
            <span className="text-white/40">•</span>
            <button
              onClick={() => navigateTo('terms')}
              className="transition-colors hover:text-white hover:underline text-white/85"
            >
              Terms & Conditions
            </button>
            <span className="text-white/40">•</span>
            <button
              onClick={() => {
                localStorage.removeItem('fasttrack_terms_cookie_consent');
                window.dispatchEvent(new Event('openTermsCookieConsent'));
              }}
              className="transition-colors hover:text-white hover:underline text-white/85"
            >
              Cookie &amp; Terms Preferences
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
