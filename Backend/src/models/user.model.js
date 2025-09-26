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
    // avatar:{
    //     type:String,   // url from cloudinary
    //     required:true
    // },
    isOnline:{
        type:Boolean,
        default:0
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
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next()
})

// userSchema.methods.isPasswordCorrect = async function(password){
//     const pass = await User.password
//     console.log(password,"\n",User.password)
// }

userSchema.methods.generateAccessToken = function (){
    jwt.sign(
        {
            _id:this._id,
            username:this.username,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = function (){
    jwt.sign(
        {
            _id:this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}


export const User = mongoose.model("User",userSchema) 