# Only Maths — Project Specification (Phase 0)

> **Status:** Phase 0 (specification). No implementation yet.
> **Stack:** Next.js (App Router) · React · MongoDB (Mongoose) · Tailwind CSS · shadcn/ui · KaTeX
> **First target market:** DTU B.Tech Mathematics (deliberately narrow — expand later).

---

## 1. What Only Maths is

A mathematics learning platform built around one loop:

**Learn → Understand → Practice → Test → Analyse → Improve**

Not a PDF cupboard. The differentiator is the *data layer*: every question attempt is
recorded, and that data drives progress, mastery, mistake tracking, recommendations, and
(later) AI tutoring.

Three surfaces:

| Surface | Who | Purpose |
|---|---|---|
| **Student app** | Logged-in students | Learn topics, solve questions, take tests, review mistakes, track progress |
| **Admin / CMS** | Editors, admins | Manage the content hierarchy, questions, PYQs, tests, users, subscriptions |
| **Public site** | Everyone (SEO) | Marketing + indexable educational content (topics, formulas, PYQs) |

---

## 2. Non-negotiables

These are decided and should not drift during the build:

1. **Content is referenced, not hard-coded to one syllabus.** The schema supports multiple
   universities/exams and reuse of the same Subject content across different Courses.
2. **All maths renders with KaTeX** (LaTeX in the DB, rendered on the client). Never store
   maths as screenshots unless truly unavoidable.
3. **Authorization is server-side.** A hidden admin button is not security. RBAC on every
   protected route and API handler.
4. **Question Bank paginates and filters server-side.** Never ship 50k questions to the browser.
5. **Build phase by phase**, review/test/commit after each. Never one giant "build everything" pass.

---

## 3. MVP scope (Phase 1–11 of the build plan)

The first shippable product is deliberately smaller than the full vision:

- Auth (email/password + Google) and onboarding (pick university → course → semester)
- Student dashboard (continue learning, today's goal, core stat cards, recent activity)
- Content hierarchy browsing: Subject → Unit → Chapter → Topic
- Topic learning page (concept, formulas, examples, common mistakes, practice) with "mark complete"
- Formula library (browse, bookmark, copy LaTeX)
- Question bank with structured metadata + server-side filtering
- Question-solving experience (timer → submit → correct/incorrect → solution) with progressive hints
- PYQs (paper-based **and** topic-wise) with online solving
- Practice mode (pick topic + config → dynamic question set)
- Quizzes and tests (timer, question navigator, autosave, results)
- Bookmarks + Mistake Notebook
- Basic progress tracking
- Admin CMS for the content hierarchy, questions, PYQs, tests, users
- Responsive UI + dark mode

**Explicitly NOT in MVP:** spaced revision scheduling, study planner, mock-exam analytics
depth, achievements/XP/leaderboards, subscriptions/payments, AI tutor, discussions,
knowledge graph, multi-university expansion. These are Phase 12+ and must not be started early.

---

## 4. Feature areas (full vision, for reference)

Grouped so scope stays legible. Each maps to a build phase in `BUILD_PLAN` inside this file.

**Learning:** subject dashboards, unit/chapter cards, topic learning pages, notes, formula
library, global search.

**Question engine:** structured question bank, filters, solving experience, progressive hints,
step-by-step solutions, alternative methods, report/bookmark/revision actions.

**Assessment:** PYQs (paper + topic-wise), practice mode, quizzes, chapter/unit/subject tests,
mock exams, test analytics.

**Student intelligence:** progress, topic mastery (0–100 + states), mistake notebook, revision
hub, spaced revision, personal analytics (heatmap, trends), recommendations.

**Planning:** study planner, calendar.

**AI (Phase 13):** tutor, hints, Socratic mode, solution checker, similar-question generator,
adaptive practice — always grounded in platform content, never free-inventing maths.

**Gamification (Phase 12+):** XP, levels, achievements, streaks, leaderboards.

**Admin:** dashboard analytics, CMS (CRUD + draft/published/archived), question editor with
live LaTeX preview, bulk import (CSV/JSON with validation), test builder, RBAC user management.

**SaaS:** subscription tiers (Free / Pro / AI Pro), Razorpay payments, entitlements.

**Public/SEO:** landing page, indexable topic/formula/PYQ pages, sitemap, structured data.

---

## 5. The build plan (phased)

> Rule after **every** phase: Review → Test → Fix → Verify requirements → Commit → Continue.
> Update `CHANGELOG.md` each phase.

| Phase | Name | Output |
|---|---|---|
| **0** | Specification | This file + `ARCHITECTURE.md` + `DATABASE.md` + `CLAUDE.md`. No code. |
| 1 | Foundation | Next.js + TS + Tailwind + shadcn, lint/format, env config, Git, folder structure |
| 2 | UI system | Design tokens, components, app shell (sidebar/navbar), responsiveness, dark mode |
| 3 | Database | MongoDB + Mongoose models, indexes, seed script (narrow DTU dataset) |
| 4 | Auth | Signup/login/onboarding, roles, protected routes + API guards |
| 5 | Learning system | Subjects → units → chapters → topics, notes, formulas, progress |
| 6 | Question engine | Bank, KaTeX rendering, answers/hints/solutions, filtering, attempts recording |
| 7 | PYQs | Paper management, topic-wise linkage, online solving |
| 8 | Practice | Dynamic session generation, results, history |
| 9 | Tests | Quiz + test engine: timer, autosave, navigator, results |
| 10 | Student intelligence | Progress, analytics, mastery, mistakes, bookmarks, revision |
| 11 | Admin CMS | Content/question/PYQ/test/user management |
| 12 | SaaS | Plans, subscriptions, Razorpay, entitlements |
| 13 | AI | Tutor, hints, solution analysis, personalised practice |
| 14 | Production | Tests, security audit, a11y, performance, SEO, monitoring, deploy, docs |

MVP ships after Phase 11.

---

## 6. Core user journey

Landing → Sign up → Onboarding (university → course → semester) → Dashboard → pick Subject →
Chapter → Learn Topic → Practice → Quiz → Analyse results → Review mistakes → Recommended
practice → Improve mastery. Every feature exists to support this loop.

---

## 7. Success metrics (owner view)

Activation (completed onboarding + first question solved), D1/D7 retention, questions/user,
tests/user, and later free→paid conversion + churn. Plus content analytics: most-studied topic,
hardest topic, most-failed question, most-attempted PYQ.
