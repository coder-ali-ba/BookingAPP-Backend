import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import authRoute from './Routes/auth.js'
import usersRoute from "./Routes/users.js"
import hotelsRoute from "./Routes/hotels.js"
import roomsRoute from "./Routes/rooms.js"
import cookieParser from 'cookie-parser'

const app =express()

dotenv.config()

const connect = async() => {
    try {
        await mongoose.connect(process.env.Mongo)
        console.log("connected");
        
    } catch (error) {
        console.log(error.message);    
    }
}
mongoose.connection.on("disconnected" , ()=>{
    console.log("mongoDb DisConnected");   
})

mongoose.connection.on("connected" , ()=>{
    console.log("mongoDb Connected");
    
})


//MIDDLEWARES
app.use(cookieParser())
app.use(express.json())

app.use("/api/auth" , authRoute)
app.use("/api/users" , usersRoute)
app.use("/api/hotels" , hotelsRoute)
app.use("/api/rooms" , roomsRoute)

app.use((err ,req , res , next)=>{
    const errorStatus = err.status || 500
    const errorMessage = err.message || "something went wrong"
    return res.status(errorStatus).json({
        success : false,
        status : errorStatus,
        message : errorMessage,
        stack : err.stack
    })   
})

const PORT = 8800

app.listen(PORT, ()=>{
    connect()
    console.log(`Server is running on http://localhost:${PORT}`);
    
    
})
