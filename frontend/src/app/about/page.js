
import Header from '@/components/header';
import Footer from '@/components/footer';

export const metadata = {
  title: 'Hakkımızda | Velora – Hakiki Deri Çanta ve Cüzdanlar',
  description:
    'Velora; hakiki deri çanta, cüzdan ve laptop çantası koleksiyonlarını zamansız tasarım, sadelik ve günlük kullanım odaklı işlevsellikle buluşturur.',
  alternates: {
    canonical: '/about',
  },
};

export default function AboutPage() {
  const baseUrl = 'http://localhost:3000';

  const aboutPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'Hakkımızda | Velora',
    description:
      'Velora; hakiki deri çanta, cüzdan ve laptop çantası koleksiyonlarını zamansız tasarım, sadelik ve günlük kullanım odaklı işlevsellikle buluşturur.',
    url: `${baseUrl}/about`,
    isPartOf: {
      '@type': 'WebSite',
      name: 'Velora',
      url: baseUrl,
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Ana Sayfa',
        item: baseUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Hakkımızda',
        item: `${baseUrl}/about`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(aboutPageSchema),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      <div className="min-h-screen bg-[#FDFBF7] text-stone-900 selection:bg-stone-900 selection:text-white flex flex-col justify-between">
        <div>
          <Header />

          <main className="mx-auto max-w-4xl px-6 sm:px-12 py-24 lg:py-32">
            <div className="mb-20 text-center space-y-4">
              <h1 className="text-3xl sm:text-5xl font-serif tracking-tight text-stone-900 uppercase">
                Hikâyemiz
              </h1>
              <p className="text-xs text-stone-400 tracking-[0.25em] uppercase font-light">
                Hakiki deri, sadelik ve zamansız tasarım.
              </p>
            </div>

            <div className="space-y-16 text-stone-600 font-light leading-relaxed">
              <section className="space-y-6 text-base sm:text-lg">
                <p className="first-letter:text-5xl first-letter:font-serif first-letter:mr-3 first-letter:float-left first-letter:text-stone-900">
                  Velora, hakiki deri çanta ve aksesuar tasarımlarını zamansız
                  bir stil anlayışıyla bir araya getirir. Tasarım yaklaşımımızın
                  merkezinde sadelik, kullanışlılık ve günlük yaşama uyum
                  sağlayan detaylar yer alır. Amacımız, geçici trendlerin
                  ötesinde bir görünüm sunan ve farklı kullanım ihtiyaçlarına
                  cevap veren parçaları bir araya getirmektir.
                </p>
                <p>
                  Velora koleksiyonlarında omuz çantaları, tote çantalar,
                  çapraz askılı çantalar, el çantaları, mini çantalar,
                  cüzdanlar ve laptop çantaları bulunur. Her kategori,
                  tasarım ve kullanım amacı bakımından farklı ihtiyaçlara
                  yönelik seçenekler sunar.
                </p>
              </section>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-16">
                <div className="w-full h-64 sm:h-80 bg-[#F7F4EE] border border-stone-200/60 overflow-hidden rounded-sm relative">
                  <img
                    src="https://images.unsplash.com/photo-1628483211662-9bcc692c46dc?q=80&w=686&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D"
                    alt="Velora çanta tasarımlarında kullanılan deri ve malzeme dokusu"
                    className="w-full h-full object-cover hover:scale-105 transition duration-700"
                  />
                </div>

                <div className="w-full h-64 sm:h-80 bg-[#F7F4EE] border border-stone-200/60 overflow-hidden rounded-sm sm:mt-12 relative">
                  <img
                    src="https://plus.unsplash.com/premium_photo-1677698817982-3c1fbb913e8e?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D"
                    alt="Velora hakiki deri aksesuar koleksiyonundan detay"
                    className="w-full h-full object-cover hover:scale-105 transition duration-700"
                  />
                </div>
              </div>

              <div className="py-10 my-12 border-y border-stone-200/60 text-center">
                <blockquote className="text-xl sm:text-2xl font-serif text-stone-900 italic tracking-wide max-w-2xl mx-auto">
                  &ldquo;Gösteriş için değil, duruş için.&rdquo;
                </blockquote>
              </div>

              <section className="space-y-6 text-sm sm:text-base">
                <h2 className="text-xl font-serif text-stone-900 pt-4">
                  Hakiki Deri ve İşlevsel Tasarım
                </h2>
                <p>
                  Velora ürün koleksiyonlarında hakiki deri kullanılır.
                  Ürünlerin tasarımında malzemenin doğal dokusu ve kullanım
                  özellikleri ön plandadır. Çanta modellerinde farklı taşıma
                  seçenekleri, ayarlanabilir veya çıkarılabilir askılar ve
                  kullanıma göre değişen bölme düzenleri gibi detaylara yer
                  verilir.
                </p>
                <p>
                  Cüzdan koleksiyonunda kart, banknot ve bozuk para gibi
                  günlük ihtiyaçlara yönelik farklı bölme seçenekleri
                  bulunur. Laptop çantaları ise bilgisayar taşımaya yönelik
                  dolgulu bölmeleriyle koleksiyonun işlevsel parçaları
                  arasında yer alır.
                </p>
              </section>

              <div className="w-full h-72 sm:h-96 bg-[#F7F4EE] border border-stone-200/60 overflow-hidden rounded-sm my-12 relative">
                <img
                  src="https://plus.unsplash.com/premium_photo-1682146011039-7e6e0739a3df?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D"
                  alt="Velora zamansız çanta ve aksesuar tasarımlarını yansıtan görsel"
                  className="w-full h-full object-cover hover:scale-105 transition duration-700"
                />
              </div>

              <section className="space-y-6 text-sm sm:text-base">
                <h2 className="text-xl font-serif text-stone-900 pt-4">
                  Zamansız Stil ve Günlük Kullanım
                </h2>
                <p>
                  Velora'nın tasarım anlayışı, estetik görünüm ile günlük
                  kullanım ihtiyaçlarını bir arada değerlendirmeye dayanır.
                  Sade çizgiler, farklı renk seçenekleri ve işlevsel detaylar,
                  çanta ve cüzdan koleksiyonlarının ortak özelliklerini
                  oluşturur.
                </p>
                <p>
                  Günlük yaşamdan iş hayatına kadar farklı kullanım
                  alanlarına hitap eden Velora ürünleri, stilini sadelikle
                  ifade etmek isteyenler için tasarlanmış seçenekleri bir
                  araya getirir.
                </p>
              </section>
            </div>
          </main>
        </div>

        <Footer />
      </div>
    </>
  );
}
