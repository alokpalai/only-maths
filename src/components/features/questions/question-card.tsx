"use client";

import { useState } from "react";
import Link from "next/link";
import { Bookmark, CheckCircle2 } from "lucide-react";

import { Math } from "@/components/math";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DifficultyBadge } from "@/components/features/questions/difficulty-badge";
import type { QuestionPreview } from "@/types/ui";
import { cn } from "@/lib/utils";

const TYPE_LABEL: Record<QuestionPreview["type"], string> = {
  mcq: "MCQ",
  numerical: "Numerical",
  short: "Short Answer",
  proof: "Proof",
};

export function QuestionCard({ question, href }: { question: QuestionPreview; href: string }) {
  const [bookmarked, setBookmarked] = useState(question.bookmarked);

  return (
    <div className="border-border bg-card space-y-3 rounded-xl border p-4">
      <div className="flex items-start justify-between gap-2">
        <div className="text-foreground min-w-0 flex-1 overflow-x-auto text-sm">
          <Math tex={question.text} />
        </div>
        <button
          type="button"
          onClick={() => setBookmarked((v) => !v)}
          aria-label={bookmarked ? "Remove bookmark" : "Bookmark question"}
          aria-pressed={bookmarked}
          className="text-muted-foreground hover:text-foreground shrink-0"
        >
          <Bookmark className={cn("size-4", bookmarked && "fill-primary text-primary")} />
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-1.5">
        <DifficultyBadge difficulty={question.difficulty} />
        <Badge variant="outline">{TYPE_LABEL[question.type]}</Badge>
        <Badge variant="outline">{question.marks} Marks</Badge>
        {question.source ? (
          <Badge variant="outline">
            {question.source} {question.year}
          </Badge>
        ) : null}
        {question.solved ? (
          <span className="text-success ml-auto inline-flex items-center gap-1 text-xs font-medium">
            <CheckCircle2 className="size-3.5" /> Solved
          </span>
        ) : null}
      </div>

      <div className="flex items-center justify-between gap-2">
        <span className="text-muted-foreground text-xs">{question.topic}</span>
        <Button size="sm" render={<Link href={href} />}>
          {question.solved ? "View Solution" : "Start Solving"}
        </Button>
      </div>
    </div>
  );
}
