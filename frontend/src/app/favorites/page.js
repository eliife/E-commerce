'use client';

import { useState, useEffect } from 'react';
import API from '@/services/api';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '@/store/cartSlice';
import Header from '@/components/header';
import Footer from '@/components/footer';

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isMounted, setIsMounted] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && !user) {
      router.push('/login');
    }
  }, [isMounted, user, router]);

  useEffect(() => {
    if (isMounted && user) {
      fetchFavorites();
    }
  }, [isMounted, user]);

  const fetchFavorites = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};

      const response = await API.get('/wishlist', config);
      const items = response.data.wishlist?.products || response.data.products || [];
      setFavorites(items);
    } catch (err) {
      console.error('Favoriler alınamadı:', err);
      setFavorites([]);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFromWishlist = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};

      const response = await API.post('/wishlist/toggle', { productId }, config);
      const updatedItems = response.data.wishlist?.products || [];
      setFavorites(updatedItems);
    } catch (err) {
      alert('Ürün favorilerden çıkarılamadı.');
    }
  };

  const filteredFavorites = favorites.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isMounted || !user) return null;

  return (
    <div className="min-h-screen bg-stone-50/50 text-stone-800 selection:bg-stone-900 selection:text-white flex flex-col justify-between">
      <div>
        <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        <main className="mx-auto max-w-7xl px-6 py-16">
          <div className="flex items-center justify-between border-b border-stone-200 pb-4 mb-10">
            <div>
              <h1 className="text-base font-serif tracking-[0.2em] text-stone-900 uppercase font-bold">
                Favori Ürünlerim
              </h1>
              <p className="text-xs text-stone-500 mt-1 font-light">
                Beğendiğiniz ürünleri burada saklayabilir ve sepetinize ekleyebilirsiniz.
              </p>
            </div>
            <span className="text-xs uppercase tracking-widest text-stone-500 font-medium">
              {filteredFavorites.length} çeşit ürün
            </span>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-32">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-stone-900"></div>
            </div>
          ) : filteredFavorites.length > 0 ? (
            <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {filteredFavorites.map((product) => {
                const productId = product._id || product.id;

                const backendURL = 'http://localhost:5000';
                const rawImg = product.images?.[0] || product.image;
                const imageUrl = rawImg 
                  ? (rawImg.startsWith('http') ? rawImg : `${backendURL}${rawImg}`)
                  : null;

                return (
                  <div key={productId} className="group relative flex flex-col">
                    {/* Çerçevesiz, hafif arkaplanlı görsel alanı ve sağ üstte kalp butonu */}
                    <div className="relative aspect-square w-full overflow-hidden bg-stone-100/70 flex items-center justify-center">
                      <Link href={`/products/${productId}`} className="w-full h-full flex items-center justify-center">
                        {imageUrl ? (
                          <img 
                            src={imageUrl} 
                            alt={product.name} 
                            className="w-full h-full object-cover group-hover:scale-105 transition duration-500 ease-out"
                          />
                        ) : (
                          <span className="text-[10px] uppercase tracking-widest text-stone-400">
                            Görsel
                          </span>
                        )}
                      </Link>
                      
                      <button
                        onClick={() => handleRemoveFromWishlist(productId)}
                        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-stone-800 hover:bg-stone-900 hover:text-white transition-all duration-300 shadow-sm cursor-pointer"
                        title="Favorilerden Çıkar"
                      >
                        <svg className="w-4 h-4 fill-gray-900 group-hover:text-white transition-colors" viewBox="0 0 24 24">
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                        </svg>
                      </button>
                    </div>

                    {/* Fotoğraftaki gibi alt alta sade metin yapısı */}
                    <div className="mt-3 space-y-1">
                      <Link href={`/products/${productId}`}>
                        <h3 className="text-xs uppercase tracking-wider font-medium text-stone-900 hover:text-stone-600 transition line-clamp-1">
                          {product.name}
                        </h3>
                      </Link>
                      <p className="text-[11px] text-stone-400 uppercase tracking-widest font-light">
                        {product.brand || 'VELORA'}
                      </p>
                      <p className="text-xs font-semibold tracking-wider text-stone-900 pt-0.5">
                        {product.price} ₺
                      </p>
                    </div>

                    <button
                      onClick={() => dispatch(addToCart(product))}
                      className="mt-3 w-full rounded-sm bg-stone-900 py-2.5 text-xs font-medium tracking-widest uppercase text-white hover:bg-stone-800 transition shadow-sm cursor-pointer"
                    >
                      Sepete Ekle
                    </button>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-24 space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-white border border-stone-200 flex items-center justify-center text-stone-400 shadow-sm">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <p className="text-xs uppercase tracking-wider text-stone-500">
                Favori listenizde henüz ürün bulunmuyor.
              </p>
              <div>
                <Link href="/products" className="inline-block rounded-sm border border-stone-300 bg-stone-900 px-6 py-2.5 text-xs font-medium tracking-widest uppercase text-white hover:bg-stone-800 transition shadow-sm">
                  Alışverişe Başla
                </Link>
              </div>
            </div>
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
}