const Post = require("../db/models/PostModel");
const connectionModel = require("../db/models/connectionmodel");

const getRequestHandler = async (req, res) => {
  const { userId, userName } = req.user;

  try {
    const findConnection = await connectionModel
      .find({ follower: userId })
      .select("following");

    const followingUserIds = findConnection.map((conn) => conn.following);
    followingUserIds.push(userId);

    const findPost = await Post.find({ userId: { $in: followingUserIds } })
      .sort({ createdAt: -1 })
      .populate("userId", "userName email")
      .populate("comments.userId", "userName");

    res.status(200).json({
      findPost: findPost,
      userInfo: userName,
      userId: userId,
    });
  } catch (err) {
    console.error("Error in get request handler", err);
    res.json({
      message: "Error fetching the data",
    });
  }
};

const postRequestHandler = async (req, res) => {
  const { message, likeCount, comments } = req.body;
  const { userId } = req.user;

  try {
    const newPost = new Post({
      userId,
      message,
      likeCount,
      comments,
    });

    await newPost.save();

    res.status(201).json({
      message: "Post saved",
      post: newPost,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
    });
    console.error("Error in post request handler", err);
  }
};

const deleteRequestHandler = async (req, res) => {
  const { postObjId } = req.params;
  try {
    const deletepost = await Post.findByIdAndDelete(postObjId);
    res.status(201).json({
      message: "The post is deleted",
      deletepost,
    });
  } catch (err) {
    console.error("Error on deleteRequestHandler", err);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = {
  getRequestHandler,
  postRequestHandler,
  deleteRequestHandler,
};
