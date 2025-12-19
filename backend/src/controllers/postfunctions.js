const Post = require("../db/models/PostModel");

const increaseLike = async (req, res) => {
  const { postObjID } = req.body;
  const { userId } = req.user;

  try {
    const findPost = await Post.findOne({ _id: postObjID });

    if (!findPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    const hasLiked = findPost.likes.includes(userId);

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
      return res.status(200).json({ message: "Post unliked" });
    } else {
      await Post.findByIdAndUpdate(
        postObjID,
        {
          $addToSet: { likes: userId },
          $inc: { likeCount: 1 },
        },
        { new: true }
      );
      return res.status(200).json({ message: "Post liked" });
    }
  } catch (err) {
    console.error("Error in increaseLike", err);
    return res.status(500).json({ message: "Server error" });
  }
};

const increaseComment = async (req, res) => {
  const { postObjID, message } = req.body;
  const { userId } = req.user;

  try {
    const findpost = await Post.findOne({ _id: postObjID });
    
    if (!findpost) {
      return res.status(404).json({
        message: "Post not found",
      });
    }
    
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
    console.error("Error on increaseComment:", err.message);
    res.status(500).json({
      message: "Error adding comment",
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
};

const deleteComment = async (req, res) => {
  const { postObjId, commentId } = req.params;

  try {
    const response = await Post.findById(postObjId);

    if (!response) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    const commentIndex = response.comments.findIndex(
      (comment) => comment._id.toString() === commentId
    );

    if (commentIndex === -1) {
      return res.status(404).json({
        message: "Comment not found",
      });
    }

    response.comments.splice(commentIndex, 1);

    await response.save();

    res.status(201).json({
      message: "The comment is deleted",
    });
  } catch (err) {
    console.error("Error on deleteComment controller:", err.message);
    res.status(500).json({
      message: "Error deleting comment",
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
};

module.exports = { increaseComment, increaseLike, deleteComment };
