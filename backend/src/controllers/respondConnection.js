const connectionModel = require("../db/models/connectionmodel");

const respondConnection = async (req, res) => {
  const { requestId, action } = req.body;
  const { userId } = req.user;

  try {
    const followReq = await connectionModel.findById(requestId);

    if (!followReq) {
      return res.status(404).json({
        message: "Follow request not found",
      });
    }

    if (followReq.following.toString() !== userId) {
      return res.status(403).json({
        message: "Unauthorized!!", 
      });
    }

    if (action == "accept") {
      followReq.status = "accepted";
      await followReq.save();
      return res.status(201).json({
        message: "Accepted",
      });
    } else if (action == "reject") {
      followReq.status = "rejected";
      await followReq.deleteOne();
      return res.status(201).json({
        message: "Rejected",
      });
    } else {
      return res.status(400).json({
        message: "Invalid action",
      });
    }
  } catch (err) {
    console.error("Error on the respond connection function:", err.message);
    res.status(500).json({
      message: "Internal server error",
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
};

module.exports = respondConnection;
