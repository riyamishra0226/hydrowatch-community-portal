import Reward from "../models/Reward.js";
import User from "../models/User.js";
import Report from "../models/Report.js";
import Campaign from "../models/Campaign.js";

const getLevel = (points) => Math.floor(points / 100) + 1;

const getBadges = ({ points, reports, campaigns }) => [
  { id: "first-report", name: "First Report", icon: "💧", description: "Submitted your first water issue report.", unlocked: reports >= 1 },
  { id: "community-helper", name: "Community Helper", icon: "🤝", description: "Participated in 2 community actions.", unlocked: reports + campaigns >= 2 },
  { id: "water-guardian", name: "Water Guardian", icon: "🛡️", description: "Reached 100 reward points.", unlocked: points >= 100 },
  { id: "eco-champion", name: "Eco Champion", icon: "🌱", description: "Reached 250 reward points.", unlocked: points >= 250 },
  { id: "campaign-champion", name: "Campaign Champion", icon: "🏅", description: "Joined 3 community campaigns.", unlocked: campaigns >= 3 },
];

export const getMyRewards = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("name points role");
    if (!user) return res.status(404).json({ message: "User not found" });

    const [reports, campaigns, history] = await Promise.all([
      Report.countDocuments({ user: req.user._id }),
      Campaign.countDocuments({ participants: req.user._id }),
      Reward.find({ user: req.user._id }).sort({ createdAt: -1 }).limit(20),
    ]);

    const ledger = await Reward.aggregate([
      { $match: { user: req.user._id } },
      { $group: { _id: null, points: { $sum: "$points" }, count: { $sum: 1 } } },
    ]);
    const points = ledger[0]?.count ? ledger[0].points : (user.points || 0);
    const level = getLevel(points);
    const progress = points % 100;

    res.json({
      user: { name: user.name, points, role: user.role },
      level,
      progress,
      pointsToNextLevel: 100 - progress,
      reports,
      campaigns,
      badges: getBadges({ points, reports, campaigns }),
      history,
    });
  } catch (error) {
    console.error("getMyRewards:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
