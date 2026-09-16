import { NavLink } from "react-router-dom";

function Sidebar() {
  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: "🏠" },
    { name: "Report Issue", path: "/report", icon: "🚰" },
    { name: "My Reports", path: "/my-reports", icon: "📋" },
    { name: "Campaigns", path: "/campaigns", icon: "🌍" },
    { name: "Leaderboard", path: "/leaderboard", icon: "🏆" },
    { name: "Rewards", path: "/rewards", icon: "🎖️" },
    { name: "Notifications", path: "/notifications", icon: "🔔" },
    { name: "Profile", path: "/profile", icon: "👤" },
  ];

  const user = JSON.parse(localStorage.getItem("user") || "null");

  return (
    <aside className="w-64 min-h-screen bg-blue-700 text-white p-6">
      <NavLink to="/" className="block rounded-lg px-4 py-3 mb-4 bg-white/10 hover:bg-blue-600">🏠 Home</NavLink>

      {["admin","volunteer"].includes(user?.role) && <NavLink to="/campaign-admin" className={({isActive}) => `block rounded-lg px-4 py-3 mb-3 ${isActive ? "bg-white text-blue-700 font-semibold" : "hover:bg-blue-600"}`}>🌊 Campaign Management</NavLink>}
      {user?.role === "admin" && <NavLink to="/admin/volunteer-applications" className={({isActive}) => `block rounded-lg px-4 py-3 mb-3 ${isActive ? "bg-white text-blue-700 font-semibold" : "hover:bg-blue-600"}`}>👥 Volunteer Applications</NavLink>}
      {user?.role === "admin" && <NavLink to="/admin" className={({isActive}) => `block rounded-lg px-4 py-3 mb-3 ${isActive ? "bg-white text-blue-700 font-semibold" : "hover:bg-blue-600"}`}>⚙️ Admin Dashboard</NavLink>}

      {user?.role === "user" && <NavLink to="/volunteer-application" className={({isActive}) => `block rounded-lg px-4 py-3 mb-3 ${isActive ? "bg-white text-blue-700 font-semibold" : "hover:bg-blue-600"}`}>🤝 Become a Volunteer</NavLink>}

      <nav className="space-y-3">
        {menuItems
          .filter((item) => user?.role !== "admin" || !["/report", "/my-reports", "/rewards"].includes(item.path))
          .map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `block rounded-lg px-4 py-3 ${
                isActive
                  ? "bg-white text-blue-700 font-semibold"
                  : "hover:bg-blue-600"
              }`
            }
          >
            {item.icon} {item.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;