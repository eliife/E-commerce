'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import API from '@/services/api';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '@/store/cartSlice';
import Header from '@/components/header';
import Footer from '@/components/footer';

export default function ProductDetailPage() {
  const params = useParams();
  const id = params.id;

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState('description');
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    setIsMounted(true);

    const fetchProductDetail = async () => {
      try {
        setLoading(true);
        const response = await API.get(`/products/${id}`);
        const prodData = response.data.product || response.data;
        setProduct(prodData);

        try {
          const allProductsRes = await API.get('/products');
          const list = allProductsRes.data.products || allProductsRes.data || [];
          setRelatedProducts(list.filter(p => (p._id || p.id) !== id).slice(0, 4));
        } catch (e) {
          console.warn('Benzer ürünler alınamadı');
        }

        if (user) {
          try {
            const wishResponse = await API.get('/wishlist');
            const items = wishResponse.data.wishlist?.products || wishResponse.data.products || [];
            const exists = items.some((item) => (item._id || item.id) === (prodData._id || prodData.id));
            setIsFavorite(exists);
          } catch (err) {
            console.error('Favori durumu alınamadı:', err);
          }
        }
      } catch (err) {
        setError('Ürün detayları yüklenirken bir sorun oluştu.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProductDetail();
    }
  }, [id, user]);

  const handleToggleWishlist = async () => {
    if (!user) {
      alert('Favorilere eklemek için lütfen giriş yapın.');
      return;
    }
    try {
      const productId = product._id || product.id;
      const response = await API.post('/wishlist/toggle', { productId });
      const items = response.data.wishlist?.products || [];
      const exists = items.some((item) => (item._id || item.id) === productId);
      setIsFavorite(exists);
    } catch (err) {
      alert('Favori işlemi gerçekleştirilemedi.');
    }
  };

  if (!isMounted) {
    return null;
  }

  const backendURL = 'http://localhost:5000';
  const imagesList = product?.images?.length > 0 ? product.images : (product?.image ? [product.image] : []);
  const rawImg = imagesList[selectedImageIndex] || imagesList[0];
  const imageUrl = rawImg 
    ? (rawImg.startsWith('http') ? rawImg : `${backendURL}${rawImg}`)
    : null;

  return (
    <div className="min-h-screen bg-stone-50/50 text-stone-800 selection:bg-stone-900 selection:text-white flex flex-col justify-between">
      <div>
        <Header />

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          {loading && (
            <div className="flex justify-center items-center py-32">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-stone-900"></div>
            </div>
          )}

          {error && (
            <div className="rounded-sm bg-red-50 border border-red-100 p-6 text-center text-xs text-red-600 font-medium max-w-md mx-auto">
              {error}
            </div>
          )}

          {!loading && !error && product && (
            <div>
              {/* ÜST BÖLÜM: 2 Sütunlu Yerleşim */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start mb-20">
                
                {/* SOL SÜTUN: Görsel ve Thumbnail Alanı */}
                <div className="lg:col-span-7 flex flex-col gap-4">
                  <div className="w-full aspect-[4/5] bg-stone-100/70 overflow-hidden flex items-center justify-center relative rounded-sm">
                    {imageUrl ? (
                      <img 
                        src={imageUrl} 
                        alt={product.name} 
                        className="w-full h-full object-cover object-center transition duration-500"
                      />
                    ) : (
                      <span className="text-xs uppercase tracking-widest text-stone-400">Görsel Yok</span>
                    )}
                  </div>

                  {imagesList.length > 1 && (
                    <div className="flex items-center gap-3 overflow-x-auto pb-2">
                      {imagesList.map((img, idx) => {
                        const thumbUrl = img.startsWith('http') ? img : `${backendURL}${img}`;
                        return (
                          <button
                            key={idx}
                            onClick={() => setSelectedImageIndex(idx)}
                            className={`w-16 h-20 bg-stone-100/70 overflow-hidden border transition shrink-0 rounded-sm ${selectedImageIndex === idx ? 'border-stone-900' : 'border-stone-200 opacity-70 hover:opacity-100'}`}
                          >
                            <img src={thumbUrl} alt="" className="w-full h-full object-cover" />
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* SAĞ SÜTUN: Ürün Bilgileri ve Aksiyonlar */}
                <div className="lg:col-span-5 lg:sticky lg:top-28 flex flex-col space-y-6 pt-2">
                  
                  <div className="space-y-2 border-b border-stone-200 pb-6">
                    <p className="text-xs uppercase tracking-widest text-stone-500 font-light">
                      {product.brand || product.category || 'VELORA'}
                    </p>
                    <h1 className="text-base font-serif tracking-[0.2em] text-stone-900 uppercase font-bold">
                      {product.name}
                    </h1>
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-xs font-semibold tracking-wider text-stone-900">
                        {product.price} ₺
                      </span>

                      <button
                        onClick={handleToggleWishlist}
                        className="text-stone-400 hover:text-stone-900 transition p-2 cursor-pointer flex items-center gap-1.5 text-xs uppercase tracking-widest"
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
                  </div>

                  <div className="text-xs text-stone-600 leading-relaxed font-light">
                    <p>{product.description ? product.description.substring(0, 160) + '...' : 'Lüks standartlara ve zarif detaylara sahip özel tasarım.'}</p>
                  </div>

                  <div className="pt-4">
                    <button
                      onClick={() => dispatch(addToCart(product))}
                      className="w-full rounded-sm bg-stone-900 py-3 text-xs font-medium tracking-widest uppercase text-white hover:bg-stone-800 transition shadow-sm cursor-pointer"
                    >
                      Sepete Ekle
                    </button>
                  </div>

                  <div className="border-t border-stone-200 pt-6 space-y-2 text-[11px] text-stone-500 tracking-wider font-light">
                    <p>✓ Ücretsiz kargo ve 14 gün içinde kolay iade</p>
                    <p>✓ Güvenli ödeme ve orijinal ürün garantisi</p>
                  </div>

                </div>
              </div>

              {/* ORTA BÖLÜM: Detay Sekmeleri */}
              <div className="w-full border-t border-stone-200 pt-12 mb-20">
                <div className="flex justify-center gap-8 sm:gap-16 text-xs uppercase tracking-widest font-medium border-b border-stone-200 pb-4 overflow-x-auto">
                  <button 
                    onClick={() => setActiveTab('description')} 
                    className={`pb-1 transition cursor-pointer whitespace-nowrap ${activeTab === 'description' ? 'border-b-2 border-stone-900 text-stone-900 font-semibold' : 'text-stone-400 hover:text-stone-700'}`}
                  >
                    Açıklama
                  </button>
                  <button 
                    onClick={() => setActiveTab('size')} 
                    className={`pb-1 transition cursor-pointer whitespace-nowrap ${activeTab === 'size' ? 'border-b-2 border-stone-900 text-stone-900 font-semibold' : 'text-stone-400 hover:text-stone-700'}`}
                  >
                    Beden ve Kalıp
                  </button>
                  <button 
                    onClick={() => setActiveTab('materials')} 
                    className={`pb-1 transition cursor-pointer whitespace-nowrap ${activeTab === 'materials' ? 'border-b-2 border-stone-900 text-stone-900 font-semibold' : 'text-stone-400 hover:text-stone-700'}`}
                  >
                    Materiyal
                  </button>
                  <button 
                    onClick={() => setActiveTab('shipping')} 
                    className={`pb-1 transition cursor-pointer whitespace-nowrap ${activeTab === 'shipping' ? 'border-b-2 border-stone-900 text-stone-900 font-semibold' : 'text-stone-400 hover:text-stone-700'}`}
                  >
                    Kargo ve İade
                  </button>
                </div>

                <div className="mt-8 text-center max-w-2xl mx-auto text-xs text-stone-600 leading-relaxed px-4 font-light">
                  {activeTab === 'description' && (
                    <p>{product.description || 'Bu ürün için henüz detaylı açıklama girilmemiştir. Lüks standartlara uygun olarak tasarlanmıştır.'}</p>
                  )}
                  {activeTab === 'size' && (
                    <p>Ölçüler ve kullanım alanları bu modelin zarif yapısına tam uyum sağlayacak şekilde optimize edilmiştir. Detaylı ölçü rehberi için müşteri hizmetlerimizle iletişime geçebilirsiniz.</p>
                  )}
                  {activeTab === 'materials' && (
                    <p>Birinci sınıf malzemeler kullanılarak el işçiliği detaylarıyla özenle üretilmiştir. Uzun ömürlü kullanım için doğrudan güneş ışığından ve nemden koruyunuz.</p>
                  )}
                  {activeTab === 'shipping' && (
                    <p>Tüm siparişlerinizde güvenli kargo imkanı sunulmaktadır. Ürünü teslim aldıktan sonra 14 gün içerisinde iade veya değişim yapabilirsiniz.</p>
                  )}
                </div>
              </div>

              {/* EN ALT BÖLÜM: Ürün Önerileri */}
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

                      return (
                        <Link key={relId} href={`/products/${relId}`} className="group flex flex-col">
                          <div className="aspect-[4/5] bg-stone-100/70 overflow-hidden flex items-center justify-center mb-3 rounded-sm">
                            {relImgUrl ? (
                              <img src={relImgUrl} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                            ) : (
                              <span className="text-[10px] text-stone-400 uppercase tracking-widest">Görsel Yok</span>
                            )}
                          </div>
                          <h3 className="text-xs uppercase tracking-wider font-medium text-stone-900 group-hover:text-stone-600 transition line-clamp-1">{item.name}</h3>
                          <p className="text-[11px] text-stone-400 uppercase tracking-widest font-light mt-0.5">VELORA</p>
                          <p className="text-xs font-semibold tracking-wider text-stone-900 mt-1">{item.price} ₺</p>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}

            </div>
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
}