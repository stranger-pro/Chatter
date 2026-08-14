import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    first_user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        require:true
    },
    second_user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        require:true
    },
    message:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Message",
        require:true
    }],
},{timestamps:true});

export default mongoose.model("Chat",chatSchema);