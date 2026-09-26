"use client";

import { motion } from "framer-motion";
import { useAudio } from "@/context/AudioContext";

function MinimalEqualizer({ playing }: { playing: boolean }) {
  return (
    <div className="flex items-center gap-[2.5px] h-3 px-0.5" aria-hidden="true">
      {[
        { duration: 0.65, delay: 0 },
        { duration: 0.8, delay: 0.15 },
        { duration: 0.6, delay: 0.3 },
      ].map((bar, i) => (
        <motion.span
          key={i}
          className="w-[2.5px] rounded-full"
          style={{
            backgroundColor: playing ? "var(--accent)" : "var(--text-muted)",
          }}
          animate={
            playing
              ? { height: ["30%", "100%", "45%"] }
              : { height: "3px" }
          }
          transition={
            playing
              ? {
                duration: bar.duration,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: bar.delay,
              }
              : { duration: 0.25 }
          }
        />
      ))}
    </div>
  );
}

export default function AudioToggle({ embedded = false }: { embedded?: boolean }) {
  const { playing, toggle } = useAudio();

  return (
    <>
      <audio
        src="/audio/OMORI OST - Good Morning.mp3"
        loop
        preload="auto"
      />

      {embedded ? (
        <motion.button
          onClick={toggle}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className="group flex items-center gap-2.5 px-3.5 h-[44px] rounded-xl border shadow-sm backdrop-blur-md transition-all duration-200 focus:outline-none cursor-pointer"
          style={{
            backgroundColor: "var(--bg-card)",
            borderColor: playing ? "var(--accent)" : "var(--border-color)",
          }}
          aria-label={playing ? "Pause music" : "Play music"}
          title={playing ? "Pause 'Good Morning' - OMORI OST" : "Play 'Good Morning' - OMORI OST"}
        >
          {/* Play / Pause outline icon */}
          <span
            className="flex items-center justify-center w-4 h-4 shrink-0 transition-colors duration-200"
            style={{
              color: playing ? "var(--accent)" : "var(--text-muted)",
            }}
          >
            {playing ? (
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              </svg>
            ) : (
              <svg className="w-3.5 h-3.5 translate-x-[0.5px]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </span>

          {/* Song Title */}
          <span
            className="text-xs font-semibold tracking-wide transition-colors duration-200 whitespace-nowrap"
            style={{
              color: playing ? "var(--text-primary)" : "var(--text-secondary)",
            }}
          >
            Good Morning
          </span>

          {/* Minimal 3-bar equalizer */}
          <MinimalEqualizer playing={playing} />
        </motion.button>
      ) : (
        <motion.button
          onClick={toggle}
          whileTap={{ scale: 0.9 }}
          className="relative w-10 h-10 shrink-0 rounded-2xl flex items-center justify-center border transition-colors duration-300 focus:outline-none"
          style={{
            backgroundColor: "var(--bg-card)",
            borderColor: playing ? "var(--accent)" : "var(--border-color)",
            color: playing ? "var(--accent)" : "var(--text-secondary)",
          }}
          aria-label={playing ? "Pause music" : "Play music"}
          title={playing ? "Pause 'Good Morning'" : "Play 'Good Morning'"}
        >
          {playing ? (
            <MinimalEqualizer playing={playing} />
          ) : (
            <svg className="w-4 h-4 translate-x-[1px]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </motion.button>
      )}
    </>
  );
}