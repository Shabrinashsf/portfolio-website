"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollReveal } from "@/components/animations";
import GridBackground from "@/components/GridBackground";

type ExperienceItem = {
  id: number;
  type: "work" | "volunteer";
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
    description:
      "",
    tags: ["PHP", "Laravel", "MySQL"],
  },
  {
    id: 2,
    type: "work",
    org: "Dikmenum Dinas Pendidikan Jawa Timur",
    period: "January 2026 - June 2026",
    role: "Backend Developer",
    description:
      "",
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
  {
    id: 4,
    type: "volunteer",
    org: "Schematics 2026",
    period: "Maret 2026 — Now",
    role: "Technical Project Manager",
    description:
      "Schematics is an annual event organized by students of the Informatics Engineering Department at Institut Teknologi Sepuluh Nopember.",
    tags: ["Team Management", "Go", "Gin", "PostgreSQL"],
  },
  {
    id: 5,
    type: "volunteer",
    org: "TEDxITS 2026",
    period: "Jan 2026 - May 2026",
    role: "Manager Backend",
    description:
      "TEDxITS is an annual event that provides a platform for the community, especially those within the Institut Teknologi Sepuluh Nopember environment, to share their compelling ideas.",
    tags: ["Go", "Fiber", "PostgreSQL"],
  },
  {
    id: 6,
    type: "volunteer",
    org: "Futurest 2026",
    period: "Feb 2026 - Apr 2026",
    role: "Senior Backend Developer",
    description:
      "Futurest (Future Energy Summit) is the annual flagship event of the Society of Renewable Energy (SRE) ITS.",
    tags: ["Go", "Gin", "PostgreSQL"],
  },
  {
    id: 7,
    type: "volunteer",
    org: "Ini Lho ITS! 2026",
    period: "Feb 2026 - Apr 2026",
    role: "Manager Backend",
    description:
      "Ini Lho ITS! is an annual event that introduces Institut Teknologi Sepuluh Nopember to the wider public especially high school and vocational school students.",
    tags: ["Go", "Gin", "PostgreSQL"],
  },
  {
    id: 8,
    type: "volunteer",
    org: "180DC ITS",
    period: "Oct 2025 — Dec 2025",
    role: "Junior Backend Developer",
    description:
      "180dc ITS is a global consultancy organization that offer high-quality consulting services to nonprofits, social enterprises, and socially conscious organizations.",
    tags: ["Go", "Gin", "PostgreSQL"],
  },
  {
    id: 9,
    type: "volunteer",
    org: "Schematics 2025",
    period: "Sep 2025 — Oct 2025",
    role: "Vice Director 2 — WebDev",
    description:
      "Schematics is an annual event organized by students of the Informatics Engineering Department at Institut Teknologi Sepuluh Nopember.",
    tags: ["Go", "Gin", "PostgreSQL", "Team Management"],
  },
  {
    id: 10,
    type: "volunteer",
    org: "TEDxITS 2025",
    period: "Aug 2025 — Sep 2025",
    role: "Junior Backend Developer",
    description:
      "TEDxITS is an annual event that provides a platform for the community, especially those within the Institut Teknologi Sepuluh Nopember environment, to share their compelling ideas.",
    tags: ["Go", "Gin", "PostgreSQL"],
  },
  {
    id: 11,
    type: "volunteer",
    org: "Ini Lho ITS! 2025",
    period: "Jun 2025 — Aug 2025",
    role: "Junior Backend Developer",
    description:
      "Ini Lho ITS! is an annual event that introduces Institut Teknologi Sepuluh Nopember to the wider public especially high school and vocational school students.",
    tags: ["Go", "Gin", "PostgreSQL"],
  },
];

export default function ExperienceTimeline() {
  const [filter, setFilter] = useState<"all" | "work" | "volunteer">("work");

  const filtered =
    filter === "all"
      ? experiences
      : experiences.filter((e) => e.type === filter);

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
            Experience<span style={{ color: "var(--text-primary)" }}>.</span>
          </h1>
          <p className="font-[Plus_Jakarta_Sans] text-base md:text-lg max-w-2xl leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            A timeline of my professional journey and volunteer engagements,
            detailing the roles, responsibilities, and technologies I&apos;ve
            encountered along the way.
          </p>
        </ScrollReveal>

        {/* Filter Toggle */}
        <motion.div
          className="mb-12 flex space-x-6 border-b pb-3"
          style={{ borderColor: "var(--border-color)" }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {[
            { key: "work", label: "Work" },
            { key: "volunteer", label: "Volunteer" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key as "work" | "volunteer")}
              className="font-[JetBrains_Mono] text-sm tracking-wider uppercase pb-2 transition-colors duration-200"
              style={{
                color: filter === tab.key ? "var(--accent)" : "var(--text-muted)",
                borderBottom: filter === tab.key ? `2px solid var(--accent)` : "2px solid transparent",
              }}
            >
              {tab.label}
            </button>
          ))}
        </motion.div>

        {/* Vertical Timeline */}
        <div className="relative border-l pl-8 md:pl-12 space-y-14"
          style={{ borderColor: "var(--border-color)" }}
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((item, index) => (
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
                    {item.type === "volunteer" && (
                      <p className="font-[JetBrains_Mono] text-xs tracking-wider uppercase mt-1"
                        style={{ color: "var(--accent)" }}
                      >
                        Volunteer
                      </p>
                    )}
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
