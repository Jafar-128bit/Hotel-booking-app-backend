const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        required: true
    },
    maxPeople: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    roomNumbers: [{
        number: Number,
        unavailableDates: {type: [Date]},
    }]
}, {timestamps: true});

module.exports = mongoose.model("room", RoomSchema)
