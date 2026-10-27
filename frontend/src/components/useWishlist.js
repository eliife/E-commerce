
'use client';

import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import API from '@/services/api';

const getProductId = (item) => {
  const id =
    item && typeof item === 'object'
      ? item._id ?? item.id
      : item;

  return id == null ? null : String(id);
};

export default function useWishlist() {
  const { user } = useSelector((state) => state.auth);
  const [wishlistIds, setWishlistIds] = useState([]);

  // Kullanıcının mevcut favorilerini yükle
  useEffect(() => {
    let cancelled = false;

    setWishlistIds([]);

    if (!user) {
      return () => {
        cancelled = true;
      };
    }

    const fetchWishlist = async () => {
      try {
        const response = await API.get('/wishlist');

        const items =
          response.data?.wishlist?.products ??
          response.data?.products ??
          [];

        if (!cancelled) {
          setWishlistIds(
            Array.isArray(items)
              ? items.map(getProductId).filter(Boolean)
              : []
          );
        }
      } catch (err) {
        if (!cancelled) {
          console.warn('Favoriler getirilemedi:', err.message);
        }
      }
    };

    fetchWishlist();

    return () => {
      cancelled = true;
    };
  }, [user]);

  // Favoriye ekle veya favorilerden çıkar
  const handleToggleWishlist = useCallback(
    async (productId) => {
      if (!user) {
        alert('Favorilere ürün eklemek için giriş yapmalısınız.');
        return;
      }

      try {
        const response = await API.post('/wishlist/toggle', {
          productId,
        });

        const updatedProducts =
          response.data?.wishlist?.products ??
          response.data?.products;

        if (Array.isArray(updatedProducts)) {
          setWishlistIds(
            updatedProducts.map(getProductId).filter(Boolean)
          );
        } else {
          // Backend listeyi döndürmezse yerel durumu güncelle
          const id = String(productId);

          setWishlistIds((currentIds) =>
            currentIds.includes(id)
              ? currentIds.filter((currentId) => currentId !== id)
              : [...currentIds, id]
          );
        }
      } catch (err) {
        console.error('Favori güncelleme hatası:', err);
        alert('Favori güncellenemedi.');
      }
    },
    [user]
  );

  return {
    wishlistIds,
    handleToggleWishlist,
  };
}
