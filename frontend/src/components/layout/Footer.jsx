import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaGithub,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-slate-900 text-gray-300 pt-16 pb-8">

      <div className="max-w-7xl mx-auto px-6">

        <div className="grid md:grid-cols-4 gap-10">

          {/* Logo */}
          <div>
            <h2 className="text-3xl font-bold text-white">
              💧 HydroWatch
            </h2>

            <p className="mt-5 leading-7">
              A community-driven platform to report water issues,
              participate in campaigns, and promote water conservation.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">
              Quick Links
            </h3>

            <ul className="space-y-3">
              <li>Home</li>
              <li>Features</li>
              <li>Campaigns</li>
              <li>Leaderboard</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">
              Contact
            </h3>

            <ul className="space-y-3">
              <li>support@hydrowatch.com</li>
              <li>Basti, Uttar Pradesh</li>
              <li>India</li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">
              Follow Us
            </h3>

            <div className="flex gap-5 text-2xl">
              <FaFacebook className="hover:text-blue-500 cursor-pointer" />
              <FaInstagram className="hover:text-pink-500 cursor-pointer" />
              <FaLinkedin className="hover:text-blue-400 cursor-pointer" />
              <FaGithub className="hover:text-white cursor-pointer" />
            </div>
          </div>

        </div>

        <hr className="border-slate-700 my-10" />

        <div className="text-center text-gray-400">
          © 2026 HydroWatch Community Portal. Built for SDG 6 • Clean Water &
          Sanitation.
        </div>

      </div>

    </footer>
  );
}

export default Footer;