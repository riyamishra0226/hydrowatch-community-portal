import mongoose from "mongoose";

const campaignSchema = new mongoose.Schema({
  title: String,
  description: String,
  location: String,
  date: Date,
  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

export default mongoose.model("Campaign", campaignSchema);