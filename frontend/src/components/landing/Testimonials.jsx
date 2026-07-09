import { FaStar } from "react-icons/fa";

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Volunteer",
    review:
      "HydroWatch made reporting water leakage incredibly simple. I love contributing to my community.",
  },
  {
    name: "Rahul Verma",
    role: "Student",
    review:
      "The reward system motivates people to report genuine issues. Great initiative!",
  },
  {
    name: "Ananya Singh",
    role: "Resident",
    review:
      "I reported a leaking pipeline and it was resolved quickly. Amazing platform.",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">
          <p className="uppercase tracking-widest text-blue-600 font-semibold">
            Testimonials
          </p>

          <h2 className="text-5xl font-bold text-gray-900 mt-3">
            What Our Community Says
          </h2>

          <p className="text-gray-600 mt-6 max-w-2xl mx-auto">
            Thousands of citizens are helping make cities cleaner by reporting
            water issues through HydroWatch.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">

          {testimonials.map((item, index) => (
            <div
              key={index}
              className="bg-blue-50 rounded-3xl p-8 shadow-md hover:shadow-xl transition"
            >
              <div className="flex text-yellow-400 mb-4">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>

              <p className="text-gray-700 leading-7 italic">
                "{item.review}"
              </p>

              <div className="mt-6">
                <h4 className="font-bold text-lg">
                  {item.name}
                </h4>

                <p className="text-gray-500">
                  {item.role}
                </p>
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}