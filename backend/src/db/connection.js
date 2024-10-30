require('dotenv').config()
const mongoose = require("mongoose")
const mongoURI = process.env.MONGO_URI


const connectDB = async ()=>{
    try{
        await mongoose.connect(mongoURI)
        console.log("The database is connected")
    }
    catch(err){
        console.error("Error connecting to database" , err )
    }
}

module.exports = connectDB