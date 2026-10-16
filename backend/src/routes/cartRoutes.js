
const express = require('express');

const {
  getCart,
  addToCart,
  removeFromCart,
  clearCart,
  updateCartItemQuantity,
} = require('../controllers/cartController');

const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();


router.get('/', protect, getCart);


router.post('/add', protect, addToCart);


router.patch('/item/:productId', protect, updateCartItemQuantity);


router.delete('/item/:productId', protect, removeFromCart);


router.delete('/', protect, clearCart);

module.exports = router;
