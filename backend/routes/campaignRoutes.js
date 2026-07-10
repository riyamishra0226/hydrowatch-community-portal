import express from "express";
import Campaign from "../models/Campaign.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const campaigns = await Campaign.find().sort({ date: 1 });

    res.json(campaigns);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
});

export default router;