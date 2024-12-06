const User = require("../db/models/USERModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const jwtkey = process.env.JWT_TOKEN;
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  const { email, userName, passwordHash } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(409).json({
        message: "User already found",
      });
    }
    const newUser = new User({
      userName,
      email,
      passwordHash,
    });

    await newUser.save();
    res.status(201).json({
      message: "User registered successfully",
    });
  } catch (err) {
    console.error("Error in register function", err);
  }
};


const login = async (req, res) => {
  const { email, passwordHash } = req.body;

  try {
    const findUser = await User.findOne({ email: email });
    if (!findUser) {
      return res.status(404).json({ message: "USER NOT FOUND" });
    }

    bcrypt.compare(passwordHash, findUser.passwordHash, (err, result) => {
      if (err || !result) {
        return res.status(401).json({ message: "Invalid password" });
      }

      const payload = {
        userId: findUser._id,
        userName: findUser.userName,
        email: findUser.email,
      };

      jwt.sign(payload, jwtkey, { expiresIn: '1h' }, (err, token) => {
        if (err) {
          console.error("Error while generating Jsonwebtoken", err);
          return res.status(500).json({ message: "Internal server error" });
        }
        
        res.status(200).json({ token: token });
      });
    });

  } catch (err) {
    console.error("Error in login function", err);
    res.status(500).json({ message: "Server error during login" });
  }
};

module.exports = { register, login };
