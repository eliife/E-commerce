
import Header from '@/components/header';
import Footer from '@/components/footer';

export const metadata = {
  title: 'Kullanım Koşulları | Velora',
  description: 'Velora e-ticaret platformu kullanım koşulları hakkında detaylı bilgi alın.',
    alternates: {
    canonical: '/yasal/terms-of-use',
  },
};

export default function TermsOfUsePage() {
  

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-stone-900 selection:bg-stone-900 selection:text-white flex flex-col justify-between">
      <div>
        <Header />
        
        <main className="mx-auto max-w-5xl px-6 sm:px-12 py-20 lg:py-28">
          {/* Başlık Bölümü */}
          <div className="border-b border-stone-200 pb-8 mb-16 text-center sm:text-left">
            <h1 className="text-2xl sm:text-4xl font-serif tracking-tight text-stone-900 uppercase">
              Kullanım Koşulları
            </h1>
            <p className="text-xs text-stone-400 tracking-widest uppercase mt-3 font-light">
              Son Güncelleme: Ekim 2026
            </p>
          </div>

          {/* İçerik Bölümü */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16">
            {/* Sol taraf: Menü / Özet İpucu (Minimalist detay) */}
            <div className="md:col-span-4 space-y-4 text-xs tracking-widest uppercase text-stone-400 hidden md:block pt-2">
              
              <ul className="space-y-3 font-light">
                <li className="text-stone-900">01. Genel Hükümler</li>
                <li>02. Hesap Güvenliği</li>
                <li>03. Fikri Mülkiyet</li>
              </ul>
            </div>

            {/* Sağ taraf: Ana Metinler */}
            <div className="md:col-span-8 space-y-12 text-sm sm:text-base text-stone-600 font-light leading-relaxed">
              <section className="space-y-4">
                <h2 className="text-xs sm:text-sm font-semibold text-stone-900 uppercase tracking-widest">
                  01. Genel Hükümler
                </h2>
                <p>
                  VELORA'yı kullanarak aşağıdaki koşulları kabul etmiş sayanırsınız. Sitemiz üzerinden sunulan tüm hizmetler, ürünler ve dijital içerikler bu kurallara tabidir.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-xs sm:text-sm font-semibold text-stone-900 uppercase tracking-widest">
                  02. Üyelik ve Hesap Güvenliği
                </h2>
                <p>
                  Kayıt olurken paylaştığınız bilgilerin doğruluğundan ve hesap güvenliğinizden tamamen siz sorumlusunuz. Şifrenizin yetkisiz kişilerce kullanımı durumunda oluşabilecek zararlardan firmamız sorumlu tutulamaz.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-xs sm:text-sm font-semibold text-stone-900 uppercase tracking-widest">
                  03. Fikri Mülkiyet Hakları
                </h2>
                <p>
                  Sitede yer alan tüm görseller, ürün tasarımları, logolar ve metinler telif hakkına tabidir. İzinsiz kopyalanamaz, çoğaltılamaz veya ticari amaçla başka platformlarda kullanılamaz.
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