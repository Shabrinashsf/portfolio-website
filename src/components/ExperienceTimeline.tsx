"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ScrollReveal } from "@/components/animations";
import GridBackground from "@/components/GridBackground";

type ExperienceItem = {
  id: number;
  type: "work";
  org: string;
  period: string;
  role: string;
  description: string;
  tags: string[];
};

const experiences: ExperienceItem[] = [
  {
    id: 1,
    type: "work",
    org: "Direktorat Pengembangan dan Sistem Informasi ITS",
    period: "June 2026 - Present",
    role: "Fullstack Developer",
    description: "",
    tags: ["PHP", "Laravel", "MySQL"],
  },
  {
    id: 2,
    type: "work",
    org: "Dikmenum Dinas Pendidikan Jawa Timur",
    period: "January 2026 - June 2026",
    role: "Backend Developer",
    description: "",
    tags: ["PHP", "Laravel", "Golang", "MariaDB"],
  },
  {
    id: 3,
    type: "work",
    org: "Jago Teknik",
    period: "Feb 2026 — Maret 2026",
    role: "Backend Developer",
    description:
      "Designed a web-based learning platform architecture with user authentication, personalized dashboards, class management, quizzes, and progress tracking. Implemented role-based access control for admins, tutors, and members. Tech stack: Golang, Gin, Gorm, PostgreSQL.",
    tags: ["Go", "Gin", "Gorm", "PostgreSQL"],
  },
];

export default function ExperienceTimeline() {
  return (
    <section
      className="min-h-[calc(100vh-64px)] relative overflow-hidden"
      style={{ backgroundColor: "var(--bg-page)", color: "var(--text-primary)" }}
    >
      <GridBackground />
      <div className="relative z-10 px-8 md:px-16 max-w-7xl mx-auto py-12 md:py-16">
        {/* Header */}
        <ScrollReveal className="mb-12 md:mb-16">
          <h1 className="font-[Outfit] text-4xl md:text-5xl lg:text-6xl font-extrabold mb-5 leading-tight pt-6 md:pt-10"
            style={{ color: "var(--accent)" }}
          >
            Working Experience<span style={{ color: "var(--text-primary)" }}>.</span>
          </h1>
          <p className="font-[Plus_Jakarta_Sans] text-base md:text-lg max-w-2xl leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            A timeline of my professional work journey, detailing the roles,
            responsibilities, and production systems I&apos;ve built along the way.
          </p>
        </ScrollReveal>

        {/* Vertical Timeline */}
        <div className="relative border-l pl-8 md:pl-12 space-y-14"
          style={{ borderColor: "var(--border-color)" }}
        >
          <AnimatePresence mode="popLayout">
            {experiences.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.6, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="relative group"
              >
                {/* Timeline Dot */}
                <motion.div
                  className={`absolute -left-[41px] md:-left-[57px] top-1 w-4 h-4 rounded-full border-2`}
                  style={{
                    backgroundColor: "var(--bg-page)",
                    borderColor: index === 0 ? "var(--accent)" : "var(--border-color)",
                  }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.12 + 0.25 }}
                />

                <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-4 md:gap-8">
                  {/* Period & Org */}
                  <div className="pt-1">
                    <p className="font-[JetBrains_Mono] text-xs tracking-wider uppercase mb-2"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {item.period}
                    </p>
                    <p className="font-[Plus_Jakarta_Sans] text-base font-medium"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {item.org}
                    </p>
                  </div>

                  {/* Content Card */}
                  <motion.div
                    className="p-6 md:p-8 rounded-lg border"
                    style={{
                      backgroundColor: "var(--bg-card)",
                      borderColor: "var(--border-color)",
                    }}
                    whileHover={{ y: -2, borderColor: "var(--accent)" }}
                    transition={{ type: "spring", stiffness: 180, damping: 28 }}
                  >
                    <h3 className="font-[Outfit] text-xl md:text-2xl font-semibold mb-3"
                      style={{ color: "var(--accent)" }}
                    >
                      {item.role}
                    </h3>
                    <p className="font-[Plus_Jakarta_Sans] text-base leading-relaxed mb-5"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {item.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map((tag, tagIndex) => (
                        <motion.span
                          key={tag}
                          className="inline-flex items-center px-3 py-1 rounded font-[JetBrains_Mono] text-xs tracking-wider uppercase"
                          style={{
                            backgroundColor: "rgba(30, 86, 205, 0.1)",
                            color: "var(--accent)",
                          }}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: tagIndex * 0.05 + 0.3 }}
                        >
                          {tag}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
