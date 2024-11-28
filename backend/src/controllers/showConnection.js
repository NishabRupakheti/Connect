const connection = require("../db/models/connectionmodel");

const showConnection = async (req, res) => {
  const { userId } = req.user;

  const connections = await connection
    .find({ follower: userId })
    .populate("following", "userName email");

  const followingUsers = connections.map((connection) => connection.following);

  res.status(200).json(followingUsers);
};

module.exports = showConnection;
