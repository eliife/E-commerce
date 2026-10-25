
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      console.warn('MongoDB URI tanımlanmamış. JSON tabanlı ürünler kullanılabilir.');
      return false;
    }

    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB bağlantısı başarılı: ${conn.connection.host}`);

    mongoose.connection.on('disconnected', () => {
      console.error('MongoDB bağlantısı kesildi!');
    });

    mongoose.connection.on('reconnected', () => {
      console.log('MongoDB bağlantısı yeniden kuruldu.');
    });

    mongoose.connection.on('error', (error) => {
      console.error('MongoDB bağlantı hatası:', error.message);
    });

    return true;
  } catch (error) {
    console.error('MongoDB bağlantısı kurulamadı:', error.message);
    console.warn('Sunucu çalışmaya devam edecek; MongoDB gerektiren özellikler kullanılamayabilir.');
    return false;
  }
};

module.exports = connectDB;
