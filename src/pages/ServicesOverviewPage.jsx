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
  FileSpreadsheet,
  Camera
} from 'lucide-react';
import { useNavigation } from '../context/NavigationContext';
import { servicesData } from '../data/servicesData';
import ServiceCard from '../components/ServiceCard';
import ServiceIcon from '../components/ServiceIcon';

export default function ServicesOverviewPage() {
  const { navigateTo, setIsQuoteModalOpen, openQuoteModal } = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('ALL');

  const tags = ['ALL', 'URBAN MOBILITY', 'PARKING & ASSETS', 'ACTIVE TRAVEL', 'INTERVIEWS & DEMOGRAPHICS'];

  const deliverablesData = [
    {
      slug: 'traffic-counts-junction-surveys',
      service: 'Traffic & Junction Surveys',
      information: 'Vehicle classes, directions and turning movements',
      deliverables: 'Count tables, turning diagrams and peak summaries'
    },
    {
      slug: 'pedestrian-counts',
      service: 'Pedestrian Counts',
      information: 'Footfall, directions and crossing movements',
      deliverables: 'Interval counts, charts and annotated plans'
    },
    {
      slug: 'parking-surveys',
      service: 'Parking Surveys',
      information: 'Capacity, occupancy and repeat vehicle observations',
      deliverables: 'Accumulation, parking stress and length-of-stay summaries'
    },
    {
      slug: 'public-transport-surveys',
      service: 'Public Transport Surveys',
      information: 'Boarding, alighting, passenger loads and timings',
      deliverables: 'Passenger tables, load profiles and service summaries'
    },
    {
      slug: 'pedestrian-road-side-interview-surveys',
      service: 'Travel & Passenger Interviews',
      information: 'Journey details, travel choices and feedback',
      deliverables: 'Cleaned responses and origin-destination tables'
    },
    {
      slug: 'household-surveys',
      service: 'Household Travel Surveys',
      information: 'Household transport access and recorded journeys',
      deliverables: 'Household datasets and travel summaries'
    },
    {
      slug: 'cycle-count-surveys',
      service: 'Cycle & Active Travel Surveys',
      information: 'Cycle volumes, directions and agreed categories',
      deliverables: 'Count tables, turning diagrams and comparison charts'
    },
    {
      slug: 'market-research',
      service: 'Visitor & Customer Interviews',
      information: 'Visit patterns, experiences and opinions',
      deliverables: 'Response tables and findings summaries'
    }
  ];

  const filteredServices = servicesData.filter((svc) => {
    const matchesSearch =
      svc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      svc.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      svc.tagline.toLowerCase().includes(searchQuery.toLowerCase());

    if (selectedTag === 'ALL') return matchesSearch;
    if (selectedTag === 'URBAN MOBILITY') {
      return matchesSearch && (
        svc.id === 'traffic-counts-junction-surveys' ||
        svc.id === 'pedestrian-counts' ||
        svc.id === 'public-transport-surveys'
      );
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
        <div className="text-center max-w-4xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-mono uppercase tracking-widest backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
            <Sparkles className="w-3.5 h-3.5" />
            <span>Transport Intelligence Portfolio</span>
          </div>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold font-display tracking-tight leading-tight">
            <span className="text-gradient-silver">Traffic & Transport</span>{' '}
            <span className="text-[#2ea3d9]">Survey Services</span>
          </h1>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto font-normal">
            From classified turning counts and parking studies to multi-modal passenger tracking and direct face-to-face interviews. Every survey is engineered around project location, precise specifications, and decision-ready outputs.
          </p>

          {/* Quick Metrics Bar */}
          <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-xs font-mono text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#2ea3d9]" />
              <span>8 Core Survey Divisions</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
              <span>100% QA Field Verification</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-sky-400 shadow-[0_0_8px_#38bdf8]" />
              <span>UK-Wide Rapid Mobilisation</span>
            </div>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="rounded-3xl luxury-glass p-4 border border-slate-800/80 mb-12 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">

          {/* Search Input */}
          <div className="relative w-full md:w-88">
            <Search className="w-4 h-4 text-cyan-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Filter by survey type, data collected..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900/90 border border-slate-700/80 rounded-2xl pl-11 pr-4 py-2.5 text-xs font-mono text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 transition-all"
            />
          </div>

          {/* Category Tag Pills */}
          <div className="flex flex-wrap gap-2 w-full md:w-auto justify-start md:justify-end">
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                data-cursor-text="FILTER"
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all border ${selectedTag === tag
                    ? 'bg-gradient-to-r from-[#016a97] to-[#2ea3d9] text-white border-transparent shadow-[0_0_15px_rgba(46,163,217,0.4)] font-bold'
                    : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 hover:bg-slate-800'
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

        {/* Video-Based Survey Options Banner */}
        <div className="rounded-3xl luxury-glass p-8 sm:p-10 border border-sky-500/30 bg-gradient-to-r from-[#0b1b3d]/90 via-[#081127]/95 to-[#050b1a]/90 mb-16 shadow-[0_15px_40px_rgba(2,132,199,0.15)] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="space-y-3 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/15 border border-sky-500/40 text-sky-300 text-xs font-mono">
                <Camera className="w-3.5 h-3.5 text-cyan-400" />
                <span>HIGH-DEFINITION VIDEO CAPTURE</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-white tracking-tight">
                Video-Based Survey Analytics & High Mast Cameras
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-normal">
                Where suitable for site geometry and traffic volumes, elevated high-mast video recording provides comprehensive coverage for complex turning movements, pedestrian crossing interactions, and queue dynamics. All footage is reviewed under strict quality assurance frameworks.
              </p>
              <p className="text-xs text-slate-400 font-mono">
                Availability, camera vantage lines, installation permits, and GDPR-compliant data processing are established during initial consultation.
              </p>
            </div>
            <button
              onClick={() => {
                if (openQuoteModal) openQuoteModal(null);
                else setIsQuoteModalOpen(true);
              }}
              data-cursor-text="VIDEO"
              className="px-7 py-4 rounded-2xl bg-gradient-to-r from-[#016a97] via-[#0284c7] to-[#2ea3d9] text-white font-mono font-bold text-xs uppercase tracking-wider shrink-0 transition-all shadow-xl hover:shadow-[0_0_25px_rgba(46,163,217,0.5)] shimmer-btn hover:-translate-y-0.5"
            >
              Discuss Video Scope →
            </button>
          </div>
        </div>

        {/* Survey Services & Typical Deliverables Table */}
        <div className="rounded-3xl luxury-glass p-8 sm:p-12 border border-slate-800/90 shadow-2xl overflow-x-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-6 mb-8 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-400 text-xs font-mono mb-2">
                <FileSpreadsheet className="w-3.5 h-3.5" />
                <span>SPECIFICATIONS & OUTPUTS</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-white tracking-tight">
                Survey Services & Typical Deliverables
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
                Comprehensive matrix of data collected, measurement intervals, and client-ready reporting formats.
              </p>
            </div>
            <button
              onClick={() => {
                if (openQuoteModal) openQuoteModal(null);
                else setIsQuoteModalOpen(true);
              }}
              data-cursor-text="QUOTE"
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#016a97] to-[#2ea3d9] text-white font-mono font-bold text-xs uppercase tracking-wider shrink-0 shadow-lg hover:shadow-[0_0_20px_rgba(46,163,217,0.4)] transition-all shimmer-btn"
            >
              Request a Quote
            </button>
          </div>

          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400">
                <th className="pb-3 pr-4">SURVEY SERVICE</th>
                <th className="pb-3 px-4">INFORMATION COLLECTED</th>
                <th className="pb-3 px-4">TYPICAL DELIVERABLES</th>
                <th className="pb-3 pl-4 text-right">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {deliverablesData.map((row) => {
                const svc = servicesData.find((s) => s.slug === row.slug) || servicesData[0];
                return (
                  <tr key={row.service} className="hover:bg-slate-800/40 transition-colors">
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
                        <span className="font-bold text-white text-sm font-sans">{row.service}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-slate-300 font-sans text-xs">
                      {row.information}
                    </td>
                    <td className="py-4 px-4 text-slate-300 font-sans text-xs">
                      {row.deliverables}
                    </td>
                    <td className="py-4 pl-4 text-right">
                      <button
                        onClick={() => navigateTo('service-detail', svc)}
                        className="text-cyan-400 hover:text-cyan-300 font-bold hover:underline flex items-center gap-1 justify-end ml-auto text-xs"
                      >
                        <span>View Service</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* Exact Copy Beneath Table */}
          <div className="mt-6 pt-4 border-t border-slate-800 text-xs text-slate-400 font-mono">
            Survey coverage, timings, classifications, sample requirements and deliverables are agreed for each project.
          </div>
        </div>

      </div>
    </div>
  );
}
