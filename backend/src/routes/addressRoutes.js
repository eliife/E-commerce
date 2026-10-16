const express = require('express');
const { getUserAddresses, addAddress, deleteAddress,updateAddress } = require('../controllers/addressController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();


router.get('/', protect, getUserAddresses);       
router.post('/', protect, addAddress);            
router.delete('/:id', protect, deleteAddress);    
router.put('/:id', protect, updateAddress);

module.exports = router;