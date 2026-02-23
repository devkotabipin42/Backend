const express = require('express')
const {followUserCollection} = require('../controller/user.controller')
const IdentifyUser=require('../middleware/auth.middleware')
const userRouter = express.Router()


userRouter.post('/follow/:userid',IdentifyUser,followUserCollection)




module.exports=userRouter