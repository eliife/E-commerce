
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB Bağlantısı Başarılı: ${conn.connection.host}`);

    mongoose.connection.on('disconnected', () => {
      console.error('MongoDB bağlantısı kesildi!');
    });

    mongoose.connection.on('reconnected', () => {
      console.log('MongoDB bağlantısı yeniden kuruldu.');
    });

    mongoose.connection.on('error', (error) => {
      console.error('MongoDB bağlantı hatası:', error.message);
    });
  } catch (error) {
    console.error('MongoDB bağlantı hatası:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
