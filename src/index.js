import dotenv from"dotenv"
import { app } from"./app.js"

dotenv.config({
    path:"../.env"
})

ConnectDB()
.then( () => {
    app.listen(process.env.PORT,() => {
    
     console.log(`⚙️ Server is running at port : ${process.env.PORT}`);

    })
})
.catch((err) => {
    console.log(`MONGODB Connection Failed!!\n`,err)
})
