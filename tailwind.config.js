/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#050510',
          card: 'rgba(13, 13, 30, 0.65)',
          border: 'rgba(255, 255, 255, 0.08)',
          cardHover: 'rgba(22, 22, 45, 0.8)',
          surface: '#0B0B1E',
          muted: '#94A3B8',
        },
        primary: {
          DEFAULT: '#7C3AED',
          light: '#A78BFA',
          dark: '#5B21B6',
          glow: 'rgba(124, 58, 237, 0.35)',
        },
        secondary: {
          DEFAULT: '#22D3EE',
          light: '#67E8F9',
          dark: '#0891B2',
          glow: 'rgba(34, 211, 238, 0.35)',
        },
        accent: {
          pink: '#EC4899',
          emerald: '#10B981',
          amber: '#F59E0B',
          blue: '#3B82F6',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Space Grotesk', 'Outfit', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        'gradient-mesh': 'gradientMesh 18s ease infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'float-medium': 'float 5s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 25s linear infinite',
        'marquee': 'marquee 30s linear infinite',
        'marquee-reverse': 'marquee-reverse 30s linear infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        gradientMesh: {
          '0%, 100%': { transform: 'scale(1) translate(0px, 0px) rotate(0deg)' },
          '33%': { transform: 'scale(1.15) translate(30px, -40px) rotate(120deg)' },
          '66%': { transform: 'scale(0.9) translate(-30px, 20px) rotate(240deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-gradient': 'linear-gradient(135deg, #7C3AED 0%, #3B82F6 50%, #22D3EE 100%)',
        'glow-conic': 'conic-gradient(from 180deg at 50% 50%, #7C3AED 0deg, #22D3EE 180deg, #7C3AED 360deg)',
      },
      boxShadow: {
        'glow-purple': '0 0 40px -10px rgba(124, 58, 237, 0.45)',
        'glow-cyan': '0 0 40px -10px rgba(34, 211, 238, 0.45)',
        'glow-multi': '0 0 50px -12px rgba(124, 58, 237, 0.4), 0 0 35px -10px rgba(34, 211, 238, 0.3)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
    },
  },
  plugins: [],
}
