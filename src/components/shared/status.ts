import { CheckCircle2, Circle, Flag, Lock, Loader2, XCircle, type LucideIcon } from "lucide-react";

import type { Difficulty, LearningState, MasteryState } from "@/types/ui";

export type { Difficulty, LearningState, MasteryState };

/**
 * Central mapping from learning-domain states to design tokens + icons, so no
 * component invents its own colour for "correct" vs "in review" etc. Primary
 * (brand green) is reserved for interactive controls — status colour always
 * comes from --success/--warning/--info/--destructive/--muted instead.
 */
export const LEARNING_STATE_CONFIG: Record<
  LearningState,
  { label: string; icon: LucideIcon; badgeClassName: string; dotClassName: string }
> = {
  correct: {
    label: "Correct",
    icon: CheckCircle2,
    badgeClassName: "bg-success/10 text-success",
    dotClassName: "bg-success",
  },
  incorrect: {
    label: "Incorrect",
    icon: XCircle,
    badgeClassName: "bg-destructive/10 text-destructive",
    dotClassName: "bg-destructive",
  },
  unanswered: {
    label: "Unanswered",
    icon: Circle,
    badgeClassName: "bg-muted text-muted-foreground",
    dotClassName: "bg-muted-foreground/40",
  },
  review: {
    label: "Marked for review",
    icon: Flag,
    badgeClassName: "bg-warning/10 text-warning",
    dotClassName: "bg-warning",
  },
  completed: {
    label: "Completed",
    icon: CheckCircle2,
    badgeClassName: "bg-success/10 text-success",
    dotClassName: "bg-success",
  },
  "in-progress": {
    label: "In progress",
    icon: Loader2,
    badgeClassName: "bg-info/10 text-info",
    dotClassName: "bg-info",
  },
  locked: {
    label: "Locked",
    icon: Lock,
    badgeClassName: "bg-muted text-muted-foreground",
    dotClassName: "bg-muted-foreground/40",
  },
};

export const MASTERY_STATE_CONFIG: Record<MasteryState, { label: string; badgeClassName: string }> =
  {
    not_started: { label: "Not started", badgeClassName: "bg-muted text-muted-foreground" },
    learning: { label: "Learning", badgeClassName: "bg-info/10 text-info" },
    practising: { label: "Practising", badgeClassName: "bg-warning/10 text-warning" },
    proficient: { label: "Proficient", badgeClassName: "bg-primary/10 text-primary" },
    mastered: { label: "Mastered", badgeClassName: "bg-success/10 text-success" },
  };

export const DIFFICULTY_CONFIG: Record<Difficulty, { label: string; badgeClassName: string }> = {
  easy: { label: "Easy", badgeClassName: "bg-success/10 text-success" },
  medium: { label: "Medium", badgeClassName: "bg-warning/10 text-warning" },
  hard: { label: "Hard", badgeClassName: "bg-destructive/10 text-destructive" },
};
