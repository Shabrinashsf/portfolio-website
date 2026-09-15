"use client";

import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import Image from "next/image";

let sharedAudioCtx: AudioContext | any = null;

function playLightClick() {
  try {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) return;
    
    if (!sharedAudioCtx) {
      sharedAudioCtx = new AudioCtx();
    }
    const ctx = sharedAudioCtx;
    
    if (ctx.state === "suspended") {
      ctx.resume().catch(() => {});
    }
    
    // Use original timing
    const now = ctx.currentTime;

    const t1 = ctx.createOscillator();
    const g1 = ctx.createGain();
    t1.type = "square";
    t1.frequency.setValueAtTime(1200, now);
    t1.frequency.exponentialRampToValueAtTime(200, now + 0.015);
    g1.gain.setValueAtTime(0.25, now);
    g1.gain.exponentialRampToValueAtTime(0.001, now + 0.025);
    t1.connect(g1);
    g1.connect(ctx.destination);
    t1.start(now);
    t1.stop(now + 0.03);

    const noise = ctx.createBufferSource();
    const buf = ctx.createBuffer(1, ctx.sampleRate * 0.04, ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < data.length; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.6;
    }
    noise.buffer = buf;
    const ng = ctx.createGain();
    ng.gain.setValueAtTime(0.2, now);
    ng.gain.exponentialRampToValueAtTime(0.001, now + 0.02);
    const hp = ctx.createBiquadFilter();
    hp.type = "highpass";
    hp.frequency.value = 2000;
    noise.connect(hp);
    hp.connect(ng);
    ng.connect(ctx.destination);
    noise.start(now);
    noise.stop(now + 0.04);
  } catch (e) {
    console.error(e);
  }
}

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  const handleClick = () => {
    playLightClick();
    toggleTheme();
  };

  return (
    <motion.button
      onClick={handleClick}
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.9 }}
      className="relative w-10 h-10 rounded-full flex items-center justify-center border transition-colors duration-300 overflow-hidden focus:outline-none"
      style={{
        borderColor: isDark ? "#2a2a2e" : "#e2e4e8",
        backgroundColor: isDark ? "#1b1b1f" : "#ffffff",
      }}
      aria-label="Toggle theme"
    >
      <motion.div
        key={theme}
        initial={{ scale: 0, rotate: -90, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        exit={{ scale: 0, rotate: 90, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="w-7 h-7 relative"
      >
        <Image
          src={isDark ? "/img/black-space.jpg" : "/img/white-space.jpg"}
          alt={isDark ? "Black Space" : "White Space"}
          fill
          className="rounded-full object-cover"
          sizes="28px"
        />
      </motion.div>
    </motion.button>
  );
}