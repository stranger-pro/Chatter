import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { RiLockPasswordLine } from "react-icons/ri"
import { FaUserSecret } from "react-icons/fa";
import toast from 'react-hot-toast';
import axios from "axios"
import { useNavigate } from 'react-router-dom';


const Signup = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()

  const submitHandler = async (event) => {
    try{
        event.preventDefault();
        const {data} = await axios.post(`${import.meta.env.VITE_SERVER_URL}/user/register`,{
            email,
            password
        });
        if(data.success){
            toast.success(data.message)
        }
    }catch(error){
        toast.error(error?.response?.data?.message || "Something went erong")
    }
  }


  return (
    <>
    <Navbar/>
    <div className='min-h-[calc(100vh-60px)] flex
     items-center
     justify-center
      bg-[radial-gradient(circle_at_20%_20%,rgba(124,58,237,0.15),transparent_35%),radial-gradient(circle_at_80%_80%,rgba(99,102,241,0.12),transparent_35%),linear-gradient(135deg,#faf9ff,#f3f0ff)]
    '>
    
    {/* card */}

      <div className='flex flex-col gap-8 bg-white px-8 py-12 rounded-sm shadow min-w-[25%]'>
      {/* text */}
        <div className='flex  items-center flex-col'>
          <p className='text-xl font-bold text-black'>Create your account</p>
          <p className='text-sm text-gray-400 font-medium'>Join chatter & start connecting.</p>
        </div>

      {/* form */}

      <form className='flex flex-col gap-3' onSubmit={submitHandler}>
        <div className='relative'>
          <FaUserSecret   className='absolute top-2 opacity-70 left-2 text-md'/>

          <input className='pl-8 w-full px-2 py-1.5 border border-black/30 rounded-sm bg-white/30 text-sm '
          type='email' name='email' value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Enter Your Email'/>
        </div>
        
        <div className='relative'>
          <RiLockPasswordLine  className='absolute top-2 opacity-70 left-2 text-md' />
          <input className='pl-8 w-full px-2 py-1.5 border border-black/30 rounded-sm bg-white/30 text-sm '
          type='password' name='password' value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Enter Your Password'/>
        </div>
        <button className='p-1.5 mt-4 bg-blue-400 text-white font-medium rounded-sm cursor-pointer 
        hover:scale-95  hover:duration-200
        '>
        Sign Up</button>
      </form>

      <div className='flex text-[14px] justify-center gap-1'>
        <span className='text-black/70'>Alredy have an account?</span> <span onClick={() => navigate('/signin')} className='text-blue-700 cursor-pointer'>Sign in</span>
      </div>

      </div>

    </div>
      
    </>
  )
}

export default Signup
