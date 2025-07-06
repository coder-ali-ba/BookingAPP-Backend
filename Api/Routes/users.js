import express from "express";
import { deleteUser, getUser, getUsers, updateUser } from "../controllers/userCOntroller.js";
import { verifyAdmin, verifyToken, verifyUser,  } from "../Utils/verifyToken.js";

const router = express.Router()


// router.get("/checkauthentication" , verifyToken , (req , res , next)=>{
//     res.send("You are Logged In")
// })

// router.get("/checkuser/:id" , verifyUser , (req , res , next)=>{
//     res.send("You are Logged In nd u can delete u raccount")
// })

// router.get("/checkadmin/:id" , verifyAdmin , (req , res , next)=>{
//     res.send("Hello Admin u can delete any account")
// })


//UPDATE
router.put("/:id" , verifyUser ,  updateUser)

//DELETE
router.delete("/:id" , verifyUser , deleteUser)

//GET 
router.get("/:id" , verifyUser , getUser)

//GET ALL
router.get("/" , verifyAdmin , getUsers)


export default router


 