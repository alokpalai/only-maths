import { ProgressBar } from "@/components/shared/progress-bar";
import { cn } from "@/lib/utils";

export type GoalProgressProps = {
  label: string;
  current: number;
  target: number;
  unit?: string;
  className?: string;
};

export function GoalProgress({ label, current, target, unit, className }: GoalProgressProps) {
  const percent = target > 0 ? (current / target) * 100 : 0;
  return (
    <div className={cn("space-y-1.5", className)}>
      <div className="flex items-baseline justify-between">
        <span className="text-foreground text-sm font-medium">{label}</span>
        <span className="text-muted-foreground text-xs tabular-nums">
          {current} / {target}
          {unit ? ` ${unit}` : ""}
        </span>
      </div>
      <ProgressBar value={percent} showValue={false} />
    </div>
  );
}
