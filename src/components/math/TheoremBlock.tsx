import { Math } from "@/components/math/Math";
import { cn } from "@/lib/utils";

export type TheoremBlockProps = {
  name: string;
  statement: string;
  formula?: string;
  className?: string;
};

export function TheoremBlock({ name, statement, formula, className }: TheoremBlockProps) {
  return (
    <div className={cn("border-border bg-card space-y-2 rounded-xl border p-4", className)}>
      <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
        Theorem — {name}
      </p>
      <p className="text-foreground text-sm">{statement}</p>
      {formula ? (
        <div className="bg-muted/50 overflow-x-auto rounded-lg px-3 py-3">
          <Math tex={formula} display />
        </div>
      ) : null}
    </div>
  );
}
