'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';

export default function DistanceSalesAgreementPage() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-stone-900 selection:bg-stone-900 selection:text-white flex flex-col justify-between">
      <div>
        <Header />
        
        <main className="mx-auto max-w-5xl px-6 sm:px-12 py-20 lg:py-28">
          {/* Başlık Bölümü */}
          <div className="border-b border-stone-200 pb-8 mb-16 text-center sm:text-left">
            <h1 className="text-2xl sm:text-4xl font-serif tracking-tight text-stone-900 uppercase">
              Mesafeli Satış Sözleşmesi
            </h1>
            <p className="text-xs text-stone-400 tracking-widest uppercase mt-3 font-light">
              Son Güncelleme: Ekim 2026
            </p>
          </div>

          {/* İçerik Bölümü */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16">
            {/* Sol taraf: Menü / Özet İpucu */}
            <div className="md:col-span-4 space-y-4 text-xs tracking-widest uppercase text-stone-400 hidden md:block pt-2">
              <ul className="space-y-3 font-light">
                <li className="text-stone-900">Madde 1 - Taraflar</li>
                <li>Madde 2 - Konu</li>
                <li>Madde 3 - Teslimat</li>
              </ul>
            </div>

            {/* Sağ taraf: Ana Metinler */}
            <div className="md:col-span-8 space-y-12 text-sm sm:text-base text-stone-600 font-light leading-relaxed">
              <section className="space-y-4">
                <h2 className="text-xs sm:text-sm font-semibold text-stone-900 uppercase tracking-widest">
                  Madde 1 - Taraflar
                </h2>
                <p>
                  İşbu sözleşme, satan ile alıcı arasında elektronik ortamda gerçekleştirilen ürün satış ve teslimat şartlarını düzenler.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-xs sm:text-sm font-semibold text-stone-900 uppercase tracking-widest">
                  Madde 2 - Konu
                </h2>
                <p>
                  İşbu sözleşmenin konusu, alıcının satıcıya ait internet sitesinden elektronik ortamda siparişini yaptığı nitelikleri belirtilen ürünün satışı ve teslimatı ile ilgili tarafların hak ve yükümlülükleridir.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-xs sm:text-sm font-semibold text-stone-900 uppercase tracking-widest">
                  Madde 3 - Teslimat
                </h2>
                <p>
                  Ürün, alıcının sipariş formunda belirttiği teslimat adresine kargo yoluyla en geç 3-5 iş günü içinde teslim edilir.
                </p>
              </section>
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}