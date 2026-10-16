
'use client';

import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addToCart,
  decreaseQuantity,
  removeFromCart,
  clearCart,
  fetchCart,
  resetCart,
} from '@/store/cartSlice';
import Link from 'next/link';
import Header from '@/components/header';
import Footer from '@/components/footer';

export default function CartPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [token, setToken] = useState(null);

  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);
  const loading = useSelector((state) => state.cart.loading);
  const hasLoaded = useSelector((state) => state.cart.hasLoaded);
  const error = useSelector((state) => state.cart.error);

  useEffect(() => {
    setIsMounted(true);

    const currentToken = localStorage.getItem('token');
    setToken(currentToken);

    dispatch(resetCart());

    if (currentToken) {
      dispatch(fetchCart());
    }
  }, [dispatch]);

  const totalPrice = cartItems.reduce(
    (total, item) =>
      total + Number(item.price || 0) * Number(item.quantity || 1),
    0
  );

  if (!isMounted) {
    return null;
  }

  const initialLoading = Boolean(token) && loading && !hasLoaded;

  return (
    <div className="min-h-screen bg-white text-slate-800 selection:bg-slate-900 selection:text-white flex flex-col justify-between">
      <div>
        <Header />

        <main className="mx-auto max-w-7xl px-6 py-16">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-10">
            <div>
              <h1 className="text-xl font-semibold tracking-wide text-slate-900 uppercase">
                Alışveriş Sepeti
              </h1>
              <p className="text-xs text-slate-400 mt-1">
                Sepetinizdeki ürünleri inceleyebilir ve siparişinizi tamamlayabilirsiniz.
              </p>
            </div>

            <span className="text-xs text-slate-400 font-medium">
              {cartItems.length} çeşit ürün
            </span>
          </div>

          {!token ? (
            <div className="text-center py-24 space-y-4">
              <p className="text-sm text-slate-500">
                Sepetinizi görüntülemek için giriş yapmalısınız.
              </p>
              <Link
                href="/login"
                className="inline-block rounded bg-slate-900 px-6 py-2.5 text-xs font-medium text-white hover:bg-slate-800 transition"
              >
                Giriş Yap
              </Link>
            </div>
          ) : initialLoading ? (
            <div className="text-center py-24">
              <p className="text-sm text-slate-400">
                Sepetiniz yükleniyor...
              </p>
            </div>
          ) : error ? (
            <div className="text-center py-24 space-y-4">
              <p className="text-sm text-red-500">{error}</p>
              <button
                onClick={() => dispatch(fetchCart())}
                disabled={loading}
                className="rounded bg-slate-900 px-5 py-2.5 text-xs text-white disabled:opacity-50"
              >
                {loading ? 'Yeniden deneniyor...' : 'Tekrar Dene'}
              </button>
            </div>
          ) : cartItems.length === 0 ? (
            <div className="text-center py-24 space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
              </div>

              <p className="text-sm text-slate-400">
                Sepetinizde henüz ürün bulunmuyor.
              </p>

              <Link
                href="/"
                className="inline-block rounded border border-slate-200 bg-slate-900 px-6 py-2.5 text-xs font-medium text-white hover:bg-slate-800 transition shadow-sm"
              >
                Alışverişe Başla
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
              <div className="lg:col-span-2 space-y-4">
                <div className="divide-y divide-slate-100 border-t border-b border-slate-100">
                  {cartItems.map((item) => {
                    const itemId = item.id || item._id;
                    const backendURL = 'http://localhost:5000';
                    const rawImg = item.images?.[0] || item.image;

                    const imageUrl = rawImg
                      ? rawImg.startsWith('http')
                        ? rawImg
                        : `${backendURL}${rawImg}`
                      : null;

                    return (
                      <div
                        key={itemId}
                        className="py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="h-20 w-20 rounded-lg bg-slate-50 flex items-center justify-center text-xs text-slate-400 font-medium border border-slate-100 flex-shrink-0 overflow-hidden">
                            <Link
                              href={`/products/${itemId}`}
                              className="w-full h-full flex items-center justify-center"
                            >
                              {imageUrl ? (
                                <img
                                  src={imageUrl}
                                  alt={item.name || 'Ürün görseli'}
                                  className="w-full h-full object-cover object-center"
                                />
                              ) : (
                                <span className="text-xs text-slate-400">
                                  Görsel
                                </span>
                              )}
                            </Link>
                          </div>

                          <div>
                            <Link href={`/products/${itemId}`}>
                              <h3 className="text-sm font-medium text-slate-900 hover:underline">
                                {item.name}
                              </h3>
                            </Link>
                            <p className="text-xs text-slate-500 mt-1">
                              {item.price} ₺
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between w-full sm:w-auto sm:space-x-8">
                          <div className="flex items-center border border-slate-200 rounded overflow-hidden bg-white shadow-sm">
                            <button
                              onClick={() => dispatch(decreaseQuantity(itemId))}
                              disabled={loading}
                              className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100 transition disabled:opacity-50"
                            >
                              -
                            </button>

                            <span className="px-3 py-1.5 text-xs font-semibold text-slate-800 min-w-[2rem] text-center">
                              {item.quantity}
                            </span>

                            <button
                              onClick={() => dispatch(addToCart(item))}
                              disabled={loading}
                              className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100 transition disabled:opacity-50"
                            >
                              +
                            </button>
                          </div>

                          <span className="text-sm font-semibold text-slate-900 w-24 text-right">
                            {Number(item.price || 0) * Number(item.quantity || 1)} ₺
                          </span>

                          <button
                            onClick={() => dispatch(removeFromCart(itemId))}
                            disabled={loading}
                            className="text-slate-400 hover:text-red-500 transition p-1 disabled:opacity-50"
                            title="Ürünü Kaldır"
                          >
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex justify-between items-center pt-2">
                  <button
                    onClick={() => dispatch(clearCart())}
                    disabled={loading}
                    className="text-xs text-red-500 hover:text-red-700 transition font-medium flex items-center gap-1.5 disabled:opacity-50"
                  >
                    Sepeti Temizle
                  </button>

                  <Link
                    href="/"
                    className="text-xs text-slate-600 hover:text-slate-900 font-medium underline transition"
                  >
                    Alışverişe Devam Et
                  </Link>
                </div>
              </div>

              <div className="bg-slate-50/70 p-6 rounded-lg border border-slate-100 space-y-6">
                <h2 className="text-xs font-semibold text-slate-900 uppercase tracking-widest border-b border-slate-200/60 pb-3">
                  Sipariş Özeti
                </h2>

                <div className="space-y-3 text-xs text-slate-600">
                  <div className="flex justify-between">
                    <span>Ürünler Toplamı</span>
                    <span className="font-medium text-slate-900">
                      {totalPrice} ₺
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>Kargo</span>
                    <span className="font-medium text-slate-900">
                      Ücretsiz
                    </span>
                  </div>
                </div>

                <div className="border-t border-slate-200/60 pt-4 flex justify-between text-sm font-semibold text-slate-900">
                  <span>Toplam Tutar</span>
                  <span>{totalPrice} ₺</span>
                </div>

                <button className="w-full rounded bg-slate-900 py-3 text-xs font-medium text-white hover:bg-slate-800 transition shadow-sm">
                  Alışverişi Tamamla
                </button>
              </div>
            </div>
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
}
