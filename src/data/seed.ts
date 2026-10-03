// Single source of truth for initial content. Used by:
// 1) scripts/seed.ts (first-time DB seeding)
// 2) Public pages as fallback when the DB is empty or DATABASE_URL is missing.

export interface SeedWorkProduct {
  name: string;
  url?: string;
  description?: string;
  tags: string[];
}

export interface SeedWork {
  org: string;
  url?: string;
  period: string;
  status: "active" | "completed";
  role: string;
  location: string;
  bullets?: string[];
  tags?: string[];
  products?: SeedWorkProduct[];
}

export interface SeedTechstack {
  arcana: "frontend" | "backend" | "devops";
  category: string;
  name: string;
  icon: string;
  size?: string;
}

export interface SeedExperience {
  arcana: "frontend" | "backend" | "devops";
  org: string;
  period: string;
  role: string;
  description: string;
  tags: string[];
}

export interface SeedProject {
  name: string;
  category: "API" | "Boilerplate" | "Utility" | "Frontend";
  status: "Stable" | "In Progress" | "Archived";
  description: string;
  tags: string[];
  link: string;
}

export const SEED_WORKS: SeedWork[] = [
  {
    org: "ADVISE",
    period: "July 2026 – November 2026",
    status: "completed",
    role: "Fullstack Developer",
    location: "Surabaya, Indonesia",
    bullets: [
      "Built the web interface of a DAST (Dynamic Application Security Testing for vulnerability scanning) platform using Laravel (Onion Architecture), InertiaJS, and React, so security operators can review and act on findings.",
      "Aligned API contracts with the crawler team; modeled workflows after Invicti and Burp Suite.",
    ],
    tags: ["PHP", "Laravel", "Inertia", "React"],
  },
  {
    org: "Direktorat Pengembangan dan Sistem Informasi ITS",
    url: "https://www.its.ac.id/dptsi/",
    period: "June 2026 – November 2026",
    status: "completed",
    role: "Fullstack Developer",
    location: "Surabaya, Indonesia",
    bullets: [
      "Led the refactor of the Tracer Study platform from a Laravel 10 monolith to a modular monolith (DDD + CQRS, Laravel 12): 7 modules plus dynamic survey branching.",
      "Built the Bursa Karir ITS virtual job fair: a 3D expo hall (Three.js, optimized GLB loader) and an admin CMS (Tailwind CSS) for event and booth management.",
      "Migrated media to Cloudflare R2 with an encrypted proxy and WebP conversion; set up per-branch CI/CD deployment and docker containerization.",
    ],
    tags: ["PHP", "Laravel", "PostgreSQL", "MySQL", "Three.js", "Docker", "NGINX"],
  },
  {
    org: "Dikmenum Dinas Pendidikan Jawa Timur",
    url: "https://spmbjatim.net/",
    period: "January 2026 – June 2026",
    status: "completed",
    role: "Junior Backend Developer",
    location: "Surabaya, Indonesia",
    bullets: [
      "Supported SPMB Jawa Timur, a provincial student registration system with 500,000+ users, on the Internal Admin and School Portal modules, handling data engineering tasks and ad-hoc data extraction via complex MariaDB queries based on stakeholder requests.",
      "Root-caused bugs in legacy PHP/Laravel codebase, adapted registration and verification flows to annual policy changes, and selective refactoring to Golang where needed.",
    ],
    tags: ["PHP", "Laravel", "Go", "MariaDB"],
  },
  {
    org: "Jago Teknik",
    url: "https://jagoteknik.id/",
    period: "February 2026 – March 2026",
    status: "completed",
    role: "Backend Developer",
    location: "Surabaya, Indonesia · Remote",
    bullets: [
      "Co-designed the database schema and RBAC for a learning platform, cutting estimated development time by 50%.",
      "Built Golang (Gin, Gorm) APIs with PostgreSQL for authentication, dashboards, data export, and tutor performance monitoring, with API docs and ERD.",
    ],
    tags: ["Go", "Gin", "PostgreSQL"],
  },
];

