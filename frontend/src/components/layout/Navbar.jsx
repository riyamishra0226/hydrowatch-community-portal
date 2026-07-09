import { Link } from "react-router-dom";
import { FaTint } from "react-icons/fa";

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <FaTint className="text-3xl text-sky-500" />
          <h1 className="text-2xl font-bold text-slate-800">
            HydroWatch
          </h1>
        </Link>

        {/* Navigation */}
        <ul className="hidden md:flex items-center gap-8 text-slate-700 font-medium">
          <li><a href="#home" className="hover:text-sky-500 transition">Home</a></li>
          <li><a href="#features" className="hover:text-sky-500 transition">Features</a></li>
          <li><a href="#how" className="hover:text-sky-500 transition">How It Works</a></li>
          <li><Link to="/campaigns" className="hover:text-sky-500 transition">Campaigns</Link></li>
          <li><Link to="/leaderboard" className="hover:text-sky-500 transition">Leaderboard</Link></li>
        </ul>

        {/* Buttons */}
        <div className="flex items-center gap-4">
          <Link
            to="/login"
            className="text-slate-700 hover:text-sky-500 transition"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="bg-sky-500 text-white px-5 py-2 rounded-lg hover:bg-sky-600 transition"
          >
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;