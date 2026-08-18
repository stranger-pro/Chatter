import React from 'react'
import logo from '../assets/chat_logo.webp'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate()
  return (
    <nav className='h-12 w-full bg-white/70 p-3 boarder-b-2 shadow-sm border-gray-200'>
      <div className='flex justify-between mx-16'>
        <div className='flex gap-3 items-center justify-center'>
            <img src={logo} className='h-6 w-6 flex items-center justify-center'/>
            <span className='text-xl font-bold justify-center items-center'>Chatter</span>
        </div>
        {/* buttons */}
        <div className='flex gap-3 items-center'>
            <div className='border-2 border-blue-300 text-blue-400 px-2 rounded-xl cursor-pointer hover:scale-95
            ' onClick={()=>navigate('/signin')}>sign in</div>
            <div className='border-2 border-blue-300 text-blue-400 px-2 rounded-xl cursor-pointer hover:scale-95
            ' onClick={() => navigate('/signup')}>sign up</div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
