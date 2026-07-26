# Only Maths — Data Model (MongoDB / Mongoose)

Design principles:

- **Referenced, not embedded.** The hierarchy is deep, content is large and reused across
  courses, and we query at every level. Embedding would duplicate content and bloat documents.
- **ObjectId references** between collections; `.populate()` or explicit lookups as needed.
- Every document has `_id`, `createdAt`, `updatedAt` (Mongoose timestamps).
- Content documents carry a `status` enum: `draft | published | archived`.
- Index the fields we actually filter/sort on. Compound indexes for hot paths.

Notation below: `→ X` means "ObjectId ref to collection X".

---

## A. Catalog layer (offerings — reusable content plugs in here)

**University** — `name`, `slug`, `shortName` (e.g. DTU), `logoUrl`
**Exam** — `name` (e.g. JEE, GATE), `slug` — parallel to University; a track can hang off either
**Program** — `name` (B.Tech), `slug`, `→ University`
**Course** — `name` (Mathematics-I offering), `slug`, `→ Program?`, `→ University?`/`→ Exam?`,
  `subjectIds: [→ Subject]` ← the reuse link
**Semester** — `number`, `→ Program`; `courseIds: [→ Course]`

> A `Course` bundles Subjects for one audience. The same Subject appears in many Courses.

Indexes: unique `slug` per collection; `Course` on `{ programId }` and `{ examId }`.

---

## B. Content layer (the reusable pedagogical core)

**Subject** — `name`, `slug`, `description`, `order`, `status`
**Unit** — `name`, `slug`, `order`, `→ Subject`, `status`
**Chapter** — `name`, `slug`, `order`, `→ Unit`, `→ Subject` (denormalized for quick filter),
  `status`
**Topic** — `name`, `slug`, `order`, `→ Chapter`, `→ Subject` (denormalized), `status`,
  and the learning-page content: `concept` (LaTeX/markdown), `definitions[]`, `derivations[]`,
  `commonMistakes[]`, `shortcuts[]`, `examTips[]`. Heavy example/question content lives in their
  own collections and references the Topic.

Indexes: unique `slug`; `Chapter`/`Topic` on `{ subjectId, order }` and `{ unitId }` /
`{ chapterId }`.

**Note** — `title`, `→ Topic`/`→ Chapter`/`→ Subject`, `body` (markdown+LaTeX), `pdfUrl?`, `status`
**Formula** — `latex`, `meaning`, `variables[]`, `conditions[]`, `example` (LaTeX),
  `→ Topic`/`→ Chapter`/`→ Subject`, `tags[]`, `status`
**Example** — worked example: `problem`, `steps[]`, `→ Topic`, `status`

---

## C. Question engine (the core asset)

**Question**
```
type        : "mcq" | "multi" | "truefalse" | "numerical" | "short" | "long" | "proof" | "derivation"
text        : string (LaTeX/markdown)
options     : [{ key, text, isCorrect }]        // mcq/multi only; NEVER sent to client pre-submit
answer      : mixed                             // numerical/short; NEVER sent pre-submit
solution    : { steps: [string], altMethod?: string }
formulaUsed : [→ Formula]
difficulty  : "easy" | "medium" | "hard"
qType       : "numerical" | "conceptual" | ...   // your "Type" field
marks        : number
estimatedTimeSec : number
source      : string        // "DTU 2025"
year        : number?
examTag     : string?       // "End Semester"
subjectId   : → Subject     // denormalized for filtering
chapterId   : → Chapter
topicId     : → Topic
tags        : [string]
avgSolveTimeSec : number     // maintained from attempts
status      : "draft" | "published" | "archived"
```
> **Correctness fields (`options[].isCorrect`, `answer`, `solution`) are stripped by the API
> before a question is sent for solving.** Grading happens server-side on submit.

**Hint** — `→ Question`, `order` (1,2,3…), `text` (LaTeX). Progressive; revealed one at a time.

Indexes on Question: `{ topicId, difficulty }`, `{ chapterId }`, `{ subjectId, status }`,
`{ year }`, `{ tags }`, text index on `text` for search.

---

## D. PYQs

**PyqPaper** — `→ University`/`→ Exam`, `→ Course`, `semester?`, `→ Subject`, `examName`
  (End Semester), `year`, `pdfUrl?`, `questionIds: [→ Question]`, `status`
> Topic-wise PYQs come for free: any Question with `source`/`year`/`examTag` set and a `topicId`
> shows inside that Topic. So a single Question can be both "in a paper" and "under a topic."

