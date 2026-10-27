'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/store/cartSlice';
import Header from '@/components/header';
import Footer from '@/components/footer';
import useWishlist from '@/components/useWishlist';

export default function ProductDetailClient({ initialProduct, initialRelatedProducts, backendURL }) {
  const [product] = useState(initialProduct);
  const [relatedProducts] = useState(initialRelatedProducts);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [openAccordion, setOpenAccordion] = useState('description');

  const dispatch = useDispatch();
  const { wishlistIds, handleToggleWishlist } = useWishlist();

  const toggleAccordion = (tabKey) => {
    setOpenAccordion(openAccordion === tabKey ? null : tabKey);
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-[#FAFAF9] flex flex-col justify-between">
        <Header />
        <div className="text-center py-32 text-xs text-stone-600">Ürün bulunamadı veya yüklenemedi.</div>
        <Footer />
      </div>
    );
  }

  const imagesList = product?.images?.length > 0 ? product.images : (product?.image ? [product.image] : []);
  const rawImg = imagesList[selectedImageIndex] || imagesList[0];
  const imageUrl = rawImg ? (rawImg.startsWith('http') ? rawImg : `${backendURL}${rawImg}`) : null;

  const productId = product._id || product.id;
  const isFavorite = wishlistIds.includes(String(productId));

  // Renk eşleme fonksiyonu
  const getProductColorInfo = (prod) => {
    const name = prod?.name?.toLowerCase() || '';
    const colorField = prod?.color?.toLowerCase() || '';

    if (colorField.includes('yeşil') || name.includes('yeşil') || name.includes('zeytin')) {
      return { name: 'ZEYTİN YEŞİLİ', code: '#8A9A86' };
    }
    if (colorField.includes('bordo') || name.includes('bordo')) {
      return { name: 'BORDO', code: '#6B2D3C' };
    }
    if (colorField.includes('siyah') || name.includes('siyah')) {
      return { name: 'SİYAH', code: '#1C1C1C' };
    }
    if (colorField.includes('bej') || name.includes('bej')) {
      return { name: 'BEJ', code: '#D5C3A5' };
    }
    return { name: prod?.color || 'KAHVE', code: prod?.colorCode || '#4B3621' };
  };

  const colorInfo = getProductColorInfo(product);

  const renderFormattedCombination = (text) => {
    if (!text) return <p>Zarif duruşunu öne çıkarmak için benzer tonlardaki aksesuarlarla tamamlayabilirsiniz.</p>;
    const parts = text.split(/(?=\s*-\s*\*\*|\s*-\s*[A-ZÇĞİÖŞÜa-zçğıöşü]+\s*:)/);
    if (parts.length <= 1) return <p>{text}</p>;
    return (
      <div className="space-y-3">
        {parts.map((part, index) => {
          const cleaned = part.replace(/^[\s-]+/, '').trim();
          if (!cleaned) return null;
          return <p key={index} className="leading-relaxed">{cleaned}</p>;
        })}
      </div>
    );
  };

  const renderFormattedMaterials = (text) => {
    const defaultText = 'Birinci sınıf hakiki deriden el işçiliği detaylarıyla özenle üretilmiştir.';
    const content = text || defaultText;
    return <p className="leading-relaxed">{content}</p>;
  };

  return (
    <div className="min-h-screen bg-[#FAFAF9] text-stone-900 selection:bg-stone-900 selection:text-white flex flex-col justify-between">
      <div>
        <Header />

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
          <div>
            {/* ÜST BÖLÜM: Görsel ve Sağ Sütun */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-16">
              
              {/* SOL SÜTUN: Görsel Galerisi */}
              <div className="lg:col-span-7 flex flex-col gap-4">
                <div className="w-full aspect-[4/5] bg-stone-100 overflow-hidden flex items-center justify-center relative rounded-md shadow-sm">
                  {imageUrl ? (
                    <img 
                      src={imageUrl} 
                      alt={product.name} 
                      className="w-full h-full object-cover object-center transition duration-700 hover:scale-105"
                    />
                  ) : (
                    <span className="text-xs uppercase tracking-widest text-stone-400">Görsel Yok</span>
                  )}
                </div>

                {imagesList.length > 1 && (
                  <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
                    {imagesList.map((img, idx) => {
                      const thumbUrl = img.startsWith('http') ? img : `${backendURL}${img}`;
                      return (
                        <button
                          key={idx}
                          onClick={() => setSelectedImageIndex(idx)}
                          className={`w-20 h-24 bg-stone-100 overflow-hidden border transition-all shrink-0 rounded ${selectedImageIndex === idx ? 'border-stone-900 ring-1 ring-stone-900' : 'border-stone-200 opacity-60 hover:opacity-100'}`}
                        >
                          <img src={thumbUrl} alt="" className="w-full h-full object-cover" />
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* SAĞ SÜTUN */}
              <div className="lg:col-span-5 lg:sticky lg:top-28 flex flex-col space-y-6">
                
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
                    >
                      <svg
                        className={`w-5 h-5 transition ${isFavorite ? 'fill-stone-900 text-stone-900' : 'fill-none stroke-current stroke-1.5'}`}
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
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
                  <p>{product.description || 'Lüks standartlara ve zarif detaylara sahip özel tasarım.'}</p>
                </div>

                <div className="space-y-2 pt-2 border-t border-stone-200/60 pb-2">
                  <span className="text-[11px] uppercase tracking-[0.2em] text-stone-500 font-medium block">
                    R E N K
                  </span>
                  <div className="flex items-center gap-3 pt-1">
                    <div className="p-0.5 rounded-full border border-stone-900 cursor-pointer">
                      <div className="w-5 h-5 rounded-full shadow-inner" style={{ backgroundColor: colorInfo.code }}></div>
                    </div>
                    <span className="text-xs uppercase tracking-wider font-semibold text-stone-900">
                      {colorInfo.name}
                    </span>
                  </div>
                </div>

                <div className="space-y-3 pt-6">
                  <button
                    onClick={() => dispatch(addToCart(product))}
                    className="w-full rounded bg-stone-900 py-4 text-xs font-medium tracking-[0.2em] uppercase text-white hover:bg-stone-800 transition-all shadow-sm cursor-pointer active:scale-[0.99]"
                  >
                    Sepete Ekle
                  </button>
                </div>

              </div>
            </div>

            {/* AKORDEON ALANI */}
            <div className="w-full max-w-3xl mx-auto border-t border-stone-200/80 pt-10 mb-16">
              <div className="divide-y divide-stone-200/80 border-y border-stone-200/80">
                <div>
                  <button
                    onClick={() => toggleAccordion('description')}
                    className="w-full py-5 flex items-center justify-between text-xs uppercase tracking-[0.2em] font-medium text-stone-900 cursor-pointer"
                  >
                    <span>Ürün Açıklaması</span>
                    <span>{openAccordion === 'description' ? '−' : '+'}</span>
                  </button>
                  {openAccordion === 'description' && (
                    <div className="pb-6 text-xs text-stone-600 leading-relaxed font-light space-y-5">
                      <p>{product.description2 || product.description}</p>
                      <div className="pt-4 border-t border-stone-200/60">
                        <h4 className="text-[11px] uppercase tracking-[0.15em] font-semibold text-stone-900 mb-3">Nasıl Kombinlenir</h4>
                        {renderFormattedCombination(product.combination)}
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <button
                    onClick={() => toggleAccordion('materials')}
                    className="w-full py-5 flex items-center justify-between text-xs uppercase tracking-[0.2em] font-medium text-stone-900 cursor-pointer"
                  >
                    <span>Materyal ve Bakım</span>
                    <span>{openAccordion === 'materials' ? '−' : '+'}</span>
                  </button>
                  {openAccordion === 'materials' && (
                    <div className="pb-6 text-xs text-stone-600 leading-relaxed font-light space-y-3">
                      {renderFormattedMaterials(product.materials || product.material)}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* BENZER ÜRÜNLER */}
            {relatedProducts.length > 0 && (
              <div className="w-full border-t border-stone-200 pt-16">
                <h2 className="text-center text-sm uppercase tracking-[0.2em] font-serif text-stone-900 font-bold mb-10">
                  Bunları Da Beğenebilirsiniz
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {relatedProducts.map((item) => {
                    const relId = item._id || item.id;
                    const relImg = item.images?.[0] || item.image;
                    const relImgUrl = relImg ? (relImg.startsWith('http') ? relImg : `${backendURL}${relImg}`) : null;
                    const isRelFavorited = wishlistIds.includes(String(relId));

                    return (
                      <div key={relId} className="group relative flex flex-col">
                        <div className="aspect-[4/5] bg-stone-100 overflow-hidden flex items-center justify-center mb-3 rounded-sm relative">
                          <Link href={`/products/${relId}`} className="w-full h-full flex items-center justify-center">
                            {relImgUrl ? (
                              <img src={relImgUrl} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                            ) : (
                              <span className="text-[10px] text-stone-400 uppercase tracking-widest">Görsel Yok</span>
                            )}
                          </Link>

                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              handleToggleWishlist(relId);
                            }}
                            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center shadow-sm transition-all duration-200 hover:scale-110 hover:bg-white z-10 cursor-pointer"
                          >
                            <svg
                              className={`w-4 h-4 transition-colors duration-200 ${isRelFavorited ? 'text-stone-900 fill-stone-900' : 'text-stone-400 hover:text-stone-900'}`}
                              fill={isRelFavorited ? 'currentColor' : 'none'}
                              stroke="currentColor"
                              strokeWidth="1.8"
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"></path>
                            </svg>
                          </button>
                        </div>

                        <Link href={`/products/${relId}`} className="group-hover:opacity-80 transition">
                          <h3 className="text-xs uppercase tracking-wider font-medium text-stone-900 line-clamp-1">{item.name}</h3>
                          <p className="text-[10px] text-stone-400 uppercase tracking-widest font-light mt-0.5">VELORA</p>
                          <p className="text-xs font-semibold tracking-wider text-stone-900 mt-1">{item.price} ₺</p>
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}