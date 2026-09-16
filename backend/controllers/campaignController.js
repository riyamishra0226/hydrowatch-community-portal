import Campaign from "../models/Campaign.js";
import User from "../models/User.js";
import Notification from "../models/Notification.js";
import Reward from "../models/Reward.js";

const normalizeStatus = (campaign) => {
  if (!campaign.verifiedAt) return campaign.status === "Completed" ? "Completed" : campaign.status;
  if (campaign.status === "Completed") return "Completed";
  const now = new Date();
  const start = campaign.startDate || campaign.date;
  const end = campaign.endDate || campaign.date;
  if (now < new Date(start)) return "Upcoming";
  if (now > new Date(end)) return "Completed";
  return "Active";
};

const canManage = (req, campaign) => req.user.role === "admin" || String(campaign.createdBy) === String(req.user._id);

export const getCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find({ status: { $in: ["Upcoming", "Active", "Completed"] }, verifiedAt: { $exists: true, $ne: null } })
      .populate("createdBy", "name role").sort({ date: 1 });
    const result = campaigns.map((c) => { const obj = c.toObject({ virtuals: true }); obj.status = normalizeStatus(c); return obj; });
    res.json(result);
  } catch (error) { console.error(error); res.status(500).json({ message: "Server Error" }); }
};


export const getManageCampaigns = async (req, res) => {
  try {
    const filter = req.user.role === "admin" ? {} : { createdBy: req.user._id };
    const campaigns = await Campaign.find(filter).populate("createdBy", "name role").populate("participants", "name email role").sort({ createdAt: -1 });
    const result = campaigns.map((c) => { const obj = c.toObject({ virtuals: true }); obj.status = normalizeStatus(c); return obj; });
    res.json(result);
  } catch (error) { console.error(error); res.status(500).json({ message: "Server Error" }); }
};

export const joinCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) return res.status(404).json({ message: "Campaign not found" });
    if (!campaign.verifiedAt) return res.status(400).json({ message: "This campaign is awaiting verification" });
    const currentStatus = normalizeStatus(campaign);
    if (currentStatus === "Completed") return res.status(400).json({ message: "This campaign is completed" });
    if (campaign.maxParticipants && campaign.participants.length >= campaign.maxParticipants) return res.status(400).json({ message: "Campaign is full" });
    if (campaign.participants.some((id) => String(id) === String(req.user._id))) return res.status(409).json({ message: "Already joined" });
    campaign.participants.push(req.user._id);
    await campaign.save();
    await Notification.create({ user: req.user._id, title: "Campaign joined", message: `You joined "${campaign.title}". Attend the campaign and get your participation verified to earn points.`, type: "campaign" });
    res.json({ message: "Joined successfully", rewardPoints: 0, verificationRequired: true });
  } catch (error) { console.error(error); res.status(500).json({ message: "Server Error" }); }
};

export const createCampaign = async (req, res) => {
  try {
    const { title, description, location, latitude, longitude, date, startDate, endDate, rewardPoints, maxParticipants, source, organizerContact } = req.body;
    if (!title || !description || !location || !date) return res.status(400).json({ message: "Title, description, location and date are required" });
    if (latitude != null && (Number(latitude) < -90 || Number(latitude) > 90)) return res.status(400).json({ message: "Invalid latitude" });
    if (longitude != null && (Number(longitude) < -180 || Number(longitude) > 180)) return res.status(400).json({ message: "Invalid longitude" });
    if (startDate && endDate && new Date(endDate) < new Date(startDate)) return res.status(400).json({ message: "End date cannot be before start date" });
    const campaign = await Campaign.create({ title, description, location, latitude, longitude, date, startDate, endDate, rewardPoints, maxParticipants, source, organizerContact, createdBy: req.user._id, status: req.user.role === "admin" ? "Upcoming" : "Pending Verification", verifiedBy: req.user.role === "admin" ? req.user._id : undefined, verifiedAt: req.user.role === "admin" ? new Date() : undefined });
    res.status(201).json(campaign);
  } catch (error) { res.status(400).json({ message: error.message || "Invalid campaign" }); }
};

