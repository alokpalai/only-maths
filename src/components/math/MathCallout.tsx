import { AlertTriangle, Info, Lightbulb } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export type MathCalloutVariant = "mistake" | "tip" | "info";

const VARIANT_CONFIG: Record<
  MathCalloutVariant,
  { label: string; icon: typeof Info; className: string; iconClassName: string }
> = {
  mistake: {
    label: "Common mistake",
    icon: AlertTriangle,
    className: "border-destructive/20 bg-destructive/5",
    iconClassName: "text-destructive",
  },
  tip: {
    label: "Exam tip",
    icon: Lightbulb,
    className: "border-warning/20 bg-warning/5",
    iconClassName: "text-warning",
  },
  info: {
    label: "Note",
    icon: Info,
    className: "border-info/20 bg-info/5",
    iconClassName: "text-info",
  },
};

export type MathCalloutProps = {
  variant: MathCalloutVariant;
  children: ReactNode;
  className?: string;
};

export function MathCallout({ variant, children, className }: MathCalloutProps) {
  const config = VARIANT_CONFIG[variant];
  const Icon = config.icon;
  return (
    <div className={cn("flex gap-3 rounded-xl border p-4", config.className, className)}>
      <Icon className={cn("mt-0.5 size-4 shrink-0", config.iconClassName)} aria-hidden="true" />
      <div className="space-y-1 text-sm">
        <p className="text-foreground font-medium">{config.label}</p>
        <p className="text-muted-foreground">{children}</p>
      </div>
    </div>
  );
}
