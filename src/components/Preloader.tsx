import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundManager } from '../utils/sound';

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [count, setCount] = useState(0);
  const [statusText, setStatusText] = useState('BOOTING CORE ENGINE...');
  const nameLetters = 'ABU SAYEED'.split('');

  useEffect(() => {
    // Sound cue
    soundManager.playChime();

    // Smooth counter progression
    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Accelerate as it nears 100
        const step = Math.max(1, Math.floor((100 - prev) / 6));
        const next = Math.min(100, prev + step);

        if (next > 25 && next <= 60) {
          setStatusText('INITIALIZING THREE.JS WEBGL...');
        } else if (next > 60 && next <= 85) {
          setStatusText('SYNCING AI PIPELINES...');
        } else if (next > 85) {
          setStatusText('WELCOME TO THE EXPERIENCE');
        }

        return next;
      });
    }, 45);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (count === 100) {
      const timer = setTimeout(() => {
        onComplete();
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [count, onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        key="preloader"
        initial={{ y: 0 }}
        exit={{
          y: '-100%',
          transition: { duration: 0.95, ease: [0.77, 0, 0.175, 1] },
        }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050510] text-white px-6 select-none overflow-hidden"
      >
        {/* Subtle background glow */}
        <div className="absolute w-[450px] h-[450px] rounded-full bg-purple-600/15 blur-[120px] pointer-events-none -top-20 -left-20" />
        <div className="absolute w-[450px] h-[450px] rounded-full bg-cyan-500/15 blur-[120px] pointer-events-none -bottom-20 -right-20" />

        {/* Ambient Grid */}
        <div className="absolute inset-0 bg-grid-cyber opacity-40 pointer-events-none" />

        {/* Main Content */}
        <div className="relative z-10 flex flex-col items-center text-center max-w-lg w-full">
          {/* Top Cyber Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-950/20 text-purple-300 font-mono text-xs tracking-widest uppercase mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span>AI AUTOMATION PORTFOLIO</span>
          </motion.div>

          {/* Letter by Letter Staggered Name */}
          <div className="flex overflow-hidden mb-6">
            {nameLetters.map((char, index) => (
              <motion.span
                key={index}
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.05,
                  ease: [0.215, 0.61, 0.355, 1],
                }}
                className={`font-display text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight ${
                  char === ' ' ? 'w-4 sm:w-6' : 'gradient-text'
                }`}
              >
                {char}
              </motion.span>
            ))}
          </div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-slate-400 text-sm sm:text-base font-mono tracking-wider mb-8"
          >
            TURNING BORING WORK INTO SMART AUTOMATION
          </motion.p>

          {/* Futuristic Progress Bar */}
          <div className="w-full bg-slate-900/80 rounded-full h-1.5 p-0.5 border border-white/10 mb-4 overflow-hidden relative">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-400 shadow-glow-multi"
              style={{ width: `${count}%` }}
              transition={{ ease: 'easeOut' }}
            />
          </div>

          {/* Counter and Status readout */}
          <div className="flex items-center justify-between w-full font-mono text-xs text-slate-400">
            <span className="flex items-center gap-1.5 text-cyan-400">
              <span className="inline-block w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" />
              {statusText}
            </span>
            <span className="text-white font-bold tracking-widest text-sm">
              {count}%
            </span>
          </div>
        </div>

        {/* Bottom copyright / brand stamp */}
        <div className="absolute bottom-8 font-mono text-[11px] text-slate-600 tracking-widest">
          SYS.V1.0 // DIIT CSE 2026 // DHAKA BANGLADESH
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
