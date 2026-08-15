import User from "../models/user.js";
import Chat from "../models/chat.js"
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();


export const register = async(req,res) => {
    try{

        const {email,password} = req.body;

        if(!email || !password){
            return res.status(403).json({
                success:false,
                message:"All fields required"
            })
        }

        const userAlredyExit = await User.findOne({email});
        
        if(userAlredyExit){
            return res.status(401).json({
                success:false,
                message:"User Already Exits !"
            })
        }

        const hashPassWord = await bcrypt.hash(password,10);

        const user = await User.create({
            email,
            password:hashPassWord,
        });

        return res.status(201).json({
            success:true,
            message:"user registered successfully",
            user
        })


    }catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

export const signIn = async(req,res) => {
    try{

        const {email,password} = req.body;

        if(!email || !password){
            return res.status(403).json({
                success:false,
                message:"All fields required"
            })
        }

        let user = await User.findOne({email:email}).populate("chats");

        if(!user){
            return res.status(401).json({
                success:false,
                message:"User Not Exits !"
            })
        };

        if(!(await bcrypt.compare(password,user.password))){
            return res.status(401).json({
                success:false,
                message:"Password Is Wrong"
            })
        }

        const payload = {
            id:user._id,
            email:user.email,
        }
        
        const token = await jwt.sign(payload,process.env.JWT_SECTRET_KEY,{
            expiresIn:"4d",
        });

        user.password = null;

        return res.status(200).json({
            success:true,
            token,
            user,
            message:"Log In Successfully"
        })

    }catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

export const fetchUser = async(req,res) => {
    try{

        const id = req.user.id;

        const user = await User.findById({_id:id}).populate("chats");

        if(!user){
            return res.status(401).json({
                success:false,
                message:"Error In User Fetching"
            })
        };

        return res.status(200).json({
            success:true,
            user,
            message:"User Fetched Successfully"
        })



    }catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

export const fetchAll = async(req,res) => {
    try{

        const users = await User.find().select("-password -chats");

        if(!users){
            return res.status(401).json({
                success:false,
                message:"Error In User Fetching"
            })
        };

        return res.status(200).json({
            success:true,
            users,
            message:"All Users Fetched Successfully"
        })



    }catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}