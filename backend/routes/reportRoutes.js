import express from "express";
import { createReport, getMyReports, deleteReport, getDashboardStats, } from "../controllers/reportController.js";
import { getLeaderboard } from "../controllers/reportController.js";

const router = express.Router();

router.post("/", createReport);
router.get("/user/:userId", getMyReports);
router.delete("/:id", deleteReport);
router.get("/leaderboard", getLeaderboard);
export default router;

router.get("/dashboard/:userId", getDashboardStats);