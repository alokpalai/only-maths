import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { CardHeading } from "@/components/shared/typography";
import { ProgressBar } from "@/components/shared/progress-bar";
import { Button } from "@/components/ui/button";
import type { SubjectSummary } from "@/types/ui";

export function SubjectCard({ subject }: { subject: SubjectSummary }) {
  return (
    <div className="border-border bg-card flex flex-col justify-between gap-4 rounded-xl border p-4">
      <div className="space-y-3">
        <div className="space-y-0.5">
          {subject.code ? <p className="text-muted-foreground text-xs">{subject.code}</p> : null}
          <CardHeading className="text-base">{subject.name}</CardHeading>
        </div>
        <ProgressBar
          value={subject.progress}
          label={`${subject.progress}% complete`}
          showValue={false}
        />
        <dl className="text-muted-foreground grid grid-cols-3 gap-2 text-xs">
          <div>
            <dt className="text-foreground font-medium">{subject.unitCount}</dt>
            <dd>Units</dd>
          </div>
          <div>
            <dt className="text-foreground font-medium">{subject.chapterCount}</dt>
            <dd>Chapters</dd>
          </div>
          <div>
            <dt className="text-foreground font-medium">{subject.questionCount}</dt>
            <dd>Questions</dd>
          </div>
        </dl>
      </div>
      <Button render={<Link href={`/learn/${subject.slug}`} />} className="w-full">
        Continue
        <ArrowRight className="size-4" />
      </Button>
    </div>
  );
}
