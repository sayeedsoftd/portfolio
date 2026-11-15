import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { PORTFOLIO_DATA } from '../data';
import MagneticButton from './MagneticButton';
import { 
  MapPin, Clock, Flame, Sparkles, Terminal, 
  Database, Bot, Code2, ArrowUpRight, CheckCircle2 
} from 'lucide-react';

// Counter component that animates up when scrolled into view
function StatCounter({ target, suffix = '', duration = 2 }: { target: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = target;
    const isDecimal = !Number.isInteger(target);
    const totalSteps = 60;
    const stepTime = (duration * 1000) / totalSteps;
    const increment = (end - start) / totalSteps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        clearInterval(timer);
        setCount(end);
      } else {
        setCount(isDecimal ? parseFloat(start.toFixed(1)) : Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, target, duration]);

  return (
    <span ref={ref} className="font-display font-extrabold text-3xl sm:text-4xl text-white">
      {count}{suffix}
    </span>
  );
}

// 3D Tilt Card component
function TiltPhotoCard({ photo, alt }: { photo: string; alt: string }) {
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

    const newRotX = ((y - centerY) / centerY) * -12;
    const newRotY = ((x - centerX) / centerX) * 12;

    setRotX(newRotX);
    setRotY(newRotY);
  };

  const handleMouseLeave = () => {
    setRotX(0);
    setRotY(0);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1000 }}
      className="relative w-full h-full min-h-[340px] rounded-3xl overflow-hidden glass-panel border border-white/10 group cursor-pointer"
    >
      <motion.div
        animate={{ rotateX: rotX, rotateY: rotY }}
        transition={{ type: 'spring', damping: 20, stiffness: 200 }}
        className="w-full h-full relative"
      >
        <img
          src={photo}
          alt={alt}
          className="w-full h-full object-cover object-center filter contrast-110 saturate-105 group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050510] via-transparent to-transparent opacity-70" />
        
        {/* Holographic corner tech markers */}
        <div className="absolute top-4 left-4 font-mono text-[10px] text-cyan-400 bg-black/60 px-2 py-1 rounded backdrop-blur-md border border-cyan-500/30">
          SYS.ID // ABU_SAYEED
        </div>
        <div className="absolute top-4 right-4 font-mono text-[10px] text-purple-400 bg-black/60 px-2 py-1 rounded backdrop-blur-md border border-purple-500/30">
          CSE.DIIT
        </div>

        <div className="absolute bottom-4 left-4 right-4 p-3 rounded-2xl bg-slate-950/80 backdrop-blur-md border border-white/10">
          <p className="font-display font-bold text-white text-sm">Abu Sayeed</p>
          <p className="font-mono text-xs text-cyan-400">AI Automation Expert & Web Developer</p>
        </div>
      </motion.div>
    </div>
  );
}

