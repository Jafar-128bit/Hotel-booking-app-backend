const Room = require('../database/roomSchema');
const Hotel = require('../database/hotelsSchema');
const creatError = require('../utils/error');

const createRoom = async (req, res, next) => {
    const hotelId = req.params.hotelId;
    const newRoom = new Room(req.body);
    try {
        const savedRoom = await Room.create(newRoom, (err, data) => {
            if (err) next(err);
            else res.status(201).jsonp(data);
        });
        try {
            await Hotel.findOneAndUpdate(hotelId, {
                    $push: { rooms: savedRoom._id, }
                });
        } catch (error) {
            next(error);
        }
        res.status(200).jsonp(savedRoom);
    } catch (error) {
        next(error);
    }
};
const updateRoom = async (req, res, next) => {
    try {
        const updatedRoom = await Room.findOneAndUpdate(
            req.params.id,
            {$set: req.body},
            {new: true}
        );
        res.status(201).jsonp(updatedRoom);
    } catch (error) {
        next(error);
    }
};
const deleteRoom = async (req, res, next) => {
    const hotelId = req.params.hotelId;
    try {
        await Room.findByIdAndDelete(
            req.params.id,
            {new: true}
        );
        try {
            await Hotel.findOneAndUpdate(hotelId, {
                $pull: { rooms: req.params.id, }
            });
        } catch (error) {
            next(error);
        }
        res.status(201).jsonp("Room Has been Deleted");
    } catch (error) {
        next(error);
    }
};
const getSingleRoom = async (req, res, next) => {
    try {
        const getRoom = await Room.findById(
            req.params.id,
        );
        res.status(201).jsonp(getRoom);
    } catch (error) {
        next(error);
    }
};
const getAllRoom = async (req, res, next) => {
    try {
        const getAllRoom = await Room.find();
        res.status(201).jsonp(getAllRoom);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createRoom,
    updateRoom,
    deleteRoom,
    getSingleRoom,
    getAllRoom
}
