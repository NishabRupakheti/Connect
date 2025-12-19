const connection = require("../db/models/connectionmodel");

const showConnection = async (req, res) => {
  try {
    const { userId } = req.user;

    const connections = await connection
      .find({ follower: userId, status: "accepted" })
      .populate("following", "userName email");

    const followingUsers = connections.map((connection) => connection.following);

    res.status(200).json(followingUsers);
  } catch (err) {
    console.error("Error fetching connections:", err.message);
    res.status(500).json({
      message: "Error retrieving connections",
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
};

module.exports = showConnection;
