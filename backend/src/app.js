
const express = require('express');
const cors = require('cors');
const path = require('path');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

// Rotalar
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');
const wishlistRoutes = require('./routes/wishlistRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const addressRoutes = require('./routes/addressRoutes');
const uploadRoutes = require('./routes/uploadRoutes');

const app = express();

// Güvenlik başlıkları
app.use(
  helmet({
    crossOriginResourcePolicy: {
      policy: 'cross-origin',
    },
  })
);

// Rate Limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    success: false,
    message: 'Çok fazla istek gönderildi, lütfen bir süre sonra tekrar deneyin.',
  },
});

app.use('/api/', limiter);

// CORS ayarları
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.use(express.json());


app.use('/uploads', express.static(path.join(__dirname, '../uploads')));


app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/addresses', addressRoutes);
app.use('/api/upload', uploadRoutes);


app.get('/', (req, res) => {
  res.json({ message: 'E-Ticaret Backend API çalışıyor! 🚀' });
});

module.exports = app;
