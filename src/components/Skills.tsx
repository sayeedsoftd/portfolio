import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PORTFOLIO_DATA } from '../data';
import { Bot, Globe, Server, Database, Cpu, Sparkles, CheckCircle2 } from 'lucide-react';

export default function Skills() {
  const { skillCategories } = PORTFOLIO_DATA;
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', name: 'All Arsenal', icon: Sparkles },
    { id: 'AI & Automation', name: 'AI & Automation', icon: Bot },
    { id: 'Full-Stack Web Development', name: 'Frontend & UI', icon: Globe },
    { id: 'Backend & Distributed Systems', name: 'FastAPI & Backend', icon: Server },
    { id: 'Database Design & Performance', name: 'Databases & Redis', icon: Database },
    { id: 'DevOps & Engineering Tools', name: 'DevOps & Docker', icon: Cpu },
  ];

  const filteredCategories =
    activeCategory === 'all'
      ? skillCategories
      : skillCategories.filter((cat) => cat.category === activeCategory);

  return (
    <section id="skills" className="py-24 sm:py-32 relative bg-[#070718] px-4 sm:px-6 lg:px-8 border-t border-white/5">
      {/* Background Aurora */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel border border-cyan-500/30 text-cyan-300 font-mono text-xs tracking-widest uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            02 — SKILLS & EXPERTISE
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-tight max-w-3xl">
            Engineered with <span className="gradient-text">Precision</span> & Modern Technology
          </h2>
          <p className="mt-4 text-slate-400 text-base sm:text-lg max-w-2xl font-sans">
            Specialized in autonomous multi-agent pipelines, high-concurrency Python/FastAPI backends, and responsive React/Vite interfaces.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {categories.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeCategory === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-medium tracking-wide transition-all whitespace-nowrap border ${
                  isActive
                    ? 'bg-gradient-to-r from-purple-600 to-cyan-500 text-white border-white/20 shadow-glow-multi'
                    : 'bg-white/[0.03] text-slate-400 border-white/5 hover:text-white hover:bg-white/[0.08]'
                }`}
              >
                <Icon size={14} className={isActive ? 'text-white' : 'text-cyan-400'} />
                <span>{tab.name}</span>
              </button>
            );
          })}
        </div>

        {/* Categorized Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((cat, idx) => {
            const Icon = 
              cat.category.includes('AI') ? Bot :
              cat.category.includes('Full-Stack') ? Globe :
              cat.category.includes('Backend') ? Server :
              cat.category.includes('Database') ? Database : Cpu;

            return (
              <motion.div
                key={cat.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="glass-panel rounded-3xl p-6 border border-white/10 hover:border-purple-500/40 transition-all duration-300 flex flex-col justify-between group hover:shadow-glow-purple"
              >
                <div>
                  {/* Category Header */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                        <Icon size={18} />
                      </div>
                      <h3 className="font-display font-bold text-lg text-white">
                        {cat.category}
                      </h3>
                    </div>
                  </div>

                  <p className="text-slate-400 text-xs font-sans mb-6">
                    {cat.description}
                  </p>

                  {/* Skills List with Progress Bars */}
                  <div className="space-y-4">
                    {cat.skills.map((skill) => (
                      <div key={skill.name} className="group/skill">
                        <div className="flex items-center justify-between text-xs font-mono mb-1.5">
                          <span className={`font-medium flex items-center gap-1.5 ${skill.highlight ? 'text-cyan-300' : 'text-slate-200'}`}>
                            {skill.highlight && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />}
                            {skill.name}
                          </span>
                          <span className="text-slate-400 font-bold">{skill.level}%</span>
                        </div>
                        {/* Progress Bar */}
                        <div className="w-full bg-slate-900 rounded-full h-1.5 p-[1px] border border-white/5 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: 'easeOut' }}
                            className={`h-full rounded-full ${
                              skill.highlight
                                ? 'bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-400 shadow-glow-cyan'
                                : 'bg-gradient-to-r from-purple-600 to-indigo-500'
                            }`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-500">
                  <span>PRODUCTION READY</span>
                  <span className="text-purple-400 flex items-center gap-1">
                    <CheckCircle2 size={12} /> VERIFIED
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
