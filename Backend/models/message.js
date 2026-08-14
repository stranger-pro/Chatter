import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    chat:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Chat",
        require:true,
    },
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        require:true,
    },
    text:{
        type:String,
        require:true,
        trim:true,
    },
    deletedBy:{
        type:mongoose.Schema.Types.ObjectId,
        default:null,
    }
},{timestamps:true});

export default mongoose.model("Message",messageSchema);