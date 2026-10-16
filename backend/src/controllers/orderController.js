
const Order = require('../models/Order');
const Cart = require('../models/Cart');
const fs = require('fs');
const path = require('path');

const productsPath = path.join(__dirname, '../../products.json');

const readProducts = () => {
  return JSON.parse(fs.readFileSync(productsPath, 'utf8'));
};

// 1. Sipariş oluştur
exports.createOrder = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { shippingAddress } = req.body;

    const cart = await Cart.findOne({ user: userId });

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        message: 'Sepetiniz boş, sipariş oluşturulamaz.'
      });
    }

    if (
      !shippingAddress ||
      !shippingAddress.address ||
      !shippingAddress.city ||
      !shippingAddress.phone
    ) {
      return res.status(400).json({
        message: 'Adres, şehir ve telefon bilgileri gereklidir.'
      });
    }

    const products = readProducts();
    let totalPrice = 0;
    const orderItems = [];

    for (const item of cart.items) {
      const productId = String(item.product);
      const product = products.find(
        (p) => p.id === productId
      );

      if (!product) {
        return res.status(400).json({
          message: `Sepetteki ${productId} ürünü ürün kataloğunda bulunamadı.`
        });
      }

      if (item.quantity < 1 || !Number.isInteger(item.quantity)) {
        return res.status(400).json({
          message: `${product.name} için ürün adedi geçersiz.`
        });
      }

      if (item.quantity > product.stock) {
        return res.status(400).json({
          message: `${product.name} ürününden yeterli stok bulunmuyor.`
        });
      }

      totalPrice += product.price * item.quantity;

      orderItems.push({
        product: product.id,
        quantity: item.quantity,
        price: product.price
      });
    }

    const order = new Order({
      user: userId,
      orderItems,
      shippingAddress,
      totalPrice
    });

    await order.save();

    // Sipariş oluşturulduktan sonra sepeti boşalt
    cart.items = [];
    await cart.save();

    res.status(201).json({
      success: true,
      message: 'Sipariş başarıyla oluşturuldu!',
      order
    });
  } catch (error) {
    res.status(500).json({
      message: 'Sipariş oluşturulurken sunucu hatası oluştu.',
      error: error.message
    });
  }
};

// 2. Giriş yapan kullanıcının siparişlerini getir
exports.getMyOrders = async (req, res) => {
  try {
    const userId = req.user.userId;
    const orders = await Order.find({ user: userId }).sort({
      createdAt: -1
    });

    const products = readProducts();

    const enrichedOrders = orders.map((order) => {
      const orderObject = order.toObject();

      orderObject.orderItems = orderObject.orderItems.map((item) => {
        const product = products.find(
          (p) => p.id === String(item.product)
        );

        return {
          ...item,
          product: product || null
        };
      });

      return orderObject;
    });

    res.status(200).json({
      success: true,
      count: enrichedOrders.length,
      orders: enrichedOrders
    });
  } catch (error) {
    res.status(500).json({
      message: 'Siparişler alınırken sunucu hatası oluştu.',
      error: error.message
    });
  }
};
