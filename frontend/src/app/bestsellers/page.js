import ProductListing from '@/components/ProductListing';
export const metadata = {
  title: 'Çok Satanlar | Velora',
  description: 'Velora tutkunlarının en çok beğendiği, zarif detayları ve zanaatkarlığıyla öne çıkan en popüler ürünlerimizi keşfedin.',
  alternates: {
    canonical: '/bestsellers',
  },
};

export default function BestSellersPage() {
  return (
    <ProductListing 
      pageTitle="Çok Satanlar" 
      subtitlePrefix="En çok tercih edilen" 
      defaultSort="bestseller" 
    />
  );
}