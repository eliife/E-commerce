'use client';

import Link from 'next/link';

export default function RelatedProducts({
  products = [],
  backendURL,
  wishlistIds = [],
  handleToggleWishlist,
}) {
  if (products.length === 0) {
    return null;
  }

  return (
    <section className="w-full border-t border-stone-200 pt-16">
      <h2 className="text-center text-sm uppercase tracking-[0.2em] font-serif text-stone-900 font-bold mb-10">
        Bunları Da Beğenebilirsiniz
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((item) => {
          const relId = item._id || item.id;

          const relImg = item.images?.[0] || item.image;

          const relImgUrl = relImg
            ? relImg.startsWith('http')
              ? relImg
              : `${backendURL}${relImg}`
            : null;

          const isRelFavorited = wishlistIds.includes(String(relId));

          return (
            <div
              key={relId}
              className="group relative flex flex-col"
            >
              <div className="aspect-[4/5] bg-stone-100 overflow-hidden flex items-center justify-center mb-3 rounded-sm relative">
                <Link
                  href={`/products/${relId}`}
                  aria-label={`${item.name} ürün detayını görüntüle`}
                  className="w-full h-full flex items-center justify-center"
                >
                  {relImgUrl ? (
                    <img
                      src={relImgUrl}
                      alt={item.name || 'Velora ürünü'}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                  ) : (
                    <span className="text-[10px] text-stone-400 uppercase tracking-widest">
                      Görsel Yok
                    </span>
                  )}
                </Link>

                <button
                  type="button"
                  onClick={() => handleToggleWishlist(relId)}
                  aria-label={
                    isRelFavorited
                      ? `${item.name} ürününü favorilerden çıkar`
                      : `${item.name} ürününü favorilere ekle`
                  }
                  aria-pressed={isRelFavorited}
                  title={
                    isRelFavorited
                      ? 'Favorilerden Çıkar'
                      : 'Favorilere Ekle'
                  }
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center shadow-sm transition-all duration-200 hover:scale-110 hover:bg-white z-10 cursor-pointer"
                >
                  <svg
                    className={`w-4 h-4 transition-colors duration-200 ${
                      isRelFavorited
                        ? 'text-stone-900 fill-stone-900'
                        : 'text-stone-400 hover:text-stone-900'
                    }`}
                    fill={isRelFavorited ? 'currentColor' : 'none'}
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

              <Link
                href={`/products/${relId}`}
                className="group-hover:opacity-80 transition"
              >
                <h3 className="text-xs uppercase tracking-wider font-medium text-stone-900 line-clamp-1">
                  {item.name}
                </h3>

                <p className="text-[10px] text-stone-400 uppercase tracking-widest font-light mt-0.5">
                  VELORA
                </p>

                <p className="text-xs font-semibold tracking-wider text-stone-900 mt-1">
                  {item.price} ₺
                </p>
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
}