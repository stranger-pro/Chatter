import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        require:true,
        trim:true
    },
    password:{
        type:String,
        require:true,
        minlength:5,
    },
    chats:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Chat"
    }],
},{timestamps:true});

export default mongoose.model("User",userSchema);