import express from "express";

const router = express.Router()

router.get("/" , (req , res)=>{
    res.send("Hello this is auth")
})

router.get("/register" , (req , res)=>{
    res.send("Hello this is register")
})

export default router