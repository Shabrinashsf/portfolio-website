import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { motion, AnimatePresence, TargetAndTransition, Transition } from "framer-motion";

// Types
export interface ArcanaCardData {
  id: string;
  numeral: string;
  name: string;
  subtitle: string;
  title: string;
  image: string;
  quote: string;
  description: string;
  primaryColor: string;
  accentColor: string;
  glowColor: string;
  bgGradient: string;
  skills: { name: string; category: string }[];
  stats: { label: string; value: number }[];
  disciplines: string[];
}

// 3 Persona-themed Arcana Cards (Must always be odd number)
export const ARCANA_CARDS: ArcanaCardData[] = [
  {
    id: "frontend",
    numeral: "I",
    name: "Frontend Arcana",
    subtitle: "THE ALCHEMIST",
    title: "I • The Visual Alchemist",
    image: "/img/frontend.png?v=2",
    quote:
      "Thou art I, and I am thou... Thou hast woven raw data into living light, creating worlds through kinetic harmony and aesthetic grace.",
    description:
      "Architecting seamless digital experiences through intuitive user interfaces, responsive layouts, modular component design, and robust client-side state management.",
    primaryColor: "#00072d",
    accentColor: "#a8c7fa",
    glowColor: "rgba(0, 7, 45, 0.8)",
    bgGradient: "from-[#00072d] to-[#00072d]",
    skills: [
      { name: "Next.js", category: "Framework" },
      { name: "React", category: "Library" },
      { name: "TypeScript", category: "Language" },
      { name: "Tailwind CSS", category: "Styling" },
      { name: "Framer Motion", category: "Animation" },
      { name: "Responsive UI", category: "Design" },
      { name: "Design Systems", category: "Architecture" },
      { name: "Web Vitals", category: "Optimization" },
    ],
    stats: [
      { label: "Aesthetics", value: 97 },
      { label: "Kinetic Motion", value: 95 },
      { label: "Responsiveness", value: 94 },
      { label: "Component Craft", value: 96 },
    ],
    disciplines: [
      "Kinetic Micro-Interactions & Transitions",
      "Modular Atomic Design Architectures",
      "Pixel-Perfect Cross-Device Polish",
      "Fluid Animation Physics & Curves",
    ],
  },
  {
    id: "backend",
    numeral: "IV",
    name: "Backend Arcana",
    subtitle: "THE ARCHITECT",
    title: "IV • The Grand Architect",
    image: "/img/backend.png?v=2",
    quote:
      "Thou art I, and I am thou... From the deepest foundations of logic, thou hast forged the backbone of the digital realm.",
    description:
      "Designing resilient server architectures, high-performance API pipelines, and secure data layers built to handle high concurrency and complex business logic.",
    primaryColor: "#00072d",
    accentColor: "#a8c7fa",
    glowColor: "rgba(0, 7, 45, 0.8)",
    bgGradient: "from-[#00072d] to-[#00072d]",
    skills: [
      { name: "Go / Golang", category: "Language" },
      { name: "Gin Gonic", category: "Framework" },
      { name: "PHP", category: "Language" },
      { name: "Laravel", category: "Framework" },
      { name: "PostgreSQL", category: "Database" },
      { name: "Redis", category: "Caching" },
      { name: "RESTful APIs", category: "Architecture" },
      { name: "System Design", category: "Architecture" },
    ],
    stats: [
      { label: "Concurrency", value: 94 },
      { label: "Architecture", value: 96 },
      { label: "Throughput", value: 91 },
      { label: "Data Integrity", value: 98 },
    ],
    disciplines: [
      "Relational & In-Memory Data Modeling",
      "High-Throughput API Pipeline Design",
      "Secure Auth & Session Architecture",
      "Microservice Boundaries & Scaling",
    ],
  },
  {
    id: "devops",
    numeral: "X",
    name: "DevOps Arcana",
    subtitle: "THE GUARDIAN",
    title: "X • The Wheel Guardian",
    image: "/img/devops.png?v=2",
    quote:
      "Thou art I, and I am thou... By the endless turning of the wheel, the pipelines flow unbroken and the gates remain unbreached.",
    description:
      "Engineering resilient cloud infrastructure, automated continuous delivery pipelines, and proactive observability to guarantee high availability and stability.",
    primaryColor: "#00072d",
    accentColor: "#a8c7fa",
    glowColor: "rgba(0, 7, 45, 0.8)",
    bgGradient: "from-[#00072d] to-[#00072d]",
    skills: [
      { name: "Docker", category: "Container" },
      { name: "Linux / Bash", category: "OS & Shell" },
      { name: "CI / CD", category: "Automation" },
      { name: "Nginx", category: "Web Server" },
      { name: "Git Workflows", category: "VCS" },
      { name: "Cloud Deployments", category: "Infra" },
      { name: "Health Monitoring", category: "Observability" },
      { name: "Network Routing", category: "Networking" },
    ],
    stats: [
      { label: "Reliability", value: 96 },
      { label: "Automation", value: 93 },
      { label: "Resilience", value: 95 },
      { label: "Isolation", value: 92 },
    ],
    disciplines: [
      "Deterministic Container Environments",
      "Automated CI/CD Delivery Pipelines",
      "Nginx Gateway & Reverse Proxy Tuning",
      "High-Availability Server Hardening",
    ],
  },
];

interface TechStackItem {
  name: string;
  icon: string;
  size?: string;
}

interface VolunteerItem {
  id: number;
  org: string;
  period: string;
  role: string;
  description: string;
  tags: string[];
}

const ARCANA_TECH_STACK: Record<string, Record<string, TechStackItem[]>> = {
  backend: {
    "Programming Language": [
      { name: "Go", icon: "/img/go.svg", size: "w-8 h-8" },
      { name: "PHP", icon: "/img/php.svg", size: "w-7 h-7" },
      { name: "TypeScript", icon: "/img/typescript.svg", size: "w-7 h-7" },
      { name: "Python", icon: "/img/python.svg", size: "w-7 h-7" },
    ],
    "Framework & Library": [
      { name: "Gin", icon: "/img/gin.svg", size: "w-7 h-7" },
      { name: "Fiber", icon: "/img/fiber.svg", size: "w-8 h-8" },
      { name: "Laravel", icon: "/img/laravel.svg", size: "w-7 h-7" },
      { name: "NestJS", icon: "/img/nestjs.svg", size: "w-7 h-7" },
      { name: "ExpressJS", icon: "/img/express.svg", size: "w-7 h-7" },
    ],
    "Database": [
      { name: "PostgreSQL", icon: "/img/postgresql.svg", size: "w-7 h-7" },
      { name: "MySQL", icon: "/img/mysql.svg", size: "w-7 h-7" },
      { name: "MariaDB", icon: "/img/mariadb.svg", size: "w-7 h-7" },
      { name: "Redis", icon: "/img/redis.svg", size: "w-7 h-7" },
    ],
    "Tools": [
      { name: "Git", icon: "/img/git.svg", size: "w-7 h-7" },
      { name: "GitHub", icon: "/img/github.svg", size: "w-7 h-7" },
      { name: "Bruno", icon: "/img/bruno.svg", size: "w-7 h-7" },
      { name: "Postman", icon: "/img/postman.svg", size: "w-7 h-7" },
      { name: "Hoppscotch", icon: "/img/hoppscotch.svg", size: "w-7 h-7" },
    ],
  },
  frontend: {
    "Programming Language": [
      { name: "TypeScript", icon: "/img/typescript.svg", size: "w-7 h-7" },
    ],
    "Framework & Library": [
      { name: "Laravel", icon: "/img/laravel.svg", size: "w-7 h-7" },
      { name: "Next.js", icon: "/img/nextdotjs.svg", size: "w-7 h-7" },
      { name: "React", icon: "/img/react.svg", size: "w-7 h-7" },
      { name: "Tailwind", icon: "/img/tailwindcss.svg", size: "w-7 h-7" },
    ],
    "Tools": [
      { name: "Git", icon: "/img/git.svg", size: "w-7 h-7" },
      { name: "GitHub", icon: "/img/github.svg", size: "w-7 h-7" },
    ],
  },
  devops: {
    "DevOps & Infrastructure": [
      { name: "Docker", icon: "/img/docker.svg", size: "w-7 h-7" },
      { name: "NGINX", icon: "/img/nginx.svg", size: "w-7 h-7" },
      { name: "Git", icon: "/img/git.svg", size: "w-7 h-7" },
      { name: "GitHub", icon: "/img/github.svg", size: "w-7 h-7" },
      { name: "Grafana", icon: "/img/grafana.svg", size: "w-7 h-7" },
      { name: "Cloudflare", icon: "/img/cloudflare.svg", size: "w-7 h-7" },
      { name: "Linux", icon: "/img/linux.svg", size: "w-7 h-7" },
    ],
  },
};

