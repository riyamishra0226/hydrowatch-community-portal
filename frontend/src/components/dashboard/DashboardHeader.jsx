function DashboardHeader() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="bg-white shadow rounded-xl p-6 mb-6">
      <h1 className="text-3xl font-bold text-blue-700">
        Welcome, {user?.name || "User"} 👋
      </h1>

      <p className="text-gray-600 mt-2">
        Together, let's protect our water resources.
      </p>
    </div>
  );
}

export default DashboardHeader;