import Report from "../models/Report.js";
import User from "../models/User.js";

export const createReport = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      location,
      image,
      user,
    } = req.body;

    const report = await Report.create({
      title,
      description,
      category,
      location,
      image,
      user,
    });

    await User.findByIdAndUpdate(
     user,
     {
       $inc: { points: 10 },
     }
   );

    res.status(201).json({
      message: "Report submitted successfully",
      report,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const getMyReports = async (req, res) => {
  try {
    const { userId } = req.params;

    const reports = await Report.find({ user: userId }).sort({
      createdAt: -1,
    });

    res.status(200).json(reports);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};


export const deleteReport = async (req, res) => {
  try {
    const { id } = req.params;

    const report = await Report.findByIdAndDelete(id);

    if (!report) {
      return res.status(404).json({
        message: "Report not found",
      });
    }

    res.status(200).json({
      message: "Report deleted successfully",
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const getLeaderboard = async (req, res) => {
  try {
    const users = await User.find()
      .select("name points")
      .sort({ points: -1 });

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};