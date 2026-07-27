import { Search } from "lucide-react";

import { PageHeader } from "@/components/shared/page-header";
import { EmptyState } from "@/components/shared/empty-state";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { QuestionCard } from "@/components/features/questions/question-card";
import { mockQuestions } from "@/lib/mock-data";

export default function PyqsPage() {
  const pyqs = mockQuestions.filter((q) => q.source);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Previous Year Questions"
        description="Paper-wise and topic-wise PYQs from DTU examinations."
      />

      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
          <Input placeholder="Search PYQs by topic or year..." className="pl-9" />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="sm:w-40">
            <SelectValue placeholder="Year" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All years</SelectItem>
            <SelectItem value="2025">2025</SelectItem>
            <SelectItem value="2024">2024</SelectItem>
            <SelectItem value="2023">2023</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {pyqs.length === 0 ? (
        <EmptyState title="No PYQs found" description="Try a different year or search term." />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {pyqs.map((q) => (
            <QuestionCard key={q.id} question={q} href="/practice" />
          ))}
        </div>
      )}
    </div>
  );
}
