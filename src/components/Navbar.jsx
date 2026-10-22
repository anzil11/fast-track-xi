import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  ChevronDown,
  Activity,
  Phone,
  Mail,
  ArrowRight,
  ShieldCheck,
  Zap,
  Sparkles,
  Calculator
} from 'lucide-react';
import { useNavigation } from '../context/NavigationContext';
import { useTheme } from '../context/ThemeContext';
import { servicesData } from '../data/servicesData';
import ThemeSwitcher from './ThemeSwitcher';
import ServiceIcon from './ServiceIcon';
import logoMark from '../img/logo-mark.png';

export default function Navbar() {
  const { currentPage, navigateTo, triggerServiceTransition, setIsQuoteModalOpen, openQuoteModal } = useNavigation();
  const { isWhite } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'HOME', page: 'home' },
    { name: 'SERVICES', page: 'services', hasDropdown: true },
    { name: 'ABOUT US', page: 'about' },
    { name: 'CAREERS', page: 'careers' },
    { name: 'CONTACT', page: 'contact' },
  ];

  return (
    <>
      {/* Top Telemetry Ticker Bar */}
      <div
        className={`border-b text-[11px] font-mono py-1.5 px-4 sm:px-8 hidden md:flex items-center justify-between z-40 relative transition-colors duration-300 ${isWhite
            ? 'bg-slate-100 border-slate-200 text-slate-600'
            : 'bg-slate-950/90 border-slate-800/80 text-slate-400'
          }`}
      >
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-sky-400 font-semibold">
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
            <span>TRAFFIC & TRANSPORT SURVEYS</span>
          </div>
          <span className={isWhite ? 'text-slate-300' : 'text-slate-600'}>|</span>
          <span>LONDON REGISTERED OFFICE</span>
          <span className={isWhite ? 'text-slate-300' : 'text-slate-600'}>|</span>
          <span className={isWhite ? 'text-brand-600 font-bold' : 'text-cyan-400'}>FIELDWORK & DATA CHECKS</span>
        </div>

        <div className="flex items-center gap-5">
          <a
            href="tel:+447767597947"
            className={`flex items-center gap-1.5 transition-colors ${isWhite ? 'hover:text-brand-600 text-slate-700' : 'hover:text-brand-400 text-slate-300'
              }`}
          >
            <Phone className="w-3 h-3 text-brand-500" />
            <span>+44 (0)7767 597947</span>
          </a>
          <span className={isWhite ? 'text-slate-300' : 'text-slate-600'}>|</span>
          <a
            href="mailto:mail@fasttracksurveys.co.uk"
            className={`flex items-center gap-1.5 transition-colors ${isWhite ? 'hover:text-brand-600 text-slate-700' : 'hover:text-brand-400 text-slate-300'
              }`}
          >
            <Mail className="w-3 h-3 text-brand-500" />
            <span>mail@fasttracksurveys.co.uk</span>
          </a>
        </div>
      </div>

      {/* Main Glassmorphic Header */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${isScrolled
            ? isWhite
              ? 'bg-white/90 backdrop-blur-xl border-b border-slate-200 shadow-md py-3'
              : 'bg-slate-950/85 backdrop-blur-xl border-b border-slate-800/80 shadow-2xl py-3'
            : isWhite
              ? 'bg-white/70 backdrop-blur-md border-b border-slate-100 py-4'
              : 'bg-transparent py-4'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">

          {/* Brand Logo */}
          <div
            onClick={() => navigateTo('home')}
            className="cursor-pointer flex items-center gap-3 group"
          >
            {/* Geometric Vector Logo Mark */}
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 via-sky-500 to-cyan-400 p-[1px] shadow-md group-hover:shadow-lg transition-shadow">
              <div className={`w-full h-full rounded-[11px] flex items-center justify-center relative overflow-hidden ${isWhite ? 'bg-white' : 'bg-slate-950'
                }`}>
                <img
                  src={logoMark}
                  alt="Fast Track Surveys Logo"
                  className="w-7 h-7 object-contain group-hover:scale-110 group-hover:rotate-3 transition-all duration-300"
                />
              </div>
            </div>

            <div className="flex flex-col select-none">
              <div className="flex items-center gap-2">
                <span className={`text-xl sm:text-2xl font-bold font-nexa tracking-tight transition-colors ${isWhite ? 'text-[#26335d] group-hover:text-[#016a97]' : 'text-white group-hover:text-slate-100'
                  }`}>
                  Fast<span className="text-[#2ea3d9]">Track</span>
                </span>
                <span className={`px-1.5 py-0.5 rounded text-[9px] font-nexa font-light tracking-[0.2em] uppercase transition-colors ${isWhite
                    ? 'bg-[#e0f4fc] text-[#016a97] border border-[#b9e6f9]'
                    : 'bg-[#26335d]/70 text-[#2ea3d9] border border-[#26335d]'
                  }`}>
                  SURVEYS
                </span>
              </div>
              <span className={`text-[9px] font-nexa font-light tracking-wider uppercase ${isWhite ? 'text-slate-500' : 'text-slate-400'
                }`}>
                TRAFFIC & TRANSPORT INTELLIGENCE
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className={`hidden lg:flex items-center gap-1 p-1.5 rounded-full border backdrop-blur-md transition-colors ${isWhite
              ? 'bg-slate-100 border-slate-200 shadow-inner'
              : 'bg-slate-900/60 border-slate-800/80'
            }`}>
            {navLinks.map((link) => {
              const isActive = currentPage === link.page || (link.page === 'services' && currentPage === 'service-detail');

              if (link.hasDropdown) {
                return (
                  <div
                    key={link.name}
                    className="relative"
                    onMouseEnter={() => setIsServicesDropdownOpen(true)}
                    onMouseLeave={() => setIsServicesDropdownOpen(false)}
                  >
                    <button
                      onClick={() => navigateTo(link.page)}
                      className={`px-4 py-2 rounded-full text-xs font-semibold font-mono tracking-wider transition-all flex items-center gap-1 ${isActive
                          ? 'bg-brand-500 text-white shadow-md'
                          : isWhite
                            ? 'text-slate-700 hover:text-brand-600 hover:bg-slate-200/70'
                            : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                        }`}
                    >
                      <span>{link.name}</span>
                      <ChevronDown className="w-3.5 h-3.5" />
                    </button>

                    {/* Rich Services Megamenu Dropdown */}
                    <AnimatePresence>
                      {isServicesDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className={`absolute top-full left-0 mt-2 w-[420px] rounded-2xl glass-panel p-3 border shadow-2xl z-50 ${isWhite ? 'bg-white border-slate-200 text-slate-800' : 'border-slate-700 text-white'
                            }`}
                        >
                          <div className={`text-[10px] font-mono px-3 py-1.5 border-b flex items-center justify-between ${isWhite ? 'border-slate-100 text-slate-500' : 'border-slate-800 text-slate-400'
                            }`}>
                            <span>EXPLORE OUR SURVEY SERVICES</span>
                            <span className="text-brand-500 font-bold">{servicesData.length} SERVICES</span>
                          </div>

                          <div className="grid grid-cols-1 gap-1 mt-1">
                            {servicesData.map((svc) => (
                              <div
                                key={svc.id}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setIsServicesDropdownOpen(false);
                                  navigateTo('service-detail', svc);
                                }}
                                className={`flex items-center gap-3 p-2.5 rounded-xl transition-colors cursor-pointer group ${isWhite ? 'hover:bg-slate-100' : 'hover:bg-slate-800/80'
                                  }`}
                              >
                                <div
                                  className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border"
                                  style={{
                                    backgroundColor: `${svc.accentColor}20`,
                                    color: svc.accentColor,
                                    borderColor: `${svc.accentColor}40`
                                  }}
                                >
                                  <ServiceIcon name={svc.icon} className="w-4 h-4" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className={`text-xs font-semibold truncate ${isWhite ? 'text-slate-900 group-hover:text-brand-600' : 'text-white group-hover:text-brand-300'
                                    }`}>
                                    {svc.title}
                                  </div>
                                  <div className={`text-[11px] truncate ${isWhite ? 'text-slate-500' : 'text-slate-400'
                                    }`}>
                                    {svc.tagline}
                                  </div>
                                </div>
                                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-brand-500 group-hover:translate-x-1 transition-all" />
                              </div>
                            ))}
                          </div>

                          <div className={`mt-2 pt-2 border-t text-center ${isWhite ? 'border-slate-100' : 'border-slate-800'
                            }`}>
                            <button
                              onClick={() => {
                                setIsServicesDropdownOpen(false);
                                navigateTo('services');
                              }}
                              className="text-xs text-brand-500 hover:text-brand-600 font-mono font-bold"
                            >
                              View All Services →
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <button
                  key={link.name}
                  onClick={() => navigateTo(link.page)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold font-mono tracking-wider transition-all ${isActive
                      ? 'bg-brand-500 text-white shadow-md'
                      : isWhite
                        ? 'text-slate-700 hover:text-brand-600 hover:bg-slate-200/70'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                    }`}
                >
                  {link.name}
                </button>
              );
            })}
          </nav>

          {/* Quick Actions (Theme Switcher & Request a Quote) */}
          <div className="hidden sm:flex items-center gap-3">
            <ThemeSwitcher />

            <button
              onClick={() => openQuoteModal ? openQuoteModal(null) : setIsQuoteModalOpen(true)}
              className="relative group overflow-hidden rounded-xl p-[1px] focus:outline-none"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-brand-500 to-indigo-500 rounded-xl animate-pulse-glow" />
              <div className={`relative px-4 py-2 rounded-[11px] flex items-center gap-2 transition-colors ${isWhite ? 'bg-white hover:bg-slate-50 text-slate-900 shadow-sm' : 'bg-slate-950 hover:bg-slate-900 text-white'
                }`}>
                <Calculator className="w-4 h-4 text-brand-500" />
                <span className="text-xs font-bold font-mono tracking-wide">
                  REQUEST A QUOTE
                </span>
              </div>
            </button>
          </div>

          {/* Mobile Menu Toggle & Theme Button */}
          <div className="flex sm:hidden items-center gap-2">
            <ThemeSwitcher />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded-xl border transition-colors ${isWhite
                  ? 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
                  : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white'
                }`}
              aria-label="Toggle Navigation"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className={`lg:hidden border-b px-4 pt-4 pb-6 overflow-hidden backdrop-blur-2xl ${isWhite ? 'bg-white/95 border-slate-200' : 'bg-slate-950/95 border-slate-800'
                }`}
            >
              <div className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <button
                    key={link.name}
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      navigateTo(link.page);
                    }}
                    className={`text-left px-4 py-3 rounded-xl font-mono text-sm font-semibold transition-all ${currentPage === link.page
                        ? 'bg-brand-500/20 text-brand-500 border border-brand-500/40'
                        : isWhite
                          ? 'text-slate-800 hover:bg-slate-100'
                          : 'text-slate-300 hover:bg-slate-900'
                      }`}
                  >
                    {link.name}
                  </button>
                ))}

                <div className={`pt-3 mt-2 border-t flex flex-col gap-2 ${isWhite ? 'border-slate-200' : 'border-slate-800'
                  }`}>
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      if (openQuoteModal) openQuoteModal(null);
                      else setIsQuoteModalOpen(true);
                    }}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-brand-600 to-cyan-500 text-white font-mono font-bold text-xs flex items-center justify-center gap-2 shadow-lg"
                  >
                    <Calculator className="w-4 h-4" />
                    <span>REQUEST A QUOTE</span>
                  </button>

                  <div className={`flex items-center justify-between text-xs font-mono px-2 pt-2 ${isWhite ? 'text-slate-600' : 'text-slate-400'
                    }`}>
                    <a href="tel:+447767597947" className="flex items-center gap-1 hover:text-brand-500">
                      <Phone className="w-3.5 h-3.5 text-brand-500" />
                      <span>+44 (0)7767 597947</span>
                    </a>
                    <a href="mailto:mail@fasttracksurveys.co.uk" className="flex items-center gap-1 hover:text-brand-500">
                      <Mail className="w-3.5 h-3.5 text-brand-500" />
                      <span>Email HQ</span>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
