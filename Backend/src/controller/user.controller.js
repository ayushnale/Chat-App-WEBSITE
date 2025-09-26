import { asyncHandler } from "../utils/asyncHandler.js"
import { User } from "../models/user.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"

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
})

export { registerUser }