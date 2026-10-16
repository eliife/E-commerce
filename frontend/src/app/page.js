
'use client';

import { useState, useEffect } from 'react';
import API from '@/services/api';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '@/store/cartSlice';
import Header from '@/components/header';
import Footer from '@/components/footer';
import Hero from '@/components/hero';

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [wishlistIds, setWishlistIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    let cancelled = false;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const productRes = await API.get('/products');

        if (cancelled) return;

        setProducts(productRes.data.products || productRes.data);

        if (user) {
          try {
            const wishlistRes = await API.get('/wishlist');
            const items =
              wishlistRes.data.wishlist?.products ||
              wishlistRes.data.products ||
              [];

            if (!cancelled) {
              setWishlistIds(
                items.map((item) =>
                  String(item._id || item.id || item)
                )
              );
            }
          } catch (err) {
            console.warn('Favoriler getirilemedi:', err.message);
          }
        } else {
          setWishlistIds([]);
        }
      } catch (err) {
        if (!cancelled) {
          setError('Veriler yüklenirken bir sorun oluştu.');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      cancelled = true;
    };
  }, [user]);

  const handleToggleWishlist = async (productId) => {
    if (!user) {
      alert('Favorilere ürün eklemek için giriş yapmalısınız.');
      return;
    }

    const id = String(productId);
    const wasFavorited = wishlistIds.includes(id);

    // Kalbi hemen güncelle
    setWishlistIds((prev) =>
      wasFavorited
        ? prev.filter((itemId) => itemId !== id)
        : [...prev, id]
    );

    try {
      const response = await API.post('/wishlist/toggle', {
        productId,
      });

      // Backend güncel favori listesini döndürüyorsa onu esas al.
      const updatedProducts =
        response.data.wishlist?.products ||
        response.data.products;

      if (Array.isArray(updatedProducts)) {
        setWishlistIds(
          updatedProducts.map((item) =>
            String(item._id || item.id || item)
          )
        );
      }
    } catch (err) {
      // İşlem başarısızsa önceki duruma geri dön
      setWishlistIds((prev) =>
        wasFavorited
          ? [...new Set([...prev, id])]
          : prev.filter((itemId) => itemId !== id)
      );

      console.error('Favori güncellenemedi:', err);
      alert('Favori güncellenemedi. Lütfen tekrar deneyin.');
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white text-slate-800 selection:bg-slate-900 selection:text-white flex flex-col justify-between">
      <div>
        <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <Hero />

        <main id="products" className="mx-auto max-w-7xl px-6 py-12">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-8">
            <h2 className="text-lg font-semibold tracking-wide text-slate-900 uppercase">
              Tüm Ürünler
            </h2>
            <span className="text-xs text-slate-400 font-medium">
              {filteredProducts.length} öğe listeleniyor
            </span>
          </div>

          {loading && (
            <div className="flex justify-center items-center py-24">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-900"></div>
            </div>
          )}

          {error && (
            <div className="rounded-md bg-red-50 p-4 text-center text-xs text-red-600 font-medium">
              {error}
            </div>
          )}

          {!loading && !error && filteredProducts.length === 0 && (
            <div className="text-center py-24 text-slate-400 text-sm">
              Aradığınız kriterlere uygun ürün bulunamadı.
            </div>
          )}

          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredProducts.map((product) => {
              const productId = String(product._id || product.id);
              const isFavorited = wishlistIds.includes(productId);

              const backendURL = 'http://localhost:5000';
              const imageUrl = product.image
                ? product.image.startsWith('http')
                  ? product.image
                  : `${backendURL}${product.image}`
                : null;

              return (
                <div key={productId} className="group relative flex flex-col">
                  <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-slate-100 flex items-center justify-center border border-slate-100">
                    <Link
                      href={`/products/${productId}`}
                      className="w-full h-full flex items-center justify-center"
                    >
                      {imageUrl ? (
                        <img
                          src={imageUrl}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                        />
                      ) : (
                        <span className="text-xs font-medium text-slate-400">
                          Ürün Görseli
                        </span>
                      )}
                    </Link>

                    <button
                      type="button"
                      aria-label={
                        isFavorited
                          ? 'Favorilerden çıkar'
                          : 'Favorilere ekle'
                      }
                      aria-pressed={isFavorited}
                      onClick={() => handleToggleWishlist(productId)}
                      className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-slate-600 hover:bg-white transition shadow-sm"
                    >
                      <svg
                        className={`w-5 h-5 ${
                          isFavorited
                            ? 'text-red-500 fill-red-500'
                            : 'text-slate-500'
                        }`}
                        fill={isFavorited ? 'currentColor' : 'none'}
                        stroke="currentColor"
                        strokeWidth="1.8"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                    </button>
                  </div>

                  <div className="mt-4 flex justify-between items-start">
                    <div>
                      <Link href={`/products/${productId}`}>
                        <h3 className="text-sm font-medium text-slate-900 hover:underline">
                          {product.name}
                        </h3>
                      </Link>
                      <p className="mt-1 text-xs text-slate-500 line-clamp-1">
                        {product.description}
                      </p>
                    </div>
                    <p className="text-sm font-semibold text-slate-900">
                      {product.price} ₺
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => dispatch(addToCart(product))}
                    className="mt-3 w-full rounded border border-slate-200 bg-white py-2 text-xs font-medium text-slate-800 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition shadow-sm"
                  >
                    Sepete Ekle
                  </button>
                </div>
              );
            })}
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
