import React, { useState, useEffect, Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { PORTFOLIO_DATA } from '../data';
import MagneticButton from './MagneticButton';
import { 
  Sparkles, FileText, ArrowDown, Github, Linkedin, 
  Facebook, Instagram, Bot, Cpu, Zap, Code2, CheckCircle2 
} from 'lucide-react';

// Lazy-load the heavy 3D canvas for performance & mobile efficiency
const Hero3D = lazy(() => import('./Hero3D'));

export default function Hero() {
  const { personal } = PORTFOLIO_DATA;
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayedRole, setDisplayedRole] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Typewriter effect for rotating roles
  useEffect(() => {
    const fullText = personal.rotatingRoles[currentRoleIndex];
    const typingSpeed = isDeleting ? 40 : 80;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayedRole(fullText.substring(0, displayedRole.length + 1));
        if (displayedRole.length + 1 === fullText.length) {
          setTimeout(() => setIsDeleting(true), 1800);
        }
      } else {
        setDisplayedRole(fullText.substring(0, displayedRole.length - 1));
        if (displayedRole.length === 0) {
          setIsDeleting(false);
          setCurrentRoleIndex((prev) => (prev + 1) % personal.rotatingRoles.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayedRole, isDeleting, currentRoleIndex, personal.rotatingRoles]);

  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden px-4 sm:px-6 lg:px-8 bg-[#050510]"
    >
      {/* Background Animated Gradient Aurora Mesh */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-purple-600/20 blur-[140px] pointer-events-none animate-pulse-glow" />
      <div className="absolute top-1/2 right-1/4 translate-x-1/4 -translate-y-1/2 w-[450px] h-[450px] rounded-full bg-cyan-500/15 blur-[140px] pointer-events-none animate-pulse-glow delay-1000" />
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-indigo-600/15 blur-[160px] pointer-events-none" />

      {/* Cyber Grid & Film Grain Overlays */}
      <div className="absolute inset-0 bg-grid-cyber opacity-35 pointer-events-none" />
      <div className="absolute inset-0 bg-grain pointer-events-none" />

      {/* Social Rail (Desktop Fixed Left) */}
      <div className="hidden lg:flex fixed left-6 top-1/2 -translate-y-1/2 z-30 flex-col items-center gap-5">
        <div className="w-[1px] h-16 bg-gradient-to-b from-transparent to-purple-500/50" />
        {personal.socialLinks.map((social) => {
          const Icon = 
            social.name === 'GitHub' ? Github :
            social.name === 'LinkedIn' ? Linkedin :
            social.name === 'Facebook' ? Facebook : Instagram;

          return (
            <motion.a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.25, x: 3 }}
              className="text-slate-400 hover:text-cyan-400 transition-colors p-2 rounded-full hover:bg-white/5 border border-transparent hover:border-white/10"
              title={social.name}
            >
              <Icon size={18} />
            </motion.a>
          );
        })}
        <div className="w-[1px] h-16 bg-gradient-to-t from-transparent to-cyan-500/50" />
      </div>

      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
        
        {/* Left Column: Headline, Typewriter, Intro, Magnetic Buttons */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          
          {/* Status Capsule */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full glass-panel border border-purple-500/30 text-xs font-mono text-slate-300 mb-6 shadow-glow-purple"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500" />
            </span>
            <span className="text-cyan-300 font-semibold">{personal.location}</span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-300 hidden sm:inline">{personal.status.text}</span>
          </motion.div>

          {/* Giant Display Name / Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="flex flex-col mb-4"
          >
            <span className="font-mono text-sm sm:text-base text-purple-400 tracking-widest uppercase mb-1">
              // HELLO WORLD, I AM
            </span>
            <h1 className="font-display font-extrabold text-5xl sm:text-7xl lg:text-8xl tracking-tight leading-[0.95] text-white">
              {personal.fullName}
            </h1>
          </motion.div>

          {/* Tagline with Gradient Highlight */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-display font-bold text-2xl sm:text-3xl md:text-4xl text-slate-200 tracking-tight leading-snug mb-5"
          >
            <span>{personal.heroTaglinePrefix} </span>
            <span className="gradient-text underline decoration-cyan-400/40 decoration-wavy underline-offset-8">
              {personal.heroTaglineHighlight}
            </span>
          </motion.div>

          {/* Typewriter Rotating Role */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center gap-2 font-mono text-sm sm:text-lg text-cyan-400 bg-cyan-950/20 px-3.5 py-1.5 rounded-lg border border-cyan-500/20 mb-6"
          >
            <Zap size={16} className="text-cyan-400 animate-pulse" />
            <span>Specialized as: </span>
            <span className="text-white font-bold">{displayedRole}</span>
            <span className="inline-block w-2 h-4 bg-cyan-400 animate-pulse" />
          </motion.div>

          {/* Short Bio text */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl mb-8 font-sans"
          >
            {personal.bio}
          </motion.p>

          {/* Magnetic CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap items-center gap-4 sm:gap-6"
          >
            <MagneticButton
              href="#contact"
              variant="primary"
              className="py-3.5 px-8 text-base font-semibold shadow-glow-multi"
            >
              <Sparkles size={18} className="text-cyan-300 animate-spin-slow" />
              <span>Hire Me Now</span>
            </MagneticButton>

            <MagneticButton
              href="#projects"
              variant="secondary"
              className="py-3.5 px-7 text-base font-semibold"
            >
              <Code2 size={18} className="text-cyan-400" />
              <span>Explore Projects</span>
            </MagneticButton>

            <MagneticButton
              href="mailto:abusayeedt202@gmail.com?subject=Inquiry%20from%20Portfolio"
              variant="glass"
              className="py-3.5 px-6 text-sm font-medium text-slate-300 hover:text-white"
            >
              <FileText size={16} className="text-purple-400" />
              <span>Direct Email</span>
            </MagneticButton>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="flex flex-wrap items-center gap-4 mt-8 pt-6 border-t border-white/10 text-xs font-mono text-slate-400"
          >
            <span className="flex items-center gap-1.5 text-slate-300">
              <CheckCircle2 size={14} className="text-emerald-400" /> 100% Custom Architecture
            </span>
            <span className="flex items-center gap-1.5 text-slate-300">
              <CheckCircle2 size={14} className="text-cyan-400" /> Zero Manual Bottlenecks
            </span>
            <span className="flex items-center gap-1.5 text-slate-300">
              <CheckCircle2 size={14} className="text-purple-400" /> 24/7 Automation Reliability
            </span>
          </motion.div>
        </div>

        {/* Right Column: 3D Scene + Floating Profile Portrait + Orbiting Badges */}
        <div className="lg:col-span-5 relative flex items-center justify-center">
          
          {/* Interactive 3D Canvas Background */}
          <div className="w-full h-[400px] sm:h-[480px] lg:h-[550px] relative z-10 flex items-center justify-center">
            <Suspense fallback={
              <div className="w-64 h-64 rounded-full bg-gradient-to-tr from-purple-600/30 to-cyan-500/30 blur-2xl animate-pulse" />
            }>
              <Hero3D />
            </Suspense>

            {/* Glowing Center Holographic Avatar / Profile Photo */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="absolute pointer-events-auto"
            >
              <div className="relative group">
                {/* Glowing conic gradient ring */}
                <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-r from-purple-600 via-cyan-400 to-indigo-600 blur-md opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-spin-slow" />
                
                <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-2xl overflow-hidden border-2 border-white/20 glass-panel shadow-2xl">
                  <img
                    src={personal.profilePhoto}
                    alt={personal.profilePhotoAlt}
                    className="w-full h-full object-cover object-center filter contrast-105 brightness-95 group-hover:scale-105 transition-transform duration-500"
                    loading="eager"
                  />
                  {/* Subtle inner holographic vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050510] via-transparent to-transparent opacity-60" />
                  
                  {/* Bottom Avatar Tag */}
                  <div className="absolute bottom-2 left-2 right-2 px-2.5 py-1.5 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-between text-[11px] font-mono">
                    <span className="text-slate-200 font-bold">Abu Sayeed</span>
                    <span className="text-cyan-400 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                      LIVE
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Orbiting / Floating Tech Badges */}
            {/* Badge 1: Top-Left AI & Gemini */}
            <motion.div
              animate={{ y: [-8, 8, -8], x: [-4, 4, -4] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-4 -left-4 sm:left-2 z-20 glass-pill px-3 py-1.5 rounded-xl border border-purple-500/40 shadow-glow-purple flex items-center gap-2 text-xs font-mono text-purple-200"
            >
              <div className="w-6 h-6 rounded-lg bg-purple-600/30 flex items-center justify-center text-purple-300">
                <Bot size={14} />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-white text-[11px]">Gemini 1.5 Pro</span>
                <span className="text-[9px] text-purple-300">Autonomous Agents</span>
              </div>
            </motion.div>

            {/* Badge 2: Top-Right FastAPI & Python */}
            <motion.div
              animate={{ y: [8, -8, 8], x: [4, -4, 4] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="absolute -top-2 -right-4 sm:right-2 z-20 glass-pill px-3 py-1.5 rounded-xl border border-cyan-500/40 shadow-glow-cyan flex items-center gap-2 text-xs font-mono text-cyan-200"
            >
              <div className="w-6 h-6 rounded-lg bg-cyan-600/30 flex items-center justify-center text-cyan-300">
                <Zap size={14} />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-white text-[11px]">FastAPI & Python</span>
                <span className="text-[9px] text-cyan-300">Async Microservices</span>
              </div>
            </motion.div>

            {/* Badge 3: Bottom-Left React & Vite */}
            <motion.div
              animate={{ y: [-6, 6, -6], x: [5, -5, 5] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              className="absolute -bottom-4 -left-2 sm:left-4 z-20 glass-pill px-3 py-1.5 rounded-xl border border-indigo-500/40 shadow-glow-multi flex items-center gap-2 text-xs font-mono text-indigo-200"
            >
              <div className="w-6 h-6 rounded-lg bg-indigo-600/30 flex items-center justify-center text-indigo-300">
                <Cpu size={14} />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-white text-[11px]">React 19 & Vite</span>
                <span className="text-[9px] text-indigo-300">60 FPS Fluid UI</span>
              </div>
            </motion.div>

            {/* Badge 4: Bottom-Right PostgreSQL & Docker */}
            <motion.div
              animate={{ y: [6, -6, 6], x: [-4, 4, -4] }}
              transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
              className="absolute -bottom-6 -right-2 sm:right-6 z-20 glass-pill px-3 py-1.5 rounded-xl border border-emerald-500/40 flex items-center gap-2 text-xs font-mono text-emerald-200"
            >
              <div className="w-6 h-6 rounded-lg bg-emerald-600/30 flex items-center justify-center text-emerald-300">
                <CheckCircle2 size={14} />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-white text-[11px]">PostgreSQL & Docker</span>
                <span className="text-[9px] text-emerald-300">Production Ready</span>
              </div>
            </motion.div>

          </div>
        </div>
      </div>

      {/* Scroll Down Mouse Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-auto"
      >
        <a
          href="#marquee"
          className="flex flex-col items-center gap-1 text-slate-400 hover:text-cyan-400 transition-colors group"
        >
          <span className="font-mono text-[10px] tracking-widest uppercase">
            SCROLL DOWN
          </span>
          <div className="w-5 h-8 rounded-full border-2 border-slate-600 group-hover:border-cyan-400 flex justify-center p-1 transition-colors">
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              className="w-1.5 h-1.5 rounded-full bg-cyan-400"
            />
          </div>
          <ArrowDown size={14} className="text-slate-500 group-hover:text-cyan-400 transition-colors -mt-0.5" />
        </a>
      </motion.div>
    </section>
  );
}
