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
  const totalItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);

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
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/products?keyword=${encodeURIComponent(searchTerm.trim())}`);
      setIsSearchOpen(false);
    } else {
      router.push('/products');
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-stone-100">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 relative">
        
        {/* Sol Kısım: Mobil/Masaüstü Sol Navigasyon */}
        <nav className="hidden lg:flex items-center space-x-8 text-xs uppercase tracking-widest font-medium text-stone-500">
          <Link href="/products" className="hover:text-stone-900 transition">Tüm Ürünler</Link>
          <Link href="/bestsellers" className="hover:text-stone-900 transition">Çok Satanlar</Link>
          <Link href="/new-arrivals" className="hover:text-stone-900 transition">Yeni Gelenler</Link>
        </nav>

        {/* Mobil Menü Butonu */}
        <div className="relative lg:hidden" ref={menuRef}>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 hover:text-stone-900 transition"
            title="Menü"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Açılır (Dropdown) Menü */}
          {isMenuOpen && (
            <div className="absolute left-0 mt-3 w-44 bg-white shadow-lg border border-stone-100 py-3 z-50 flex flex-col space-y-2 text-xs uppercase tracking-widest text-stone-600">
              <Link
                href="/products"
                onClick={() => setIsMenuOpen(false)}
                className="px-5 py-1.5 hover:text-stone-950 transition"
              >
                Tüm Ürünler
              </Link>
              <Link
                href="/bestsellers"
                onClick={() => setIsMenuOpen(false)}
                className="px-5 py-1.5 hover:text-stone-950 transition"
              >
                Çok Satanlar
              </Link>
              <Link
                href="/new-arrivals"
                onClick={() => setIsMenuOpen(false)}
                className="px-5 py-1.5 hover:text-stone-950 transition"
              >
                Yeni Gelenler
              </Link>
            </div>
          )}
        </div>

        {/* Orta Kısım: Tam Ortada Daha Büyük ve Dikkat Çekici Logo */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <Link
            href="/"
            className="text-2xl sm:text-3xl font-serif tracking-[0.3em] text-stone-900 font-semibold"
          >
            VELORA
          </Link>
        </div>

        {/* Görünmez boşluk (Flex layout ortalamasını korumak için) */}
        <div className="hidden lg:block w-32"></div>

        {/* Sağ Kısım: İkonlar */}
        <div className="flex items-center space-x-3 sm:space-x-5 text-stone-700 relative">
          
          {/* Arama İkonu ve Açılır Input Alanı */}
          <div className="relative" ref={searchRef}>
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 hover:text-stone-900 transition"
              title="Ara"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </button>

            {isSearchOpen && (
              <form
                onSubmit={handleSearchSubmit}
                className="absolute right-0 mt-2 w-64 bg-white shadow-lg border border-stone-100 p-2 flex items-center z-50 rounded-md"
              >
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Ürün ara..."
                  autoFocus
                  className="w-full bg-transparent text-xs text-stone-800 placeholder-stone-400 focus:outline-none px-2 py-1"
                />
                <button type="submit" className="text-stone-500 hover:text-stone-900 px-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                </button>
              </form>
            )}
          </div>

          {/* Favoriler Butonu */}
          <Link href="/favorites" className="p-2 hover:text-stone-900 transition" title="Favorilerim">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
            </svg>
          </Link>

          {/* Profil / Giriş Butonu */}
          {isMounted && user ? (
            <Link href="/profile" className="p-2 hover:text-stone-900 transition" title="Profilim">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
            </Link>
          ) : (
            <Link href="/login" className="p-2 hover:text-stone-900 transition" title="Giriş Yap">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
            </Link>
          )}

          {/* Sepet Butonu */}
          <Link href="/cart" className="relative p-2 hover:text-stone-900 transition" title="Sepetim">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
            </svg>
            {isMounted && totalItemsCount > 0 && (
              <span className="absolute top-1 right-0 bg-stone-900 text-white text-[10px] font-medium w-4 h-4 rounded-full flex items-center justify-center">
                {totalItemsCount}
              </span>
            )}
          </Link>

        </div>
      </div>
    </header>
  );
}