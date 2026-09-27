"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import GridBackground from "@/components/GridBackground";

interface GameModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function GameModal({ isOpen, onClose }: GameModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock scrolling (html & body) and listen for Escape key when open
  useEffect(() => {
    if (isOpen) {
      const prevHtmlOverflow = document.documentElement.style.overflow;
      const prevBodyOverflow = document.body.style.overflow;
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          onClose();
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
  }, [isOpen, onClose]);

  if (!mounted || typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <AnimatePresence>
      {isOpen && (
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
          transition={{ duration: 0.22 }}
        >
          {/* Subtle Grid Background */}
          <GridBackground />

          {/* Top Bar / Header */}
          <div
            className="relative z-20 px-4 sm:px-10 py-4 sm:py-6 border-b flex items-start sm:items-center justify-between gap-3 shrink-0"
            style={{ borderColor: "var(--border-color)", backgroundColor: "var(--bg-nav)" }}
          >
            {/* Dummy left spacer to keep perfect center alignment on desktop */}
            <div className="hidden sm:block w-10 shrink-0" aria-hidden="true" />

            {/* Center title and description */}
            <div className="flex-1 min-w-0 text-center">
              <h2
                className="font-[Outfit] text-xl sm:text-3xl font-extrabold tracking-tight"
                style={{ color: "var(--text-primary)" }}
              >
                Side Quests
              </h2>
              <p
                className="text-xs sm:text-sm mt-1 max-w-xl mx-auto font-[Plus_Jakarta_Sans] leading-relaxed"
                style={{ color: "var(--text-secondary)" }}
              >
                Stories, memories, and virtual worlds outside software engineering.
              </p>
            </div>

            {/* Top Right Close Button */}
            <button
              onClick={onClose}
              className="p-2 sm:p-2.5 rounded-xl border transition-all duration-150 cursor-pointer shadow-md flex items-center justify-center hover:scale-105 active:scale-95 shrink-0"
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

          {/* Main Window Content */}
          <div className="relative z-10 flex-1 min-h-0 w-full max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 flex items-center justify-center overflow-y-auto modal-scrollable">
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 15 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="tactile-card rounded-2xl p-8 sm:p-12 max-w-lg w-full text-center flex flex-col items-center"
            >

              {/* Title & Cat Emoji */}
              <h3
                className="font-[Outfit] text-3xl sm:text-4xl font-extrabold tracking-tight mb-3"
                style={{ color: "var(--text-primary)" }}
              >
                In Development 😼
              </h3>

              {/* Retro Status Box */}
              <div
                className="w-full p-3.5 rounded-xl border border-black mb-6 text-left"
                style={{ backgroundColor: "var(--subcard-bg)" }}
              >
                <div className="flex items-center justify-between text-xs font-mono font-bold mb-1.5">
                  <span style={{ color: "var(--text-primary)" }}>QUEST STATUS</span>
                  <span style={{ color: "var(--accent)" }}>IN PROGRESS...</span>
                </div>
                <div className="w-full h-2.5 border border-black rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
                  <motion.div
                    className="h-full bg-[var(--accent)]"
                    initial={{ width: "0%" }}
                    animate={{ width: "65%" }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                  />
                </div>
              </div>

              {/* Return Button */}
              <button
                type="button"
                onClick={onClose}
                className="tactile-btn-sm px-6 py-2.5 rounded-xl font-bold font-[Outfit] text-sm cursor-pointer"
                style={{
                  backgroundColor: "var(--accent)",
                  color: "#ffffff",
                }}
              >
                Back to Home
              </button>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
