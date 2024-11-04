const connectionModel = require('../db/models/connectionmodel')
const disconnect = async (req,res)=>{
    const { follower, following } = req.body;

    try{
        await connectionModel.deleteOne({
            follower: follower,
            following : following
        })
        res.status(201).json({
            message : "The connection is deleted"
        })
    }

    catch(err){
        console.error("Disconnection function error",err)
        res.status(500).json({
            message : "Internal server error "
        })
    }
}

module.exports = disconnect