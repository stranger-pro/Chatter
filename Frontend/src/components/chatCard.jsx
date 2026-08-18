import React from 'react'
import logo from '../assets/user_image.jpg'
import { useApp } from '../context/AppContext'

const ChatCard = ({chat}) => {
    const {user,setChatStart} = useApp();
    let chatName = null;
    chat.first_user._id === user._id ? chatName = chat.second_user : chatName = chat.first_user
  return (
    <div className='w-[70%] mx-auto shadow-sm p-7 rounded-md shadow-black
     flex justify-between items-center'>
        <div className='flex gap-8 items-center'>
          <img className='h-10 w-10 rounded-full border cursor-pointer border-black object-cover' src={logo}/>
          <span>{chatName?.email?.split('@')[0].charAt(0).toUpperCase()+chatName?.email?.split('@')[0].slice(1)}</span>
        </div>
        <span className='text-right  text-sm text-blue-500 font-light mr-6 cursor-pointer hover:scale-[102%] hover:duration-200'
        onClick={()=>setChatStart(chat._id)}>
        start chat...</span>
    </div>
  )
}

export default ChatCard
