import VolunteerApplication from "../models/VolunteerApplication.js";
import User from "../models/User.js";
import Notification from "../models/Notification.js";

export const getMyApplication = async (req, res) => {
  try {
    const application = await VolunteerApplication.findOne({ user: req.user._id })
      .populate("reviewedBy", "name email");
    res.json(application);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const applyForVolunteer = async (req, res) => {
  try {
    if (req.user.role === "admin") return res.status(400).json({ message: "Administrators cannot apply for volunteer status" });
    if (req.user.role === "volunteer") return res.status(400).json({ message: "You are already a volunteer" });

    const { reason, experience = "", availability = "" } = req.body;
    if (!reason?.trim()) return res.status(400).json({ message: "Please explain why you want to become a volunteer" });

    const existing = await VolunteerApplication.findOne({ user: req.user._id });
    if (existing?.status === "Pending") return res.status(409).json({ message: "You already have a pending volunteer application" });
    if (existing?.status === "Approved") return res.status(400).json({ message: "Your volunteer application is already approved" });

    const application = existing
      ? await VolunteerApplication.findByIdAndUpdate(existing._id, {
          reason: reason.trim(), experience: experience.trim(), availability: availability.trim(),
          status: "Pending", reviewedBy: undefined, reviewedAt: undefined, adminNote: undefined,
        }, { new: true, runValidators: true })
      : await VolunteerApplication.create({ user: req.user._id, reason: reason.trim(), experience: experience.trim(), availability: availability.trim() });

    res.status(201).json({ message: "Volunteer application submitted", application });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message || "Could not submit application" });
  }
};

export const getVolunteerApplications = async (req, res) => {
  try {
    const applications = await VolunteerApplication.find()
      .populate("user", "name email role createdAt")
      .populate("reviewedBy", "name email")
      .sort({ status: 1, createdAt: -1 });
    res.json(applications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const reviewVolunteerApplication = async (req, res) => {
  try {
    const { status, adminNote = "" } = req.body;
    if (!["Approved", "Rejected"].includes(status)) return res.status(400).json({ message: "Invalid review status" });

    const application = await VolunteerApplication.findById(req.params.id).populate("user", "name email role");
    if (!application) return res.status(404).json({ message: "Application not found" });

    if (status === "Approved") {
      await User.findByIdAndUpdate(application.user._id, { role: "volunteer" });
      await Notification.create({
        user: application.user._id,
        title: "Volunteer application approved",
        message: "Your volunteer application was approved. You can now create and manage community campaigns.",
        type: "campaign",
      });
    } else {
      await Notification.create({
        user: application.user._id,
        title: "Volunteer application reviewed",
        message: adminNote.trim() ? `Your volunteer application was rejected. Note: ${adminNote.trim()}` : "Your volunteer application was rejected. You can apply again later.",
        type: "campaign",
      });
    }

    application.status = status;
    application.reviewedBy = req.user._id;
    application.reviewedAt = new Date();
    application.adminNote = adminNote.trim();
    await application.save();

    res.json({ message: `Application ${status.toLowerCase()}`, application });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
