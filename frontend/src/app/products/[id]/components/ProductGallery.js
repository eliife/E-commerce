 'use client';

export default function ProductGallery({
  imagesList = [],
  selectedImageIndex,
  setSelectedImageIndex,
  backendURL,
  productName,
}) {
  const rawImg = imagesList[selectedImageIndex] || imagesList[0];

  const imageUrl = rawImg
    ? rawImg.startsWith('http')
      ? rawImg
      : `${backendURL}${rawImg}`
    : null;

  return (
    <div className="lg:col-span-7 flex flex-col gap-4">
      <div className="w-full aspect-[4/5] bg-stone-100 overflow-hidden flex items-center justify-center relative rounded-md shadow-sm">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={productName || 'Velora ürün görseli'}
            className="w-full h-full object-cover object-center transition duration-700 hover:scale-105"
          />
        ) : (
          <span className="text-xs uppercase tracking-widest text-stone-400">
            Görsel Yok
          </span>
        )}
      </div>

      {imagesList.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
          {imagesList.map((img, idx) => {
            const thumbUrl = img.startsWith('http')
              ? img
              : `${backendURL}${img}`;

            return (
              <button
                key={`${img}-${idx}`}
                type="button"
                onClick={() => setSelectedImageIndex(idx)}
                aria-label={`${productName} görseli ${idx + 1}`}
                aria-pressed={selectedImageIndex === idx}
                className={`w-20 h-24 bg-stone-100 overflow-hidden border transition-all shrink-0 rounded ${
                  selectedImageIndex === idx
                    ? 'border-stone-900 ring-1 ring-stone-900'
                    : 'border-stone-200 opacity-60 hover:opacity-100'
                }`}
              >
                <img
                  src={thumbUrl}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}