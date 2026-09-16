import Report from "../models/Report.js";
import Campaign from "../models/Campaign.js";
import User from "../models/User.js";
import Notification from "../models/Notification.js";
import Reward from "../models/Reward.js";

const applyReward = async ({ userId, points, action, description, reportId = null }) => {
  const user = await User.findById(userId).select("role");
  if (!user || user.role === "admin") return;
  await Reward.create({ user: userId, points, action, description, report: reportId });
  await User.findByIdAndUpdate(userId, { $inc: { points } });
};

const getLedgerPoints = async (userId) => {
  const result = await Reward.aggregate([
    { $match: { user: userId } },
    { $group: { _id: null, points: { $sum: "$points" }, count: { $sum: 1 } } },
  ]);
  return { points: result[0]?.points ?? null, count: result[0]?.count ?? 0 };
};

export const createReport = async (req, res) => {
  try {
    const { title, description, category, location, image, latitude, longitude, severity } = req.body;
    if (!title || !description || !category || !location) {
      return res.status(400).json({ message: "Title, description, category and location are required" });
    }

    const report = await Report.create({
      title, description, category, location, image,
      latitude: latitude ?? null, longitude: longitude ?? null,
      severity: severity || "Medium", user: req.user._id,
      statusHistory: [{ status: "Pending", note: "Report submitted", changedBy: req.user._id }],
    });

    await applyReward({
      userId: req.user._id,
      points: 5,
      action: "Report submitted",
      description: `Submitted a water issue report: ${report.title}`,
      reportId: report._id,
    });
    await Notification.create({
      user: req.user._id,
      title: "Report submitted",
      message: `Your report "${report.title}" was submitted successfully. You earned 5 points.`,
      type: "report",
    });
    await Notification.create({
      user: req.user._id,
      title: "Reward earned",
      message: "You earned 5 points for submitting a water issue report.",
      type: "reward",
    });
    res.status(201).json({ message: "Report submitted successfully", report });
  } catch (error) {
    console.error("createReport:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getMyReports = async (req, res) => {
  try {
    if (String(req.user._id) !== String(req.params.userId) && req.user.role !== "admin") {
      return res.status(403).json({ message: "You can only view your own reports" });
    }
    const reports = await Report.find({ user: req.params.userId }).sort({ createdAt: -1 });
    res.json(reports);
  } catch (error) {
    console.error("getMyReports:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const updateReport = async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);
    if (!report) return res.status(404).json({ message: "Report not found" });
    if (String(report.user) !== String(req.user._id) && req.user.role !== "admin") return res.status(403).json({ message: "Not authorized to edit this report" });
    if (req.user.role !== "admin" && report.status !== "Pending") return res.status(409).json({ message: "Only pending reports can be edited" });

    const allowed = ["title", "description", "category", "location", "latitude", "longitude", "severity", "image"];
    for (const field of allowed) {
      if (Object.prototype.hasOwnProperty.call(req.body, field)) report[field] = req.body[field];
    }
    await report.save();
    res.json({ message: "Report updated successfully", report });
  } catch (error) {
    console.error("updateReport:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const deleteReport = async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);
    if (!report) return res.status(404).json({ message: "Report not found" });
    if (String(report.user) !== String(req.user._id) && req.user.role !== "admin") return res.status(403).json({ message: "Not authorized to delete this report" });
    if (req.user.role !== "admin" && report.status !== "Pending") return res.status(409).json({ message: "Only pending reports can be deleted" });

    // Reverse the initial submission reward so deleting a pending report cannot farm points.
    const submissionReward = await Reward.findOne({ report: report._id, action: "Report submitted", points: { $gt: 0 } });
    if (submissionReward) {
      await applyReward({
        userId: report.user,
        points: -submissionReward.points,
        action: "Report deleted",
        description: `Reward reversed because the report was deleted: ${report.title}`,
        reportId: report._id,
      });
    }

    await report.deleteOne();
    await Notification.create({
      user: report.user,
      title: "Report deleted",
      message: submissionReward ? `Your report was deleted and ${submissionReward.points} reward points were reversed.` : "Your report was deleted.",
      type: "report",
    });
    res.json({ message: "Report deleted successfully", pointsReversed: submissionReward?.points || 0 });
  } catch (error) {
    console.error("deleteReport:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getLeaderboard = async (req, res) => {
  try {
    const users = await User.aggregate([
      { $match: { role: { $in: ["user", "volunteer"] } } },
      {
        $lookup: {
          from: "reports",
          localField: "_id",
          foreignField: "user",
          as: "reports",
        },
      },
      {
        $lookup: {
          from: "campaigns",
          let: { userId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: { $in: ["$$userId", { $ifNull: ["$participants", []] }] },
              },
            },
            { $project: { _id: 1 } },
          ],
          as: "campaigns",
        },
      },
      {
        $lookup: {
          from: "rewards",
          localField: "_id",
          foreignField: "user",
          as: "rewardRecords",
        },
      },
      {
        $addFields: {
          rewardPoints: {
            $sum: {
              $map: {
                input: "$rewardRecords",
                as: "reward",
                in: { $ifNull: ["$$reward.points", 0] },
              },
            },
          },
        },
      },
      {
        $project: {
          name: 1,
          // Use the greater of the stored user total and the reward ledger total.
          // This keeps legacy users visible while correcting stale/zero User.points
          // when their actual reward transactions contain points.
          points: { $cond: [{ $gt: [{ $size: "$rewardRecords" }, 0] }, "$rewardPoints", { $ifNull: ["$points", 0] }] },
          reports: { $size: "$reports" },
          campaigns: { $size: "$campaigns" },
        },
      },
      { $sort: { points: -1, reports: -1, campaigns: -1, name: 1 } },
    ]);

    res.json(users);
  } catch (error) {
    console.error("getLeaderboard:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getDashboardStats = async (req, res) => {
  try {
    const userId = req.params.userId;
    if (String(req.user._id) !== String(userId) && req.user.role !== "admin") return res.status(403).json({ message: "Not authorized" });
    const [reportCount, user, campaignsJoined, ledger] = await Promise.all([
      Report.countDocuments({ user: userId }),
      User.findById(userId).select("points"),
      Campaign.countDocuments({ participants: userId }),
      getLedgerPoints(userId),
    ]);
    const points = ledger.count ? ledger.points : (user?.points || 0);
    res.json({ reports: reportCount, points, campaigns: campaignsJoined });
  } catch (error) {
    console.error("getDashboardStats:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const adminGetReports = async (req, res) => {
  try {
    const { status, category, severity, search, assigned } = req.query;
    const filter = {};

    if (status) filter.status = status;
    if (category) filter.category = category;
    if (severity) filter.severity = severity;
    if (assigned === "true") filter.assignedTo = { $ne: null };
    if (assigned === "false") filter.assignedTo = null;

    if (search?.trim()) {
      const escaped = search.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      filter.$or = [
        { title: new RegExp(escaped, "i") },
        { location: new RegExp(escaped, "i") },
        { description: new RegExp(escaped, "i") },
      ];
    }

    const reports = await Report.find(filter)
      .populate("user", "name email")
      .populate("assignedTo", "name email")
      .sort({ createdAt: -1 });

    res.json(reports);
  } catch (error) {
    console.error("adminGetReports:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const updateReportStatus = async (req, res) => {
  try {
    const { status, note = "" } = req.body;
    const allowed = ["Pending", "Under Review", "In Progress", "Resolved", "Closed"];

    if (!allowed.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const report = await Report.findById(req.params.id).populate("user", "name email");
    if (!report) return res.status(404).json({ message: "Report not found" });

    const transitions = {
      Pending: ["Pending", "Under Review"],
      "Under Review": ["Under Review", "In Progress", "Pending"],
      "In Progress": ["In Progress", "Resolved", "Under Review"],
      Resolved: ["Resolved", "Closed", "In Progress"],
      Closed: ["Closed"],
    };

    if (!transitions[report.status].includes(status)) {
      return res.status(409).json({
        message: `Cannot move a report from "${report.status}" to "${status}".`,
      });
    }

    const previousStatus = report.status;
    if (previousStatus !== status) {
      report.status = status;
      report.statusHistory.push({
        status,
        note: note.trim(),
        changedBy: req.user._id,
      });
    }

    report.adminNote = note.trim();

    if (status === "Resolved" && previousStatus !== "Resolved") {
      report.resolvedAt = new Date();
    }
    if (status !== "Resolved" && status !== "Closed") {
      report.resolvedAt = null;
    }

    await report.save();

    if (previousStatus !== status) {
      if (status === "Under Review" && previousStatus === "Pending") {
        const existing = await Reward.findOne({ report: report._id, action: "Report verified" });
        if (!existing) {
          await applyReward({ userId: report.user._id, points: 5, action: "Report verified", description: `Your report was verified by an administrator: ${report.title}`, reportId: report._id });
        }
      }
      if (status === "Pending" && previousStatus === "Under Review") {
        const existing = await Reward.findOne({ report: report._id, action: "Report verified" });
        if (existing) {
          await applyReward({ userId: report.user._id, points: -5, action: "Verification reversed", description: `Verification reward reversed because the report returned to Pending: ${report.title}`, reportId: report._id });
        }
      }
      if (status === "Resolved" && previousStatus !== "Resolved") {
        const existing = await Reward.findOne({ report: report._id, action: "Report resolved" });
        if (!existing) {
          await applyReward({ userId: report.user._id, points: 10, action: "Report resolved", description: `Your reported issue was marked resolved: ${report.title}`, reportId: report._id });
        }
      }
      if (previousStatus === "Resolved" && status === "In Progress") {
        const existing = await Reward.findOne({ report: report._id, action: "Report resolved" });
        if (existing) {
          await applyReward({ userId: report.user._id, points: -10, action: "Resolution reward reversed", description: `Resolution reward reversed because the report returned to In Progress: ${report.title}`, reportId: report._id });
        }
      }
    }

    if (previousStatus !== status) {
      await Notification.create({
        user: report.user._id,
        title: "Report status updated",
        message: `Your report "${report.title}" changed from ${previousStatus} to ${status}.${note.trim() ? ` Note: ${note.trim()}` : ""}`,
        type: "report",
      });
    }

    res.json({ message: "Report status updated", report });
  } catch (error) {
    console.error("updateReportStatus:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const assignReport = async (req, res) => {
  try {
    const { userId } = req.body;
    const report = await Report.findById(req.params.id);
    if (!report) return res.status(404).json({ message: "Report not found" });
    const assignee = await User.findById(userId).select("name email role");
    if (!assignee || assignee.role !== "admin") return res.status(400).json({ message: "A valid admin must be selected" });
    report.assignedTo = assignee._id;
    if (report.status === "Pending") {
      report.status = "Under Review";
      report.statusHistory.push({ status: "Under Review", note: "Report assigned for review", changedBy: req.user._id });
      const existing = await Reward.findOne({ report: report._id, action: "Report verified" });
      if (!existing) {
        await applyReward({ userId: report.user, points: 5, action: "Report verified", description: `Your report was verified when it was assigned for review: ${report.title}`, reportId: report._id });
      }
    }
    await report.save();
    await Notification.create({ user: report.user, title: "Report assigned", message: `Your report "${report.title}" has been assigned for review.`, type: "report" });
    res.json({ message: "Report assigned", report });
  } catch (error) {
    console.error("assignReport:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getAdminStats = async (req, res) => {
  try {
    const [
      total, pending, review, progress, resolved, closed, critical,
      users, campaigns, resolutionData, recent
    ] = await Promise.all([
      Report.countDocuments(),
      Report.countDocuments({ status: "Pending" }),
      Report.countDocuments({ status: "Under Review" }),
      Report.countDocuments({ status: "In Progress" }),
      Report.countDocuments({ status: "Resolved" }),
      Report.countDocuments({ status: "Closed" }),
      Report.countDocuments({ severity: "Critical", status: { $nin: ["Resolved", "Closed"] } }),
      User.countDocuments(),
      Campaign.countDocuments(),
      Report.aggregate([
        { $match: { resolvedAt: { $ne: null } } },
        {
          $project: {
            resolutionDays: {
              $divide: [{ $subtract: ["$resolvedAt", "$createdAt"] }, 86400000],
            },
          },
        },
        { $group: { _id: null, averageDays: { $avg: "$resolutionDays" } } },
      ]),
      Report.find().sort({ createdAt: -1 }).limit(5).select("title category severity status createdAt location"),
    ]);

    const [category, severity, status, dailyTrend, monthlyTrend] = await Promise.all([
      Report.aggregate([{ $group: { _id: "$category", count: { $sum: 1 } } }, { $sort: { count: -1 } }]),
      Report.aggregate([{ $group: { _id: "$severity", count: { $sum: 1 } } }]),
      Report.aggregate([{ $group: { _id: "$status", count: { $sum: 1 } } }]),
      Report.aggregate([
        { $match: { createdAt: { $gte: new Date(Date.now() - 30 * 86400000) } } },
        { $group: { _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }, count: { $sum: 1 }, resolved: { $sum: { $cond: [{ $in: ["$status", ["Resolved", "Closed"]] }, 1, 0] } } } },
        { $sort: { _id: 1 } },
      ]),
      Report.aggregate([
        { $match: { createdAt: { $gte: new Date(Date.now() - 180 * 86400000) } } },
        { $group: { _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } }, count: { $sum: 1 }, resolved: { $sum: { $cond: [{ $in: ["$status", ["Resolved", "Closed"]] }, 1, 0] } } } },
        { $sort: { _id: 1 } },
      ]),
    ]);

    res.json({
      totals: {
        total, pending, review, progress, resolved, closed,
        critical, users, campaigns,
        resolutionRate: total ? Math.round(((resolved + closed) / total) * 100) : 0,
        averageResolutionDays: resolutionData[0]?.averageDays
          ? Number(resolutionData[0].averageDays.toFixed(1))
          : 0,
      },
      category,
      severity,
      status,
      dailyTrend,
      monthlyTrend,
      recent,
    });
  } catch (error) {
    console.error("getAdminStats:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
