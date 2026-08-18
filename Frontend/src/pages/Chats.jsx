import React from 'react'
import logo from '../assets/user_image.jpg'
import { useApp } from '../context/AppContext'
import ChatCard from '../components/chatCard';


const Chats = () => {
    const {user} = useApp();
  return (
    <div className='w-full '>
      {/* header */}
      <div className='h-25 w-full bg-gray-50 shadow shadow-b-black'>
        <div className='text-2xl h-full font-bold mx-10 pt-12 flex justify-between'>
            <div className='cursor-pointer'>Chats</div>
            <img className='h-8 w-8 rounded-full border cursor-pointer border-black object-cover' src={logo}/>
        </div>
      </div>

      {/* container */}
      <div className='p-5 overflow-y-scroll min-h-full flex flex-col gap-3'>
        {
            user?.chats?.map((chat)=>(<ChatCard key={chat._id} chat={chat}/>))
        }
      </div>

      
    </div>
  )
}

export default Chats