export default function About() {
  const { personal, stats } = PORTFOLIO_DATA;
  const [bangladeshTime, setBangladeshTime] = useState('');

  // Live Bangladesh (Asia/Dhaka) local clock
  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const timeStr = now.toLocaleTimeString('en-US', {
          timeZone: 'Asia/Dhaka',
          hour12: true,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        });
        setBangladeshTime(timeStr);
      } catch {
        setBangladeshTime('18:30:00 PM');
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="about" className="py-24 sm:py-32 relative bg-[#050510] px-4 sm:px-6 lg:px-8">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        
        {/* Section Header with Numbered Label */}
        <div className="flex flex-col items-start mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel border border-purple-500/30 text-purple-300 font-mono text-xs tracking-widest uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
            01 — ABOUT ME
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-tight max-w-3xl">
            Pioneering <span className="gradient-text">Intelligent Workflows</span> & High-Impact Software
          </h2>
          <p className="mt-4 text-slate-400 text-base sm:text-lg max-w-2xl font-sans">
            A developer obsessed with eliminating friction, designing lightning-fast reactive web interfaces, and building autonomous agent pipelines.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

          {/* Bento Item 1: Extended Bio (col-span-8) */}
          <div className="md:col-span-8 glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 relative overflow-hidden flex flex-col justify-between">
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />

            <div>
              <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-wider mb-4">
                <Terminal size={15} />
                <span>BIOGRAPHY & PHILOSOPHY</span>
              </div>
              
              <h3 className="font-display font-bold text-2xl sm:text-3xl text-white mb-4">
                Turning complex problems into elegant, autonomous solutions.
              </h3>

              <div className="space-y-4 text-slate-300 text-base leading-relaxed">
                <p>
                  {personal.bio}
                </p>
                {personal.extendedBio.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>

              {/* Highlights tags */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6 pt-6 border-t border-white/10">
                <div className="flex items-center gap-2 text-sm text-slate-200">
                  <CheckCircle2 size={16} className="text-cyan-400 shrink-0" />
                  <span>B.Sc. in CSE at DIIT (Graduating 2026)</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-200">
                  <CheckCircle2 size={16} className="text-purple-400 shrink-0" />
                  <span>40%+ Operational Labor Reduction</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-200">
                  <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                  <span>Production FastAPI & React Architect</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-200">
                  <CheckCircle2 size={16} className="text-blue-400 shrink-0" />
                  <span>Autonomous Multi-Agent Gemini Systems</span>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <MagneticButton href="#contact" variant="primary" className="py-2.5 px-6 text-sm">
                Get In Touch
              </MagneticButton>
              <a
                href={personal.socialLinks[1].url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors"
              >
                <span>View GitHub Repositories</span>
                <ArrowUpRight size={16} />
              </a>
            </div>
          </div>

          {/* Bento Item 2: Photo Card with 3D Tilt (col-span-4) */}
          <div className="md:col-span-4">
            <TiltPhotoCard photo={personal.profilePhoto} alt={personal.profilePhotoAlt} />
          </div>

          {/* Bento Item 3: Animated Stat Counters Card (col-span-4) */}
          <div className="md:col-span-4 glass-panel rounded-3xl p-6 border border-white/10 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-xs text-purple-400 uppercase tracking-wider">
                // TRACK RECORD
              </span>
              <Flame size={18} className="text-amber-400 animate-pulse" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              {stats.slice(0, 4).map((stat) => (
                <div key={stat.id} className="p-3 rounded-2xl bg-white/[0.03] border border-white/5">
                  <StatCounter target={stat.number} suffix={stat.suffix} />
                  <p className="font-display font-medium text-xs text-slate-300 mt-1">{stat.label}</p>
                  <p className="text-[10px] text-slate-500 leading-tight mt-0.5">{stat.subtext}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Bento Item 4: Currently Working On (col-span-4) */}
          <div className="md:col-span-4 glass-panel rounded-3xl p-6 border border-white/10 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs text-cyan-400 uppercase tracking-wider">
                  // LIVE LAB EXPERIMENTS
                </span>
                <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-mono border border-emerald-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  ACTIVE
                </span>
              </div>

              <h4 className="font-display font-bold text-lg text-white mb-2">
                Currently Engineering
              </h4>

              <p className="text-slate-300 text-sm leading-relaxed mb-4">
                {personal.status.currentlyBuilding}
              </p>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                  <span>Gemini 1.5 Multi-Agent Swarm</span>
                  <span className="text-cyan-400">92%</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-gradient-to-r from-purple-500 to-cyan-400 h-full rounded-full w-[92%]" />
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-white/5 flex items-center gap-2 text-xs text-slate-400 font-mono">
              <Bot size={14} className="text-purple-400" />
              <span>Autonomous workflow benchmarks</span>
            </div>
          </div>

          {/* Bento Item 5: Location Card & Time (col-span-4) */}
          <div className="md:col-span-4 glass-panel rounded-3xl p-6 border border-white/10 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs text-purple-400 uppercase tracking-wider">
                  // TIME & LOCATION
                </span>
                <MapPin size={16} className="text-purple-400" />
              </div>

              <div className="flex items-center gap-2 text-white font-display font-bold text-xl mb-1">
                <span>{personal.location}</span>
              </div>

              <p className="font-mono text-xs text-slate-400 mb-4">
                Coordinates: 23.4682° N, 91.1788° E
              </p>

              {/* Bangladesh Local Clock */}
              <div className="p-3 rounded-2xl bg-slate-900/80 border border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-cyan-400" />
                  <span className="font-mono text-xs text-slate-300">Local Time (BST):</span>
                </div>
                <span className="font-mono font-bold text-sm text-cyan-300 tracking-wider">
                  {bangladeshTime || '18:30:00 PM'}
                </span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Available Worldwide
              </span>
              <span>UTC +6:00</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
