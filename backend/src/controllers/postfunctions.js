const Post = require("../db/models/PostModel")

const increaseLike = async (req,res)=>{
    const {postObjID} = req.body;

    try{
        const findpost = await Post.findOne({ _id : postObjID})
        findpost.likeCount += 1
        findpost.save()
        res.json(findpost)
    }
    catch(err){
        console.error("Error in increaseLike", err)
    }

}

const increaseComment = async (req,res)=>{
    const {postObjID,userId,message} = req.body

    try{
        const findpost = await Post.findOne({_id : postObjID})
        findpost.comments.push({
            userId: userId,
            message: message,
        })

        await findpost.save()

        res.status(201).json({
            message : "Comment successfull",
            findpost
        })

    }
    catch(err){
        console.error("Something went wrong on increaseComment " , err)
    }

}

module.exports = {increaseComment , increaseLike}