export const SEED_TECHSTACKS: SeedTechstack[] = [
  // backend
  { arcana: "backend", category: "Programming Language", name: "Go", icon: "/img/go.svg", size: "w-8 h-8" },
  { arcana: "backend", category: "Programming Language", name: "PHP", icon: "/img/php.svg", size: "w-7 h-7" },
  { arcana: "backend", category: "Programming Language", name: "TypeScript", icon: "/img/typescript.svg", size: "w-7 h-7" },
  { arcana: "backend", category: "Programming Language", name: "Python", icon: "/img/python.svg", size: "w-7 h-7" },
  { arcana: "backend", category: "Framework & Library", name: "Gin", icon: "/img/gin.svg", size: "w-7 h-7" },
  { arcana: "backend", category: "Framework & Library", name: "Fiber", icon: "/img/fiber.svg", size: "w-8 h-8" },
  { arcana: "backend", category: "Framework & Library", name: "Laravel", icon: "/img/laravel.svg", size: "w-7 h-7" },
  { arcana: "backend", category: "Framework & Library", name: "NestJS", icon: "/img/nestjs.svg", size: "w-7 h-7" },
  { arcana: "backend", category: "Framework & Library", name: "ExpressJS", icon: "/img/express.svg", size: "w-7 h-7" },
  { arcana: "backend", category: "Database", name: "PostgreSQL", icon: "/img/postgresql.svg", size: "w-7 h-7" },
  { arcana: "backend", category: "Database", name: "MySQL", icon: "/img/mysql.svg", size: "w-7 h-7" },
  { arcana: "backend", category: "Database", name: "MariaDB", icon: "/img/mariadb.svg", size: "w-7 h-7" },
  { arcana: "backend", category: "Database", name: "Redis", icon: "/img/redis.svg", size: "w-7 h-7" },
  { arcana: "backend", category: "Tools", name: "Git", icon: "/img/git.svg", size: "w-7 h-7" },
  { arcana: "backend", category: "Tools", name: "GitHub", icon: "/img/github.svg", size: "w-7 h-7" },
  { arcana: "backend", category: "Tools", name: "Bruno", icon: "/img/bruno.svg", size: "w-7 h-7" },
  { arcana: "backend", category: "Tools", name: "Postman", icon: "/img/postman.svg", size: "w-7 h-7" },
  { arcana: "backend", category: "Tools", name: "Hoppscotch", icon: "/img/hoppscotch.svg", size: "w-7 h-7" },
  // frontend
  { arcana: "frontend", category: "Programming Language", name: "TypeScript", icon: "/img/typescript.svg", size: "w-7 h-7" },
  { arcana: "frontend", category: "Framework & Library", name: "Laravel", icon: "/img/laravel.svg", size: "w-7 h-7" },
  { arcana: "frontend", category: "Framework & Library", name: "Next.js", icon: "/img/nextdotjs.svg", size: "w-7 h-7" },
  { arcana: "frontend", category: "Framework & Library", name: "React", icon: "/img/react.svg", size: "w-7 h-7" },
  { arcana: "frontend", category: "Framework & Library", name: "Tailwind", icon: "/img/tailwindcss.svg", size: "w-7 h-7" },
  { arcana: "frontend", category: "Tools", name: "Git", icon: "/img/git.svg", size: "w-7 h-7" },
  { arcana: "frontend", category: "Tools", name: "GitHub", icon: "/img/github.svg", size: "w-7 h-7" },
  // devops
  { arcana: "devops", category: "DevOps & Infrastructure", name: "Docker", icon: "/img/docker.svg", size: "w-7 h-7" },
  { arcana: "devops", category: "DevOps & Infrastructure", name: "NGINX", icon: "/img/nginx.svg", size: "w-7 h-7" },
  { arcana: "devops", category: "DevOps & Infrastructure", name: "Git", icon: "/img/git.svg", size: "w-7 h-7" },
  { arcana: "devops", category: "DevOps & Infrastructure", name: "GitHub", icon: "/img/github.svg", size: "w-7 h-7" },
  { arcana: "devops", category: "DevOps & Infrastructure", name: "Grafana", icon: "/img/grafana.svg", size: "w-7 h-7" },
  { arcana: "devops", category: "DevOps & Infrastructure", name: "Cloudflare", icon: "/img/cloudflare.svg", size: "w-7 h-7" },
  { arcana: "devops", category: "DevOps & Infrastructure", name: "Linux", icon: "/img/linux.svg", size: "w-7 h-7" },
];

