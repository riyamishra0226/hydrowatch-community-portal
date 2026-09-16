import { Link } from "react-router-dom";
import { FaInstagram } from "react-icons/fa";
import { FiMail } from "react-icons/fi";

function Footer() {
  return (
    <footer className="bg-slate-900 text-gray-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-10">
          <div>
            <h2 className="text-3xl font-bold text-white">💧 HydroWatch</h2>
            <p className="mt-5 leading-7">
              A community-driven platform to report water issues, participate in campaigns, and promote responsible water management.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="hover:text-white">Home</Link></li>
              <li><a href="/#features" className="hover:text-white">Features</a></li>
              <li><a href="/#how" className="hover:text-white">How It Works</a></li>
              <li><Link to="/campaigns" className="hover:text-white">Campaigns</Link></li>
              <li><Link to="/leaderboard" className="hover:text-white">Leaderboard</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Get Started</h3>
            <ul className="space-y-3">
              <li><Link to="/register" className="hover:text-white">Create an account</Link></li>
              <li><Link to="/login" className="hover:text-white">Login</Link></li>
              <li><Link to="/report" className="hover:text-white">Report an issue</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Contact & Social</h3>
            <ul className="space-y-3">
              <li>
                <a href="mailto:riyamishra0226@gmail.com" className="flex items-center gap-3 hover:text-white break-all">
                  <FiMail className="shrink-0" />
                  <span>riyamishra0226@gmail.com</span>
                </a>
              </li>
              <li>
                <a href="mailto:anshpandey152@gmail.com" className="flex items-center gap-3 hover:text-white break-all">
                  <FiMail className="shrink-0" />
                  <span>anshpandey152@gmail.com</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/anshhh_h/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 hover:text-white"
                >
                  <FaInstagram className="shrink-0" />
                  <span>@anshhh_h</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <hr className="border-slate-700 my-10" />
        <div className="text-center text-gray-400">
          © 2026 HydroWatch Community Portal. Built for SDG 6 • Clean Water & Sanitation.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
