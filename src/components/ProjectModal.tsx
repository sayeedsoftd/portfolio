import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '../data';
import MagneticButton from './MagneticButton';
import { soundManager } from '../utils/sound';
import { 
  X, ExternalLink, Github, CheckCircle2, 
  Layers, Sparkles, Terminal, Calendar, Tag 
} from 'lucide-react';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-10 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            soundManager.playClick();
            onClose();
          }}
          className="fixed inset-0 bg-[#050510]/85 backdrop-blur-xl"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative z-10 max-w-4xl w-full bg-[#09091E] border border-white/15 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl my-auto max-h-[92vh] flex flex-col"
        >
          {/* Top Header Bar */}
          <div className="p-3.5 sm:p-5 border-b border-white/10 flex items-center justify-between bg-black/40 backdrop-blur-md sticky top-0 z-20">
            <div className="flex items-center gap-2 sm:gap-3 overflow-hidden">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping shrink-0" />
              <span className="font-mono text-[11px] sm:text-xs text-purple-400 uppercase tracking-widest truncate">
                // PROJECT ARCHITECTURE BLUEPRINT
              </span>
            </div>
            <button
              onClick={() => {
                soundManager.playClick();
                onClose();
              }}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/10 text-slate-300 hover:text-white hover:bg-white/20 transition-colors flex items-center justify-center border border-white/10 shrink-0 ml-2"
              aria-label="Close modal"
            >
              <X size={17} />
            </button>
          </div>

          {/* Scrollable Modal Content */}
          <div className="overflow-y-auto p-4 sm:p-8 space-y-6 sm:space-y-8 no-scrollbar">
            
            {/* Main Featured Image */}
            <div className="relative rounded-2xl overflow-hidden border border-white/10 aspect-video max-h-[380px] w-full">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#09091E] via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2">
                <span className="px-3 py-1 rounded-full bg-purple-600/60 backdrop-blur-md text-white font-mono text-xs border border-white/20">
                  {project.category}
                </span>
                <span className="font-mono text-xs text-cyan-300 bg-black/60 px-3 py-1 rounded-full backdrop-blur-md border border-white/10">
                  PRODUCTION SYSTEM
                </span>
              </div>
            </div>

            {/* Title & Tagline */}
            <div>
              <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-white mb-2">
                {project.title}
              </h2>
              <p className="font-mono text-sm text-cyan-400">
                {project.tagline}
              </p>
            </div>

            {/* Detailed Description */}
            <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
              <p>{project.longDescription}</p>
            </div>

            {/* Key Engineering Metrics / Highlights */}
            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10">
              <span className="font-mono text-xs text-purple-300 uppercase tracking-wider block mb-3 flex items-center gap-2">
                <Sparkles size={14} className="text-cyan-400" />
                VERIFIED PERFORMANCE METRICS:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.metrics.map((metric, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs text-slate-200">
                    <CheckCircle2 size={16} className="text-cyan-400 shrink-0" />
                    <span>{metric}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack Tags */}
            <div>
              <span className="font-mono text-xs text-slate-400 uppercase tracking-wider block mb-3">
                TECHNOLOGY ARSENAL:
              </span>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 rounded-xl bg-purple-950/40 text-purple-200 border border-purple-500/30 text-xs font-mono font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Additional Gallery Screens */}
            {project.gallery && project.gallery.length > 1 && (
              <div>
                <span className="font-mono text-xs text-slate-400 uppercase tracking-wider block mb-3">
                  SYSTEM INTERFACES & PREVIEWS:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {project.gallery.map((img, idx) => (
                    <div key={idx} className="rounded-xl overflow-hidden border border-white/10 aspect-video">
                      <img src={img} alt={`Gallery ${idx}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                <MagneticButton
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="primary"
                  className="py-2.5 px-5 sm:py-3 sm:px-6 text-xs sm:text-sm font-semibold w-full sm:w-auto"
                >
                  <Github size={15} />
                  <span>View Repository</span>
                </MagneticButton>

                <MagneticButton
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="secondary"
                  className="py-2.5 px-5 sm:py-3 sm:px-6 text-xs sm:text-sm font-semibold w-full sm:w-auto"
                >
                  <ExternalLink size={15} />
                  <span>Explore Demo</span>
                </MagneticButton>
              </div>

              <span className="text-xs font-mono text-slate-500 hidden sm:inline">
                Crafted by Abu Sayeed
              </span>
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