const TECH_LOGOS: Record<string, string> = {
  "Go": "/img/go.svg",
  "Golang": "/img/go.svg",
  "Gin": "/img/gin.svg",
  "Fiber": "/img/fiber.svg",
  "Laravel": "/img/laravel.svg",
  "PHP": "/img/php.svg",
  "PostgreSQL": "/img/postgresql.svg",
  "MySQL": "/img/mysql.svg",
  "MariaDB": "/img/mariadb.svg",
  "Redis": "/img/redis.svg",
  "TypeScript": "/img/typescript.svg",
  "Python": "/img/python.svg",
  "Next.js": "/img/nextdotjs.svg",
  "NextJS": "/img/nextdotjs.svg",
  "React": "/img/react.svg",
  "Tailwind": "/img/tailwindcss.svg",
  "Docker": "/img/docker.svg",
  "NGINX": "/img/nginx.svg",
  "Git": "/img/git.svg",
  "GitHub": "/img/github.svg",
  "Bruno": "/img/bruno.svg",
  "Postman": "/img/postman.svg",
  "Hoppscotch": "/img/hoppscotch.svg",
  "Hopscotch": "/img/hoppscotch.svg",
  "Grafana": "/img/grafana.svg",
  "Cloudflare": "/img/cloudflare.svg",
  "Linux": "/img/linux.svg",
};

const ARCANA_VOLUNTEER_EXPERIENCES: Record<string, VolunteerItem[]> = {
  frontend: [
    {
      id: 1,
      org: "Schematics 2026",
      period: "Maret 2026 — Now",
      role: "Technical Project Manager",
      description:
        "Schematics is an annual event organized by students of the Informatics Engineering Department at Institut Teknologi Sepuluh Nopember.",
      tags: ["TypeScript", "Next.js", "React", "Tailwind"],
    },
  ],
  backend: [
    {
      id: 1,
      org: "Schematics 2026",
      period: "Maret 2026 — Now",
      role: "Technical Project Manager",
      description:
        "Schematics is an annual event organized by students of the Informatics Engineering Department at Institut Teknologi Sepuluh Nopember.",
      tags: ["Go", "Gin", "PostgreSQL", "Bruno"],
    },
    {
      id: 2,
      org: "TEDxITS 2026",
      period: "Jan 2026 - May 2026",
      role: "Manager Backend",
      description:
        "TEDxITS is an annual event that provides a platform for the community, especially those within the Institut Teknologi Sepuluh Nopember environment, to share their compelling ideas.",
      tags: ["Go", "Fiber", "PostgreSQL", "Bruno"],
    },
    {
      id: 3,
      org: "Futurest 2026",
      period: "Feb 2026 - Apr 2026",
      role: "Senior Backend Developer",
      description:
        "Futurest (Future Energy Summit) is the annual flagship event of the Society of Renewable Energy (SRE) ITS.",
      tags: ["Go", "Gin", "PostgreSQL", "Bruno"],
    },
    {
      id: 4,
      org: "Ini Lho ITS! 2026",
      period: "Feb 2026 - Apr 2026",
      role: "Manager Backend",
      description:
        "Ini Lho ITS! is an annual event that introduces Institut Teknologi Sepuluh Nopember to the wider public especially high school and vocational school students.",
      tags: ["Go", "Gin", "PostgreSQL", "Hoppscotch"],
    },
    {
      id: 5,
      org: "180DC ITS",
      period: "Oct 2025 — Dec 2025",
      role: "Junior Backend Developer",
      description:
        "180dc ITS is a global consultancy organization that offer high-quality consulting services to nonprofits, social enterprises, and socially conscious organizations.",
      tags: ["Go", "Gin", "PostgreSQL", "Hoppscotch"],
    },
    {
      id: 6,
      org: "Schematics 2025",
      period: "Sep 2025 — Oct 2025",
      role: "Vice Director 2 — WebDev",
      description:
        "Schematics is an annual event organized by students of the Informatics Engineering Department at Institut Teknologi Sepuluh Nopember.",
      tags: ["Go", "Gin", "PostgreSQL", "Postman"],
    },
    {
      id: 7,
      org: "TEDxITS 2025",
      period: "Aug 2025 — Sep 2025",
      role: "Junior Backend Developer",
      description:
        "TEDxITS is an annual event that provides a platform for the community, especially those within the Institut Teknologi Sepuluh Nopember environment, to share their compelling ideas.",
      tags: ["Go", "Gin", "PostgreSQL", "Postman"],
    },
    {
      id: 8,
      org: "Ini Lho ITS! 2025",
      period: "Jun 2025 — Aug 2025",
      role: "Junior Backend Developer",
      description:
        "Ini Lho ITS! is an annual event that introduces Institut Teknologi Sepuluh Nopember to the wider public especially high school and vocational school students.",
      tags: ["Go", "Gin", "PostgreSQL", "Hoppscotch"],
    },
  ],
  devops: [
    {
      id: 1,
      org: "Schematics 2026",
      period: "Maret 2026 — Now",
      role: "Technical Project Manager",
      description:
        "Schematics is an annual event organized by students of the Informatics Engineering Department at Institut Teknologi Sepuluh Nopember.",
      tags: ["Linux", "NGINX", "Docker", "Grafana", "Cloudflare"],
    },
    {
      id: 2,
      org: "Schematics 2025",
      period: "Sep 2025 — Oct 2025",
      role: "Vice Director 2 — WebDev",
      description:
        "Schematics is an annual event organized by students of the Informatics Engineering Department at Institut Teknologi Sepuluh Nopember.",
      tags: ["Linux", "NGINX", "Docker", "Grafana", "Cloudflare"],
    },
  ],
};

