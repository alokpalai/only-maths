import { CheckCircle2, Clock, Flame, Target } from "lucide-react";

import { StatValue } from "@/components/shared/typography";
import type { DashboardStats } from "@/types/ui";

export function StatsGrid({ stats }: { stats: DashboardStats }) {
  const items = [
    {
      label: "Questions Solved",
      value: stats.questionsSolved.toLocaleString(),
      icon: CheckCircle2,
    },
    { label: "Accuracy", value: `${stats.accuracyPercent}%`, icon: Target },
    { label: "Study Time", value: `${stats.studyHours}h`, icon: Clock },
    { label: "Current Streak", value: `${stats.streakDays}d`, icon: Flame },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {items.map(({ label, value, icon: Icon }) => (
        <div key={label} className="border-border bg-card space-y-2 rounded-xl border p-4">
          <Icon className="text-muted-foreground size-4" aria-hidden="true" />
          <div className="space-y-0.5">
            <StatValue>{value}</StatValue>
            <p className="text-muted-foreground text-xs">{label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
