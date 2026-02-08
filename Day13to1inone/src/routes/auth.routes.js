const express = require('express')

const jwt = require('jsonwebtoken')
const noteModel = require('../model/user.model')
const authRouter = express.Router()

authRouter.post('/register',async(req,res)=>{
  const {name,email,password,age} = req.body

  const isUserAlreadyExists = await noteModel.findOne({email})

  if (isUserAlreadyExists){
    return res.status(409).json({
      message:"this email is already used"
    })
  }


  const user = await noteModel.create({
    name,email,password,age
  })

  const token = jwt.sign(
    {
      id:user._id
    },
    process.env.JWT_SECRET
  )
  
  res.cookie('jwt_token',token)
  res.status(201).json({
    message:"user created sucessfully",user,token
  })
})

authRouter.post('/login',async(req,res)=>{
  const {email,password}= req.body
  const user = await noteModel.findOne({email})
  if(!user){
    res.status(404).json({
      message:"email doesnot exists"
    })
  }

  const IsExistPassword= user.password===password
  if(!IsExistPassword){
    res.status(404).json({
      message:"password doesnot match"
    })
  }

  const token = jwt.sign(
    {
      id:user._id,
    }
    ,process.env.JWT_SECRET
  )
  res.cookie('jwt_token',token)

  res.status(200).json({
    message:"logged in ",user
  })
})

module.exports=authRouter