import {
  FaTint,
  FaUsers,
  FaGift,
  FaChartLine,
} from "react-icons/fa";

const features = [
  {
    icon: <FaTint className="text-4xl text-sky-600" />,
    title: "Report Water Issues",
    description:
      "Report water leakage, pollution, illegal water usage and other issues directly from your location.",
  },
  {
    icon: <FaUsers className="text-4xl text-green-600" />,
    title: "Community Participation",
    description:
      "Join local campaigns, collaborate with volunteers and make your city cleaner.",
  },
  {
    icon: <FaGift className="text-4xl text-yellow-500" />,
    title: "Earn Rewards",
    description:
      "Receive reward points and badges for reporting genuine water-related issues.",
  },
  {
    icon: <FaChartLine className="text-4xl text-purple-600" />,
    title: "Live Dashboard",
    description:
      "Track reports, monitor progress and visualize city-wise water statistics in real time.",
  },
];

function Features() {
  return (
    <section className="py-24 bg-white">

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center">

          <p className="text-sky-600 font-semibold uppercase tracking-widest">
            Why Choose HydroWatch
          </p>

          <h2 className="text-5xl font-bold text-slate-900 mt-3">
            Everything You Need to Protect Water
          </h2>

          <p className="text-gray-600 mt-5 max-w-2xl mx-auto">
            HydroWatch empowers citizens to report water issues,
            participate in campaigns, earn rewards and help build
            smarter, cleaner communities.
          </p>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-20">

          {features.map((feature, index) => (

            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg p-8 border hover:-translate-y-3 hover:shadow-2xl transition duration-300"
            >

              <div className="w-16 h-16 rounded-full bg-sky-100 flex items-center justify-center">
                {feature.icon}
              </div>

              <h3 className="text-2xl font-semibold mt-6">
                {feature.title}
              </h3>

              <p className="text-gray-600 mt-4 leading-7">
                {feature.description}
              </p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default Features;