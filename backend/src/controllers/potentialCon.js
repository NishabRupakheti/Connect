const User = require("../db/models/USERModel");
const connection = require("../db/models/connectionmodel");

const potentialFollowers = async (req, res) => {
  const { userId } = req.user;
  try {
    const userConnection = await connection.find({
      follower: userId,
    });

    const connectionStatusMap = userConnection.reduce((acc, conn) => {
      acc[conn.following.toString()] = conn.status;
      return acc;
    }, {});

    const allUsers = await User.find({ _id: { $ne: userId } }).select(
      "userName email"
    );

    const peopleList = allUsers.map((user) => {
      const status = connectionStatusMap[user._id.toString()] || "none";
      return {
        _id: user._id,
        userName: user.userName,
        email: user.email,
        status,
      };
    });

    res.status(200).json(peopleList);
  } catch (err) {
    console.log("Error fetching people ...", err);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = potentialFollowers;
