import { useEffect, useState } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import { getMyRewards } from "../api/reportApi";

function RewardsPage() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    getMyRewards()
      .then((res) => setData(res.data))
      .catch((err) => {
        console.error(err);
        setError(err.response?.data?.message || "Failed to load rewards");
      });
  }, []);

  if (!data && !error) {
    return <DashboardLayout><div className="max-w-5xl mx-auto py-10 text-center text-gray-500">Loading rewards...</div></DashboardLayout>;
  }

  if (error) {
    return <DashboardLayout><div className="max-w-5xl mx-auto py-10 text-center text-red-600">{error}</div></DashboardLayout>;
  }

  const { points, level, progress, pointsToNextLevel, reports, campaigns, badges, history } = data;

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto">
        <div className="mb-7">
          <p className="text-sky-600 font-semibold">COMMUNITY RECOGNITION</p>
          <h1 className="text-3xl font-bold">Rewards & Badges</h1>
          <p className="text-gray-500 mt-1">Earn points through community actions and track your progress.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2 bg-sky-700 text-white rounded-2xl p-7 shadow-sm">
            <div className="flex justify-between items-start gap-4">
              <div><p className="text-sm opacity-80">Current level</p><div className="text-5xl font-bold mt-1">{level}</div></div>
              <div className="text-right"><p className="text-sm opacity-80">Total points</p><div className="text-3xl font-bold">{points}</div></div>
            </div>
            <div className="h-3 bg-white/25 rounded-full mt-7 overflow-hidden"><div className="h-full bg-white rounded-full" style={{ width: `${progress}%` }} /></div>
            <p className="text-sm mt-2 opacity-90">{pointsToNextLevel} points to the next level</p>
          </div>

          <div className="bg-white border rounded-2xl p-6">
            <h2 className="font-bold text-lg">Your activity</h2>
            <div className="grid grid-cols-2 gap-3 mt-4">
              <div className="bg-gray-50 rounded-xl p-4"><p className="text-2xl font-bold">{reports}</p><p className="text-xs text-gray-500">Reports</p></div>
              <div className="bg-gray-50 rounded-xl p-4"><p className="text-2xl font-bold">{campaigns}</p><p className="text-xs text-gray-500">Campaigns</p></div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mt-7">
          <section>
            <h2 className="text-xl font-bold mb-4">Achievements</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {badges.map((badge) => (
                <div key={badge.id} className={`bg-white border rounded-2xl p-5 ${badge.unlocked ? "" : "opacity-45"}`}>
                  <div className="flex items-start gap-3"><span className="text-3xl">{badge.icon}</span><div><h3 className="font-bold">{badge.name}</h3><p className="text-xs text-gray-500 mt-1">{badge.description}</p></div></div>
                  <p className={`text-xs font-semibold mt-4 ${badge.unlocked ? "text-green-600" : "text-gray-400"}`}>{badge.unlocked ? "Unlocked" : "Locked"}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4">Reward History</h2>
            <div className="bg-white border rounded-2xl divide-y">
              {history.length ? history.map((item) => (
                <div key={item._id} className="p-4 flex items-center justify-between gap-4">
                  <div><p className="font-semibold">{item.action}</p><p className="text-xs text-gray-500 mt-1">{item.description}</p><p className="text-xs text-gray-400 mt-1">{new Date(item.createdAt).toLocaleDateString()}</p></div>
                  <span className="font-bold text-green-600 whitespace-nowrap">+{item.points}</span>
                </div>
              )) : <div className="p-8 text-center text-gray-500">No reward activity recorded yet.</div>}
            </div>
          </section>
        </div>

        <div className="mt-7 bg-white border rounded-2xl p-6">
          <h2 className="font-bold text-lg">How to earn points</h2>
          <div className="grid md:grid-cols-2 gap-3 mt-4 text-sm text-gray-600">
            <p>💧 Submit a water issue report — <strong>+10 points</strong></p>
            <p>🌱 Join a campaign — <strong>campaign reward</strong></p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default RewardsPage;
