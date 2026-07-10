import Campaign from "../models/Campaign.js";

// Get all campaigns
export const getCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find().sort({ date: 1 });

    res.status(200).json(campaigns);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// Join campaign
export const joinCampaign = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    const campaign = await Campaign.findById(id);

    if (!campaign) {
      return res.status(404).json({
        message: "Campaign not found",
      });
    }

    if (!campaign.participants.includes(userId)) {
      campaign.participants.push(userId);
      await campaign.save();
    }

    res.status(200).json({
      message: "Joined successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};