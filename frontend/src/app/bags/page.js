
import ProductCatalogTemplate from '@/components/ProductListing';

export const metadata = {
  title: 'Çantalar | Velora',
  description:
    'VELORA deri çanta koleksiyonunu keşfedin. Omuz çantası, tote çanta ve günlük kullanıma uygun zamansız tasarımlar.',
  alternates: {
    canonical: '/bags',
  },
};

export default function BagsPage() {
  return (
    <ProductCatalogTemplate
      pageTitle="Çantalar"
      defaultCategory="Bags"
      categoryDescription="Zamansız tasarımları ve farklı kullanım seçenekleriyle VELORA deri çanta koleksiyonunu keşfedin."
      categoryBottomDescription="VELORA çanta koleksiyonu, günlük yaşamdan ofis stiline kadar farklı ihtiyaçlara eşlik eden tasarımları bir araya getirir. Deri omuz çantaları, tote çantalar ve farklı formlardaki modeller arasından tarzınıza uygun seçeneği bulabilirsiniz. Sade çizgiler, zamansız renkler ve kullanışlı tasarımlarla hazırlanan koleksiyon, farklı kombinlerinizi tamamlamanıza yardımcı olur."
    />
  );
}
