function AuthLayout({ title, subtitle, children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-cyan-100 flex items-center justify-center px-6 py-10">
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden grid lg:grid-cols-2">

        {/* Left Side */}
        <div className="bg-gradient-to-br from-sky-600 to-cyan-500 text-white p-12 hidden lg:flex flex-col justify-center">

          <h1 className="text-5xl font-bold mb-6">
            💧 HydroWatch
          </h1>

          <p className="text-lg leading-8">
            Report water leakages, pollution and shortages.
            Help your community and earn rewards while
            protecting our most precious resource.
          </p>

          <div className="mt-12 space-y-4">

            <div>✅ Report Water Issues</div>

            <div>🏆 Earn Reward Points</div>

            <div>🌍 Join Community Campaigns</div>

            <div>📊 Track Your Contributions</div>

          </div>

        </div>

        {/* Right Side */}

        <div className="p-10 lg:p-16">

          <h2 className="text-4xl font-bold text-slate-900">
            {title}
          </h2>

          <p className="text-gray-500 mt-3 mb-10">
            {subtitle}
          </p>

          {children}

        </div>

      </div>
    </div>
  );
}

export default AuthLayout;