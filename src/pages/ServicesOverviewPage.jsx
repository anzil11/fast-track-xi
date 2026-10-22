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
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>FAST TRACK SURVEY DISCIPLINES</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold font-display text-white tracking-tight">
            Traffic & Transport Survey Services
          </h1>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            From traffic and parking counts to passenger surveys and face-to-face interviews, we collect the information needed to understand how people travel and use places. Each survey is planned around your location, objectives and reporting requirements.
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="rounded-2xl glass-panel p-4 border border-slate-800 mb-12 flex flex-col md:flex-row items-center justify-between gap-4">

          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search our survey services..."
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

        {/* Video-Based Survey Options */}
        <div className="rounded-3xl glass-panel p-6 sm:p-8 border border-sky-500/30 bg-gradient-to-r from-sky-950/40 via-slate-900 to-slate-950/90 mb-16 shadow-[0_0_30px_rgba(2,132,199,0.1)]">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-mono">
                <Camera className="w-3.5 h-3.5" />
                <span>VIDEO SURVEY OPTIONS</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
                Video-Based Survey Options
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Where suitable for the site and project, video recording can support traffic, pedestrian and cycle surveys. Footage is reviewed to produce the agreed counts and movement summaries.
              </p>
              <p className="text-xs text-slate-400 font-mono">
                Availability, camera coverage, installation arrangements and data handling requirements are confirmed during project scoping.
              </p>
            </div>
            <button
              onClick={() => {
                if (openQuoteModal) openQuoteModal(null);
                else setIsQuoteModalOpen(true);
              }}
              className="px-5 py-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-mono font-bold text-xs shrink-0 transition-colors shadow-lg"
            >
              Discuss Video Scope →
            </button>
          </div>
        </div>

        {/* Survey Services & Typical Deliverables Table (Audit Section 6) */}
        <div className="rounded-3xl glass-panel p-6 sm:p-10 border border-slate-800 shadow-2xl overflow-x-auto">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
                Survey Services & Typical Deliverables
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Overview of survey services, information collected and typical outputs.
              </p>
            </div>
            <button
              onClick={() => {
                if (openQuoteModal) openQuoteModal(null);
                else setIsQuoteModalOpen(true);
              }}
              className="px-4 py-2 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-mono font-bold text-xs shrink-0 shadow-lg"
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
