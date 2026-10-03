# Portfolio Website

This is a personal portfolio website built with Next.js to showcase my projects and skills.

## How to run locally

1. Install dependencies using [bun](https://bun.sh/):

   ```bash
   bun install
   ```

2. Start the development server:

   ```bash
   bun dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser to see the website.

## Available Commands

In the project directory, you can run the following commands:

- `bun dev` : Starts the development server. **This includes hot-reloading**, so any changes you make to the code will instantly reflect in the browser without needing a manual refresh.
- `bun build` : Builds the app for production. It optimizes and compiles the code for the best performance.
- `bun start` : Starts the production server locally (you need to run `bun build` first). Useful for testing the production build before deployment.
- `bun lint` : Runs ESLint to analyze the code and find potential errors or formatting issues.

## CMS (Content Manager)

Site content (work experience, tech stack, arcana experiences, projects) is stored in Postgres and editable at **/furgotham** — no code changes needed for content updates. Without a database configured, the site falls back to the seed data in `src/data/seed.ts`.

### Local setup

1. Create a free database at [neon.tech](https://neon.tech) (or any Postgres) and copy the connection string.
2. Put it in `.env.local`:
   ```
   DATABASE_URL=postgresql://...?sslmode=require
   ```
3. Create the tables and seed the initial content (idempotent — safe to re-run):
   ```bash
   bun run db:push
   bun run db:seed
   ```
4. Run `bun dev` and open http://localhost:3000/furgotham.

### Deploy to Vercel

1. Import the repo to Vercel (framework auto-detected).
2. In the project → Storage → create/select a Neon Postgres database; `DATABASE_URL` is injected automatically for builds and runtime.
3. Run `DATABASE_URL="<prod-url>" bun run db:push && DATABASE_URL="<prod-url>" bun run db:seed` once locally.
4. Done — edit content at `<your-domain>/furgotham`; public pages revalidate within ~30s (mutations also trigger instant revalidation).

### Adding a new tech icon

Icon files live in `public/img/`. Drop a new `.svg`/`.png` there, commit and push — after the next deploy it appears in the /furgotham icon dropdown (paths are scanned at build time). The DB stores only the icon path/URL.

### API

CRUD endpoints backing the CMS, protected by the `/furgotham-login` session cookie (credentials in env: `ADMIN_USERNAME`, `ADMIN_PASSWORD`, `AUTH_SECRET`):

- `GET/POST /api/content/<collection>` — collection: `works | techstacks | experiences | projects`
- `PUT/DELETE /api/content/<collection>/<id>`
- For `works`, the payload may include nested `products` (multiple projects handled in one position, e.g. BKI + Tracer Study), stored in `work_products`.
