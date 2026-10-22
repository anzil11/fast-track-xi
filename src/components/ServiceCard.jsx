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
      className="group relative rounded-3xl p-6 sm:p-7 glass-panel cursor-pointer overflow-hidden flex flex-col justify-between transition-all duration-300 border border-slate-800 hover:border-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent no-underline"
      style={{
        boxShadow: '0 10px 30px -10px rgba(0,0,0,0.5)'
      }}
    >
      {/* Dynamic Background Hover Glow */}
      <div
        className="absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${service.accentColor}25, transparent 60%)`
        }}
      />

      {/* Top Bar with Icon & Badge */}
      <div className="relative z-10 flex items-start justify-between mb-5">
        {/* Glow Icon Capsule */}
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

        {/* Badge */}
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

      {/* Title and Description */}
      <div className="relative z-10 mb-6 flex-1">
        <h3 className="text-xl sm:text-2xl font-bold font-display text-white group-hover:text-white transition-colors flex items-center gap-2 mb-2">
          <span>{service.title}</span>
        </h3>
        <p className="text-slate-300 text-sm leading-relaxed line-clamp-3">
          {service.summary}
        </p>
      </div>

      {/* Feature Preview Tags without redundant labels */}
      <div className="relative z-10 grid grid-cols-2 gap-2 mb-6 pt-3 border-t border-slate-800/80 text-[11px] font-mono">
        <div className="bg-slate-900/60 rounded-lg p-2.5 border border-slate-800 flex items-center">
          <span className="font-semibold text-white leading-snug" style={{ color: service.accentColor }}>
            {service.stats[0]?.value || service.stats[0]?.title || service.stats[0]}
          </span>
        </div>
        <div className="bg-slate-900/60 rounded-lg p-2.5 border border-slate-800 flex items-center">
          <span className="font-semibold text-white leading-snug">
            {service.stats[1]?.value || service.stats[1]?.title || service.stats[1]}
          </span>
        </div>
      </div>

      {/* Action CTA */}
      <div className="relative z-10 pt-2 flex items-center justify-between">
        <span className="text-xs font-mono text-slate-300 group-hover:text-white transition-colors">
          View Service Details
        </span>

        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:translate-x-1 group-hover:shadow-lg"
          style={{
            backgroundColor: `${service.accentColor}20`,
            color: service.accentColor,
            border: `1px solid ${service.accentColor}50`
          }}
        >
          <ArrowRight className="w-5 h-5" />
        </div>
      </div>

      {/* Corner Decorative Accent */}
      <div
        className="absolute -bottom-10 -right-10 w-28 h-28 rounded-full blur-2xl opacity-10 group-hover:opacity-30 transition-opacity pointer-events-none"
        style={{ backgroundColor: service.accentColor }}
      />
    </motion.a>
  );
}
