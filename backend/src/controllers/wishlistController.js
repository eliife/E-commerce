
const Wishlist = require('../models/Wishlist');
const fs = require('fs');
const path = require('path');

const productsPath = path.join(__dirname, '../../products.json');

const readProducts = () => {
  return JSON.parse(fs.readFileSync(productsPath, 'utf8'));
};


exports.getWishlist = async (req, res) => {
  try {
    const userId = req.user.userId;
    const wishlist = await Wishlist.findOne({ user: userId });

    if (!wishlist) {
      return res.status(200).json({
        success: true,
        products: [],
        message: 'Favori listeniz boş.'
      });
    }

    const allProducts = readProducts();

    const favoriteProducts = wishlist.products
      .map((productId) =>
        allProducts.find((product) => product.id === String(productId))
      )
      .filter(Boolean);

    res.status(200).json({
      success: true,
      wishlist: {
        _id: wishlist._id,
        user: wishlist.user,
        products: favoriteProducts,
        createdAt: wishlist.createdAt,
        updatedAt: wishlist.updatedAt
      }
    });
  } catch (error) {
    res.status(500).json({
      message: 'Favoriler alınırken sunucu hatası oluştu.',
      error: error.message
    });
  }
};


exports.toggleWishlist = async (req, res) => {
  try {
    const userId = req.user.userId;
    const productId = String(req.body.productId || '');

    if (!productId) {
      return res.status(400).json({
        message: 'Ürün kimliği gereklidir.'
      });
    }

    const allProducts = readProducts();
    const product = allProducts.find((item) => item.id === productId);

    if (!product) {
      return res.status(404).json({
        message: 'Ürün bulunamadı.'
      });
    }

    let wishlist = await Wishlist.findOne({ user: userId });

    if (!wishlist) {
      wishlist = new Wishlist({
        user: userId,
        products: [productId]
      });
    } else {
      const index = wishlist.products.findIndex(
        (id) => String(id) === productId
      );

      if (index > -1) {
        wishlist.products.splice(index, 1);
      } else {
        wishlist.products.push(productId);
      }
    }

    await wishlist.save();

    const favoriteProducts = wishlist.products
      .map((id) =>
        allProducts.find((item) => item.id === String(id))
      )
      .filter(Boolean);

    res.status(200).json({
      success: true,
      message: 'Favori listesi güncellendi!',
      wishlist: {
        _id: wishlist._id,
        user: wishlist.user,
        products: favoriteProducts,
        createdAt: wishlist.createdAt,
        updatedAt: wishlist.updatedAt
      }
    });
  } catch (error) {
    res.status(500).json({
      message: 'Favoriler güncellenirken sunucu hatası oluştu.',
      error: error.message
    });
  }
};
