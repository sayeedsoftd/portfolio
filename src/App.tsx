import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { motion, useScroll, useSpring } from 'framer-motion';
import { useActiveSection } from './hooks/useActiveSection';

// Core Components
import Preloader from './components/Preloader';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import About from './components/About';
import Skills from './components/Skills';
import Services from './components/Services';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Process from './components/Process';
import CtaBanner from './components/CtaBanner';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [isDark, setIsDark] = useState(true);
  const [cursorVariant, setCursorVariant] = useState<'default' | 'hover' | 'project'>('default');

  // Track active section for Navbar highlight
  const sectionIds = ['hero', 'about', 'skills', 'services', 'projects', 'experience', 'process', 'contact'];
  const activeSection = useActiveSection(sectionIds, 220);

  // Scroll Progress Bar at very top
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Initialize buttery smooth scrolling with Lenis
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  // Theme management
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  return (
    <div className="relative min-h-screen bg-[#050510] text-slate-100 selection:bg-purple-500 selection:text-white">
      
      {/* Top Gradient Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-purple-600 via-indigo-500 to-cyan-400 z-50 origin-left shadow-glow-multi"
        style={{ scaleX }}
      />

      {/* Cinematic Custom Cursor */}
      <CustomCursor cursorVariant={cursorVariant} cursorText="VIEW" />

      {/* Page Load Preloader */}
      {loading && <Preloader onComplete={() => setLoading(false)} />}

      {/* Floating Glass Navbar */}
      <Navbar
        activeSection={activeSection}
        isDark={isDark}
        toggleTheme={toggleTheme}
      />

      {/* Main Page Flow */}
      <main className="relative z-10">
        <Hero />
        <Marquee />
        <About />
        <Skills />
        <Services />
        <Projects onHoverProjectCard={(hover) => setCursorVariant(hover ? 'project' : 'default')} />
        <Experience />
        <Process />
        <CtaBanner />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

    </div>
  );
}
