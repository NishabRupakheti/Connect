const mongoose = require("mongoose");

const connectionSchema = new mongoose.Schema(
  {
    follower: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    following: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      requierd: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted","rejected"],
      default: "pending",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

connectionSchema.index(
  {
    follower: 1,
    following: 1,
  },
  {
    unique: true,
  }
);

const Connection = mongoose.model("Connection",connectionSchema)
module.exports = Connection

