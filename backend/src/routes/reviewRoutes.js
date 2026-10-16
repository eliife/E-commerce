const express = require('express');
const { createProductReview, getProductReviews } = require('../controllers/reviewController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/:productId', getProductReviews);          
router.post('/:productId', protect, createProductReview); 

module.exports = router;