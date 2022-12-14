const express = require('express');
const router = express.Router();
const {
    createRoom,
    updateRoom,
    deleteRoom,
    getSingleRoom,
    getAllRoom,
    updateRoomAvailability
} = require('../controllers/Rooms');
const { verifyUser, verifyAdmin } = require('../utils/verifyToken');

router.post('/create/:hotelId', verifyAdmin, createRoom);
router.put('/update/:id', verifyAdmin, updateRoom);
router.put('/availability/:id', updateRoomAvailability);
router.delete('/delete/:id/:hotelId', verifyAdmin, deleteRoom);
router.get('/get/:id', getSingleRoom);
router.get('/getAll', getAllRoom);

module.exports = router;
