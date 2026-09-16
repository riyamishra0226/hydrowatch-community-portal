import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { getUnreadNotificationCount } from "../../api/reportApi";

export default function TopNavbar() {
  const { user, logout } = useAuth();
  const [unread, setUnread] = useState(0);

  useEffect(() => {
    let active = true;
    const loadCount = async () => {
      try {
        const response = await getUnreadNotificationCount();
        if (active) setUnread(response.data.count || 0);
      } catch (error) {
        if (active) setUnread(0);
      }
    };
    loadCount();
    const timer = setInterval(loadCount, 30000);
    return () => { active = false; clearInterval(timer); };
  }, []);

  return (
    <div className="bg-white shadow flex justify-between items-center px-4 md:px-8 py-4 gap-4">
      <div>
        <h2 className="text-xl md:text-2xl font-bold">Welcome, {user?.name || "User"} 👋</h2>
        <p className="text-xs text-gray-500 hidden md:block">Community water management portal</p>
      </div>
      <div className="flex items-center gap-3">
        <Link to="/" className="hidden sm:inline-flex bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-sky-700" title="Go to Home">
          Home
        </Link>
        <Link to="/notifications" className="relative text-xl p-2" title="Notifications" aria-label="Notifications">
          🔔
          {unread > 0 && (
            <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 rounded-full bg-red-600 text-white text-[11px] font-bold flex items-center justify-center">
              {unread > 99 ? "99+" : unread}
            </span>
          )}
        </Link>
        <button onClick={() => { logout(); window.location.replace("/"); }} className="bg-red-600 text-white px-4 md:px-5 py-2 rounded-lg hover:bg-red-700">Logout</button>
      </div>
    </div>
  );
}
