"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollReveal } from "@/components/animations";
import GridBackground from "@/components/GridBackground";

type Project = {
  id: number;
  name: string;
  category: "API" | "Boilerplate" | "Utility" | "Frontend";
  status: "Stable" | "In Progress" | "Archived";
  description: string;
  tags: string[];
  link: string;
};

const projects: Project[] = [
  {
    id: 1,
    name: "Golang-Gin-Gorm Boilerplate",
    category: "Boilerplate",
    status: "Stable",
    description:
      "A complete template for building robust, scalable, and production-ready REST API backends using Go. This boilerplate implements Clean Architecture with modern best practices in Go backend development.",
    tags: ["Go", "Gin", "Gorm", "PostgreSQL"],
    link: "https://github.com/Shabrinashsf/go-gin-gorm-boilerplate",
  },
  {
    id: 2,
    name: "IF Semester Mapping Schedule",
    category: "Utility",
    status: "Stable",
    description:
      "An application to read and map lecture schedules from Excel files, then organize and export data based on study programs, semesters, and other course information.",
    tags: ["Go", "Excel"],
    link: "https://github.com/Shabrinashsf/IF-Jadwal-Semester-Mapping-Schedule",
  },
  {
    id: 3,
    name: "University Problem",
    category: "Utility",
    status: "Stable",
    description:
      "A curated collection of programming assignments and projects from my undergraduate studies.",
    tags: [],
    link: "https://github.com/Shabrinashsf/Uni-Prob",
  },
  {
    id: 4,
    name: "RPLibrary Backend API",
    category: "API",
    status: "Stable",
    description:
      "RPLibrary Backend API for the RPL Lab library management system, which supports authentication and authorization, book catalog management, book borrowing, returns, and waitlists.",
    tags: ["Go", "Gin", "Gorm", "PostgreSQL"],
    link: "https://github.com/Shabrinashsf/rpl-LIB",
  },
  {
    id: 5,
    name: "ADRIFT Backend API",
    category: "API",
    status: "Stable",
    description:
      "Academic Dependency Route & Integrated FRS Tracker (ADRIFT) is a web-based application designed to help students at Institut Teknologi Sepuluh Nopember (ITS) plan their academic journey. It provides a visual representation of course dependencies, allowing students to easily track their progress and plan future semesters effectively.",
    tags: ["Go", "Gin", "Gorm", "PostgreSQL"],
    link: "https://github.com/Shabrinashsf/ADRIFT-backend",
  },
  {
    id: 6,
    name: "ADRIFT Frontend",
    category: "Frontend",
    status: "Stable",
    description:
      "Academic Dependency Route & Integrated FRS Tracker (ADRIFT) is a web-based application designed to help students at Institut Teknologi Sepuluh Nopember (ITS) plan their academic journey. It provides a visual representation of course dependencies, allowing students to easily track their progress and plan future semesters effectively.",
    tags: ["NextJS", "TypeScript", "Tailwind CSS"],
    link: "https://github.com/Shabrinashsf/ADRIFT-frontend",
  },
  {
    id: 7,
    name: "Boogle Solver",
    category: "Frontend",
    status: "Stable",
    description:
      "This app is a solver for the game Boggle, built using Next.js, TypeScript, and Tailwind CSS. The project provides a web interface for generating letter grids, finding all valid words, or checking a target word on the grid.",
    tags: ["NextJS", "Go", "TypeScript", "Tailwind CSS"],
    link: "https://github.com/Shabrinashsf/PORTOFOLIO-RESTAPI",
  },
  {
    id: 8,
    name: "NestJS-TypeORM Boilerplate",
    category: "Boilerplate",
    status: "Stable",
    description:
      "A production-ready NestJS boilerplate with Clean Architecture principles, featuring automatic authentication CRUD system.",
    tags: ["NestJS", "TypeORM", "PostgreSQL"],
    link: "https://github.com/Shabrinashsf/nestjs-api-boilerplate",
  },
];

const filters = ["All", "API", "Boilerplate", "Utility", "Frontend"] as const;

type FilterType = (typeof filters)[number];

function getStatusDot(status: string) {
  if (status === "Stable") return "var(--accent)";
  if (status === "In Progress") return "var(--accent-light)";
  return "var(--text-muted)";
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

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("All");

  const filtered =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <section
      className="min-h-[calc(100vh-64px)] relative overflow-hidden"
      style={{ backgroundColor: "var(--bg-page)", color: "var(--text-primary)" }}
    >
      <GridBackground />
      <div className="relative z-10 px-8 md:px-16 max-w-[1280px] mx-auto py-12 md:py-16">
        {/* Header */}
        <ScrollReveal className="mb-12 md:mb-16">
          <h1 className="font-[Outfit] text-4xl md:text-5xl lg:text-6xl font-extrabold mb-8 leading-tight"
            style={{ color: "var(--text-primary)" }}
          >
            Projects.
          </h1>

          {/* Filters */}
          <motion.div
            className="flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className="px-5 py-2 rounded-full border font-[JetBrains_Mono] text-sm tracking-wider uppercase transition-colors duration-200"
                style={{
                  borderColor: activeFilter === f ? "var(--accent)" : "var(--border-color)",
                  color: activeFilter === f ? "var(--accent)" : "var(--text-muted)",
                  backgroundColor: activeFilter === f ? "rgba(46, 91, 255, 0.1)" : "transparent",
                }}
              >
                {f}
              </button>
            ))}
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
                className="border rounded-lg p-6 md:p-8 flex flex-col h-full group"
                style={{
                  backgroundColor: "var(--bg-page)",
                  borderColor: "var(--border-color)",
                }}
                whileHover={{ y: -4, borderColor: "var(--accent)" }}
              >
                {/* Top Row: Category + Status */}
                <div className="flex justify-between items-start mb-5">
                  <span className="font-[JetBrains_Mono] text-xs tracking-wider uppercase px-3 py-1.5 rounded"
                    style={{
                      color: "var(--accent)",
                      backgroundColor: "rgba(46, 91, 255, 0.1)",
                    }}
                  >
                    {project.category}
                  </span>
                  <span className="font-[JetBrains_Mono] text-xs tracking-wider uppercase flex items-center gap-2"
                    style={{ color: "var(--text-muted)" }}
                  >
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: getStatusDot(project.status) }}
                    />
                    {project.status}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-[Outfit] text-xl md:text-2xl font-semibold mb-3 transition-colors"
                  style={{ color: "var(--text-primary)" }}
                >
                  {project.name}
                </h3>

                {/* Description */}
                <p className="font-[Plus_Jakarta_Sans] text-base leading-relaxed mb-6 flex-grow"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {project.description}
                </p>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag, tagIndex) => (
                    <motion.span
                      key={tag}
                      className="font-[JetBrains_Mono] text-[13px] px-3 py-1.5 border rounded"
                      style={{
                        color: "var(--accent)",
                        backgroundColor: "rgba(46, 91, 255, 0.05)",
                        borderColor: "rgba(46, 91, 255, 0.3)",
                      }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: tagIndex * 0.05 }}
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>

                {/* Footer */}
                <div className="mt-auto pt-5 border-t flex justify-end"
                  style={{ borderColor: "var(--border-color)" }}
                >
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 font-[JetBrains_Mono] text-sm tracking-wider uppercase transition-colors"
                    style={{ color: "var(--accent)" }}
                  >
                    View Source
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
