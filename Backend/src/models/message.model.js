import mongoose, { Schema } from "mongoose";

const messageSchema = new Schema({
    msg:{
        type:String,
        required:true
    },
    sender:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    reciver:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
}, {
    timeseries:true
   }
)

export const Msg = mongoose.model("Msg",messageSchema) 