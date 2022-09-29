const User = require('../database/userSchema');

const updateUser = async (req, res, next) => {
    try {
        const updatedUser = await User.findOneAndUpdate(
            req.params.id,
            {$set: req.body},
            {new: true}
        );
        res.status(201).jsonp(updatedUser);
    } catch (error) {
        next(error);
    }
}

const deleteUser = async (req, res, next) => {
    try {
        await User.findByIdAndDelete(
            req.params.id,
            {new: true}
        );
        res.status(201).jsonp("User Deleted");
    } catch (error) {
        next(error);
    }
}

const getSingleUser = async (req, res, next) => {
    try {
        const getUser = await User.findById(
            req.params.id,
        );
        res.status(201).jsonp(getUser);
    } catch (error) {
        next(error);
    }
}

const getAllUser = async (req, res, next) => {
    try {
        const getAllUser = await User.find();
        res.status(201).jsonp(getAllUser);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    updateUser,
    deleteUser,
    getSingleUser,
    getAllUser
}
