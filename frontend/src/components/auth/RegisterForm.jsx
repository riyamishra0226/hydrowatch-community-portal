import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { registerSchema } from "../../validations/registerSchema";
import { registerUser } from "../../api/authApi";

function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
  try {
    const response = await registerUser({
      name: data.name,
      email: data.email,
      password: data.password,
    });

    alert(response.data.message);

    navigate("/login");

  } catch (error) {
    alert(error.response?.data?.message || "Registration failed");
  }
};

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

      {/* Full Name */}
      <div>
        <label className="block text-sm font-semibold mb-2">
          Full Name
        </label>

        <input
          type="text"
          placeholder="Enter your full name"
          {...register("name")}
          className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-sky-300 outline-none"
        />

        {errors.name && (
          <p className="text-red-500 text-sm mt-1">
            {errors.name.message}
          </p>
        )}
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-semibold mb-2">
          Email
        </label>

        <input
          type="email"
          placeholder="Enter your email"
          {...register("email")}
          className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-sky-300 outline-none"
        />

        {errors.email && (
          <p className="text-red-500 text-sm mt-1">
            {errors.email.message}
          </p>
        )}
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
          <p className="text-red-500 text-sm mt-1">
            {errors.password.message}
          </p>
        )}
      </div>

      {/* Confirm Password */}
      <div>
        <label className="block text-sm font-semibold mb-2">
          Confirm Password
        </label>

        <div className="relative">

          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm password"
            {...register("confirmPassword")}
            className="w-full border rounded-xl px-4 py-3 pr-12 focus:ring-2 focus:ring-sky-300 outline-none"
          />

          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2"
          >
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </button>

        </div>

        {errors.confirmPassword && (
          <p className="text-red-500 text-sm mt-1">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      {/* Register Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-sky-600 text-white py-3 rounded-xl hover:bg-sky-700 transition disabled:bg-sky-300"
      >
        {isSubmitting ? "Creating Account..." : "Create Account"}
      </button>

      {/* Login Link */}
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