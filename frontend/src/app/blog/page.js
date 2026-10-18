'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/header';
import Footer from '@/components/footer';

export default function BlogListPage() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const blogPosts = [
    {
      id: 1,
      title: 'Zamansız Deri Çanta Bakım Rehberi',
      excerpt: 'Gerçek derinin doğasını korumak ve çantanızın ilk günkü zarafetini yıllarca sürdürmesini sağlamak için bilmeniz gerekenler.',
      category: 'Bakım & Rehber',
      date: 'Ekim 14, 2026',
      readTime: '4 dk okuma',
    },
    {
      id: 2,
      title: 'Günlük Stilde Minimalizm ve İşlevsellik',
      excerpt: 'Şıklığı ve pratikliği bir araya getiren minimalist aksesuar seçimleriyle gardırobunuzda sadeliğin gücünü keşfedin.',
      category: 'Stil & Yaşam',
      date: 'Ekim 08, 2026',
      readTime: '3 dk okuma',
    },
    {
      id: 3,
      title: 'Velora 2026 Sonbahar / Kış Koleksiyonu',
      excerpt: 'Toprak tonlarının hakim olduğu, el işçiliği detaylarıyla öne çıkan yeni sezon deri çanta ve cüzdan tasarımlarımız yayında.',
      category: 'Koleksiyon',
      date: 'Eylül 25, 2026',
      readTime: '5 dk okuma',
    },
    {
      id: 4,
      title: 'Derinin Kalitesi Nasıl Anlaşılır?',
      excerpt: 'Hakiki deriyi suni deriden ayırmanın püf noktaları ve uzun ömürlü bir deri ürün seçerken dikkat edilmesi gerekenler.',
      category: 'Rehber',
      date: 'Eylül 12, 2026',
      readTime: '4 dk okuma',
    },
    {
      id: 5,
      title: 'Şehir Hayatında Seyahat Çantası Seçimi',
      excerpt: 'Hafta sonu kaçamaklarından iş seyahatlerine kadar yanınızdan ayırmak istemeyeceğiniz fonksiyonel çanta modelleri.',
      category: 'Yaşam Tarzı',
      date: 'Ağustos 30, 2026',
      readTime: '6 dk okuma',
    },
    {
      id: 6,
      title: 'Minimalist Cüzdan Trendleri ve Avantajları',
      excerpt: 'Ceplerdeki kabarıklığa son veren, kart odaklı ince ve zarif cüzdan tasarımlarının yükselişi.',
      category: 'Aksesuar',
      date: 'Ağustos 15, 2026',
      readTime: '3 dk okuma',
    },
  ];

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-stone-900 selection:bg-stone-900 selection:text-white flex flex-col justify-between">
      <div>
        <Header />
        
        <main className="mx-auto max-w-6xl px-6 sm:px-12 py-24 lg:py-32">
          {/* Ferah Başlık */}
          <div className="mb-24 text-center max-w-xl mx-auto space-y-4">
            <h1 className="text-3xl sm:text-5xl font-serif tracking-tight text-stone-900 uppercase">
              Journal
            </h1>
            <p className="text-xs text-stone-400 tracking-[0.25em] uppercase font-light">
              Hikâyeler, ilhamlar ve deri üzerine notlar.
            </p>
          </div>

          {/* Yumuşak ve Ferah Kart Yapısı */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
            {blogPosts.map((post) => (
              <article 
                key={post.id} 
                className="group flex flex-col justify-between bg-[#F7F4EE]/50 border border-stone-200/40 p-8 sm:p-10 rounded-sm hover:bg-white hover:shadow-xl hover:shadow-stone-200/30 transition-all duration-500"
              >
                <div className="space-y-4">
                  {/* Kategori ve Okuma Süresi */}
                  <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-stone-400 font-light">
                    <span>{post.category}</span>
                    <span>{post.readTime}</span>
                  </div>

                  {/* Yazı Başlığı */}
                  <Link href={`/blog/${post.id}`}>
                    <h2 className="text-lg sm:text-xl font-serif font-normal text-stone-900 group-hover:text-stone-600 transition leading-snug cursor-pointer">
                      {post.title}
                    </h2>
                  </Link>

                  {/* Özet Metin */}
                  <p className="text-xs sm:text-sm text-stone-600 font-light leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>

                {/* Alt Kısım */}
                <div className="pt-8 mt-6 flex items-center justify-between border-t border-stone-200/30">
                  <span className="text-[11px] text-stone-400 font-light tracking-wider">
                    {post.date}
                  </span>
                  
                  <Link 
                    href={`/blog/${post.id}`}
                    className="text-[11px] font-medium tracking-[0.2em] uppercase text-stone-900 hover:opacity-60 transition cursor-pointer"
                  >
                    Oku →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}