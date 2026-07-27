import { Flame } from "lucide-react";

import { cn } from "@/lib/utils";

export type StreakDisplayProps = {
  days: number;
  className?: string;
};

export function StreakDisplay({ days, className }: StreakDisplayProps) {
  return (
    <div className={cn("inline-flex items-center gap-1.5", className)}>
      <Flame className="text-warning size-4" aria-hidden="true" />
      <span className="text-foreground text-sm font-semibold tabular-nums">{days}</span>
      <span className="text-muted-foreground text-sm">day{days === 1 ? "" : "s"}</span>
    </div>
  );
}
