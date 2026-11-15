import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { PORTFOLIO_DATA } from '../data';
import MagneticButton from './MagneticButton';
import { Bot, Code2, Database, Server, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

// Spotlight Interactive Card with cursor-tracking gradient glow
function ServiceCard({ service, index }: { service: typeof PORTFOLIO_DATA.services[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty('--mouse-x', `${x}px`);
    cardRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  const Icon = 
    service.iconName === 'Bot' ? Bot :
    service.iconName === 'Code2' ? Code2 :
    service.iconName === 'Database' ? Database : Server;

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="spotlight-card glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 hover:border-purple-500/50 transition-all duration-500 flex flex-col justify-between group relative"
    >
      <div>
        {/* Top Header: Index & Icon */}
        <div className="flex items-center justify-between mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600/30 to-cyan-500/30 border border-white/10 flex items-center justify-center text-cyan-300 group-hover:scale-110 group-hover:text-white transition-all shadow-glow-purple">
            <Icon size={24} />
          </div>
          <span className="font-mono font-black text-3xl sm:text-4xl text-slate-700 group-hover:text-purple-400/40 transition-colors">
            {service.index}
          </span>
        </div>

        {/* Title & Subtitle */}
        <h3 className="font-display font-extrabold text-2xl text-white mb-1 group-hover:text-cyan-300 transition-colors">
          {service.title}
        </h3>
        <p className="font-mono text-xs text-purple-400 tracking-wider uppercase mb-4">
          // {service.subtitle}
        </p>

        {/* Description */}
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6 font-sans">
          {service.description}
        </p>

        {/* Key Features List */}
        <div className="space-y-2.5 mb-6 pt-4 border-t border-white/5">
          <span className="text-[11px] font-mono text-slate-400 tracking-wider uppercase block mb-2">
            WHAT YOU GET:
          </span>
          {service.features.map((feature, idx) => (
            <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
              <CheckCircle2 size={14} className="text-cyan-400 shrink-0 mt-0.5" />
              <span>{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Action / CTA at bottom of card */}
      <div className="pt-6 border-t border-white/10 flex items-center justify-between">
        <a
          href="#contact"
          className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-cyan-300 hover:text-white group-hover:translate-x-1 transition-all"
        >
          <span>BOOK THIS SERVICE</span>
          <ArrowRight size={14} className="text-purple-400" />
        </a>
        <span className="text-[10px] font-mono text-slate-500">
          CUSTOM QUOTE
        </span>
      </div>
    </motion.div>
  );
}

export default function Services() {
  const { services } = PORTFOLIO_DATA;

  return (
    <section id="services" className="py-24 sm:py-32 relative bg-[#050510] px-4 sm:px-6 lg:px-8">
      {/* Background Glow */}
      <div className="absolute top-1/3 left-1/4 w-[450px] h-[450px] bg-purple-600/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[450px] h-[450px] bg-cyan-500/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel border border-purple-500/30 text-purple-300 font-mono text-xs tracking-widest uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
            03 — SERVICES
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-tight max-w-3xl">
            Tailored Engineering for <span className="gradient-text">Zero-Friction</span> Scale
          </h2>
          <p className="mt-4 text-slate-400 text-base sm:text-lg max-w-2xl font-sans">
            From autonomous AI agents that run 24/7 without fatigue to production web platforms and blazing fast database tuning.
          </p>
        </div>

        {/* Bento Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>

        {/* Custom Consultation Banner */}
        <div className="mt-12 p-8 rounded-3xl glass-panel border border-cyan-500/20 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="relative z-10 flex flex-col">
            <span className="font-mono text-xs text-cyan-400 uppercase tracking-widest mb-1">
              // NEED A BESPOKE ARCHITECTURE?
            </span>
            <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
              Have a unique workflow or custom AI challenge?
            </h3>
            <p className="text-slate-400 text-sm mt-1">
              I can analyze your business bottlenecks and design an end-to-end autonomous proof of concept.
            </p>
          </div>
          <div className="relative z-10 shrink-0">
            <MagneticButton href="#contact" variant="primary" className="py-3 px-6 text-sm">
              <Sparkles size={16} className="text-cyan-300" />
              <span>Discuss Your Architecture</span>
            </MagneticButton>
          </div>
        </div>

      </div>
    </section>
  );
}
