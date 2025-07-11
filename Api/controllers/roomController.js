import Room from "../modals/Room.js";
import Hotel from "../modals/Hotel.js"
import createError from "../Utils/error.js"



const createRoom = async(req , res , next) => {
  const hotelId = req.params.hotelId
  const newRoom = new Room(req.body)

  try {
    const savedRoom =await newRoom.save()
    
    try {
        await Hotel.findByIdAndUpdate(hotelId,  {
            $push : {rooms : savedRoom._id}
        })
        
    } catch (err) {
        next(err)
    }
   
    res.status(200).json(savedRoom)

  } catch (err) {
    next(err)
  }
}


const updateRoom = async(req ,res ,next) =>{
    try {
        const updatedRoom =await Room.findByIdAndUpdate(req.params.id , {$set : req.body} , {new : true})
        res.status(200).json(updatedRoom)
    } catch (error) {
        res.status(500).json(error)
    }
}

const updateRoomAvailability = async(req ,res ,next) =>{
    try {
        
        res.status(200).json(updatedRoom)
    } catch (error) {
        res.status(500).json(error)
    }
}

//DELETE
const deleteRoom = async(req ,res ,next) => {
  const hotelId = req.params.hotelId

     try {
        const deletedRoom =await Room.findByIdAndDelete(req.params.id)
        try {
        await Hotel.findByIdAndUpdate(hotelId,  {
            $pull : {rooms : req.params.id}
        })
        
    } catch (err) {
        next(err)
    }
        res.status(200).json("Deleted Room")       
    } catch (error) {
        res.status(500).json(error)
    }
}

//GET
const getRoom = async(req ,res ,next) => {
     try {
        const room =await Room.findById(req.params.id)
        res.status(200).json(room)
    } catch (error) {
        res.status(500).json(error)
    }
}

//GETALL
const getRooms = async(req ,res ,next) => {
    try {
        const rooms =await Room.find()
        res.status(200).json(rooms)
    } catch (err) {
        next(err)
    }
} 


export {
    createRoom,
    updateRoom,
    deleteRoom,
    getRooms,
    getRoom
}
