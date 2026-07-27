/**
 * UI-level types for Phase 2 mock screens. These are deliberately simpler
 * than the future Mongoose schema in DATABASE.md — they exist to type mock
 * data and component props, not to model the database.
 */

export type MasteryState = "not_started" | "learning" | "practising" | "proficient" | "mastered";

export type Difficulty = "easy" | "medium" | "hard";

export type LearningState =
  "correct" | "incorrect" | "unanswered" | "review" | "completed" | "in-progress" | "locked";

export type UserSummary = {
  name: string;
  avatarUrl?: string;
  university: string;
  course: string;
  semester: number;
};

export type SubjectSummary = {
  id: string;
  slug: string;
  name: string;
  code?: string;
  progress: number;
  unitCount: number;
  chapterCount: number;
  questionCount: number;
};

export type ChapterSummary = {
  id: string;
  slug: string;
  name: string;
  topicCount: number;
  questionCount: number;
  pyqPaperCount: number;
  testCount: number;
  progress: number;
};

export type UnitSummary = {
  id: string;
  name: string;
  chapters: ChapterSummary[];
};

export type SubjectDetail = SubjectSummary & {
  units: UnitSummary[];
};

export type TopicNavItem = {
  id: string;
  slug: string;
  name: string;
  mastery: MasteryState;
};

export type TopicDetail = {
  id: string;
  slug: string;
  name: string;
  chapterName: string;
  subjectName: string;
  masteryScore: number;
  masteryState: MasteryState;
  concept: string;
  definitions: { term: string; body: string }[];
  formulaLatex: string;
  formulaMeaning: string;
  workedExample: { problem: string; steps: string[] };
  commonMistake: string;
  examTip: string;
  siblingTopics: TopicNavItem[];
};

export type QuestionPreview = {
  id: string;
  text: string;
  difficulty: Difficulty;
  type: "mcq" | "numerical" | "short" | "proof";
  marks: number;
  source?: string;
  year?: number;
  topic: string;
  solved: boolean;
  bookmarked: boolean;
};

export type FormulaPreview = {
  id: string;
  name: string;
  latex: string;
  explanation?: string;
  topic: string;
  bookmarked: boolean;
};

export type TestSummary = {
  id: string;
  title: string;
  type: "quiz" | "chapter" | "unit" | "subject" | "mock";
  durationMin: number;
  totalMarks: number;
  questionCount: number;
};

export type DashboardStats = {
  questionsSolved: number;
  accuracyPercent: number;
  studyHours: number;
  streakDays: number;
};

export type WeeklyActivityPoint = {
  day: string;
  questions: number;
};

export type WeakTopic = {
  id: string;
  name: string;
  accuracyPercent: number;
};

export type ActivityItem = {
  id: string;
  title: string;
  detail: string;
  timestamp: string;
};

export type RecommendedPractice = {
  topic: string;
  reason: string;
  questionCount: number;
};

export type NotificationItem = {
  id: string;
  type: "revision" | "content" | "achievement";
  title: string;
  body: string;
  timestamp: string;
  read: boolean;
};
