import Header from '@/components/header';
import Footer from '@/components/footer';

export const metadata = {
  title: ' İletişim | Velora ',
  description: 'Velora müşteri hizmetleri iletişim bilgileri, destek hatları ve mağazamızla ilgili merak ettiğiniz tüm detaylara bu sayfadan ulaşın.',
  alternates: {
    canonical: '/contact',
  },
};

export default function ContactPage() {


 
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-stone-900 selection:bg-stone-900 selection:text-white flex flex-col justify-between">
      <div>
        <Header />
        
        <main className="mx-auto max-w-2xl px-6 sm:px-12 py-24 lg:py-32">
          
          <header className="mb-16 text-center space-y-4">
            <h1 className="text-3xl sm:text-5xl font-serif tracking-tight text-stone-900 uppercase">
              İletişim
            </h1>
            <p className="text-xs text-stone-400 tracking-[0.25em] uppercase font-light">
              Sorularınız, önerileriniz ve özel siparişleriniz için bizimle iletişime geçin.
            </p>
          </header>

          {/* Merkezileştirilmiş Şık Bilgi Kartı / Alanı */}
          <section className="bg-[#F7F4EE]/50 border border-stone-200/60 p-10 sm:p-14 rounded-sm space-y-12 text-center">
            
            <div className="space-y-4 max-w-lg mx-auto">
              <h2 className="text-2xl font-serif text-stone-900">Velora</h2>
              <p className="text-sm text-stone-600 font-light leading-relaxed">
                Zanaatın ve minimalist tasarımın buluşma noktası. Tasarımlarımız, koleksiyonlarımız ve iş birlikleri hakkında merak ettikleriniz için dijital kanallarımız üzerinden bizimle iletişim kurabilirsiniz.
              </p>
            </div>

            <div className="space-y-8 pt-8 border-t border-stone-200/60 text-sm font-light max-w-sm mx-auto">
              <div>
                <h3 className="text-[10px] uppercase tracking-[0.2em] text-stone-400 mb-1">E-posta Destek</h3>
                <p className="text-stone-800 font-medium tracking-wide">hello@velora.com</p>
              </div>

              <div>
                <h3 className="text-[10px] uppercase tracking-[0.2em] text-stone-400 mb-1">Çalışma Saatleri</h3>
                <p className="text-stone-800 font-light">Pazartesi – Cuma: 09:00 – 18:00</p>
              </div>

              <div>
                <h3 className="text-[10px] uppercase tracking-[0.2em] text-stone-400 mb-1">Konum</h3>
                <p className="text-stone-800 font-light">Türkiye</p>
              </div>
            </div>

          </section>
        </main>
      </div>

      <Footer />
    </div>
  );
}