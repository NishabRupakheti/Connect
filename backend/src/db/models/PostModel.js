const mongoose = require("mongoose");
const PostSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    message: {
      type: String,
      required: [true, "Message conetent is required"],
      maxlength: [100, "Message context cannot exceed 100 characters"],
    },
    likeCount: {
      type: Number,
      default: 0,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],

    comments: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: false,
        },
        message: {
          type: String,
          required: [true, "Comment should not be empty"],
          maxlength: [100, "COmment should not exceed 20 characters"],
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
      { timestamps: true },
    ],
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", PostSchema);
module.exports = Post;
