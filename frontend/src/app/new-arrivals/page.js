import ProductListing from '@/components/ProductListing';
export const metadata = {
  title: 'Yeni Gelenler | Velora ',
  description: "Velora\'nın en yeni tasarımlarını ve sezonun trendlerini yansıtan en taze deri çanta koleksiyonunu ilk siz keşfedin.",

  alternates: {
    canonical: '/new-arrivals',
  },
};

export default function NewArrivalsPage() {
  return (
    <ProductListing 
      pageTitle="Yeni Gelenler" 
      subtitlePrefix="En son eklenen" 
      defaultSort="newest" 
    />
  );
}