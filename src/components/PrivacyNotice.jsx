import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Cookie, FileText, X, Check } from 'lucide-react';
import { useNavigation } from '../context/NavigationContext';
import { useTheme } from '../context/ThemeContext';

export default function PrivacyNotice() {
  const [isVisible, setIsVisible] = useState(false);
  const { navigateTo } = useNavigation();
  const { isWhite } = useTheme();

  useEffect(() => {
    const consent = localStorage.getItem('fasttrack_terms_cookie_consent');
    if (!consent) {
      // Smoothly display 1s after initial website launch
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    const handleReopen = () => setIsVisible(true);
    window.addEventListener('openTermsCookieConsent', handleReopen);
    return () => window.removeEventListener('openTermsCookieConsent', handleReopen);
  }, []);

  const handleAccept = () => {
    localStorage.setItem('fasttrack_terms_cookie_consent', 'accepted');
    setIsVisible(false);
  };

  const handleEssentialOnly = () => {
    localStorage.setItem('fasttrack_terms_cookie_consent', 'essential_only');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 90, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 90, opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-lg z-50"
          role="dialog"
          aria-live="polite"
          aria-label="Terms, Conditions and Cookie Consent"
        >
          <div
            className={`rounded-2xl p-5 sm:p-6 border shadow-[0_20px_60px_rgba(0,0,0,0.5)] backdrop-blur-2xl relative transition-all duration-300 ${
              isWhite
                ? 'bg-white/95 border-slate-200 text-slate-800 shadow-[0_20px_50px_rgba(15,23,42,0.15)]'
                : 'bg-[#091127]/95 border-[#26335d]/90 text-slate-100 shadow-[0_20px_60px_rgba(2,6,18,0.7)]'
            }`}
          >
            {/* Top Close Button */}
            <button
              onClick={handleEssentialOnly}
              className={`absolute top-3.5 right-3.5 p-1.5 rounded-lg transition-colors ${
                isWhite
                  ? 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
              aria-label="Close and continue with essential cookies only"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header with Shield Icon & Notice Title */}
            <div className="flex items-start gap-3.5 mb-3.5">
              <div className="p-2.5 rounded-xl bg-gradient-to-tr from-[#016a97] via-[#0284c7] to-[#2ea3d9] text-white shadow-md shadow-[#2ea3d9]/25 shrink-0 mt-0.5">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="pr-6">
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2 h-2 rounded-full bg-[#2ea3d9] shadow-[0_0_8px_#2ea3d9]" />
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#2ea3d9]">
                    LEGAL NOTICE & CONSENT
                  </span>
                </div>
                <h3 className={`text-base font-bold tracking-tight ${isWhite ? 'text-slate-900' : 'text-white'}`}>
                  Terms & Conditions & Cookies
                </h3>
              </div>
            </div>

            {/* Explanatory Body Copy */}
            <p className={`text-xs leading-relaxed mb-4 ${isWhite ? 'text-slate-600' : 'text-slate-300'}`}>
              When you browse our website, you agree to our{' '}
              <button
                type="button"
                onClick={() => navigateTo('terms')}
                className="font-semibold text-[#0284c7] hover:text-[#01557a] underline underline-offset-2 transition-colors cursor-pointer"
              >
                Terms & Conditions
              </button>{' '}
              and our use of essential cookies. We also use analytical cookies to measure site traffic and improve performance in line with our{' '}
              <button
                type="button"
                onClick={() => navigateTo('policies')}
                className="font-semibold text-[#0284c7] hover:text-[#01557a] underline underline-offset-2 transition-colors cursor-pointer"
              >
                Privacy & Cookie Policy
              </button>.
            </p>

            {/* Bottom Actions Bar */}
            <div
              className={`flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-3.5 border-t ${
                isWhite ? 'border-slate-100' : 'border-[#1e2a4a]'
              }`}
            >
              {/* Quick Document Links */}
              <div className="flex items-center gap-3 text-xs">
                <button
                  type="button"
                  onClick={() => navigateTo('terms')}
                  className={`inline-flex items-center gap-1.5 font-medium transition-colors hover:text-[#2ea3d9] ${
                    isWhite ? 'text-slate-500' : 'text-slate-400'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5 text-[#2ea3d9]" />
                  <span>Terms of Service</span>
                </button>
                <span className={isWhite ? 'text-slate-300' : 'text-slate-600'}>•</span>
                <button
                  type="button"
                  onClick={() => navigateTo('policies')}
                  className={`inline-flex items-center gap-1.5 font-medium transition-colors hover:text-[#2ea3d9] ${
                    isWhite ? 'text-slate-500' : 'text-slate-400'
                  }`}
                >
                  <Cookie className="w-3.5 h-3.5 text-[#2ea3d9]" />
                  <span>Cookie Policy</span>
                </button>
              </div>

              {/* Accept & Essential Buttons */}
              <div className="flex items-center gap-2 justify-end">
                <button
                  type="button"
                  onClick={handleEssentialOnly}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                    isWhite
                      ? 'text-slate-600 hover:bg-slate-100 border border-slate-200'
                      : 'text-slate-300 hover:bg-slate-800/80 border border-slate-700/60'
                  }`}
                >
                  Essential Only
                </button>
                <button
                  type="button"
                  onClick={handleAccept}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#016a97] via-[#0284c7] to-[#2ea3d9] hover:from-[#01557a] hover:to-[#2ea3d9] shadow-md shadow-[#2ea3d9]/25 hover:shadow-[#2ea3d9]/45 transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Accept & Continue</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
