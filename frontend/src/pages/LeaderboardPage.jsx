import { useEffect, useState } from "react";
import { getLeaderboard } from "../services/leaderboardApi";

function LeaderboardPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    const res = await getLeaderboard();
    setUsers(res.data);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        Community Leaderboard
      </h1>

      <table className="w-full border">
        <thead className="bg-sky-600 text-white">
          <tr>
            <th className="p-3">Rank</th>
            <th>Name</th>
            <th>Points</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user, index) => (
            <tr key={user._id} className="border-b text-center">
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LeaderboardPage;