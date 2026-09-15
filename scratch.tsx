"use client";

import { motion } from "framer-motion";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/animations";
import GridBackground from "@/components/GridBackground";

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/Shabrinashsf",
    icon: (
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    ),
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/shabrinasf/",
    icon: (
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    ),
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/shabrina.amalia_/",
    icon: (
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    ),
  },
  {
    name: "Email",
    href: "mailto:shabrinaamalia860@gmail.com",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    ),
    isStroke: true,
  }
];

export default function ContactSection() {
  return (
    <section
      className="flex-grow flex flex-col justify-center relative overflow-hidden"
      style={{ backgroundColor: "var(--bg-page)", color: "var(--text-primary)" }}
    >
      <GridBackground />
      <div className="relative z-10 px-8 md:px-16 max-w-4xl mx-auto py-6 lg:py-2 w-full">
        {/* Header */}
        <ScrollReveal className="mb-10 text-center">
          <h1 className="font-[Outfit] text-4xl md:text-5xl lg:text-6xl font-extrabold mb-5 leading-tight"
            style={{ color: "var(--text-primary)" }}
          >
            Let&apos;s{" "}
            <motion.span
              className="italic inline-block"
              style={{ color: "var(--accent)" }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              talk.
            </motion.span>
          </h1>
          <p className="font-[Plus_Jakarta_Sans] text-base md:text-lg max-w-xl mx-auto leading-relaxed mb-6"
            style={{ color: "var(--text-secondary)" }}
          >
            Want to chat or buy me a coffee? Just shoot me a message and I&apos;ll
            respond whenever I can.
          </p>

          {/* Location & Contact Info */}
          <div className="flex flex-wrap items-center justify-center gap-6 font-[Plus_Jakarta_Sans] text-sm md:text-base font-medium"
            style={{ color: "var(--text-secondary)" }}
          >
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.242-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>Surabaya, Indonesia</span>
            </div>
            <a 
              href="https://wa.me/6282352070334" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 transition-opacity hover:opacity-70"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span className="underline underline-offset-4">+6285257188594</span>
            </a>
          </div>
        </ScrollReveal>

        {/* Links Grid */}
        <ScrollReveal delay={0.2}>
          <StaggerContainer staggerDelay={0.1} className="flex flex-wrap justify-center gap-4 md:gap-6 mt-8">
            {socialLinks.map((link) => (
              <StaggerItem key={link.name}>
                <motion.a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 px-8 py-3.5 rounded-xl border transition-colors glass-card-60 glass-border-hover"
                  whileHover={{ scale: 1.05, y: -4 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    backgroundColor: "var(--bg-card)",
                    borderColor: "var(--border-color)",
                    color: "var(--text-primary)",
                  }}
                >
                  <svg
                    className="w-5 h-5 shrink-0 transition-colors"
                    fill={link.isStroke ? "none" : "currentColor"}
                    stroke={link.isStroke ? "currentColor" : "none"}
                    strokeWidth={link.isStroke ? 2 : undefined}
                    viewBox="0 0 24 24"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {link.icon}
                  </svg>
                  <span className="font-[Plus_Jakarta_Sans] text-sm md:text-base font-semibold tracking-wide">
                    {link.name}
                  </span>
                </motion.a>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </ScrollReveal>
      </div>
    </section>
  );
}
