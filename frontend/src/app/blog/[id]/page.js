'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { blogPosts } from '../blogPosts';

export default function BlogDetailPage() {
  const [isMounted, setIsMounted] = useState(false);
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  // Dizeden ilgili ID'ye sahip yazıyı buluyoruz
  const post = blogPosts.find((p) => p.id === id) || {
    title: 'Yazı Bulunamadı',
    category: 'Blog',
    date: '',
    readTime: '',
    author: '',
    content: 'Aradığınız blog yazısı bulunamadı veya kaldırılmış olabilir.'
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-stone-900 selection:bg-stone-900 selection:text-white flex flex-col justify-between">
      <div>
        <Header />
        
        <main className="mx-auto max-w-3xl px-6 sm:px-12 py-20 lg:py-32">
          <div className="mb-12">
            <Link 
              href="/blog" 
              className="text-[11px] uppercase tracking-[0.2em] text-stone-400 hover:text-stone-900 transition font-light"
            >
              ← Tüm Yazılara Dön
            </Link>
          </div>

          <div className="space-y-6 mb-16">
            <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-stone-400 font-light">
              <span>{post.category}</span>
              <span>{post.readTime}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-serif tracking-tight text-stone-900 leading-tight">
              {post.title}
            </h1>

            <div className="flex items-center justify-between text-xs text-stone-400 font-light tracking-wide pt-4 border-t border-stone-200/60">
              <span>Yazar: <span className="text-stone-800 font-medium">{post.author}</span></span>
              <span>{post.date}</span>
            </div>
          </div>

          {/* İçerik (Paragraf ve başlıkları ayırarak düzgün gösterim) */}
          <div className="space-y-8 text-base sm:text-lg text-stone-600 font-light leading-relaxed whitespace-pre-line">
            {post.content}
          </div>

          <div className="mt-20 pt-8 border-t border-stone-200/60">
            <Link 
              href="/blog"
              className="text-[11px] font-medium tracking-[0.2em] uppercase text-stone-900 hover:opacity-60 transition"
            >
              ← Blog listesine geri dön
            </Link>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}