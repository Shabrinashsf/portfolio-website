"use client";

import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/animations";
import GridBackground from "@/components/GridBackground";

export interface ProductItem {
  name: string;
  url?: string;
  description?: string;
  tags: string[];
}

export interface ExperienceItem {
  id: number;
  type: "work";
  org: string;
  url?: string;
  period: string;
  status: "active" | "completed";
  role: string;
  location: string;
  description: string;
  tags?: string[];
  products?: ProductItem[];
}

const WORK_TECH_LOGOS: Record<string, string> = {
  PHP: "/img/php.svg",
  Laravel: "/img/laravel.svg",
  PostgreSQL: "/img/postgresql.svg",
  MySQL: "/img/mysql.svg",
  MariaDB: "/img/mariadb.svg",
  Go: "/img/go.svg",
  Golang: "/img/go.svg",
  Gin: "/img/gin.svg",
  Docker: "/img/docker.svg",
  NGINX: "/img/nginx.svg",
  Inertia: "/img/inertia.svg",
  "Three.js": "/img/threejs.svg",
  ThreeJS: "/img/threejs.svg",
  React: "/img/react.svg",
};

const experiences: ExperienceItem[] = [
  {
    id: 1,
    type: "work",
    org: "Direktorat Pengembangan dan Sistem Informasi ITS",
    url: "https://www.its.ac.id/dptsi/",
    period: "June 2026 - Present",
    status: "active",
    role: "Fullstack Developer",
    location: "Surabaya, Indonesia",
    // TODO: Add DPSI ITS organizational description
    description: "",
    products: [
      {
        name: "Tracer",
        url: "https://careers.its.ac.id/tracer/login",
        // TODO: Add Tracer product description
        description: "",
        tags: ["PHP", "Laravel", "PostgreSQL", "Docker", "NGINX"],
      },
      {
        name: "Bursa Karir ITS (BKI)",
        url: "https://bki.its.ac.id/",
        // TODO: Add BKI (Bursa Karir ITS) product description
        description: "",
        tags: ["PHP", "Laravel", "MySQL", "Three.js", "Docker", "NGINX"],
      },
    ],
  },
  {
    id: 2,
    type: "work",
    org: "ADVISE",
    period: "July 2026 - November 2026",
    status: "completed",
    role: "Fullstack Developer",
    location: "Surabaya, Indonesia",
    description:
      "A Dynamic Application Security Testing (DAST) platform capable of automatically detecting security vulnerabilities in web-based applications with seamless CI/CD integration. Features an Agentic AI assistant to guide and streamline target site configurations for operators.",
    tags: ["PHP", "Laravel", "Inertia", "React"],
  },
  {
    id: 3,
    type: "work",
    org: "Dikmenum Dinas Pendidikan Jawa Timur",
    url: "https://spmbjatim.net/",
    period: "January 2026 - June 2026",
    status: "completed",
    role: "Backend Developer",
    location: "Surabaya, Indonesia",
    // TODO: Add Dikmenum (SPMB Jawa Timur 2026) description
    description: "",
    tags: ["PHP", "Laravel", "Go", "MariaDB"],
  },
  {
    id: 4,
    type: "work",
    org: "Jago Teknik",
    url: "https://jagoteknik.id/",
    period: "Feb 2026 — Maret 2026",
    status: "completed",
    role: "Backend Developer",
    location: "Surabaya, Indonesia · Remote",
    description:
      "Designed a web-based learning platform architecture with user authentication, personalized dashboards, class management, quizzes, and progress tracking. Implemented role-based access control for admins, tutors, and members.",
    tags: ["Go", "Gin", "PostgreSQL"],
  },
];

