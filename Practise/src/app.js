
const express = require('express')
const app = express()
const authRouter=require('./routes/auth.route')
app.use(express.json())
const cookieParser=require('cookie-parser')
app.use('/api/auth',authRouter)
app.use(cookieParser())



module.exports=app