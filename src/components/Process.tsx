import React from 'react';
import { motion } from 'framer-motion';
import { PORTFOLIO_DATA } from '../data';
import { Search, Compass, Code, Rocket, CheckCircle2, ArrowRight } from 'lucide-react';

export default function Process() {
  const { processSteps } = PORTFOLIO_DATA;

  const getStepIcon = (name: string) => {
    switch (name) {
      case 'Search':
        return <Search size={22} className="text-cyan-400" />;
      case 'Compass':
        return <Compass size={22} className="text-purple-400" />;
      case 'Code':
        return <Code size={22} className="text-indigo-400" />;
      case 'Rocket':
        return <Rocket size={22} className="text-emerald-400" />;
      default:
        return <Search size={22} className="text-cyan-400" />;
    }
  };

  return (
    <section id="process" className="py-24 sm:py-32 relative bg-[#050510] px-4 sm:px-6 lg:px-8 border-t border-white/5">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-5xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel border border-purple-500/30 text-purple-300 font-mono text-xs tracking-widest uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
            06 — HOW I WORK
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-tight max-w-2xl">
            A Disciplined <span className="gradient-text">4-Step Blueprint</span>
          </h2>
          <p className="mt-4 text-slate-400 text-base max-w-xl font-sans">
            How I transform ambiguous requirements into autonomous AI systems and high-conversion software products.
          </p>
        </div>

        {/* Stacking Cards Process Container */}
        <div className="space-y-6 sm:space-y-8">
          {processSteps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              style={{
                top: `calc(80px + ${index * 20}px)`,
              }}
              className="relative md:sticky glass-panel rounded-3xl p-5 sm:p-8 md:p-10 border border-white/10 shadow-2xl hover:border-cyan-500/40 transition-colors bg-[#08081A]/95 backdrop-blur-2xl"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                
                {/* Left col: Step Number & Title */}
                <div className="md:col-span-5 flex flex-col items-start">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-center">
                      {getStepIcon(step.iconName)}
                    </div>
                    <span className="font-mono text-xs text-cyan-400 tracking-widest uppercase bg-cyan-950/50 px-3 py-1 rounded-full border border-cyan-500/30">
                      {step.step}
                    </span>
                  </div>

                  <span className="font-mono font-black text-4xl sm:text-5xl text-purple-500/30 mb-2">
                    {step.number}
                  </span>

                  <h3 className="font-display font-bold text-2xl sm:text-3xl text-white">
                    {step.title}
                  </h3>
                </div>

                {/* Right col: Description & Key Outputs */}
                <div className="md:col-span-7 flex flex-col justify-between">
                  <p className="text-slate-300 text-base leading-relaxed mb-6 font-sans">
                    {step.description}
                  </p>

                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-2">
                    <span className="font-mono text-[11px] text-purple-300 tracking-wider uppercase block mb-1">
                      KEY DELIVERABLES:
                    </span>
                    {step.keyOutputs.map((output, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-slate-200">
                        <CheckCircle2 size={15} className="text-cyan-400 shrink-0" />
                        <span>{output}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
