import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PORTFOLIO_DATA, Project } from '../data';
import ProjectModal from './ProjectModal';
import { soundManager } from '../utils/sound';
import { 
  Sparkles, ExternalLink, Github, ArrowUpRight, 
  Bot, Code2, Database, Layers, CheckCircle2 
} from 'lucide-react';

// Single 3D Tilt Project Card
function ProjectCard({ 
  project, 
  onSelect, 
  onMouseEnter, 
  onMouseLeave 
}: { 
  project: Project; 
  onSelect: (p: Project) => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotX, setRotX] = useState(0);
  const [rotY, setRotY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const newRotX = ((y - centerY) / centerY) * -8;
    const newRotY = ((x - centerX) / centerX) * 8;

    setRotX(newRotX);
    setRotY(newRotY);
  };

  const handleMouseLeave = () => {
    setRotX(0);
    setRotY(0);
    if (onMouseLeave) onMouseLeave();
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => {
        soundManager.playClick();
        onSelect(project);
      }}
      style={{ perspective: 1000 }}
      className="group cursor-pointer"
    >
      <motion.div
        animate={{ rotateX: rotX, rotateY: rotY }}
        transition={{ type: 'spring', damping: 20, stiffness: 220 }}
        className="glass-panel rounded-3xl overflow-hidden border border-white/10 hover:border-cyan-500/50 transition-colors duration-300 flex flex-col justify-between h-full group-hover:shadow-glow-cyan"
      >
        {/* Card Image Banner */}
        <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 filter brightness-90 group-hover:brightness-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#09091E] via-transparent to-transparent opacity-85" />

          {/* Top badges */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
            <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-xs font-mono text-purple-300 border border-purple-500/30">
              {project.category}
            </span>
            {project.featured && (
              <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-cyan-950/80 backdrop-blur-md text-[11px] font-mono text-cyan-300 border border-cyan-500/40">
                <Sparkles size={11} className="text-cyan-400" />
                FEATURED
              </span>
            )}
          </div>

          {/* Hover Overlay Arrow Button */}
          <div className="absolute bottom-4 right-4 w-11 h-11 rounded-full bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:bg-cyan-400 group-hover:text-black group-hover:rotate-45 transition-all duration-300 shadow-lg">
            <ArrowUpRight size={20} />
          </div>
        </div>

        {/* Card Body */}
        <div className="p-6 flex flex-col justify-between flex-grow">
          <div>
            <h3 className="font-display font-bold text-xl text-white group-hover:text-cyan-300 transition-colors mb-2 line-clamp-1">
              {project.title}
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm line-clamp-2 leading-relaxed mb-4">
              {project.description}
            </p>
          </div>

          <div>
            {/* Tech Tags */}
            <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/5">
              {project.tags.slice(0, 4).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded-md bg-white/[0.04] text-[11px] font-mono text-slate-400 border border-white/5 group-hover:border-purple-500/20"
                >
                  {tag}
                </span>
              ))}
              {project.tags.length > 4 && (
                <span className="px-1.5 py-0.5 text-[11px] font-mono text-purple-400">
                  +{project.tags.length - 4}
                </span>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects({
  onHoverProjectCard,
}: {
  onHoverProjectCard?: (isHover: boolean) => void;
}) {
  const { projects } = PORTFOLIO_DATA;
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  const categories = ['All', 'AI & Automation', 'Full-Stack', 'Database & Backend'];

  const filteredProjects =
    selectedCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  return (
    <section id="projects" className="py-24 sm:py-32 relative bg-[#050510] px-4 sm:px-6 lg:px-8 border-t border-white/5">
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-cyan-500/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel border border-purple-500/30 text-purple-300 font-mono text-xs tracking-widest uppercase mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
              04 — SELECTED WORKS
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-tight">
              Featured <span className="gradient-text">Productions</span> & Automations
            </h2>
            <p className="mt-3 text-slate-400 text-base max-w-xl font-sans">
              Click any project to inspect architectural blueprints, system metrics, and source repositories.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl glass-panel border border-white/10 self-start md:self-end">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => {
                    soundManager.playClick();
                    setSelectedCategory(cat);
                  }}
                  className={`relative px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
                    isActive ? 'text-white' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeProjectCategory"
                      className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-500 rounded-xl shadow-glow-multi -z-10"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Grid of Projects (Each project shown cleanly once) */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onSelect={(p) => setActiveModalProject(p)}
                onMouseEnter={() => onHoverProjectCard && onHoverProjectCard(true)}
                onMouseLeave={() => onHoverProjectCard && onHoverProjectCard(false)}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Bottom GitHub repositories prompt */}
        <div className="mt-14 text-center">
          <p className="font-mono text-xs text-slate-400 mb-4">
            WANT TO EXPLORE MORE OPEN-SOURCE SCRIPTS & AUTOMATIONS?
          </p>
          <a
            href={PORTFOLIO_DATA.personal.socialLinks[1].url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass-panel border border-white/15 hover:border-cyan-400 text-white font-mono text-xs uppercase tracking-wider hover:shadow-glow-cyan transition-all"
          >
            <Github size={16} className="text-cyan-400" />
            <span>Browse All Repositories on GitHub</span>
            <ArrowUpRight size={14} className="text-purple-400" />
          </a>
        </div>

      </div>

      {/* Comprehensive Project Detail Modal */}
      <ProjectModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
      />
    </section>
  );
}
