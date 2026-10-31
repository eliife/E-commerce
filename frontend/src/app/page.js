
import Link from 'next/link';
import Header from '@/components/header';
import Footer from '@/components/footer';
import Hero from '@/components/hero';
import ProductSlider from '@/components/ProductSlider';

export const metadata = {
  title: "Velora | Tasarım Deri Çanta Modelleri",
  description: "El işçiliği zarif detaylara sahip deri çanta ve aksesuar koleksiyonumuzu keşfedin. Ücretsiz kargo ve 14 gün içinde kolay iade avantajıyla hemen sipariş verin!",
  alternates: {
    canonical: '/',
  },
};

const backendURL = 'http://localhost:5000';

export default async function HomePage() {
  let wallets = [];
  let bags = [];

  try {
    const res = await fetch(`${backendURL}/api/products`, { cache: 'no-store' });
    const json = await res.json();
    const data = Array.isArray(json) ? json : (json.products || json.data || []);

    wallets = data.filter((product) => product && product.category === 'Wallets').slice(0, 3);

    bags = data.filter((product) => product && product.category === 'Bags').slice(0, 4);
  } catch (err) {
    console.error('Ürünler sunucudan çekilemedi:', err);
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-stone-900 selection:bg-stone-900 selection:text-white flex flex-col justify-between">
      <Header />

      

      <main>
        <h1 className="sr-only">
            VELORA | Modern ve Zamansız Deri Çanta ve Cüzdan Modelleri
        </h1>
        <Hero />

        <ProductSlider
          initialWallets={bags}
          backendURL={backendURL}
        />

        <section className="relative w-full min-h-[85vh] sm:min-h-screen overflow-hidden bg-[#F4F1EA] py-12 flex items-center justify-center">
          <img
            src={`${backendURL}/uploads/ana-banner-1.webp`}
            alt="Beyaz kıyafetli modelin elinde taşıdığı koyu kahverengi deri kadın el çantası, deniz manzarası eşliğinde"
            className="w-full h-full object-cover absolute inset-0"
          />

          <div className="absolute inset-x-0 bottom-10 sm:bottom-16 flex justify-center items-center z-10">
            <Link
              href="/products"
              className="group flex flex-col items-center space-y-2 transition duration-300"
            >
              <span className="text-xs sm:text-sm uppercase tracking-[0.3em] font-medium sm:font-light px-4 py-2 sm:px-0 sm:py-0 rounded-full sm:rounded-none bg-stone-900/40 sm:bg-transparent text-white sm:text-stone-900 sm:border-b sm:border-stone-900 sm:pb-1 group-hover:opacity-80 transition duration-300 backdrop-blur-[2px] sm:backdrop-blur-none">
                TÜM ÜRÜNLERİ KEŞFET
              </span>
            </Link>
          </div>
        </section>

        <ProductSlider
          initialWallets={wallets}
          backendURL={backendURL}
          centered={true}
        />

        <section className="mx-auto max-w-4xl px-6 sm:px-12 py-16 lg:py-20 text-center space-y-8 flex flex-col items-center justify-center">
          <span className="text-[10px] uppercase tracking-[0.3em] text-stone-400 font-light">
            Velora
          </span>

          <h2 className="text-4xl sm:text-6xl font-serif tracking-tight text-stone-900 leading-tight">
            Sadeliğin ve Zanaatın Estetiği
          </h2>

          <p className="text-sm sm:text-base text-stone-600 font-light max-w-lg mx-auto leading-relaxed">
            Geçici trendlerden uzak, zamanın ötesinde tasarlanmış koleksiyonlarımızı ve hikâyemizi keşfedin.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/about"
              className="bg-stone-900 text-white px-8 py-4 text-[11px] uppercase tracking-[0.2em] rounded-sm hover:bg-stone-800 transition duration-300"
            >
              Hikâyemiz
            </Link>

            <Link
              href="/blog"
              className="border border-stone-300 text-stone-900 px-8 py-4 text-[11px] uppercase tracking-[0.2em] rounded-sm hover:border-stone-900 transition duration-300"
            >
              Blog
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