export const SEED_EXPERIENCES: SeedExperience[] = [
  // frontend arcana
  { arcana: "frontend", org: "Schematics 2026", period: "Maret 2026 — Now", role: "Technical Project Manager", description: "Schematics is an annual event organized by students of the Informatics Engineering Department at Institut Teknologi Sepuluh Nopember.", tags: ["TypeScript", "Next.js", "React", "Tailwind"] },
  // backend arcana
  { arcana: "backend", org: "Schematics 2026", period: "Maret 2026 — Now", role: "Technical Project Manager", description: "Schematics is an annual event organized by students of the Informatics Engineering Department at Institut Teknologi Sepuluh Nopember.", tags: ["Go", "Gin", "PostgreSQL", "Bruno"] },
  { arcana: "backend", org: "TEDxITS 2026", period: "Jan 2026 - May 2026", role: "Manager Backend", description: "TEDxITS is an annual event that provides a platform for the community, especially those within the Institut Teknologi Sepuluh Nopember environment, to share their compelling ideas.", tags: ["Go", "Fiber", "PostgreSQL", "Bruno"] },
  { arcana: "backend", org: "Futurest 2026", period: "Feb 2026 - Apr 2026", role: "Senior Backend Developer", description: "Futurest (Future Energy Summit) is the annual flagship event of the Society of Renewable Energy (SRE) ITS.", tags: ["Go", "Gin", "PostgreSQL", "Bruno"] },
  { arcana: "backend", org: "Ini Lho ITS! 2026", period: "Feb 2026 - Apr 2026", role: "Manager Backend", description: "Ini Lho ITS! is an annual event that introduces Institut Teknologi Sepuluh Nopember to the wider public especially high school and vocational school students.", tags: ["Go", "Gin", "PostgreSQL", "Hoppscotch"] },
  { arcana: "backend", org: "180DC ITS", period: "Oct 2025 — Dec 2025", role: "Junior Backend Developer", description: "180dc ITS is a global consultancy organization that offer high-quality consulting services to nonprofits, social enterprises, and socially conscious organizations.", tags: ["Go", "Gin", "PostgreSQL", "Hoppscotch"] },
  { arcana: "backend", org: "Schematics 2025", period: "Sep 2025 — Oct 2025", role: "Vice Director 2 — WebDev", description: "Schematics is an annual event organized by students of the Informatics Engineering Department at Institut Teknologi Sepuluh Nopember.", tags: ["Go", "Gin", "PostgreSQL", "Postman"] },
  { arcana: "backend", org: "TEDxITS 2025", period: "Aug 2025 — Sep 2025", role: "Junior Backend Developer", description: "TEDxITS is an annual event that provides a platform for the community, especially those within the Institut Teknologi Sepuluh Nopember environment, to share their compelling ideas.", tags: ["Go", "Gin", "PostgreSQL", "Postman"] },
  { arcana: "backend", org: "Ini Lho ITS! 2025", period: "Jun 2025 — Aug 2025", role: "Junior Backend Developer", description: "Ini Lho ITS! is an annual event that introduces Institut Teknologi Sepuluh Nopember to the wider public especially high school and vocational school students.", tags: ["Go", "Gin", "PostgreSQL", "Hoppscotch"] },
  // devops arcana
  { arcana: "devops", org: "Schematics 2026", period: "Maret 2026 — Now", role: "Technical Project Manager", description: "Schematics is an annual event organized by students of the Informatics Engineering Department at Institut Teknologi Sepuluh Nopember.", tags: ["Linux", "NGINX", "Docker", "Grafana", "Cloudflare"] },
  { arcana: "devops", org: "Schematics 2025", period: "Sep 2025 — Oct 2025", role: "Vice Director 2 — WebDev", description: "Schematics is an annual event organized by students of the Informatics Engineering Department at Institut Teknologi Sepuluh Nopember.", tags: ["Linux", "NGINX", "Docker", "Grafana", "Cloudflare"] },
];

