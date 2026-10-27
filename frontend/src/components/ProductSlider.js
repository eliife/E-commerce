'use client';

import Link from 'next/link';
import useWishlist from '@/components/useWishlist';

export default function ProductSlider({ initialWallets = [], initialProducts = [], backendURL, centered = false }) {
  const { wishlistIds = [], handleToggleWishlist } = useWishlist();

  const products = (initialWallets && initialWallets.length > 0) 
    ? initialWallets 
    : (initialProducts && initialProducts.length > 0 ? initialProducts : []);

  return (
    <section className="mx-auto max-w-[1536px] px-4 sm:px-8 py-6">
      {/* Eğer centered={true} verildiyse flex-wrap ve justify-center ile ortalar, verilmediyse normal grid kalır */}
      <div className={`flex gap-4 overflow-x-auto pb-4 scrollbar-none snap-x snap-mandatory sm:pb-0 ${
        centered 
          ? 'sm:flex sm:flex-wrap sm:justify-center sm:gap-6 sm:overflow-visible' 
          : 'sm:grid sm:grid-cols-3 lg:grid-cols-4 sm:gap-x-6 sm:gap-y-12 sm:overflow-visible'
      }`}>
        {Array.isArray(products) && products.map((product) => {
          if (!product) return null;

          const productId = product.id || product._id;
          const safeWishlistIds = Array.isArray(wishlistIds) ? wishlistIds : [];
          const isFavorited = safeWishlistIds.includes(String(productId));
          
          const rawImg = product.image || product.images?.[0];
          const imageUrl = rawImg
            ? rawImg.startsWith('http')
              ? rawImg
              : `${backendURL}${rawImg}`
            : null;

          return (
            <div
              key={productId}
              className="group relative flex flex-col min-w-[170px] max-w-[190px] sm:min-w-0 sm:max-w-none sm:w-[280px] lg:w-[320px] snap-start flex-shrink-0 bg-transparent"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#F4F1EA] flex items-center justify-center">
                <Link
                  href={`/products/${productId}`}
                  className="flex h-full w-full items-center justify-center"
                >
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt={product.name || 'Ürün Görseli'}
                      loading="lazy"
                      className="h-full w-full object-cover group-hover:scale-105 transition duration-500"
                    />
                  ) : (
                    <span className="text-xs text-stone-400 uppercase tracking-widest">
                      Görsel Yok
                    </span>
                  )}
                </Link>

                <button
                  type="button"
                  onClick={() => handleToggleWishlist(productId)}
                  aria-label={isFavorited ? 'Favorilerden çıkar' : 'Favorilere ekle'}
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
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                    />
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
    </section>
  );
}