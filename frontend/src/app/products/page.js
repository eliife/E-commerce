import ProductListing from '@/components/ProductListing'; 
export const metadata = {
  title: " Tüm Ürünler | Velora",
  description: "Zamanın ötesinde tasarlanmış tüm el işçiliği deri çanta ve cüzdan modellerimizi inceleyin.",
};

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