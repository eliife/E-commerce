
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

// Kullanıcının sepetini getir
router.get('/', protect, getCart);

// Sepete ürün ekle veya miktarını artır
router.post('/add', protect, addToCart);

// Sepetteki ürün miktarını güncelle
router.patch('/item/:productId', protect, updateCartItemQuantity);

// Ürünü sepetten tamamen kaldır
router.delete('/item/:productId', protect, removeFromCart);

// Sepeti tamamen temizle
router.delete('/', protect, clearCart);

module.exports = router;
