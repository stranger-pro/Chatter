import { createContext, useContext, useEffect, useState, useSyncExternalStore } from "react";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import axios from "axios"

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false)
  const [chatCreate, setChatCreate] = useState("")
  const [chatStart, setChatStart] = useState("")
  const [chatData, setChatData] = useState(null)
  const navigate = useNavigate()
  const [deleteId, setDeleteId] = useState("")
 

  useEffect(() => {
    const deleteMessage = async() => {
      try{
        if(!deleteId) return;

        const token = localStorage.getItem("token")
        const {data} = await axios.delete(`${import.meta.env.VITE_SERVER_URL}/message/deleteMessage`,{
          data:{
          chatId:deleteId.chatId,
          messageId:deleteId.messageId
        },
          headers:{
            Authorization:`Bearer ${token}`
          }
        })
        
        if(data.success){
          const newChatData = {...chatData,
            message:chatData?.message?.filter((m)=>m._id !== deleteId.messageId)
          }
          setChatData(newChatData)
          console.log(chatData)
          toast.success("Message Deleted")
          setDeleteId("")
        }
      }catch(error){
        toast.error(error?.response?.data?.message || "Something went erong")
      }
    
    }
    deleteMessage()
  }, [deleteId])

  useEffect(() => {
    const startChat = async() => {
      try{
        if(!chatStart) return;

        const token = localStorage.getItem("token")
        const {data} = await axios.post(`${import.meta.env.VITE_SERVER_URL}/chat/fetchChat`,{chatId:chatStart},{
          headers:{
          Authorization:`Bearer ${token}`
          }
        })
        if(data.success){
          setChatData(data.chat)
          toast.success(data.message)
          navigate(`/chat/${data.chat._id}`)
          setChatStart("")
        }
      }catch(error){
        toast.error(error?.response?.data?.message || "Something went erong")
      }
    
    }
    startChat()
  }, [chatStart])
  

  useEffect(() => {
    const createChat = async()=>{
      try{
        if(!chatCreate) return;
        const token = localStorage.getItem("token")
        const {data} = await axios.post(`${import.meta.env.VITE_SERVER_URL}/chat/createChat`,{user2:chatCreate},{
          headers:{
           Authorization:`Bearer ${token}`
          }
        })
        if(data.success){
          setUser(data.user_1)
          navigate("/chat")
        }

      }catch(error){
        toast.error(error?.response?.data?.message || "Something went erong")
      }
    }
    createChat()
  },[chatCreate])
  

  const fetchUser = async() => {
    try{
      const token = localStorage.getItem("token")
      const {data} = await axios.get(`${import.meta.env.VITE_SERVER_URL}/user/fetchUser`,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      if(data.success){
        setUser(data.user)
        setIsAuth(true)
        navigate("/chat")
      }


    }catch(error){
      toast.error(error?.response?.data?.message || "Something went erong")
    }
  };

  const logout = () => {
    localStorage.removeItem("token")
    setUser(null)
    setIsAuth(false)
    navigate("/signin")
    toast.success("user logged out")
  };

  useEffect(() => {
    fetchUser();
  }, [])
  

  const value = { 
    user,
    isAuth, 
    logout,
    setIsAuth,
    setChatCreate,
    chatCreate,
    setChatStart,
    chatStart,
    setDeleteId,
    setChatData,
    setUser,
    chatData
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);