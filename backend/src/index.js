require("dotenv").config(); 
const app = require("./app");
const port = process.env.PORT;
const connectDB = require("./db/connection");

connectDB().then(() => {
  app.listen(port, () => {
    console.log("Server listening at port number ", port);
  })
})
.catch((err)=>{
    console.log("Error starting the server",err)
})