// 18 Polygonal Shards covering the card for the glass shatter explosion
const SHARDS = [
  { clip: "polygon(0% 0%, 28% 0%, 22% 24%, 0% 18%)", dx: -280, dy: -260, rotZ: -65, rotX: 200 },
  { clip: "polygon(28% 0%, 65% 0%, 55% 22%, 22% 24%)", dx: 30, dy: -310, rotZ: 40, rotX: -260 },
  { clip: "polygon(65% 0%, 100% 0%, 100% 25%, 55% 22%)", dx: 290, dy: -260, rotZ: 75, rotX: 240 },
  { clip: "polygon(0% 18%, 22% 24%, 30% 48%, 0% 42%)", dx: -310, dy: -50, rotZ: -85, rotX: 180 },
  { clip: "polygon(22% 24%, 55% 22%, 50% 50%, 30% 48%)", dx: -70, dy: -70, rotZ: 45, rotX: 110 },
  { clip: "polygon(55% 22%, 100% 25%, 85% 52%, 50% 50%)", dx: 250, dy: -40, rotZ: -75, rotX: -220 },
  { clip: "polygon(0% 42%, 30% 48%, 25% 72%, 0% 68%)", dx: -300, dy: 130, rotZ: 95, rotX: -160 },
  { clip: "polygon(30% 48%, 50% 50%, 48% 75%, 25% 72%)", dx: -60, dy: 90, rotZ: -50, rotX: 250 },
  { clip: "polygon(50% 50%, 85% 52%, 78% 74%, 48% 75%)", dx: 120, dy: 100, rotZ: 65, rotX: -190 },
  { clip: "polygon(85% 52%, 100% 25%, 100% 70%, 78% 74%)", dx: 300, dy: 120, rotZ: -110, rotX: 230 },
  { clip: "polygon(0% 68%, 25% 72%, 20% 100%, 0% 100%)", dx: -270, dy: 280, rotZ: -75, rotX: -240 },
  { clip: "polygon(25% 72%, 48% 75%, 52% 100%, 20% 100%)", dx: -60, dy: 310, rotZ: 55, rotX: 190 },
  { clip: "polygon(48% 75%, 78% 74%, 80% 100%, 52% 100%)", dx: 90, dy: 320, rotZ: -55, rotX: -230 },
  { clip: "polygon(78% 74%, 100% 70%, 100% 100%, 80% 100%)", dx: 280, dy: 290, rotZ: 90, rotX: 260 },
  // Center fracture shards exploding outward
  { clip: "polygon(35% 35%, 65% 35%, 60% 60%, 40% 60%)", dx: 35, dy: -45, rotZ: 150, rotX: 330 },
  { clip: "polygon(40% 40%, 60% 45%, 55% 58%, 42% 55%)", dx: -45, dy: -50, rotZ: -160, rotX: -300 },
  { clip: "polygon(28% 45%, 45% 42%, 40% 65%, 26% 62%)", dx: -130, dy: 50, rotZ: 120, rotX: 200 },
  { clip: "polygon(55% 42%, 72% 45%, 70% 65%, 52% 62%)", dx: 140, dy: 55, rotZ: -130, rotX: -200 },
];

// Synthesized Web Audio glass shatter explosion sound (~1.4s crystal tail)
function playGlassShatterSound() {
  if (typeof window === "undefined") return;
  try {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const now = ctx.currentTime;

    // 1. Crystal ringing frequencies (high resonant glass pings decaying over ~1.0s)
    const freqs = [2400, 3350, 4820, 6200, 8100, 9600];
    freqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = idx % 2 === 0 ? "sine" : "triangle";
      osc.frequency.setValueAtTime(freq + (Math.random() * 200 - 100), now);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.7, now + 0.6);

      gain.gain.setValueAtTime(0.3 / (idx + 1), now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.85 + idx * 0.05);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 1.2);
    });

    // 2. High-pass noise burst for sharp glass crack / fracture
    const bufferSize = Math.floor(ctx.sampleRate * 0.25);
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.045));
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = "highpass";
    filter.frequency.setValueAtTime(2400, now);

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.4, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(ctx.destination);
    noise.start(now);

    // 3. Low impact crunch / glass explosion thud
    const subOsc = ctx.createOscillator();
    const subGain = ctx.createGain();
    subOsc.type = "sine";
    subOsc.frequency.setValueAtTime(175, now);
    subOsc.frequency.exponentialRampToValueAtTime(32, now + 0.18);
    subGain.gain.setValueAtTime(0.35, now);
    subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
    subOsc.connect(subGain);
    subGain.connect(ctx.destination);
    subOsc.start(now);
    subOsc.stop(now + 0.22);
  } catch {
    // Ignore audio errors gracefully
  }
}

// Reusable singleton AudioContext to prevent browser AudioContext limit errors & GC pauses
let sharedAudioCtx: AudioContext | null = null;
function getSharedAudioCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  try {
    if (!sharedAudioCtx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      if (AudioCtx) {
        sharedAudioCtx = new AudioCtx();
      }
    }
    if (sharedAudioCtx && sharedAudioCtx.state === "suspended") {
      sharedAudioCtx.resume();
    }
    return sharedAudioCtx;
  } catch {
    return null;
  }
}

// Reusable cached Audio elements (zero I/O on click)
let cachedSlideAudio: HTMLAudioElement | null = null;
let cachedCardAudio: HTMLAudioElement | null = null;
let cachedSummonAudio: HTMLAudioElement | null = null;
let cachedSelectAudio: HTMLAudioElement | null = null;

function getSlideAudio(): HTMLAudioElement | null {
  if (typeof window === "undefined") return null;
  if (!cachedSlideAudio) {
    cachedSlideAudio = new Audio("/audio/slide.mp3");
    cachedSlideAudio.volume = 0.95;
    cachedSlideAudio.preload = "auto";
  }
  return cachedSlideAudio;
}

function getCardAudio(): HTMLAudioElement | null {
  if (typeof window === "undefined") return null;
  if (!cachedCardAudio) {
    cachedCardAudio = new Audio("/audio/card.mp3");
    cachedCardAudio.volume = 0.95;
    cachedCardAudio.preload = "auto";
  }
  return cachedCardAudio;
}

function getSummonAudio(): HTMLAudioElement | null {
  if (typeof window === "undefined") return null;
  if (!cachedSummonAudio) {
    cachedSummonAudio = new Audio("/audio/summon-persona.mp3");
    cachedSummonAudio.volume = 0.95;
    cachedSummonAudio.preload = "auto";
  }
  return cachedSummonAudio;
}

function getSelectAudio(): HTMLAudioElement | null {
  if (typeof window === "undefined") return null;
  if (!cachedSelectAudio) {
    cachedSelectAudio = new Audio("/audio/select.mp3");
    cachedSelectAudio.volume = 0.85;
    cachedSelectAudio.preload = "auto";
  }
  return cachedSelectAudio;
}

// Play side cards slide sound from public/audio/slide.mp3
function playSlideAudio() {
  const audio = getSlideAudio();
  if (!audio) {
    playCardSelectSound();
    return;
  }
  try {
    audio.currentTime = 0;
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => playCardSelectSound());
    }
  } catch {
    playCardSelectSound();
  }
}

