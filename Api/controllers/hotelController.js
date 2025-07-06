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
    const{min, max , ...others}=req.query
    try {
        const hotels =await Hotel.find({...others, cheepestPrice :{$gt:min | 1, $lt:max | 999}})
        res.status(200).json(hotels)
        
        
    } catch (err) {
        next(err)
    }
} 



//CITY
const countByCity = async(req ,res ,next) => {
    const cities = req.query.cities.split(",")
    try {
        const list =await Promise.all(cities.map(city=>{
          return Hotel.countDocuments({city : city})
        }))
        res.status(200).json(list)
    } catch (err) {
        next(err)
    }
} 


const countByType = async(req ,res ,next) => {
    
    try {
    const hotelCount =await Hotel.countDocuments({type : "hotel"});
    const apartmentCount =await Hotel.countDocuments({type : "apartment"});
    const resortCount =await Hotel.countDocuments({type : "resort"})
    const villaCount =await Hotel.countDocuments({type : "villa"})
    const cabinCount =await Hotel.countDocuments({type : "cabin"})
       

        res.status(200).json([
            {type : "hotel" , count : hotelCount},
            {type : "apartments" , count : apartmentCount},
            {type : "resort" , count : resortCount},
            {type : "villa" , count : villaCount },
            {type : "cabin" , count : cabinCount}
        ])
    } catch (err) {
        next(err)
    }
} 




export {
    createHotel,
    updateHotel,
    deleteHotel,
    getHotel,
    getHotels,
    countByCity,
    countByType
}