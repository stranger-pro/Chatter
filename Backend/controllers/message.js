import Chat from "../models/chat.js"
import User from "../models/user.js"
import Message from "../models/message.js"
import { getReciverSocketId, io } from "../Socket/soket.js";

export const sendMessage = async(req,res) => {
    try{

        const {chatId,text,receiverId} = req.body;
        const sender = req.user.id;

        if(!chatId || !text){
            return res.status(403).json({
                success:false,
                message:"All fields required"
            })
        }

        const messageCreated = await Message.create({
            sender,
            text
        });

        await Chat.findByIdAndUpdate(chatId,{
            $push:{
                message:messageCreated._id
            }
        });

        const reciverSocketId = getReciverSocketId(receiverId);
        if(reciverSocketId){
            io.to(reciverSocketId).emit("newMessage",messageCreated)
        }


        return res.status(201).json({
            success:true,
            messageCreated,
            message:"message created successfully"
        })


    }catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

export const editMessage = async(req,res) => {
    try{

        const {messageId,editedText} = req.body;
       
        if(!messageId || !editedText){
            return res.status(403).json({
                success:false,
                message:"All fields required"
            })
        }

        const messageEdit = await Message.findById(messageId);

        if (!messageEdit) {
        return res.status(404).json({
            success: false,
            message: "Message not found"
        });
        }

        if (messageEdit.sender.toString() !== req.user.id.toString()) {
            return res.status(403).json({
                success: false,
                message: "You cannot edit this message"
            });
        }

        
        messageEdit.text = editedText.trim();

        await messageEdit.save();

        
        return res.status(200).json({
            success:true,
            messageEdit,
            message:"message edited successfully"
        })


    }catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

export const deleteMessage = async(req,res) => {
    try{

        const {chatId,messageId} = req.body;

        if(!chatId || !messageId){
            return res.status(403).json({
                success:false,
                message:"All fields required"
            })
        }

        const message = await Message.findById(messageId);

        if (!message) {
        return res.status(404).json({
            success: false,
            message: "Message not found"
        });
        }

        
        if (message.sender.toString() !== req.user.id.toString()) {
            return res.status(403).json({
                success: false,
                message: "You cannot delete this message"
            });
        }

        
        await message.deleteOne();


        const chat = await Chat.findByIdAndUpdate(chatId,{
            $pull:{
                message:messageId,
            }
        });

        return res.status(200).json({
            success:true,
            message:"message deleted successfully"
        })


    }catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}