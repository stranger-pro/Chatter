import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
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
},{timestamps:true});

export default mongoose.model("Message",messageSchema);