import { useState } from 'react'
import './App.css'
import Homepage from './pages/Homepage'
import CommentPage from './pages/CommentPage'
import { userPostData } from './utils/data'

function App() {

  return (
    <>
      <Homepage userData={userPostData}/>
      {/* <CommentPage /> */}
    </>
  )
}

export default App
