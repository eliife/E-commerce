import ProductCatalogTemplate from '@/components/ProductListing';

export const metadata = {
  title: 'Cüzdanlar | Velora ',
  description: 'Zamanın ötesinde tasarlanmış el işçiliği lüks deri çantalar koleksiyonumuzu keşfedin.',
};

export default function WalletsPage() {
  return (
    <ProductCatalogTemplate 
      pageTitle="Cüzdanlar" 
      defaultCategory="Bags" 
    />
  );
}