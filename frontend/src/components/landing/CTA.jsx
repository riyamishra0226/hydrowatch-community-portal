import { FaArrowRight } from "react-icons/fa";

export default function CTA() {
  return (
    <section className="py-24 bg-gradient-to-r from-blue-600 to-cyan-500 text-white">
      <div className="max-w-6xl mx-auto px-6 text-center">

        <h2 className="text-5xl font-bold">
          Ready to Protect Every Drop?
        </h2>

        <p className="mt-6 text-xl text-blue-100 max-w-3xl mx-auto">
          Join thousands of citizens reporting water issues, participating in
          campaigns, and making our communities cleaner and smarter.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-5">

          <button className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition">
            Join Community
          </button>

          <button className="border-2 border-white px-8 py-4 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-white hover:text-blue-600 transition">
            Report an Issue
            <FaArrowRight />
          </button>

        </div>

      </div>
    </section>
  );
}