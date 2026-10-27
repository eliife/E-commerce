import ProductCatalogTemplate from '@/components/ProductListing';

export const metadata = {
  title: 'Çantalar | Velora ',
  description: 'Zamanın ötesinde tasarlanmış el işçiliği lüks deri çantalar koleksiyonumuzu keşfedin.',
  alternates: {
    canonical: '/bags',
  },
};

export default function WalletsPage() {
  return (
    <ProductCatalogTemplate 
      pageTitle="Çantalar" 
      defaultCategory="Bags" 
    />
  );
}