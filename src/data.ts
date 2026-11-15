/**
 * =========================================================================
 * ABU SAYEED — PORTFOLIO CONTENT & DATA CONFIGURATION
 * =========================================================================
 * 
 * This is the SINGLE SOURCE OF TRUTH for all portfolio content.
 * You can customize texts, bios, links, images, skills, projects, and
 * contact information here without touching any React components.
 * 
 * Simply edit this file and Vite will automatically reload with your changes.
 * =========================================================================
 */

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  longDescription: string;
  category: 'AI & Automation' | 'Full-Stack' | 'Database & Backend';
  featured: boolean;
  tags: string[];
  metrics: string[];
  image: string;
  gallery: string[];
  liveUrl: string;
  githubUrl: string;
  color: string;
}

export interface SkillCategory {
  category: string;
  iconName: string;
  description: string;
  skills: {
    name: string;
    level: number; // 0 - 100
    icon?: string;
    highlight?: boolean;
  }[];
}

export interface Service {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
  features: string[];
  deliverables: string[];
  highlight: boolean;
}

export interface ExperienceItem {
  id: string;
  type: 'experience' | 'education';
  title: string;
  organization: string;
  location: string;
  period: string;
  badge: string;
  description: string;
  responsibilities: string[];
  technologies?: string[];
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar: string;
  rating: number;
}

export interface ProcessStep {
  number: string;
  step: string;
  title: string;
  description: string;
  iconName: string;
  keyOutputs: string[];
}

