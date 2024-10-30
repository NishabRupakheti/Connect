const express = require('express')
const router = express.Router()
const {increaseComment , increaseLike} = require("../controllers/postfunctions")
const accessMiddleware = require("../middlewares/authMiddleware")


router.put('/like', accessMiddleware, increaseLike)
router.put('/comment', accessMiddleware, increaseComment)


module.exports = router;