// Play card spin sound from public/audio/card.mp3
function playCardSpinAudio() {
  const audio = getCardAudio();
  if (!audio) {
    playMysticSpinSound();
    return;
  }
  try {
    audio.currentTime = 0;
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => playMysticSpinSound());
    }
  } catch {
    playMysticSpinSound();
  }
}

// Play Persona 3 summon persona sound from public/audio/summon-persona.mp3
function playSummonPersonaSfx() {
  const audio = getSummonAudio();
  if (!audio) {
    playGlassShatterSound();
    return;
  }
  try {
    audio.currentTime = 0;
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => playGlassShatterSound());
    }
  } catch {
    playGlassShatterSound();
  }
}

// Synthesized Web Audio high-speed 5-spin vortex whoosh across 1.0s
function playMysticSpinSound() {
  const ctx = getSharedAudioCtx();
  if (!ctx) return;
  try {
    const now = ctx.currentTime;

    // 5Hz Flutter / Tremolo LFO matching the 5 rotations in 1 second
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.type = "sine";
    lfo.frequency.setValueAtTime(5, now);
    lfoGain.gain.setValueAtTime(0.4, now);

    // Rising aerodynamic whoosh frequencies
    const freqs = [180, 290, 440, 680];
    freqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = idx % 2 === 0 ? "triangle" : "sine";
      osc.frequency.setValueAtTime(freq, now);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.8, now + 0.95);

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(0.14 / (idx + 1), now + 0.25);
      gain.gain.linearRampToValueAtTime(0.18 / (idx + 1), now + 0.85);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.0);

      lfo.connect(lfoGain.gain);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 1.05);
    });
    lfo.start(now);
    lfo.stop(now + 1.05);
  } catch {
    // Ignore audio errors gracefully
  }
}

// Crisp, tactile UI card select sound (supports public/audio/select.mp3 or synthesized crisp click)
function playCardSelectSound() {
  const audio = getSelectAudio();
  if (audio) {
    try {
      audio.currentTime = 0;
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => playCrispSelectSynth());
        return;
      }
    } catch {
      // Fallback to synth
    }
  }
  playCrispSelectSynth();
}

function playCrispSelectSynth() {
  const ctx = getSharedAudioCtx();
  if (!ctx) return;
  try {
    const now = ctx.currentTime;

    // 1. Snappy mechanical click / snap transient (tactile click)
    const snapOsc = ctx.createOscillator();
    const snapGain = ctx.createGain();
    snapOsc.type = "triangle";
    snapOsc.frequency.setValueAtTime(1800, now);
    snapOsc.frequency.exponentialRampToValueAtTime(360, now + 0.03);
    snapGain.gain.setValueAtTime(0.25, now);
    snapGain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);
    snapOsc.connect(snapGain);
    snapGain.connect(ctx.destination);
    snapOsc.start(now);
    snapOsc.stop(now + 0.035);

    // 2. High-end crisp metallic ping (Persona / clean UI confirmation tone)
    const pingOsc = ctx.createOscillator();
    const pingGain = ctx.createGain();
    pingOsc.type = "sine";
    pingOsc.frequency.setValueAtTime(2093, now); // C7 note - crystal clear
    pingOsc.frequency.exponentialRampToValueAtTime(1568, now + 0.06); // G6 note
    pingGain.gain.setValueAtTime(0.12, now);
    pingGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.07);
    pingOsc.connect(pingGain);
    pingGain.connect(ctx.destination);
    pingOsc.start(now);
    pingOsc.stop(now + 0.08);
  } catch {
    // Ignore audio errors gracefully
  }
}

