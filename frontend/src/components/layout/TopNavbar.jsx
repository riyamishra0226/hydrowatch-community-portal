import { useNavigate } from "react-router-dom";

function TopNavbar() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <div className="bg-white shadow flex justify-between items-center px-8 py-4">
      <h2 className="text-2xl font-bold">
        Welcome, {user?.name || "User"} 👋
      </h2>

      <button
        onClick={handleLogout}
        className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700"
      >
        Logout
      </button>
    </div>
  );
}

export default TopNavbar;