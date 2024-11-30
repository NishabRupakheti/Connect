const Post = require("../db/models/PostModel");

const increaseLike = async (req, res) => {
  const { postObjID } = req.body;
  const { userId } = req.user;
  
  try {
    const findPost = await Post.findOne({ _id: postObjID });

    if (!findPost) {
      return res.status(404).json({ message: 'Post not found' });
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
      return res.status(200).json({ message: 'Post unliked' });
    } else {
      await Post.findByIdAndUpdate(
        postObjID,
        {
          $addToSet: { likes: userId },
          $inc: { likeCount: 1 },
        },
        { new: true }
      );
      return res.status(200).json({ message: 'Post liked' });
    }
  } catch (err) {
    console.error('Error in increaseLike', err);
    return res.status(500).json({ message: 'Server error' });
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
