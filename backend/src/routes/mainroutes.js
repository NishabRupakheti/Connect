const express = require("express")
const router = express.Router()
const {getRequestHandler,postRequestHandler , deleteRequestHandler} = require("../controllers/postcontrollers")
const accessMiddleware = require("../middlewares/authMiddleware")
const getall = require('../controllers/giveall')


router.get('/all',getall)

router.get("/",accessMiddleware,getRequestHandler)
router.post('/posts',accessMiddleware,postRequestHandler)
router.delete('/posts', accessMiddleware, deleteRequestHandler )


module.exports = router;