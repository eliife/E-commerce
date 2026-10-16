
const Cart = require('../models/Cart');
const fs = require('fs');
const path = require('path');

const productsPath = path.join(__dirname, '../../products.json');

const readProducts = () => {
  return JSON.parse(fs.readFileSync(productsPath, 'utf8'));
};

// Ürün bilgilerini JSON dosyasından getir
const getProductDetails = (productId) => {
  const products = readProducts();

  return products.find((product) => product.id === productId);
};

// Sepetteki ürünlere JSON dosyasındaki ürün bilgilerini ekle
const populateCartItems = (cart) => {
  const products = readProducts();

  return cart.items.map((item) => {
    const productId = String(item.product);
    const product = products.find(
      (itemProduct) => itemProduct.id === productId
    );

    return {
      product: product || null,
      quantity: item.quantity
    };
  });
};

// 1. Kullanıcının sepetini getir
exports.getCart = async (req, res) => {
  try {
    const userId = req.user.userId;
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(200).json({
        success: true,
        items: [],
        message: 'Sepetiniz boş.'
      });
    }

    const items = populateCartItems(cart);

    res.status(200).json({
      success: true,
      cart: {
        _id: cart._id,
        user: cart.user,
        items,
        createdAt: cart.createdAt,
        updatedAt: cart.updatedAt
      }
    });
  } catch (error) {
    res.status(500).json({
      message: 'Sepet alınırken sunucu hatası oluştu.',
      error: error.message
    });
  }
};

// 2. Sepete ürün ekle veya miktarını artır
exports.addToCart = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { productId, quantity = 1 } = req.body;

    if (!productId) {
      return res.status(400).json({
        message: 'Ürün kimliği gereklidir.'
      });
    }

    const product = getProductDetails(String(productId));

    if (!product) {
      return res.status(404).json({
        message: 'Ürün bulunamadı.'
      });
    }

    const amount = Number(quantity);

    if (!Number.isInteger(amount) || amount < 1) {
      return res.status(400).json({
        message: 'Ürün adedi en az 1 olan bir tam sayı olmalıdır.'
      });
    }

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({
        user: userId,
        items: [{
          product: product.id,
          quantity: amount
        }]
      });
    } else {
      const itemIndex = cart.items.findIndex(
        (item) => String(item.product) === String(product.id)
      );

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += amount;
      } else {
        cart.items.push({
          product: product.id,
          quantity: amount
        });
      }
    }

    await cart.save();

    const items = populateCartItems(cart);

    res.status(200).json({
      success: true,
      message: 'Ürün sepete eklendi!',
      cart: {
        _id: cart._id,
        user: cart.user,
        items,
        createdAt: cart.createdAt,
        updatedAt: cart.updatedAt
      }
    });
  } catch (error) {
    res.status(500).json({
      message: 'Sepete ürün eklenirken sunucu hatası oluştu.',
      error: error.message
    });
  }
};

// 3. Sepetten tek bir ürünü çıkar
exports.removeFromCart = async (req, res) => {
  try {
    const userId = req.user.userId;
    const productId = String(req.params.productId);

    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({
        message: 'Sepet bulunamadı.'
      });
    }

    cart.items = cart.items.filter(
      (item) => String(item.product) !== productId
    );

    await cart.save();

    const items = populateCartItems(cart);

    res.status(200).json({
      success: true,
      message: 'Ürün sepetten çıkarıldı!',
      cart: {
        _id: cart._id,
        user: cart.user,
        items,
        createdAt: cart.createdAt,
        updatedAt: cart.updatedAt
      }
    });
  } catch (error) {
    res.status(500).json({
      message: 'Ürün sepetten çıkarılırken sunucu hatası oluştu.',
      error: error.message
    });
  }
};

// 4. Sepeti tamamen boşalt
exports.clearCart = async (req, res) => {
  try {
    const userId = req.user.userId;
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({
        message: 'Sepet bulunamadı.'
      });
    }

    cart.items = [];
    await cart.save();

    res.status(200).json({
      success: true,
      message: 'Sepet tamamen boşaltıldı!',
      cart: {
        _id: cart._id,
        user: cart.user,
        items: [],
        createdAt: cart.createdAt,
        updatedAt: cart.updatedAt
      }
    });
  } catch (error) {
    res.status(500).json({
      message: 'Sepet boşaltılırken sunucu hatası oluştu.',
      error: error.message
    });
  }
};

 // 5. Sepetteki ürün miktarını güncelle
exports.updateCartItemQuantity = async (req, res) => {
  try {
    const userId = req.user.userId;
    const productId = String(req.params.productId);
    const quantity = Number(req.body.quantity);

    if (!Number.isInteger(quantity) || quantity < 1) {
      return res.status(400).json({
        message: 'Ürün adedi en az 1 olmalıdır.'
      });
    }

    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({
        message: 'Sepet bulunamadı.'
      });
    }

    const item = cart.items.find(
      (entry) => String(entry.product) === productId
    );

    if (!item) {
      return res.status(404).json({
        message: 'Ürün sepette bulunamadı.'
      });
    }

    item.quantity = quantity;
    await cart.save();

    const items = populateCartItems(cart);

    return res.status(200).json({
      success: true,
      message: 'Ürün adedi güncellendi.',
      cart: {
        _id: cart._id,
        user: cart.user,
        items,
        createdAt: cart.createdAt,
        updatedAt: cart.updatedAt
      }
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Ürün adedi güncellenirken sunucu hatası oluştu.',
      error: error.message
    });
  }
};
