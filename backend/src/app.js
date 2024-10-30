const express = require('express');
const app = express();
app.use(express.json())
const postrouters = require('./routes/mainroutes')
const authRouter = require('./routes/authRouters')
const postfunctionRoutes = require('./routes/postfuncroutes')


app.use("/api",postrouters)
app.use("/auth",authRouter)
app.use("/post", postfunctionRoutes)

module.exports = app;
