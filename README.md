# Abu Sayeed — Award-Winning Creative Developer & AI Automation Portfolio

> **"I turn boring work into smart automation that drives exponential scale."**

A premium, highly animated personal portfolio built for **Abu Sayeed** (AI Automation Expert & Full-Stack Web Developer). Crafted to deliver an Awwwards / FWA / CSS Design Awards level visual experience, buttery smooth 60fps scrolling, and responsive 3D WebGL interactions.

---

## ⚡ Tech Stack & Architecture

- **Frontend Framework**: React 18 / 19 + TypeScript + Vite
- **Styling & Design System**: Tailwind CSS with custom Glassmorphism, Aurora Blobs, Film-Grain & Cyber Grid
- **3D Graphics & WebGL**: Three.js + `@react-three/fiber` + `@react-three/drei` (with lazy loading & mobile auto-simplification)
- **Smooth Scrolling**: Lenis Smooth Scrolling Engine
- **Motion & Micro-Interactions**: Framer Motion + GSAP
- **Interactive Audio**: Custom Procedural Web Audio API Synthesizer (Zero external audio file dependencies)
- **Celebration Feedback**: Canvas Confetti
- **Icons**: Lucide React
- **Backend API**: Python FastAPI + Uvicorn with Pydantic validation & CORS

---

## 📂 Project Structure

```text
portfolio/
├── backend/
│   ├── main.py                  # FastAPI Backend API (Contact form, health check, profile)
│   └── contacts_inbox.json      # Stored contact inquiries (auto-created on submission)
├── src/
│   ├── components/
│   │   ├── Preloader.tsx        # Cinematic 0 → 100% preloader with letter-by-letter reveal
│   │   ├── CustomCursor.tsx     # Trailing glowing ring with dynamic "VIEW" project state
│   │   ├── MagneticButton.tsx   # Magnetic cursor-pull physics with hover sound effects
│   │   ├── Navbar.tsx           # Floating glass pill navbar with scroll-direction detection & sound toggle
│   │   ├── Hero.tsx             # Split-text headline, typewriter roles, 3D Canvas, profile aura
│   │   ├── Hero3D.tsx           # Interactive Three.js distorted glowing core & orbiting rings
│   │   ├── Marquee.tsx          # Dual-directional infinite tech logo & value proposition strip
│   │   ├── About.tsx            # Bento-grid: bio card, 3D tilt photo, stat counters, live Bangladesh clock
│   │   ├── Skills.tsx           # Categorized skill cards with animated progress bars & glow on hover
│   │   ├── Services.tsx         # Spotlight hover cards with mouse-following gradient borders & deliverables
│   │   ├── Projects.tsx         # Category filter tabs, horizontal featured strip, 3D tilt cards
│   │   ├── ProjectModal.tsx     # Architectural blueprints modal with gallery & metrics
│   │   ├── Experience.tsx       # Vertical scroll-drawn glowing timeline with alternating cards
│   │   ├── Process.tsx          # "How I Work" 4-step stacking cards (Discover → Architect → Build → Scale)
│   │   ├── Testimonials.tsx     # Auto-sliding drag carousel with 5-star ratings & pause on hover
│   │   ├── CtaBanner.tsx        # High-impact CTA banner with aurora mesh & magnetic action buttons
│   │   ├── Contact.tsx          # Split layout: copyable email, WhatsApp chat, glass validation form & confetti
│   │   └── Footer.tsx           # Oversized typographic branding & circular SVG scroll progress ring
│   ├── hooks/
│   │   ├── useActiveSection.ts  # Viewport scroll position observer
│   │   ├── useDevice.ts         # Device detection (mobile/touch/prefers-reduced-motion)
│   │   └── useMousePosition.ts  # Smooth client coordinates tracker
│   ├── utils/
│   │   ├── cn.ts                # Tailwind class merge utility
│   │   └── sound.ts             # Web Audio API procedural sound engine
│   ├── data.ts                  # ⭐ THE SINGLE SOURCE OF TRUTH (All content, bios, links, projects)
│   ├── index.css                # Global styles, glassmorphism utilities, fluid typography
│   ├── App.tsx                  # Root application container & Lenis scroll provider
│   └── main.tsx                 # React entry point
├── index.html                   # SEO metadata, Open Graph tags, Google Fonts
├── vite.config.ts               # Vite configuration with code splitting & API proxy
└── tailwind.config.js           # Cyber dark palette, custom animations, glowing shadows
```

