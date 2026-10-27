
'use client';

import Link from 'next/link';

export default function Hero() {
  const backendURL = 'http://localhost:5000';

  return (
    <div className="w-full bg-[#FDFBF7]">
      {/* 1. Ana bannerlar */}
      <section className="grid w-full grid-cols-2 gap-0 bg-[#FDFBF7] p-0">
        <Link
          href="/bestsellers"
          aria-label="Çantalar koleksiyonunu keşfet"
          className="group relative block w-full overflow-hidden bg-[#F4F1EA]"
        >
          <img
            src={`${backendURL}/uploads/ana-banner-5.webp`}
            alt="VELORA çantalar koleksiyonu"
            className="h-[78vh] w-full object-cover transition-transform duration-700 group-hover:scale-[1.02] sm:h-[82vh] md:h-auto md:object-contain"
          />
        </Link>

        <Link
          href="/new-arrivals"
          aria-label="Cüzdanlar koleksiyonunu keşfet"
          className="group relative block w-full overflow-hidden bg-[#F4F1EA]"
        >
          <img
            src={`${backendURL}/uploads/ana-banner-4.webp`}
            alt="VELORA cüzdanlar koleksiyonu"
            className="h-[78vh] w-full object-cover transition-transform duration-700 group-hover:scale-[1.02] sm:h-[82vh] md:h-auto md:object-contain"
          />
        </Link>
      </section>

      {/* 2. Kategori yönlendirmeleri */}
      <section className="mx-auto max-w-7xl space-y-16 px-6 py-32 text-center sm:space-y-24 sm:px-12 sm:py-48">
        <div>
          <Link
            href="/bags"
            className="inline-block font-serif text-5xl font-light uppercase tracking-wider text-stone-900 transition-all duration-300 hover:-translate-x-3 sm:text-7xl md:text-8xl lg:text-9xl"
          >
            Çantalar
          </Link>
        </div>

        <div>
          <Link
            href="/wallets"
            className="inline-block font-serif text-4xl font-light uppercase tracking-wider text-stone-900 transition-all duration-300 hover:-translate-x-3 sm:text-6xl md:text-7xl"
          >
            Cüzdanlar
          </Link>
        </div>
      </section>
    </div>
  );
}
