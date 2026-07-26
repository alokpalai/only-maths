# Changelog

All notable changes to Only Maths are logged here, one entry per build phase.

## Phase 1 — Foundation

- Scaffolded Next.js (App Router) + TypeScript (strict) with Tailwind CSS v4.
- Initialized shadcn/ui (`base-nova` style, CSS variables, lucide-react icons).
- Applied the brand theme: white background, green `#499A13` primary, neutral
  greys for borders/muted surfaces, with a dark-mode variant. Tokens live in
  `src/app/globals.css`.
- Configured ESLint (`eslint-config-next` + `eslint-config-prettier`) and
  Prettier (with `prettier-plugin-tailwindcss`).
- Added `.env.example` documenting the Phase 1 environment variables
  (`MONGODB_URI`, `NEXT_PUBLIC_APP_URL`).
- Created the target folder structure from `ARCHITECTURE.md`
  (`src/app/(public|auth|app|admin)`, `src/app/api`, `src/components/{ui,math,features}`,
  `src/lib/validation`, `src/models`, `src/server`, `src/types`, `scripts/`) —
  empty placeholders only; content is added in later phases.
- Added the cached Mongoose connection helper (`src/lib/db.ts`), reused across
  hot reloads/serverless invocations.
- Added the `<Math>` KaTeX wrapper (`src/components/math/Math.tsx`): inline and
  block (`display`) modes, `throwOnError: false` with a safe fallback, and
  `htmlAndMathml` output for screen-reader accessibility.
- Replaced the `create-next-app` boilerplate homepage with a minimal Phase 1
  smoke test (brand heading, a shadcn `Button`, and KaTeX-rendered inline and
  display equations) to visually verify the theme and maths rendering.

Verified: `npm run typecheck`, `npm run lint`, and `npm run build` all pass
clean; `npm run dev` serves `/` with a 200 and server-rendered KaTeX markup.
