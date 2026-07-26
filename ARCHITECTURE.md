# Only Maths — Architecture (Phase 0)

## 1. Stack decisions & rationale

| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js (App Router)** | One app for SSR public pages (SEO) + student app + admin + API |
| Language | **TypeScript** (strict) | The content model is big; types prevent whole classes of bugs |
| UI | **React + Tailwind + shadcn/ui + lucide-react** | Fast, consistent, owns its own components (no black-box theme) |
| Maths | **KaTeX** (via `react-katex` or a small wrapper) | Fast, mature, LaTeX in → notation out. MathML output for a11y |
| Backend | **Next.js Route Handlers + Server Actions** | No separate Node/Express server for MVP. Same repo, same deploy |
| Database | **MongoDB Atlas** | Your chosen store. Referenced model + indexes (see `DATABASE.md`) |
| ODM | **Mongoose** | MongoDB has no built-in schema; Mongoose gives validation + relationships + ergonomics for ~40 collections |
| Auth | **Auth.js (NextAuth) + MongoDB adapter** | Free, integrates with Mongo, supports credentials + Google. RBAC via a `role` claim |
| Charts | **Recharts** | Dashboards, analytics, heatmap |
| File storage | **Cloudinary or S3-compatible** | Diagrams/PYQ PDFs. Not needed until Phase 5/7 |
| Payments | **Razorpay** | India-first. Phase 12 only |
| AI | **Provider abstraction** (thin interface) | Never hard-tie to one model. Phase 13 only |

**Why not a separate Express backend?** Two servers doubles ops and auth plumbing for zero MVP
benefit. If a workload later needs isolation (long-running AI, cron-heavy jobs), extract it then.

## 2. High-level shape

```
Browser (React)
   │  public pages: SSR/SSG for SEO
   │  app pages: authenticated, mostly client + server components
   ▼
Next.js (App Router)
   ├── Server Components        → read data directly (Mongoose) for fast first paint
   ├── Route Handlers (/api)    → mutations, filtered queries, admin ops (RBAC-guarded)
   ├── Server Actions           → form submits (solve answer, save bookmark, etc.)
   └── Auth.js middleware       → session + role gate on /app and /admin
   ▼
MongoDB Atlas (Mongoose models + indexes)
   ▼
Cloudinary/S3 (media)   ·   Razorpay (Phase 12)   ·   AI provider (Phase 13)
```

## 3. Two data layers (the key architectural idea)

The hierarchy Program → University/Exam → Course → Semester → Subject → Unit → Chapter → Topic
is split into **two concerns** so content can be *reused* across courses (an explicit requirement):

- **Content layer** — `Subject → Unit → Chapter → Topic`, plus `Note`, `Formula`, `Question`,
  `PyqPaper`, `Test` attached to it. This is the reusable pedagogical content.
- **Catalog layer** — `University`, `Exam`, `Program`, `Course`, `Semester`. A `Course` is an
  *offering* that **references a set of Subjects**. The same "Calculus" subject can appear in a
  DTU B.Tech course *and* a JEE track without duplication.

This is why we don't embed the hierarchy or hard-code DTU. Full field-level detail in `DATABASE.md`.

## 4. Folder structure (target)

```
only-maths/
├── src/
│   ├── app/
│   │   ├── (public)/            # marketing + SEO: /, /courses, /pyq/..., /formula/...
│   │   ├── (auth)/              # login, register, onboarding
│   │   ├── (app)/               # authenticated student app
│   │   │   ├── dashboard/
│   │   │   ├── learn/[subject]/[chapter]/[topic]/
│   │   │   ├── practice/
│   │   │   ├── pyqs/
│   │   │   ├── tests/
│   │   │   ├── revision/
│   │   │   └── analytics/
│   │   ├── (admin)/admin/       # CMS — RBAC gated
│   │   └── api/                 # Route Handlers (filtered queries, mutations, webhooks)
│   ├── components/
│   │   ├── ui/                  # shadcn primitives
│   │   ├── math/                # KaTeX wrappers (Inline, Block, safe render)
│   │   └── features/            # question-card, test-navigator, heatmap, etc.
│   ├── lib/
│   │   ├── db.ts                # Mongoose connection (cached across hot reloads)
│   │   ├── auth.ts             # Auth.js config
│   │   ├── rbac.ts              # role checks used by every guarded route
│   │   └── validation/         # zod schemas for inputs
│   ├── models/                 # Mongoose models (one file per collection)
│   ├── server/                 # server actions + service functions (attempts, mastery, ...)
│   └── types/
├── scripts/seed.ts             # seeds the narrow DTU dataset
├── PROJECT_SPEC.md · ARCHITECTURE.md · DATABASE.md · CLAUDE.md · CHANGELOG.md · README.md
└── ...config
```

## 5. Rendering strategy

- **Public/SEO pages** (topics, formulas, PYQ landing): SSG or SSR with metadata, OpenGraph,
  canonical URLs, structured data, sitemap, robots.txt. `/maths/integration`, `/pyq/dtu/mathematics-1/2025`.
- **Student app**: authenticated; server components read data, client components handle interaction
  (timers, navigator). Skeleton loaders for perceived speed.
- **Admin**: authenticated + role-gated; not indexed.

## 6. Maths rendering rules

- LaTeX stored as strings on the content documents.
- A single `<Math>` wrapper (inline/block variants) renders via KaTeX with `throwOnError: false`
  and a fallback, so a bad string never crashes a page.
- Enable MathML output for screen readers.
- Never `dangerouslySetInnerHTML` raw user LaTeX without going through the wrapper.

## 7. Security baseline (from day one, not bolted on)

Server-side authorization + RBAC · validate every input with zod · rate-limit auth and
answer-submit endpoints · protected API routes · never trust client-provided roles/permissions ·
secure session cookies · XSS-safe rendering · secure headers · upload validation · audit log for
admin mutations. Correct answers must **never** be sent to the client before submission.

## 8. Performance baseline

Server-side pagination + filtering for the question bank · MongoDB compound indexes on hot query
paths (see `DATABASE.md`) · lazy-load heavy components (test navigator, charts) · image
optimization · code splitting · skeletons. The attempts collection is high-write — index it for
the analytics reads it feeds, not for everything.
