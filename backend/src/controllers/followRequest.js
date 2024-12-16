const connection = require("../db/models/connectionmodel");
const getFollowRequest = async (req, res) => {
  const { userId } = req.user;

  try {
    const response = await connection
      .find({ following: userId, status: "pending" })
      .populate("follower", "_id email userName createdAt");
    res.status(200).json(response);
  } catch (err) {
    console.log("Error in the getFollowRequest", err);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = getFollowRequest;
