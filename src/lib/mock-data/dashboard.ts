import type {
  ActivityItem,
  DashboardStats,
  RecommendedPractice,
  WeakTopic,
  WeeklyActivityPoint,
} from "@/types/ui";

export const mockContinueLearning = {
  topicName: "Differential Equations",
  subjectName: "Mathematics-I",
  progress: 64,
  href: "/learn/mathematics-1/differential-equations/first-order-differential-equations",
};

export const mockTodaysGoal = {
  questions: { current: 14, target: 25 },
  studyMinutes: { current: 42, target: 60 },
};

export const mockDashboardStats: DashboardStats = {
  questionsSolved: 1248,
  accuracyPercent: 78,
  studyHours: 46,
  streakDays: 7,
};

export const mockWeeklyActivity: WeeklyActivityPoint[] = [
  { day: "Mon", questions: 18 },
  { day: "Tue", questions: 24 },
  { day: "Wed", questions: 12 },
  { day: "Thu", questions: 30 },
  { day: "Fri", questions: 21 },
  { day: "Sat", questions: 9 },
  { day: "Sun", questions: 14 },
];

export const mockWeakTopics: WeakTopic[] = [
  { id: "wt-1", name: "Vector Calculus", accuracyPercent: 48 },
  { id: "wt-2", name: "Differential Equations", accuracyPercent: 56 },
  { id: "wt-3", name: "Matrices", accuracyPercent: 63 },
];

export const mockRecentActivity: ActivityItem[] = [
  {
    id: "act-1",
    title: "Completed Integration Quiz",
    detail: "Score: 8/10",
    timestamp: "2 hours ago",
  },
  {
    id: "act-2",
    title: "Practised Matrices",
    detail: "15 questions",
    timestamp: "Yesterday",
  },
  {
    id: "act-3",
    title: "Completed Laplace Transform",
    detail: "Marked as complete",
    timestamp: "2 days ago",
  },
];

export const mockRecommendedPractice: RecommendedPractice = {
  topic: "Laplace Transform",
  reason: "Your recent accuracy is 43%.",
  questionCount: 10,
};
