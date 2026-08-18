import React from 'react'
import { useApp } from '../context/AppContext'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'

const Home = () => {
  return (
    <div className='h-screen max-h-screen grid grid-cols-9 grid-flow-col'>
     
    {/* left sidebar */}
    <div className='col-span-2 border-r border-black/20 shadow-gray-300 bg-gray-50 '>
      <Sidebar/>
    </div>
      
      {/* right */}
      <div className='col-span-7'>
        <Outlet/>
      </div>
    </div>
  )
}

export default Home
