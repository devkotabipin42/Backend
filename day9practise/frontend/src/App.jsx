import React from 'react'
import { useState } from 'react'
import  axios  from "axios";

const App = () => {

  const [notes, setNotes] = useState(
    [
      {
    title:"test title 1",
    description:'test description'
  },
      {
    title:"test title 2",
    description:'test description'
  },
      {
    title:"test title 2",
    description:'test description'
  }
])
axios.get('http://localhost:3000/api/notes')
.then((res)=>{
  console.log(res.data);
  
})
  return (
    <div className='notes'>
      {
        notes.map(note=>{
        return<div className='notes'>
        <h1>{note.title}</h1>
        <p>{note.description}</p>
      </div>
        })
      }
      
    </div>
  )
}

export default App
