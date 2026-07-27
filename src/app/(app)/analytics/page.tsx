import { PageHeader } from "@/components/shared/page-header";
import { StatsGrid } from "@/components/features/dashboard/stats-grid";
import { WeeklyActivityChart } from "@/components/features/dashboard/weekly-activity-chart";
import { WeakTopicsCard } from "@/components/features/dashboard/weak-topics-card";
import { mockDashboardStats, mockWeakTopics, mockWeeklyActivity } from "@/lib/mock-data";

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Analytics"
        description="Your study patterns and performance trends across topics."
      />
      <StatsGrid stats={mockDashboardStats} />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <WeeklyActivityChart data={mockWeeklyActivity} />
        <WeakTopicsCard topics={mockWeakTopics} />
      </div>
    </div>
  );
}
