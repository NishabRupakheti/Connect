const User = require('../db/models/USERModel')

const getusers = async (req,res)=>{
    try{    
        const findData = await User.find({})
        res.status(200).json(findData)
    }
    catch(err){
        console.log("Error fetching all datas")
        res.status(500).json({
            message : "Internal server error"
        })
    }
}

module.exports = getusers