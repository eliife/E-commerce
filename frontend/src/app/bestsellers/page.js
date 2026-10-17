import ProductListing from '@/components/ProductListing';

export default function BestSellersPage() {
  return (
    <ProductListing 
      pageTitle="Çok Satanlar" 
      subtitlePrefix="En çok tercih edilen" 
      defaultSort="bestseller" 
    />
  );
}