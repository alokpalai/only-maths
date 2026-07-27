import { Progress, ProgressIndicator, ProgressTrack } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

export type ProgressBarProps = {
  value: number;
  label?: string;
  showValue?: boolean;
  className?: string;
};

/** Standard linear progress bar with an optional label + percentage. Prefer
 * this over CircularProgress everywhere except the one dashboard goal ring. */
export function ProgressBar({ value, label, showValue = true, className }: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, value));
  return (
    <div className={cn("space-y-1.5", className)}>
      {(label || showValue) && (
        <div className="flex items-center justify-between text-xs">
          {label ? <span className="text-foreground font-medium">{label}</span> : <span />}
          {showValue ? (
            <span className="text-muted-foreground tabular-nums">{Math.round(clamped)}%</span>
          ) : null}
        </div>
      )}
      <Progress value={clamped}>
        <ProgressTrack>
          <ProgressIndicator />
        </ProgressTrack>
      </Progress>
    </div>
  );
}

export type CircularProgressProps = {
  value: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
  className?: string;
};

/** Reserved for genuinely dial-shaped use cases (e.g. the dashboard goal
 * ring) — not a default replacement for ProgressBar. */
export function CircularProgress({
  value,
  size = 64,
  strokeWidth = 6,
  label,
  className,
}: CircularProgressProps) {
  const clamped = Math.max(0, Math.min(100, value));
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (clamped / 100) * circumference;

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          className="stroke-muted fill-none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="stroke-primary fill-none transition-[stroke-dashoffset]"
        />
      </svg>
      <span className="text-foreground absolute text-sm font-semibold tabular-nums">
        {label ?? `${Math.round(clamped)}%`}
      </span>
    </div>
  );
}
