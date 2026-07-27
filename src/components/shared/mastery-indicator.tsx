import { Badge } from "@/components/ui/badge";
import { ProgressBar } from "@/components/shared/progress-bar";
import { MASTERY_STATE_CONFIG, type MasteryState } from "@/components/shared/status";
import { cn } from "@/lib/utils";

export type MasteryIndicatorProps = {
  topic: string;
  score: number;
  state: MasteryState;
  className?: string;
};

export function MasteryIndicator({ topic, score, state, className }: MasteryIndicatorProps) {
  const config = MASTERY_STATE_CONFIG[state];
  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center justify-between gap-2">
        <span className="text-foreground text-sm font-medium">{topic}</span>
        <Badge variant="outline" className={cn("border-transparent", config.badgeClassName)}>
          {config.label}
        </Badge>
      </div>
      <ProgressBar value={score} label={`Mastery ${score}%`} showValue={false} />
    </div>
  );
}
