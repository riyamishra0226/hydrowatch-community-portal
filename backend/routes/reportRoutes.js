import express from "express";
import { protect, adminOnly } from "../middleware/authMiddleware.js";
import { validateAssignment, validateObjectId, validateReport, validateReportUpdate, validateStatusUpdate } from "../middleware/securityMiddleware.js";
import { createReport, updateReport, getMyReports, deleteReport, getDashboardStats, getLeaderboard, adminGetReports, updateReportStatus, assignReport, getAdminStats } from "../controllers/reportController.js";
import { getPublicStats } from "../controllers/publicController.js";

const router = express.Router();
router.get("/public/stats", getPublicStats);
router.get("/leaderboard", getLeaderboard);
router.get("/dashboard/:userId", protect, validateObjectId("userId"), getDashboardStats);
router.post("/", protect, validateReport, createReport);
router.get("/user/:userId", protect, validateObjectId("userId"), getMyReports);
router.patch("/:id", protect, validateObjectId("id"), validateReportUpdate, updateReport);
router.delete("/:id", protect, validateObjectId("id"), deleteReport);
router.get("/admin/stats", protect, adminOnly, getAdminStats);
router.get("/admin", protect, adminOnly, adminGetReports);
router.patch("/:id/status", protect, adminOnly, validateObjectId("id"), validateStatusUpdate, updateReportStatus);
router.patch("/:id/assign", protect, adminOnly, validateObjectId("id"), validateAssignment, assignReport);
export default router;
