import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon, Sparkles } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function ThemeSwitcher() {
  const { currentTheme, toggleTheme, isWhite } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`relative flex items-center gap-2 p-1.5 rounded-full border transition-all duration-300 ${
        isWhite
          ? 'bg-slate-100 border-slate-300 text-slate-800 shadow-sm hover:bg-slate-200'
          : 'bg-slate-900/90 border-slate-700/80 text-slate-200 shadow-inner hover:bg-slate-800'
      }`}
      title={isWhite ? 'Switch to Deep Blue Theme' : 'Switch to Clean White Theme'}
      aria-label="Toggle Color Theme"
    >
      {/* Sliding Pill Indicator */}
      <div className="flex items-center gap-1.5 px-2 py-0.5 relative z-10 text-xs font-mono font-bold">
        {/* Sun Icon (White Theme) */}
        <div
          className={`flex items-center gap-1 transition-colors duration-200 ${
            isWhite ? 'text-amber-600 font-extrabold' : 'text-slate-500 hover:text-slate-400'
          }`}
        >
          <Sun className="w-4 h-4" />
          <span className="hidden md:inline">White</span>
        </div>

        <span className="text-slate-500 text-[10px]">/</span>

        {/* Moon Icon (Blue Theme) */}
        <div
          className={`flex items-center gap-1 transition-colors duration-200 ${
            !isWhite ? 'text-cyan-400 font-extrabold' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <Moon className="w-4 h-4" />
          <span className="hidden md:inline">Blue</span>
        </div>
      </div>

      {/* Active Highlighting Glow */}
      <motion.div
        layout
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
        className={`absolute rounded-full pointer-events-none ${
          isWhite
            ? 'top-1 bottom-1 left-1 w-[48%] bg-white shadow-md border border-slate-200'
            : 'top-1 bottom-1 right-1 w-[48%] bg-slate-800 shadow-[0_0_12px_rgba(12,143,233,0.4)] border border-cyan-500/40'
        }`}
      />
    </button>
  );
}
