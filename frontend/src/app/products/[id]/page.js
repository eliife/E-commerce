
import ProductDetailClient from './ProductDetailClient';

const backendURL = 'http://localhost:5000';
const frontendURL = 'http://localhost:3000';

export async function generateMetadata({ params }) {
  const { id } = await params;

  try {
    const res = await fetch(`${backendURL}/api/products/${id}`, {
      cache: 'no-store',
    });

    const data = await res.json();
    const product = data.product || data;

    return {
      title: `${product.name} | Velora`,
      description: product.description || 'Velora lüks deri koleksiyonu.',
      alternates: {
        canonical: `/products/${id}`,
      },
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
  let jsonLd = null;
  let breadcrumbJsonLd = null;

  try {
    const prodRes = await fetch(`${backendURL}/api/products/${id}`, {
      cache: 'no-store',
    });

    const prodJson = await prodRes.json();
    product = prodJson.product || prodJson;

    // Product Schema
    jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: product.name,
      description: product.description,
      image: `${backendURL}${product.image}`,
      brand: {
        '@type': 'Brand',
        name: product.brand,
      },
      offers: {
        '@type': 'Offer',
        price: product.price,
        priceCurrency: 'TRY',
        availability: product.stock > 0
          ? 'https://schema.org/InStock'
          : 'https://schema.org/OutOfStock',
      },
    };

    // BreadcrumbList Schema
    const categoryInfo = {
      Bags: {
        name: 'Çantalar',
        url: `${frontendURL}/bags`,
      },
      Wallets: {
        name: 'Cüzdanlar',
        url: `${frontendURL}/wallets`,
      },
    };

    const category = categoryInfo[product.category];
    const productId = product._id || product.id;

    const breadcrumbItems = [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Ana Sayfa',
        item: frontendURL,
      },
    ];

    if (category) {
      breadcrumbItems.push({
        '@type': 'ListItem',
        position: 2,
        name: category.name,
        item: category.url,
      });
    }

    breadcrumbItems.push({
      '@type': 'ListItem',
      position: category ? 3 : 2,
      name: product.name,
      item: `${frontendURL}/products/${productId}`,
    });

    breadcrumbJsonLd = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbItems,
    };

    // Related Products
    const allRes = await fetch(`${backendURL}/api/products`, {
      cache: 'no-store',
    });

    const allJson = await allRes.json();
    const list = allJson.products || allJson.data || allJson || [];

    relatedProducts = list
      .filter((p) => String(p._id || p.id) !== String(id))
      .slice(0, 4);

  } catch (err) {
    console.error('Sunucu tarafında veri çekme hatası:', err);
  }

  return (
    <>
      {product && (
        <>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
            }}
          />

          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, '\\u003c'),
            }}
          />
        </>
      )}

      <ProductDetailClient
        initialProduct={product}
        initialRelatedProducts={relatedProducts}
        backendURL={backendURL}
      />
    </>
  );
}
