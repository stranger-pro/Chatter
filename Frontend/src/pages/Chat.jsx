import React, { useState ,useEffect} from 'react'
import logo from '../assets/user_image.jpg'
import { useApp } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'
import { IoSendSharp } from "react-icons/io5";
import { LuMessageSquare } from "react-icons/lu";
import Message from '../components/Message';
import toast from 'react-hot-toast';
import axios from "axios"
import { useUserSocket } from '../context/SocketContext';



const Chat = () => {
    const [message, setMessage] = useState("")
    const {chatData,setChatData,user} = useApp()
    const navigate = useNavigate()
    const secondUser = user._id===chatData.first_user._id ? chatData.second_user : chatData.first_user
    
    const {socket} = useUserSocket()

    useEffect(() => {
        
        socket?.on("newMessage", (data) => {
            
            setChatData((prev) => {
                return {
                    ...prev,
                    message: [...prev.message, data]
                }
            });
        });
        return () => socket?.off("newMessage");
    }, [socket]);

    const submitHandler = async(event) => {
        try{
            event.preventDefault();
            const token = localStorage.getItem("token")
            const {data} = await axios.post(`${import.meta.env.VITE_SERVER_URL}/message/createMessage`,{
                chatId:chatData._id,
                text:message,
                receiverId:secondUser._id
            },{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })

            if(data.success){
                chatData.message.push(data.messageCreated);
                setMessage("")
            }

        }catch(error){
            toast.error(error?.response?.data?.message || "Something went erong")
        }
    }

  return (
    <div className='w-full h-screen flex flex-col'>
      {/* header */}
      <div className='h-25 w-full bg-gray-50 shadow shadow-b-black shrink-0'>
            <div className='text-2xl h-full font-bold mx-10 pt-12 flex items-center justify-between mb-2'>
            <div className='flex gap-4'>
                <img className='h-8 w-8 rounded-full border cursor-pointer border-black object-cover' src={logo}/>
                <div className='cursor-pointer'>{secondUser?.email?.split('@')[0].charAt(0).toUpperCase()+secondUser?.email?.split('@')[0].slice(1)}</div>
              
            </div>
              <div className='text-right text-sm text-blue-500 mr-6 
              font-light cursor-pointer hover:scale-[102%] hover:duration-200'
              onClick={()=>navigate(-1)}
               >Back</div>
          </div>
        </div>

        <div className='flex w-full min-w-0 bg-blue-100 flex-1 min-h-0'>
            <div className='flex  min-h-0 overflow-y-auto w-[80%] min-w-0 mx-auto py-2  flex-col gap-1'>
             {
                chatData?.message?.map((m)=>(<Message key={m._id} m={m} />))
             }
            </div>
        </div>

        {/* buttom */}
         <form className='relative flex w-[80%] shrink-0 mx-auto my-3' onSubmit={submitHandler}>
                <div className='relative w-full'>
                    <LuMessageSquare className='absolute top-1.5 opacity-70 left-3.5 text-xl'/>
                    <input className='px-10 w-full  py-1.5 border border-black/30 rounded-full bg-white/30 text-sm '
                    type='text' name='message' value={message} onChange={(e)=>setMessage(e.target.value)} placeholder='Type Message'/>
                </div>
                <button className={`absolute rounded-full cursor-pointer py-1 px-2 right-1.5 top-1  text-xl
                    `} disabled={!message.trim()}
                ><IoSendSharp /></button>
         </form>

    </div>
  )
}

export default Chat
