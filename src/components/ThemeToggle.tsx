"use client";

import { useState } from "react";
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
      ctx.resume().catch(() => { });
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

export default function ThemeToggle({ embedded = false }: { embedded?: boolean }) {
  const { theme, toggleTheme } = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  const isDark = theme === "dark";
  const displayedIsDark = isHovered ? !isDark : isDark;

  const handleClick = () => {
    playLightClick();
    toggleTheme();
  };

  if (embedded) {
    return (
      <button
        type="button"
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative w-8 h-8 rounded-lg flex items-center justify-center p-0.5 focus:outline-none shrink-0"
        aria-label="Toggle theme"
        title={isDark ? "Switch to White Space" : "Switch to Black Space"}
      >
        <div className="w-7 h-7 relative rounded-md overflow-hidden shadow-sm pointer-events-none">
          <Image
            src="/img/black-space.jpg"
            alt="Black Space"
            fill
            className={`rounded-md object-cover transition-opacity duration-300 ease-in-out ${displayedIsDark ? "opacity-100" : "opacity-0"
              }`}
            sizes="28px"
            priority
          />
          <Image
            src="/img/white-space.jpg"
            alt="White Space"
            fill
            className={`rounded-md object-cover transition-opacity duration-300 ease-in-out ${displayedIsDark ? "opacity-0" : "opacity-100"
              }`}
            sizes="28px"
            priority
          />
        </div>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-10 h-10 rounded-xl flex items-center justify-center border transition-colors duration-300 overflow-hidden focus:outline-none"
      style={{
        borderColor: "var(--border-color)",
        backgroundColor: "var(--bg-card)",
      }}
      aria-label="Toggle theme"
      title={isDark ? "Switch to White Space" : "Switch to Black Space"}
    >
      <div className="w-7 h-7 relative rounded-lg overflow-hidden pointer-events-none">
        <Image
          src="/img/black-space.jpg"
          alt="Black Space"
          fill
          className={`rounded-lg object-cover transition-opacity duration-300 ease-in-out ${displayedIsDark ? "opacity-100" : "opacity-0"
            }`}
          sizes="28px"
          priority
        />
        <Image
          src="/img/white-space.jpg"
          alt="White Space"
          fill
          className={`rounded-lg object-cover transition-opacity duration-300 ease-in-out ${displayedIsDark ? "opacity-0" : "opacity-100"
            }`}
          sizes="28px"
          priority
        />
      </div>
    </button>
  );
}