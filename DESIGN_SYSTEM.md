# Only Maths — Design System (Phase 2)

Reference for anyone (human or agent) building UI in this codebase. Keep it current as the
system evolves — this file, not memory, is the source of truth.

## Principles

Clarity, focus, consistency, density, accessibility, responsiveness — see `CLAUDE.md` for the
full rationale. In short: this is a studying tool used for hours at a time, not a marketing
site. Decoration loses to legibility every time.

## Tokens

All colour lives in CSS custom properties in `src/app/globals.css`, consumed via Tailwind
(`bg-primary`, `text-muted-foreground`, etc.). Never hard-code a hex value in a component.

**Surfaces:** `background` (canvas) → `surface`/`card` (panels) → `surface-elevated`/`popover`
(dialogs, dropdowns — lifted above content) → `surface-muted`/`muted` (recessed panels).

**Brand:** `primary` (`#499A13` light / `#5FB625` dark) is reserved for interactive controls —
buttons, links, active nav state, focus rings. It is never used as a status colour, so a
"primary button" and a "correct answer" badge never look alike.

**Status:** `success` (teal, not brand green — deliberately a different hue), `warning`
(amber), `info` (blue), `destructive`/`error` (red). Deliberately distinct from `primary`.

**Learning states:** correct / incorrect / unanswered / review / completed / in-progress /
locked are a UI-level vocabulary, not extra CSS tokens — they map onto the status tokens above
in `src/components/shared/status.ts` (`LEARNING_STATE_CONFIG`). `MASTERY_STATE_CONFIG` and
`DIFFICULTY_CONFIG` live there too. Add new state vocabularies there, not as ad-hoc classes.

**Session/palette states** (question palette during an active practice/test session — current /
answered / unanswered / marked-for-review) are a _different_ vocabulary from the post-submission
learning states above (no grading has happened yet, so "correct/incorrect" don't apply). See
`src/components/features/questions/question-palette.tsx`.

## Typography

`src/components/shared/typography.tsx`: `Display`, `PageTitle`, `SectionHeading`,
`SubsectionHeading`, `CardHeading`, `Body`, `SmallBody`, `Eyebrow`, `Caption`, `Metadata`,
`StatValue`. Each renders a sensible default tag (`PageTitle` → `h1`, etc.) but accepts an `as`
prop to fix heading hierarchy when nested — always check the page ends up with one `h1` and a
logical heading order, the components don't guarantee that for you.

## Spacing & layout

Tailwind's default spacing scale, used consistently: card padding `p-4`/`p-5`, section gaps
`space-y-6`, page padding via `AppShell`'s `<main>` (`px-4 py-6 sm:px-6 lg:px-8`). Reading
content (topic pages) stays in a constrained column; solving/test pages may go wider — decide
per page, don't force one container width everywhere.

## Icons

`lucide-react` only, generally `size-4` inline / `size-5` for standalone nav icons. Never
emoji as an icon.

## Components

- **Primitives** (`src/components/ui/`) — shadcn/ui on `base-nova` style, backed by
  **Base UI** (`@base-ui/react`), not Radix. This matters for anyone extending them:
  - Polymorphism uses `render={<Link href="..." />}` (props merge onto that element), not
    Radix's `asChild`.
  - Trigger/Item click handlers are `onClick`, not `onSelect` (except `cmdk`'s `Command.Item`,
    a separate library used only inside `command.tsx`, which genuinely uses `onSelect`).
  - `Button` defaults `nativeButton` to `false` automatically whenever a `render` prop is
    passed, so `<Button render={<Link .../>}>` never triggers Base UI's native-button-semantics
    warning. Don't reintroduce that warning by hand-rolling `ButtonPrimitive` elsewhere.
- **Layout** (`src/components/layout/`) — `AppShell`, `Sidebar`, `Header`, `MobileNav`,
  `MobileDrawer`, `CommandPaletteTrigger`, `UserMenu`, `NotificationBell`, `nav-config.ts`
  (single source of truth for nav items — edit here, not per-component).
- **Shared** (`src/components/shared/`) — cross-domain, reusable anywhere: typography,
  `PageHeader`, `EmptyState`, `ErrorState`, skeletons, `ProgressBar`/`CircularProgress`,
  `MasteryIndicator`, `StreakDisplay`, `GoalProgress`, `status.ts`, theme provider/toggle.
- **Math** (`src/components/math/`) — `Math` (the KaTeX wrapper — required for all maths,
  never render LaTeX any other way), `FormulaCard`, `WorkedExample`, `DefinitionBlock`,
  `TheoremBlock`, `MathCallout`. `DefinitionBlock`/`TheoremBlock` bodies are **plain text**, not
  markdown+LaTeX — a rich-content renderer for `concept`/`body` fields is a later-phase concern
  (Phase 5/6), not solved here.
- **Features** (`src/components/features/{dashboard,learning,questions}/`) — domain-specific,
  built from the above. Not meant to be reused outside their domain.

## Responsive strategy

Three regimes, not two:

- **Desktop (`lg:` 1024px+):** persistent collapsible `Sidebar` + `Header`.
- **Tablet (`md`–`lg`, 768–1023px):** `Sidebar` hidden, `Header` shows a hamburger
  (`MobileDrawer`) opening a `Sheet` with the same nav.
- **Mobile (`<768px`):** `Header` compact (no hamburger — redundant with bottom nav), fixed
  `MobileNav` bottom bar (Home/Learn/Practice/Tests + "More" sheet for the rest).

Dashboard reordering between mobile and desktop is done via a single grid with per-item
`order-N lg:order-M lg:col-start-S lg:col-span-C` — see `src/app/(app)/dashboard/page.tsx` for
the pattern if you need to replicate it elsewhere; it's the only place in the codebase doing
this, and it's intentionally verbose rather than magic.

## Theme

`next-themes`, `attribute="class"`, `defaultTheme="system"`. `<html suppressHydrationWarning>`
in `src/app/layout.tsx` is required — don't remove it, next-themes injects the class before
hydration and React will otherwise warn on every load. Components that render something
theme-dependent (an icon that differs by theme, for example) must gate on `useHasMounted()`
(`src/lib/use-has-mounted.ts`, a `useSyncExternalStore`-based hook) rather than a
`useEffect`+`useState` pair — the latter trips the `react-hooks/set-state-in-effect` lint rule
and causes an extra render.

## Accessibility baseline

Semantic headings via the typography components, visible focus rings (`focus-visible:ring-*`
already on every primitive), `aria-current="page"` on active nav links, `aria-pressed` on
toggle-style icon buttons (bookmark, mark-for-review), dialogs/sheets/popovers/menus all via
Base UI (which handles focus trapping and `Escape` natively — don't hand-roll it). Respect
`prefers-reduced-motion`: no scroll-triggered or continuous animation is used anywhere.

## What's deliberately not solved here

- Rich text/markdown rendering for content bodies (Phase 5+).
- Real search, grading, timers-that-persist, notifications backend — everything in this phase
  is presentation only, backed by `src/lib/mock-data/`.
- Full WCAG audit / contrast-ratio verification pass (spot-checked, not exhaustively measured).
