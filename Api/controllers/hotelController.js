import Hotel from "../modals/Hotel.js"
import createError from "../Utils/error.js"
//Create
const createHotel = async(req ,res ,next) => {
     const newHotel = Hotel(req.body)

    try {
        const savedHotel =await newHotel.save()
        res.status(200).json(savedHotel)
    } catch (error) {
        res.status(500).json(error)
    }
}

//update
const updateHotel = async(req ,res ,next) =>{
    try {
        const updatedHotel =await Hotel.findByIdAndUpdate(req.params.id , {$set : req.body} , {new : true})
        res.status(200).json(updatedHotel)
    } catch (error) {
        res.status(500).json(error)
    }
}

//DELETE
const deleteHotel = async(req ,res ,next) => {
     try {
        const deletedHotel =await Hotel.findByIdAndDelete(req.params.id)
        res.status(200).json("Deleted Hotel")
    } catch (error) {
        res.status(500).json(error)
    }
}

//GET
const getHotel = async(req ,res ,next) => {
     try {
        const hotel =await Hotel.findById(req.params.id)
        res.status(200).json(hotel)
    } catch (error) {
        res.status(500).json(error)
    }
}

//GETALL
const getHotels = async(req ,res ,next) => {
    try {
        const hotels =await Hotel.find()
        res.status(200).json(hotels)
    } catch (err) {
        next(err)
    }
} 



export {
    createHotel,
    updateHotel,
    deleteHotel,
    getHotel,
    getHotels
}