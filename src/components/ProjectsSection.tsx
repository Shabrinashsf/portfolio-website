"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollReveal } from "@/components/animations";
import GridBackground from "@/components/GridBackground";
import { TECH_LOGOS as PROJECT_TECH_LOGOS } from "@/data/tech-logos";
import { SEED_PROJECTS } from "@/data/seed";

type Project = {
  id: number;
  name: string;
  category: "API" | "Boilerplate" | "Utility" | "Frontend";
  status: "Stable" | "In Progress" | "Archived";
  description: string;
  tags: string[];
  link: string;
};

const filters = ["All", "API", "Boilerplate", "Utility", "Frontend"] as const;

type FilterType = (typeof filters)[number];

function getProjectSlug(link: string, name: string) {
  if (link && link.includes("github.com/")) {
    const parts = link.split("github.com/")[1]?.split("/");
    const repo = parts && parts.length > 1 ? parts[1] : parts?.[0];
    if (repo) return `~/${repo}`;
  }
  return `~/${name.toLowerCase().replace(/\s+/g, "-")}`;
}

function getCategoryIcon(category: FilterType, sizeClass = "w-3 h-3") {
  switch (category) {
    case "All":
      return (
        <svg className={`${sizeClass} shrink-0`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
      );
    case "Boilerplate":
      return (
        <svg className={`${sizeClass} shrink-0`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      );
    case "API":
      return (
        <svg className={`${sizeClass} shrink-0`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <ellipse cx="12" cy="5" rx="9" ry="3" strokeWidth={2} />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5v14a9 3 0 0018 0V5" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12a9 3 0 0018 0" />
        </svg>
      );
    case "Utility":
      return (
        <svg className={`${sizeClass} shrink-0`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      );
    case "Frontend":
      return (
        <svg className={`${sizeClass} shrink-0`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      );
  }
}

function renderCategoryBadge(category: Project["category"]) {
  switch (category) {
    case "Boilerplate":
      return (
        <span className="tag-boilerplate inline-flex items-center gap-1 font-[JetBrains_Mono] text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border">
          {getCategoryIcon("Boilerplate", "w-3 h-3")}
          Boilerplate
        </span>
      );
    case "API":
      return (
        <span className="tag-api inline-flex items-center gap-1 font-[JetBrains_Mono] text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border">
          {getCategoryIcon("API", "w-3 h-3")}
          API
        </span>
      );
    case "Utility":
      return (
        <span className="tag-utility inline-flex items-center gap-1 font-[JetBrains_Mono] text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border">
          {getCategoryIcon("Utility", "w-3 h-3")}
          Utility
        </span>
      );
    case "Frontend":
      return (
        <span className="tag-frontend inline-flex items-center gap-1 font-[JetBrains_Mono] text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border">
          {getCategoryIcon("Frontend", "w-3 h-3")}
          Frontend
        </span>
      );
    default:
      return null;
  }
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const FILTER_THEMES: Record<
  FilterType,
  { bg: string; text: string }
> = {
  All: { bg: "#1E56CD", text: "#ffffff" },
  Boilerplate: { bg: "#6366f1", text: "#ffffff" },
  API: { bg: "#0ea5e9", text: "#ffffff" },
  Utility: { bg: "#10b981", text: "#ffffff" },
  Frontend: { bg: "#f59e0b", text: "#131317" },
};

export default function ProjectsSection({ projects }: { projects?: Project[] }) {
  const items: Project[] =
    projects && projects.length > 0
      ? projects
      : SEED_PROJECTS.map((p, i) => ({ ...p, id: -(i + 1) }));
  const [activeFilter, setActiveFilter] = useState<FilterType>("All");
  const [hoveredFilter, setHoveredFilter] = useState<FilterType | null>(null);

  const filtered =
    activeFilter === "All"
      ? items
      : items.filter((p) => p.category === activeFilter);

  return (
    <section
      className="min-h-[calc(100vh-64px)] relative overflow-hidden"
      style={{ backgroundColor: "var(--bg-page)", color: "var(--text-primary)" }}
    >
      <GridBackground />
      <div className="relative z-10 px-8 md:px-16 max-w-[1280px] mx-auto py-12 md:py-16">
        {/* Header */}
        <ScrollReveal className="mb-12 md:mb-16">
          <h1 className="font-[Outfit] text-4xl md:text-5xl lg:text-6xl font-extrabold mb-8 leading-tight pt-6 md:pt-10"
            style={{ color: "var(--accent)" }}
          >
            Projects<span style={{ color: "var(--text-primary)" }}>.</span>
          </h1>

          {/* Filters */}
          <motion.div
            className="flex flex-wrap gap-2.5 sm:gap-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {filters.map((f) => {
              const isActive = activeFilter === f;
              const isHovered = hoveredFilter === f;
              const isHighlighted = isActive || isHovered;
              const theme = FILTER_THEMES[f];

              return (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  onMouseEnter={() => setHoveredFilter(f)}
                  onMouseLeave={() => setHoveredFilter(null)}
                  className={`tactile-btn-sm inline-flex items-center gap-1.5 font-[JetBrains_Mono] text-xs sm:text-sm uppercase tracking-wider px-3.5 py-1.5 rounded cursor-pointer transition-colors duration-150 ${isActive ? "font-bold active-pressed" : "font-medium"
                    }`}
                  style={{
                    backgroundColor: isHighlighted ? theme.bg : "var(--subcard-bg)",
                    color: isHighlighted ? theme.text : "var(--text-primary)",
                  }}
                >
                  {getCategoryIcon(f, "w-3.5 h-3.5")}
                  {f}
                </button>
              );
            })}
          </motion.div>
        </ScrollReveal>

        {/* Project Grid */}
        <motion.div
          key={activeFilter}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project, index) => (
              <motion.div
                key={project.id}
                variants={cardVariants}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="h-full"
              >
                <div className="tactile-card rounded-2xl flex flex-col h-full overflow-hidden">
                  {/* Terminal Titlebar */}
                  <div
                    className="px-5 py-3 border-b flex items-center justify-between"
                    style={{
                      backgroundColor: "var(--subcard-bg)",
                      borderColor: "var(--border-color)",
                    }}
                  >
                    {/* Left: Window Dots */}
                    <div className="flex items-center gap-1.5 shrink-0 w-12">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
                      <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block" />
                      <span className="w-2.5 h-2.5 rounded-full bg-green-500/80 inline-block" />
                    </div>

                    {/* Center: Clean Slug Path Centered */}
                    <span
                      className="font-[JetBrains_Mono] text-xs font-semibold tracking-tight truncate text-center flex-grow"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {getProjectSlug(project.link, project.name)}
                    </span>

                    {/* Right Spacer to preserve center balance */}
                    <div className="w-12 shrink-0" aria-hidden="true" />
                  </div>

                  {/* Card Content Body */}
                  <div className="p-6 sm:p-7 flex flex-col flex-grow">
                    {/* Title Linked Directly to GitHub with Hover Arrow (No Underline) */}
                    <div className="mb-3">
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/title font-[Outfit] text-xl sm:text-2xl font-bold tracking-tight inline-flex items-center gap-2 no-underline transition-colors"
                        style={{ color: "var(--text-primary)" }}
                      >
                        <span className="group-hover/title:text-[var(--accent)] transition-colors">
                          {project.name}
                        </span>
                        <svg
                          className="w-4 h-4 shrink-0 transition-transform group-hover/title:translate-x-0.5 group-hover/title:-translate-y-0.5"
                          style={{ color: "var(--accent)" }}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2.5}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      </a>
                    </div>

                    {/* Description */}
                    <p
                      className="font-[Plus_Jakarta_Sans] text-sm leading-relaxed mb-6 flex-grow"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {project.description}
                    </p>

                    {/* Footer Dock: Tech Stack on Left, Category Tag on Right */}
                    <div
                      className="pt-4 border-t flex items-center justify-between gap-2.5 mt-auto"
                      style={{ borderColor: "var(--border-color)" }}
                    >
                      {/* Left: Tech Stack Icons */}
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {project.tags && project.tags.length > 0 ? (
                          project.tags.map((tag) => (
                            <div
                              key={tag}
                              className="tech-icon-box"
                              data-tooltip={tag}
                              style={{ color: "var(--text-primary)" }}
                            >
                              {PROJECT_TECH_LOGOS[tag] ? (
                                <img
                                  src={PROJECT_TECH_LOGOS[tag]}
                                  alt={tag}
                                  className="w-4 h-4 icon-white object-contain"
                                />
                              ) : (
                                <span className="text-[10px] font-mono font-bold">
                                  {tag.slice(0, 2)}
                                </span>
                              )}
                            </div>
                          ))
                        ) : (
                          <div />
                        )}
                      </div>

                      {/* Right: Category Badge */}
                      <div className="shrink-0">
                        {renderCategoryBadge(project.category)}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
