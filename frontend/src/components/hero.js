'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import API from '@/services/api';
import { useSelector } from 'react-redux';

export default function Hero() {
  const backendURL = 'http://localhost:5000';
  const [products, setProducts] = useState([]);
  const [wishlistIds, setWishlistIds] = useState([]);
  const { user } = useSelector((state) => state.auth);

  // İsteklerin üst üste binip 429 hatası vermesini önlemek için tek bir useEffect içinde birleştirildi
  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      try {
        const productRes = await API.get('/products');
        const data = Array.isArray(productRes.data) ? productRes.data : (productRes.data.products || productRes.data.data || []);
        
        if (isMounted) {
          setProducts(data.slice(0, 4));
        }

        if (user) {
          const wishlistRes = await API.get('/wishlist');
          const items = wishlistRes.data.wishlist?.products || wishlistRes.data.products || [];
          if (isMounted) {
            setWishlistIds(items.map(item => item._id || item.id || item));
          }
        }
      } catch (err) {
        console.error('Veriler yüklenemedi:', err);
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, [user]);

  const handleToggleWishlist = async (productId, e) => {
    e.preventDefault();
    if (!user) {
      alert('Favorilere eklemek için giriş yapmalısınız.');
      return;
    }
    try {
      const res = await API.post('/wishlist/toggle', { productId });
      const updated = res.data.wishlist?.products || [];
      setWishlistIds(updated.map(item => item._id || item.id || item));
    } catch (err) {
      alert('Favori güncellenemedi.');
    }
  };

  return (
    <div className="w-full bg-[#FDFBF7]">
      
      {/* 1. Kısım: Masaüstü orijinal, mobilde büyük bannerlar */}
      <section className="w-full grid grid-cols-2 md:grid-cols-2 gap-0 p-0 bg-[#FDFBF7]">
        <Link href="/bestsellers" className="group relative w-full overflow-hidden bg-[#F4F1EA] block">
          <img 
            src={`${backendURL}/uploads/ana-banner-5.webp`} 
            alt="Çantalar Koleksiyonu" 
            className="w-full h-[78vh] sm:h-[82vh] md:h-auto object-cover md:object-contain group-hover:scale-[1.02] transition duration-700"
          />
        </Link>
        <Link href="/new-arrivals" className="group relative w-full overflow-hidden bg-[#F4F1EA] block">
          <img 
            src={`${backendURL}/uploads/ana-banner-4.webp`} 
            alt="Cüzdanlar Koleksiyonu" 
            className="w-full h-[78vh] sm:h-[82vh] md:h-auto object-cover md:object-contain group-hover:scale-[1.02] transition duration-700"
          />
        </Link>
      </section>

      {/* 2. Kısım: Polène Tipografi Tarzı Kategori Yönlendirmeleri */}
      <section className="mx-auto max-w-7xl px-6 sm:px-12 py-32 sm:py-48 text-center space-y-16 sm:space-y-24">
        <div>
          <Link 
            href="/bags" 
            className="inline-block font-serif font-light text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-wider text-stone-900 uppercase transition-all duration-300 hover:-translate-x-3"
          >
            Çantalar
          </Link>
        </div>
        <div>
          <Link 
            href="/wallets" 
            className="inline-block font-serif font-light text-4xl sm:text-6xl md:text-7xl tracking-wider text-stone-900 uppercase transition-all duration-300 hover:-translate-x-3"
          >
            Cüzdanlar
          </Link>
        </div>
      </section>

      {/* 3. Kısım: Öne Çıkan Ürün Kartları */}
      <section className="max-w-[1536px] mx-auto px-4 sm:px-8 py-12">
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-none snap-x snap-mandatory lg:grid lg:grid-cols-4 lg:overflow-visible lg:pb-0">
          {products.map((product) => {
            const productId = product.id || product._id;
            const isFavorited = wishlistIds.includes(productId);
            const rawImg = product.image || product.images?.[0];
            const imageUrl = rawImg ? (rawImg.startsWith('http') ? rawImg : `${backendURL}${rawImg}`) : null;

            return (
              <div 
                key={productId} 
                className="group relative flex flex-col bg-transparent min-w-[160px] max-w-[180px] sm:min-w-[200px] sm:max-w-[220px] lg:min-w-0 lg:max-w-none snap-start flex-shrink-0"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F4F1EA] flex items-center justify-center">
                  <Link href={`/products/${productId}`} className="w-full h-full flex items-center justify-center">
                    {imageUrl ? (
                      <img 
                        src={imageUrl} 
                        alt={product.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
                      />
                    ) : (
                      <span className="text-[10px] text-stone-400 uppercase tracking-widest">Görsel Yok</span>
                    )}
                  </Link>
                </div>

                <div className="mt-3 flex items-start justify-between">
                  <Link href={`/products/${productId}`} className="flex flex-col space-y-0.5 group-hover:opacity-80 transition flex-1">
                    <h3 className="text-[11px] sm:text-xs font-semibold text-stone-900 tracking-wider uppercase line-clamp-1">
                      {product.name}
                    </h3>
                    <p className="text-[10px] sm:text-[11px] text-stone-400 tracking-wider uppercase line-clamp-1">
                      {product.brand || 'VELORA'}
                    </p>
                    <p className="text-[11px] sm:text-xs font-medium text-stone-900 tracking-wider uppercase pt-0.5 sm:pt-1">
                      {product.price} ₺
                    </p>
                  </Link>

                  <button 
                    onClick={(e) => handleToggleWishlist(productId, e)}
                    aria-label="Favorilere ekle"
                    className="p-1 sm:p-1.5 text-stone-400 hover:text-stone-900 transition cursor-pointer ml-2"
                  >
                    <svg 
                      className={`w-4 h-4 sm:w-5 sm:h-5 transition-colors duration-200 ${isFavorited ? 'text-stone-900 fill-stone-900' : ''}`} 
                      fill={isFavorited ? 'currentColor' : 'none'} 
                      stroke="currentColor" 
                      strokeWidth="1.5" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"></path>
                    </svg>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}