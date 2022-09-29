const Hotel = require('../database/hotelsSchema');

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
}

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
}

const getSingleHotel = async (req, res, next) => {
    try {
        const getHotel = await Hotel.findById(
            req.params.id,
        );
        res.status(201).jsonp(getHotel);
    } catch (error) {
        next(error);
    }
}

const getAllHotel = async (req, res, next) => {
    try {
        const getAllHotel = await Hotel.find();
        res.status(201).jsonp(getAllHotel);
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
}
