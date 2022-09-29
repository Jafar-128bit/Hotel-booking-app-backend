const User = require('../database/userSchema');
const bcrypt = require('bcryptjs');
const createError = require('http-errors');
const jwt = require('jsonwebtoken');

const register = async (req, res, next) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = {
        username: req.body.username,
        email: req.body.email,
        password: hash
    }
    try {
        await User.create(newUser, (err, data) => {
            if (err) next(err);
            else res.status(201).send("User has been created.");
        });
    } catch (error) {
        next(error);
    }
};

const login = async (req, res, next) => {
    try {
        const user = await User.findOne({username: req.body.username});
        if (!user) return next(createError(404, "User not Found!"));
        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordCorrect) return next(createError(400, "Wrong Password or Username"));
        const token = jwt.sign({id: user._id, isAdmin: user.isAdmin}, process.env.ACCESS_TOKEN_SECRET);
        const {password, isAdmin, ...otherDetails} = user._doc;
        res.cookie("access_token", token, {
            httpOnly: true,
        }).status(200).jsonp({...otherDetails});
    } catch (error) {
        next(error);
    }
};

module.exports = {
    register,
    login
}
