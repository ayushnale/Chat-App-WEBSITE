import { asyncHandler } from "../utils/asyncHandler.js"
import { User } from "../models/user.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import jwt from "jsonwebtoken"
import mongoose from "mongoose";
import bcrypt from "bcrypt"

const registerUser = asyncHandler ( async(req,res) => {
    //get user data from frontend 
    //validation - not empty
    //check if user already exist with username 
    //create user object - creat entry in db
    //remove password and refresh token filed from response
    //check for user creation
    // return res
    
    const {username,password} = req.body // get data from frontend 
    // console.log(`username : ${username}\npassword: ${password}`)
    // just to check
    
    //validation - not empty
    if(
        [username,password].some((filed) => filed?.trim() === "" )
    ){
        throw new ApiError(400,"All fields are required")
    }

    //check if user already exist with username 
    const existedUser = await User.findOne( {username} )
    if(existedUser){
        throw new ApiError (409,"User with this username already exists !!")
    }
    //check for avatar

    const user = await User.create({
        username: username.toLowerCase(),
        password
    })

    const createdUser = await User.findById(user._id).select(" -password -refreshToken ")

    if(!createdUser){
        throw new ApiError(500,"something went wrong while registering the user")
    }
     
    return res
    .status(201)
    .json(
        new ApiResponse( 200,createdUser,"user register Successfully")
    )
})

const loginUser = asyncHandler ( async (req,res) => {
    //req-->body
    //username or email
    //find the user
    // password check
    // access and refresh token 
    // send cookoe 
   const {username,password} = req.body

   if(!username){
    throw new ApiError (400,"username name is required") 
   }
   if(!password){
     throw new ApiError (400,"password is required!!")
   }

   const user = await User.findOne( {username} )

   if(!user){
    throw new ApiError (404,"user does not exist ")
   }
  
   const isPasswordValid = await bcrypt.compare(password,user.password)
//     const isPasswordValid = await user.isPasswordCorrect(password)

   if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user credentials")
    }

    const login = await user.updateOne(
        {$set:{isOnline:true}
    })

    return res
    .status(200)
    .json(
        new ApiResponse(
            200, 
            {
                login
            },
            "User logged In Successfully"
        )
    )

})
const logoutUser = asyncHandler ( async (req,res) => {
    //req-->body
    //username or email
    //find the user
    // password check
    // access and refresh token 
    // send cookoe 
   const {username,password} = req.body

   if(!username){
    throw new ApiError (400,"username name is required") 
   }
   if(!password){
     throw new ApiError (400,"password is required!!")
   }

   const user = await User.findOne( {username} )

   if(!user){
    throw new ApiError (404,"user does not exist ")
   }
  
   const isPasswordValid = await bcrypt.compare(password,user.password)
//     const isPasswordValid = await user.isPasswordCorrect(password)

   if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user credentials")
    }

    const logout = await user.updateOne(
        {$set:{isOnline:false}
    })

    return res
    .status(200)
    .json(
        new ApiResponse(
            200, 
            {
                logout
            },
            "User logout Successfully"
        )
    )

})



export { 
    registerUser,
    loginUser,
    logoutUser

}