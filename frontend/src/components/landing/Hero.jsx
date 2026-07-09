import heroImage from "../../assets/images/hero.svg";

function Hero() {
  return (
    <section className="bg-gradient-to-r from-sky-50 to-white py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left Side */}
          <div>

            {/* SDG Badge */}
            <span className="inline-block bg-sky-100 text-sky-700 px-4 py-2 rounded-full text-sm font-semibold">
              💧 SDG 6 • Clean Water & Sanitation
            </span>

            {/* Heading */}
            <h1 className="text-6xl font-extrabold text-slate-900 leading-tight mt-6">
              Protect Every Drop.
              <br />
              Empower Every
              <span className="text-sky-600"> Community.</span>
            </h1>

            {/* Description */}
            <p className="text-lg text-gray-600 mt-6 leading-8">
              Report water leakage, pollution, illegal water wastage,
              and participate in community campaigns to build a cleaner,
              greener future together.
            </p>

            {/* Buttons */}
            <div className="flex gap-5 mt-10">

              <button className="bg-sky-600 hover:bg-sky-700 text-white px-8 py-4 rounded-xl shadow-lg hover:scale-105 transition duration-300">
                🚨 Report Issue
              </button>

              <button className="border-2 border-sky-600 text-sky-600 px-8 py-4 rounded-xl hover:bg-sky-50 hover:scale-105 transition duration-300">
                🌍 Join Community
              </button>

            </div>

            {/* Statistics */}
            <div className="grid grid-cols-3 gap-8 mt-16">

              <div>
                <h2 className="text-4xl font-bold text-sky-600">
                  1000+
                </h2>
                <p className="text-gray-500 mt-2">
                  Water Reports
                </p>
              </div>

              <div>
                <h2 className="text-4xl font-bold text-sky-600">
                  2500+
                </h2>
                <p className="text-gray-500 mt-2">
                  Volunteers
                </p>
              </div>

              <div>
                <h2 className="text-4xl font-bold text-sky-600">
                  50+
                </h2>
                <p className="text-gray-500 mt-2">
                  Cities
                </p>
              </div>

            </div>

          </div>

          {/* Right Side */}
          <div className="flex justify-center">
            <img
              src={heroImage}
              alt="HydroWatch Hero"
              className="w-full max-w-lg"
            />
          </div>

        </div>

      </div>
    </section>
  );
}

export default Hero;