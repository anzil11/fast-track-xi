import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X } from 'lucide-react';
import { useNavigation } from '../context/NavigationContext';

export default function PrivacyNotice() {
  const [isVisible, setIsVisible] = useState(false);
  const { navigateTo } = useNavigation();

  useEffect(() => {
    const consent = localStorage.getItem('fasttrack_cookie_consent');
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('fasttrack_cookie_consent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('fasttrack_cookie_consent', 'essential_only');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-50"
        >
          <div className="rounded-2xl glass-panel p-5 border border-slate-700/80 shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-xl relative">
            <button
              onClick={handleDecline}
              className="absolute top-3 right-3 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
              aria-label="Close cookie banner"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-start gap-3.5 mb-3">
              <div className="p-2.5 rounded-xl bg-brand-500/20 text-brand-400 border border-brand-500/30 shrink-0">
                <Cookie className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold font-display text-white">
                  Cookie Preferences
                </h3>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  We use essential cookies to make our website work and optional analytical cookies to help us improve site navigation and performance.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 pt-2 border-t border-slate-800">
              <button
                onClick={() => navigateTo('policies')}
                className="text-xs font-mono text-slate-400 hover:text-white underline decoration-slate-600 transition-colors"
              >
                Privacy Policy
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleDecline}
                  className="px-3 py-1.5 rounded-lg text-xs font-mono text-slate-300 hover:bg-slate-800 transition-colors"
                >
                  Essential Only
                </button>
                <button
                  onClick={handleAccept}
                  className="px-4 py-1.5 rounded-lg text-xs font-mono font-bold bg-brand-500 hover:bg-brand-600 text-white shadow-md transition-all"
                >
                  Accept All
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
