import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PageTitle, SectionHeading } from "@/components/shared/typography";
import { MasteryIndicator } from "@/components/shared/mastery-indicator";
import { DefinitionBlock, FormulaCard, MathCallout, WorkedExample } from "@/components/math";
import { MASTERY_STATE_CONFIG } from "@/components/shared/status";
import { mockTopicDetail } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

// Phase 2 mock: every topic slug renders the same representative content —
// real per-topic data fetching starts in Phase 5.
export default async function TopicPage({
  params,
}: {
  params: Promise<{ subject: string; chapter: string; topic: string }>;
}) {
  const { subject } = await params;
  const topic = mockTopicDetail;

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_260px]">
      <div className="min-w-0 space-y-8">
        <div className="space-y-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink render={<Link href="/learn" />}>Learn</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink render={<Link href={`/learn/${subject}`} />}>
                  {topic.subjectName}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{topic.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="space-y-3">
            <PageTitle>{topic.name}</PageTitle>
            <MasteryIndicator
              topic={topic.chapterName}
              score={topic.masteryScore}
              state={topic.masteryState}
              className="max-w-sm"
            />
          </div>
        </div>

        <section className="space-y-3">
          <SectionHeading>Concept</SectionHeading>
          <p className="text-foreground text-sm leading-relaxed">{topic.concept}</p>
        </section>

        <section className="space-y-3">
          <SectionHeading>Definitions</SectionHeading>
          <div className="space-y-3">
            {topic.definitions.map((def) => (
              <DefinitionBlock key={def.term} term={def.term} body={def.body} />
            ))}
          </div>
        </section>

        <section className="space-y-3">
          <SectionHeading>Key Formula</SectionHeading>
          <FormulaCard
            name={topic.name}
            latex={topic.formulaLatex}
            explanation={topic.formulaMeaning}
          />
        </section>

        <section className="space-y-3">
          <SectionHeading>Worked Example</SectionHeading>
          <WorkedExample problem={topic.workedExample.problem} steps={topic.workedExample.steps} />
        </section>

        <section className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <MathCallout variant="mistake">{topic.commonMistake}</MathCallout>
          <MathCallout variant="tip">{topic.examTip}</MathCallout>
        </section>

        <div className="border-border flex flex-col gap-3 border-t pt-6 sm:flex-row sm:items-center sm:justify-between">
          <Button>
            <CheckCircle2 className="size-4" />
            Mark as Complete
          </Button>
          <Button variant="outline" render={<Link href="/practice" />}>
            Practise This Topic
          </Button>
        </div>
      </div>

      <aside className="space-y-3 lg:sticky lg:top-20 lg:h-fit">
        <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
          In this chapter
        </p>
        <ul className="space-y-1">
          {topic.siblingTopics.map((sibling) => {
            const active = sibling.slug === topic.slug;
            const config = MASTERY_STATE_CONFIG[sibling.mastery];
            return (
              <li key={sibling.id}>
                <Link
                  href={`/learn/${subject}/current-chapter/${sibling.slug}`}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "flex items-center justify-between gap-2 rounded-lg px-2.5 py-2 text-sm",
                    active
                      ? "bg-accent text-accent-foreground font-medium"
                      : "text-muted-foreground hover:bg-accent/60 hover:text-foreground",
                  )}
                >
                  <span className="truncate">{sibling.name}</span>
                  <Badge
                    variant="outline"
                    className={cn("border-transparent text-[10px]", config.badgeClassName)}
                  >
                    {config.label}
                  </Badge>
                </Link>
              </li>
            );
          })}
        </ul>
      </aside>
    </div>
  );
}
