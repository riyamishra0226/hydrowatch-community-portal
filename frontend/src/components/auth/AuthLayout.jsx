function AuthLayout({ title, subtitle, children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 to-blue-50 flex items-center justify-center px-6">

      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2">

        {/* Left Side */}
        <div className="hidden md:flex flex-col justify-center items-center bg-sky-600 text-white p-12">

          <div className="text-7xl mb-6">
            💧
          </div>

          <h2 className="text-4xl font-bold">
            HydroWatch
          </h2>

          <p className="text-center mt-6 text-lg">
            Report water issues, join campaigns,
            earn rewards and help build
            a sustainable future.
          </p>

        </div>

        {/* Right Side */}

        <div className="p-10 md:p-14">

          <h2 className="text-4xl font-bold text-slate-900">
            {title}
          </h2>

          <p className="text-gray-500 mt-3">
            {subtitle}
          </p>

          <div className="mt-10">
            {children}
          </div>

        </div>

      </div>

    </div>
  );
}

export default AuthLayout;