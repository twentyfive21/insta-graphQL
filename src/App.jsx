import { useState } from 'react'
import './App.css'
import Homepage from '../src/pages/Homepage/Homepage'
import { userPostData } from './utils/data'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import UserLogin from './pages/UserLogin/UserLogin'

function App() {
  return (
      <BrowserRouter>
        <Routes>
        <Route path='/' element={<UserLogin />} />
        <Route path="/feed" element={<Homepage userData={userPostData} />} />
        </Routes>
      </BrowserRouter>
  )
}

export default App
