"use client";

import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/animations";
import GridBackground from "@/components/GridBackground";
import { TECH_LOGOS as WORK_TECH_LOGOS } from "@/data/tech-logos";
import { SEED_WORKS } from "@/data/seed";

export interface ProductItem {
  name: string;
  url?: string | null;
  description?: string | null;
  tags: string[];
}

export interface ExperienceItem {
  id: number;
  type?: "work";
  org: string;
  url?: string | null;
  period: string;
  status: "active" | "completed";
  role: string;
  location: string;
  description?: string;
  bullets?: string[];
  tags?: string[];
  products?: ProductItem[];
}

export default function ExperienceTimeline({ works }: { works?: ExperienceItem[] }) {
  const experiences: ExperienceItem[] =
    works && works.length > 0
      ? works
      : SEED_WORKS.map((w, i) => ({ ...w, id: -(i + 1), type: "work" as const }));
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
              <div className="tactile-card rounded-2xl p-6 sm:p-8">
                {/* Top Row: Role Title & Active Status */}
                <div className="flex items-center justify-between gap-3 mb-1.5">
                  <h2
                    className="font-outfit text-2xl sm:text-3xl font-extrabold tracking-tight"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {item.role}
                  </h2>
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

                {/* Line 4: Bullets list OR Description */}
                {item.bullets && item.bullets.length > 0 ? (
                  <ul className="space-y-2.5 mb-5 font-[Plus_Jakarta_Sans] text-sm sm:text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                    {item.bullets.map((bullet, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <span
                          className="inline-block w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                          style={{ backgroundColor: "var(--accent)" }}
                        />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                ) : item.description && item.description.trim() !== "" ? (
                  <p
                    className="font-[Plus_Jakarta_Sans] text-sm sm:text-base leading-relaxed mb-4"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {item.description}
                  </p>
                ) : null}

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
