import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getMyRewards } from "../controllers/rewardController.js";
const router = express.Router();
router.get("/me", protect, getMyRewards);
export default router;
