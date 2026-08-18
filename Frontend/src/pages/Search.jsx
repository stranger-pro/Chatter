import React, { useState } from 'react'
import logo from '../assets/user_image.jpg'
import { useApp } from '../context/AppContext'
import { CiSearch } from "react-icons/ci";
import toast from 'react-hot-toast';
import axios from "axios"
import SearchCard from '../components/searchCard';

const Search = () => {
    const [search, setSearch] = useState("")
    const [userList, setUserList] = useState([])
    const submiHandler = async(event) => {
        try{
            event.preventDefault();
            const token = localStorage.getItem("token")
            const {data} = await axios.post(`${import.meta.env.VITE_SERVER_URL}/user/fetchAllUsers`,{search:search},{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            
            if(data.success){
                setUserList(data.users)
            }

        }catch(error){
            toast.error(error?.response?.data?.message || "Something went erong")
        }
    }

  return (<div className='w-full '>
      {/* header */}
      <div className='h-25 w-full bg-gray-50 shadow shadow-b-black'>
        <div className='text-2xl h-full font-bold mx-10 pt-12 flex justify-between'>
            <div className='cursor-pointer'>Search</div>

            <form className='relative flex w-[50%]' onSubmit={submiHandler}>
                <div className='relative w-full'>
                    <CiSearch    className='absolute top-2 opacity-70 left-2 text-md'/>
                    <input className='px-10 w-full  py-1.5 border border-black/30 rounded-full bg-white/30 text-sm '
                    type='text' name='text' value={search} onChange={(e)=>setSearch(e.target.value)} placeholder='Search User'/>
                </div>
                <button className={`absolute bg-blue-300 rounded-full cursor-pointer py-1 px-2 right-1.5 top-1.25  text-sm
                `} disabled={!search.trim()}
                >search</button>
            </form>

            <img className='h-8 w-8 rounded-full border cursor-pointer border-black object-cover' src={logo}/>
        </div>
      </div>

      {/* container */}
      <div className='p-5 overflow-y-scroll min-h-full flex flex-col gap-3'>
        {
            userList?.map((list)=>(<SearchCard key={list._id} list={list}/>))
        }
      </div>
    </div>
  )
}

export default Search
