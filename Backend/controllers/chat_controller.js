import Chat from "../models/chat.js"
import User from "../models/user.js"
import Message from "../models/message.js"

export const createChat = async(req,res) => {
    try{

        const {user2} = req.body;
        const user1 = req.user.id;

        if(!user2){
            return res.status(403).json({
                success:false,
                message:"Error while creating chat"
            })
        }

        const chatAlredyExit = await Chat.findOne({
            $or:[
                {first_user:user1,second_user:user2},
                {first_user:user2,second_user:user1},
            ]
        })

        if(chatAlredyExit){
            return res.status(403).json({
                success:false,
                message:"chat alredy exit"
            })
        }

        const chat = await Chat.create({
            first_user:user1,
            second_user:user2
        })

        const user_1 = await User.findByIdAndUpdate(user1,{
            $push:{
                chats:chat._id
            }
        },{new:true}).populate({path:"chats",populate:[{path:"first_user",select:"email"},{path:"second_user",select:"email"}]});;
        const user_2 = await User.findByIdAndUpdate(user2,{
            $push:{
                chats:chat._id
            }
        });

        return res.status(201).json({
            success:true,
            user_1,
            message:"chat created successfully"
        })

    }catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

export const fetchChat = async(req,res) => {
    try{
        const {chatId} = req.body;

        if(!chatId){
            return res.status(403).json({
                success:false,
                message:"Error while fetching chat"
            })
        }

        const chat = await Chat.findById(chatId).populate("first_user","name email").populate("second_user","name email").populate({path:"message",options:{sort:{createdAt:1}}});

        if(!chat){
            return res.status(404).json({
                success:false,
                message:"chat Not Found"
            })
        }

        return res.status(200).json({
            success:true,
            chat,
            message:"chat fetched successfully"
        })

    }catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}
