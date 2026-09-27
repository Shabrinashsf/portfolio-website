"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ScrollReveal, Floating } from "@/components/animations";
import GridBackground from "@/components/GridBackground";

export default function AboutSection() {
  return (
    <section
      className="flex-grow flex flex-col justify-center relative overflow-hidden min-h-[calc(100vh-64px-56px)] lg:h-[calc(100vh-64px-56px)] py-8 sm:py-12 lg:py-0"
      style={{ backgroundColor: "var(--bg-page)", color: "var(--text-primary)" }}
    >
      <GridBackground />
      <div className="relative z-10 px-6 sm:px-10 md:px-16 max-w-7xl mx-auto w-full my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Side: Text Info */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Header */}
            <ScrollReveal className="mb-6 lg:mb-8">
              <h1 className="font-[Outfit] text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-3 leading-tight"
                style={{ color: "var(--accent)" }}
              >
                About me<span style={{ color: "var(--text-primary)" }}>.</span>
              </h1>
              <motion.h2
                className="font-[Outfit] text-xl sm:text-2xl font-medium tracking-wide border-l-2 pl-5 py-1"
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
            <ScrollReveal className="max-w-2xl">
              <p className="font-[Plus_Jakarta_Sans] text-base md:text-lg leading-relaxed mb-5"
                style={{ color: "var(--text-secondary)" }}
              >
                A Third-year Informatics Engineering student at ITS and a Software Engineer with 2 years of production experience building Software Products. I mainly handled Backend System but lately (cuz of work and opportunity) i also handled Frontend System, but i still prefer Backend if there's a choice.
              </p>
              <p className="font-[Plus_Jakarta_Sans] text-base md:text-lg leading-relaxed"
                style={{ color: "var(--text-secondary)" }}
              >
                Besides doing softeng and tech stuff, you can find me rotten in my room playing games. My favorite genre is RPG/JRPG or Story. Coffee is my fuel to start the day, but playing Resident Evil or Persona are my emotional support during the hard days.
              </p>
            </ScrollReveal>
          </div>

          {/* Right Side: Decorative Frame */}
          <motion.div
            className="lg:col-span-5 relative flex items-center justify-center pt-4 lg:pt-0"
            initial={{ opacity: 0, x: 60, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <Floating>
              <div className="relative aspect-square w-56 lg:w-72">
                <div
                  className="absolute -inset-0.5 rounded-2xl blur-lg opacity-50"
                  style={{ background: "linear-gradient(to top right, rgba(30,86,205,0.3), rgba(168,199,250,0.3))" }}
                />
                <div
                  className="absolute -inset-4 border rounded-3xl transform rotate-3"
                  style={{ borderColor: "var(--border-color)" }}
                />
                <div
                  className="absolute -inset-4 border rounded-3xl transform -rotate-2"
                  style={{ borderColor: "var(--border-color)" }}
                />
                <div
                  className="relative w-full h-full rounded-2xl overflow-hidden border shadow-2xl flex items-center justify-center"
                  style={{
                    borderColor: "var(--border-color)",
                    backgroundColor: "var(--bg-card)",
                  }}
                >
                  <Image
                    src="/img/shab.jpeg"
                    alt="Shabrina - About Me"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </Floating>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
