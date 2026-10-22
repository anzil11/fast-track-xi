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
    <footer className={`relative border-t transition-colors duration-300 ${isWhite
        ? 'bg-slate-50 border-slate-200 text-slate-600'
        : 'bg-slate-950 border-slate-800 text-slate-400'
      } overflow-hidden`}>
      {/* Background Decorative Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-64 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Footer Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">

        {/* Planning a Survey Block (Audit Section 11) */}
        <div className="rounded-3xl glass-panel p-6 sm:p-10 border border-slate-800 mb-16 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="max-w-2xl space-y-2">
            <h3 className="text-2xl sm:text-3xl font-bold font-display text-white tracking-tight">
              Planning a Survey?
            </h3>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Send us your location, preferred dates and the information you need to collect. We will review your requirements and discuss the next steps.
            </p>
          </div>

          <div className="shrink-0">
            <button
              onClick={handleDiscussSurvey}
              className="px-7 py-3.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-mono font-bold text-xs tracking-wider transition-all shadow-lg flex items-center justify-center gap-2 hover:-translate-y-0.5"
            >
              <span>Discuss Your Survey</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 4-Column Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 pb-12 border-b border-slate-800">

          {/* Column 1: Company Profile */}
          <div className="space-y-4">
            <div
              onClick={() => navigateTo('home')}
              className="cursor-pointer flex items-center gap-3 group"
            >
              <div className="relative w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 via-sky-500 to-cyan-400 p-[1px] shadow-md group-hover:shadow-lg transition-shadow">
                <div className="w-full h-full rounded-[11px] bg-slate-950 flex items-center justify-center overflow-hidden">
                  <img
                    src={logoMark}
                    alt="Fast Track Surveys Logo"
                    className="w-6 h-6 object-contain group-hover:scale-110 group-hover:rotate-3 transition-all duration-300"
                  />
                </div>
              </div>
              <span className="text-xl font-bold font-nexa text-white group-hover:text-slate-100 transition-colors">
                Fast<span className="text-[#2ea3d9]">Track</span>
              </span>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              Fast Track Surveys provides traffic, transport, parking and interview surveys. We organise fieldwork around your project requirements and deliver clear data to support planning and operational decisions.
            </p>

            <div className="pt-2 flex flex-col gap-2 text-xs font-mono text-slate-400">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Company Number: {companyInfo.companyNumber}</span>
              </div>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase text-white tracking-widest mb-4 border-b border-slate-800 pb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-400" />
              <span>NAVIGATION</span>
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href="/"
                  onClick={(e) => {
                    e.preventDefault();
                    navigateTo('home');
                  }}
                  className="hover:text-white transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  onClick={(e) => {
                    e.preventDefault();
                    navigateTo('about');
                  }}
                  className="hover:text-white transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/services"
                  onClick={(e) => {
                    e.preventDefault();
                    navigateTo('services');
                  }}
                  className="hover:text-white transition-colors"
                >
                  Services Overview
                </a>
              </li>
              <li>
                <a
                  href="/careers"
                  onClick={(e) => {
                    e.preventDefault();
                    navigateTo('careers');
                  }}
                  className="hover:text-white transition-colors"
                >
                  Careers
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  onClick={(e) => {
                    e.preventDefault();
                    navigateTo('contact');
                  }}
                  className="hover:text-white transition-colors"
                >
                  Contact & Quotation
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: All 8 Services with Direct Navigation */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase text-white tracking-widest mb-4 border-b border-slate-800 pb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
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
                    className="hover:text-cyan-300 transition-colors text-left flex items-center gap-1.5 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-600 group-hover:bg-cyan-400 transition-colors" />
                    <span>{svc.title}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & London HQ Details */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase text-white tracking-widest mb-4 border-b border-slate-800 pb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span>REGISTERED OFFICE</span>
            </h4>

            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-brand-400 mt-1 shrink-0" />
                <div className="text-slate-300">
                  <p className="font-semibold text-white">Fast Track Surveys Ltd</p>
                  <p>86-90 Paul Street</p>
                  <p>London, England, EC2A 4NE</p>
                  <p className="text-xs text-slate-500">United Kingdom</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 pt-2">
                <Phone className="w-4 h-4 text-brand-400 shrink-0" />
                <a href="tel:+447767597947" className="hover:text-white font-mono text-xs">
                  +44 (0)7767 597947
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-brand-400 shrink-0" />
                <a href="mailto:mail@fasttracksurveys.co.uk" className="hover:text-white font-mono text-xs truncate">
                  mail@fasttracksurveys.co.uk
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div>
            © {new Date().getFullYear()} Fast Track Surveys Ltd. All Rights Reserved. Registered in England & Wales #13702594.
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => navigateTo('policies')}
              className="hover:text-slate-300 transition-colors"
            >
              Privacy Policy
            </button>
            <span>•</span>
            <button
              onClick={() => navigateTo('terms')}
              className="hover:text-slate-300 transition-colors"
            >
              Terms & Conditions
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
