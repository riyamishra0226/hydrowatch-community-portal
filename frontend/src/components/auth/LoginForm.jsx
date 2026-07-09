import { Link } from "react-router-dom";

function LoginForm() {
  return (
    <form className="space-y-6">

      <div>
        <label className="block mb-2 font-medium">
          Email
        </label>

        <input
          type="email"
          placeholder="Enter your email"
          className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500"
        />
      </div>

      <div>
        <label className="block mb-2 font-medium">
          Password
        </label>

        <input
          type="password"
          placeholder="Enter your password"
          className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500"
        />
      </div>

      <div className="flex justify-between text-sm">

        <label className="flex items-center gap-2">
          <input type="checkbox" />
          Remember me
        </label>

        <Link
          to="/forgot-password"
          className="text-sky-600 hover:underline"
        >
          Forgot Password?
        </Link>

      </div>

      <button
        className="w-full bg-sky-600 text-white py-3 rounded-xl hover:bg-sky-700 transition"
      >
        Login
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