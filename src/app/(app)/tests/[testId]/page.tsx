"use client";

import { use, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Clock, Flag } from "lucide-react";
import { toast } from "sonner";

import { Math } from "@/components/math";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  QuestionPalette,
  type PaletteItem,
  type PaletteQuestionState,
} from "@/components/features/questions/question-palette";
import { mockTests } from "@/lib/mock-data";

const MOCK_QUESTION_TEXT =
  "Find the eigenvalues of A = \\begin{pmatrix} 2 & 1 \\\\ 1 & 2 \\end{pmatrix}.";
const OPTIONS = [
  { key: "a", tex: "1, 3" },
  { key: "b", tex: "2, 2" },
  { key: "c", tex: "0, 4" },
  { key: "d", tex: "-1, 3" },
];

// Bitwise truncation instead of Math.floor — the `Math` import above is our
// KaTeX component, which shadows the global Math object in this file.
function formatTime(totalSeconds: number) {
  const h = (totalSeconds / 3600) | 0;
  const m = ((totalSeconds % 3600) / 60) | 0;
  const s = totalSeconds % 60;
  return [h, m, s].map((v) => String(v).padStart(2, "0")).join(":");
}

export default function TestAttemptPage({ params }: { params: Promise<{ testId: string }> }) {
  const { testId } = use(params);
  const router = useRouter();
  const test = mockTests.find((t) => t.id === testId) ?? mockTests[0];

  const [current, setCurrent] = useState(1);
  const [answered, setAnswered] = useState<Set<number>>(new Set());
  const [review, setReview] = useState<Set<number>>(new Set());
  const [selected, setSelected] = useState<string | null>(null);
  const [secondsLeft, setSecondsLeft] = useState(test.durationMin * 60);

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsLeft((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const palette = useMemo(
    () =>
      Array.from({ length: test.questionCount }, (_, i) => {
        const number = i + 1;
        let state: PaletteQuestionState = "unanswered";
        if (number === current) state = "current";
        else if (review.has(number)) state = "review";
        else if (answered.has(number)) state = "answered";
        return { number, state };
      }) satisfies PaletteItem[],
    [current, answered, review, test.questionCount],
  );

  function goTo(number: number) {
    setCurrent(number);
    setSelected(null);
  }

  function saveAndNext() {
    if (selected) setAnswered((prev) => new Set(prev).add(current));
    if (current < test.questionCount) goTo(current + 1);
  }

  function toggleReview() {
    setReview((prev) => {
      const next = new Set(prev);
      if (next.has(current)) next.delete(current);
      else next.add(current);
      return next;
    });
  }

  function submitTest() {
    toast.success("Test submitted");
    router.push("/tests");
  }

  return (
    <div className="-mx-4 -my-6 flex min-h-[calc(100dvh-3.5rem)] flex-col sm:-mx-6 lg:-mx-8">
      <div className="bg-background border-border flex flex-col gap-2 border-b px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p className="text-foreground text-sm font-medium">{test.title}</p>
        <div className="text-foreground inline-flex items-center gap-1.5 text-sm font-semibold tabular-nums">
          <Clock className="size-4" />
          {formatTime(secondsLeft)}
        </div>
      </div>

      <div className="grid flex-1 grid-cols-1 gap-6 p-4 sm:p-6 lg:grid-cols-[1fr_280px] lg:p-8">
        <div className="min-w-0 space-y-4">
          <p className="text-muted-foreground text-sm">
            Question {current} of {test.questionCount}
          </p>
          <div className="border-border bg-card space-y-4 rounded-xl border p-5">
            <div className="text-foreground overflow-x-auto text-sm">
              <Math tex={MOCK_QUESTION_TEXT} />
            </div>
            <RadioGroup value={selected ?? undefined} onValueChange={setSelected}>
              {OPTIONS.map((option) => (
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
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={current === 1}
              onClick={() => goTo(current - 1)}
            >
              Previous
            </Button>
            <Button size="sm" onClick={saveAndNext}>
              Save &amp; Next
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={toggleReview}
              aria-pressed={review.has(current)}
            >
              <Flag
                className={review.has(current) ? "fill-warning text-warning size-4" : "size-4"}
              />
              Mark for Review
            </Button>

            <Dialog>
              <DialogTrigger
                render={<Button variant="destructive" size="sm" className="ml-auto" />}
              >
                Submit Test
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Submit test?</DialogTitle>
                  <DialogDescription>
                    You&apos;ve answered {answered.size} of {test.questionCount} questions. This
                    cannot be undone.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter showCloseButton>
                  <Button variant="destructive" onClick={submitTest}>
                    Submit
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <aside className="hidden lg:block">
          <div className="border-border bg-card sticky top-6 space-y-3 rounded-xl border p-4">
            <p className="text-foreground text-sm font-medium">Question Palette</p>
            <QuestionPalette items={palette} onSelect={goTo} />
          </div>
        </aside>
      </div>
    </div>
  );
}
