'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/header';
import Footer from '@/components/footer';
import Hero from '@/components/hero';
import API from '@/services/api';
import { useSelector } from 'react-redux';

export default function HomePage() {
  const [isMounted, setIsMounted] = useState(false);
  const [wallets, setWallets] = useState([]);
  const [wishlistIds, setWishlistIds] = useState([]);

  const backendURL = 'http://localhost:5000';
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // 429 hatasını önlemek için istekleri güvenli sıraya koyduk
  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      try {
        // Önce ürünleri çekelim
        const productRes = await API.get('/products');
        const data = Array.isArray(productRes.data)
          ? productRes.data
          : (productRes.data.products || productRes.data.data || []);

        const walletProducts = data.filter(
          (product) => product.category === 'Wallets'
        );

        if (isMounted) {
          setWallets(walletProducts.slice(0, 3));
        }

        // Kullanıcı giriş yapmışsa favorileri biraz gecikmeli veya güvenli çekelim
        if (user) {
          try {
            const wishlistRes = await API.get('/wishlist');
            const items =
              wishlistRes.data.wishlist?.products ||
              wishlistRes.data.products ||
              [];

            if (isMounted) {
              setWishlistIds(
                items.map((item) => item._id || item.id || item)
              );
            }
          } catch (wishlistErr) {
            console.warn('Favoriler alınamadı:', wishlistErr);
          }
        } else {
          if (isMounted) {
            setWishlistIds([]);
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

  // Favoriye ekle veya favorilerden çıkar
  const handleToggleWishlist = async (productId, e) => {
    e.preventDefault();

    if (!user) {
      alert('Favorilere eklemek için giriş yapmalısınız.');
      return;
    }

    try {
      const res = await API.post('/wishlist/toggle', { productId });

      const updated = res.data.wishlist?.products || [];

      setWishlistIds(
        updated.map((item) => item._id || item.id || item)
      );
    } catch (err) {
      alert('Favori güncellenemedi.');
    }
  };

  if (!isMounted) return null;

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-stone-900 selection:bg-stone-900 selection:text-white flex flex-col justify-between">
      <div>
        <Header />

        <Hero />

        {/* Genişletilmiş Kampanya Banner Alanı */}
        <section className="relative w-full min-h-[85vh] sm:min-h-screen overflow-hidden bg-[#F4F1EA] py-12 flex items-center justify-center">
          <img
            src={`${backendURL}/uploads/ana-banner-1.webp`}
            alt="Kampanya Görseli"
            className="w-full h-full object-cover absolute inset-0"
          />

          <div className="absolute inset-x-0 bottom-10 sm:bottom-16 flex justify-center items-center z-10">
            <Link
              href="/products"
              className="group flex flex-col items-center space-y-2 transition duration-300"
            >
              <span className="text-xs sm:text-sm uppercase tracking-[0.3em] font-medium sm:font-light px-4 py-2 sm:px-0 sm:py-0 rounded-full sm:rounded-none bg-stone-900/40 sm:bg-transparent text-white sm:text-stone-900 sm:border-b sm:border-stone-900 sm:pb-1 group-hover:opacity-80 transition duration-300 backdrop-blur-[2px] sm:backdrop-blur-none">
                TÜM ÜRÜNLERİ KEŞFET
              </span>
            </Link>
          </div>
        </section>

        {/* Cüzdan Ürün Kartları (Mobilde Yatay Slider, Masaüstünde Orijinal Grid) */}
        <section className="max-w-[1200px] mx-auto px-5 sm:px-8 py-10">
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-none snap-x snap-mandatory sm:grid sm:grid-cols-3 sm:gap-x-6 sm:overflow-visible sm:pb-0">
            {wallets.map((product) => {
              const productId = product.id || product._id;

              const isFavorited = wishlistIds.some(
                (id) => String(id) === String(productId)
              );

              const rawImg = product.image || product.images?.[0];

              const imageUrl = rawImg
                ? rawImg.startsWith('http')
                  ? rawImg
                  : `${backendURL}${rawImg}`
                : null;

              return (
                <div
                  key={productId}
                  className="group relative flex flex-col min-w-[170px] max-w-[190px] sm:min-w-0 sm:max-w-none snap-start flex-shrink-0"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F4F1EA]">
                    <Link
                      href={`/products/${productId}`}
                      className="flex h-full w-full items-center justify-center"
                    >
                      {imageUrl ? (
                        <img
                          src={imageUrl}
                          alt={product.name}
                          loading="lazy"
                          className={`h-full w-full object-contain transition duration-500 ${
                            product.name === 'MILA'
                              ? 'scale-[2] group-hover:scale-[2.05]'
                              : 'group-hover:scale-105'
                          }`}
                        />
                      ) : (
                        <span className="text-xs text-stone-400 uppercase tracking-widest">
                          Görsel Yok
                        </span>
                      )}
                    </Link>
                  </div>

                  <div className="mt-3 flex items-start justify-between">
                    <Link
                      href={`/products/${productId}`}
                      className="flex min-w-0 flex-1 flex-col space-y-1 group-hover:opacity-80 transition"
                    >
                      <h3 className="text-xs font-semibold text-stone-900 tracking-wider uppercase line-clamp-1">
                        {product.name}
                      </h3>

                      <p className="text-[11px] text-stone-400 tracking-wider uppercase line-clamp-1">
                        {product.brand || 'VELORA'}
                      </p>

                      <p className="pt-1 text-xs font-medium text-stone-900 tracking-wider uppercase">
                        {product.price} ₺
                      </p>
                    </Link>

                    <button
                      onClick={(e) => handleToggleWishlist(productId, e)}
                      aria-label="Favorilere ekle"
                      className="ml-2 cursor-pointer p-1 text-stone-400 transition hover:text-stone-900"
                    >
                      <svg
                        className={`h-5 w-5 transition-colors duration-200 ${
                          isFavorited
                            ? 'fill-stone-900 text-stone-900'
                            : ''
                        }`}
                        fill={isFavorited ? 'currentColor' : 'none'}
                        stroke="currentColor"
                        strokeWidth="1.5"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Velora Tanıtım Alanı */}
        <main className="mx-auto max-w-4xl px-6 sm:px-12 py-16 lg:py-20 text-center space-y-8 flex flex-col items-center justify-center">
          <span className="text-[10px] uppercase tracking-[0.3em] text-stone-400 font-light">
            Velora
          </span>

          <h1 className="text-4xl sm:text-6xl font-serif tracking-tight text-stone-900 leading-tight">
            Sadeliğin ve Zanaatın Estetiği
          </h1>

          <p className="text-sm sm:text-base text-stone-600 font-light max-w-lg mx-auto leading-relaxed">
            Geçici trendlerden uzak, zamanın ötesinde tasarlanmış koleksiyonlarımızı ve hikâyemizi keşfedin.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/about"
              className="bg-stone-900 text-white px-8 py-4 text-[11px] uppercase tracking-[0.2em] rounded-sm hover:bg-stone-800 transition duration-300"
            >
              Hikâyemiz
            </Link>

            <Link
              href="/blog"
              className="border border-stone-300 text-stone-900 px-8 py-4 text-[11px] uppercase tracking-[0.2em] rounded-sm hover:border-stone-900 transition duration-300"
            >
              Journal
            </Link>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}