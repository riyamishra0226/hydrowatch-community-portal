import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { loginSchema } from "../../validations/loginSchema";
import { loginUser } from "../../api/authApi";

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
  try {
    const response = await loginUser(data);

    localStorage.setItem("token", response.data.token);
    localStorage.setItem("user", JSON.stringify(response.data.user));

    alert("Login Successful!");

    navigate("/dashboard");
  } catch (error) {
    alert(error.response?.data?.message || "Login failed");
  }
};

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

      {/* Email */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Email Address
        </label>

        <input
          type="email"
          placeholder="Enter your email"
          {...register("email")}
          className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-sky-300 outline-none"
        />

        {errors.email && (
          <p className="text-red-500 text-sm mt-2">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Password */}
      <div>

        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Password
        </label>

        <div className="relative">

          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            {...register("password")}
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

        {errors.password && (
          <p className="text-red-500 text-sm mt-2">
            {errors.password.message}
          </p>
        )}

      </div>

      {/* Remember Me */}
      <div className="flex justify-between items-center text-sm">

        <label className="flex items-center gap-2">
          <input type="checkbox" />
          Remember Me
        </label>

        <Link
          to="/forgot-password"
          className="text-sky-600 hover:underline"
        >
          Forgot Password?
        </Link>

      </div>

      {/* Button */}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-sky-600 text-white py-3 rounded-xl hover:bg-sky-700 transition disabled:bg-sky-300"
      >
        {isSubmitting ? "Logging in..." : "Login"}
      </button>

      <p className="text-center text-gray-600">

        Don't have an account?

        <Link
          to="/register"
          className="text-sky-600 ml-2 font-semibold"
        >
          Register
        </Link>

      </p>

    </form>
  );
}

export default LoginForm;