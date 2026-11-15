import React, { useState, useEffect } from 'react';
import { PORTFOLIO_DATA } from '../data';
import { soundManager } from '../utils/sound';
import { ArrowUp, Github, Linkedin, Facebook, Instagram, Heart, Sparkles } from 'lucide-react';

export default function Footer() {
  const { personal, footer, navLinks } = PORTFOLIO_DATA;
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      const progress = totalScroll > 0 ? (currentScroll / totalScroll) * 100 : 0;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    soundManager.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Circumference for SVG progress ring
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <footer className="relative bg-[#04040D] border-t border-white/5 pt-20 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-purple-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        
        {/* Main Footer Navigation & Brand Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/10 items-start">
          
          {/* Brand Column */}
          <div className="md:col-span-5 flex flex-col items-start">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-600 to-cyan-400 p-[1.5px] shadow-glow-purple">
                <div className="w-full h-full bg-[#050510] rounded-full flex items-center justify-center font-display font-black text-sm text-white">
                  AS
                </div>
              </div>
              <div>
                <span className="font-display font-bold text-lg text-white block">
                  {personal.fullName}
                </span>
                <span className="text-[11px] font-mono text-cyan-400 tracking-wider">
                  {personal.profession}
                </span>
              </div>
            </div>

            <p className="text-slate-400 text-sm max-w-sm mb-6 leading-relaxed">
              {footer.tagline}
            </p>

            <div className="flex items-center gap-3">
              {personal.socialLinks.map((social) => {
                const Icon = 
                  social.name === 'GitHub' ? Github :
                  social.name === 'LinkedIn' ? Linkedin :
                  social.name === 'Facebook' ? Facebook : Instagram;

                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/15 text-slate-300 hover:text-cyan-400 flex items-center justify-center border border-white/10 transition-colors"
                    title={social.name}
                  >
                    <Icon size={16} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="md:col-span-4 grid grid-cols-2 gap-4">
            <div>
              <span className="font-mono text-xs text-purple-400 uppercase tracking-widest block mb-4">
                // SITEMAP
              </span>
              <ul className="space-y-2 text-sm">
                {navLinks.slice(0, 4).map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-slate-400 hover:text-white transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <span className="font-mono text-xs text-cyan-400 uppercase tracking-widest block mb-4">
                // EXPLORE
              </span>
              <ul className="space-y-2 text-sm">
                {navLinks.slice(4).map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-slate-400 hover:text-white transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Back to Top with Animated Circular Progress Ring */}
          <div className="md:col-span-3 flex flex-col items-start md:items-end justify-between h-full">
            <span className="font-mono text-xs text-slate-500 uppercase tracking-widest mb-4">
              RETURN TO SUMMIT
            </span>

            <button
              onClick={scrollToTop}
              className="group relative flex items-center gap-3 p-2 rounded-full hover:bg-white/5 transition-colors cursor-pointer"
              title="Back to Top"
            >
              <div className="relative w-12 h-12 flex items-center justify-center">
                {/* SVG Progress Ring */}
                <svg className="w-12 h-12 transform -rotate-90">
                  <circle
                    cx="24"
                    cy="24"
                    r={radius}
                    stroke="rgba(255, 255, 255, 0.1)"
                    strokeWidth="3"
                    fill="transparent"
                  />
                  <circle
                    cx="24"
                    cy="24"
                    r={radius}
                    stroke="url(#purpleCyanGradient)"
                    strokeWidth="3"
                    fill="transparent"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    className="transition-all duration-150"
                  />
                  <defs>
                    <linearGradient id="purpleCyanGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#7C3AED" />
                      <stop offset="100%" stopColor="#22D3EE" />
                    </linearGradient>
                  </defs>
                </svg>
                <ArrowUp
                  size={18}
                  className="absolute text-slate-300 group-hover:text-cyan-400 -translate-y-0.5 group-hover:-translate-y-1 transition-transform"
                />
              </div>
              <span className="font-mono text-xs text-slate-400 group-hover:text-white transition-colors">
                Back to Top
              </span>
            </button>
          </div>

        </div>

        {/* Oversized Big Name Display */}
        <div className="py-12 select-none overflow-hidden">
          <h2 className="font-display font-black text-[12vw] tracking-tighter text-white/[0.04] leading-none text-center hover:text-white/[0.07] transition-colors uppercase">
            ABU SAYEED
          </h2>
        </div>

        {/* Bottom Credits & Legal */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div>
            © {footer.copyrightYear} Abu Sayeed. All rights reserved.
          </div>
          <div className="flex items-center gap-2">
            <span>Built with precision:</span>
            <span className="text-slate-400 font-semibold">{footer.builtWith}</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
