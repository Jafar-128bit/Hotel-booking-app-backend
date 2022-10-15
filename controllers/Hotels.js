const Hotel = require('../database/hotelsSchema');
const Room = require('../database/roomSchema');

const createHotel = async (req, res, next) => {
    const newHotel = req.body;
    try {
        await Hotel.create(newHotel, (err, data) => {
            if (err)  next(err);
            else res.status(201).jsonp(data);
        });
    } catch (error) {
        next(error);
    }
};

const updateHotel = async (req, res, next) => {
    try {
        const updatedHotel = await Hotel.findOneAndUpdate(
            req.params.id,
            {$set: req.body},
            {new: true}
        );
        res.status(201).jsonp(updatedHotel);
    } catch (error) {
        next(error);
    }
};
const deleteHotel = async (req, res, next) => {
    try {
        await Hotel.findByIdAndDelete(
            req.params.id,
            {new: true}
        );
        res.status(201).jsonp("Hotel Has been Deleted");
    } catch (error) {
        next(error);
    }
};
const getSingleHotel = async (req, res, next) => {
    try {
        const getHotel = await Hotel.findById(
            req.params.id,
        );
        res.status(201).jsonp(getHotel);
    } catch (error) {
        next(error);
    }
};
const getAllHotel = async (req, res, next) => {
    try {
        const getAllHotel = await Hotel.find();
        res.status(201).jsonp(getAllHotel);
    } catch (error) {
        next(error);
    }
};
const countByCity = async (req, res, next) => {
    const cities = req.query.cities.split(',')
    try {
        const list = await Promise.all(cities.map(city => {
            return Hotel.countDocuments({city: city});
        }))
        res.status(201).jsonp(list);
    } catch (error) {
        next(error);
    }
};

const countByType = async (req, res, next) => {
    try {
        const hotelCount = await Hotel.countDocuments({type: "hotel"});
        const apartmentCount = await Hotel.countDocuments({type: "apartment"});
        const resortCount = await Hotel.countDocuments({type: "resort"});
        const villaCount = await Hotel.countDocuments({type: "villa"});
        const cabinCount = await Hotel.countDocuments({type: "cabin"});
        res.status(201).jsonp([
            {type: "hotel", count: hotelCount},
            {type: "apartment", count: apartmentCount},
            {type: "resort", count: resortCount},
            {type: "villa", count: villaCount},
            {type: "cabin", count: cabinCount},
        ]);
    } catch (error) {
        next(error);
    }
};
const getHotelRooms = async (req,res,next) => {
    try {
        const hotel = await Hotel.findById(req.params.id);
        const list = await Promise.all(hotel.rooms.map(room => {
            return Room.findById(room);
    }));
        res.status(200).jsonp(list);
    } catch (error) {
        next(error);
    }
}
module.exports = {
    createHotel,
    updateHotel,
    deleteHotel,
    getSingleHotel,
    getAllHotel,
    countByCity,
    countByType,
    getHotelRooms
}
