import {
  FaHandsHelping,
  FaTint,
  FaLeaf,
} from "react-icons/fa";

const campaigns = [
  {
    icon: <FaHandsHelping className="text-5xl text-sky-600" />,
    title: "River Clean-Up Drive",
    date: "15 August 2026",
    location: "Basti, Uttar Pradesh",
    description:
      "Join volunteers to clean rivers and spread awareness about water conservation.",
  },
  {
    icon: <FaTint className="text-5xl text-blue-600" />,
    title: "Save Every Drop",
    date: "22 August 2026",
    location: "Lucknow",
    description:
      "A city-wide campaign encouraging responsible water usage and reporting leakages.",
  },
  {
    icon: <FaLeaf className="text-5xl text-green-600" />,
    title: "Rainwater Harvesting Workshop",
    date: "30 August 2026",
    location: "Gorakhpur",
    description:
      "Learn practical rainwater harvesting techniques from environmental experts.",
  },
];

function Campaigns() {
  return (
    <section className="py-24 bg-white">

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center">

          <p className="text-sky-600 font-semibold uppercase tracking-widest">
            Community Campaigns
          </p>

          <h2 className="text-5xl font-bold mt-3 text-slate-900">
            Join Our Upcoming Events
          </h2>

          <p className="text-gray-600 mt-5 max-w-2xl mx-auto">
            Become a part of HydroWatch initiatives and help build cleaner,
            healthier communities through collective action.
          </p>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">

          {campaigns.map((campaign, index) => (

            <div
              key={index}
              className="bg-slate-50 rounded-2xl shadow-lg p-8 hover:-translate-y-2 hover:shadow-xl transition duration-300"
            >

              <div className="mb-6">
                {campaign.icon}
              </div>

              <h3 className="text-2xl font-bold">
                {campaign.title}
              </h3>

              <p className="text-sky-600 mt-2 font-medium">
                📅 {campaign.date}
              </p>

              <p className="text-gray-500">
                📍 {campaign.location}
              </p>

              <p className="text-gray-600 mt-5">
                {campaign.description}
              </p>

              <button className="mt-8 bg-sky-600 text-white px-6 py-3 rounded-xl hover:bg-sky-700 transition">
                Join Campaign
              </button>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default Campaigns;