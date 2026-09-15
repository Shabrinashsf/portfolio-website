"use client";

import { motion } from "framer-motion";
import { StaggerContainer, StaggerItem, ScrollReveal } from "@/components/animations";
import GridBackground from "@/components/GridBackground";

const techStack = {
  "Programming Language": [
    { name: "Go", icon: "/img/go.svg", size: "w-10 h-10" },
    { name: "PHP", icon: "/img/php.svg", size: "w-8 h-8" },
    { name: "TypeScript", icon: "/img/typescript.svg", size: "w-8 h-8" },
    { name: "Python", icon: "/img/python.svg", size: "w-8 h-8" },
  ],
  "Framework & Library": [
    { name: "Gin", icon: "/img/gin.svg", size: "w-8 h-8" },
    { name: "Fiber", icon: "/img/fiber.svg", size: "w-10 h-10" },
    { name: "Laravel", icon: "/img/laravel.svg", size: "w-8 h-8" },
    { name: "NestJS", icon: "/img/nestjs.svg", size: "w-8 h-8" },
    { name: "ExpressJS", icon: "/img/express.svg", size: "w-8 h-8" },
    { name: "Next.js", icon: "/img/nextdotjs.svg", size: "w-8 h-8" },
    { name: "React", icon: "/img/react.svg", size: "w-8 h-8" },
    { name: "Tailwind", icon: "/img/tailwindcss.svg", size: "w-8 h-8" },
  ],
  "Database & Cache": [
    { name: "PostgreSQL", icon: "/img/postgresql.svg", size: "w-8 h-8" },
    { name: "MySQL", icon: "/img/mysql.svg", size: "w-8 h-8" },
    { name: "MariaDB", icon: "/img/mariadb.svg", size: "w-8 h-8" },
    { name: "Redis", icon: "/img/redis.svg", size: "w-8 h-8" },
  ],
  "DevOps & Tools": [
    { name: "NGINX", icon: "/img/nginx.svg", size: "w-8 h-8" },
    { name: "Git", icon: "/img/git.svg", size: "w-8 h-8" },
    { name: "GitHub", icon: "/img/github.svg", size: "w-8 h-8" },
    { name: "Docker", icon: "/img/docker.svg", size: "w-8 h-8" },
    { name: "Bruno", icon: "/img/bruno.svg", size: "w-8 h-8" },
    { name: "Postman", icon: "/img/postman.svg", size: "w-8 h-8" },
    { name: "Hoppscotch", icon: "/img/hoppscotch.svg", size: "w-8 h-8" },
    { name: "Grafana", icon: "/img/grafana.svg", size: "w-8 h-8" },
    { name: "Cloudflare", icon: "/img/cloudflare.svg", size: "w-8 h-8" },
  ],
  "Operating System": [
    { name: "Linux", icon: "/img/linux.svg", size: "w-8 h-8" },
  ],
};

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
          <h1 className="font-[Outfit] text-4xl md:text-5xl lg:text-6xl font-extrabold mb-3 leading-tight"
            style={{ color: "var(--text-primary)" }}
          >
            About me.
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
              passion.
            </motion.span>
          </motion.h2>
        </ScrollReveal>

        {/* Bio */}
        <ScrollReveal className="max-w-3xl mb-16">
          <p className="font-[Plus_Jakarta_Sans] text-base md:text-lg leading-relaxed mb-6"
            style={{ color: "var(--text-secondary)" }}
          >
            A Third-year Informatics Engineering student at ITS with{" "}
            <span className="font-medium" style={{ color: "var(--accent)" }}>2 years</span> of production experience building{" "}
            <span className="font-medium" style={{ color: "var(--accent)" }}>Backend Systems</span> using{" "}
            <span className="font-medium" style={{ color: "var(--accent)" }}>Golang (Gin/Fiber)</span> or{" "}
            <span className="font-medium" style={{ color: "var(--accent)" }}>PHP (Laravel)</span>, and 1 year in{" "}
            <span className="font-medium" style={{ color: "var(--accent)" }}>Frontend</span> Development using{" "}
            <span className="font-medium" style={{ color: "var(--accent)" }}>NextJS</span> or{" "}
            <span className="font-medium" style={{ color: "var(--accent)" }}>Laravel</span>.{" "}
            Lead a team of 
            <span className="font-medium" style={{ color: "var(--accent)" }}> 7+ developers</span> and delivering systems for{" "}
            <span className="font-medium" style={{ color: "var(--accent)" }}>500,000+</span> total users.{" "}
          </p>
          <p className="font-[Plus_Jakarta_Sans] text-base md:text-lg leading-relaxed mb-8"
            style={{ color: "var(--text-secondary)" }}
          >
            Besides doing softeng and tech stuff, you can find me rotten in my room playing games. My favorite genre is{" "}
            <span className="font-medium" style={{ color: "var(--accent)" }}>RPG/JRPG</span> or{" "}
            <span className="font-medium" style={{ color: "var(--accent)" }}>Story</span>, my current all time fav is.{" "}
            <span className="font-medium" style={{ color: "var(--accent)" }}>OMORI</span> (this website was created using many references from it).{" "}
            <span className="font-medium" style={{ color: "var(--accent)" }}>Coffee</span>{" "}
            is my fuel to start the day, but playing{" "}
            <span className="font-medium" style={{ color: "var(--accent)" }}>Resident Evil</span> (especially RE4 Remake) or{" "}
            <span className="font-medium" style={{ color: "var(--accent)" }}>Persona</span>, are my emotional support during the hard days.{" "}
          </p>
        </ScrollReveal>

        {/* Tech Stack */}
        <div>
          <ScrollReveal delay={0.1}>
            <h1 className="font-[Outfit] text-4xl md:text-5xl lg:text-6xl font-extrabold mb-10 leading-tight"
              style={{ color: "var(--text-primary)" }}
            >
              Tech Stack.
            </h1>
          </ScrollReveal>

          {Object.entries(techStack).map(([category, items], categoryIndex) => (
            <ScrollReveal key={category} delay={categoryIndex * 0.1}>
              <div className="mb-10">
                <h4 className="font-[Plus_Jakarta_Sans] text-base font-semibold mb-5 flex items-center gap-2"
                  style={{ color: "var(--text-primary)" }}
                >
                  <motion.span
                    className="w-1 h-5 rounded block"
                    style={{ backgroundColor: "var(--accent)" }}
                    initial={{ height: 0 }}
                    animate={{ height: 20 }}
                    transition={{ duration: 0.4, delay: 0.3 + categoryIndex * 0.1 }}
                  />
                  {category}
                </h4>
                <StaggerContainer staggerDelay={0.05} className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 sm:gap-5">
                  {items.map((item) => (
                    <StaggerItem key={item.name}>
                      <motion.div
                        className="tech-icon flex flex-col items-center"
                        whileHover={{ scale: 1.08, rotate: 4 }}
                        transition={{ type: "spring", stiffness: 180, damping: 25 }}
                      >
                        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl shadow-md flex items-center justify-center border"
                          style={{
                            backgroundColor: "var(--bg-card)",
                            borderColor: "var(--border-color)",
                          }}
                        >
                          <img
                            src={item.icon}
                            alt={item.name}
                            className={`${item.size} icon-white`}
                          />
                        </div>
                        <span className="text-xs mt-2 font-medium font-[Plus_Jakarta_Sans]"
                          style={{ color: "var(--text-muted)" }}
                        >
                          {item.name}
                        </span>
                      </motion.div>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
