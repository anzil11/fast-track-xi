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
import ServiceIcon from './ServiceIcon';
import logoMark from '../img/logo-mark.png';

export default function Navbar() {
  const { currentPage, navigateTo, triggerServiceTransition, setIsQuoteModalOpen, openQuoteModal } = useNavigation();
  const { isWhite } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
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
      {/* Top Telemetry Ticker Bar - Deep Brand Blue #0b2a49 / #071e35 */}
      {/* <div className="border-b text-[11px] font-mono py-1.5 px-4 sm:px-8 hidden md:flex items-center justify-between z-40 relative transition-colors duration-300 bg-[#071e35] border-white/10 text-white navbar-ticker">
        <div className="flex items-center gap-4 text-white">
          <div className="flex items-center gap-1.5 font-semibold text-white">
            <span className="w-2 h-2 rounded-full animate-pulse bg-cyan-300 shadow-[0_0_8px_#67e8f9]" />
            <span className="text-white font-bold">Traffic & Transport Research</span>
          </div>
          <span className="text-white/40">|</span>
          <span className="text-white/90">LONDON REGISTERED OFFICE</span>
          <span className="text-white/40">|</span>
          <span className="font-bold text-white">FIELDWORK & DATA CHECKS</span>
        </div>

        <div className="flex items-center gap-5 text-white">
          <a
            href="tel:+447767597947"
            className="flex items-center gap-1.5 transition-colors hover:text-cyan-200 text-white"
          >
            <Phone className="w-3 h-3 text-cyan-300" />
            <span className="text-white font-medium">+447942676213</span>
          </a>
          <span className="text-white/40">|</span>
          <a
            href="mailto:enquiries@fasttracktransportresearch.com"
            className="flex items-center gap-1.5 transition-colors hover:text-cyan-200 text-white"
          >
            <Mail className="w-3 h-3 text-cyan-300" />
            <span className="text-white font-medium">enquiries@fasttracktransportresearch.com</span>
          </a>
        </div>
      </div> */}

      {/* Main Glassmorphic Header - #0b2a49 */}
      <header
        className={`site-navbar sticky top-0 z-40 w-full transition-all duration-300 bg-[#0b2a49] border-b border-white/15 shadow-[0_8px_25px_rgba(11,42,73,0.35)] ${isScrolled ? 'py-3' : 'py-4'
          }`}
      >
        {/* Subtle Bottom Glow Hairline in Cyan */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">

          {/* Brand Logo */}
          <div
            onClick={() => navigateTo('home')}
            className="cursor-pointer flex items-center gap-3 group"
          >
            {/* Geometric Vector Logo Mark */}
            <div className="relative w-10 h-10 rounded-xl bg-white p-[1.5px] shadow-[0_2px_10px_rgba(0,0,0,0.15)] group-hover:shadow-[0_4px_16px_rgba(255,255,255,0.4)] transition-all">
              <div className="w-full h-full rounded-[9.5px] flex items-center justify-center relative overflow-hidden bg-white">
                <img
                  src={logoMark}
                  alt="FAST TRACK TRANSPORT RESEARCH LTD Logo"
                  className="w-7 h-7 object-contain group-hover:scale-110 group-hover:rotate-3 transition-all duration-300"
                />
              </div>
            </div>

            <div className="flex flex-col select-none">
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl font-bold font-nexa tracking-tight text-white transition-colors">
                  Fast<span className="text-cyan-200">Track</span>
                </span>
                <span className="px-1.5 py-0.5 rounded text-[9px] font-nexa font-semibold tracking-[0.2em] uppercase bg-white/20 text-white border border-white/30 backdrop-blur-sm shadow-sm">
                  TRANSPORT RESEARCH
                </span>
              </div>
              <span className="text-[9px] font-nexa font-medium tracking-wider uppercase text-white/85">
                TRANSPORT RESEARCH &amp; TRAFFIC DATA
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 p-1.5 rounded-full border backdrop-blur-md transition-colors bg-black/15 border-white/20 shadow-inner">
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
                        ? 'bg-white text-[#016a97] shadow-md font-bold'
                        : 'text-white hover:text-white hover:bg-white/20'
                        }`}
                    >
                      <span>{link.name}</span>
                      <ChevronDown className={`w-3.5 h-3.5 ${isActive ? 'text-[#016a97]' : 'text-white'}`} />
                    </button>

                    {/* Rich Services Megamenu Dropdown */}
                    <AnimatePresence>
                      {isServicesDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className={`absolute top-full left-0 mt-2 w-[420px] rounded-2xl p-3 border shadow-2xl z-50 transition-colors duration-200 services-dropdown-panel ${isWhite
                            ? 'bg-white border-slate-200 text-slate-900 shadow-[0_25px_60px_rgba(15,23,42,0.18)]'
                            : 'bg-[#070d1e]/98 border-[#26335d] text-white shadow-[0_25px_60px_rgba(0,0,0,0.85)]'
                            }`}
                        >
                          <div className={`text-[10px] font-mono px-3 py-1.5 border-b flex items-center justify-between services-divider ${isWhite ? 'border-slate-200 text-slate-600' : 'border-[#26335d]/60 text-slate-400'
                            }`}>
                            <span className="services-header-text font-semibold uppercase tracking-wider">
                              EXPLORE OUR SURVEY SERVICES
                            </span>
                            <span className={`font-bold font-mono services-count-badge ${isWhite ? 'text-[#0284c7]' : 'text-[#2ea3d9]'
                              }`}>
                              {servicesData.length} SERVICES
                            </span>
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
                                className={`flex items-center gap-3 p-2.5 rounded-xl transition-colors cursor-pointer group services-item ${isWhite ? 'hover:bg-slate-100/90' : 'hover:bg-[#111c3d]'
                                  }`}
                              >
                                <div
                                  className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border transition-transform group-hover:scale-105"
                                  style={{
                                    backgroundColor: `${svc.accentColor}20`,
                                    color: svc.accentColor,
                                    borderColor: `${svc.accentColor}40`
                                  }}
                                >
                                  <ServiceIcon name={svc.icon} className="w-4 h-4" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className={`text-xs font-semibold truncate transition-colors services-title ${isWhite
                                    ? 'text-slate-900 group-hover:text-[#0284c7]'
                                    : 'text-white group-hover:text-[#2ea3d9]'
                                    }`}>
                                    {svc.title}
                                  </div>
                                  <div className={`text-[11px] truncate transition-colors services-tagline ${isWhite ? 'text-slate-600' : 'text-slate-300/80'
                                    }`}>
                                    {svc.tagline}
                                  </div>
                                </div>
                                <ArrowRight className={`w-3.5 h-3.5 transition-all group-hover:translate-x-1 services-arrow ${isWhite
                                  ? 'text-slate-400 group-hover:text-[#0284c7]'
                                  : 'text-slate-400 group-hover:text-[#2ea3d9]'
                                  }`} />
                              </div>
                            ))}
                          </div>

                          <div className={`mt-2 pt-2 border-t text-center services-divider ${isWhite ? 'border-slate-200' : 'border-[#26335d]/60'
                            }`}>
                            <button
                              onClick={() => {
                                setIsServicesDropdownOpen(false);
                                navigateTo('services');
                              }}
                              className={`text-xs font-mono font-bold transition-colors services-view-all-btn ${isWhite
                                ? 'text-[#0284c7] hover:text-[#0369a1]'
                                : 'text-white hover:text-[#2ea3d9]'
                                }`}
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
                    ? 'bg-white text-[#016a97] shadow-md font-bold'
                    : 'text-white hover:text-white hover:bg-white/20'
                    }`}
                >
                  {link.name}
                </button>
              );
            })}
          </nav>

          {/* Quick Actions (Request a Quote) */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => openQuoteModal ? openQuoteModal(null) : setIsQuoteModalOpen(true)}
              data-cursor-text="QUOTE"
              className="px-4 py-2 rounded-[11px] flex items-center gap-2 bg-white hover:bg-slate-100 text-[#016a97] font-bold font-mono text-xs tracking-wide shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
            >
              <Calculator className="w-4 h-4 text-[#016a97]" />
              <span>REQUEST A QUOTE</span>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl border transition-colors bg-white/20 border-white/30 text-white hover:bg-white/30"
              aria-label="Toggle Navigation"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
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
              className="lg:hidden border-b px-4 pt-4 pb-6 overflow-hidden backdrop-blur-2xl bg-[#0b2a49] border-white/15 text-white shadow-2xl"
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
                      ? 'bg-white text-[#016a97] font-bold shadow-md'
                      : 'text-white hover:bg-white/15'
                      }`}
                  >
                    {link.name}
                  </button>
                ))}

                <div className="pt-3 mt-2 border-t flex flex-col gap-2 border-white/20">
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      if (openQuoteModal) openQuoteModal(null);
                      else setIsQuoteModalOpen(true);
                    }}
                    className="w-full py-3 rounded-xl bg-white text-[#016a97] hover:bg-slate-100 font-mono font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all"
                  >
                    <Calculator className="w-4 h-4 text-[#016a97]" />
                    <span>REQUEST A QUOTE</span>
                  </button>

                  <div className="flex items-center justify-between text-xs font-mono px-2 pt-2 text-white">
                    <a href="tel:+447767597947" className="flex items-center gap-1 text-white hover:text-cyan-200">
                      <Phone className="w-3.5 h-3.5 text-cyan-300" />
                      <span>+447942676213</span>
                    </a>
                    <a href="mailto:enquiries@fasttracktransportresearch.com" className="flex items-center gap-1 text-white hover:text-cyan-200">
                      <Mail className="w-3.5 h-3.5 text-cyan-300" />
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
