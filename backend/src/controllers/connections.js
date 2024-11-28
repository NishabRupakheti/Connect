const connectionModel = require('../db/models/connectionmodel')

const connect = async (req, res) => {
  const { following } = req.body;
  const { userId } = req.user

  const follower = userId

  try {
    const newConnection = new connectionModel({
        follower,
        following
    })
    await newConnection.save();
    res.status(201).json({
        message : "New friend added"
    })
  } catch (err) {
    console.error("Error with connection", err);
    if(err.code == 11000){
        return res.status(400).json({
            message : "Already friend"
        })
    }
    res.status(500).json({
        message : "Internal server error"
    })
  }
};

module.exports = connect 
