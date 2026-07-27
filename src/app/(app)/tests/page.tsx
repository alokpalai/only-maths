import Link from "next/link";
import { Clock, ListChecks } from "lucide-react";

import { PageHeader } from "@/components/shared/page-header";
import { CardHeading } from "@/components/shared/typography";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockTests } from "@/lib/mock-data";

const TYPE_LABEL: Record<(typeof mockTests)[number]["type"], string> = {
  quiz: "Quiz",
  chapter: "Chapter Test",
  unit: "Unit Test",
  subject: "Subject Test",
  mock: "Mock Test",
};

export default function TestsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Tests" description="Timed tests to assess your readiness for exams." />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {mockTests.map((test) => (
          <div key={test.id} className="border-border bg-card space-y-3 rounded-xl border p-4">
            <div className="flex items-start justify-between gap-2">
              <CardHeading className="text-base">{test.title}</CardHeading>
              <Badge variant="outline">{TYPE_LABEL[test.type]}</Badge>
            </div>
            <div className="text-muted-foreground flex items-center gap-4 text-xs">
              <span className="inline-flex items-center gap-1">
                <Clock className="size-3.5" /> {test.durationMin} min
              </span>
              <span className="inline-flex items-center gap-1">
                <ListChecks className="size-3.5" /> {test.questionCount} Questions
              </span>
              <span>{test.totalMarks} Marks</span>
            </div>
            <Button render={<Link href={`/tests/${test.id}`} />} className="w-full">
              Start Test
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
