import { CheckCircle2 } from "lucide-react";

import { CardHeading } from "@/components/shared/typography";
import { EmptyState } from "@/components/shared/empty-state";
import type { ActivityItem } from "@/types/ui";

export function RecentActivityCard({ items }: { items: ActivityItem[] }) {
  return (
    <div className="border-border bg-card space-y-4 rounded-xl border p-4">
      <CardHeading>Recent Activity</CardHeading>
      {items.length === 0 ? (
        <EmptyState
          title="No recent activity"
          description="Solve a question or complete a topic to see it here."
        />
      ) : (
        <ul className="space-y-3">
          {items.map((item) => (
            <li key={item.id} className="flex items-start gap-3">
              <CheckCircle2 className="text-success mt-0.5 size-4 shrink-0" aria-hidden="true" />
              <div className="min-w-0 flex-1 space-y-0.5">
                <p className="text-foreground text-sm font-medium">{item.title}</p>
                <p className="text-muted-foreground text-xs">
                  {item.detail} · {item.timestamp}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
