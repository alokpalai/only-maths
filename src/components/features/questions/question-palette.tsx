import { cn } from "@/lib/utils";

export type PaletteQuestionState = "current" | "answered" | "unanswered" | "review";

const STATE_CLASSES: Record<PaletteQuestionState, string> = {
  current:
    "bg-primary text-primary-foreground ring-2 ring-primary ring-offset-2 ring-offset-background",
  answered: "bg-success text-success-foreground",
  unanswered: "border border-border text-muted-foreground",
  review: "bg-warning text-warning-foreground",
};

export type PaletteItem = {
  number: number;
  state: PaletteQuestionState;
};

export function QuestionPalette({
  items,
  onSelect,
  className,
}: {
  items: PaletteItem[];
  onSelect?: (number: number) => void;
  className?: string;
}) {
  return (
    <div className={cn("space-y-3", className)}>
      <div className="grid grid-cols-5 gap-2">
        {items.map((item) => (
          <button
            key={item.number}
            type="button"
            onClick={() => onSelect?.(item.number)}
            aria-current={item.state === "current" ? "step" : undefined}
            aria-label={`Question ${item.number} — ${item.state}`}
            className={cn(
              "flex size-9 items-center justify-center rounded-lg text-xs font-medium transition-colors",
              STATE_CLASSES[item.state],
            )}
          >
            {item.number}
          </button>
        ))}
      </div>
      <div className="text-muted-foreground grid grid-cols-2 gap-x-3 gap-y-1.5 text-xs">
        <Legend swatchClassName="bg-success" label="Answered" />
        <Legend swatchClassName="border border-border" label="Unanswered" />
        <Legend swatchClassName="bg-warning" label="Marked for review" />
        <Legend swatchClassName="bg-primary" label="Current" />
      </div>
    </div>
  );
}

function Legend({ swatchClassName, label }: { swatchClassName: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className={cn("size-2.5 shrink-0 rounded-sm", swatchClassName)} />
      {label}
    </span>
  );
}
