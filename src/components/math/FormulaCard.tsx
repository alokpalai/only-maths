"use client";

import { useState } from "react";
import { Bookmark } from "lucide-react";

import { Math } from "@/components/math/Math";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type FormulaCardProps = {
  name: string;
  latex: string;
  explanation?: string;
  variables?: string[];
  conditions?: string[];
  topic?: string;
  bookmarked?: boolean;
  className?: string;
};

export function FormulaCard({
  name,
  latex,
  explanation,
  variables,
  conditions,
  topic,
  bookmarked = false,
  className,
}: FormulaCardProps) {
  const [saved, setSaved] = useState(bookmarked);

  return (
    <div className={cn("border-border bg-card space-y-3 rounded-xl border p-4", className)}>
      <div className="flex items-start justify-between gap-2">
        <div className="space-y-0.5">
          <h3 className="text-foreground text-sm font-semibold">{name}</h3>
          {topic ? <p className="text-muted-foreground text-xs">{topic}</p> : null}
        </div>
        <Button
          variant="ghost"
          size="icon-sm"
          aria-label={saved ? "Remove bookmark" : "Bookmark formula"}
          aria-pressed={saved}
          onClick={() => setSaved((v) => !v)}
        >
          <Bookmark className={cn("size-4", saved && "fill-primary text-primary")} />
        </Button>
      </div>

      <div className="bg-muted/50 overflow-x-auto rounded-lg px-3 py-3">
        <Math tex={latex} display />
      </div>

      {explanation ? <p className="text-muted-foreground text-sm">{explanation}</p> : null}

      {variables && variables.length > 0 ? (
        <div className="text-xs">
          <span className="text-foreground font-medium">Variables: </span>
          <span className="text-muted-foreground">{variables.join(", ")}</span>
        </div>
      ) : null}

      {conditions && conditions.length > 0 ? (
        <div className="text-xs">
          <span className="text-foreground font-medium">Conditions: </span>
          <span className="text-muted-foreground">{conditions.join(", ")}</span>
        </div>
      ) : null}
    </div>
  );
}
