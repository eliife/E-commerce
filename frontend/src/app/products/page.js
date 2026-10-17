import ProductListing from '@/components/ProductListing'; 

export default function AllProductsPage() {
  return (
    <ProductListing
      title="Tüm Ürünler"
      subtitle="ürün listeleniyor"
      defaultSort="default"
      apiEndpoint="/products"
    />
  );
}