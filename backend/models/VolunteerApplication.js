import mongoose from "mongoose";

const volunteerApplicationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
  reason: { type: String, required: true, trim: true, maxlength: 1000 },
  experience: { type: String, trim: true, maxlength: 1000 },
  availability: { type: String, trim: true, maxlength: 500 },
  status: { type: String, enum: ["Pending", "Approved", "Rejected"], default: "Pending" },
  reviewedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  reviewedAt: { type: Date },
  adminNote: { type: String, trim: true, maxlength: 500 },
}, { timestamps: true });

export default mongoose.model("VolunteerApplication", volunteerApplicationSchema);
