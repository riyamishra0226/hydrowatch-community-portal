import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPublicCampaigns } from "../../api/publicApi";

const Campaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPublicCampaigns()
      .then((response) => {
        const visible = response.data
          .filter((campaign) => campaign.status === "Upcoming" || campaign.status === "Active")
          .sort((a, b) => new Date(a.date) - new Date(b.date))
          .slice(0, 3);
        setCampaigns(visible);
      })
      .catch((error) => console.error("Landing campaigns:", error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center">
          <p className="text-sky-600 font-semibold uppercase tracking-widest">Community Campaigns</p>
          <h2 className="text-4xl md:text-5xl font-bold mt-3 text-slate-900">Join Our Community Initiatives</h2>
          <p className="text-gray-600 mt-5 max-w-2xl mx-auto">
            Explore the latest HydroWatch campaigns and take part in activities that support responsible water management.
          </p>
        </div>

        {loading ? (
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-slate-50 rounded-2xl p-8 animate-pulse h-64" />
            ))}
          </div>
        ) : campaigns.length ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            {campaigns.map((campaign) => (
              <div key={campaign._id} className="bg-slate-50 rounded-2xl shadow-lg p-8 hover:-translate-y-1 hover:shadow-xl transition duration-300">
                <div className="flex items-start justify-between gap-4">
                  <span className={`text-xs font-semibold rounded-full px-3 py-1 ${campaign.status === "Active" ? "bg-green-100 text-green-700" : "bg-sky-100 text-sky-700"}`}>
                    {campaign.status}
                  </span>
                  <span className="text-sky-700 font-semibold">+{campaign.rewardPoints ?? 0} pts</span>
                </div>
                <h3 className="text-2xl font-bold mt-5 text-slate-900">{campaign.title}</h3>
                <p className="text-gray-600 mt-4 line-clamp-3">{campaign.description}</p>
                <div className="text-sm text-gray-500 mt-5 space-y-1">
                  <p>📍 {campaign.location}</p>
                  <p>📅 {new Date(campaign.date).toLocaleDateString()}</p>
                  <p>👥 {campaign.participantCount || campaign.participants?.length || 0}{campaign.maxParticipants ? ` / ${campaign.maxParticipants}` : ""} participants</p>
                </div>
                <Link to="/campaigns" className="inline-block mt-7 bg-sky-600 text-white px-6 py-3 rounded-xl hover:bg-sky-700 transition">
                  View Campaigns
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-16 bg-slate-50 rounded-2xl p-10 text-center text-gray-500">
            No upcoming or active campaigns are available right now.
          </div>
        )}
      </div>
    </section>
  );
};

export default Campaigns;
