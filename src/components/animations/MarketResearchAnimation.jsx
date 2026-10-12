import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, BarChart3, Target, CheckCircle2, ShoppingBag } from 'lucide-react';

export default function MarketResearchAnimation() {
  const [sampleSize, setSampleSize] = useState(340);
  const [sentiment, setSentiment] = useState('94.8% Positive Intent');

  useEffect(() => {
    const t = setInterval(() => {
      setSampleSize(prev => prev + 2);
    }, 300);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative w-full max-w-xl mx-auto h-72 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/95 border border-orange-500/30 p-4 flex flex-col justify-between overflow-hidden shadow-[0_0_50px_rgba(249,115,22,0.15)]">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />

      {/* Top Telemetry */}
      <div className="relative z-10 flex items-center justify-between border-b border-orange-500/20 pb-2 text-xs">
        <div className="flex items-center gap-2 text-orange-400 font-mono">
          <Target className="w-4 h-4 text-orange-400 animate-spin" />
          <span>RETAIL RADAR & CONSUMER SENTIMENT SCANNER</span>
        </div>
        <div className="flex items-center gap-3 text-slate-400 font-mono">
          <span>ZONE: <strong className="text-white">SHOPPING PLAZA HUB</strong></span>
          <span>CONFIDENCE: <strong className="text-orange-400">95% (CI ±2%)</strong></span>
        </div>
      </div>

      {/* Market Research Visualizer Stage */}
      <div className="relative z-10 flex-1 flex items-center justify-center my-2">
        <div className="relative w-full h-36 bg-slate-800/40 rounded-xl border border-slate-700/60 p-3 flex items-center justify-between gap-4">
          
          {/* Radar Scanner Sweep Box */}
          <div className="relative w-28 h-28 rounded-full border border-orange-500/40 bg-orange-950/20 flex items-center justify-center overflow-hidden shrink-0">
            {/* Concentric rings */}
            <div className="w-20 h-20 rounded-full border border-orange-500/20" />
            <div className="w-12 h-12 rounded-full border border-orange-500/30" />
            
            {/* Rotating Radar Sweep */}
            <div className="absolute inset-0 rounded-full animate-radar-sweep bg-gradient-to-tr from-transparent via-transparent to-orange-500/40" />

            <ShoppingBag className="w-6 h-6 text-orange-400 relative z-10" />
          </div>

          {/* Demographic & Sentiment Bars */}
          <div className="flex-1 h-28 bg-slate-900/80 rounded-lg border border-slate-800 p-2.5 flex flex-col justify-between">
            <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
              <span>CONSUMER PREFERENCE COHORTS</span>
              <span className="text-orange-400 font-bold">N = {sampleSize}</span>
            </div>

            {/* Rising Histogram Bars */}
            <div className="flex items-end justify-between gap-2 h-14 px-1 pt-2">
              {[
                { label: '18-24', h: 65, col: 'bg-orange-500' },
                { label: '25-34', h: 90, col: 'bg-amber-400' },
                { label: '35-49', h: 80, col: 'bg-orange-400' },
                { label: '50-64', h: 55, col: 'bg-rose-500' },
                { label: '65+', h: 40, col: 'bg-pink-500' },
              ].map((bar, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${bar.h}%` }}
                    transition={{ duration: 0.8, delay: i * 0.1 }}
                    className={`w-full ${bar.col} rounded-t shadow-[0_0_8px_rgba(249,115,22,0.5)]`}
                  />
                  <span className="text-[8px] font-mono text-slate-400">{bar.label}</span>
                </div>
              ))}
            </div>

            <div className="text-[10px] font-mono text-emerald-400 flex items-center justify-between border-t border-slate-800 pt-1">
              <span>SENTIMENT:</span>
              <span className="font-bold">{sentiment}</span>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Status */}
      <div className="relative z-10 flex items-center justify-between bg-slate-900/80 rounded-xl p-2.5 border border-slate-800 text-xs">
        <div className="flex items-center gap-2">
          <div className="p-1 rounded-md bg-orange-500/20 text-orange-400">
            <TrendingUp className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[11px] text-slate-400 font-mono">CONVERSION METRIC</div>
            <div className="font-semibold text-white text-xs">High Footfall-to-Dwell Correlation</div>
          </div>
        </div>
        <div className="text-right font-mono text-[11px] text-slate-300">
          <div>DWELL TIME: <span className="text-orange-400 font-bold">48.2 mins</span></div>
          <div>ENGAGEMENT: <span className="text-emerald-400 font-bold">92.4%</span></div>
        </div>
      </div>
    </div>
  );
}
