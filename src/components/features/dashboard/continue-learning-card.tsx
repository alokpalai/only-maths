import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { CardHeading } from "@/components/shared/typography";
import { ProgressBar } from "@/components/shared/progress-bar";
import { Button } from "@/components/ui/button";

export type ContinueLearningCardProps = {
  topicName: string;
  subjectName: string;
  progress: number;
  href: string;
};

export function ContinueLearningCard({
  topicName,
  subjectName,
  progress,
  href,
}: ContinueLearningCardProps) {
  return (
    <div className="border-border bg-card rounded-xl border p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0 space-y-2">
          <p className="text-muted-foreground text-xs">{subjectName}</p>
          <CardHeading className="text-base">{topicName}</CardHeading>
          <ProgressBar value={progress} className="max-w-xs" />
        </div>
        <Button render={<Link href={href} />} className="shrink-0">
          Continue Learning
          <ArrowRight className="size-4" />
        </Button>
      </div>
    </div>
  );
}
