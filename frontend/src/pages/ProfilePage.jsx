import DashboardLayout from "../components/layout/DashboardLayout";
import { Link } from "react-router-dom";

function ProfilePage() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto bg-white shadow rounded-xl p-8">

        <h1 className="text-3xl font-bold mb-6">
          👤 My Profile
        </h1>

        <div className="space-y-4">

          <div>
            <span className="font-semibold">Name:</span> {user.name}
          </div>

          <div>
            <span className="font-semibold">Email:</span> {user.email}
          </div>

          <div>
            <span className="font-semibold">Role:</span> {user.role}
          </div>

          <div>
            <span className="font-semibold">Reward Points:</span> {user.points}
          </div>

          {user.role === "user" && (
            <Link to="/volunteer-application" className="inline-block mt-4 bg-sky-600 text-white px-5 py-2.5 rounded-xl font-semibold">
              Apply to become a volunteer
            </Link>
          )}

        </div>

        {user.role === "user" && <Link to="/volunteer-application" className="inline-block mt-6 bg-sky-600 text-white px-5 py-2.5 rounded-xl font-semibold">Apply to become a volunteer</Link>}

      </div>
    </DashboardLayout>
  );
}

export default ProfilePage;