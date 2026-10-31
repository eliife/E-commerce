'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-stone-50 text-stone-600 pt-20 pb-14 border-t border-stone-200">
      <div className="mx-auto max-w-7xl px-6 grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-16">

        {/* Logo, Açıklama ve E-bülten */}
        <div className="space-y-6 md:col-span-1">
          <Link
            href="/"
            aria-label="VELORA ana sayfa"
            className="text-2xl sm:text-3xl font-serif tracking-[0.3em] text-stone-900 font-semibold block"
          >
            VELORA
          </Link>

          <p className="text-xs text-stone-500 leading-relaxed font-light">
            Velora deri çanta, cüzdan ve aksesuar koleksiyonunu keşfedin.
            Zamansız tasarımı ve zarif detaylarıyla günlük stile güçlü bir dokunuş.
          </p>

          <a
            href="mailto:hello@velora.com"
            className="text-xs text-stone-400 tracking-wider hover:text-stone-900 transition"
          >
            hello@velora.com
          </a>

          {/* E-bülten */}
          <div className="space-y-3 pt-2">
            <h2 className="text-xs font-medium tracking-widest uppercase text-stone-900">
              İletişimde kal.
            </h2>

            <form
              aria-label="E-posta bülteni aboneliği"
              onSubmit={(e) => e.preventDefault()}
              className="flex items-center border border-stone-300 bg-white rounded-sm overflow-hidden focus-within:border-stone-500 transition"
            >
              <label htmlFor="newsletter-email" className="sr-only">
                E-posta adresiniz
              </label>

              <input
                id="newsletter-email"
                type="email"
                required
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

        {/* Koleksiyonlar */}
        <div className="space-y-5">
          <h2 className="text-xs font-medium tracking-widest uppercase text-stone-900">
            Koleksiyonlar
          </h2>

          <nav aria-label="Koleksiyon bağlantıları">
            <ul className="space-y-3 text-xs uppercase tracking-wider text-stone-500">
              <li>
                <Link href="/bags" className="hover:text-stone-900 transition">
                  Çantalar
                </Link>
              </li>

              <li>
                <Link href="/wallets" className="hover:text-stone-900 transition">
                  Cüzdanlar
                </Link>
              </li>

              <li>
                <Link href="/products" className="hover:text-stone-900 transition">
                  Tüm Ürünler
                </Link>
              </li>

              <li>
                <Link href="/bestsellers" className="hover:text-stone-900 transition">
                  Çok Satanlar
                </Link>
              </li>

              <li>
                <Link href="/new-arrivals" className="hover:text-stone-900 transition">
                  Yeni Gelenler
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* Yasal */}
        <div className="space-y-5">
          <h2 className="text-xs font-medium tracking-widest uppercase text-stone-900">
            Yasal
          </h2>

          <nav aria-label="Yasal bağlantılar">
            <ul className="space-y-3 text-xs uppercase tracking-wider text-stone-500">
              <li>
                <Link href="/yasal/terms-of-use" className="hover:text-stone-900 transition">
                  Kullanım Koşulları
                </Link>
              </li>

              <li>
                <Link href="/yasal/privacy-policy" className="hover:text-stone-900 transition">
                  Gizlilik Politikası
                </Link>
              </li>

              <li>
                <Link href="/yasal/distance-sales-agreement" className="hover:text-stone-900 transition">
                  Mesafeli Satış Sözleşmesi
                </Link>
              </li>

              <li>
                <Link href="/yasal/return-policy" className="hover:text-stone-900 transition">
                  İade Politikası
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* Yardım */}
        <div className="space-y-5">
          <h2 className="text-xs font-medium tracking-widest uppercase text-stone-900">
            Yardım
          </h2>

          <nav aria-label="Yardım bağlantıları">
            <ul className="space-y-3 text-xs uppercase tracking-wider text-stone-500">
              <li>
                <Link href="/yasal/return-policy" className="hover:text-stone-900 transition">
                  İade ve Değişim
                </Link>
              </li>

              <li>
                <Link href="/about" className="hover:text-stone-900 transition">
                  Hakkımızda
                </Link>
              </li>

              <li>
                <Link href="/blog" className="hover:text-stone-900 transition">
                  Blog
                </Link>
              </li>

              <li>
                <Link href="/contact" className="hover:text-stone-900 transition">
                  İletişim
                </Link>
              </li>
            </ul>
          </nav>
        </div>

      </div>

      {/* Telif Bilgisi */}
      <div className="mx-auto max-w-7xl px-6 mt-16 pt-8 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between text-xs uppercase tracking-widest text-stone-400">
        <p>© 2026 Velora. Tüm hakları saklıdır.</p>
      </div>
    </footer>
  );
}