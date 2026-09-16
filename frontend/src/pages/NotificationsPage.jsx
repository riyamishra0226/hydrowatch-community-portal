import { useEffect, useMemo, useState } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import { getNotifications, markAllNotificationsRead, markNotificationRead } from "../api/reportApi";

const icons = { report: "🚰", reward: "🏆", campaign: "🌍", system: "ℹ️" };

export default function NotificationsPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = async () => {
    try {
      setError("");
      const response = await getNotifications();
      setItems(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Unable to load notifications.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const unreadCount = useMemo(() => items.filter((item) => !item.read).length, [items]);

  const read = async (id) => {
    try {
      await markNotificationRead(id);
      setItems((current) => current.map((item) => item._id === id ? { ...item, read: true } : item));
    } catch (err) {
      setError(err.response?.data?.message || "Unable to update notification.");
    }
  };

  const all = async () => {
    try {
      await markAllNotificationsRead();
      setItems((current) => current.map((item) => ({ ...item, read: true })));
    } catch (err) {
      setError(err.response?.data?.message || "Unable to update notifications.");
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold">Notifications</h1>
            <p className="text-gray-500 mt-1">Updates about your reports, rewards and community activity.</p>
          </div>
          <button disabled={!unreadCount} onClick={all} className="text-sky-700 font-semibold disabled:text-gray-400 disabled:cursor-not-allowed">Mark all as read</button>
        </div>

        {error && <div className="mb-4 rounded-xl bg-red-50 border border-red-200 text-red-700 p-4">{error}</div>}

        {loading ? (
          <div className="bg-white p-10 rounded-2xl text-center text-gray-500">Loading notifications...</div>
        ) : (
          <div className="space-y-3">
            {items.map((notification) => (
              <button key={notification._id} onClick={() => !notification.read && read(notification._id)} className={`w-full text-left p-5 rounded-2xl border shadow-sm transition hover:shadow-md ${notification.read ? "bg-white" : "bg-sky-50 border-sky-200"}`}>
                <div className="flex items-start gap-4">
                  <div className="text-2xl">{icons[notification.type] || icons.system}</div>
                  <div className="min-w-0 flex-1">
                    <div className="flex justify-between gap-3">
                      <h2 className="font-bold">{notification.title}</h2>
                      {!notification.read && <span className="shrink-0 text-xs font-semibold text-sky-700">NEW</span>}
                    </div>
                    <p className="text-gray-600 mt-1">{notification.message}</p>
                    <span className="text-xs text-gray-500 mt-2 block">{new Date(notification.createdAt).toLocaleString()}</span>
                  </div>
                </div>
              </button>
            ))}
            {!items.length && <div className="bg-white p-10 rounded-2xl text-center text-gray-500">No notifications yet.</div>}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
