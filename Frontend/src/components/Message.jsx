import React from 'react'
import { useApp } from '../context/AppContext'
import { MdDelete } from "react-icons/md";

const Message = ({m}) => {
    const {user,chatData,setDeleteId} = useApp()
    const handleClick = () => {
      let obj = {
        chatId:chatData._id,
        messageId:m._id
      }
      setDeleteId(obj)
    }
  return (
    <>
    <div className="w-full flex relative group">
    <div className={ ` w-[40%] relative min-h-fit shrink-0  py-3 px-4 rounded-sm  text-sm break-all text-justify whitespace-pre-wrap
      bg-gray-100  ${user._id === m.sender ? "ml-auto":"mr-auto"}`}>{m.text}</div>
      <div onClick={handleClick} className={`absolute hidden group-hover:block text-red-400 hover:text-red-500 hover:cursor-pointer ${user._id === m.sender ? "right-[41%] top-3":"left-[41%] top-3"}`}>
        <MdDelete />
      </div>
    </div>
    </>
  )
}

export default Message
