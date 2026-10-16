const express = require('express');

const {
  getProducts,
  getNewArrivals,
  getProductById
} = require('../controllers/productController');

const router = express.Router();


router.get('/new-arrivals', getNewArrivals);


router.get('/', getProducts);


router.get('/:id', getProductById);

module.exports = router;
