import { ContinueLearningCard } from "@/components/features/dashboard/continue-learning-card";
import { RecentActivityCard } from "@/components/features/dashboard/recent-activity-card";
import { RecommendedPracticeCard } from "@/components/features/dashboard/recommended-practice-card";
import { StatsGrid } from "@/components/features/dashboard/stats-grid";
import { TodaysGoalCard } from "@/components/features/dashboard/todays-goal-card";
import { WeakTopicsCard } from "@/components/features/dashboard/weak-topics-card";
import { WeeklyActivityChart } from "@/components/features/dashboard/weekly-activity-chart";
import { WelcomeArea } from "@/components/features/dashboard/welcome-area";
import {
  mockContinueLearning,
  mockDashboardStats,
  mockRecentActivity,
  mockRecommendedPractice,
  mockTodaysGoal,
  mockUser,
  mockWeakTopics,
  mockWeeklyActivity,
} from "@/lib/mock-data";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <WelcomeArea name={mockUser.name} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="order-1 lg:order-1 lg:col-span-3 lg:col-start-1">
          <ContinueLearningCard {...mockContinueLearning} />
        </div>

        <div className="order-2 lg:order-3 lg:col-span-1 lg:col-start-3">
          <TodaysGoalCard {...mockTodaysGoal} />
        </div>

        <div className="order-3 lg:order-4 lg:col-span-1 lg:col-start-3">
          <RecommendedPracticeCard practice={mockRecommendedPractice} />
        </div>

        <div className="order-4 lg:order-2 lg:col-span-3 lg:col-start-1">
          <StatsGrid stats={mockDashboardStats} />
        </div>

        <div className="order-5 lg:order-3 lg:col-span-2 lg:col-start-1">
          <WeeklyActivityChart data={mockWeeklyActivity} />
        </div>

        <div className="order-6 lg:order-4 lg:col-span-2 lg:col-start-1">
          <WeakTopicsCard topics={mockWeakTopics} />
        </div>

        <div className="order-7 lg:order-5 lg:col-span-1 lg:col-start-3">
          <RecentActivityCard items={mockRecentActivity} />
        </div>
      </div>
    </div>
  );
}
