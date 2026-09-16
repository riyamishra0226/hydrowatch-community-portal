import { useEffect, useMemo, useState } from "react";
import { FiAward, FiDroplet, FiFlag, FiTrendingUp, FiUsers } from "react-icons/fi";
import DashboardLayout from "../components/layout/DashboardLayout";
import { getLeaderboard } from "../services/leaderboardApi";
import useAuth from "../hooks/useAuth";

const getLevel = (points = 0) => Math.floor(points / 100) + 1;
const getProgress = (points = 0) => points % 100;

const getLevelName = (level) => {
  if (level >= 5) return "Water Champion";
  if (level >= 4) return "Water Guardian";
  if (level >= 3) return "Community Hero";
  if (level >= 2) return "Water Supporter";
  return "New Contributor";
};

function LeaderboardPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    let active = true;
    setLoading(true);
    getLeaderboard()
      .then((res) => {
        if (active) setUsers(Array.isArray(res.data) ? res.data : []);
      })
      .catch((err) => {
        console.error(err);
        if (active) setError(err.response?.data?.message || "Failed to load leaderboard");
      })
      .finally(() => active && setLoading(false));

    return () => { active = false; };
  }, []);

  const currentIndex = users.findIndex((item) => item._id === user?._id);
  const currentUser = currentIndex >= 0 ? users[currentIndex] : null;
  const topThree = users.slice(0, 3);

  const communityStats = useMemo(() => ({
    members: users.length,
    totalPoints: users.reduce((sum, item) => sum + (item.points || 0), 0),
    totalReports: users.reduce((sum, item) => sum + (item.reports || 0), 0),
  }), [users]);

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-6">
        <section className="rounded-3xl bg-gradient-to-r from-sky-700 to-blue-700 text-white p-7 md:p-9 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">
            <div>
              <p className="text-sky-100 text-sm font-semibold uppercase tracking-wider">Community impact</p>
              <h1 className="text-3xl md:text-4xl font-bold mt-2">Community Leaderboard 🏆</h1>
              <p className="text-sky-50 mt-2 max-w-2xl">See how citizens are contributing to better water management through reports and community campaigns.</p>
            </div>
            <div className="flex items-center gap-2 text-sm bg-white/10 rounded-full px-4 py-2 w-fit">
              <FiAward /> All-time ranking
            </div>
          </div>
        </section>

        {loading ? (
          <div className="bg-white border rounded-2xl p-12 text-center text-gray-500">Loading community rankings...</div>
        ) : error ? (
          <div className="bg-red-50 border border-red-100 text-red-700 rounded-2xl p-5">{error}</div>
        ) : (
          <>
            {currentUser && (
              <section className="bg-white border rounded-2xl p-5 md:p-6 shadow-sm">
                <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                  <div className="flex items-center gap-4 min-w-52">
                    <div className="h-14 w-14 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center text-xl font-bold">#{currentIndex + 1}</div>
                    <div>
                      <p className="text-sm text-gray-500">Your current rank</p>
                      <h2 className="text-xl font-bold">{currentUser.name}</h2>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 flex-1">
                    <Stat icon={<FiTrendingUp />} label="Points" value={currentUser.points || 0} />
                    <Stat icon={<FiAward />} label="Level" value={`Lv. ${getLevel(currentUser.points)}`} />
                    <Stat icon={<FiDroplet />} label="Reports" value={currentUser.reports || 0} />
                    <Stat icon={<FiFlag />} label="Campaigns" value={currentUser.campaigns || 0} />
                  </div>
                </div>
                <div className="mt-5">
                  <div className="flex justify-between text-sm mb-2"><span className="font-medium">{getLevelName(getLevel(currentUser.points))}</span><span className="text-gray-500">{100 - getProgress(currentUser.points)} points to next level</span></div>
                  <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden"><div className="h-full bg-sky-600 rounded-full transition-all" style={{ width: `${getProgress(currentUser.points)}%` }} /></div>
                </div>
              </section>
            )}

            <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <SummaryCard icon={<FiUsers />} label="Community members" value={communityStats.members} />
              <SummaryCard icon={<FiAward />} label="Points earned" value={communityStats.totalPoints} />
              <SummaryCard icon={<FiDroplet />} label="Reports contributed" value={communityStats.totalReports} />
            </section>

            {topThree.length > 0 && (
              <section className="bg-white border rounded-2xl p-5 md:p-7 shadow-sm">
                <h2 className="text-xl font-bold mb-5">Top contributors</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                  {topThree.map((item, index) => <PodiumCard key={item._id} item={item} rank={index + 1} current={item._id === user?._id} />)}
                </div>
              </section>
            )}

            <section className="bg-white border rounded-2xl shadow-sm overflow-hidden">
              <div className="p-5 md:p-6 border-b"><h2 className="text-xl font-bold">Community rankings</h2><p className="text-sm text-gray-500 mt-1">Rankings use real points stored in the system, with reports and campaigns as secondary contribution signals.</p></div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[720px]">
                  <thead className="bg-sky-50 text-gray-700"><tr><th className="p-4 text-left">Rank</th><th className="p-4 text-left">Community member</th><th className="p-4 text-left">Level</th><th className="p-4 text-right">Reports</th><th className="p-4 text-right">Campaigns</th><th className="p-4 text-right">Points</th></tr></thead>
                  <tbody>
                    {users.map((item, index) => {
                      const level = getLevel(item.points);
                      const isCurrent = item._id === user?._id;
                      return <tr key={item._id} className={`border-t ${isCurrent ? "bg-sky-50" : "hover:bg-gray-50"}`}>
                        <td className="p-4 font-bold">{index < 3 ? ["🥇", "🥈", "🥉"][index] : `#${index + 1}`}</td>
                        <td className="p-4"><div className="flex items-center gap-3"><div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center font-semibold text-gray-600">{item.name?.charAt(0)?.toUpperCase() || "U"}</div><div><p className="font-semibold">{item.name}{isCurrent && <span className="ml-2 text-xs bg-sky-100 text-sky-700 px-2 py-1 rounded-full">You</span>}</p><p className="text-xs text-gray-500">{getLevelName(level)}</p></div></div></td>
                        <td className="p-4"><span className="inline-flex px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 text-sm font-medium">Level {level}</span></td>
                        <td className="p-4 text-right">{item.reports || 0}</td>
                        <td className="p-4 text-right">{item.campaigns || 0}</td>
                        <td className="p-4 text-right font-bold text-sky-700">{item.points || 0}</td>
                      </tr>;
                    })}
                    {!users.length && <tr><td colSpan="6" className="p-12 text-center text-gray-500">No community members have earned points yet.</td></tr>}
                  </tbody>
                </table>
              </div>
            </section>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}

function Stat({ icon, label, value }) {
  return <div className="flex items-center gap-3"><div className="h-10 w-10 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center">{icon}</div><div><p className="text-xs text-gray-500">{label}</p><p className="text-lg font-bold">{value}</p></div></div>;
}

function SummaryCard({ icon, label, value }) {
  return <div className="bg-white border rounded-2xl p-5 shadow-sm"><div className="flex items-center justify-between"><div><p className="text-sm text-gray-500">{label}</p><p className="text-2xl font-bold mt-1">{value}</p></div><div className="h-11 w-11 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center">{icon}</div></div></div>;
}

function PodiumCard({ item, rank, current }) {
  const level = getLevel(item.points);
  const medal = ["🥇", "🥈", "🥉"][rank - 1];
  return <div className={`border rounded-2xl p-5 text-center ${rank === 1 ? "md:-translate-y-2 border-yellow-200 bg-yellow-50/50" : "bg-gray-50"} ${current ? "ring-2 ring-sky-200" : ""}`}>
    <div className="text-4xl">{medal}</div>
    <div className="h-14 w-14 rounded-full bg-white border mx-auto mt-3 flex items-center justify-center text-xl font-bold text-gray-700">{item.name?.charAt(0)?.toUpperCase() || "U"}</div>
    <h3 className="font-bold mt-3">{item.name}</h3>
    {current && <span className="inline-block mt-1 text-xs bg-sky-100 text-sky-700 px-2 py-1 rounded-full">You</span>}
    <p className="text-sm text-gray-500 mt-2">Level {level} · {item.reports || 0} reports</p>
    <p className="text-2xl font-bold text-sky-700 mt-2">{item.points || 0}</p>
    <p className="text-xs text-gray-500">points</p>
  </div>;
}

export default LeaderboardPage;