export const SEED_PROJECTS: SeedProject[] = [
  {
    name: "Golang-Gin-Gorm Boilerplate",
    category: "Boilerplate",
    status: "Stable",
    description:
      "A complete template for building robust, scalable, and production-ready REST API backends using Go. This boilerplate implements Clean Architecture with modern best practices in Go backend development.",
    tags: ["Go", "Gin", "Gorm", "PostgreSQL"],
    link: "https://github.com/Shabrinashsf/go-gin-gorm-boilerplate",
  },
  {
    name: "IF Semester Mapping Schedule",
    category: "Utility",
    status: "Stable",
    description:
      "An application to read and map lecture schedules from Excel files, then organize and export data based on study programs, semesters, and other course information.",
    tags: ["Go", "Excel"],
    link: "https://github.com/Shabrinashsf/IF-Jadwal-Semester-Mapping-Schedule",
  },
  {
    name: "University Problem",
    category: "Utility",
    status: "Stable",
    description:
      "A curated collection of programming assignments and projects from my undergraduate studies.",
    tags: [],
    link: "https://github.com/Shabrinashsf/Uni-Prob",
  },
  {
    name: "RPLibrary Backend API",
    category: "API",
    status: "Stable",
    description:
      "RPLibrary Backend API for the RPL Lab library management system, which supports authentication and authorization, book catalog management, book borrowing, returns, and waitlists.",
    tags: ["Go", "Gin", "Gorm", "PostgreSQL"],
    link: "https://github.com/Shabrinashsf/rpl-LIB",
  },
  {
    name: "ADRIFT Backend API",
    category: "API",
    status: "Stable",
    description:
      "Academic Dependency Route & Integrated FRS Tracker (ADRIFT) is a web-based application designed to help students at Institut Teknologi Sepuluh Nopember (ITS) plan their academic journey. It provides a visual representation of course dependencies, allowing students to easily track their progress and plan future semesters effectively.",
    tags: ["Go", "Gin", "Gorm", "PostgreSQL"],
    link: "https://github.com/Shabrinashsf/ADRIFT-backend",
  },
  {
    name: "ADRIFT Frontend",
    category: "Frontend",
    status: "Stable",
    description:
      "Academic Dependency Route & Integrated FRS Tracker (ADRIFT) is a web-based application designed to help students at Institut Teknologi Sepuluh Nopember (ITS) plan their academic journey. It provides a visual representation of course dependencies, allowing students to easily track their progress and plan future semesters effectively.",
    tags: ["NextJS", "TypeScript", "Tailwind CSS"],
    link: "https://github.com/Shabrinashsf/ADRIFT-frontend",
  },
  {
    name: "Boogle Solver",
    category: "Frontend",
    status: "Stable",
    description:
      "This app is a solver for the game Boggle, built using Next.js, TypeScript, and Tailwind CSS. The project provides a web interface for generating letter grids, finding all valid words, or checking a target word on the grid.",
    tags: ["NextJS", "Go", "TypeScript", "Tailwind CSS"],
    link: "https://github.com/Shabrinashsf/Boogle-Solver",
  },
  {
    name: "NestJS-TypeORM Boilerplate",
    category: "Boilerplate",
    status: "Stable",
    description:
      "A production-ready NestJS boilerplate with Clean Architecture principles, featuring automatic authentication CRUD system.",
    tags: ["NestJS", "TypeORM", "PostgreSQL"],
    link: "https://github.com/Shabrinashsf/nestjs-api-boilerplate",
  },
];
