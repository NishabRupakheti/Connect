const express = require('express')
const router = express.Router()
const {increaseComment , increaseLike , deleteComment} = require("../controllers/postfunctions")
const accessMiddleware = require("../middlewares/authMiddleware")


router.put('/like', accessMiddleware, increaseLike)
router.put('/comment', accessMiddleware, increaseComment)
router.delete('/comment/:postObjId/:commentId', accessMiddleware , deleteComment )

module.exports = router;
