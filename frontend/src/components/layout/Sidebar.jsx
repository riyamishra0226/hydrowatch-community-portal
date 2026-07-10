import { NavLink } from "react-router-dom";

function Sidebar() {
  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: "🏠" },
    { name: "Report Issue", path: "/report", icon: "🚰" },
    { name: "My Reports", path: "/my-reports", icon: "📋" },
    { name: "Campaigns", path: "/campaigns", icon: "🌍" },
    { name: "Leaderboard", path: "/leaderboard", icon: "🏆" },
    { name: "Profile", path: "/profile", icon: "👤" },
  ];

  return (
    <aside className="w-64 min-h-screen bg-blue-700 text-white p-6">
      <h1 className="text-3xl font-bold mb-8">HydroWatch</h1>

      <nav className="space-y-3">
        {menuItems.map((item) => (
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