import User from "../modals/User.js"
import createError from "../Utils/error.js"


//update
const updateUser = async(req ,res ,next) =>{
    try {
        const updatedUser =await User.findByIdAndUpdate(req.params.id , {$set : req.body} , {new : true})
        res.status(200).json(updatedUser)
    } catch (error) {
        res.status(500).json(error)
    }
}

//DELETE
const deleteUser = async(req ,res ,next) => {
     try {
        const deletedUser =await User.findByIdAndDelete(req.params.id)
        res.status(200).json("Deleted User")
    } catch (error) {
        res.status(500).json(error)
    }
}

//GET
const getUser = async(req ,res ,next) => {
     try {
        const user =await User.findById(req.params.id)
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json(error)
    }
}

//GETALL
const getUsers = async(req ,res ,next) => {
    try {
        const users =await User.find()
        res.status(200).json(users)
    } catch (err) {
        next(err)
    }
} 



export {
    updateUser,
    deleteUser,
    getUser,
    getUsers
}