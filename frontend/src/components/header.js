'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '@/store/authSlice';

export default function Header({ searchTerm = '', setSearchTerm = () => {} }) {
  const [isMounted, setIsMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const menuRef = useRef(null);
  const searchRef = useRef(null);

  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const cartItems = useSelector((state) => state.cart.items);
  const totalItemsCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  useEffect(() => {
    setIsMounted(true);

    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }

      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    if (searchTerm.trim()) {
      router.push(`/products?keyword=${encodeURIComponent(searchTerm.trim())}`);
      setIsSearchOpen(false);
    } else {
      router.push('/products');
      setIsSearchOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-stone-100 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4 lg:grid lg:grid-cols-[1fr_auto_1fr]">

        {/* 1. Sol Navigasyon - Masaüstü */}
        <nav className="hidden items-center space-x-6 text-xs font-medium uppercase tracking-wider text-stone-500 lg:flex xl:space-x-8 xl:tracking-widest">
          <Link href="/products" className="whitespace-nowrap transition hover:text-stone-900">
            Tüm Ürünler
          </Link>
          <Link href="/bestsellers" className="whitespace-nowrap transition hover:text-stone-900">
            Çok Satanlar
          </Link>
          <Link href="/new-arrivals" className="whitespace-nowrap transition hover:text-stone-900">
            Yeni Gelenler
          </Link>
        </nav>

        {/* Mobil Menü (Sol Taraf) */}
        <div className="relative lg:hidden" ref={menuRef}>
          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-1.5 text-stone-700 transition hover:text-stone-900"
            title="Menü"
            aria-label="Menüyü aç"
            aria-expanded={isMenuOpen}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {isMenuOpen && (
            <div className="absolute left-0 top-full z-50 mt-3 flex w-48 flex-col space-y-2 rounded-md border border-stone-100 bg-white py-3 text-xs uppercase tracking-widest text-stone-600 shadow-lg">
              <Link
                href="/products"
                onClick={() => setIsMenuOpen(false)}
                className="px-5 py-2 transition hover:bg-stone-50 hover:text-stone-950"
              >
                Tüm Ürünler
              </Link>
              <Link
                href="/bestsellers"
                onClick={() => setIsMenuOpen(false)}
                className="px-5 py-2 transition hover:bg-stone-50 hover:text-stone-950"
              >
                Çok Satanlar
              </Link>
              <Link
                href="/new-arrivals"
                onClick={() => setIsMenuOpen(false)}
                className="px-5 py-2 transition hover:bg-stone-50 hover:text-stone-950"
              >
                Yeni Gelenler
              </Link>
            </div>
          )}
        </div>

        {/* 2. Logo (Ortada) */}
        <div className="flex justify-center lg:justify-self-center">
          <Link
            href="/"
            className="whitespace-nowrap font-serif text-xl font-semibold tracking-[0.16em] text-stone-900 sm:text-2xl sm:tracking-[0.22em] lg:text-3xl lg:tracking-[0.25em]"
          >
            VELORA
          </Link>
        </div>

        {/* 3. Sağ İkonlar (Arama, Favoriler, Profil, Sepet) */}
        <div className="flex items-center justify-end gap-1 sm:gap-2 lg:justify-self-end lg:gap-3">
          
          {/* Arama */}
          <div className="relative" ref={searchRef}>
            <button
              type="button"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 text-stone-700 transition hover:text-stone-900"
              title="Ara"
              aria-label="Arama"
              aria-expanded={isSearchOpen}
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {isSearchOpen && (
              <form
                onSubmit={handleSearchSubmit}
                className="absolute right-0 top-full z-50 mt-2 flex w-[calc(100vw-2rem)] max-w-xs items-center rounded-lg border border-stone-200 bg-white p-1.5 shadow-xl sm:w-64"
              >
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Ürün ara..."
                  autoFocus
                  className="w-full bg-transparent px-2 py-1 text-xs text-stone-800 placeholder-stone-400 focus:outline-none"
                />
                <button
                  type="submit"
                  aria-label="Aramayı başlat"
                  className="p-1.5 text-stone-500 transition hover:text-stone-900"
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </form>
            )}
          </div>

          {/* Favoriler */}
          <Link
            href="/favorites"
            className="p-2 text-stone-700 transition hover:text-stone-900"
            title="Favorilerim"
            aria-label="Favorilerim"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </Link>

          {/* Profil / Giriş */}
          {isMounted && user ? (
            <Link
              href="/profile"
              className="p-2 text-stone-700 transition hover:text-stone-900"
              title="Profilim"
              aria-label="Profilim"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </Link>
          ) : (
            <Link
              href="/login"
              className="p-2 text-stone-700 transition hover:text-stone-900"
              title="Giriş Yap"
              aria-label="Giriş Yap"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </Link>
          )}

          {/* Sepet */}
          <Link
            href="/cart"
            className="relative p-2 text-stone-700 transition hover:text-stone-900"
            title="Sepetim"
            aria-label="Sepetim"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>

            {isMounted && totalItemsCount > 0 && (
              <span className="absolute right-0 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-stone-900 text-[10px] font-medium text-white">
                {totalItemsCount}
              </span>
            )}
          </Link>
        </div>

      </div>
    </header>
  );
}