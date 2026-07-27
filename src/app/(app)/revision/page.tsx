import Link from "next/link";

import { PageHeader } from "@/components/shared/page-header";
import { EmptyState } from "@/components/shared/empty-state";
import { Button } from "@/components/ui/button";

export default function RevisionPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Revision"
        description="Bookmarked questions, formulas, and topics saved for later review."
      />
      <EmptyState
        title="No saved items yet"
        description="Questions, formulas, and topics you bookmark will appear here for quick revision."
        action={
          <Button variant="outline" render={<Link href="/learn" />}>
            Explore Topics
          </Button>
        }
      />
    </div>
  );
}
