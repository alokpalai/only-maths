# Only Maths

A maths learning platform built around one loop: **Learn → Understand → Practice → Test →
Analyse → Improve**. First target market is DTU B.Tech Mathematics.

See [`PROJECT_SPEC.md`](./PROJECT_SPEC.md) for scope and the phased build plan,
[`ARCHITECTURE.md`](./ARCHITECTURE.md) for the technical design,
[`DATABASE.md`](./DATABASE.md) for the data model, and [`CLAUDE.md`](./CLAUDE.md) for the
development rules this project is built under.

## Stack

Next.js (App Router) · TypeScript (strict) · MongoDB + Mongoose · Tailwind CSS + shadcn/ui ·
lucide-react · KaTeX · Auth.js · Recharts.

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in MONGODB_URI
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Script                 | Purpose                           |
| ---------------------- | --------------------------------- |
| `npm run dev`          | Start the dev server (Turbopack)  |
| `npm run build`        | Production build                  |
| `npm run start`        | Run the production build          |
| `npm run lint`         | ESLint                            |
| `npm run typecheck`    | `tsc --noEmit`                    |
| `npm run format`       | Format the codebase with Prettier |
| `npm run format:check` | Check formatting without writing  |

## Project status

Building phase by phase per `PROJECT_SPEC.md`. Current phase: see `CHANGELOG.md`.
