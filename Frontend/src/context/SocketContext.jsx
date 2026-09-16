import { createContext, useContext, useEffect, useState } from "react";
import { useApp } from './AppContext'
import  io  from "socket.io-client";

const UserSocketContext = createContext(null);

export const UserSocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const {user} = useApp()

  useEffect(() => {
    if (user) {
      const newSocket = io("http://localhost:3000", {
        query:{
            userId: user?._id
        }
      });
      newSocket.on("connect", () => {
        console.log("Connected to socket server");
      });

      newSocket.on("connect_error", (error) => {
        console.error("Socket connection error:", error);
      });

      setSocket(newSocket);
      console.log("socket",newSocket)
      return () => newSocket.close();
    }else{
        if(socket){
            socket.close();
            setSocket(null);
        }
    }
  }, [user]);

  return (
    <UserSocketContext.Provider value={{socket}}>
      {children}
    </UserSocketContext.Provider>
  );
};

export const useUserSocket = () => useContext(UserSocketContext);

