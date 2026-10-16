
const fs = require('fs');
const path = require('path');

const productsPath = path.join(__dirname, '../../products.json');

const readProducts = () => {
  return JSON.parse(fs.readFileSync(productsPath, 'utf8'));
};


const createTurkishRegex = (keyword) => {
  if (!keyword) return null;

  let clean = keyword.trim().toLocaleLowerCase('tr-TR');

  clean = clean.replace(/(lık|lik|luk|lük|lar|ler|i|ı|ü|u)$/i, '');

  if (clean.endsWith('k')) {
    clean = clean.slice(0, -1) + '[kğ]';
  }

  const words = clean.split(/\s+/).filter(Boolean);

  if (words.length === 0) {
    return new RegExp(keyword, 'i');
  }

  return new RegExp(words.join('|'), 'i');
};


const filterProducts = (products, query) => {
  const { keyword, category, brand, color, maxPrice } = query;

  if (keyword) {
    const searchRegex = createTurkishRegex(keyword);

    products = products.filter((product) =>
      [product.name, product.description, product.category, product.brand]
        .some((value) => searchRegex.test(value || ''))
    );
  }

  if (category && category !== 'Tümü') {
    products = products.filter(
      (product) => product.category === category
    );
  }

  if (brand) {
    const brandsArray = brand.split(',');

    products = products.filter(
      (product) => brandsArray.includes(product.brand)
    );
  }

  if (color && color !== 'Tümü') {
    products = products.filter(
      (product) => product.color === color
    );
  }

  if (maxPrice !== undefined && maxPrice !== '') {
    const priceLimit = Number(maxPrice);

    if (Number.isFinite(priceLimit)) {
      products = products.filter(
        (product) => product.price <= priceLimit
      );
    }
  }

  return products;
};


const sortProducts = (products, sort) => {
  if (sort === 'price-asc') {
    products.sort((a, b) => a.price - b.price);
  } else if (sort === 'price-desc') {
    products.sort((a, b) => b.price - a.price);
  } else if (sort === 'bestseller') {
    products.sort(
      (a, b) => (b.salesCount || 0) - (a.salesCount || 0)
    );
  }

  return products;
};

exports.getProducts = async (req, res) => {
  try {
    const {
      sort,
      page = 1,
      limit = 10
    } = req.query;

    let products = readProducts();

    products = filterProducts(products, req.query);
    products = sortProducts(products, sort);

    const pageNumber = Math.max(1, Number(page) || 1);
    const pageSize = Math.max(1, Number(limit) || 10);
    const totalProducts = products.length;
    const startIndex = (pageNumber - 1) * pageSize;

    const paginatedProducts = products.slice(
      startIndex,
      startIndex + pageSize
    );

    res.status(200).json({
      success: true,
      page: pageNumber,
      pages: Math.ceil(totalProducts / pageSize),
      totalProducts,
      count: paginatedProducts.length,
      products: paginatedProducts
    });
  } catch (error) {
    console.error('Ürün listeleme hatası:', error);

    res.status(500).json({
      success: false,
      message: 'Ürünler alınırken sunucu hatası oluştu.',
      error: error.message
    });
  }
};


exports.getNewArrivals = async (req, res) => {
  try {
    const { sort, limit = 20 } = req.query;

    let products = readProducts();

    products = filterProducts(products, req.query);

    if (sort === 'price-asc' || sort === 'price-desc') {
      products = sortProducts(products, sort);
    } else {
      
    }

    const pageSize = Math.max(1, Number(limit) || 20);
    const totalProducts = products.length;

    products = products.slice(0, pageSize);

    res.status(200).json({
      success: true,
      totalProducts,
      count: products.length,
      products
    });
  } catch (error) {
    console.error('Yeni ürünleri getirme hatası:', error);

    res.status(500).json({
      success: false,
      message: 'Yeni ürünler alınırken sunucu hatası oluştu.',
      error: error.message
    });
  }
};


exports.getProductById = async (req, res) => {
  try {
    const products = readProducts();

    const product = products.find(
      (item) => item.id === req.params.id
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Ürün bulunamadı.'
      });
    }

    res.status(200).json({
      success: true,
      product
    });
  } catch (error) {
    console.error('Ürün detay hatası:', error);

    res.status(500).json({
      success: false,
      message: 'Ürün detayı alınırken sunucu hatası oluştu.',
      error: error.message
    });
  }
};
