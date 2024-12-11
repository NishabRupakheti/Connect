const connectionModel = require("../db/models/connectionmodel");

const respondConnection = async (req, res) => {
  const { requestId, action } = req.body;
  const { userId } = req.user;

  try {
    const followReq = await connectionModel.findById(requestId);

    if (followReq.following.toString() !== userId) {
      res.status(403).json({
        message: "Unauthorized!!", 
      });
    }

    if (action == "accept") {
      followReq.status = "accepted";
      await followReq.save();
      res.status(201).json({
        message: "Accepted",
      });
    } else if (action == "reject") {
      followReq.status = "rejected";
      await followReq.deleteOne();
      res.status(201).json({
        message: "Rejected",
      });
    }
  } catch (err) {
    console.log("Error on the respond connection function", err);
    res.status(500).json({
      message: "Internal server error"
    });
  }
};

module.exports = respondConnection;