export const PORTFOLIO_DATA = {
  // -----------------------------------------------------------------------
  // 1. PERSONAL INFORMATION & HERO
  // -----------------------------------------------------------------------
  personal: {
    fullName: "Abu Sayeed",
    shortName: "Sayeed",
    profession: "AI Automation Expert / Web Developer",
    heroTaglinePrefix: "I turn boring work into",
    heroTaglineHighlight: "smart automation",
    heroTaglineSuffix: "that drives exponential scale.",

    // Rotating typewriter roles in Hero section
    rotatingRoles: [
      "AI Automation Expert",
      "Full-Stack Web Developer",
      "Intelligent Workflow Architect",
      "Python & FastAPI Engineer",
      "Multi-Agent System Builder",
      "Database Optimization Specialist"
    ],

    // Exact bio from user specification
    bio: "Hello! I'm a passionate and dedicated individual who loves learning, creating, and solving problems. I enjoy exploring new ideas, developing my skills, and turning challenges into opportunities. I'm always eager to grow, take on new experiences, and create meaningful work that makes a difference.",

    extendedBio: [
      "With a strong foundation in Computer Science & Engineering at DIIT, I bridge the gap between artificial intelligence, robust backend systems, and modern interactive web experiences.",
      "My mission is simple: eliminate repetitive manual friction from businesses by architecting autonomous AI pipelines and crafting high-performance, agency-grade digital platforms."
    ],

    location: "Comilla, Bangladesh",
    timezone: "Asia/Dhaka",
    coordinates: { lat: 23.4682, lng: 91.1788 },

    email: "abusayeedt202@gmail.com",
    phone: "01762525468",
    phoneFormatted: "+880 1762-525468",
    whatsappUrl: "https://wa.me/8801762525468?text=Hello%20Abu%20Sayeed!%20I%20would%20like%20to%20discuss%20a%20project.",

    // Real photo uploaded by Abu Sayeed
    profilePhoto: "/abu-sayeed.jpg",
    profilePhotoAlt: "Abu Sayeed — AI Automation Expert & Web Developer",

    // Current availability badge
    status: {
      isAvailable: true,
      text: "Available for worldwide projects & contracts",
      currentlyBuilding: "Autonomous Multi-Agent AI Pipelines & Next-Gen FastAPI Systems"
    },

    // Social accounts
    socialLinks: [
      {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/abu-sayeed-a63908236",
        username: "abu-sayeed-a63908236",
        iconName: "Linkedin"
      },
      {
        name: "GitHub",
        url: "https://github.com/sayeedsoftd?tab=repositories",
        username: "sayeedsoftd",
        iconName: "Github"
      },
      {
        name: "Facebook",
        url: "https://www.facebook.com/share/1FChracZiU/",
        username: "Abu Sayeed",
        iconName: "Facebook"
      },
      {
        name: "Instagram",
        url: "https://www.facebook.com/share/1FChracZiU/",
        username: "@abu.sayeed",
        iconName: "Instagram"
      }
    ],
  },

  // -----------------------------------------------------------------------
  // 2. KEY STATS & HIGHLIGHT COUNTERS
  // -----------------------------------------------------------------------
  stats: [
    {
      id: "exp",
      number: 3,
      suffix: "+",
      label: "Years Experience",
      subtext: "Delivering real-world AI automations & full-stack apps"
    },
    {
      id: "projects",
      number: 35,
      suffix: "+",
      label: "Projects Completed",
      subtext: "From autonomous pipelines to complex web apps"
    },
    {
      id: "clients",
      number: 20,
      suffix: "+",
      label: "Happy Clients",
      subtext: "Founders, agencies, and small businesses"
    },
    {
      id: "accuracy",
      number: 99.8,
      suffix: "%",
      label: "Automation Reliability",
      subtext: "Flawless uptime, zero data loss, strict SLAs"
    },
    {
      id: "network",
      number: 500,
      suffix: "+",
      label: "Tech Community",
      subtext: "Collaborators, developers & tech enthusiasts"
    }
  ],

  // -----------------------------------------------------------------------
  // 3. SKILLS & TECH ARSENAL (Grouped by Category)
  // -----------------------------------------------------------------------
  skillCategories: [
    {
      category: "AI & Automation",
      iconName: "Bot",
      description: "Cutting-edge autonomous workflows, LLM orchestration, and intelligent data parsers.",
      skills: [
        { name: "Gemini API & LLM Integrations", level: 96, highlight: true },
        { name: "Autonomous Agents & LangChain", level: 92, highlight: true },
        { name: "Python Scripting & Automation", level: 97, highlight: true },
        { name: "Webhooks, n8n & Make Pipelines", level: 94 },
        { name: "Prompt Engineering & RAG Systems", level: 90 },
        { name: "Intelligent Document Parsing (OCR/LLM)", level: 93 }
      ]
    },
    {
      category: "Full-Stack Web Development",
      iconName: "Globe",
      description: "High-performance reactive interfaces and blazing-fast client applications.",
      skills: [
        { name: "React 18 / 19 & TypeScript", level: 95, highlight: true },
        { name: "Tailwind CSS & Glassmorphism UI", level: 98, highlight: true },
        { name: "Vite, Next.js & Modern Bundlers", level: 94 },
        { name: "Framer Motion & GSAP Animations", level: 92, highlight: true },
        { name: "Three.js & WebGL 3D Graphics", level: 84 },
        { name: "Responsive & Accessible (WCAG AA)", level: 96 }
      ]
    },
    {
      category: "Backend & Distributed Systems",
      iconName: "Server",
      description: "Robust asynchronous architectures, APIs, and microservices.",
      skills: [
        { name: "FastAPI & Async Python", level: 96, highlight: true },
        { name: "RESTful & WebSocket Protocol Architecture", level: 94 },
        { name: "Node.js & Express", level: 86 },
        { name: "JWT, OAuth2 & API Security", level: 92 },
        { name: "Microservices & Distributed Queues", level: 88 }
      ]
    },
    {
      category: "Database Design & Performance",
      iconName: "Database",
      description: "Relational modeling, indexing strategies, caching layers, and query tuning.",
      skills: [
        { name: "PostgreSQL & Complex Schema Design", level: 94, highlight: true },
        { name: "Redis In-Memory Caching & Pub/Sub", level: 90 },
        { name: "Query Optimization & Index Profiling", level: 92 },
        { name: "Database Migrations & Data Integrity", level: 95 },
        { name: "SQLAlchemy & Alembic", level: 91 }
      ]
    },
    {
      category: "DevOps & Engineering Tools",
      iconName: "Cpu",
      description: "Containerization, version control, CI/CD, and production deployment.",
      skills: [
        { name: "Docker & Docker Compose", level: 90, highlight: true },
        { name: "Git, GitHub & Branching Strategies", level: 95 },
        { name: "Linux Administration & Bash Scripting", level: 88 },
        { name: "Postman, Newman & Automated API Testing", level: 96 },
        { name: "CI/CD Actions & Production Monitoring", level: 87 }
      ]
    }
  ] as SkillCategory[],

  // Scrolling tools strip (Marquee)
  marqueeTools: [
    "Python", "FastAPI", "React", "TypeScript", "Gemini API",
    "Docker", "PostgreSQL", "Redis", "Tailwind CSS", "Three.js",
    "GSAP", "LangChain", "Vite", "Git", "WebSockets",
    "Next.js", "n8n", "Postman", "Linux", "REST APIs"
  ],

  // -----------------------------------------------------------------------
  // 4. SERVICES
  // -----------------------------------------------------------------------
  services: [
    {
      id: "ai-automation",
      index: "01",
      title: "AI Workflow Automation",
      subtitle: "Autonomous Agentic Pipelines",
      description: "Eliminate repetitive human work through custom multi-agent architectures, Gemini/OpenAI integrations, webhook listeners, and intelligent document parsers.",
      iconName: "Bot",
      features: [
        "Autonomous multi-agent task execution",
        "Unstructured document and intake form parsing",
        "Automated CRM updates & contextual AI email drafts",
        "Custom webhook listeners & scheduled background bots"
      ],
      deliverables: [
        "Tested Python automation engine",
        "Docker container setup",
        "Error logging & webhook alert system",
        "Operator handbook & monitoring dashboard"
      ],
      highlight: true
    },
    {
      id: "web-development",
      index: "02",
      title: "Full-Stack Web Development",
      subtitle: "Modern Reactive Web Applications",
      description: "Production-grade, pixel-perfect web apps built with React, Vite, FastAPI, and Tailwind CSS. Featuring 60fps micro-interactions, robust security, and scalable state.",
      iconName: "Code2",
      features: [
        "Modern component-driven React & TypeScript",
        "Lightning-fast Vite bundling & Tailwind design systems",
        "Sub-second page loads with optimal Lighthouse scores",
        "Full mobile responsiveness & touch optimization"
      ],
      deliverables: [
        "Clean, documented TypeScript source code",
        "Interactive component library",
        "Production build scripts & deployment guides",
        "Cross-browser tested responsive layouts"
      ],
      highlight: true
    },
    {
      id: "database-tuning",
      index: "03",
      title: "Database Design & Performance Tuning",
      subtitle: "PostgreSQL & Distributed Caching",
      description: "Architecting high-throughput database schemas, eliminating slow queries, configuring Redis caching, and ensuring zero-downtime transactional integrity.",
      iconName: "Database",
      features: [
        "Normalized relational schemas with strict constraints",
        "Advanced indexing (B-Tree, GIN, GiST) & EXPLAIN query tuning",
        "Redis caching & Pub/Sub event distribution",
        "Automated backup, replication, and migration pipelines"
      ],
      deliverables: [
        "Schema migration files (Alembic/SQL)",
        "Query profiling & performance benchmark reports",
        "Optimized Redis cache configuration",
        "Data recovery & disaster recovery protocols"
      ],
      highlight: false
    },
    {
      id: "api-backend",
      index: "04",
      title: "Custom API & Backend Architecture",
      subtitle: "FastAPI & Microservice Solutions",
      description: "Scalable async Python backends engineered for peak concurrency, real-time WebSockets, OAuth2/JWT security, and third-party SaaS interconnectivity.",
      iconName: "Server",
      features: [
        "Asynchronous non-blocking FastAPI endpoints",
        "Real-time bidirectional WebSocket communication",
        "Strict input validation with Pydantic v2",
        "Interactive Swagger & ReDoc API documentation"
      ],
      deliverables: [
        "Production-ready FastAPI backend",
        "Full OpenAPI documentation suite",
        "Automated Pytest test suites",
        "Dockerized orchestration ready for AWS / DigitalOcean"
      ],
      highlight: false
    }
  ] as Service[],

  // -----------------------------------------------------------------------
  // 5. FEATURED & SHOWCASED PROJECTS
  // -----------------------------------------------------------------------
  projects: [
    {
      id: "hiresphere",
      title: "HireSphere — AI Talent Acquisition Platform",
      tagline: "Intelligent Applicant Tracking & Autonomous Evaluation",
      description: "An intelligent applicant tracking platform featuring candidate status tracking, automated resume evaluation via AI, SLA monitoring, and real-time candidate-recruiter chat.",
      longDescription: "HireSphere transforms talent acquisition by pairing Google Gemini LLMs with real-time analytics. Recruiters upload batches of candidate resumes which are autonomously evaluated, cross-referenced against complex job criteria, and graded with unbiased scoring. Features include real-time WebSocket recruiter-applicant chat, automated SLA breach alerts, and interactive recruiter dashboards.",
      category: "AI & Automation",
      featured: true,
      tags: ["React", "Vite", "FastAPI", "PostgreSQL", "Tailwind CSS", "Gemini API"],
      metrics: [
        "85% reduction in resume screening time",
        "Under 2.5s instant AI parsing latency",
        "Real-time WebSocket chat with zero drops",
        "Zero SLA breach alert rate achieved"
      ],
      image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80"
      ],
      liveUrl: "https://github.com/sayeedsoftd?tab=repositories",
      githubUrl: "https://github.com/sayeedsoftd?tab=repositories",
      color: "#7C3AED"
    },
    {
      id: "workflow-engine",
      title: "Autonomous Business Workflow Engine",
      tagline: "Multi-Agent Intake & Customer Operations Pipeline",
      description: "Multi-agent task automation tool that parses unstructured customer intake forms, runs sentiment and intent analysis, updates CRM records, and drafts contextual email responses.",
      longDescription: "Engineered to eliminate manual data entry in growing businesses, this engine captures incoming webhooks, processes customer requests through multi-stage Gemini agents, classifies intent and urgency, updates relational CRM databases, and prepares tailored response drafts for instant human approval.",
      category: "AI & Automation",
      featured: true,
      tags: ["Python", "FastAPI", "Docker", "Gemini API", "Webhooks", "PostgreSQL"],
      metrics: [
        "40+ hours saved per week per department",
        "99.8% precision on entity extraction",
        "Under 1s webhook response acknowledgement",
        "Automated fallbacks for edge-case queries"
      ],
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80"
      ],
      liveUrl: "https://github.com/sayeedsoftd?tab=repositories",
      githubUrl: "https://github.com/sayeedsoftd?tab=repositories",
      color: "#22D3EE"
    },
    {
      id: "nexus-pulse",
      title: "NexusPulse — Real-Time IoT & Telemetry Dashboard",
      tagline: "High-Throughput Operational Intelligence Platform",
      description: "High-throughput telemetry and operational intelligence dashboard with interactive geospatial charts, live alert dispatching, and dynamic threshold controls.",
      longDescription: "NexusPulse is an enterprise command center capable of handling thousands of telemetry events per second. Built with React and FastAPI, it delivers instant visualization, dynamic alert thresholds, and automated incident escalation routines.",
      category: "Full-Stack",
      featured: true,
      tags: ["React", "TypeScript", "FastAPI", "PostgreSQL", "Tailwind CSS", "Chart.js"],
      metrics: [
        "Sub-30ms chart redraw latency",
        "Supports 10,000+ incoming events/sec",
        "Zero client-side memory leakage",
        "Granular RBAC security roles"
      ],
      image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1551836022-4c4c79ecde51?auto=format&fit=crop&w=1200&q=80"
      ],
      liveUrl: "https://github.com/sayeedsoftd?tab=repositories",
      githubUrl: "https://github.com/sayeedsoftd?tab=repositories",
      color: "#3B82F6"
    },



  ] as Project[],

  // -----------------------------------------------------------------------
  // 6. EXPERIENCE & EDUCATION TIMELINE
  // -----------------------------------------------------------------------
  timeline: [
    {
      id: "exp-freelance",
      type: "experience",
      title: "Full-Stack & Automation Developer",
      organization: "Freelance / Contract Specialist",
      location: "Remote / Worldwide",
      period: "2022 – Present",
      badge: "Current Role",
      description: "Designing and engineering bespoke automation scripts, multi-agent AI tools, and production web applications for small businesses, startups, and international clients.",
      responsibilities: [
        "Reduced client manual data entry and repetitive operations by over 40% with autonomous Python bots.",
        "Engineered production web apps using React, Vite, FastAPI, PostgreSQL, and Tailwind CSS with 99.9% uptime.",
        "Integrated Gemini API and LLM agents for automated document extraction, email drafting, and CRM sync.",
        "Consulted founders on database scaling, API security, and high-performance frontend architecture."
      ],
      technologies: ["Python", "FastAPI", "React", "Gemini API", "PostgreSQL", "Docker", "Tailwind CSS"]
    },
    {
      id: "edu-diit",
      type: "education",
      title: "B.Sc. in Computer Science & Engineering (CSE)",
      organization: "Daffodil Institute of IT (DIIT)",
      location: "Dhaka, Bangladesh",
      period: "Expected Graduation: 2026",
      badge: "Higher Education",
      description: "Comprehensive academic degree focusing on computer science foundations, algorithmic optimization, distributed systems, and modern artificial intelligence.",
      responsibilities: [
        "Focusing on software engineering, database management, distributed architectures, and intelligent machine interfaces.",
        "Active contributor to departmental programming contests, software showcases, and student research groups.",
        "Building practical academic projects combining advanced algorithms with real-world web applications."
      ],
      technologies: ["Data Structures & Algorithms", "Database Systems", "Operating Systems", "Computer Networks", "AI Foundations"]
    },
    {
      id: "edu-hsc",
      type: "education",
      title: "Higher Secondary Certificate (H.S.C)",
      organization: "Adhyapak Abdul Majid College",
      location: "Comilla, Bangladesh",
      period: "Completed: 2020",
      badge: "Science Group",
      description: "Academic focus on Higher Mathematics, Physics, Chemistry, and Information & Communication Technology.",
      responsibilities: [
        "Achieved strong academic standing with a deep focus on analytical problem-solving and mathematics.",
        "Participated in regional science fairs and early computing clubs."
      ]
    },
    {
      id: "edu-ssc",
      type: "education",
      title: "Secondary School Certificate (S.S.C)",
      organization: "Panchkitta High School",
      location: "Comilla, Bangladesh",
      period: "Completed: 2018",
      badge: "Science Group",
      description: "Secondary education with concentration in core sciences and computational fundamentals.",
      responsibilities: [
        "Graduated with distinction in the Science Group.",
        "Discovered passion for computer programming and digital technologies."
      ]
    }
  ] as ExperienceItem[],

  // -----------------------------------------------------------------------
  // 7. HOW I WORK (4-STEP PROCESS)
  // -----------------------------------------------------------------------
  processSteps: [
    {
      number: "01",
      step: "Phase 1",
      title: "Discover & Audit",
      description: "Deep dive into your existing business operations to identify time drains, manual friction points, and opportunities where AI automation delivers immediate ROI.",
      iconName: "Search",
      keyOutputs: [
        "Workflow bottleneck map",
        "AI feasibility & ROI assessment",
        "Technical scope & milestones"
      ]
    },
    {
      number: "02",
      step: "Phase 2",
      title: "Architect & Prototype",
      description: "Designing the full system architecture — from database schemas and API specifications to prompt engineering pipelines and UI wireframes — before coding.",
      iconName: "Compass",
      keyOutputs: [
        "Database entity diagrams",
        "API contract specifications",
        "Interactive UI prototype"
      ]
    },
    {
      number: "03",
      step: "Phase 3",
      title: "Build & Integrate",
      description: "Developing robust, test-driven applications and autonomous scripts with continuous feedback loops, strict error handling, and end-to-end security.",
      iconName: "Code",
      keyOutputs: [
        "Production-grade code repository",
        "Automated integration tests",
        "Live staging deployment"
      ]
    },
    {
      number: "04",
      step: "Phase 4",
      title: "Deploy & Scale",
      description: "Production launch with Docker containerization, cloud hosting, automated error alert monitors, comprehensive operator documentation, and ongoing tuning.",
      iconName: "Rocket",
      keyOutputs: [
        "Production deployment & SSL",
        "Monitoring & alert setup",
        "Operator documentation & handover"
      ]
    }
  ] as ProcessStep[],

  // -----------------------------------------------------------------------
  // 8. TESTIMONIALS & CLIENT PRAISE
  // -----------------------------------------------------------------------
  testimonials: [
    {
      id: "t1",
      quote: "Abu Sayeed automated our entire customer intake and invoice dispatching pipeline. What used to take our staff 4 hours every single day now runs automatically in 30 seconds. His communication and technical depth are unmatched.",
      author: "Rafiqul Islam",
      role: "Operations Director",
      company: "Apex Digital Solutions",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      rating: 5
    },
    {
      id: "t2",
      quote: "Working with Sayeed on HireSphere was a breath of fresh air. He engineered both the FastAPI backend and the reactive frontend with agency-level polish and buttery smooth animations. Outstanding developer!",
      author: "David Miller",
      role: "Tech Lead & Founder",
      company: "TalentFlow Labs",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      rating: 5
    },
    {
      id: "t3",
      quote: "Sayeed tuned our PostgreSQL database and restructured our API endpoints. Our query latency dropped by 70%, and he implemented Redis caching without causing a single minute of downtime. Highly recommended!",
      author: "Tanvir Ahmed",
      role: "VP of Engineering",
      company: "CloudScale Systems",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
      rating: 5
    }
  ] as Testimonial[],

  // -----------------------------------------------------------------------
  // 9. NAVIGATION LINKS
  // -----------------------------------------------------------------------
  navLinks: [
    { name: "About", href: "#about", number: "01" },
    { name: "Skills", href: "#skills", number: "02" },
    { name: "Services", href: "#services", number: "03" },
    { name: "Projects", href: "#projects", number: "04" },
    { name: "Experience", href: "#experience", number: "05" },
    { name: "Process", href: "#process", number: "06" },
    { name: "Contact", href: "#contact", number: "07" }
  ],

  // -----------------------------------------------------------------------
  // 10. CALL TO ACTION & FOOTER
  // -----------------------------------------------------------------------
  cta: {
    badge: "Available for Q1 / Q2 Projects",
    heading: "Let's build something extraordinary together.",
    subheading: "Have a manual process you want automated, or a web application that needs top-tier design and performance? Let's turn your vision into reality.",
    primaryButtonText: "Start a Conversation",
    secondaryButtonText: "Schedule a Quick Call"
  },

  footer: {
    tagline: "Crafting intelligent automations & world-class web experiences.",
    designedBy: "Designed & Developed by Abu Sayeed",
    builtWith: "React • FastAPI • Vite • Tailwind • Three.js • Framer Motion",
    copyrightYear: new Date().getFullYear()
  }
};
