const Post = require("../db/models/PostModel");

const getRequestHandler = (req, res) => {
  res.send("Hello world");
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
