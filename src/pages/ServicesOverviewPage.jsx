import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles,
  Search,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Zap,
  Filter,
  Sliders,
  FileSpreadsheet
} from 'lucide-react';
import { useNavigation } from '../context/NavigationContext';
import { servicesData } from '../data/servicesData';
import ServiceCard from '../components/ServiceCard';
import ServiceIcon from '../components/ServiceIcon';

export default function ServicesOverviewPage() {
  const { triggerServiceTransition, setIsQuoteModalOpen } = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('ALL');

  const tags = ['ALL', 'URBAN MOBILITY', 'PARKING & ASSETS', 'ACTIVE TRAVEL', 'INTERVIEWS & DEMOGRAPHICS'];

  const filteredServices = servicesData.filter((svc) => {
    const matchesSearch =
      svc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      svc.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      svc.tagline.toLowerCase().includes(searchQuery.toLowerCase());

    if (selectedTag === 'ALL') return matchesSearch;
    if (selectedTag === 'URBAN MOBILITY') {
      return matchesSearch && (svc.id === 'pedestrian-counts' || svc.id === 'public-transport-surveys');
    }
    if (selectedTag === 'PARKING & ASSETS') {
      return matchesSearch && (svc.id === 'parking-surveys');
    }
    if (selectedTag === 'ACTIVE TRAVEL') {
      return matchesSearch && (svc.id === 'cycle-count-surveys');
    }
    if (selectedTag === 'INTERVIEWS & DEMOGRAPHICS') {
      return matchesSearch && (svc.id === 'pedestrian-road-side-interview-surveys' || svc.id === 'household-surveys' || svc.id === 'market-research');
    }
    return matchesSearch;
  });

  return (
    <div className="relative min-h-screen text-slate-100 pt-8 pb-24 overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />
      <div className="absolute top-20 right-1/4 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>FAST TRACK SURVEY DISCIPLINES</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold font-display text-white tracking-tight">
            Comprehensive Survey Services
          </h1>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
            From Lambeth-compliant parking stress to high-definition AI pedestrian telemetry and nationwide CAPI travel diaries, explore our seven core surveying specialisms.
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="rounded-2xl glass-panel p-4 border border-slate-800 mb-12 flex flex-col md:flex-row items-center justify-between gap-4">

          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search survey types, specs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900/90 border border-slate-700 rounded-xl pl-10 pr-4 py-2 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
            />
          </div>

          {/* Category Tag Pills */}
          <div className="flex flex-wrap gap-1.5 w-full md:w-auto justify-start md:justify-end">
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${selectedTag === tag
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.3)]'
                    : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
              >
                {tag}
              </button>
            ))}
          </div>

        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-20">
          {filteredServices.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={index}
            />
          ))}
        </div>

        {/* Comparison Matrix Table */}
        <div className="rounded-3xl glass-panel p-6 sm:p-10 border border-slate-800 shadow-2xl overflow-x-auto">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
                Technical Specifications & Deliverables Matrix
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Comparative overview of Fast Track Surveys' methodologies, compliance standards, and output formats.
              </p>
            </div>
            <button
              onClick={() => setIsQuoteModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-mono font-bold text-xs shrink-0 shadow-lg"
            >
              Get Custom Quote
            </button>
          </div>

          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400">
                <th className="pb-3 pr-4">SURVEY SERVICE</th>
                <th className="pb-3 px-4">STANDARD / METHODOLOGY</th>
                <th className="pb-3 px-4">INTERVAL SLICES</th>
                <th className="pb-3 px-4">ACCURACY RATING</th>
                <th className="pb-3 pl-4 text-right">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {servicesData.map((svc) => (
                <tr key={svc.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-4 pr-4">
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border"
                        style={{
                          backgroundColor: `${svc.accentColor}20`,
                          color: svc.accentColor,
                          borderColor: `${svc.accentColor}40`
                        }}
                      >
                        <ServiceIcon name={svc.icon} className="w-4 h-4" />
                      </div>
                      <span className="font-bold text-white text-sm font-sans">{svc.title}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-slate-300">
                    <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-[11px]">
                      {svc.badge}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-slate-400">
                    15m / 60m / 24h
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-emerald-400 font-bold">99.4% Verified</span>
                  </td>
                  <td className="py-4 pl-4 text-right">
                    <button
                      onClick={() => triggerServiceTransition(svc)}
                      className="text-cyan-400 hover:text-cyan-300 font-bold hover:underline flex items-center gap-1 justify-end ml-auto"
                    >
                      <span>Simulate</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}
