
import Header from '@/components/header';
import Footer from '@/components/footer';

export const metadata = {
  title: 'Gizlilik Politikası | Velora',
  description: 'Velora e-ticaret platformu gizlilik politikası hakkında detaylı bilgi alın.',
};


export default function PrivacyPolicyPage() {
  

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-stone-900 selection:bg-stone-900 selection:text-white flex flex-col justify-between">
      <div>
        <Header />
        
        <main className="mx-auto max-w-5xl px-6 sm:px-12 py-20 lg:py-28">
          {/* Başlık Bölümü */}
          <div className="border-b border-stone-200 pb-8 mb-16 text-center sm:text-left">
            <h1 className="text-2xl sm:text-4xl font-serif tracking-tight text-stone-900 uppercase">
              Gizlilik Politikası
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
                <li className="text-stone-900">01. Veri Toplama</li>
                <li>02. Çerezler (Cookies)</li>
                <li>03. Bilgi Güvenliği</li>
              </ul>
            </div>

            {/* Sağ taraf: Ana Metinler */}
            <div className="md:col-span-8 space-y-12 text-sm sm:text-base text-stone-600 font-light leading-relaxed">
              <section className="space-y-4">
                <h2 className="text-xs sm:text-sm font-semibold text-stone-900 uppercase tracking-widest">
                  01. Veri Toplama
                </h2>
                <p>
                  Kullanıcılarımızın gizliliğine büyük önem veriyoruz. Alışveriş deneyiminizi iyileştirmek ve sipariş süreçlerinizi yönetmek amacıyla ad, e-posta, adres ve telefon gibi kişisel verileriniz güvenle saklanmaktadır.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-xs sm:text-sm font-semibold text-stone-900 uppercase tracking-widest">
                  02. Çerezler (Cookies)
                </h2>
                <p>
                  Site içi deneyiminizi kişiselleştirmek ve sepet işlevselliğini korumak amacıyla çerezler kullanılmaktadır. Tarayıcı ayarlarınızdan çerezleri dilediğiniz zaman devre dışı bırakabilirsiniz.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-xs sm:text-sm font-semibold text-stone-900 uppercase tracking-widest">
                  03. Bilgi Güvenliği
                </h2>
                <p>
                  Toplanan tüm hassas verileriniz SSL sertifikaları ve güncel güvenlik protokolleri ile korunmakta olup, yasal zorunluluklar haricinde asla üçüncü şahıslarla paylaşılmaz.
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