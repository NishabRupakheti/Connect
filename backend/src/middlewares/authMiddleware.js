require("dotenv").config();
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_TOKEN;

const accessMiddleware = (req, res, next) => {
  const authHead = req.headers["authorization"];
  const token = authHead && authHead.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(500).json({
      message: "Internal server error. Check for server console to debug",
    });
    console.log("Error while token verification", err);
  }
};

module.exports = accessMiddleware;
