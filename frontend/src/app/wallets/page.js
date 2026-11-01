
import ProductCatalogTemplate from '@/components/ProductListing';

export const metadata = {
  title: 'Cüzdanlar | Velora',
  description:
    'VELORA deri cüzdan koleksiyonunu keşfedin. Zamansız tasarımları, sade çizgileri ve günlük kullanıma uygun modelleri inceleyin.',
  alternates: {
    canonical: '/wallets',
  },
};

export default function WalletsPage() {
  return (
    <ProductCatalogTemplate
      pageTitle="Cüzdanlar"
      defaultCategory="Wallets"
      categoryDescription="Sade tasarımları ve zamansız renkleriyle VELORA deri cüzdan koleksiyonunu keşfedin."
      categoryBottomDescription="VELORA cüzdan koleksiyonu, günlük kullanımda ihtiyaç duyduğunuz işlevselliği zarif tasarımlarla bir araya getirir. Klasik deri cüzdanlardan kompakt el cüzdanlarına kadar farklı modeller, kişisel tarzınıza ve kullanım alışkanlıklarınıza uygun seçenekler sunar. Minimal çizgiler ve zamansız renklerle tasarlanan modeller, günlük kombinlerinizi tamamlayan şık aksesuarlar olarak öne çıkar."
    />
  );
}
