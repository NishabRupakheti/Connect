const connection = require('../controllers/connections')
const disconnect = require('../controllers/disconnect')
const showConnection = require('../controllers/showConnection')
const potentialFollowers = require('../controllers/potentialCon')
const respondConnection = require('../controllers/respondConnection')
const accessMiddleware = require("../middlewares/authMiddleware")
const getFollowRequest = require('../controllers/followRequest')

const express = require('express')
const router = express.Router()
 
router.post("/connect", accessMiddleware ,connection )
router.post("/disconnect", accessMiddleware , disconnect)
router.get('/connection', accessMiddleware , showConnection)
router.get('/people',accessMiddleware , potentialFollowers)
router.post('/resconnect', accessMiddleware , respondConnection)
router.get('/followers',accessMiddleware, getFollowRequest)

module.exports = router