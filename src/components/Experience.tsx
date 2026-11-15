import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { PORTFOLIO_DATA } from '../data';
import { 
  Briefcase, GraduationCap, Calendar, MapPin, 
  CheckCircle2, Sparkles, Building2 
} from 'lucide-react';

export default function Experience() {
  const { timeline } = PORTFOLIO_DATA;
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section 
      id="experience" 
      ref={containerRef}
      className="py-24 sm:py-32 relative bg-[#070718] px-4 sm:px-6 lg:px-8 border-t border-white/5 overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-purple-600/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-5xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel border border-cyan-500/30 text-cyan-300 font-mono text-xs tracking-widest uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            05 — JOURNEY & MILESTONES
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-tight max-w-2xl">
            Experience & <span className="gradient-text">Academic Foundation</span>
          </h2>
          <p className="mt-4 text-slate-400 text-base max-w-xl font-sans">
            A track record of solving real-world challenges through software engineering and computational sciences.
          </p>
        </div>

        {/* Vertical Timeline Structure */}
        <div className="relative">
          
          {/* Central Track Background Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-slate-800 -translate-x-1/2" />
          
          {/* Animated Glowing Drawn Line */}
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-4 md:left-1/2 top-0 w-[2px] bg-gradient-to-b from-purple-500 via-indigo-500 to-cyan-400 -translate-x-1/2 shadow-glow-multi z-10"
          />

          <div className="space-y-12 sm:space-y-16">
            {timeline.map((item, index) => {
              const isEven = index % 2 === 0;
              const isWork = item.type === 'experience';

              return (
                <div
                  key={item.id}
                  className="relative flex flex-col md:flex-row items-start md:items-center"
                >
                  {/* Central Node / Checkpoint Indicator */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 z-20 flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-[#050510] border-2 border-purple-500 flex items-center justify-center shadow-glow-purple">
                      <div className="w-4 h-4 rounded-full bg-cyan-400 animate-pulse" />
                    </div>
                  </div>

                  {/* Left Side (Even items on desktop) */}
                  <div
                    className={`w-full md:w-1/2 pl-12 md:pl-0 ${
                      isEven ? 'md:pr-12 md:text-right' : 'md:hidden'
                    }`}
                  >
                    {isEven && (
                      <TimelineCard item={item} isWork={isWork} isEven={isEven} />
                    )}
                  </div>

                  {/* Empty Spacer for alignment */}
                  <div className="hidden md:block w-1/2" />

                  {/* Right Side (Odd items on desktop) */}
                  <div
                    className={`w-full md:w-1/2 pl-12 md:pl-12 ${
                      !isEven ? 'md:text-left' : 'hidden md:block'
                    }`}
                  >
                    {!isEven && (
                      <TimelineCard item={item} isWork={isWork} isEven={isEven} />
                    )}
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}

function TimelineCard({ item, isWork, isEven }: { item: typeof PORTFOLIO_DATA.timeline[0]; isWork: boolean; isEven: boolean }) {
  const Icon = isWork ? Briefcase : GraduationCap;

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="glass-panel rounded-3xl p-6 sm:p-7 border border-white/10 hover:border-purple-500/40 transition-colors shadow-xl group text-left"
    >
      {/* Top Meta info */}
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold border ${
          isWork 
            ? 'bg-purple-950/60 text-purple-300 border-purple-500/40' 
            : 'bg-cyan-950/60 text-cyan-300 border-cyan-500/40'
        }`}>
          <Icon size={13} />
          {item.badge}
        </span>
        <span className="flex items-center gap-1 text-xs font-mono text-slate-400">
          <Calendar size={13} className="text-slate-500" />
          {item.period}
        </span>
      </div>

      {/* Role / Degree Title */}
      <h3 className="font-display font-bold text-xl text-white group-hover:text-cyan-300 transition-colors mb-1">
        {item.title}
      </h3>

      {/* Institution / Company */}
      <div className="flex items-center gap-2 text-sm text-slate-300 font-medium mb-4">
        <Building2 size={15} className="text-purple-400 shrink-0" />
        <span>{item.organization}</span>
        <span className="text-slate-500">•</span>
        <span className="text-slate-400 text-xs">{item.location}</span>
      </div>

      {/* Description */}
      <p className="text-slate-300 text-sm leading-relaxed mb-4 font-sans">
        {item.description}
      </p>

      {/* Responsibilities / Accomplishments */}
      <div className="space-y-2 pt-3 border-t border-white/5">
        {item.responsibilities.map((resp, idx) => (
          <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
            <CheckCircle2 size={14} className="text-cyan-400 shrink-0 mt-0.5" />
            <span>{resp}</span>
          </div>
        ))}
      </div>

      {/* Tech tags */}
      {item.technologies && item.technologies.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-4 pt-3 border-t border-white/5">
          {item.technologies.map((t) => (
            <span key={t} className="px-2 py-0.5 rounded bg-white/[0.04] text-[10px] font-mono text-slate-400">
              {t}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  );
}