export const updateCampaign = async (req, res) => {
  try {
    const existing = await Campaign.findById(req.params.id);
    if (!existing) return res.status(404).json({ message: "Campaign not found" });
    if (!canManage(req, existing)) return res.status(403).json({ message: "You can only manage campaigns you created" });
    const allowedFields = ["title", "description", "location", "latitude", "longitude", "date", "startDate", "endDate", "rewardPoints", "maxParticipants", "source", "organizerContact"];
    const data = Object.fromEntries(allowedFields.filter((key) => Object.prototype.hasOwnProperty.call(req.body, key)).map((key) => [key, req.body[key]]));
    if (data.startDate && data.endDate && new Date(data.endDate) < new Date(data.startDate)) return res.status(400).json({ message: "End date cannot be before start date" });
    if (data.maxParticipants !== undefined && data.maxParticipants !== null && Number(data.maxParticipants) < existing.participants.length) return res.status(400).json({ message: "Maximum participants cannot be below the current participant count" });
    if (req.user.role !== "admin") data.status = "Pending Verification";
    const campaign = await Campaign.findByIdAndUpdate(req.params.id, data, { new: true, runValidators: true });
    res.json(campaign);
  } catch (error) { res.status(400).json({ message: error.message || "Invalid campaign" }); }
};

export const deleteCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) return res.status(404).json({ message: "Campaign not found" });
    if (!canManage(req, campaign)) return res.status(403).json({ message: "You can only delete campaigns you created" });
    await campaign.deleteOne();
    res.json({ message: "Campaign deleted" });
  } catch (error) { res.status(500).json({ message: "Server Error" }); }
};

export const verifyCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) return res.status(404).json({ message: "Campaign not found" });
    campaign.verifiedBy = req.user._id;
    campaign.verifiedAt = new Date();
    campaign.status = "Upcoming";
    await campaign.save();
    res.json({ message: "Campaign verified and published", campaign });
  } catch (error) { console.error(error); res.status(500).json({ message: "Server Error" }); }
};

export const verifyParticipation = async (req, res) => {
  try {
    const participant = await User.findById(req.params.userId).select("role");
    if (!participant || !["user", "volunteer"].includes(participant.role)) return res.status(400).json({ message: "Only community participants can receive campaign rewards" });
    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) return res.status(404).json({ message: "Campaign not found" });
    if (!canManage(req, campaign)) return res.status(403).json({ message: "Only the campaign creator or an administrator can verify participation" });
    if (!campaign.participants.some((id) => String(id) === String(req.params.userId))) return res.status(400).json({ message: "User has not joined this campaign" });
    const alreadyRewarded = await Reward.exists({ user: req.params.userId, campaign: campaign._id, action: "Campaign participation verified" });
    if (alreadyRewarded) return res.status(409).json({ message: "Participation has already been verified" });
    const points = campaign.rewardPoints || 0;
    if (points > 0) {
      await User.findByIdAndUpdate(req.params.userId, { $inc: { points } });
      await Reward.create({ user: req.params.userId, points, action: "Campaign participation verified", description: `Verified participation in: ${campaign.title}`, campaign: campaign._id });
    }
    await Notification.create({ user: req.params.userId, title: "Campaign participation verified", message: points > 0 ? `Your participation in "${campaign.title}" was verified. You earned ${points} points.` : `Your participation in "${campaign.title}" was verified.`, type: "campaign" });
    res.json({ message: "Participation verified", rewardPoints: points });
  } catch (error) { console.error(error); res.status(500).json({ message: "Server Error" }); }
};

export const getCampaignStats = async (req, res) => {
  try {
    const campaigns = await Campaign.find();
    const totalParticipants = campaigns.reduce((sum, c) => sum + (c.participants?.length || 0), 0);
    res.json({
      total: campaigns.length,
      upcoming: campaigns.filter(c => normalizeStatus(c) === "Upcoming").length,
      active: campaigns.filter(c => normalizeStatus(c) === "Active").length,
      completed: campaigns.filter(c => normalizeStatus(c) === "Completed").length,
      pendingVerification: campaigns.filter(c => c.status === "Pending Verification").length,
      totalParticipants,
      averageParticipants: campaigns.length ? Number((totalParticipants / campaigns.length).toFixed(1)) : 0,
    });
  } catch (error) { console.error(error); res.status(500).json({ message: "Server Error" }); }
};

export const getUsers = async (req, res) => {
  try { res.json(await User.find().select("name email role points createdAt").sort({ createdAt: -1 })); }
  catch (error) { res.status(500).json({ message: "Server Error" }); }
};
