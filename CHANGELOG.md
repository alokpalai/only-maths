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

## Phase 2 — Design System, UI Foundation & Application Shell

Frontend-only: design tokens, primitives, app shell, and every major page as a mock-data-backed
visual shell. No backend, auth, or data-fetching logic — see `DESIGN_SYSTEM.md` for the full
reference and rationale.

- **Tokens & theme**: extended `globals.css` with surface tiers (`surface`/`surface-elevated`/
  `surface-muted`) and status colors (`success`/`warning`/`info`, distinct from brand `primary`)
  for both light and dark. Added `next-themes` (light/dark/system, persisted, no flash) via
  `ThemeProvider`/`ThemeToggle`.
- **Typography system**: `src/components/shared/typography.tsx` (Display → Caption/Metadata
  scale).
- **Primitives**: pulled the full shadcn/ui set for this project's `base-nova` (Base UI, not
  Radix) style — Card, Badge, Input, Textarea, Select, Checkbox, Radio, Switch, Tooltip,
  Dropdown, Popover, Dialog, Sheet, Tabs, Accordion, Breadcrumb, Avatar, Separator, Skeleton,
  Progress, Toast (sonner), Pagination, Table, Command, Label.
- **App shell**: collapsible desktop `Sidebar` (persisted via `useSyncExternalStore`, tooltip
  flyout when collapsed), tablet drawer nav, mobile bottom nav + "More" sheet, `Header` with a
  `Ctrl/Cmd+K` command palette (mock search index), notification bell popover, user menu,
  theme toggle. Nav config centralized in `src/components/layout/nav-config.ts` — Planner and
  AI Tutor deliberately omitted (Phase 12+/13, out of MVP scope per `CLAUDE.md`).
  Homepage moved from `src/app/page.tsx` to `src/app/(public)/page.tsx` to match the intended
  route-group ownership of `/`.
- **Shared primitives**: `PageHeader`, `EmptyState`, `ErrorState`, route-shaped skeletons,
  `ProgressBar`/`CircularProgress`, `MasteryIndicator`, `StreakDisplay`, `GoalProgress`, and a
  central `status.ts` mapping learning/mastery/difficulty states to tokens.
- **Math components**: `FormulaCard`, `WorkedExample`, `DefinitionBlock`, `TheoremBlock`,
  `MathCallout` added alongside the Phase 1 `Math` wrapper.
- **Pages**: Dashboard (responsive reordering via CSS grid `order`), Learn, Subject (accordion
  hierarchy), Topic (concept/definitions/formula/worked example/callouts + sibling nav),
  Practice (question-solving shell: hints, palette, submit — no grading), PYQs, Tests (list +
  `/tests/[testId]` full test-attempt shell with countdown timer and submit-confirmation
  dialog), Revision (empty state), Analytics, Notifications, Settings (Appearance is the only
  section with real behaviour — the rest is mock UI per spec), branded 404, and a global
  `error.tsx` boundary.
- **Mock data**: `src/lib/mock-data/` (user, subjects/units/chapters/topics, questions,
  formulas, dashboard, notifications, tests, search index) and matching UI-level types in
  `src/types/ui.ts` — intentionally simpler than the future Mongoose schema; superseded
  starting Phase 5/6.

**Bug caught during QA and fixed**: `Button` rendered via `render={<Link .../>}` triggered Base
UI's native-button-semantics warning on every navigation button in the app. Fixed once at the
source (`Button` now defaults `nativeButton={false}` whenever `render` is passed) rather than at
each of the ~13 call sites.

Verified: `npm run typecheck`, `npm run lint`, and `npm run build` all pass clean (13 routes
built). Playwright QA pass across 360/390/768/1024/1440px viewports on all pages found no
horizontal overflow and no other console errors.
