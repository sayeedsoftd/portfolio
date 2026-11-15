import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PORTFOLIO_DATA } from '../data';
import { soundManager } from '../utils/sound';
import MagneticButton from './MagneticButton';
import { 
  Menu, X, Volume2, VolumeX, Moon, Sun, 
  Sparkles, ArrowRight, Github, Linkedin 
} from 'lucide-react';

interface NavbarProps {
  activeSection: string;
  isDark: boolean;
  toggleTheme: () => void;
}

export default function Navbar({ activeSection, isDark, toggleTheme }: NavbarProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(soundManager.getMuted());

  // Hide on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 100) {
        if (currentScrollY > lastScrollY && !mobileMenuOpen) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, mobileMenuOpen]);

  const handleSoundToggle = () => {
    const next = soundManager.toggleMute();
    setIsMuted(next);
  };

  const handleLinkClick = (href: string) => {
    soundManager.playClick();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-4 md:top-6 left-0 right-0 z-40 flex justify-center px-4 transition-transform duration-500 ease-in-out ${
          isVisible ? 'translate-y-0' : '-translate-y-28'
        }`}
      >
        <nav className="glass-pill rounded-full px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between gap-4 max-w-5xl w-full mx-auto border border-white/10 shadow-2xl backdrop-blur-xl">
          {/* Brand Logo with Live Pulse Dot */}
          <a
            href="#hero"
            onClick={() => handleLinkClick('#hero')}
            className="flex items-center gap-2.5 group cursor-pointer"
          >
            <div className="relative w-9 h-9 rounded-full bg-gradient-to-tr from-purple-600 via-indigo-600 to-cyan-400 p-[1.5px] shadow-glow-purple">
              <div className="w-full h-full bg-[#070718] rounded-full flex items-center justify-center font-display font-black text-sm text-white group-hover:scale-105 transition-transform">
                AS
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-sm tracking-tight text-white flex items-center gap-1.5">
                Abu Sayeed
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" title="Available for hire" />
              </span>
              <span className="text-[10px] text-cyan-400 font-mono tracking-wider -mt-0.5">
                AI AUTOMATION
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1 bg-white/5 rounded-full px-3 py-1 border border-white/5">
            {PORTFOLIO_DATA.navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(link.href);
                  }}
                  onMouseEnter={() => soundManager.playHover()}
                  className={`relative px-3.5 py-1.5 text-xs font-medium tracking-wide transition-colors duration-200 rounded-full ${
                    isActive
                      ? 'text-white'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavPill"
                      className="absolute inset-0 bg-gradient-to-r from-purple-600/40 via-indigo-600/40 to-cyan-500/40 border border-white/15 rounded-full shadow-glow-purple -z-10"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  {link.name}
                </a>
              );
            })}
          </div>

          {/* Controls: Sound Toggle + Theme Toggle + Hire Me */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Audio Toggle */}
            <button
              onClick={handleSoundToggle}
              title={isMuted ? 'Unmute Audio SFX' : 'Mute Audio SFX'}
              className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-cyan-300 hover:bg-white/10 transition-colors border border-white/5"
              aria-label="Toggle sound effects"
            >
              {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} className="text-cyan-400 animate-pulse" />}
            </button>

            {/* Dark / Light Toggle */}
            <button
              onClick={() => {
                soundManager.playClick();
                toggleTheme();
              }}
              title="Toggle Theme"
              className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-amber-300 hover:bg-white/10 transition-colors border border-white/5"
              aria-label="Toggle dark mode"
            >
              {isDark ? <Sun size={15} /> : <Moon size={15} />}
            </button>

            {/* Glowing Hire Me CTA button */}
            <div className="hidden sm:block">
              <MagneticButton
                href="#contact"
                variant="primary"
                className="py-1.5 px-4 text-xs font-semibold tracking-wide uppercase shadow-glow-multi"
              >
                <Sparkles size={13} className="text-cyan-300 animate-spin-slow" />
                Hire Me
              </MagneticButton>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => {
                soundManager.playClick();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="md:hidden w-9 h-9 rounded-full flex items-center justify-center bg-white/10 text-white hover:bg-white/20 transition-colors border border-white/10"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Full-Screen Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(24px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-30 bg-[#050510]/95 flex flex-col justify-between p-6 pt-28 md:hidden"
          >
            {/* Ambient Aurora */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-purple-600/20 blur-[100px] pointer-events-none" />

            {/* Links List */}
            <div className="flex flex-col gap-4 relative z-10">
              <span className="font-mono text-xs text-purple-400 tracking-widest uppercase">
                // NAVIGATION
              </span>
              {PORTFOLIO_DATA.navLinks.map((link, idx) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(link.href);
                  }}
                  initial={{ opacity: 0, x: -25 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.06 + 0.1 }}
                  className="flex items-center justify-between py-2 text-2xl font-display font-bold text-slate-200 hover:text-cyan-400 border-b border-white/5"
                >
                  <span className="flex items-center gap-3">
                    <span className="font-mono text-xs text-slate-500">{link.number}</span>
                    {link.name}
                  </span>
                  <ArrowRight size={18} className="text-purple-400" />
                </motion.a>
              ))}
            </div>

            {/* Bottom Actions & Socials */}
            <div className="relative z-10 pt-6 border-t border-white/10 flex flex-col gap-4">
              <MagneticButton
                href="#contact"
                variant="primary"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3.5 text-center font-display font-bold tracking-wide text-sm"
              >
                Hire Me Now — Let's Talk
              </MagneticButton>

              <div className="flex items-center justify-between text-xs font-mono text-slate-400 pt-2">
                <span>Comilla, Bangladesh</span>
                <div className="flex items-center gap-3 text-slate-300">
                  <a href={PORTFOLIO_DATA.personal.socialLinks[1].url} target="_blank" rel="noreferrer" className="hover:text-cyan-400">
                    <Github size={18} />
                  </a>
                  <a href={PORTFOLIO_DATA.personal.socialLinks[0].url} target="_blank" rel="noreferrer" className="hover:text-cyan-400">
                    <Linkedin size={18} />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
