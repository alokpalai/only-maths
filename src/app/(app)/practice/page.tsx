"use client";

import { useMemo, useState } from "react";
import { Bookmark, Flag, Lightbulb, SkipForward } from "lucide-react";
import { toast } from "sonner";

import { Math } from "@/components/math";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { DifficultyBadge } from "@/components/features/questions/difficulty-badge";
import {
  QuestionPalette,
  type PaletteItem,
  type PaletteQuestionState,
} from "@/components/features/questions/question-palette";

const TOTAL_QUESTIONS = 12;

const MOCK_QUESTION = {
  text: "Evaluate \\int_0^{\\pi/2} \\sin^3 x \\cos^2 x \\, dx using reduction formulae.",
  difficulty: "medium" as const,
  marks: 5,
  topic: "Integration Techniques",
  options: [
    { key: "a", tex: "\\dfrac{2}{15}" },
    { key: "b", tex: "\\dfrac{4}{15}" },
    { key: "c", tex: "\\dfrac{1}{5}" },
    { key: "d", tex: "\\dfrac{2}{5}" },
  ],
  hints: [
    "Split \\sin^3 x = \\sin x (1 - \\cos^2 x) so the integral is in terms of \\cos x only.",
    "Substitute u = \\cos x, du = -\\sin x\\,dx.",
  ],
};

function makePalette(current: number, answered: Set<number>, review: Set<number>) {
  return Array.from({ length: TOTAL_QUESTIONS }, (_, i) => {
    const number = i + 1;
    let state: PaletteQuestionState = "unanswered";
    if (number === current) state = "current";
    else if (review.has(number)) state = "review";
    else if (answered.has(number)) state = "answered";
    return { number, state };
  }) satisfies PaletteItem[];
}

export default function PracticePage() {
  const [current, setCurrent] = useState(1);
  const [answered, setAnswered] = useState<Set<number>>(new Set());
  const [review, setReview] = useState<Set<number>>(new Set());
  const [selected, setSelected] = useState<string | null>(null);
  const [hintsShown, setHintsShown] = useState(0);

  const palette = useMemo(
    () => makePalette(current, answered, review),
    [current, answered, review],
  );

  function goTo(number: number) {
    setCurrent(number);
    setSelected(null);
    setHintsShown(0);
  }

  function submit() {
    if (!selected) return;
    setAnswered((prev) => new Set(prev).add(current));
    toast.success("Answer submitted");
    if (current < TOTAL_QUESTIONS) goTo(current + 1);
  }

  function skip() {
    if (current < TOTAL_QUESTIONS) goTo(current + 1);
  }

  function toggleReview() {
    setReview((prev) => {
      const next = new Set(prev);
      if (next.has(current)) next.delete(current);
      else next.add(current);
      return next;
    });
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_260px]">
      <div className="min-w-0 space-y-6">
        <div className="flex items-center justify-between gap-2">
          <div>
            <p className="text-muted-foreground text-xs">{MOCK_QUESTION.topic}</p>
            <p className="text-foreground text-sm font-medium">
              Question {current} of {TOTAL_QUESTIONS}
            </p>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon-sm"
              aria-pressed={review.has(current)}
              aria-label="Mark for review"
              onClick={toggleReview}
            >
              <Flag
                className={review.has(current) ? "fill-warning text-warning size-4" : "size-4"}
              />
            </Button>
            <Button variant="ghost" size="icon-sm" aria-label="Bookmark question">
              <Bookmark className="size-4" />
            </Button>
          </div>
        </div>

        <div className="border-border bg-card space-y-4 rounded-xl border p-5">
          <div className="flex flex-wrap items-center gap-1.5">
            <DifficultyBadge difficulty={MOCK_QUESTION.difficulty} />
            <Badge variant="outline">{MOCK_QUESTION.marks} Marks</Badge>
          </div>

          <div className="text-foreground overflow-x-auto text-sm">
            <Math tex={MOCK_QUESTION.text} />
          </div>

          <RadioGroup value={selected ?? undefined} onValueChange={setSelected}>
            {MOCK_QUESTION.options.map((option) => (
              <label
                key={option.key}
                className="hover:bg-muted/50 border-border flex cursor-pointer items-center gap-3 rounded-lg border p-3"
              >
                <RadioGroupItem value={option.key} />
                <span className="text-muted-foreground text-xs uppercase">{option.key}</span>
                <Math tex={option.tex} />
              </label>
            ))}
          </RadioGroup>

          {hintsShown > 0 && (
            <div className="bg-info/5 border-info/20 space-y-2 rounded-lg border p-3">
              {MOCK_QUESTION.hints.slice(0, hintsShown).map((hint, i) => (
                <p key={i} className="text-foreground text-sm">
                  <span className="text-info font-medium">Hint {i + 1}: </span>
                  <Math tex={hint} />
                </p>
              ))}
            </div>
          )}

          <div className="border-border flex flex-wrap items-center gap-2 border-t pt-4">
            <Button
              variant="outline"
              size="sm"
              disabled={hintsShown >= MOCK_QUESTION.hints.length}
              onClick={() => setHintsShown((h) => h + 1)}
            >
              <Lightbulb className="size-4" />
              Hint
            </Button>
            <Button size="sm" onClick={submit} disabled={!selected}>
              Submit Answer
            </Button>
            <Button variant="ghost" size="sm" onClick={skip}>
              <SkipForward className="size-4" />
              Skip
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            size="sm"
            disabled={current === 1}
            onClick={() => goTo(current - 1)}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            disabled={current === TOTAL_QUESTIONS}
            onClick={() => goTo(current + 1)}
          >
            Next
          </Button>
        </div>
      </div>

      <aside className="hidden lg:block">
        <div className="border-border bg-card sticky top-20 space-y-3 rounded-xl border p-4">
          <p className="text-foreground text-sm font-medium">Session</p>
          <QuestionPalette items={palette} onSelect={goTo} />
        </div>
      </aside>
    </div>
  );
}
