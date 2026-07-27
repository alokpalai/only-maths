import { PageHeader } from "@/components/shared/page-header";
import { EmptyState } from "@/components/shared/empty-state";
import { SubjectCard } from "@/components/features/learning/subject-card";
import { mockSubjects } from "@/lib/mock-data";

export default function LearnPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Learn"
        description="Explore your mathematics subjects and continue where you left off."
      />

      {mockSubjects.length === 0 ? (
        <EmptyState
          title="No subjects yet"
          description="Once you complete onboarding, your enrolled subjects will show up here."
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {mockSubjects.map((subject) => (
            <SubjectCard key={subject.id} subject={subject} />
          ))}
        </div>
      )}
    </div>
  );
}
