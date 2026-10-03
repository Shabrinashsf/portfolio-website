// Merged tech logo map (previously duplicated across ExperienceTimeline,
// ProjectsSection, and ArcanaSection). Also feeds the icon dropdown in /furgotham.

// Keep in sync with files in public/img/. New icons become available by
// dropping a file into public/img/ and adding an entry here (or letting the
// admin form fall back to showing the first 2 letters as text).
export const TECH_LOGOS: Record<string, string> = {
  PHP: "/img/php.svg",
  Laravel: "/img/laravel.svg",
  PostgreSQL: "/img/postgresql.svg",
  MySQL: "/img/mysql.svg",
  MariaDB: "/img/mariadb.svg",
  Go: "/img/go.svg",
  Golang: "/img/go.svg",
  Gin: "/img/gin.svg",
  Gorm: "/img/gorm.svg",
  Fiber: "/img/fiber.svg",
  Docker: "/img/docker.svg",
  NGINX: "/img/nginx.svg",
  Nginx: "/img/nginx.svg",
  Inertia: "/img/inertia.svg",
  "Three.js": "/img/threejs.svg",
  ThreeJS: "/img/threejs.svg",
  React: "/img/react.svg",
  NextJS: "/img/nextdotjs.svg",
  "Next.js": "/img/nextdotjs.svg",
  TypeScript: "/img/typescript.svg",
  Tailwind: "/img/tailwindcss.svg",
  "Tailwind CSS": "/img/tailwindcss.svg",
  TailwindCSS: "/img/tailwindcss.svg",
  NestJS: "/img/nestjs.svg",
  TypeORM: "/img/typeorm.svg",
  Excel: "/img/excel.svg",
  Python: "/img/python.svg",
  Redis: "/img/redis.svg",
  Git: "/img/git.svg",
  GitHub: "/img/github.svg",
  Bruno: "/img/bruno.svg",
  Postman: "/img/postman.svg",
  Hoppscotch: "/img/hoppscotch.svg",
  Hopscotch: "/img/hoppscotch.svg",
  Grafana: "/img/grafana.svg",
  Cloudflare: "/img/cloudflare.svg",
  Linux: "/img/linux.svg",
};

export function resolveIcon(tag: string): string | undefined {
  return TECH_LOGOS[tag];
}

// Canonical tag list for the /furgotham tag picker (deduped by icon path).
export const ALL_TAGS: string[] = [
  ...new Map<string, string>(
    Object.entries(TECH_LOGOS).map(([name, path]) => [path, name])
  ).values(),
];
