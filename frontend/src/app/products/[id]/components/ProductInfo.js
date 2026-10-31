'use client';

import { useDispatch } from 'react-redux';
import { addToCart } from '@/store/cartSlice';

export default function ProductInfo({
  product,
  colorInfo,
  isFavorite,
  handleToggleWishlist,
}) {
  const dispatch = useDispatch();

  const productId = product?._id || product?.id;

  return (
    <section className="lg:col-span-5 lg:sticky lg:top-28 flex flex-col space-y-6">
      <div className="space-y-3 border-b border-stone-200/80 pb-6">
        <div className="flex items-center justify-between">
          <span className="text-[11px] uppercase tracking-[0.25em] text-stone-500 font-medium">
            {product.brand || product.category || 'VELORA'}
          </span>

          <button
            type="button"
            onClick={() => handleToggleWishlist(productId)}
            className="text-stone-400 hover:text-stone-900 transition p-1.5 cursor-pointer flex items-center gap-1.5 text-xs uppercase tracking-widest"
            title={isFavorite ? 'Favorilerden Çıkar' : 'Favorilere Ekle'}
            aria-label={
              isFavorite ? 'Favorilerden çıkar' : 'Favorilere ekle'
            }
            aria-pressed={isFavorite}
          >
            <svg
              className={`w-5 h-5 transition ${
                isFavorite
                  ? 'fill-stone-900 text-stone-900'
                  : 'fill-none stroke-current stroke-1.5'
              }`}
              viewBox="0 0 24 24"
              fill={isFavorite ? 'currentColor' : 'none'}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              />
            </svg>
          </button>
        </div>

        <h1 className="text-lg font-serif tracking-[0.15em] text-stone-900 uppercase font-semibold">
          {product.name}
        </h1>

        <div className="pt-1">
          <span className="text-sm font-semibold tracking-wider text-stone-900">
            {product.price} ₺
          </span>
        </div>
      </div>

      <div className="text-xs text-stone-600 leading-relaxed font-light">
        <p>
          {product.description ||
            'Lüks standartlara ve zarif detaylara sahip özel tasarım.'}
        </p>
      </div>

      <div className="space-y-2 pt-2 border-t border-stone-200/60 pb-2">
        <span className="text-[11px] uppercase tracking-[0.2em] text-stone-500 font-medium block">
          R E N K
        </span>

        <div className="flex items-center gap-3 pt-1">
          <div className="p-0.5 rounded-full border border-stone-900">
            <div
              className="w-5 h-5 rounded-full shadow-inner"
              style={{ backgroundColor: colorInfo.code }}
            />
          </div>

          <span className="text-xs uppercase tracking-wider font-semibold text-stone-900">
            {colorInfo.name}
          </span>
        </div>
      </div>

      <div className="space-y-3 pt-6">
        <button
          type="button"
          onClick={() => dispatch(addToCart(product))}
          className="w-full rounded bg-stone-900 py-4 text-xs font-medium tracking-[0.2em] uppercase text-white hover:bg-stone-800 transition-all shadow-sm cursor-pointer active:scale-[0.99]"
        >
          Sepete Ekle
        </button>
      </div>
    </section>
  );
}