---

## 🎨 Single Source of Truth (`src/data.ts`)

**You never need to edit complex components to update your portfolio.**
All personal information, social links, project screenshots, metrics, services, and skills live inside:

👉 `src/data.ts`

### What You Can Edit in `src/data.ts`:
1. **Personal Information**: Full Name, Hero Tagline, Rotating Typewriter Roles, Bio, Location, Email, Phone, WhatsApp, and Profile Photo.
2. **Social Channels**: LinkedIn, GitHub, Facebook, Instagram.
3. **Key Stats**: Years Experience, Projects Completed, Clients, Reliability rate.
4. **Services**: Titles, descriptions, deliverable checklists, and icons.
5. **Skills**: Skill names and percentage mastery levels grouped by category.
6. **Projects**: Add or edit projects, images, tags, metrics, repository links, and live URLs.
7. **Experience & Education**: Timeline items for DIIT CSE, freelance roles, college, and school.
8. **Testimonials**: Quotes, clients, avatars, and company titles.

---

## 🚀 Quick Start Guide

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Frontend Dev Server
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:5173`.

### 3. (Optional) Start the FastAPI Backend
```bash
npm run server
```
The FastAPI API will run at `http://127.0.0.1:8000`.
- API Documentation (Swagger): `http://127.0.0.1:8000/docs`
- Health check: `http://127.0.0.1:8000/api/health`

### 4. Build for Production
```bash
npm run build
```
Creates an optimized production bundle in `dist/`.

---

## 💎 Key Highlights & Interactive Features

- **Cinematic Preloader**: Smooth 0 → 100% numeric counter with letter-by-letter reveal of "ABU SAYEED".
- **3D Hero Element**: Interactive Three.js glowing distorted sphere with orbiting neon rings and mouse-parallax.
- **Custom Cursor**: Desktop trailing glowing ring that automatically transforms into a stylized "VIEW" badge when hovering project cards.
- **Magnetic Buttons**: Pull toward the mouse cursor with spring damping physics and procedural sound ticks.
- **Real-Time Bangladesh Clock**: Live BST (Asia/Dhaka) clock in the About section.
- **Bento Grids**: High-end asymmetric layouts for About and Services with cursor-following spotlight glows.
- **Interactive Project Modal**: Opens comprehensive architecture blueprints, verified metrics, and repository links.
- **Vertical Glowing Timeline**: Gradient SVG line that draws itself down the page as the user scrolls.
- **Stacking Process Cards**: Sticky cards with depth layering for "How I Work".
- **Form Submission with Confetti Burst**: Form validation with FastAPI backend dispatch and `canvas-confetti` fireworks.
- **Audio Feedback**: Procedural Web Audio API sound synthesis with quick mute/unmute control in the navbar.
- **Dark/Light Mode**: Smooth theme toggling with persistent state.

---

## 👤 Developer Profile

- **Name**: Abu Sayeed
- **Sector**: AI Automation Expert / Web Developer
- **Degree**: B.Sc. in Computer Science & Engineering (DIIT, Graduating 2026)
- **Location**: Comilla, Bangladesh
- **Email**: abusayeedt202@gmail.com
- **Phone / WhatsApp**: +880 1762-525468
- **GitHub**: [sayeedsoftd](https://github.com/sayeedsoftd?tab=repositories)
- **LinkedIn**: [abu-sayeed-a63908236](https://www.linkedin.com/in/abu-sayeed-a63908236)
