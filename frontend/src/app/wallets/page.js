
import ProductCatalogTemplate from '@/components/ProductListing';

export const metadata = {
  title: 'Cüzdanlar | Velora',
  description:
    'VELORA deri cüzdan koleksiyonunu keşfedin. Zamansız tasarımları, sade çizgileri ve günlük kullanıma uygun modelleri inceleyin.',
  alternates: {
    canonical: '/wallets',
  },
};

export default async function WalletsPage() {
  let walletProducts = [];

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

    walletProducts = allProducts.filter(
      (product) => product.category === 'Wallets'
    );
  } catch (error) {
    console.error('Kategori ürünleri alınırken hata oluştu:', error);
  }

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Cüzdanlar | Velora',
    description:
      'VELORA deri cüzdan koleksiyonunu keşfedin. Zamansız tasarımları, sade çizgileri ve günlük kullanıma uygun modelleri inceleyin.',
    url: 'http://localhost:3000/wallets',
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: walletProducts.map((product, index) => {
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
        name: 'Cüzdanlar',
        item: 'http://localhost:3000/wallets',
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
        pageTitle="Cüzdanlar"
        defaultCategory="Wallets"
        categoryDescription="Sade tasarımları ve zamansız renkleriyle VELORA deri cüzdan koleksiyonunu keşfedin."
        categoryBottomDescription="VELORA cüzdan koleksiyonu, günlük kullanımda ihtiyaç duyduğunuz işlevselliği zarif tasarımlarla bir araya getirir. Klasik deri cüzdanlardan kompakt el cüzdanlarına kadar farklı modeller, kişisel tarzınıza ve kullanım alışkanlıklarınıza uygun seçenekler sunar. Minimal çizgiler ve zamansız renklerle tasarlanan modeller, günlük kombinlerinizi tamamlayan şık aksesuarlar olarak öne çıkar."
      />
    </>
  );
}
