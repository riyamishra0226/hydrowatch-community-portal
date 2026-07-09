import { Link } from "react-router-dom";

function ForgotPasswordForm() {
  return (
    <form className="space-y-6">

      <div>
        <label className="block text-sm font-semibold mb-2">
          Email Address
        </label>

        <input
          type="email"
          placeholder="Enter your registered email"
          className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-sky-300 outline-none"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-sky-600 text-white py-3 rounded-xl hover:bg-sky-700 transition"
      >
        Send Reset Link
      </button>

      <p className="text-center text-gray-600">
        Remember your password?

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

export default ForgotPasswordForm;