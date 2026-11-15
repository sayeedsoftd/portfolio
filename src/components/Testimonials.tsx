import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PORTFOLIO_DATA } from '../data';
import { soundManager } from '../utils/sound';
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Testimonials() {
  const { testimonials } = PORTFOLIO_DATA;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto sliding carousel
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [isPaused, testimonials.length]);

  const handleNext = () => {
    soundManager.playClick();
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    soundManager.playClick();
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const current = testimonials[currentIndex];

  return (
    <section 
      id="testimonials" 
      className="py-24 sm:py-32 relative bg-[#070718] px-4 sm:px-6 lg:px-8 border-t border-white/5"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Glow */}
      <div className="absolute top-1/2 right-1/4 w-[450px] h-[450px] bg-cyan-500/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-4xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel border border-cyan-500/30 text-cyan-300 font-mono text-xs tracking-widest uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            07 — CLIENT PRAISE
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-tight max-w-2xl">
            Trusted by <span className="gradient-text">Founders & Engineers</span>
          </h2>
          <p className="mt-4 text-slate-400 text-base max-w-xl font-sans">
            Hear from leaders who scaled their products and eliminated manual bottlenecks with my solutions.
          </p>
        </div>

        {/* Carousel Card Container */}
        <div className="relative glass-panel rounded-3xl p-8 sm:p-12 border border-white/10 shadow-2xl overflow-hidden min-h-[340px] flex flex-col justify-between">
          
          {/* Big Background Quote Icon */}
          <Quote 
            size={120} 
            className="absolute -top-6 -right-6 text-purple-600/10 pointer-events-none rotate-12" 
          />

          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="relative z-10 flex flex-col justify-between flex-grow"
            >
              {/* Star Rating */}
              <div className="flex items-center gap-1.5 mb-6">
                {[...Array(current.rating)].map((_, i) => (
                  <Star key={i} size={18} className="text-amber-400 fill-amber-400" />
                ))}
              </div>

              {/* Quote Text */}
              <blockquote className="font-sans text-lg sm:text-2xl text-slate-100 font-normal leading-relaxed mb-8 italic">
                "{current.quote}"
              </blockquote>

              {/* Author & Avatar */}
              <div className="flex items-center gap-4 pt-6 border-t border-white/10">
                <div className="w-13 h-13 rounded-full overflow-hidden border-2 border-cyan-400 p-0.5 shadow-glow-cyan">
                  <img
                    src={current.avatar}
                    alt={current.author}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-display font-bold text-base sm:text-lg text-white">
                    {current.author}
                  </span>
                  <span className="text-xs font-mono text-cyan-400">
                    {current.role} • <span className="text-slate-400">{current.company}</span>
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls: Prev / Next & Indicators */}
          <div className="flex items-center justify-between mt-8 pt-4 border-t border-white/5">
            {/* Pagination Dots */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    soundManager.playClick();
                    setCurrentIndex(idx);
                  }}
                  className={`h-2 rounded-full transition-all ${
                    idx === currentIndex
                      ? 'w-8 bg-gradient-to-r from-purple-500 to-cyan-400'
                      : 'w-2 bg-slate-700 hover:bg-slate-500'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Navigation Arrows */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white transition-colors flex items-center justify-center border border-white/10"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={handleNext}
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white transition-colors flex items-center justify-center border border-white/10"
                aria-label="Next testimonial"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
