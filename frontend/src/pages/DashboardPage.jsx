function DashboardPage() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold">
        Welcome, {user?.name || "User"} 👋
      </h1>

      <p className="mt-4 text-lg">
        You have successfully logged in to HydroWatch.
      </p>
    </div>
  );
}

export default DashboardPage;