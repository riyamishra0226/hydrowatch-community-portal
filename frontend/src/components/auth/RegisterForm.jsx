import { useState } from "react";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form className="space-y-5">

      {/* Full Name */}
      <div>
        <label className="block text-sm font-semibold mb-2">
          Full Name
        </label>

        <input
          type="text"
          placeholder="Enter your full name"
          className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-sky-300 outline-none"
        />
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-semibold mb-2">
          Email
        </label>

        <input
          type="email"
          placeholder="Enter your email"
          className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-sky-300 outline-none"
        />
      </div>

      {/* Password */}
      <div>
        <label className="block text-sm font-semibold mb-2">
          Password
        </label>

        <div className="relative">

          <input
            type={showPassword ? "text" : "password"}
            placeholder="Create password"
            className="w-full border rounded-xl px-4 py-3 pr-12 focus:ring-2 focus:ring-sky-300 outline-none"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>

        </div>
      </div>

      {/* Confirm Password */}
      <div>
        <label className="block text-sm font-semibold mb-2">
          Confirm Password
        </label>

        <input
          type="password"
          placeholder="Confirm password"
          className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-sky-300 outline-none"
        />
      </div>

      <button
        className="w-full bg-sky-600 text-white py-3 rounded-xl hover:bg-sky-700 transition"
      >
        Create Account
      </button>

      <p className="text-center text-gray-600">

        Already have an account?

        <Link
          to="/login"
          className="text-sky-600 font-semibold ml-2"
        >
          Login
        </Link>

      </p>

    </form>
  );
}

export default RegisterForm;