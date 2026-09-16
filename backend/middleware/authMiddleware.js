import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  try {
    const header = req.headers.authorization || "";
    const token = header.startsWith("Bearer ") ? header.slice(7).trim() : null;
    if (!token) return res.status(401).json({ message: "Authentication required" });
    if (!process.env.JWT_SECRET) return res.status(500).json({ message: "Authentication service is not configured" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded?.id) return res.status(401).json({ message: "Invalid authentication token" });
    const user = await User.findById(decoded.id).select("-password");
    if (!user) return res.status(401).json({ message: "User no longer exists" });

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export const adminOnly = (req, res, next) => {
  if (req.user?.role !== "admin") return res.status(403).json({ message: "Administrator access required" });
  next();
};

export const volunteerOrAdmin = (req, res, next) => {
  if (!["volunteer", "admin"].includes(req.user?.role)) return res.status(403).json({ message: "Volunteer or administrator access required" });
  next();
};
