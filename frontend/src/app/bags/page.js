
import ProductCatalogTemplate from '@/components/ProductListing';

export const metadata = {
  title: 'Çantalar | Velora',
  description:
    'VELORA deri çanta koleksiyonunu keşfedin. Omuz çantası, tote çanta ve günlük kullanıma uygun zamansız tasarımlar.',
  alternates: {
    canonical: '/bags',
  },
};

export default async function BagsPage() {
  let bagProducts = [];

  try {
    const response = await fetch('http://localhost:5000/api/products', {
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error('Ürünler alınamadı.');
    }

    const data = await response.json();

    const allProducts = Array.isArray(data)
      ? data
      : data.products || data.data || [];

    bagProducts = allProducts.filter(
      (product) => product.category === 'Bags'
    );
  } catch (error) {
    console.error('Kategori ürünleri alınırken hata oluştu:', error);
  }

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Çantalar | Velora',
    description:
      'VELORA deri çanta koleksiyonunu keşfedin. Omuz çantası, tote çanta ve günlük kullanıma uygun zamansız tasarımlar.',
    url: 'http://localhost:3000/bags',
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: bagProducts.map((product, index) => {
        const productId = product.id || product._id;

        return {
          '@type': 'ListItem',
          position: index + 1,
          name: product.name,
          url: `http://localhost:3000/products/${productId}`,
        };
      }),
    },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Ana Sayfa',
        item: 'http://localhost:3000',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Çantalar',
        item: 'http://localhost:3000/bags',
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, '\\u003c'),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, '\\u003c'),
        }}
      />

      <ProductCatalogTemplate
        pageTitle="Çantalar"
        defaultCategory="Bags"
        categoryDescription="Zamansız tasarımları ve farklı kullanım seçenekleriyle VELORA deri çanta koleksiyonunu keşfedin."
        categoryBottomDescription="VELORA çanta koleksiyonu, günlük yaşamdan ofis stiline kadar farklı ihtiyaçlara eşlik eden tasarımları bir araya getirir. Deri omuz çantaları, tote çantalar ve farklı formlardaki modeller arasından tarzınıza uygun seçeneği bulabilirsiniz. Sade çizgiler, zamansız renkler ve kullanışlı tasarımlarla hazırlanan koleksiyon, farklı kombinlerinizi tamamlamanıza yardımcı olur."
      />
    </>
  );
}
