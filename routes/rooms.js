const express = require('express');
const router = express.Router();
const {
    createRoom,
    updateRoom,
    deleteRoom,
    getSingleRoom,
    getAllRoom
} = require('../controllers/Rooms');
const { verifyUser, verifyAdmin } = require('../utils/verifyToken');

router.post('/create/:hotelId', verifyAdmin, createRoom);
router.put('/update/:id', verifyAdmin, updateRoom);
router.delete('/delete/:id/:hotelId', verifyAdmin, deleteRoom);
router.get('/get/:id', getSingleRoom);
router.get('/getAll', getAllRoom);

module.exports = router;
