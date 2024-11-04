const connection = require('../controllers/connections')
const disconnect = require('../controllers/disconnect')
const accessMiddleware = require("../middlewares/authMiddleware")

const express = require('express')
const router = express.Router()
 
router.post("/connect", accessMiddleware ,connection )
router.post("/disconnect", accessMiddleware , disconnect)

module.exports = router