Indexes: `{ universityId, courseId, subjectId, year }`.

---

## E. Assessment (practice, quizzes, tests)

**Test** — `title`, `type` ("quiz"|"chapter"|"unit"|"subject"|"mock"), `scope` refs
  (`subjectId`/`chapterId`/`topicId`), `durationSec`, `totalMarks`, `instructions`,
  `questionIds: [→ Question]` **or** `rules` (e.g. `{ easy:10, medium:15, hard:5 }` for dynamic
  builds), `sections[]?` (mock exams), `status`

**PracticeSession** — `→ User`, config (`topicId`, `count`, `difficulty`, `qType`,
  `pyqsOnly`, `timed`), `questionIds: [→ Question]`, `startedAt`, `completedAt?`, summary stats

**TestAttempt** — `→ User`, `→ Test`, `startedAt`, `submittedAt?`, `status`
  ("in_progress"|"submitted"|"expired"), `answers` (autosaved map `questionId → response +
  markedForReview`), `score`, `accuracy`, `percentile?`, `timeTakenSec`, `topicBreakdown[]`

---

## F. Attempt & progress data (powers analytics, mastery, AI)

**QuestionAttempt** — the central event log:
```
userId            : → User
questionId        : → Question
context           : { practiceSessionId?, testAttemptId? }
answer            : mixed
isCorrect         : boolean
startedAt, submittedAt, timeTakenSec
hintsUsed         : number
solutionViewed    : boolean
attemptNumber     : number
topicId, subjectId : (denormalized for fast rollups)
```
Indexes: `{ userId, questionId }`, `{ userId, submittedAt }`, `{ userId, topicId }`,
`{ questionId }`. High write volume — keep indexes lean and purpose-built.

**TopicProgress** — `→ User`, `→ Topic`, `completed` (bool from "mark complete"),
  `questionsAttempted`, `questionsCorrect`, `lastStudiedAt`
**TopicMastery** — `→ User`, `→ Topic`, `score` (0–100), `state`
  ("not_started"|"learning"|"practising"|"proficient"|"mastered"), inputs snapshot
  (accuracy, difficulty mix, hints, tests, recency). Recomputed from QuestionAttempt.
**StudySession** — `→ User`, `startedAt`, `endedAt`, `durationSec`, `context` — feeds study-time
  stats + the GitHub-style heatmap.

Indexes: unique `{ userId, topicId }` on both TopicProgress and TopicMastery.

---

## G. Personalisation

**Bookmark** — `→ User`, `itemType` ("question"|"formula"|"topic"|"note"|"example"), `itemId`
**Mistake** — `→ User`, `→ Question`, `category`
  ("concept"|"calculation"|"formula"|"careless"|"time"), `resolved` (bool once later solved
  correctly), `addedAt` — auto-added on wrong answers + manual
**RevisionItem** — `→ User`, `itemType`+`itemId`, `listName?`, plus Phase-12 spaced fields:
  `dueAt`, `intervalStage` (1/3/7/14/30 days), `lastReviewedAt`

Indexes: `{ userId, itemType }`; `RevisionItem` `{ userId, dueAt }`.

---

## H. Identity & platform

**User** — `email` (unique), `passwordHash?` (credentials), `name`, `image?`,
  `role` ("student"|"editor"|"moderator"|"admin"|"superadmin"), `→ University`, `→ Course`,
  `semester`, `onboarded` (bool), auth-provider fields (Auth.js adapter collections handle
  sessions/accounts)
**Profile** — (can fold into User) `avatar`, `xp`, `level`, `streak`, `longestStreak`,
  privacy settings — Phase 12
**Notification** — `→ User`, `type`, `title`, `body`, `read`, `link` — Phase 12
**Subscription** / **Payment** — plan, status, Razorpay ids — Phase 12
**Discussion** / **Comment** / **Report** — Phase 12+
**Achievement** / **UserAchievement** — Phase 12
**AuditLog** — `→ User (actor)`, `action`, `targetType`, `targetId`, `meta`, `at` — admin mutations

Indexes: `User.email` unique; `Notification` `{ userId, read }`; `AuditLog` `{ actorId, at }`.

---

## I. Seed data (Phase 3)

Seed only the narrow launch dataset so the app is demoable end-to-end:
DTU → B.Tech → Semester 1 → **Mathematics-I** → units (Calculus, Matrices, Differential
Equations, Vector Calculus) → a few chapters/topics → ~30–50 questions with hints/solutions →
1–2 PYQ papers → 1 quiz + 1 test. Enough to exercise every MVP screen with real content.
