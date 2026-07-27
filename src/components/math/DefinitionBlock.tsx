import { Math } from "@/components/math/Math";
import { cn } from "@/lib/utils";

export type DefinitionBlockProps = {
  term: string;
  body: string;
  formula?: string;
  className?: string;
};

export function DefinitionBlock({ term, body, formula, className }: DefinitionBlockProps) {
  return (
    <div
      className={cn(
        "border-primary/30 bg-muted/30 space-y-2 rounded-r-lg border-l-2 py-2 pl-4",
        className,
      )}
    >
      <p className="text-foreground text-sm font-semibold">{term}</p>
      <p className="text-muted-foreground text-sm">{body}</p>
      {formula ? (
        <div className="overflow-x-auto pt-1">
          <Math tex={formula} display />
        </div>
      ) : null}
    </div>
  );
}
