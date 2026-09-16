import Report from "../models/Report.js";
import User from "../models/User.js";
import Campaign from "../models/Campaign.js";

export const getPublicStats = async (req, res) => {
  try {
    const [totalReports, communityMembers, activeIssues, resolvedIssues, activeCampaigns] = await Promise.all([
      Report.countDocuments(),
      User.countDocuments({ role: "user" }),
      Report.countDocuments({ status: { $nin: ["Resolved", "Closed"] } }),
      Report.countDocuments({ status: { $in: ["Resolved", "Closed"] } }),
      Campaign.countDocuments({
        $or: [
          { status: "Active" },
          { status: "Upcoming" },
        ],
      }),
    ]);

    res.json({
      totalReports,
      communityMembers,
      activeIssues,
      resolvedIssues,
      activeCampaigns,
    });
  } catch (error) {
    console.error("getPublicStats:", error);
    res.status(500).json({ message: "Unable to load public statistics" });
  }
};
