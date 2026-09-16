import express from "express";
import { registerUser, loginUser, getProfile } from "../controllers/authController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";
import { validateLogin, validateObjectId, validateRegister, apiRateLimit } from "../middleware/securityMiddleware.js";
import { getUsers } from "../controllers/campaignController.js";
import { getMyApplication, applyForVolunteer, getVolunteerApplications, reviewVolunteerApplication } from "../controllers/volunteerController.js";

const router = express.Router();
const authLimiter = apiRateLimit({ windowMs: 15 * 60 * 1000, max: 20 });

router.post("/register", authLimiter, validateRegister, registerUser);
router.post("/login", authLimiter, validateLogin, loginUser);
router.get("/me", protect, (req, res) => res.json(req.user));
router.get("/profile/:id", protect, validateObjectId("id"), getProfile);
router.get("/admin/users", protect, adminOnly, getUsers);
router.get("/volunteer/application", protect, getMyApplication);
router.post("/volunteer/application", protect, applyForVolunteer);
router.get("/admin/volunteer-applications", protect, adminOnly, getVolunteerApplications);
router.patch("/admin/volunteer-applications/:id", protect, adminOnly, validateObjectId("id"), reviewVolunteerApplication);

export default router;
