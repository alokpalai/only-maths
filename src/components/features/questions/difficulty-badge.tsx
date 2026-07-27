import { Badge } from "@/components/ui/badge";
import { DIFFICULTY_CONFIG, type Difficulty } from "@/components/shared/status";
import { cn } from "@/lib/utils";

export function DifficultyBadge({
  difficulty,
  className,
}: {
  difficulty: Difficulty;
  className?: string;
}) {
  const config = DIFFICULTY_CONFIG[difficulty];
  return (
    <Badge variant="outline" className={cn("border-transparent", config.badgeClassName, className)}>
      {config.label}
    </Badge>
  );
}
