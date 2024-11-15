const Post = require("../db/models/PostModel");
const connectionModel = require("../db/models/connectionmodel");
const User = require('../db/models/USERModel')

const getRequestHandler = async(req, res) => {

  const {userId} = req.user

  try {
    const findConnection = await connectionModel.find({follower : userId}).select("following")

    const followingUserIds = findConnection.map(conn => conn.following)
    followingUserIds.push(userId)

    const findPost = await Post.find({ userId : {$in: followingUserIds } }).sort({createdAt : -1}).populate('userId','userName email')

    res.status(200).json(findPost)
  }
  catch(err){
    console.error("Error in get request handler",err)
    res.json({
      message : "Error fetching the data",
    })
  }
};

const postRequestHandler = async (req, res) => {
  const { userId, message, likeCount, comments } = req.body;
  try {
    const newPost = new Post({
      userId,
      message,
      likeCount,
      comments,
    });

     
    await newPost.save()

    res.status(201).json({
        message : "Post saved",
        post: newPost
    })

  } catch (err) {
    res.status(500).json({
      message : "Internal server error"
    })
    console.error("Error in post request handler", err);
  }
};

const deleteRequestHandler = async (req,res)=>{
  const _id = req.body.ObjId
    try{
      const deletepost = await Post.findByIdAndDelete(_id)
      
      res.status(201).json({
        message : "The post is deleted",
        deletepost
      })

    }
    catch(err){
      console.error("Error on deleteRequestHandler",err)
      res.status(500).json({
        message : "Internal server error"
      })
    }
}

module.exports = { getRequestHandler, postRequestHandler , deleteRequestHandler };
