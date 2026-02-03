const express = require('express')
const app = express()

app.use(express.json())
const noteModule = require('./model/note.model')
app.post('/api/notes',async(req,res)=>{
  const {title,description} = req.body
  const note =await noteModule.create({
    title,description
  })
  res.status(201).json({
    message:'note create sucessfully',
    note
  })
})

app.get('/api/notes',async(req,res)=>{
  const note = await noteModule.find()
  res.status(200).json({
    message:'Note fetch sucessfully',
    note
  })
})

app.delete('/api/notes/:id',async(req,res)=>{
  await noteModule.findByIdAndDelete(id)

  res.status(200).json({
    message:'note deleted'
  })
  
})

app.patch('/api/notes/:id',async(req,res)=>{
  const id =req.params.id
  const {description} = req.body
const note = noteModule.findByIdAndUpdate(id,{description})
res.status(200).json({
  message:'update sucessfully',note
})
})
module.exports=app