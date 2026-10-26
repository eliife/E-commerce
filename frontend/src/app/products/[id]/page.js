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
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Alt kısımdaki akordeon bölümleri için state
  const [openAccordion, setOpenAccordion] = useState('description');

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

  const toggleAccordion = (tabKey) => {
    setOpenAccordion(openAccordion === tabKey ? null : tabKey);
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

  // Ürün rengini ve tonunu isme/veriye göre akıllı ve dinamik eşleme
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

  // Kombin metnini tire işaretlerine göre bölüp alt alta paragraflar oluşturan yardımcı fonksiyon
  const renderFormattedCombination = (text) => {
    if (!text) return 'Zarif duruşunu öne çıkarmak için benzer tonlardaki aksesuarlarla tamamlayabilirsiniz.';
    
    const parts = text.split(/(?=\s*-\s*\*\*|\s*-\s*[A-ZÇĞİÖŞÜa-zçğıöşü]+\s*:)/);
    
    if (parts.length <= 1) {
      return <p>{text}</p>;
    }

    return (
      <div className="space-y-3">
        {parts.map((part, index) => {
          const cleaned = part.replace(/^[\s-]+/, '').trim();
          if (!cleaned) return null;
          return (
            <p key={index} className="leading-relaxed">
              {cleaned}
            </p>
          );
        })}
      </div>
    );
  };

  // Materyal metnini tire ve \n işaretlerine göre alt alta bölen yardımcı fonksiyon
  const renderFormattedMaterials = (text) => {
    const defaultText = 'Birinci sınıf hakiki deriden el işçiliği detaylarıyla özenle üretilmiştir. Derinin doğal yapısını ve esnekliğini koruması için aşağıdaki bakım önerilerine dikkat edilmesi tavsiye edilir: \n- **Saklama Koşulları:** Doğrudan güneş ışığından, aşırı sıcaktan ve nemli ortamlardan uzak tutunuz. Kullanılmadığı durumlarda formunu koruması için içini kağıt dolgu ile doldurarak kumaş toz torbasında saklayınız. \n- **Temizlik:** Deri yüzeyin temizliği için asla çamaşır suyu, alkol veya sert kimyasallar içeren ıslak mendiller kullanmayınız. Hafif nemli, yumuşak bir bezle nazikçe silebilirsiniz. \n- **Bakım:** Derinin kurumasını önlemek ve ilk günkü parlaklığını muhafaza etmek için belirli aralıklarla doğal deri bakım kremleri veya renk koruyucu bakım spreyleri uygulayabilirsiniz.';
    
    const content = text || defaultText;
    const parts = content.split(/(?=\s*-\s*\*\*|\s*-\\s*|\s*\\n\s*-\s*)/);

    if (parts.length <= 1) {
      return <p>{content}</p>;
    }

    return (
      <div className="space-y-3">
        {parts.map((part, index) => {
          const cleaned = part.replace(/^[\s-\\n]+/, '').trim();
          if (!cleaned) return null;
          return (
            <p key={index} className="leading-relaxed">
              {cleaned}
            </p>
          );
        })}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#FAFAF9] text-stone-900 selection:bg-stone-900 selection:text-white flex flex-col justify-between">
      <div>
        <Header />

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
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

                {/* SAĞ SÜTUN: Ürün Bilgileri, Kısa Açıklama, Renk ve Sepete Ekle */}
                <div className="lg:col-span-5 lg:sticky lg:top-28 flex flex-col space-y-6">
                  
                  {/* Başlık ve Fiyat */}
                  <div className="space-y-3 border-b border-stone-200/80 pb-6">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] uppercase tracking-[0.25em] text-stone-500 font-medium">
                        {product.brand || product.category || 'VELORA'}
                      </span>
                      <button
                        onClick={handleToggleWishlist}
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

                  {/* SAĞ ÜST KISIM: 1. Kısa Açıklama */}
                  <div className="text-xs text-stone-600 leading-relaxed font-light">
                    <p>{product.description || 'Lüks standartlara ve zarif detaylara sahip özel tasarım.'}</p>
                  </div>

                  {/* YAN YANA YERLEŞTİRİLMİŞ RENK GÖSTERGE ALANI */}
                  <div className="space-y-2 pt-2 border-t border-stone-200/60 pb-2">
                    <span className="text-[11px] uppercase tracking-[0.2em] text-stone-500 font-medium block">
                      R E N K
                    </span>
                    <div className="flex items-center gap-3 pt-1">
                      <div className="p-0.5 rounded-full border border-stone-900 cursor-pointer">
                        <div 
                          className="w-5 h-5 rounded-full shadow-inner" 
                          style={{ backgroundColor: colorInfo.code }}
                        ></div>
                      </div>
                      <span className="text-xs uppercase tracking-wider font-semibold text-stone-900">
                        {colorInfo.name}
                      </span>
                    </div>
                  </div>

                  {/* Sepete Ekle Butonu ve Avantajlar */}
                  <div className="space-y-3 pt-6">
                    <button
                      onClick={() => dispatch(addToCart(product))}
                      className="w-full rounded bg-stone-900 py-4 text-xs font-medium tracking-[0.2em] uppercase text-white hover:bg-stone-800 transition-all shadow-sm cursor-pointer active:scale-[0.99]"
                    >
                      Sepete Ekle
                    </button>

                    <div className="bg-stone-100/60 p-4 rounded text-[11px] text-stone-600 space-y-1.5 font-light">
                      <p className="flex items-center gap-2">✓ Ücretsiz kargo ve 14 gün içinde kolay iade</p>
                      <p className="flex items-center gap-2">✓ Güvenli ödeme ve orijinal ürün garantisi</p>
                    </div>
                  </div>

                </div>
              </div>

              {/* ORTA BÖLÜM: Geniş Açıklama ve Materyal Akordeon Alanı */}
              <div className="w-full max-w-3xl mx-auto border-t border-stone-200/80 pt-10 mb-16">
                <div className="divide-y divide-stone-200/80 border-y border-stone-200/80">
                  
                  {/* Açıklama (Ürün Açıklaması ve Alt Alta Düzenlenmiş Nasıl Kombinlenir) */}
                  <div>
                    <button
                      onClick={() => toggleAccordion('description')}
                      className="w-full py-5 flex items-center justify-between text-xs uppercase tracking-[0.2em] font-medium text-stone-900 cursor-pointer group"
                    >
                      <span className="group-hover:text-stone-600 transition">Ürün Açıklaması</span>
                      <span className="text-sm font-light text-stone-400">{openAccordion === 'description' ? '−' : '+'}</span>
                    </button>
                    {openAccordion === 'description' && (
                      <div className="pb-6 text-xs text-stone-600 leading-relaxed font-light space-y-5">
                        <p>{product.description2 || product.description || 'Bu ürün için henüz detaylı açıklama girilmemiştir. Lüks standartlara uygun olarak özenle tasarlanmıştır.'}</p>
                        
                        <div className="pt-4 border-t border-stone-200/60">
                          <h4 className="text-[11px] uppercase tracking-[0.15em] font-semibold text-stone-900 mb-3">Nasıl Kombinlenir</h4>
                          <div className="space-y-3">
                            {renderFormattedCombination(product.combination)}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Materyal & Bakım (Formatlanmış Alt Alta Yapı) */}
                  <div>
                    <button
                      onClick={() => toggleAccordion('materials')}
                      className="w-full py-5 flex items-center justify-between text-xs uppercase tracking-[0.2em] font-medium text-stone-900 cursor-pointer group"
                    >
                      <span className="group-hover:text-stone-600 transition">Materyal ve Bakım</span>
                      <span className="text-sm font-light text-stone-400">{openAccordion === 'materials' ? '−' : '+'}</span>
                    </button>
                    {openAccordion === 'materials' && (
                      <div className="pb-6 text-xs text-stone-600 leading-relaxed font-light space-y-3">
                        {renderFormattedMaterials(product.materials || product.material)}
                      </div>
                    )}
                  </div>

                </div>
              </div>

              {/* EN ALT BÖLÜM: Benzer Ürünler / Öneriler */}
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
                          <div className="aspect-[4/5] bg-stone-100 overflow-hidden flex items-center justify-center mb-3 rounded-sm">
                            {relImgUrl ? (
                              <img src={relImgUrl} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                            ) : (
                              <span className="text-[10px] text-stone-400 uppercase tracking-widest">Görsel Yok</span>
                            )}
                          </div>
                          <h3 className="text-xs uppercase tracking-wider font-medium text-stone-900 group-hover:text-stone-600 transition line-clamp-1">{item.name}</h3>
                          <p className="text-[10px] text-stone-400 uppercase tracking-widest font-light mt-0.5">VELORA</p>
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