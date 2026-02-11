const express = require('express')
const app = express()
const authrouter = require('./routes/auth.route')
app.use(express.json())
const cookieParser=require('cookie-parser')
app.use(cookieParser())
app.use('/api/auth',authrouter)




module.exports=app