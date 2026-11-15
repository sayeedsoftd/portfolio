import React from 'react';
import { motion } from 'framer-motion';
import { PORTFOLIO_DATA } from '../data';
import MagneticButton from './MagneticButton';
import { Sparkles, MessageSquare, ArrowRight, Zap } from 'lucide-react';

export default function CtaBanner() {
  const { cta, personal } = PORTFOLIO_DATA;

  return (
    <section className="py-24 sm:py-32 relative bg-[#050510] px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Explosive Aurora */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-r from-purple-600/25 via-indigo-600/20 to-cyan-500/25 rounded-full blur-[160px] pointer-events-none animate-pulse-glow" />

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="glass-panel rounded-3xl p-8 sm:p-14 lg:p-20 border border-white/15 text-center relative overflow-hidden shadow-2xl">
          
          {/* Availability Capsule */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 font-mono text-xs uppercase tracking-wider mb-8">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>{cta.badge}</span>
          </div>

          {/* Giant Display Headline */}
          <h2 className="font-display font-extrabold text-4xl sm:text-6xl lg:text-7xl text-white tracking-tight leading-[1.05] max-w-3xl mx-auto mb-6">
            Let's build something <span className="gradient-text">extraordinary</span> together.
          </h2>

          {/* Subheading */}
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto mb-10 font-sans leading-relaxed">
            {cta.subheading}
          </p>

          {/* Magnetic Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <MagneticButton
              href="#contact"
              variant="primary"
              className="py-4 px-9 text-base font-bold shadow-glow-multi"
            >
              <Sparkles size={18} className="text-cyan-300 animate-spin-slow" />
              <span>{cta.primaryButtonText}</span>
            </MagneticButton>

            <MagneticButton
              href={personal.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="secondary"
              className="py-4 px-8 text-base font-bold"
            >
              <MessageSquare size={18} className="text-cyan-400" />
              <span>WhatsApp Chat</span>
            </MagneticButton>
          </div>

          {/* Subtle Cyber Grid in Banner */}
          <div className="absolute inset-0 bg-grid-cyber opacity-20 pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
