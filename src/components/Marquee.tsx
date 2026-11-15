import React from 'react';
import { motion } from 'framer-motion';
import { PORTFOLIO_DATA } from '../data';
import { Sparkles, Terminal, Cpu, Database, Server, Code2, Bot, Layers } from 'lucide-react';

export default function Marquee() {
  const { marqueeTools } = PORTFOLIO_DATA;

  // Render tech badge icon based on name
  const getToolIcon = (tool: string) => {
    switch (tool.toLowerCase()) {
      case 'python':
      case 'fastapi':
        return <Terminal size={16} className="text-cyan-400" />;
      case 'gemini api':
      case 'langchain':
        return <Bot size={16} className="text-purple-400" />;
      case 'react':
      case 'vite':
      case 'next.js':
        return <Code2 size={16} className="text-indigo-400" />;
      case 'postgresql':
      case 'redis':
        return <Database size={16} className="text-emerald-400" />;
      case 'docker':
      case 'linux':
        return <Server size={16} className="text-blue-400" />;
      default:
        return <Cpu size={16} className="text-slate-400" />;
    }
  };

  return (
    <div id="marquee" className="relative py-10 bg-[#070718] border-y border-white/5 overflow-hidden">
      {/* Subtle neon gradient bar at top & bottom */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />

      {/* Side Fade Gradients for infinite loop illusion */}
      <div className="absolute top-0 bottom-0 left-0 w-24 sm:w-40 bg-gradient-to-r from-[#070718] to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 bottom-0 right-0 w-24 sm:w-40 bg-gradient-to-l from-[#070718] to-transparent z-10 pointer-events-none" />

      {/* Row 1: Forward Infinite Marquee */}
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused] mb-4">
        {[...marqueeTools, ...marqueeTools].map((tool, idx) => (
          <div
            key={`row1-${tool}-${idx}`}
            className="flex items-center gap-2.5 mx-3 sm:mx-4 px-4 py-2 rounded-xl bg-white/[0.03] border border-white/5 hover:border-cyan-500/40 hover:bg-white/[0.08] transition-all group cursor-default"
          >
            {getToolIcon(tool)}
            <span className="font-display font-semibold text-sm sm:text-base text-slate-300 group-hover:text-white tracking-wide">
              {tool}
            </span>
            <span className="text-purple-500 text-xs opacity-50 group-hover:opacity-100 group-hover:scale-125 transition-transform">✦</span>
          </div>
        ))}
      </div>

      {/* Row 2: Reverse Direction Marquee with Key Value Propositions */}
      <div className="flex w-max animate-marquee-reverse hover:[animation-play-state:paused]">
        {[
          "Autonomous Multi-Agent AI",
          "Production FastAPI Microservices",
          "React 19 & High-Performance UI",
          "PostgreSQL Query & Schema Optimization",
          "Zero-Manual Data Ingestion",
          "Dockerized Cloud Workflows",
          "Real-Time WebSocket Architecture",
          "Prompt Engineering & RAG Pipelines",
          "Autonomous Multi-Agent AI",
          "Production FastAPI Microservices",
          "React 19 & High-Performance UI",
          "PostgreSQL Query & Schema Optimization",
        ].map((phrase, idx) => (
          <div
            key={`row2-${idx}`}
            className="flex items-center gap-2 mx-4 px-3 py-1 text-xs font-mono tracking-wider text-slate-400 hover:text-cyan-300 transition-colors cursor-default"
          >
            <Sparkles size={12} className="text-cyan-400" />
            <span>{phrase}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
