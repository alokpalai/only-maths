import { Math } from "@/components/math/Math";
import { cn } from "@/lib/utils";

export type WorkedExampleProps = {
  problem: string;
  steps: string[];
  className?: string;
};

export function WorkedExample({ problem, steps, className }: WorkedExampleProps) {
  return (
    <div className={cn("border-border bg-card space-y-4 rounded-xl border p-4", className)}>
      <div className="space-y-1.5">
        <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
          Worked example
        </p>
        <div className="overflow-x-auto">
          <Math tex={problem} display />
        </div>
      </div>
      <ol className="space-y-3">
        {steps.map((step, index) => (
          <li key={index} className="flex gap-3">
            <span className="bg-muted text-muted-foreground mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full text-xs font-medium">
              {index + 1}
            </span>
            <div className="min-w-0 flex-1 overflow-x-auto text-sm">
              <Math tex={step} />
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
