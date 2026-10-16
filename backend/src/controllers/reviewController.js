
const Review = require('../models/Review');
const fs = require('fs');
const path = require('path');

const productsPath = path.join(__dirname, '../../products.json');

const readProducts = () => {
  return JSON.parse(fs.readFileSync(productsPath, 'utf8'));
};

// 1. Ürüne yorum ekle veya mevcut yorumu güncelle
exports.createProductReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const productId = String(req.params.productId);
    const userId = req.user.userId;

    const numericRating = Number(rating);

    if (
      !Number.isInteger(numericRating) ||
      numericRating < 1 ||
      numericRating > 5
    ) {
      return res.status(400).json({
        message: 'Puan 1 ile 5 arasında bir tam sayı olmalıdır.'
      });
    }

    if (!comment || !String(comment).trim()) {
      return res.status(400).json({
        message: 'Yorum metni boş bırakılamaz.'
      });
    }

    const products = readProducts();
    const product = products.find((item) => item.id === productId);

    if (!product) {
      return res.status(404).json({
        message: 'Ürün bulunamadı.'
      });
    }

    let review = await Review.findOne({
      product: productId,
      user: userId
    });

    if (review) {
      review.rating = numericRating;
      review.comment = String(comment).trim();
      await review.save();
    } else {
      review = new Review({
        user: userId,
        product: productId,
        rating: numericRating,
        comment: String(comment).trim()
      });

      await review.save();
    }

    res.status(201).json({
      success: true,
      message: 'Yorumunuz başarıyla kaydedildi!',
      review,
      product: {
        id: product.id,
        name: product.name
      }
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        message: 'Bu ürüne zaten yorum yapmışsınız.'
      });
    }

    res.status(500).json({
      message: 'Yorum kaydedilirken sunucu hatası oluştu.',
      error: error.message
    });
  }
};

// 2. Bir ürünün tüm yorumlarını getir
exports.getProductReviews = async (req, res) => {
  try {
    const productId = String(req.params.productId);
    const products = readProducts();

    const product = products.find((item) => item.id === productId);

    if (!product) {
      return res.status(404).json({
        message: 'Ürün bulunamadı.'
      });
    }

    const reviews = await Review.find({
      product: productId
    })
      .populate('user', 'name')
      .sort({ createdAt: -1 });

    const averageRating = reviews.length
      ? reviews.reduce((total, review) => total + review.rating, 0) /
        reviews.length
      : 0;

    res.status(200).json({
      success: true,
      product: {
        id: product.id,
        name: product.name
      },
      count: reviews.length,
      averageRating: Number(averageRating.toFixed(1)),
      reviews
    });
  } catch (error) {
    res.status(500).json({
      message: 'Yorumlar alınırken sunucu hatası oluştu.',
      error: error.message
    });
  }
};
