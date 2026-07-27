import type { TestSummary } from "@/types/ui";

export const mockTests: TestSummary[] = [
  {
    id: "test-1",
    title: "Mathematics-I Mock Test",
    type: "mock",
    durationMin: 180,
    totalMarks: 100,
    questionCount: 20,
  },
  {
    id: "test-2",
    title: "Integration Techniques — Chapter Test",
    type: "chapter",
    durationMin: 45,
    totalMarks: 30,
    questionCount: 10,
  },
];
