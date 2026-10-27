
import Header from '@/components/header';
import Footer from '@/components/footer';

export const metadata = {
  title: 'Hakkımızda | Velora ',
  description: 'Velora’nın el işçiliği deri çanta ve aksesuar koleksiyonlarını, sürdürülebilir lüks anlayışımızı ve hikayemizi keşfedin.',

  alternates: {
    canonical: '/about',
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-stone-900 selection:bg-stone-900 selection:text-white flex flex-col justify-between">
      <div>
        <Header />
        
        <main className="mx-auto max-w-4xl px-6 sm:px-12 py-24 lg:py-32">
          {/* Başlık Alanı */}
          <div className="mb-20 text-center space-y-4">
            <h1 className="text-3xl sm:text-5xl font-serif tracking-tight text-stone-900 uppercase">
              Hikâyemiz
            </h1>
            <p className="text-xs text-stone-400 tracking-[0.25em] uppercase font-light">
              Zanaat, sadelik ve zamansız tasarım felsefesi.
            </p>
          </div>

          {/* Ana İçerik - Dergi Tarzı Akış */}
          <div className="space-y-16 text-stone-600 font-light leading-relaxed">
            {/* Bölüm 1: Giriş / Felsefe */}
            <div className="space-y-6 text-base sm:text-lg">
              <p className="first-letter:text-5xl first-letter:font-serif first-letter:mr-3 first-letter:float-left first-letter:text-stone-900">
                Velora; modern şehir yaşamının karmaşasından arınmış, sadeliğin en saf halini estetikle buluşturan bir tasarım stüdyosudur. Yolculuğumuz, geçici trendlerin ötesine geçen, yıllar geçtikçe karakter kazanan zamansız parçalar üretme tutkusuyla başladı.
              </p>
              <p>
                Bizim için her bir deri çanta veya aksesuar, yalnızca günlük bir eşya değil; kullanıcısının hikayesine eşlik eden sessiz ama güçlü bir imdadır.
              </p>
            </div>

            {/* İleride Birden Fazla Fotoğraf Eklenebilecek Galeri Alanı (2'li / 3'lü Grid) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-16">
              {/* Birinci Görsel Alanı */}
              <div className="w-full h-64 sm:h-80 bg-[#F7F4EE] border border-stone-200/60 overflow-hidden rounded-sm relative">
                <img 
                    src="https://images.unsplash.com/photo-1628483211662-9bcc692c46dc?q=80&w=686&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D" 
                    alt="Atölye Detayı" 
                    className="w-full h-full object-cover hover:scale-105 transition duration-700"
                />
               </div>
              
             {/* İkinci Görsel Alanı */}
                <div className="w-full h-64 sm:h-80 bg-[#F7F4EE] border border-stone-200/60 overflow-hidden rounded-sm sm:mt-12 relative">
                    <img 
                        src="https://plus.unsplash.com/premium_photo-1677698817982-3c1fbb913e8e?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D" 
                        alt="Malzeme ve Doku" 
                        className="w-full h-full object-cover hover:scale-105 transition duration-700"
                    />
                </div>
            </div>

            {/* Vurgulu Alıntı */}
            <div className="py-10 my-12 border-y border-stone-200/60 text-center">
              <blockquote className="text-xl sm:text-2xl font-serif text-stone-900 italic tracking-wide max-w-2xl mx-auto">
                &ldquo;Gerçek lüks; detaylardaki kusursuzlukta, malzemedeki doğallıkta ve tasavvurdaki sadelikte gizlidir.&rdquo;
              </blockquote>
            </div>

            {/* Bölüm 2: Zanaat ve Malzeme */}
            <div className="space-y-6 text-sm sm:text-base">
              <h2 className="text-xl font-serif text-stone-900 pt-4">
                El İşçiliğinin ve Doğanın Buluşması
              </h2>
              <p>
                Tasarımlarımızda kullandığımız her bir materyal titizlikle seçilir. Doğal dokusunu kaybetmemiş hakiki deriler, usta ellerde geleneksel zanaat teknikleriyle işlenir. Seri üretim mantığından uzak, her dikişinde insan emeğinin izini taşıyan özenli bir üretim sürecini benimseriz.
              </p>
              <p>
                Toprak tonlarının sakinliği, minimalist çizgilerin zarafeti ve fonksiyonelliğin getirdiği konfor; her koleksiyonumuzun temel yapı taşını oluşturur.
              </p>
            </div>

            {/* Üçüncü Fotoğraf Alanı (Opsiyonel Tam Genişlik Atmosfer Karesi) */}
            <div className="w-full h-72 sm:h-96 bg-[#F7F4EE] border border-stone-200/60 overflow-hidden rounded-sm my-12 relative">
                <img 
                    src="https://plus.unsplash.com/premium_photo-1682146011039-7e6e0739a3df?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D" 
                    alt="Stüdyo ve Atmosfer" 
                    className="w-full h-full object-cover hover:scale-105 transition duration-700"
                />
            </div>

            {/* Bölüm 3: Sürdürülebilirlik ve Gelecek */}
            <div className="space-y-6 text-sm sm:text-base">
              <h2 className="text-xl font-serif text-stone-900 pt-4">
                Sürdürülebilir Zarafet
              </h2>
              <p>
                Bugün ve gelecekte, çevreye duyarlı üretim ilkelerinden ödün vermeden yol alıyoruz. Hızlı tüketim döngüsüne karşı durarak, "az ama öz" felsefesiyle uzun ömürlü ürünler tasarlıyor; doğaya ve insana saygılı bir stüdyo kültürünü yaşatmaya devam ediyoruz.
              </p>
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}