// Elegant Dark Feminine & Mysterious Arcana Card (#00072d) - Memoized for 60fps rendering
const PersonaCardVisual = React.memo(function PersonaCardVisual({
  card,
  isCenter = false,
  isHovered = false,
  isProminent = false,
}: {
  card: ArcanaCardData;
  isCenter?: boolean;
  isHovered?: boolean;
  isProminent?: boolean;
}) {
  const arcanaLabel =
    card.id === "frontend"
      ? "Frontend"
      : card.id === "backend"
        ? "Backend"
        : "DevOps";

  const showActiveGlow = isHovered || isProminent;

  return (
    <div
      className="relative w-full h-full rounded-xl sm:rounded-2xl select-none flex flex-col items-center justify-between p-3.5 sm:p-5 md:p-6 text-center transition-shadow duration-300 ease-out overflow-hidden"
      style={{
        backgroundColor: "#00072d",
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
        transformStyle: "preserve-3d",
        transform: "translateZ(0)",
        boxShadow: isProminent
          ? "0 35px 75px -15px rgba(0, 0, 0, 0.95), 0 15px 35px rgba(0, 0, 0, 0.8), 0 0 35px rgba(168, 199, 250, 0.3), inset 0 1px 2px 0 rgba(255, 255, 255, 0.35)"
          : "0 14px 35px -8px rgba(0, 0, 0, 0.65), 0 2px 8px rgba(0, 0, 0, 0.4)",
      }}
    >
      {/* Overhead Glossy Lighting Reflection (Smooth fade-in on hover or when prominent) */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-300 ease-out ${showActiveGlow ? "opacity-100" : "opacity-0"
          }`}
        style={{
          background:
            "radial-gradient(ellipse 130% 70% at 50% 0%, rgba(255, 255, 255, 0.28) 0%, rgba(255, 255, 255, 0.08) 42%, transparent 75%)",
        }}
      />

      {/* Diagonal Glass Sheen Sweep */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-300 ease-out ${showActiveGlow ? "opacity-100" : "opacity-0"
          }`}
        style={{
          background:
            "linear-gradient(165deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.04) 32%, transparent 60%)",
        }}
      />

      {/* Top Edge Specular Highlight Rim */}
      <div
        className={`absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/70 to-transparent pointer-events-none transition-opacity duration-300 ease-out ${showActiveGlow ? "opacity-100" : "opacity-0"
          }`}
      />

      {/* Center: Arcana Image in Hardware-Accelerated White / Opacity */}
      <div className="relative z-10 flex-1 flex items-center justify-center w-full my-auto py-1">
        <div className="relative w-[48%] aspect-square max-w-[128px] max-h-[128px] flex items-center justify-center">
          <Image
            src={card.image}
            alt={card.name}
            width={128}
            height={128}
            className="w-full h-full object-contain select-none pointer-events-none transition-opacity duration-300 ease-out"
            style={{
              filter: "brightness(0) invert(1)",
              opacity: isProminent ? 0.95 : isHovered ? 0.88 : 0.65,
              transform: isProminent ? "scale(1.12)" : "scale(1)",
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
            }}
            priority
            unoptimized
          />
        </div>
      </div>

      {/* Bottom: 2-Line Arcana Text */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-0.5 sm:gap-1 pb-1">
        {/* Line 1: Nama Arcana */}
        <span className="font-[Outfit] text-sm sm:text-lg md:text-xl font-bold tracking-wider text-[#FDF8F2] uppercase leading-tight select-none">
          {arcanaLabel}
        </span>

        {/* Line 2: "Arcana" */}
        <span className="font-[Plus_Jakarta_Sans] text-[10px] sm:text-xs font-semibold tracking-[0.22em] text-[#8e90a2] uppercase leading-none select-none">
          Arcana
        </span>
      </div>
    </div>
  );
});

export default function ArcanaSection() {
  // Slots: 0 (Left), 1 (Center), 2 (Right)
  // Mapping of card ID to current slot: Frontend (0), Backend (1), DevOps (2)
  const [cardSlots, setCardSlots] = useState<{ [id: string]: number }>({
    frontend: 0,
    backend: 1,
    devops: 2,
  });

  // Animation phase state machine
  // 'idle' | 'sliding' | 'elevating' | 'spinning' | 'shattering' | 'revealed'
  const [phase, setPhase] = useState<
    "idle" | "sliding" | "elevating" | "spinning" | "shattering" | "revealed"
  >("idle");

  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);

  // Sound ref lock
  const isInteractingRef = useRef(false);

  // Selected card data
  const selectedCard = ARCANA_CARDS.find((c) => c.id === selectedCardId) || null;

  // Track viewport width and screen size for responsive card calculations
  const [viewportWidth, setViewportWidth] = useState<number>(1200);
  const [viewportHeight, setViewportHeight] = useState<number>(900);
  const [screenSize, setScreenSize] = useState<"mobile" | "tablet" | "desktop">("desktop");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      setViewportWidth(w);
      setViewportHeight(h);
      if (w < 640) {
        setScreenSize("mobile");
      } else if (w < 1024) {
        setScreenSize("tablet");
      } else {
        setScreenSize("desktop");
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Lock all scrolling (html & body) and handle Escape key while fullscreen window is open
  useEffect(() => {
    if (phase === "revealed") {
      const prevHtmlOverflow = document.documentElement.style.overflow;
      const prevBodyOverflow = document.body.style.overflow;
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          handleReset();
        }
      };

      const preventScroll = (e: Event) => {
        const target = e.target as HTMLElement | null;
        if (target && target.closest(".modal-scrollable")) {
          return;
        }
        e.preventDefault();
      };

      window.addEventListener("keydown", handleKeyDown);
      window.addEventListener("wheel", preventScroll, { passive: false });
      window.addEventListener("touchmove", preventScroll, { passive: false });

      return () => {
        document.documentElement.style.overflow = prevHtmlOverflow;
        document.body.style.overflow = prevBodyOverflow;
        window.removeEventListener("keydown", handleKeyDown);
        window.removeEventListener("wheel", preventScroll);
        window.removeEventListener("touchmove", preventScroll);
      };
    }
  }, [phase]);

  // Strict aspect ratio preserving card dimensions (265:375 = 1:1.41509)
  // Guarantees cards are NEVER cut off on mobile screens!
  const cardConfig = React.useMemo(() => {
    // Default desktop values for initial SSR hydration consistency
    if (!mounted) {
      return {
        width: 255,
        height: 361,
        xOffset: 235,
        yOffset: 14,
        rot: 9.5,
        baseScale: 0.96,
        centerScale: 1.0,
        hoverLift: 46,
        arenaHeight: 435,
      };
    }

    if (viewportWidth >= 1024) {
      // Desktop: Adaptive card proportions to guarantee 100% full-screen fit without overflow
      const isCompactHeight = viewportHeight > 0 && viewportHeight < 840;
      const width = isCompactHeight ? 235 : 255;
      const height = Math.round(width * (375 / 265)); // 333 or 361
      const hoverLift = isCompactHeight ? 38 : 46;
      return {
        width,
        height,
        xOffset: isCompactHeight ? 220 : 235,
        yOffset: 14,
        rot: 9.5,
        baseScale: 0.96,
        centerScale: 1.0,
        hoverLift,
        arenaHeight: Math.max(isCompactHeight ? 390 : 435, height + hoverLift + 20),
      };
    } else if (viewportWidth >= 640) {
      // Tablet (640px - 1023px): proportional scaling
      const safeWidth = viewportWidth - 48;
      const width = Math.min(230, Math.max(180, Math.floor(safeWidth / 2.85)));
      const height = Math.round(width * (375 / 265));
      const hoverLift = Math.round(height * 0.14);
      return {
        width,
        height,
        xOffset: Math.round(width * 0.82),
        yOffset: 14,
        rot: 8.5,
        baseScale: 0.94,
        centerScale: 1.0,
        hoverLift,
        arenaHeight: Math.max(400, height + hoverLift + 40),
      };
    } else {
      // Mobile (< 640px): Dynamically calculated so side cards (Frontend & DevOps) NEVER get clipped!
      // Total fan projection: 2 * xOffset + 1.164 * width <= safeWidth
      // With xOffset = 0.52 * width, total width is ~2.204 * width
      const safeWidth = Math.max(260, viewportWidth - 36);
      const width = Math.min(175, Math.max(120, Math.floor(safeWidth / 2.22)));
      const height = Math.round(width * (375 / 265));
      const hoverLift = Math.round(height * 0.14);
      return {
        width,
        height,
        xOffset: Math.round(width * 0.52),
        yOffset: 10,
        rot: 7,
        baseScale: 0.92,
        centerScale: 0.98,
        hoverLift,
        arenaHeight: Math.max(310, height + hoverLift + 35),
      };
    }
  }, [viewportWidth, mounted]);

  // Geometry configurations for the fan slots
  const getSlotTransform = (slot: number) => {
    const { xOffset, yOffset, rot, baseScale, centerScale } = cardConfig;

    switch (slot) {
      case 0:
        return {
          x: -xOffset,
          y: yOffset,
          rotate: -rot,
          zIndex: 10,
          scale: baseScale,
        };
      case 1:
        return {
          x: 0,
          y: 0,
          rotate: 0,
          zIndex: 20,
          scale: centerScale,
        };
      case 2:
        return {
          x: xOffset,
          y: yOffset,
          rotate: rot,
          zIndex: 10,
          scale: baseScale,
        };
      default:
        return { x: 0, y: 0, rotate: 0, zIndex: 10, scale: 1 };
    }
  };

  // Card click handler implementing the 8-step choreography
  const handleCardClick = (cardId: string) => {
    if (phase !== "idle" || isInteractingRef.current) return;
    isInteractingRef.current = true;
    setSelectedCardId(cardId);

    const currentSlot = cardSlots[cardId];
    const currentCenterCardId = Object.keys(cardSlots).find(
      (id) => cardSlots[id] === 1
    );

    // Step 1 & 2: Slide clicked card to Center without elevation ("tanpa animasi timbul")
    playCardSelectSound();
    setPhase("sliding");

    // Preload audios through cached getters (instant zero I/O)
    getSlideAudio();
    getCardAudio();
    getSummonAudio();

    if (currentSlot !== 1) {
      setCardSlots((prev) => ({
        ...prev,
        [cardId]: 1,
        ...(currentCenterCardId ? { [currentCenterCardId]: currentSlot } : {}),
      }));
    }

    const slideDuration = currentSlot === 1 ? 300 : 650;

    // Step 3 & 4: 2.0-Second Elevation & 2 Side Cards Sliding Behind Center Card
    setTimeout(() => {
      playSlideAudio();
      setPhase("elevating");

      // Step 5 & 6: 2.0-Second Spin (10 full rotations = 3780 deg, landing on arcana.jpg) with card.mp3
      setTimeout(() => {
        playCardSpinAudio();
        setPhase("spinning");

        // Spin completes in 2.0s (2000ms), stops for 0.3s (300ms pause)
        setTimeout(() => {
          // Step 7: Shatter with summon-persona.mp3 after 0.3s pause
          playSummonPersonaSfx();
          setPhase("shattering");

          // Step 8: Fullscreen window opens 1.0s after card shatters
          setTimeout(() => {
            playCardSelectSound();
            setPhase("revealed");
            isInteractingRef.current = false;
          }, 1000);
        }, 2300); // 2000ms spin + 300ms pause = 2300ms
      }, 2000); // 2.0s elevate & 2 side cards slide behind center
    }, slideDuration);
  };

  // Reset / Re-shuffle deck back to initial fan
  const handleReset = () => {
    setPhase("idle");
    setSelectedCardId(null);
    setHoveredCardId(null);
    isInteractingRef.current = false;
    setCardSlots({
      frontend: 0,
      backend: 1,
      devops: 2,
    });
    playCardSelectSound();
  };

  return (
    <section
      id="shab-arcana"
      className="w-full relative overflow-hidden flex flex-col items-center justify-center lg:h-[calc(100vh-4rem-3.5rem)] lg:min-h-[calc(100vh-4rem-3.5rem)] py-8 lg:py-0 scroll-mt-16"
      style={{
        backgroundColor: "var(--bg-page)",
        color: "var(--text-primary)",
      }}
    >
      {/* Grid Background Pattern */}
      <div
        className="absolute inset-0 bg-grid-pattern pointer-events-none"
        style={{ zIndex: 0, opacity: 0.6 }}
      />

      <div className="container mx-auto px-4 max-w-6xl relative z-10 flex flex-col items-center text-center my-auto">
        {/* Section Heading & Subtitle (Raised UP) */}
        <div className="flex flex-col items-center text-center lg:-translate-y-5">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-[Outfit] text-3xl md:text-5xl font-extrabold tracking-tight mb-2 sm:mb-3"
            style={{
              color: "var(--accent)",
              textShadow:
                "0 0 20px rgba(30, 86, 205, 0.5), 0 0 40px rgba(168, 199, 250, 0.3)",
            }}
          >
            Pick Major Arcana
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-[Plus_Jakarta_Sans] text-sm md:text-base max-w-xl mb-12 sm:mb-16 lg:mb-20 text-balance leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            What I think I&apos;m good at
          </motion.p>
        </div>

        {/* Fan Deck Arena (Lowered DOWN) */}
        <div
          className="relative w-full max-w-5xl flex items-center justify-center transition-[height,transform] duration-300 lg:translate-y-6"
          style={{ height: cardConfig.arenaHeight }}
        >
          {/* Deck Cards Container */}
          <div
            className="relative w-full h-full flex items-center justify-center"
            style={{ perspective: 1400, transformStyle: "preserve-3d" }}
          >
            {ARCANA_CARDS.map((card) => {
              const currentSlot = cardSlots[card.id];
              const slotTransform = getSlotTransform(currentSlot);
              const isSelected = selectedCardId === card.id;
              const isCenter = currentSlot === 1;
              const isHovered = hoveredCardId === card.id && phase === "idle";

              const isSelectedProminent =
                isSelected && (phase === "elevating" || phase === "spinning");

              // Determine visibility and transform during animation phases
              // Hover only slides up cleanly on Y without altering zIndex, scale, or angle
              let animateProps: TargetAndTransition = {
                x: slotTransform.x,
                y: isHovered ? slotTransform.y - cardConfig.hoverLift : slotTransform.y,
                rotate: slotTransform.rotate,
                rotateY: 0,
                scale: slotTransform.scale,
                zIndex: slotTransform.zIndex,
                opacity: 1,
              };

              let transitionProps: Transition = {
                type: "spring",
                stiffness: 280,
                damping: 26,
                mass: 0.7,
              };

              if (phase === "sliding") {
                // Step 2: Selected card slides to center (x: 0, y: 0) without elevation (scale: 1.0)
                if (isSelected) {
                  animateProps = {
                    x: 0,
                    y: 0,
                    rotate: 0,
                    rotateY: 0,
                    scale: 1.0,
                    zIndex: 30,
                    opacity: 1,
                  };
                  transitionProps = {
                    duration: 0.7,
                    ease: [0.25, 1, 0.5, 1],
                  };
                } else {
                  animateProps = {
                    x: slotTransform.x,
                    y: slotTransform.y,
                    rotate: slotTransform.rotate,
                    rotateY: 0,
                    scale: cardConfig.baseScale,
                    zIndex: 10,
                    opacity: 1,
                  };
                  transitionProps = {
                    duration: 0.7,
                    ease: [0.25, 1, 0.5, 1],
                  };
                }
              } else if (phase === "elevating") {
                // Step 3 & 4: 2.0 seconds of slow elevation for selected card; other cards stack behind and fade
                if (isSelected) {
                  animateProps = {
                    x: 0,
                    y: screenSize === "mobile" ? -24 : -36,
                    rotate: 0,
                    rotateY: 0,
                    scale: screenSize === "mobile" ? 1.12 : 1.18,
                    zIndex: 40,
                    opacity: 1,
                  };
                  transitionProps = {
                    duration: 2.0,
                    ease: "easeInOut",
                  };
                } else {
                  animateProps = {
                    x: 0,
                    y: 0,
                    rotate: 0,
                    rotateY: 0,
                    scale: 0.94,
                    zIndex: 10,
                    opacity: 0,
                  };
                  transitionProps = {
                    duration: 2.0,
                    ease: "easeInOut",
                  };
                }
              } else if (phase === "spinning") {
                // Step 5 & 6: 10 full spins in 2.0s (3780 degrees) landing on the back side (arcana.jpg)
                if (isSelected) {
                  animateProps = {
                    x: 0,
                    y: screenSize === "mobile" ? -24 : -36,
                    rotate: 0,
                    rotateY: 3780,
                    scale: screenSize === "mobile" ? 1.12 : 1.18,
                    zIndex: 50,
                    opacity: 1,
                  };
                  transitionProps = {
                    duration: 2.0,
                    ease: "easeInOut",
                  };
                } else {
                  animateProps = {
                    x: 0,
                    y: 0,
                    rotate: 0,
                    rotateY: 0,
                    scale: 0.5,
                    zIndex: 0,
                    opacity: 0,
                  };
                  transitionProps = {
                    duration: 0.3,
                  };
                }
              } else if (phase === "shattering" || phase === "revealed") {
                // Base card completely hidden immediately; replaced by outward glass explosion or modal
                animateProps = {
                  x: 0,
                  y: screenSize === "mobile" ? -24 : -36,
                  rotate: 0,
                  rotateY: 3780,
                  scale: 0,
                  opacity: 0,
                  zIndex: -10,
                };
                transitionProps = {
                  duration: 0,
                };
              }

              return (
                <motion.div
                  key={card.id}
                  className="absolute cursor-pointer will-change-transform"
                  style={{
                    width: cardConfig.width,
                    height: cardConfig.height,
                    transformStyle: "preserve-3d",
                    transform: "translateZ(0)",
                    visibility:
                      phase === "shattering" || phase === "revealed"
                        ? "hidden"
                        : "visible",
                  }}
                  animate={animateProps}
                  transition={transitionProps}
                  onMouseEnter={() => {
                    if (phase === "idle") setHoveredCardId(card.id);
                  }}
                  onMouseLeave={() => {
                    if (phase === "idle") setHoveredCardId(null);
                  }}
                  onClick={() => handleCardClick(card.id)}
                >
                  {/* Glowing Awakening Aura when selected card rises (Lebih Timbul) */}
                  {isSelectedProminent && (
                    <motion.div
                      className="absolute -inset-6 rounded-3xl pointer-events-none -z-10"
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{
                        scale: [0.92, 1.25, 1.16],
                        opacity: [0, 0.85, 0.5],
                      }}
                      transition={{ duration: 2.0, ease: "easeInOut" }}
                      style={{
                        background:
                          "radial-gradient(ellipse at center, rgba(168, 199, 250, 0.45) 0%, rgba(0, 7, 45, 0.8) 55%, transparent 75%)",
                        filter: "blur(26px)",
                      }}
                    />
                  )}

                  {/* 3D Double-Sided Card Body */}
                  <div
                    className="relative w-full h-full"
                    style={{
                      transformStyle: "preserve-3d",
                    }}
                  >
                    {/* FRONT SIDE (rotateY: 0deg): PersonaCardVisual */}
                    <div
                      className="absolute inset-0 w-full h-full"
                      style={{
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
                        transform: "rotateY(0deg) translateZ(1px)",
                        transformStyle: "preserve-3d",
                        display:
                          phase === "shattering" || phase === "revealed"
                            ? "none"
                            : "block",
                      }}
                    >
                      <PersonaCardVisual
                        card={card}
                        isCenter={isCenter}
                        isHovered={isHovered}
                        isProminent={isSelectedProminent}
                      />
                    </div>

                    {/* BACK SIDE (rotateY: 180deg): arcana.jpg fitted to card */}
                    <div
                      className="absolute inset-0 w-full h-full rounded-xl sm:rounded-2xl overflow-hidden bg-[#00072d]"
                      style={{
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
                        transform: "rotateY(180deg) translateZ(1px)",
                        transformStyle: "preserve-3d",
                        boxShadow: isSelectedProminent
                          ? "0 35px 75px -15px rgba(0, 0, 0, 0.95), 0 15px 35px rgba(0, 0, 0, 0.8), 0 0 35px rgba(168, 199, 250, 0.3), inset 0 1px 2px 0 rgba(255, 255, 255, 0.35)"
                          : "0 14px 35px -8px rgba(0, 0, 0, 0.65), 0 2px 8px rgba(0, 0, 0, 0.4)",
                      }}
                    >
                      <Image
                        src="/img/arcana.jpg"
                        alt="Arcana Back"
                        fill
                        sizes="(max-width: 640px) 180px, (max-width: 1024px) 230px, 265px"
                        className="object-cover w-full h-full rounded-xl sm:rounded-2xl select-none pointer-events-none"
                        priority
                        unoptimized
                      />

                      {/* Overhead Glossy Lighting Reflection */}
                      <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          background:
                            "radial-gradient(ellipse 130% 70% at 50% 0%, rgba(255, 255, 255, 0.28) 0%, rgba(255, 255, 255, 0.08) 42%, transparent 75%)",
                        }}
                      />

                      {/* Diagonal Glass Sheen Sweep */}
                      <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          background:
                            "linear-gradient(165deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.04) 32%, transparent 60%)",
                        }}
                      />

                      {/* Top Edge Specular Highlight Rim */}
                      <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/70 to-transparent pointer-events-none" />
                    </div>
                  </div>
                </motion.div>
              );
            })}

            {/* Step 7: Glass Shatter Outward Explosion Effect */}
            {phase === "shattering" && selectedCard && (
              <div
                className="absolute flex items-center justify-center pointer-events-none"
                style={{
                  width: cardConfig.width,
                  height: cardConfig.height,
                  perspective: 1200,
                  transformStyle: "preserve-3d",
                  zIndex: 60,
                  transform: `translateY(${screenSize === "mobile" ? -24 : -36}px) scale(${screenSize === "mobile" ? 1.12 : 1.18})`,
                }}
              >
                {/* 18 Geometric Polygonal Glass Shards Exploding Outward from the Card */}
                {SHARDS.map((shard, idx) => (
                  <motion.div
                    key={idx}
                    className="absolute inset-0 overflow-hidden rounded-xl sm:rounded-2xl will-change-transform"
                    style={{
                      clipPath: shard.clip,
                      WebkitClipPath: shard.clip,
                      transform: "translateZ(0)",
                    }}
                    initial={{
                      x: 0,
                      y: 0,
                      rotateX: 0,
                      rotateY: 0,
                      rotateZ: 0,
                      scale: 1,
                      opacity: 1,
                    }}
                    animate={{
                      x: screenSize === "mobile" ? shard.dx * 0.7 : shard.dx,
                      y: screenSize === "mobile" ? shard.dy * 0.7 : shard.dy,
                      rotateX: shard.rotX,
                      rotateY: shard.rotX * 0.7,
                      rotateZ: shard.rotZ,
                      scale: 0.5,
                      opacity: 0,
                    }}
                    transition={{
                      duration: 1.0,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <div className="w-full h-full relative overflow-hidden bg-[#00072d]">
                      <Image
                        src="/img/arcana.jpg"
                        alt="Arcana Back Shard"
                        fill
                        sizes="(max-width: 640px) 180px, (max-width: 1024px) 230px, 265px"
                        className="object-cover w-full h-full rounded-xl sm:rounded-2xl select-none pointer-events-none"
                        priority
                        unoptimized
                      />
                      {/* Glass Shard Highlight & Crystal Specular */}
                      <div className="absolute inset-0 bg-white/25 pointer-events-none" />
                      <div className="absolute inset-0 border border-white/50 pointer-events-none rounded-xl" />
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Fullscreen Development Process Window (Rendered via React Portal with 100% Opacity) */}
      {mounted &&
        typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {phase === "revealed" && selectedCard && (() => {
              const cardTech = ARCANA_TECH_STACK[selectedCard.id] || {};
              const cardVolunteer = ARCANA_VOLUNTEER_EXPERIENCES[selectedCard.id] || [];
              const cardLabel =
                selectedCard.id === "frontend"
                  ? "Frontend"
                  : selectedCard.id === "backend"
                    ? "Backend"
                    : "DevOps";
              const totalItems = Object.values(cardTech).reduce(
                (acc, curr) => acc + curr.length,
                0
              );

              return (
                <motion.div
                  className="fixed inset-0 z-[99999] flex flex-col w-full h-full overflow-hidden bg-[#FDF8F2] dark:bg-[#131317]"
                  style={{
                    backgroundColor: "var(--bg-page)",
                    color: "var(--text-primary)",
                    opacity: 1,
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  {/* Top Bar / Header */}
                  <div
                    className="relative z-20 px-6 sm:px-10 py-5 sm:py-6 border-b flex flex-col items-center justify-center text-center shrink-0"
                    style={{ borderColor: "var(--border-color)" }}
                  >
                    <h2
                      className="font-[Outfit] text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {selectedCard.name}
                    </h2>
                    <p
                      className="text-xs sm:text-sm mt-1 max-w-2xl font-[Plus_Jakarta_Sans] leading-relaxed"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {selectedCard.description}
                    </p>

                    {/* Top Right Close (X) Icon Button */}
                    <button
                      onClick={handleReset}
                      className="absolute right-6 sm:right-10 top-1/2 -translate-y-1/2 p-2.5 rounded-xl border transition-all duration-150 cursor-pointer shadow-md flex items-center justify-center hover:scale-105"
                      style={{
                        backgroundColor: "var(--bg-card)",
                        borderColor: "var(--border-color)",
                        color: "var(--text-primary)",
                      }}
                      aria-label="Close Window"
                      title="Close (Esc)"
                    >
                      <svg
                        className="w-5 h-5 sm:w-6 sm:h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>

                  {/* Main Window 2-Column Content */}
                  <div className="relative z-10 flex-1 min-h-0 w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 overflow-hidden">
                    {/* Left Column: Tech Stack Arsenal (5 cols) */}
                    <div
                      className="lg:col-span-5 flex flex-col min-h-0 rounded-2xl border p-5 sm:p-6 shadow-lg overflow-hidden"
                      style={{
                        backgroundColor: "var(--bg-card)",
                        borderColor: "var(--border-color)",
                      }}
                    >
                      <div
                        className="flex items-center mb-4 pb-3 border-b shrink-0"
                        style={{ borderColor: "var(--border-color)" }}
                      >
                        <h3
                          className="font-[Outfit] text-base font-bold tracking-wide uppercase"
                          style={{ color: "var(--text-primary)" }}
                        >
                          TECH
                        </h3>
                      </div>

                      {/* Scrollable Tech Stack Categories */}
                      <div className="modal-scrollable flex-1 overflow-y-auto pr-2 space-y-6">
                        {Object.entries(cardTech).map(([category, items]) => (
                          <div key={category}>
                            <h4
                              className="font-[Plus_Jakarta_Sans] text-xs sm:text-sm font-semibold mb-3.5 flex items-center gap-2"
                              style={{ color: "var(--text-primary)" }}
                            >
                              <span
                                className="w-1 h-4 rounded block"
                                style={{ backgroundColor: "var(--accent)" }}
                              />
                              {category}
                            </h4>
                            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-4 gap-3">
                              {items.map((item) => (
                                <motion.div
                                  key={item.name}
                                  className="tech-icon flex flex-col items-center select-none"
                                  whileHover={{ scale: 1.08, rotate: 4 }}
                                  transition={{
                                    type: "spring",
                                    stiffness: 180,
                                    damping: 25,
                                  }}
                                >
                                  <div
                                    className="w-13 h-13 sm:w-14 sm:h-14 rounded-xl shadow-md flex items-center justify-center border"
                                    style={{
                                      backgroundColor: "var(--bg-page)",
                                      borderColor: "var(--border-color)",
                                    }}
                                  >
                                    <img
                                      src={item.icon}
                                      alt={item.name}
                                      className={`${item.size || "w-7 h-7"} icon-white`}
                                    />
                                  </div>
                                  <span
                                    className="text-xs mt-1.5 font-medium font-[Plus_Jakarta_Sans] text-center truncate max-w-full"
                                    style={{ color: "var(--text-muted)" }}
                                  >
                                    {item.name}
                                  </span>
                                </motion.div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Right Column: Volunteer Experience (7 cols) */}
                    <div
                      className="lg:col-span-7 flex flex-col min-h-0 rounded-2xl border p-5 sm:p-6 shadow-lg overflow-hidden"
                      style={{
                        backgroundColor: "var(--bg-card)",
                        borderColor: "var(--border-color)",
                      }}
                    >
                      <div
                        className="flex items-center mb-4 pb-3 border-b shrink-0"
                        style={{ borderColor: "var(--border-color)" }}
                      >
                        <h3
                          className="font-[Outfit] text-base font-bold tracking-wide uppercase"
                          style={{ color: "var(--text-primary)" }}
                        >
                          Volunteer Experience
                        </h3>
                      </div>

                      {/* Scrollable Volunteer Cards Grid */}
                      <div className="modal-scrollable flex-1 overflow-y-auto pr-2">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                          {cardVolunteer.map((vol) => (
                            <div
                              key={vol.id}
                              className="p-4 rounded-xl border transition-all duration-200 group hover:border-[var(--accent)] flex flex-col justify-between"
                              style={{
                                backgroundColor: "var(--bg-page)",
                                borderColor: "var(--border-color)",
                              }}
                            >
                              <div>
                                <div className="flex items-start justify-between gap-2 mb-1">
                                  <h4
                                    className="font-[Outfit] font-bold text-sm sm:text-base group-hover:text-[var(--accent)] transition-colors"
                                    style={{ color: "var(--text-primary)" }}
                                  >
                                    {vol.org}
                                  </h4>
                                  <span
                                    className="text-[10px] px-2 py-0.5 rounded font-mono font-semibold shrink-0"
                                    style={{
                                      backgroundColor: vol.period.includes("Now")
                                        ? "rgba(16, 185, 129, 0.12)"
                                        : "rgba(150, 150, 150, 0.1)",
                                      color: vol.period.includes("Now")
                                        ? "#10b981"
                                        : "var(--text-muted)",
                                      border: `1px solid ${vol.period.includes("Now")
                                        ? "rgba(16, 185, 129, 0.25)"
                                        : "var(--border-color)"
                                        }`,
                                    }}
                                  >
                                    {vol.period}
                                  </span>
                                </div>
                                <p
                                  className="text-xs sm:text-sm font-semibold mb-1 font-[Plus_Jakarta_Sans]"
                                  style={{ color: "var(--accent)" }}
                                >
                                  {vol.role}
                                </p>
                                {vol.description && (
                                  <p
                                    className="text-xs leading-relaxed font-[Plus_Jakarta_Sans]"
                                    style={{ color: "var(--text-secondary)" }}
                                  >
                                    {vol.description}
                                  </p>
                                )}
                              </div>

                              {/* Tech Stack Logos instead of Text */}
                              <div
                                className="flex items-center gap-1.5 mt-3 pt-2.5 border-t"
                                style={{ borderColor: "var(--border-color)" }}
                              >
                                {vol.tags
                                  .filter((tag) => TECH_LOGOS[tag])
                                  .map((tag) => (
                                    <div
                                      key={tag}
                                      className="w-7 h-7 rounded-lg border flex items-center justify-center shadow-xs transition-transform hover:scale-110"
                                      style={{
                                        backgroundColor: "var(--bg-card)",
                                        borderColor: "var(--border-color)",
                                      }}
                                      title={tag}
                                    >
                                      <img
                                        src={TECH_LOGOS[tag]}
                                        alt={tag}
                                        className="w-4 h-4 icon-white object-contain"
                                      />
                                    </div>
                                  ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })()}
          </AnimatePresence>,
          document.body
        )}
    </section>
  );
}
