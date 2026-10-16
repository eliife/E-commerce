const Address = require('../models/Address');


exports.getUserAddresses = async (req, res) => {
  try {
    const userId = req.user.userId;
    const addresses = await Address.find({ user: userId });

    res.status(200).json({
      success: true,
      count: addresses.length,
      addresses
    });
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası', error: error.message });
  }
};


exports.addAddress = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { title, fullName, phone, city, district, addressLine, isDefault } = req.body;

    if (isDefault) {
      await Address.updateMany({ user: userId }, { isDefault: false });
    }

    const newAddress = new Address({
      user: userId,
      title,
      fullName,
      phone,
      city,
      district,
      addressLine,
      isDefault: isDefault || false
    });

    await newAddress.save();

    res.status(201).json({
      message: 'Adres başarıyla eklendi!',
      address: newAddress
    });
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası', error: error.message });
  }
};


exports.updateAddress = async (req, res) => {
  try {
    const userId = req.user.userId;
    const addressId = req.params.id;
    const { title, fullName, phone, city, district, addressLine, isDefault } = req.body;

   
    const address = await Address.findOne({ _id: addressId, user: userId });
    if (!address) {
      return res.status(404).json({ message: 'Adres bulunamadı ya da bu işlem için yetkiniz yok.' });
    }

    
    if (isDefault) {
      await Address.updateMany({ user: userId }, { isDefault: false });
    }

    
    const updatedAddress = await Address.findByIdAndUpdate(
      addressId,
      { title, fullName, phone, city, district, addressLine, isDefault: isDefault || false },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      message: 'Adres başarıyla güncellendi!',
      address: updatedAddress
    });
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası', error: error.message });
  }
};


exports.deleteAddress = async (req, res) => {
  try {
    const userId = req.user.userId;
    const addressId = req.params.id;

    const address = await Address.findOne({ _id: addressId, user: userId });
    if (!address) {
      return res.status(404).json({ message: 'Adres bulunamadı ya da bu işlem için yetkiniz yok.' });
    }

    await address.deleteOne();

    res.status(200).json({
      message: 'Adres başarıyla silindi.'
    });
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası', error: error.message });
  }
};