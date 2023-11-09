import React from 'react'
import "./NotFound.css"
import {FaHome} from 'react-icons/fa'

function NotFound() {
  return (
   <div class="hero">
  <div class="text-center hero-content">
    <div class="max-w-lg">
      <h1 class="mb-8 font-bold text-8xl">
        Oops!
      </h1>
      <p class="mb-8 text-5xl">404 Page - not found!</p>
      <a href="/" class="btn btn-primary btn-lg">
         <FaHome className='mr-2'/>
            Back to Home
      </a>
    </div>
  </div>
</div>

  )
}

export default NotFound