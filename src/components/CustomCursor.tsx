import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface CustomCursorProps {
  cursorVariant?: 'default' | 'hover' | 'project' | 'text';
  cursorText?: string;
}

export default function CustomCursor({ cursorVariant = 'default', cursorText = '' }: CustomCursorProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Position motion values
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth trailing spring physics for the outer ring
  const springConfig = { damping: 25, stiffness: 350, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Check if touch device
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    setIsTouchDevice(isTouch);
    if (isTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [mouseX, mouseY, isVisible]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Small Precision Center Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-cyan-400 -translate-x-1/2 -translate-y-1/2 shadow-glow-cyan"
        style={{
          x: mouseX,
          y: mouseY,
        }}
      />

      {/* Outer Trailing Glowing Ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-purple-500/80 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center font-display font-bold text-[10px] tracking-wider text-white uppercase backdrop-blur-xs"
        style={{
          x: smoothX,
          y: smoothY,
        }}
        animate={{
          width: cursorVariant === 'project' ? 84 : cursorVariant === 'hover' ? 48 : 32,
          height: cursorVariant === 'project' ? 84 : cursorVariant === 'hover' ? 48 : 32,
          backgroundColor:
            cursorVariant === 'project'
              ? 'rgba(124, 58, 237, 0.75)'
              : cursorVariant === 'hover'
              ? 'rgba(34, 211, 238, 0.15)'
              : 'rgba(124, 58, 237, 0.05)',
          borderColor:
            cursorVariant === 'project'
              ? 'rgba(34, 211, 238, 0.9)'
              : cursorVariant === 'hover'
              ? 'rgba(34, 211, 238, 0.8)'
              : 'rgba(124, 58, 237, 0.4)',
          scale: cursorVariant === 'project' ? 1.05 : 1,
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
      >
        {cursorVariant === 'project' && (
          <motion.span
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-1 font-semibold text-white drop-shadow"
          >
            {cursorText || 'VIEW'}
            <span className="text-cyan-300">↗</span>
          </motion.span>
        )}
      </motion.div>
    </div>
  );
}
