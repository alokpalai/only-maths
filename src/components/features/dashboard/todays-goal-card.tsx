import { CardHeading } from "@/components/shared/typography";
import { GoalProgress } from "@/components/shared/goal-progress";

export type TodaysGoalCardProps = {
  questions: { current: number; target: number };
  studyMinutes: { current: number; target: number };
};

export function TodaysGoalCard({ questions, studyMinutes }: TodaysGoalCardProps) {
  return (
    <div className="border-border bg-card space-y-4 rounded-xl border p-4">
      <CardHeading>Today&apos;s Goal</CardHeading>
      <div className="space-y-4">
        <GoalProgress label="Questions" current={questions.current} target={questions.target} />
        <GoalProgress
          label="Study Time"
          current={studyMinutes.current}
          target={studyMinutes.target}
          unit="min"
        />
      </div>
    </div>
  );
}
