import React from 'react'
import logo from '../assets/user_image.jpg'
import { useApp } from '../context/AppContext'

const SearchCard = ({list}) => {
  const {user,setChatCreate} = useApp();
 
  
  if(user._id===list._id){
    return null;
  }
  
  return (
    <div className='w-[70%] mx-auto shadow cursor-pointer hover:scale-[102%] hover:duration-200 p-7 rounded-md shadow-black
     flex gap-8 items-center' onClick={()=>(setChatCreate(list._id))}>
        <img className='h-10 w-10 rounded-full border cursor-pointer border-black object-cover' src={logo}/>
        <span>{list?.email?.split('@')[0]}</span>
    </div>
  )
}

export default SearchCard
