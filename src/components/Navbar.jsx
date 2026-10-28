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
      {/* Top Telemetry Ticker Bar - Always in Brand Navy Logo Palette */}
      <div className="border-b text-[11px] font-mono py-1.5 px-4 sm:px-8 hidden md:flex items-center justify-between z-40 relative transition-colors duration-300 bg-gradient-to-r from-[#060a17] via-[#0b142d] to-[#060a17] border-[#26335d]/60 text-white navbar-ticker">
        <div className="flex items-center gap-4 text-white">
          <div className="flex items-center gap-1.5 font-semibold text-white">
            <span className="w-2 h-2 rounded-full animate-pulse bg-[#2ea3d9] shadow-[0_0_8px_#2ea3d9]" />
            <span className="text-white font-bold">TRAFFIC & TRANSPORT SURVEYS</span>
          </div>
          <span className="text-white/40">|</span>
          <span className="text-white">LONDON REGISTERED OFFICE</span>
          <span className="text-white/40">|</span>
          <span className="font-bold text-white">FIELDWORK & DATA CHECKS</span>
        </div>

        <div className="flex items-center gap-5 text-white">
          <a
            href="tel:+447767597947"
            className="flex items-center gap-1.5 transition-colors hover:text-[#2ea3d9] text-white"
          >
            <Phone className="w-3 h-3 text-[#2ea3d9]" />
            <span className="text-white font-medium">+44 (0)7767 597947</span>
          </a>
          <span className="text-white/40">|</span>
          <a
            href="mailto:mail@fasttracksurveys.co.uk"
            className="flex items-center gap-1.5 transition-colors hover:text-[#2ea3d9] text-white"
          >
            <Mail className="w-3 h-3 text-[#2ea3d9]" />
            <span className="text-white font-medium">mail@fasttracksurveys.co.uk</span>
          </a>
        </div>
      </div>

      {/* Main Glassmorphic Header - Always in Brand Navy Logo Palette */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 bg-[#070d1e]/95 backdrop-blur-xl border-b border-[#26335d]/70 shadow-[0_12px_35px_rgba(3,6,18,0.7)] ${
          isScrolled ? 'py-3' : 'py-4'
        }`}
      >
        {/* Subtle Bottom Glow Hairline in Brand Cyan */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#2ea3d9]/40 to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">

          {/* Brand Logo */}
          <div
            onClick={() => navigateTo('home')}
            className="cursor-pointer flex items-center gap-3 group"
          >
            {/* Geometric Vector Logo Mark */}
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-[#016a97] via-[#2ea3d9] to-[#26335d] p-[1.5px] shadow-[0_0_15px_rgba(46,163,217,0.35)] group-hover:shadow-[0_0_22px_rgba(46,163,217,0.55)] transition-all">
              <div className="w-full h-full rounded-[9.5px] flex items-center justify-center relative overflow-hidden bg-[#091126]">
                <img
                  src={logoMark}
                  alt="Fast Track Surveys Logo"
                  className="w-7 h-7 object-contain group-hover:scale-110 group-hover:rotate-3 transition-all duration-300"
                />
              </div>
            </div>

            <div className="flex flex-col select-none">
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl font-bold font-nexa tracking-tight text-white group-hover:text-slate-100 transition-colors">
                  Fast<span className="text-[#2ea3d9]">Track</span>
                </span>
                <span className="px-1.5 py-0.5 rounded text-[9px] font-nexa font-semibold tracking-[0.2em] uppercase bg-[#0f1b3e] text-[#2ea3d9] border border-[#2ea3d9]/40 shadow-[0_0_10px_rgba(46,163,217,0.2)]">
                  SURVEYS
                </span>
              </div>
              <span className="text-[9px] font-nexa font-medium tracking-wider uppercase text-white">
                TRAFFIC & TRANSPORT INTELLIGENCE
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 p-1.5 rounded-full border backdrop-blur-md transition-colors bg-[#0b132a]/85 border-[#26335d]/80 shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)]">
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
                          ? 'bg-gradient-to-r from-[#016a97] to-[#2ea3d9] text-white shadow-[0_0_15px_rgba(46,163,217,0.4)]'
                          : 'text-white hover:text-white hover:bg-[#15224a]'
                        }`}
                    >
                      <span>{link.name}</span>
                      <ChevronDown className="w-3.5 h-3.5 text-white" />
                    </button>

                    {/* Rich Services Megamenu Dropdown */}
                    <AnimatePresence>
                      {isServicesDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 mt-2 w-[420px] rounded-2xl glass-panel p-3 border shadow-2xl z-50 bg-[#070d1e]/98 border-[#26335d] text-white shadow-[0_25px_60px_rgba(0,0,0,0.85)]"
                        >
                          <div className="text-[10px] font-mono px-3 py-1.5 border-b flex items-center justify-between border-[#26335d]/60 text-white">
                            <span>EXPLORE OUR SURVEY SERVICES</span>
                            <span className="text-[#2ea3d9] font-bold">{servicesData.length} SERVICES</span>
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
                                className="flex items-center gap-3 p-2.5 rounded-xl transition-colors cursor-pointer group hover:bg-[#111c3d]"
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
                                  <div className="text-xs font-semibold truncate text-white group-hover:text-[#2ea3d9]">
                                    {svc.title}
                                  </div>
                                  <div className="text-[11px] truncate text-white/80">
                                    {svc.tagline}
                                  </div>
                                </div>
                                <ArrowRight className="w-3.5 h-3.5 text-white group-hover:text-[#2ea3d9] group-hover:translate-x-1 transition-all" />
                              </div>
                            ))}
                          </div>

                          <div className="mt-2 pt-2 border-t text-center border-[#26335d]/60">
                            <button
                              onClick={() => {
                                setIsServicesDropdownOpen(false);
                                navigateTo('services');
                              }}
                              className="text-xs text-white hover:text-[#2ea3d9] font-mono font-bold"
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
                      ? 'bg-gradient-to-r from-[#016a97] to-[#2ea3d9] text-white shadow-[0_0_15px_rgba(46,163,217,0.4)]'
                      : 'text-white hover:text-white hover:bg-[#15224a]'
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
              data-cursor-text="QUOTE"
              className="relative group overflow-hidden rounded-xl p-[1px] focus:outline-none transition-transform hover:-translate-y-0.5 shadow-lg hover:shadow-[0_0_25px_rgba(46,163,217,0.45)]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#016a97] via-[#2ea3d9] to-[#016a97] rounded-xl animate-pulse-glow" />
              <div className="relative px-4 py-2 rounded-[11px] flex items-center gap-2 transition-all bg-gradient-to-r from-[#016a97] via-[#0284c7] to-[#2ea3d9] hover:brightness-110 text-white shadow-[0_0_20px_rgba(46,163,217,0.35)] shimmer-btn">
                <Calculator className="w-4 h-4 text-white" />
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
              className="p-2 rounded-xl border transition-colors bg-[#0b132a] border border-[#26335d] text-white hover:text-white"
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
              className="lg:hidden border-b px-4 pt-4 pb-6 overflow-hidden backdrop-blur-2xl bg-[#070d1e]/98 border-[#26335d]"
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
                        ? 'bg-[#26335d]/60 text-white border border-[#2ea3d9]/40'
                        : 'text-white hover:bg-[#121e42]'
                      }`}
                  >
                    {link.name}
                  </button>
                ))}

                <div className="pt-3 mt-2 border-t flex flex-col gap-2 border-[#26335d]/60">
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      if (openQuoteModal) openQuoteModal(null);
                      else setIsQuoteModalOpen(true);
                    }}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-[#016a97] via-[#0284c7] to-[#2ea3d9] text-white font-mono font-bold text-xs flex items-center justify-center gap-2 shadow-lg"
                  >
                    <Calculator className="w-4 h-4 text-white" />
                    <span>REQUEST A QUOTE</span>
                  </button>

                  <div className="flex items-center justify-between text-xs font-mono px-2 pt-2 text-white">
                    <a href="tel:+447767597947" className="flex items-center gap-1 text-white hover:text-[#2ea3d9]">
                      <Phone className="w-3.5 h-3.5 text-[#2ea3d9]" />
                      <span>+44 (0)7767 597947</span>
                    </a>
                    <a href="mailto:mail@fasttracksurveys.co.uk" className="flex items-center gap-1 text-white hover:text-[#2ea3d9]">
                      <Mail className="w-3.5 h-3.5 text-[#2ea3d9]" />
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
