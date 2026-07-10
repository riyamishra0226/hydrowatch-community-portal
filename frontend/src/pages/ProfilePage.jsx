import DashboardLayout from "../components/layout/DashboardLayout";

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

        </div>

      </div>
    </DashboardLayout>
  );
}

export default ProfilePage;