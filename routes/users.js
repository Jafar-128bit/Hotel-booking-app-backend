const express = require('express');
const router = express.Router();
const {
    updateUser,
    deleteUser,
    getSingleUser,
    getAllUser
} = require('../controllers/Users');
const {
    verifyUser,
    verifyAdmin
} = require('../utils/verifyToken');

router.put('/update/:id', verifyUser,updateUser);
router.delete('/delete/:id', verifyUser,deleteUser);
router.get('/get/:id', verifyUser,getSingleUser);
router.get('/getAll', verifyAdmin,getAllUser);

module.exports = router;
