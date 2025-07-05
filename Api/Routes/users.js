import express from "express";
import { deleteUser, getUser, getUsers, updateUser } from "../controllers/userCOntroller.js";
import { verifyToken } from "../Utils/verifyToken.js";

const router = express.Router()


router.get("/checkauthentication" , verifyToken , (req , res , next)=>{
    res.send("You are Logged In")
})


//UPDATE
router.put("/:id" , updateUser)

//DELETE
router.delete("/:id" , deleteUser)

//GET 
router.get("/:id" , getUser)

//GET ALL
router.get("/" , getUsers)


export default router


 