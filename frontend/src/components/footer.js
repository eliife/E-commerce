'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-stone-50 text-stone-600 pt-20 pb-14 border-t border-stone-200">
      <div className="mx-auto max-w-7xl px-6 grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-16">
        
        {/* Sol Sütun: Logo, Açıklama ve E-bülten */}
        <div className="space-y-6 md:col-span-1">
          <Link
            href="/"
            className="text-2xl sm:text-3xl font-serif tracking-[0.3em] text-stone-900 font-semibold block"
          >
            VELORA
          </Link>
          <p className="text-xs text-stone-500 leading-relaxed font-light">
            Velora deri çanta, cüzdan ve aksesuar koleksiyonunu keşfedin. Zamansız tasarımı ve zarif detaylarıyla günlük stile güçlü bir dokunuş.
          </p>
          <p className="text-xs text-stone-400 tracking-wider">
            hello@velora.com
          </p>

          <div className="space-y-3 pt-2">
            <h4 className="text-xs font-medium tracking-widest uppercase text-stone-900">İletişimde kal.</h4>
            <form onSubmit={(e) => e.preventDefault()} className="flex items-center border border-stone-300 bg-white rounded-sm overflow-hidden focus-within:border-stone-500 transition">
              <input
                type="email"
                placeholder="E-posta adresiniz"
                className="w-full bg-transparent px-3.5 py-2.5 text-xs text-stone-800 placeholder-stone-400 focus:outline-none"
              />
              <button
                type="submit"
                className="bg-stone-900 text-white px-4.5 py-2.5 text-xs font-medium tracking-widest uppercase hover:bg-stone-800 transition cursor-pointer"
              >
                Abone Ol
              </button>
            </form>
          </div>
        </div>

        {/* 1. Kolon: Koleksiyonlar */}
        <div className="space-y-5">
          <h4 className="text-xs font-medium tracking-widest uppercase text-stone-900">Koleksiyonlar</h4>
          <ul className="space-y-3 text-xs uppercase tracking-wider text-stone-500">
            <li><Link href="/products" className="hover:text-stone-900 transition">Tüm Ürünler</Link></li>
            <li><Link href="/bestsellers" className="hover:text-stone-900 transition">Çok Satanlar</Link></li>
            <li><Link href="/new-arrivals" className="hover:text-stone-900 transition">Yeni Gelenler</Link></li>
          </ul>
        </div>

        {/* 2. Kolon: Yasal */}
        <div className="space-y-5">
          <h4 className="text-xs font-medium tracking-widest uppercase text-stone-900">Yasal</h4>
          <ul className="space-y-3 text-xs uppercase tracking-wider text-stone-500">
            <li><Link href="/yasal/terms-of-use" className="hover:text-stone-900 transition">Kullanım Koşulları</Link></li>
            <li><Link href="/yasal/privacy-policy" className="hover:text-stone-900 transition">Gizlilik Politikası</Link></li>
            <li><Link href="/yasal/distance-sales-agreement" className="hover:text-stone-900 transition">Mesafeli Satış Sözleşmesi</Link></li>
            <li><Link href="/yasal/return-policy" className="hover:text-stone-900 transition">İade Politikası</Link></li>
          </ul>
        </div>

        {/* 3. Kolon: Yardım */}
        <div className="space-y-5">
          <h4 className="text-xs font-medium tracking-widest uppercase text-stone-900">Yardım</h4>
          <ul className="space-y-3 text-xs uppercase tracking-wider text-stone-500">
            <li><Link href="/yasal/return-policy" className="hover:text-stone-900 transition">İade ve Değişim</Link></li>
            <li><Link href="/about" className="hover:text-stone-900 transition">Hakkımızda</Link></li>
            <li><Link href="/blog" className="hover:text-stone-900 transition">Blog</Link></li>
            <li><Link href="/contact" className="hover:text-stone-900 transition">İletişim</Link></li>
          </ul>
        </div>

      </div>

      {/* Alt Telif ve Sosyal İkonlar */}
      <div className="mx-auto max-w-7xl px-6 mt-16 pt-8 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between text-xs uppercase tracking-widest text-stone-400">
        <p>© 2026 Velora. Tüm hakları saklıdır.</p>
      </div>
    </footer>
  );
}