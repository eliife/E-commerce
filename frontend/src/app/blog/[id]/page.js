'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/header';
import Footer from '@/components/footer';

export default function BlogDetailPage() {
  const [isMounted, setIsMounted] = useState(false);
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  // 6 farklı yazı içeriğini barındıran ID bazlı sözlük yapısı
  const blogPostsData = {
    '1': {
      title: 'Zamansız Deri Çanta Bakım Rehberi',
      category: 'Bakım & Rehber',
      date: 'Ekim 14, 2026',
      readTime: '4 dk okuma',
      author: 'Velora Studio',
      content: [
        { type: 'paragraph', text: 'Gerçek deri, yaşayan ve zamanla karakter kazanan eşsiz bir materyaldir. Doğru bakımla birlikte yıllara meydan okuyan deri çantanız, her kullanımda hikayenizin bir parçası haline gelir.' },
        { type: 'heading', text: '1. Nemden ve Aşırı Güneş Işığından Koruyun' },
        { type: 'paragraph', text: 'Deri ürünlerin en büyük düşmanlarından biri aşırı nem ve direkt güneş ışığıdır. Kullanmadığınız zamanlarda özel bez kılıfında muhafaza etmeniz önerilir.' },
      ],
    },
    '2': {
      title: 'Günlük Stilde Minimalizm ve İşlevsellik',
      category: 'Stil & Yaşam',
      date: 'Ekim 08, 2026',
      readTime: '3 dk okuma',
      author: 'Velora Studio',
      content: [
        { type: 'paragraph', text: 'Modern şehir yaşamının koşuşturmacası içerisinde stil sahibi olmak, bazen karmaşadan arınmayı gerektirir. Minimalizm, en doğru parçalarla maksimum şıklık yakalamaktır.' },
        { type: 'heading', text: 'Fonksiyonel Tasarımın Gücü' },
        { type: 'paragraph', text: 'Günlük kombinlerde tercih edilen el çantaları ve cüzdanlar, estetik olduğu kadar işlevsel de olmalıdır.' },
      ],
    },
    '3': {
      title: 'Velora 2026 Sonbahar / Kış Koleksiyonu',
      category: 'Koleksiyon',
      date: 'Eylül 25, 2026',
      readTime: '5 dk okuma',
      author: 'Velora Studio',
      content: [
        { type: 'paragraph', text: 'Toprak tonlarının derinliği ve zanaatkarlığın en saf haliyle buluştuğu 2026 Sonbahar / Kış koleksiyonumuz şimdi yayında.' },
        { type: 'heading', text: 'El İşçiliğinin Zarafeti' },
        { type: 'paragraph', text: 'Koleksiyondaki her bir parça, usta ellerde titizlikle işlenerek hazırlandı.' },
      ],
    },
    '4': {
      title: 'Derinin Kalitesi Nasıl Anlaşılır?',
      category: 'Rehber',
      date: 'Eylül 12, 2026',
      readTime: '4 dk okuma',
      author: 'Velora Studio',
      content: [
        { type: 'paragraph', text: 'Hakiki deriyi anlamanın en temel yolları dokusu, kokusu ve esnekliğidir. Kaliteli bir deri ürüne dokunduğunuzda doğal sıcaklığını hissedersiniz.' },
        { type: 'heading', text: 'Koku ve Doku Testi' },
        { type: 'paragraph', text: 'Suni deriler genellikle kimyasal ve plastik kokarken, hakiki deri kendine has ağır ve doğal bir kokuya sahiptir.' },
      ],
    },
    '5': {
      title: 'Şehir Hayatında Seyahat Çantası Seçimi',
      category: 'Yaşam Tarzı',
      date: 'Ağustos 30, 2026',
      readTime: '6 dk okuma',
      author: 'Velora Studio',
      content: [
        { type: 'paragraph', text: 'Hafta sonu kaçamakları veya kısa süreli iş seyahatleri, doğru seyahat çantasını seçmeyi kritik hale getirir.' },
        { type: 'heading', text: 'Kabin Boyu Uyum ve Dayanıklılık' },
        { type: 'paragraph', text: 'Seyahatlerinizde yanınızdan ayırmayacağınız deri çantaların fermuar kalitesi ve taşıma konforu ön planda olmalıdır.' },
      ],
    },
    '6': {
      title: 'Minimalist Cüzdan Trendleri ve Avantajları',
      category: 'Aksesuar',
      date: 'Ağustos 15, 2026',
      readTime: '3 dk okuma',
      author: 'Velora Studio',
      content: [
        { type: 'paragraph', text: 'Dijitalleşen dünyada cüzdan alışkanlıklarımız da değişiyor. Kart odaklı ince cüzdanlar artık günlük stilin vazgeçilmezi.' },
        { type: 'heading', text: 'Cep Konforu ve Güvenlik' },
        { type: 'paragraph', text: 'Kalın ve şişkin cüzdanların yarattığı rahatsızlığa son veren minimalist modeller, RFID korumasıyla güvenliği de artırıyor.' },
      ],
    },
  };

  const post = blogPostsData[id] || {
    title: 'Yazı Bulunamadı',
    category: 'Blog',
    date: '',
    readTime: '',
    author: '',
    content: [{ type: 'paragraph', text: 'Aradığınız blog yazısı bulunamadı veya kaldırılmış olabilir.' }],
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-stone-900 selection:bg-stone-900 selection:text-white flex flex-col justify-between">
      <div>
        <Header />
        
        <main className="mx-auto max-w-4xl px-6 sm:px-12 py-20 lg:py-28">
          {/* Geri Dönüş Linki */}
          <div className="mb-8">
            <Link 
              href="/blog" 
              className="text-xs uppercase tracking-widest text-stone-400 hover:text-stone-900 transition flex items-center gap-2"
            >
              ← Tüm Yazılara Dön
            </Link>
          </div>

          {/* Başlık ve Meta Bilgileri */}
          <div className="border-b border-stone-200 pb-8 mb-12 space-y-4">
            <div className="flex items-center justify-between text-[11px] uppercase tracking-widest text-stone-400">
              <span>{post.category}</span>
              <span>{post.readTime}</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-serif tracking-tight text-stone-900 leading-snug">
              {post.title}
            </h1>

            <div className="flex items-center justify-between pt-2 text-xs text-stone-500 font-light tracking-wide">
              <span>Yazar: <strong className="font-medium text-stone-900">{post.author}</strong></span>
              <span>{post.date}</span>
            </div>
          </div>

          {/* Makale İçeriği */}
          <div className="space-y-8 text-sm sm:text-base text-stone-700 font-light leading-relaxed">
            {post.content.map((block, index) => {
              if (block.type === 'heading') {
                return (
                  <h2 key={index} className="text-base sm:text-lg font-serif font-semibold text-stone-900 pt-6">
                    {block.text}
                  </h2>
                );
              }
              return (
                <p key={index}>
                  {block.text}
                </p>
              );
            })}
          </div>

          {/* Alt Kısım Geri Dön */}
          <div className="mt-16 pt-8 border-t border-stone-200 flex justify-between items-center">
            <Link 
              href="/blog"
              className="text-xs font-medium tracking-widest uppercase text-stone-900 hover:opacity-75 transition"
            >
              ← Blog listesine geri dön
            </Link>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}