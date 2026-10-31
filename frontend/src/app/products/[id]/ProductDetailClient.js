'use client';

import { useState } from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import useWishlist from '@/components/useWishlist';

import ProductGallery from './components/ProductGallery';
import ProductInfo from './components/ProductInfo';
import ProductAccordion from './components/ProductAccordion';
import RelatedProducts from './components/RelatedProducts';

export default function ProductDetailClient({
  initialProduct,
  initialRelatedProducts,
  backendURL,
}) {
  const [product] = useState(initialProduct);
  const [relatedProducts] = useState(initialRelatedProducts);

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const { wishlistIds, handleToggleWishlist } = useWishlist();

  if (!product) {
    return (
      <div className="min-h-screen bg-[#FAFAF9] flex flex-col justify-between">
        <Header />

        <div className="text-center py-32 text-xs text-stone-600">
          Ürün bulunamadı veya yüklenemedi.
        </div>

        <Footer />
      </div>
    );
  }

  const imagesList =
    product?.images?.length > 0
      ? product.images
      : product?.image
        ? [product.image]
        : [];

  const productId = product._id || product.id;

  const isFavorite = wishlistIds.includes(String(productId));

  const getProductColorInfo = (prod) => {
    const name = prod?.name?.toLowerCase() || '';
    const colorField = prod?.color?.toLowerCase() || '';

    if (
      colorField.includes('yeşil') ||
      name.includes('yeşil') ||
      name.includes('zeytin')
    ) {
      return { name: 'ZEYTİN YEŞİLİ', code: '#8A9A86' };
    }

    if (colorField.includes('bordo') || name.includes('bordo')) {
      return { name: 'BORDO', code: '#6B2D3C' };
    }

    if (colorField.includes('siyah') || name.includes('siyah')) {
      return { name: 'SİYAH', code: '#1C1C1C' };
    }

    if (colorField.includes('bej') || name.includes('bej')) {
      return { name: 'BEJ', code: '#D5C3A5' };
    }

    return {
      name: prod?.color || 'KAHVE',
      code: prod?.colorCode || '#4B3621',
    };
  };

  const colorInfo = getProductColorInfo(product);

  return (
    <div className="min-h-screen bg-[#FAFAF9] text-stone-900 selection:bg-stone-900 selection:text-white flex flex-col justify-between">
      <div>
        <Header />

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
         
            <section
              aria-label='Ürün detayları'
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-16">
              <ProductGallery
                imagesList={imagesList}
                selectedImageIndex={selectedImageIndex}
                setSelectedImageIndex={setSelectedImageIndex}
                backendURL={backendURL}
                productName={product.name}
              />

              <ProductInfo
                product={product}
                colorInfo={colorInfo}
                isFavorite={isFavorite}
                handleToggleWishlist={handleToggleWishlist}
              />
            </section>
             
            <section aria-label="Ürün açıklaması ve özellikleri">
              <ProductAccordion product={product} />
            </section>

           <section aria-label="Benzer ürünler">
             <RelatedProducts
              products={relatedProducts}
              backendURL={backendURL}
              wishlistIds={wishlistIds}
              handleToggleWishlist={handleToggleWishlist}
            />
           </section>
          
        </main>
      </div>

      <Footer />
    </div>
  );
}
