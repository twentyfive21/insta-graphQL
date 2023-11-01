import { useState } from 'react'
import './App.css'
import Homepage from '../src/pages/Homepage/Homepage'
import { userPostData } from './utils/data'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import UserLogin from './pages/UserLogin/UserLogin'
import ProfilePage from './pages/ProfilePage/ProfilePage'
import UserSignUp from './pages/UserSignUp/UserSignUp'
import UserContextProvider from './contexts/CurrentUser'

function App() {
  return (
    <UserContextProvider>
      <BrowserRouter>
        <Routes>
        <Route path='/' element={<UserLogin />} />
        <Route path='/sign-up' element={<UserSignUp />} />
        <Route path="/feed" element={<Homepage userData={userPostData} />} />
        <Route path="/profile-page" element={<ProfilePage />} />
        </Routes>
      </BrowserRouter>
      </UserContextProvider>
  )
}

export default App
