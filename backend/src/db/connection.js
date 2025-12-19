require('dotenv').config()
const mongoose = require("mongoose")
const mongoURI = process.env.MONGO_URI

const connectDB = async ()=>{
    try{
        await mongoose.connect(mongoURI, {
            serverSelectionTimeoutMS: 30000,
            socketTimeoutMS: 45000,
            maxPoolSize: 10,
            minPoolSize: 2,
            retryWrites: true,
            retryReads: true,
        })
        console.log("✅ MongoDB connected successfully")
        
        mongoose.connection.on('error', (err) => {
            console.error('❌ MongoDB connection error:', err)
        })
        
        mongoose.connection.on('disconnected', () => {
            console.warn('⚠️ MongoDB disconnected. Attempting to reconnect...')
        })
        
        mongoose.connection.on('reconnected', () => {
            console.log('✅ MongoDB reconnected')
        })
    }
    catch(err){
        console.error("❌ Error connecting to database:", err.message)
        console.error("Full error:", err)
        process.exit(1)
    }
}

module.exports = connectDB