import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { soundManager } from '../utils/sound';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  variant?: 'primary' | 'secondary' | 'glass' | 'outline';
  strength?: number;
  download?: boolean | string;
  target?: string;
  rel?: string;
}

export default function MagneticButton({
  children,
  className = '',
  onClick,
  href,
  variant = 'primary',
  strength = 0.35,
  download,
  target,
  rel,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) * strength;
    const y = (clientY - (top + height / 2)) * strength;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const handleHover = () => {
    soundManager.playHover();
  };

  const handleClick = () => {
    soundManager.playClick();
    if (onClick) onClick();
  };

  const variantStyles = {
    primary:
      'bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 text-white font-medium shadow-glow-multi hover:shadow-glow-purple border border-white/20',
    secondary:
      'bg-slate-900/80 text-cyan-300 border border-cyan-500/40 hover:border-cyan-400 hover:bg-cyan-950/40 shadow-glow-cyan',
    glass:
      'glass-pill text-white hover:text-cyan-300 border border-white/10 hover:border-purple-500/50',
    outline:
      'bg-transparent text-slate-200 border border-white/20 hover:border-white/60 hover:text-white',
  };

  const content = (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleHover}
      onClick={handleClick}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', damping: 15, stiffness: 180, mass: 0.1 }}
      className={`relative inline-flex items-center justify-center rounded-full px-6 py-3 transition-colors duration-300 cursor-pointer overflow-hidden group active:scale-95 ${variantStyles[variant]} ${className}`}
    >
      {/* Dynamic hover shimmer sweep */}
      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.div>
  );

  if (href) {
    return (
      <a
        href={href}
        download={download}
        target={target}
        rel={rel}
        className="inline-block"
      >
        {content}
      </a>
    );
  }

  return content;
}
