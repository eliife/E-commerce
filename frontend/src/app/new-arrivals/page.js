import ProductListing from '@/components/ProductListing';

export default function NewArrivalsPage() {
  return (
    <ProductListing 
      pageTitle="Yeni Gelenler" 
      subtitlePrefix="En son eklenen" 
      defaultSort="newest" 
    />
  );
}