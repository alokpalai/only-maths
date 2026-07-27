import Link from "next/link";
import { ArrowRight, FileText, HelpCircle, ListChecks } from "lucide-react";

import { PageHeader } from "@/components/shared/page-header";
import { ProgressBar } from "@/components/shared/progress-bar";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { mockSubjectDetail } from "@/lib/mock-data";

// Phase 2 mock: every subject slug renders the same representative content —
// real per-subject data fetching starts in Phase 5.
export default async function SubjectPage({ params }: { params: Promise<{ subject: string }> }) {
  await params;
  const subject = mockSubjectDetail;

  return (
    <div className="space-y-6">
      <PageHeader
        title={subject.name}
        description={`Progress: ${subject.progress}%`}
        breadcrumbs={[{ label: "Learn", href: "/learn" }, { label: subject.name }]}
      />

      <ProgressBar value={subject.progress} showValue={false} className="max-w-sm" />

      <Accordion defaultValue={subject.units.map((u) => u.id)}>
        {subject.units.map((unit) => (
          <AccordionItem key={unit.id} value={unit.id}>
            <AccordionTrigger>{unit.name}</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3">
                {unit.chapters.map((chapter) => (
                  <div
                    key={chapter.id}
                    className="border-border bg-card flex flex-col gap-3 rounded-xl border p-4 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="min-w-0 flex-1 space-y-2">
                      <p className="text-foreground text-sm font-medium">{chapter.name}</p>
                      <div className="text-muted-foreground flex flex-wrap items-center gap-3 text-xs">
                        <span className="inline-flex items-center gap-1">
                          <ListChecks className="size-3.5" /> {chapter.topicCount} Topics
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <HelpCircle className="size-3.5" /> {chapter.questionCount} Questions
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <FileText className="size-3.5" /> {chapter.pyqPaperCount} PYQ Papers
                        </span>
                        <span>{chapter.testCount} Tests</span>
                      </div>
                      <ProgressBar value={chapter.progress} showValue className="max-w-[220px]" />
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="shrink-0"
                      render={
                        <Link
                          href={`/learn/${subject.slug}/${chapter.slug}/first-order-differential-equations`}
                        />
                      }
                    >
                      Continue Learning
                      <ArrowRight className="size-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
