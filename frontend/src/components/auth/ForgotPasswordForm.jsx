import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { forgotPasswordSchema } from "../../validations/forgotPasswordSchema";

function ForgotPasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data) => {
    console.log("Forgot Password:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

      <div>
        <label className="block text-sm font-semibold mb-2">
          Email Address
        </label>

        <input
          type="email"
          placeholder="Enter your registered email"
          {...register("email")}
          className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-sky-300 outline-none"
        />

        {errors.email && (
          <p className="text-red-500 text-sm mt-1">
            {errors.email.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-sky-600 text-white py-3 rounded-xl hover:bg-sky-700 disabled:bg-sky-300 rounded-xl"
      >
        {isSubmitting ? "Sending..." : "Send Reset Link"}
      </button>

      <p className="text-center text-gray-600">
        Remember your password?
        <Link
          to="/login"
          className="text-sky-600 ml-2 font-semibold"
        >
          Login
        </Link>
      </p>

    </form>
  );
}

export default ForgotPasswordForm;