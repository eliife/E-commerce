import ProductDetailClient from '@/components/ProductDetailClient';

const backendURL = 'http://localhost:5000';


export async function generateMetadata({ params }) {
  const { id } = await params;
  
  try {
    const res = await fetch(`${backendURL}/api/products/${id}`, { cache: 'no-store' });
    const data = await res.json();
    const product = data.product || data;

    return {
      title: `${product.name} | Velora`,
      description: product.description || 'Velora lüks deri koleksiyonu.',
    };
  } catch (error) {
    return {
      title: 'Ürün Detayı | Velora',
      description: 'Velora deri çanta ve cüzdan koleksiyonu.',
    };
  }
}

export default async function Page({ params }) {
  const { id } = await params;

  let product = null;
  let relatedProducts = [];

  try {
    const prodRes = await fetch(`${backendURL}/api/products/${id}`, { cache: 'no-store' });
    const prodJson = await prodRes.json();
    product = prodJson.product || prodJson;


    const allRes = await fetch(`${backendURL}/api/products`, { cache: 'no-store' });
    const allJson = await allRes.json();
    const list = allJson.products || allJson.data || allJson || [];
    relatedProducts = list.filter((p) => String(p._id || p.id) !== String(id)).slice(0, 4);
  } catch (err) {
    console.error('Sunucu tarafında veri çekme hatası:', err);
  }

  return (
    <ProductDetailClient 
      initialProduct={product} 
      initialRelatedProducts={relatedProducts} 
      backendURL={backendURL} 
    />
  );
}