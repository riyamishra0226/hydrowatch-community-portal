import { useEffect, useState } from "react";
import { getPublicStats } from "../../api/publicApi";

const initialStats = [
  { key: "totalReports", title: "Issues Reported" },
  { key: "communityMembers", title: "Community Members" },
  { key: "activeIssues", title: "Active Issues" },
  { key: "resolvedIssues", title: "Issues Resolved" },
];

const formatNumber = (value) => new Intl.NumberFormat("en-IN").format(value || 0);

const Statistics = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    getPublicStats()
      .then((response) => setStats(response.data))
      .catch((error) => console.error("Landing statistics:", error));
  }, []);

  return (
    <section className="py-20 bg-blue-600 text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
          {initialStats.map((item) => (
            <div key={item.key}>
              <h2 className="text-4xl md:text-5xl font-bold mb-3">
                {stats ? formatNumber(stats[item.key]) : "—"}
              </h2>
              <p className="text-lg">{item.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statistics;
