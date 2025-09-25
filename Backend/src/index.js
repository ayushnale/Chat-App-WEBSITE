import dotenv from"dotenv"
import express from "express"
import connectDB from "./db/index.js"
import { app } from "./app.js"

dotenv.config({
    path:"./.env"
})

connectDB()
.then(()=>{
    app.listen(3000,() => {
        console.log(`⚙️  running on port 3000....`)
    })
})
.catch((err)=>{
    console.log("connection failed !!",err)
})

