// hooks/useSEO.js
"use client";
import { useEffect } from "react";

export function useSEO(title, description = "") {
  useEffect(() => {
    // 1. Sekme başlığını ayarla
    if (title) {
      document.title = title;
    }

    // 2. Meta açıklaması
    if (description) {
      let descMeta = document.querySelector('meta[name="description"]');
      if (!descMeta) {
        descMeta = document.createElement('meta');
        descMeta.name = 'description';
        document.head.appendChild(descMeta);
      }
      descMeta.content = description;
    }
  }, [title, description]);
}