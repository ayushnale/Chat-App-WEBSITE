import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema = new Schema ({
    username:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true
    },
    password:{
        type:String,
        required:[true,'Password is required']
    },
    avatar:{
        type:String,   // url from cloudinary
        required:true
    },
    isOnline:{
        type:Boolean
    },
    friendsList:[
        {
            type:Schema.Types.ObjectId,
            ref:"User"
        }
    ],
    refreshToken:{
        type:String
    }
}, {timeseries:true})

userSchema.pre("save", async function (next) {
    
    if(!this.isModified("password")) return next;

    this.password = bcrypt.hash(this.password,10)
    next()
})

userSchema.method.isPasswordCorrect = async function(password){
    return await bcrypt.compare( password, this.password )
}





export const User = mongoose.model("User",userSchema) 