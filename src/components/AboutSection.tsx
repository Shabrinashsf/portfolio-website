"use client";

import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/animations";
import GridBackground from "@/components/GridBackground";

export default function AboutSection() {
  return (
    <section
      className="min-h-[calc(100vh-64px)] relative overflow-hidden"
      style={{ backgroundColor: "var(--bg-page)", color: "var(--text-primary)" }}
    >
      <GridBackground />
      <div className="relative z-10 px-8 md:px-16 max-w-7xl mx-auto py-12 md:py-16">
        {/* Header */}
        <ScrollReveal className="mb-8">
          <h1 className="font-[Outfit] text-4xl md:text-5xl lg:text-6xl font-extrabold mb-3 leading-tight pt-6 md:pt-10"
            style={{ color: "var(--accent)" }}
          >
            About me<span style={{ color: "var(--text-primary)" }}>.</span>
          </h1>
          <motion.h2
            className="font-[Outfit] text-xl md:text-2xl font-medium tracking-wide border-l-2 pl-5 py-1"
            style={{ color: "var(--text-secondary)", borderColor: "var(--accent)" }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            Crafting systems with{" "}
            <motion.span
              className="italic inline-block font-semibold"
              style={{ color: "var(--accent)" }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              passion<span style={{ color: "var(--text-primary)" }}>.</span>
            </motion.span>
          </motion.h2>
        </ScrollReveal>

        {/* Bio */}
        <ScrollReveal className="max-w-3xl mb-16">
          <p className="font-[Plus_Jakarta_Sans] text-base md:text-lg leading-relaxed mb-6"
            style={{ color: "var(--text-secondary)" }}
          >
            A Third-year Informatics Engineering student at ITS and a{" "}
            <span className="font-medium" style={{ color: "var(--accent)" }}>Software Engineer</span> with{" "}
            <span className="font-medium" style={{ color: "var(--accent)" }}>2 years</span> of production experience building{" "}
            <span className="font-medium" style={{ color: "var(--accent)" }}>Software Products</span>{" "}
          </p>
          <p className="font-[Plus_Jakarta_Sans] text-base md:text-lg leading-relaxed mb-8"
            style={{ color: "var(--text-secondary)" }}
          >
            Besides doing softeng and tech stuff, you can find me rotten in my room playing games. My favorite genre is{" "}
            <span className="font-medium" style={{ color: "var(--accent)" }}>RPG/JRPG</span> or{" "}
            <span className="font-medium" style={{ color: "var(--accent)" }}>Story</span>.{" "}
            <span className="font-medium" style={{ color: "var(--accent)" }}>Coffee</span>{" "}
            is my fuel to start the day, but playing{" "}
            <span className="font-medium" style={{ color: "var(--accent)" }}>Resident Evil</span> or{" "}
            <span className="font-medium" style={{ color: "var(--accent)" }}>Persona</span>, are my emotional support during the hard days.{" "}
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
