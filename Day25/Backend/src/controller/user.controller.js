const userModel = require('../module/auth.user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function registerUser(req,res){
  const {username,email,password,bio,profileImage} = req.body;

  const isuser = await userModel.findOne({
    $or:[
      {username},
      {email}
    ]
  })
  if(isuser){
    return res.status(409).json({message:'username or email already exists'})
  }
  const hash = await bcrypt.hash(password,10);
  const user = await userModel.create({
    username,
    email,
    password:hash,
    bio,
    profileImage
  })

  const token = jwt.sign({
    id:user._id,
    username:user.username
  },process.env.JWT_SECRET,{
    expiresIn:'1d'
  })

  res.cookie('token',token)
  res.status(201).json({message:'user registered successfully',
    user:{
      username:user.username,
      email:user.email,
      bio:user.bio,
      profileImage:user.profileImage
    }
  })

}

module.exports = {registerUser}