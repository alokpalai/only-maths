# CLAUDE.md — Only Maths development rules

Read this before doing anything. It governs how you build this project.

## What you're building
Only Maths: a maths learning platform. Loop = **Learn → Understand → Practice → Test →
Analyse → Improve**. Three surfaces: student app, admin/CMS, public SEO site. First target is
**DTU B.Tech Mathematics** — narrow on purpose. Full spec in `PROJECT_SPEC.md`, architecture in
`ARCHITECTURE.md`, data model in `DATABASE.md`.

## Stack (do not swap without being asked)
Next.js App Router · TypeScript (strict) · MongoDB + Mongoose · Tailwind + shadcn/ui ·
lucide-react · KaTeX · Auth.js (MongoDB adapter) · Recharts. Razorpay and any AI provider are
Phase 12+/13 only.

## The one rule that matters most
**Build phase by phase. Never attempt the whole app in one pass.** Follow the phase table in
`PROJECT_SPEC.md`. Do exactly one phase, then stop for review. A phase is done only when it
runs, is tested, and its requirements are verified.

After every phase, in order:
1. Run it and manually verify the phase's requirements.
2. Fix errors before moving on.
3. Update `CHANGELOG.md` (what changed) and any affected doc.
4. Commit to Git with a clear message (`phase-N: ...`).
5. Only then propose the next phase.

## Scope discipline
- **Do not build ahead.** No revision scheduling, planner, XP/achievements/leaderboards,
  payments, AI, discussions, or knowledge graph until their phase. If tempted, stop and ask.
- MVP = Phases 1–11. Ship that before anything in Phase 12+.
- If a request is ambiguous or seems to pull scope forward, ask a short question instead of guessing.

## Non-negotiable engineering rules
- **Authorization is server-side.** RBAC-guard every protected route/handler via `lib/rbac.ts`.
  Never trust a client-sent role or a hidden UI element as a control.
- **Never send answer/solution data to the client before submission.** Strip
  `options[].isCorrect`, `answer`, and `solution` in the API; grade server-side.
- **Validate every input with zod** at the server boundary.
- **All maths goes through the `<Math>` KaTeX wrapper** (`throwOnError:false` + fallback, MathML
  for a11y). Never render raw user LaTeX unguarded. Store LaTeX as strings, never screenshots.
- **Question bank is server-side paginated + filtered.** Never load large sets into the browser.
- **Content is referenced, not embedded**, and not hard-coded to DTU. Respect the catalog/content
  split in `DATABASE.md` so Subjects can be reused across Courses.
- Rate-limit auth and answer-submit endpoints. Audit-log admin mutations.

## Data model
Follow `DATABASE.md` exactly. Referenced ObjectIds, `status` enums on content, timestamps, and
the listed indexes. `QuestionAttempt` is the central event log that powers progress, mastery,
mistakes, and (later) AI — get it right early; index it for its analytics reads.

## UI/design
Clean academic interface, light theme primary + dark mode, generous whitespace, strong
typography, subtle borders/shadows, small consistent radius, minimal animation. Reference feel:
Linear + Notion + a modern learning platform. **Not** purple gradients, glowing borders, or
glass rectangles. Build real states: loading (skeletons), empty, error, 404, 500, offline —
with human messages, never raw `undefined is not iterable`.

## Docs to maintain
`README.md`, `PROJECT_SPEC.md`, `ARCHITECTURE.md`, `DATABASE.md`, `CHANGELOG.md`, and this file.
Keep them current as decisions change — the docs are the source of truth, not memory.

## When you start a phase
State: (1) which phase, (2) what you'll produce, (3) how you'll verify it. Build it. Then run
the after-every-phase checklist above. If you hit a decision the docs don't cover, ask rather
than inventing — especially for anything touching auth, grading, payments, or maths correctness.
