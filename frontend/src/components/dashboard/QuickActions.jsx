import { Link } from "react-router-dom";

function QuickActions() {
  return (
    <div className="bg-white shadow rounded-xl p-6 mt-8">
      <h2 className="text-2xl font-bold mb-4">
        Quick Actions
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

        <Link
          to="/report"
          className="bg-blue-600 text-white rounded-lg p-4 text-center hover:bg-blue-700"
        >
          🚰 Report Issue
        </Link>

        <Link
          to="/campaigns"
          className="bg-green-600 text-white rounded-lg p-4 text-center hover:bg-green-700"
        >
          🌍 Campaigns
        </Link>

        <Link
          to="/leaderboard"
          className="bg-yellow-500 text-white rounded-lg p-4 text-center hover:bg-yellow-600"
        >
          🏆 Leaderboard
        </Link>

        <Link
          to="/profile"
          className="bg-purple-600 text-white rounded-lg p-4 text-center hover:bg-purple-700"
        >
          👤 Profile
        </Link>

      </div>
    </div>
  );
}

export default QuickActions;