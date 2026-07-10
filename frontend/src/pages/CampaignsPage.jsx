import { useEffect, useState } from "react";
import { getCampaigns } from "../api/reportApi";

function CampaignsPage() {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    try {
      const res = await getCampaigns();
      setCampaigns(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8">
        Community Campaigns
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {campaigns.map((campaign) => (
          <div
            key={campaign._id}
            className="bg-white rounded-xl shadow-md p-6 border"
          >
            <h2 className="text-2xl font-bold mb-3">
              {campaign.title}
            </h2>

            <p className="text-gray-600 mb-3">
              {campaign.description}
            </p>

            <p className="font-semibold">
              📍 {campaign.location}
            </p>

            <p className="mb-4">
              📅 {new Date(campaign.date).toLocaleDateString()}
            </p>

            <button
              className="w-full bg-sky-600 hover:bg-sky-700 text-white py-2 rounded-lg"
            >
              Join Campaign
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CampaignsPage;