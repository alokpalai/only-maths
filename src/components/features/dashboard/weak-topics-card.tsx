import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { CardHeading } from "@/components/shared/typography";
import { ProgressBar } from "@/components/shared/progress-bar";
import type { WeakTopic } from "@/types/ui";

export function WeakTopicsCard({ topics }: { topics: WeakTopic[] }) {
  return (
    <div className="border-border bg-card space-y-4 rounded-xl border p-4">
      <CardHeading>Weak Topics</CardHeading>
      <ul className="space-y-3">
        {topics.map((topic) => (
          <li key={topic.id}>
            <Link
              href="/practice"
              className="hover:bg-muted/50 group -mx-1 flex items-center gap-3 rounded-lg px-1 py-1"
            >
              <div className="min-w-0 flex-1">
                <ProgressBar
                  label={topic.name}
                  value={topic.accuracyPercent}
                  showValue
                  className="[&_[data-slot=progress-indicator]]:bg-warning"
                />
              </div>
              <ChevronRight
                className="text-muted-foreground group-hover:text-foreground size-4 shrink-0"
                aria-hidden="true"
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
