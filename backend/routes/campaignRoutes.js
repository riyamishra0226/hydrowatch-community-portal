import express from "express";
import { protect, adminOnly, volunteerOrAdmin } from "../middleware/authMiddleware.js";
import { validateCampaign, validateObjectId } from "../middleware/securityMiddleware.js";
import { getCampaigns, getManageCampaigns, joinCampaign, createCampaign, updateCampaign, deleteCampaign, getCampaignStats, verifyParticipation, verifyCampaign } from "../controllers/campaignController.js";

const router = express.Router();
router.get("/", getCampaigns);
router.get("/admin/stats", protect, volunteerOrAdmin, getCampaignStats);
router.get("/manage", protect, volunteerOrAdmin, getManageCampaigns);
router.post("/:id/join", protect, validateObjectId("id"), joinCampaign);
router.post("/:id/verify", protect, adminOnly, validateObjectId("id"), verifyCampaign);
router.post("/:id/verify-participation/:userId", protect, volunteerOrAdmin, validateObjectId("id"), validateObjectId("userId"), verifyParticipation);
router.post("/", protect, volunteerOrAdmin, validateCampaign, createCampaign);
router.put("/:id", protect, volunteerOrAdmin, validateObjectId("id"), validateCampaign, updateCampaign);
router.delete("/:id", protect, volunteerOrAdmin, validateObjectId("id"), deleteCampaign);
export default router;
