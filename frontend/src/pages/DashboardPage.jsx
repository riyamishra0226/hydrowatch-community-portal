import { useEffect, useState } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import StatsCard from "../components/dashboard/StatsCard";
import QuickActions from "../components/dashboard/QuickActions";
import RecentReports from "../components/dashboard/RecentReports";
import { getDashboardStats } from "../api/reportApi";

function DashboardPage() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [stats, setStats] = useState({
  reports: 0,
  points: 0,
  campaigns: 0,
  });

  useEffect(() => {
  const fetchStats = async () => {
    try {
      const response = await getDashboardStats(user.id);
      setStats(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  if (user) {
    fetchStats();
  }
}, []);

  return (
    <DashboardLayout>
      <DashboardHeader />

      <div className="mb-8">
        <h2 className="text-2xl font-bold">
          Hello, {user?.name || "User"} 👋
        </h2>

        <p className="text-gray-600 mt-2">
          Here's an overview of your HydroWatch activity.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard
          title="Reports Submitted"
          value={stats.reports}
          color="text-blue-600"
        />

        <StatsCard
          title="Reward Points"
          value={stats.points}
          color="text-green-600"
        />

        <StatsCard
          title="Campaigns Joined"
          value={stats.campaigns}
          color="text-purple-600"
        />
      </div>

      <QuickActions />

      <RecentReports />
    </DashboardLayout>
  );
}

export default DashboardPage;