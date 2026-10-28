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
    <footer className="relative border-t transition-colors duration-300 bg-gradient-to-b from-[#070d1e] via-[#091127] to-[#040711] border-[#26335d]/70 text-white overflow-hidden">
      {/* Background Decorative Pattern & Logo-Brand Ambient Light Halos */}
      <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none" />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-64 bg-[#2ea3d9]/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-64 bg-[#016a97]/15 rounded-full blur-[100px] pointer-events-none" />

      {/* Main Footer Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">

        {/* Planning a Survey Block with Logo-Branded Glowing Border */}
        <div className="rounded-3xl p-[1px] mb-16 shadow-[0_20px_50px_rgba(2,6,18,0.5)] bg-gradient-to-r from-[#2ea3d9]/50 via-[#016a97]/40 to-[#26335d]/60">
          <div className="p-6 sm:p-10 rounded-[23px] flex flex-col lg:flex-row items-center justify-between gap-6 bg-gradient-to-r from-[#0b142d]/95 via-[#0e1a3b]/90 to-[#0b142d]/95 backdrop-blur-xl border border-white/5">
            <div className="max-w-2xl space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#2ea3d9] shadow-[0_0_8px_#2ea3d9]" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                  Ready for Fieldwork
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold font-display tracking-tight text-white">
                Planning a Survey?
              </h3>
              <p className="text-sm sm:text-base leading-relaxed text-white">
                Send us your location, preferred dates and the information you need to collect. We will review your requirements and discuss the next steps.
              </p>
            </div>

            <div className="shrink-0">
              <button
                onClick={handleDiscussSurvey}
                data-cursor="DISCUSS"
                className="shimmer-btn px-7 py-3.5 rounded-2xl bg-gradient-to-r from-[#016a97] via-[#0284c7] to-[#2ea3d9] hover:from-[#01557a] hover:to-[#2ea3d9] text-white font-mono font-bold text-xs tracking-wider transition-all shadow-lg flex items-center justify-center gap-2 hover:-translate-y-0.5 shadow-[0_0_20px_rgba(46,163,217,0.35)] hover:shadow-[0_0_25px_rgba(46,163,217,0.55)]"
              >
                <span>DISCUSS YOUR SURVEY</span>
                <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* 4-Column Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 pb-12 border-b border-[#26335d]/60">

          {/* Column 1: Company Profile */}
          <div className="space-y-4">
            <div
              onClick={() => navigateTo('home')}
              className="cursor-pointer flex items-center gap-3 group"
            >
              <div className="relative w-9 h-9 rounded-xl bg-gradient-to-tr from-[#016a97] via-[#2ea3d9] to-[#26335d] p-[1.5px] shadow-[0_0_15px_rgba(46,163,217,0.3)] group-hover:shadow-[0_0_20px_rgba(46,163,217,0.5)] transition-shadow">
                <div className="w-full h-full rounded-[9.5px] flex items-center justify-center overflow-hidden bg-[#091126]">
                  <img
                    src={logoMark}
                    alt="Fast Track Surveys Logo"
                    className="w-6 h-6 object-contain group-hover:scale-110 group-hover:rotate-3 transition-all duration-300"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold font-nexa transition-colors text-white group-hover:text-slate-100">
                  Fast<span className="text-[#2ea3d9]">Track</span>
                </span>
                <span className="text-[8.5px] font-nexa font-semibold tracking-widest uppercase text-white">
                  SURVEYS
                </span>
              </div>
            </div>

            <p className="text-sm leading-relaxed text-white">
              Fast Track Surveys provides traffic, transport, parking and interview surveys. We organise fieldwork around your project requirements and deliver clear data to support planning and operational decisions.
            </p>

            <div className="pt-2 flex flex-col gap-2 text-xs font-mono">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border w-fit bg-[#0b142d]/80 border-[#26335d]/70 text-white">
                <Building2 className="w-4 h-4 text-[#2ea3d9] shrink-0" />
                <span>Company No: <strong className="text-white">{companyInfo.companyNumber}</strong></span>
              </div>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest mb-4 border-b pb-2 flex items-center gap-2 border-[#26335d]/60 text-white">
              <span className="w-2 h-2 rounded-full bg-[#2ea3d9] shadow-[0_0_6px_#2ea3d9]" />
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
                    className="inline-flex items-center gap-1.5 transition-all hover:translate-x-1 group text-white hover:text-[#2ea3d9] font-medium"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#2ea3d9] group-hover:bg-white transition-colors" />
                    <span>{item.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: All 8 Services with Direct Navigation */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest mb-4 border-b pb-2 flex items-center gap-2 border-[#26335d]/60 text-white">
              <span className="w-2 h-2 rounded-full bg-[#2ea3d9] shadow-[0_0_6px_#2ea3d9]" />
              <span>SURVEY SERVICES</span>
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
                    className="transition-all text-left flex items-center gap-2 group hover:translate-x-1 text-white hover:text-[#2ea3d9] font-medium"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2ea3d9] group-hover:bg-white transition-colors shrink-0" />
                    <span className="truncate">{svc.title}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & London HQ Details */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest mb-4 border-b pb-2 flex items-center gap-2 border-[#26335d]/60 text-white">
              <span className="w-2 h-2 rounded-full bg-[#2ea3d9] shadow-[0_0_6px_#2ea3d9]" />
              <span>REGISTERED OFFICE</span>
            </h4>

            <div className="p-4 rounded-2xl space-y-3.5 text-sm border shadow-md bg-[#0b142d]/80 border-[#26335d]/70 text-white">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#2ea3d9] mt-1 shrink-0" />
                <div className="text-white">
                  <p className="font-semibold text-white">Fast Track Surveys Ltd</p>
                  <p className="text-white">86-90 Paul Street</p>
                  <p className="text-white">London, EC2A 4NE</p>
                  <p className="text-xs text-white/80">United Kingdom</p>
                </div>
              </div>

              <div className="pt-2 border-t flex items-center gap-2.5 border-[#26335d]/60">
                <Phone className="w-4 h-4 text-[#2ea3d9] shrink-0" />
                <a
                  href="tel:+447767597947"
                  className="font-mono text-xs transition-colors text-white hover:text-[#2ea3d9] font-medium"
                >
                  +44 (0)7767 597947
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#2ea3d9] shrink-0" />
                <a
                  href="mailto:mail@fasttracksurveys.co.uk"
                  className="font-mono text-xs truncate transition-colors text-white hover:text-[#2ea3d9] font-medium"
                >
                  mail@fasttracksurveys.co.uk
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Legal & Copyright Bar with Live Coverage Pill */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-white">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <span className="text-white">© {new Date().getFullYear()} Fast Track Surveys Ltd. Registered in England & Wales #13702594.</span>
            <div className="hidden md:flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#0e1a3a] border border-[#26335d] text-[10px] text-white">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2ea3d9] animate-pulse" />
              <span className="font-semibold">UK-WIDE FIELD SURVEYS</span>
            </div>
          </div>

          <div className="flex items-center gap-6 text-white">
            <button
              onClick={() => navigateTo('policies')}
              className="transition-colors hover:text-[#2ea3d9] text-white"
            >
              Privacy Policy
            </button>
            <span className="text-white/60">•</span>
            <button
              onClick={() => navigateTo('terms')}
              className="transition-colors hover:text-[#2ea3d9] text-white"
            >
              Terms & Conditions
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