export default function ExperienceTimeline() {
  return (
    <section
      id="work"
      className="relative overflow-hidden scroll-mt-16"
      style={{ backgroundColor: "var(--bg-page)", color: "var(--text-primary)" }}
    >
      <GridBackground />
      <div className="relative z-10 px-4 sm:px-6 md:px-12 lg:px-16 max-w-6xl xl:max-w-7xl mx-auto py-12 md:py-16 pb-16 md:pb-24">
        {/* Page Title Header (Exact Match to Project Section) */}
        <ScrollReveal className="mb-12 md:mb-16">
          <h1
            className="font-[Outfit] text-4xl md:text-5xl lg:text-6xl font-extrabold mb-8 leading-tight pt-6 md:pt-10"
            style={{ color: "var(--accent)" }}
          >
            Working Experience<span style={{ color: "var(--text-primary)" }}>.</span>
          </h1>
        </ScrollReveal>

        {/* Cards Stack */}
        <div className="space-y-6 sm:space-y-8">
          {experiences.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="preview-card p-6 sm:p-8">
                {/* Top Row: Role Title & Active Status */}
                <div className="flex items-center justify-between gap-3 mb-1.5">
                  <h2
                    className="font-outfit text-2xl sm:text-3xl font-extrabold tracking-tight"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {item.role}
                  </h2>
                  {item.status === "active" && (
                    <span
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold border shrink-0"
                      style={{
                        background: "rgba(30, 86, 205, 0.1)",
                        color: "var(--accent)",
                        borderColor: "rgba(30, 86, 205, 0.3)",
                      }}
                    >
                      <span
                        className="w-2 h-2 rounded-full pulse-dot"
                        style={{ backgroundColor: "var(--accent)" }}
                      />
                      Present
                    </span>
                  )}
                </div>

                {/* Line 2: Company Name [↗] · Period */}
                <div
                  className="flex flex-wrap items-center gap-2 text-sm sm:text-base font-semibold mb-1"
                  style={{ color: "var(--accent)" }}
                >
                  {item.url ? (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 hover:underline cursor-pointer transition-colors"
                      style={{ color: "var(--accent)" }}
                    >
                      <span>{item.org}</span>
                      <svg
                        className="w-3.5 h-3.5 shrink-0"
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
                  ) : (
                    <span>{item.org}</span>
                  )}
                  <span style={{ color: "var(--text-muted)" }}>·</span>
                  <span
                    className="font-mono text-xs sm:text-sm font-medium"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {item.period}
                  </span>
                </div>

                {/* Line 3: Location */}
                <p
                  className="text-xs sm:text-sm font-[Plus_Jakarta_Sans] mb-3"
                  style={{ color: "var(--text-muted)" }}
                >
                  {item.location}
                </p>

                {/* Line 4: Description (rendered only if present) */}
                {item.description && item.description.trim() !== "" && (
                  <p
                    className="font-[Plus_Jakarta_Sans] text-sm sm:text-base leading-relaxed mb-4"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {item.description}
                  </p>
                )}

                {/* Line 5: Modular Products Grid (DPSI ITS) OR Standard Tech Dock */}
                {item.products && item.products.length > 0 ? (
                  <div
                    className="mt-5 pt-5 border-t"
                    style={{ borderColor: "var(--border-color)" }}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {item.products.map((prod) => (
                        <div
                          key={prod.name}
                          className="subcard-box p-4 sm:p-5 flex flex-col justify-between"
                        >
                          <div>
                            <div className="flex items-center justify-between gap-2 mb-2">
                              {prod.url ? (
                                <a
                                  href={prod.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="font-outfit font-bold text-base sm:text-lg inline-flex items-center gap-1.5 hover:underline"
                                  style={{ color: "var(--accent)" }}
                                >
                                  <span>{prod.name}</span>
                                  <svg
                                    className="w-3.5 h-3.5 shrink-0"
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
                              ) : (
                                <h3
                                  className="font-outfit font-bold text-base sm:text-lg"
                                  style={{ color: "var(--accent)" }}
                                >
                                  {prod.name}
                                </h3>
                              )}
                            </div>
                            {prod.description && prod.description.trim() !== "" && (
                              <p
                                className="font-[Plus_Jakarta_Sans] text-xs sm:text-sm leading-relaxed mb-3"
                                style={{ color: "var(--text-secondary)" }}
                              >
                                {prod.description}
                              </p>
                            )}
                          </div>

                          <div
                            className="pt-3 border-t flex flex-wrap items-center gap-2 mt-auto"
                            style={{ borderColor: "var(--border-color)" }}
                          >
                            <span
                              className="text-[11px] font-mono uppercase tracking-wider font-semibold mr-1"
                              style={{ color: "var(--text-muted)" }}
                            >
                              TECH:
                            </span>
                            <div className="flex flex-wrap items-center gap-1.5">
                              {prod.tags.map((t) => (
                                <div
                                  key={t}
                                  className="tech-icon-box"
                                  data-tooltip={t}
                                  style={{ color: "var(--text-primary)" }}
                                >
                                  {WORK_TECH_LOGOS[t] ? (
                                    <img
                                      src={WORK_TECH_LOGOS[t]}
                                      alt={t}
                                      className="w-4 h-4 icon-white object-contain"
                                    />
                                  ) : (
                                    <span className="text-[10px] font-mono">
                                      {t.slice(0, 2)}
                                    </span>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  item.tags &&
                  item.tags.length > 0 && (
                    <div
                      className="flex items-center gap-2 pt-3 border-t"
                      style={{ borderColor: "var(--border-color)" }}
                    >
                      <span
                        className="text-xs font-mono uppercase tracking-wider font-semibold mr-1"
                        style={{ color: "var(--text-muted)" }}
                      >
                        TECH:
                      </span>
                      <div className="flex flex-wrap items-center gap-1.5">
                        {item.tags.map((tag) => (
                          <div
                            key={tag}
                            className="tech-icon-box"
                            data-tooltip={tag}
                            style={{ color: "var(--text-primary)" }}
                          >
                            {WORK_TECH_LOGOS[tag] ? (
                              <img
                                src={WORK_TECH_LOGOS[tag]}
                                alt={tag}
                                className="w-4 h-4 icon-white object-contain"
                              />
                            ) : (
                              <span className="text-[10px] font-mono">
                                {tag.slice(0, 2)}
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
