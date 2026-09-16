import { createContext, useEffect, useState } from "react";
import { getMe } from "../api/authApi";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem("user")) || null; } catch { return null; }
  });
  const [loading, setLoading] = useState(Boolean(localStorage.getItem("token")));

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) { setLoading(false); return; }
    getMe().then((res) => {
      setUser(res.data);
      localStorage.setItem("user", JSON.stringify(res.data));
    }).catch(() => {
      localStorage.removeItem("token"); localStorage.removeItem("user"); setUser(null);
    }).finally(() => setLoading(false));
  }, []);

  const login = (data) => { localStorage.setItem("token", data.token); localStorage.setItem("user", JSON.stringify(data.user)); setUser(data.user); };
  const logout = () => { localStorage.removeItem("token"); localStorage.removeItem("user"); setUser(null); };

  return <AuthContext.Provider value={{ user, setUser, login, logout, loading }}>{children}</AuthContext.Provider>;
}
