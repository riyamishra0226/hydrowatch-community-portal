import mongoose from "mongoose";

const rewardSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    points: { type: Number, required: true },
    action: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    report: { type: mongoose.Schema.Types.ObjectId, ref: "Report", default: null, index: true },
    campaign: { type: mongoose.Schema.Types.ObjectId, ref: "Campaign", default: null },
  },
  { timestamps: true }
);

const Reward = mongoose.model("Reward", rewardSchema);
export default Reward;
