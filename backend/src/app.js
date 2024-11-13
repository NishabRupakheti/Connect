const express = require('express');
const app = express();
const cors = require('cors')
app.use(express.json())
app.use(cors())

const postrouters = require('./routes/mainroutes')
const authRouter = require('./routes/authRouters')
const postfunctionRoutes = require('./routes/postfuncroutes')
const connectionRoutes = require('./routes/connectionRoutes')

app.use("/api",postrouters)
app.use("/auth",authRouter)
app.use("/post", postfunctionRoutes)
app.use("/friend", connectionRoutes)

app.get("*",(_,res)=>{
    res.status(404).json({
        message : "Resource not found"
    })
})

module.exports = app;
