import Link from "next/link";

import { CardHeading } from "@/components/shared/typography";
import { Button } from "@/components/ui/button";
import type { RecommendedPractice } from "@/types/ui";

export function RecommendedPracticeCard({ practice }: { practice: RecommendedPractice }) {
  return (
    <div className="border-primary/20 bg-primary/5 space-y-3 rounded-xl border p-4">
      <CardHeading>Recommended Practice</CardHeading>
      <div className="space-y-1">
        <p className="text-foreground text-sm font-semibold">{practice.topic}</p>
        <p className="text-muted-foreground text-sm">{practice.reason}</p>
        <p className="text-muted-foreground text-xs">
          {practice.questionCount} recommended questions
        </p>
      </div>
      <Button render={<Link href="/practice" />} size="sm">
        Start Practice
      </Button>
    </div>
  );
}
