const User = require("../db/models/USERModel");
const connection = require("../db/models/connectionmodel");

const givefriends = async (req, res) => {
  const { userId } = req.user;
  try {
    const followedUsers = await connection
      .find({ follower: userId })
      .select("following");
    const followedIds = followedUsers.map((conn) => conn.following);

    const potentialFriends = await User.find({
      _id: { $nin: [...followedIds, userId] },
    }).select("userName email");

    res.status(200).json({
      message: "Potential friends retrieved successfully",
      potentialFriends,
    });
  } catch (err) {
    console.log("Error fetching people ...", err);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = givefriends;
