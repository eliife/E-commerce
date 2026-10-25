'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import API from '@/services/api';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import Header from '@/components/header';
import Footer from '@/components/footer';

export default function WalletsPage() {
  const searchParams = useSearchParams();
  const keywordParam = searchParams.get('keyword') || '';

  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [wishlistIds, setWishlistIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  
  const [searchTerm, setSearchTerm] = useState(keywordParam);
  // Sadece Wallets kategorisine odaklanıyoruz
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedColor, setSelectedColor] = useState('Tümü');
  const [sortBy, setSortBy] = useState('default');

  useEffect(() => {
    setSearchTerm(keywordParam);
  }, [keywordParam]);

  const [openSections, setOpenSections] = useState({
    brand: true,
    color: true,
  });

  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  // Ürünleri Çekme
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await API.get('/products');
        const data = Array.isArray(response.data) 
          ? response.data 
          : (response.data.products || response.data.data || []);
        
        setAllProducts(data);
      } catch (err) {
        console.error('Ürün yükleme hatası:', err);
        setError('Ürünler yüklenirken bir sorun oluştu.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // 🔍 Filtreleme & Arama Mantığı (Sadece "Wallets" kategorisi sabitlenmiştir)
  useEffect(() => {
    if (!allProducts.length) return;

    // Başlangıç olarak sadece category === 'Wallets' olanları filtreliyoruz
    let result = allProducts.filter((p) => p.category === 'Wallets');

    // Arama Filtresi
    if (searchTerm && searchTerm.trim() !== '') {
      const query = searchTerm.trim().toLocaleLowerCase('tr-TR');
      
      result = result.filter((product) => {
        const fullText = Object.values(product)
          .filter(val => typeof val === 'string')
          .join(' ')
          .toLocaleLowerCase('tr-TR');

        return fullText.includes(query);
      });
    }

    // Marka Filtresi
    if (selectedBrands.length > 0) {
      result = result.filter((p) => selectedBrands.includes(p.brand));
    }

    // Renk Filtresi
    if (selectedColor && selectedColor !== 'Tümü') {
      result = result.filter((p) => (p.color || '').toLowerCase() === selectedColor.toLowerCase());
    }

    // Sıralama
    if (sortBy === 'bestseller') {
      result.sort((a, b) => (b.salesCount || 0) - (a.salesCount || 0));
    } else if (sortBy === 'newest') {
      result.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
    } else if (sortBy === 'price-asc') {
      result.sort((a, b) => Number(a.price) - Number(b.price));
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => Number(b.price) - Number(a.price));
    }

    setProducts(result);
  }, [allProducts, searchTerm, selectedBrands, selectedColor, sortBy]);

  // Favorileri Çekme
  useEffect(() => {
    const fetchWishlist = async () => {
      if (!user) return;
      try {
        const wishlistRes = await API.get('/wishlist');
        const items = wishlistRes.data.wishlist?.products || wishlistRes.data.products || [];
        setWishlistIds(items.map(item => item._id || item.id || item));
      } catch (err) {
        console.warn('Favoriler getirilemedi:', err.message);
      }
    };

    fetchWishlist();
  }, [user]);

  const handleToggleWishlist = async (productId) => {
    if (!user) {
      alert('Favorilere ürün eklemek için giriş yapmalısınız.');
      return;
    }

    try {
      const response = await API.post('/wishlist/toggle', { productId });
      const updatedProducts = response.data.wishlist?.products || [];
      setWishlistIds(updatedProducts.map(item => item._id || item.id || item));
    } catch (err) {
      alert('Favori güncellenemedi.');
    }
  };

  const handleResetFilters = () => {
    setSelectedBrands([]);
    setSelectedColor('Tümü');
    setSearchTerm('');
    setSortBy('default');
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-stone-900 flex flex-col justify-between selection:bg-stone-900 selection:text-white">
      <div>
        <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        
        <main className="mx-auto max-w-[1536px] px-4 sm:px-8 py-8 sm:py-12">
          
          <div className="flex items-end justify-between border-b border-stone-200 pb-6 mb-8">
            <div>
              <h1 className="text-2xl sm:text-4xl font-serif tracking-tight text-stone-900">
                {searchTerm ? `"${searchTerm}" Arama Sonuçları` : 'Cüzdanlar'}
              </h1>
              <p className="text-xs text-stone-400 tracking-wider uppercase mt-1.5">{products.length} ÜRÜN</p>
            </div>
            
            <button 
              onClick={() => setIsFilterDrawerOpen(true)}
              className="flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-stone-900 hover:opacity-70 transition cursor-pointer border-b border-stone-900 pb-1"
            >
              <span>FİLTRELER</span>
              <span className="text-stone-400">({selectedBrands.length + (selectedColor !== 'Tümü' ? 1 : 0)})</span>
            </button>
          </div>

          <div className="w-full">
            {loading && <div className="flex justify-center py-24"><div className="animate-spin rounded-full h-6 w-6 border-b-2 border-stone-900"></div></div>}
            {error && <div className="text-center text-xs text-red-600 tracking-wider">{error}</div>}
            {!loading && !error && products.length === 0 && <div className="text-center py-24 bg-stone-100/50 text-stone-400 text-xs uppercase tracking-wider">Bu kategoride ürün bulunamadı.</div>}

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 sm:gap-x-6 sm:gap-y-12">
              {products.map((product) => {
                const productId = product.id || product._id;
                const isFavorited = wishlistIds.includes(productId);
                const backendURL = 'http://localhost:5000';
                const rawImg = product.image || product.images?.[0];
                const imageUrl = rawImg ? (rawImg.startsWith('http') ? rawImg : `${backendURL}${rawImg}`) : null;

                return (
                  <div key={productId} className="group relative flex flex-col bg-transparent">
                    <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#F4F1EA] flex items-center justify-center">
                      <Link href={`/products/${productId}`} className="w-full h-full flex items-center justify-center">
                        {imageUrl ? (
                          <img 
                            src={imageUrl} 
                            alt={product.name} 
                            className="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
                          />
                        ) : (
                          <span className="text-xs text-stone-400 uppercase tracking-widest">Görsel Yok</span>
                        )}
                      </Link>
                      
                      <button 
                        onClick={() => handleToggleWishlist(productId)} 
                        aria-label="Favorilere ekle"
                        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center shadow-sm transition-all duration-200 hover:scale-110 hover:bg-white z-10 cursor-pointer"
                      >
                        <svg 
                          className={`w-4 h-4 transition-colors duration-200 ${
                            isFavorited ? 'text-gray-900 fill-gray-900' : 'text-stone-400 hover:text-gray-900'
                          }`} 
                          fill={isFavorited ? 'currentColor' : 'none'} 
                          stroke="currentColor" 
                          strokeWidth="1.8" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"></path>
                        </svg>
                      </button>
                    </div>

                    <div className="mt-3 flex flex-col space-y-1">
                      <Link href={`/products/${productId}`} className="group-hover:opacity-80 transition">
                        <h3 className="text-xs font-semibold text-stone-900 tracking-wider uppercase line-clamp-1">
                          {product.name}
                        </h3>
                        {product.brand && (
                          <p className="text-[11px] font-medium text-stone-400 tracking-wider uppercase line-clamp-1">
                            {product.brand}
                          </p>
                        )}
                        <p className="text-xs font-medium text-stone-900 tracking-wider uppercase pt-1">
                          {product.price} ₺
                        </p>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </main>
      </div>

      {/* FİLTRE PANELİ */}
      {isFilterDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity" onClick={() => setIsFilterDrawerOpen(false)} />

          <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between z-10">
            <div className="flex items-center justify-between p-6 border-b border-stone-200">
              <h2 className="text-lg font-serif text-stone-900">Filtreler</h2>
              <button onClick={() => setIsFilterDrawerOpen(false)} className="text-stone-400 hover:text-stone-900 text-xl font-light p-1 cursor-pointer">✕</button>
            </div>

            <div className="p-6 overflow-y-auto flex-1 space-y-8">
              {/* Sıralama */}
              <div className="border-b border-stone-200 pb-6">
                <h3 className="text-xs font-serif text-stone-900 mb-4 text-base">Sırala</h3>
                <div className="space-y-3">
                  {[
                    { id: 'default', label: 'VARSAYILAN' },
                    { id: 'bestseller', label: 'ÇOK SATANLAR' },
                    { id: 'price-asc', label: 'EN DÜŞÜK FİYAT' },
                    { id: 'price-desc', label: 'EN YÜKSEK FİYAT' },
                    { id: 'newest', label: 'EN YENİ' },
                  ].map((option) => (
                    <label key={option.id} className="flex items-center gap-3 cursor-pointer text-xs tracking-wider text-stone-600 font-medium">
                      <input type="radio" name="drawer-sort" checked={sortBy === option.id} onChange={() => setSortBy(option.id)} className="accent-stone-900" />
                      <span>{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-stone-200 grid grid-cols-2 gap-3 bg-white">
              <button onClick={handleResetFilters} className="py-3 text-xs font-semibold tracking-widest text-stone-900 border border-stone-900 uppercase hover:bg-stone-50 transition text-center cursor-pointer">
                TEMİZLE
              </button>
              <button onClick={() => setIsFilterDrawerOpen(false)} className="py-3 text-xs font-semibold tracking-widest text-white bg-stone-900 uppercase hover:bg-stone-800 transition text-center cursor-pointer">
                ÜRÜNLERİ GÖSTER • {products.length}
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}