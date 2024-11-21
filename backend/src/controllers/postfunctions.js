const Post = require("../db/models/PostModel");

const increaseLike = async (req, res) => {
  const { postObjID } = req.body;
  const { userId } = req.user;

  try {
    const findpost = await Post.findOne({ _id: postObjID });
    const hasLiked = findpost.likes.includes(userId);
    if (hasLiked) {
      await Post.findByIdAndUpdate(
        postObjID,
        {
          $pull: {
            likes: userId,
          },
          $inc: {
            likeCount: -1,
          },
        },
        { new: true }
      );
    } else {
      await Post.findByIdAndUpdate(
        postObjID,
        {
          $addToSet: { likes: userId },
          $inc: { likeCount: 1 },
        },
        { new: true }
      );

      res.status(200).json({
        message: hasLiked ? "Post unliked" : "Post liked",
      });

    }
  } catch (err) {
    console.error("Error in increaseLike", err);
  }
};

const increaseComment = async (req, res) => {
  const { postObjID, message } = req.body;
  const { userId } = req.user;

  try {
    const findpost = await Post.findOne({ _id: postObjID });
    findpost.comments.push({
      userId: userId,
      message: message,
    });

    await findpost.save();

    res.status(201).json({
      message: "Comment successfull",
      findpost,
    });
  } catch (err) {
    console.error("Something went wrong on increaseComment ", err);
  }
};

module.exports = { increaseComment, increaseLike };
