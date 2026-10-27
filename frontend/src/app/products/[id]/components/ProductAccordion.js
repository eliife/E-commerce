'use client';

import { useState } from 'react';

export default function ProductAccordion({ product }) {
  const [openAccordion, setOpenAccordion] = useState('description');

  const toggleAccordion = (tabKey) => {
    setOpenAccordion((current) =>
      current === tabKey ? null : tabKey
    );
  };

  const renderFormattedCombination = (text) => {
    if (!text) {
      return (
        <p>
          Zarif duruşunu öne çıkarmak için benzer tonlardaki
          aksesuarlarla tamamlayabilirsiniz.
        </p>
      );
    }

    const parts = text.split(
      /(?=\s*-\s*\*\*|\s*-\s*[A-ZÇĞİÖŞÜa-zçğıöşü]+\s*:)/
    );

    if (parts.length <= 1) {
      return <p>{text}</p>;
    }

    return (
      <div className="space-y-3">
        {parts.map((part, index) => {
          const cleaned = part.replace(/^[\s-]+/, '').trim();

          if (!cleaned) return null;

          return (
            <p key={index} className="leading-relaxed">
              {cleaned}
            </p>
          );
        })}
      </div>
    );
  };

  const renderFormattedMaterials = (text) => {
    const defaultText =
      'Birinci sınıf hakiki deriden el işçiliği detaylarıyla özenle üretilmiştir.';

    return (
      <p className="leading-relaxed">
        {text || defaultText}
      </p>
    );
  };

  return (
    <div className="w-full max-w-3xl mx-auto border-t border-stone-200/80 pt-10 mb-16">
      <div className="divide-y divide-stone-200/80 border-y border-stone-200/80">
        <div>
          <button
            type="button"
            onClick={() => toggleAccordion('description')}
            aria-expanded={openAccordion === 'description'}
            className="w-full py-5 flex items-center justify-between text-xs uppercase tracking-[0.2em] font-medium text-stone-900 cursor-pointer"
          >
            <span>Ürün Açıklaması</span>
            <span>
              {openAccordion === 'description' ? '−' : '+'}
            </span>
          </button>

          {openAccordion === 'description' && (
            <div className="pb-6 text-xs text-stone-600 leading-relaxed font-light space-y-5">
              <p>
                {product.description2 || product.description}
              </p>

              <div className="pt-4 border-t border-stone-200/60">
                <h2 className="text-[11px] uppercase tracking-[0.15em] font-semibold text-stone-900 mb-3">
                  Nasıl Kombinlenir
                </h2>

                {renderFormattedCombination(product.combination)}
              </div>
            </div>
          )}
        </div>

        <div>
          <button
            type="button"
            onClick={() => toggleAccordion('materials')}
            aria-expanded={openAccordion === 'materials'}
            className="w-full py-5 flex items-center justify-between text-xs uppercase tracking-[0.2em] font-medium text-stone-900 cursor-pointer"
          >
            <span>Materyal ve Bakım</span>
            <span>
              {openAccordion === 'materials' ? '−' : '+'}
            </span>
          </button>

          {openAccordion === 'materials' && (
            <div className="pb-6 text-xs text-stone-600 leading-relaxed font-light space-y-3">
              {renderFormattedMaterials(
                product.materials || product.material
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}