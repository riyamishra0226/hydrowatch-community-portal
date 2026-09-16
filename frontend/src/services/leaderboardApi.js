import API from "../api/authApi";

export const getLeaderboard = () => API.get("/reports/leaderboard");
