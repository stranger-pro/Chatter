import React from 'react'
import logo from '../assets/chat_logo.webp'
import { IoIosAdd } from "react-icons/io";
import { CiChat1 } from "react-icons/ci";
import { MdLogout } from "react-icons/md";
import { useApp } from '../context/AppContext';
import { useLocation, useNavigate } from 'react-router-dom';


const Sidebar = () => {
  const {logout} = useApp()
  const navigate = useNavigate()
  const location = useLocation()
  return (
    <div className='flex flex-col py-7 px-8 h-screen max-h-screen justify-between'>
    {/* top */}
      <div className='flex gap-3 flex-col'>
        {/* logo */}
        <div className='flex gap-3 items-center  mb-3'>
          <img src={logo} className='h-7 w-7 flex items-center justify-center'/>
          <span className='text-2xl font-bold justify-center items-center'>Chatter</span>
        </div>

        {/* add button */}

        <button onClick={()=>navigate('/search')} className='text-md mb-4 font-light w-full rounded-md flex items-center justify-center gap-1
        cursor-pointer hover:scale-[98%] hover:duration-200  py-3 px-4 bg-blue-500 text-white'>
          <IoIosAdd className='text-xl'/>
          <span> New Chat</span>
        </button>

        {/* options */}
        <div className='flex flex-col gap-3'>

          <div onClick={()=>navigate('/chat')} className={` ${location.pathname==="/chat"?"bg-blue-100 rounded-sm":""} py-1.5 flex gap-3 items-center px-3 cursor-pointer `}>
            <CiChat1 className='text-xl'/> 
            <span className='text-md text-gray-600'>Chats</span>
          </div>

          {/* add more in future */}
        </div>

      </div>
    
    {/* buttom */}
      <div>
        <div onClick={logout} className='flex gap-3 items-center px-3 cursor-pointer'>
            <MdLogout className='text-xl'/> 
            <span className='text-md text-gray-600'>Log out</span>
          </div>
      </div>
      
    </div>
  )
}

export default Sidebar
