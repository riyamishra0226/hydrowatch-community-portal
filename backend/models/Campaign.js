import mongoose from "mongoose";

const campaignSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxlength: 120 },
  description: { type: String, required: true, trim: true, maxlength: 1000 },
  location: { type: String, required: true, trim: true, maxlength: 200 },
  latitude: { type: Number, min: -90, max: 90 },
  longitude: { type: Number, min: -180, max: 180 },
  date: { type: Date, required: true },
  startDate: { type: Date },
  endDate: { type: Date },
  rewardPoints: { type: Number, default: 20, min: 0, max: 10000 },
  status: { type: String, enum: ["Draft", "Pending Verification", "Upcoming", "Active", "Completed"], default: "Pending Verification" },
  source: { type: String, trim: true, maxlength: 500 },
  organizerContact: { type: String, trim: true, maxlength: 200 },
  maxParticipants: { type: Number, min: 1, max: 100000 },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  verifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  verifiedAt: { type: Date },
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
}, { timestamps: true });

campaignSchema.virtual("participantCount").get(function () { return this.participants?.length || 0; });
campaignSchema.set("toJSON", { virtuals: true });

export default mongoose.model("Campaign", campaignSchema);
