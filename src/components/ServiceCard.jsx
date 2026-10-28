import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import ServiceIcon from './ServiceIcon';
import { useNavigation } from '../context/NavigationContext';

export default function ServiceCard({ service, index = 0 }) {
  const { triggerServiceTransition } = useNavigation();

  const handleAction = () => {
    triggerServiceTransition(service);
  };

  return (
    <motion.a
      href={`/services/${service.slug}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      onClick={(e) => {
        e.preventDefault();
        handleAction();
      }}
      aria-label={`View details for ${service.title}`}
      data-cursor-text="EXPLORE"
      data-cursor-accent={service.accentColor}
      className="group relative rounded-3xl p-6 sm:p-7 glass-panel luxury-card-hover cursor-pointer overflow-hidden flex flex-col justify-between transition-all duration-300 border border-slate-800/90 hover:border-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent no-underline"
      style={{
        boxShadow: '0 20px 40px -15px rgba(2,6,20,0.6)'
      }}
    >
      {/* Top Specular Edge Highlight */}
      <div
        className="absolute top-0 inset-x-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `linear-gradient(90deg, transparent, ${service.accentColor}, transparent)`
        }}
      />

      {/* Dynamic Background Hover Glow */}
      <div
        className="absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${service.accentColor}25, transparent 60%)`
        }}
      />

      {/* Content Image Header Banner */}
      {service.image ? (
        <div className="relative z-10 w-full h-44 sm:h-48 rounded-2xl overflow-hidden mb-5 border border-slate-700/60 shadow-inner group/img bg-slate-900">
          <img
            src={service.image}
            alt={service.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
          />
          {/* Gradient Scrim & Brand Tint */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#070c1a] via-[#070c1a]/30 to-transparent" />
          <div
            className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none"
            style={{ backgroundColor: service.accentColor }}
          />

          {/* Floating Category Badge over image */}
          <div className="absolute top-3 right-3 z-20">
            <span
              className="px-2.5 py-1 rounded-full text-[11px] font-mono font-semibold tracking-wide border shadow-md backdrop-blur-md bg-slate-950/85 flex items-center gap-1"
              style={{
                color: service.accentColor,
                borderColor: `${service.accentColor}55`
              }}
            >
              <Sparkles className="w-3 h-3" />
              <span>{service.badge}</span>
            </span>
          </div>

          {/* Floating Icon Capsule over image bottom */}
          <div className="absolute bottom-3 left-3 z-20">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-xl relative backdrop-blur-md bg-slate-950/90"
              style={{
                color: service.accentColor,
                border: `1.5px solid ${service.accentColor}70`
              }}
            >
              <ServiceIcon name={service.icon} className="w-6 h-6" />
              <div
                className="absolute inset-0 rounded-xl opacity-30 blur-sm pointer-events-none group-hover:opacity-70 transition-opacity"
                style={{ backgroundColor: service.accentColor }}
              />
            </div>
          </div>
        </div>
      ) : (
        /* Fallback Top Bar with Icon & Badge */
        <div className="relative z-10 flex items-start justify-between mb-5">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-lg relative"
            style={{
              backgroundColor: `${service.accentColor}18`,
              color: service.accentColor,
              border: `1px solid ${service.accentColor}44`
            }}
          >
            <ServiceIcon name={service.icon} className="w-7 h-7" />
            <div
              className="absolute inset-0 rounded-2xl opacity-40 blur-md pointer-events-none group-hover:opacity-80 transition-opacity"
              style={{ backgroundColor: service.accentColor }}
            />
          </div>

          <span
            className="px-2.5 py-1 rounded-full text-[11px] font-mono font-semibold tracking-wide border shadow-sm flex items-center gap-1"
            style={{
              backgroundColor: `${service.accentColor}15`,
              color: service.accentColor,
              borderColor: `${service.accentColor}35`
            }}
          >
            <Sparkles className="w-3 h-3" />
            <span>{service.badge}</span>
          </span>
        </div>
      )}

      {/* Title and Description */}
      <div className="relative z-10 mb-6 flex-1">
        <h3 className="text-xl sm:text-2xl font-bold font-display text-white group-hover:text-cyan-300 transition-colors flex items-center gap-2 mb-2">
          <span>{service.title}</span>
        </h3>
        <p className="text-slate-300 text-sm leading-relaxed line-clamp-3">
          {service.summary}
        </p>
      </div>

      {/* Feature Preview Tags */}
      <div className="relative z-10 grid grid-cols-2 gap-2 mb-6 pt-3 border-t border-slate-800/80 text-[11px] font-mono">
        <div className="bg-slate-900/70 rounded-xl p-2.5 border border-slate-800 flex items-center">
          <span className="font-semibold text-white leading-snug" style={{ color: service.accentColor }}>
            {service.stats[0]?.value || service.stats[0]?.title || service.stats[0]}
          </span>
        </div>
        <div className="bg-slate-900/70 rounded-xl p-2.5 border border-slate-800 flex items-center">
          <span className="font-semibold text-white leading-snug">
            {service.stats[1]?.value || service.stats[1]?.title || service.stats[1]}
          </span>
        </div>
      </div>

      {/* Luxury Action CTA Footer */}
      <div className="relative z-10 pt-2 flex items-center justify-between">
        <span className="text-xs font-mono font-semibold tracking-wide text-slate-300 group-hover:text-white transition-colors">
          View Specifications
        </span>

        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:translate-x-1.5 shadow-md"
          style={{
            backgroundColor: `${service.accentColor}25`,
            color: service.accentColor,
            border: `1px solid ${service.accentColor}60`
          }}
        >
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>

      {/* Corner Decorative Ambient Accent */}
      <div
        className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full blur-2xl opacity-10 group-hover:opacity-30 transition-opacity pointer-events-none"
        style={{ backgroundColor: service.accentColor }}
      />
    </motion.a>
  );
}
