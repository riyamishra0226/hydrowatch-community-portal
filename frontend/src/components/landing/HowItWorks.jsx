import { FaMapMarkerAlt, FaCamera, FaUsers, FaGift } from "react-icons/fa";

const steps = [
  {
    icon: <FaMapMarkerAlt />,
    title: "1. Report",
    desc: "Mark the location of water leakage or pollution on the map.",
  },
  {
    icon: <FaCamera />,
    title: "2. Upload",
    desc: "Attach a photo with a short description of the issue.",
  },
  {
    icon: <FaUsers />,
    title: "3. Community Action",
    desc: "Nearby volunteers and authorities receive the report.",
  },
  {
    icon: <FaGift />,
    title: "4. Earn Rewards",
    desc: "Get points and badges for verified reports.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how"
      className="py-24 bg-gradient-to-b from-blue-50 to-white"
    >
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">
          <p className="uppercase tracking-widest text-blue-600 font-semibold">
            Simple Process
          </p>

          <h2 className="text-5xl font-bold mt-3 text-gray-900">
            How HydroWatch Works
          </h2>

          <p className="text-gray-600 mt-6 max-w-2xl mx-auto text-lg">
            Report issues in just a few clicks and help create a cleaner,
            safer environment for everyone.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8">

          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl p-8 shadow-md hover:shadow-xl transition duration-300 text-center"
            >

              <div className="w-20 h-20 mx-auto rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-3xl mb-6">
                {step.icon}
              </div>

              <h3 className="text-2xl font-semibold mb-4">
                {step.title}
              </h3>

              <p className="text-gray-600 leading-7">
                {step.desc}
              </p>

            </div>
          ))}

        </div>
      </div>
    </section>
  );
}