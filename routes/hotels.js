const express = require('express');
const Hotel = require('../database/hotelsSchema');
const {
    createHotel,
    updateHotel,
    deleteHotel,
    getSingleHotel,
    getAllHotel,
} = require('../controllers/Hotels');
const {
    verifyAdmin
} = require('../utils/verifyToken');
const router = express.Router();
router.post('/create', verifyAdmin, createHotel);
router.put('/update/:id', verifyAdmin, updateHotel);
router.delete('/delete/:id', verifyAdmin, deleteHotel);
router.get('/get/:id', getSingleHotel);
router.get('/getAll', getAllHotel);

module.exports = router;