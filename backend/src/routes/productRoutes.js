const express = require('express');

const {
  getProducts,
  getNewArrivals,
  getProductById
} = require('../controllers/productController');

const router = express.Router();

// Yeni gelen ürünler
router.get('/new-arrivals', getNewArrivals);

// Tüm ürünleri listele, ara ve filtrele
router.get('/', getProducts);

// Ürün detayını getir
router.get('/:id', getProductById);

module.exports = router;
