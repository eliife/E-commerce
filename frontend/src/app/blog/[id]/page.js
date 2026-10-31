
import Link from 'next/link';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { blogPosts } from '../blogPosts';

// Markdown içeriğini HTML elementlerine dönüştürür.
function BlogContent({ content }) {
  const lines = content.trim().split('\n');

  return (
    <div className="space-y-6">
      {lines.map((line, index) => {
        const trimmedLine = line.trim();

        // Boş satırları atla.
        if (!trimmedLine) {
          return null;
        }

        // H2 başlıkları: ##
        if (trimmedLine.startsWith('## ')) {
          return (
            <h2
              key={index}
              className="text-xl sm:text-2xl font-serif text-stone-900 mt-10 mb-4"
            >
              {trimmedLine.replace(/^##\s+/, '')}
            </h2>
          );
        }

        // H3 başlıkları: ###
        if (trimmedLine.startsWith('### ')) {
          return (
            <h3
              key={index}
              className="text-lg sm:text-xl font-serif text-stone-900 mt-8 mb-3"
            >
              {trimmedLine.replace(/^###\s+/, '')}
            </h3>
          );
        }

        // Normal metinleri paragraf olarak göster.
        return (
          <p key={index} className="mb-6">
            {trimmedLine}
          </p>
        );
      })}
    </div>
  );
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const post = blogPosts.find((p) => p.id === id);

  if (!post) {
    return {
      title: 'Yazı Bulunamadı | Velora',
      description: 'Aradığınız blog yazısı bulunamadı.',
    };
  }

  return {
    title: `${post.title} | Velora`,
    description: post.excerpt || post.content.substring(0, 150),
    alternates: {
      canonical: `/blog/${id}`,
    },
  };
}

export default async function BlogDetailPage({ params }) {
  const { id } = await params;

  const post = blogPosts.find((p) => p.id === id) || {
    title: 'Yazı Bulunamadı',
    category: 'Blog',
    date: '',
    readTime: '',
    author: '',
    content: 'Aradığınız blog yazısı bulunamadı veya kaldırılmış olabilir.',
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-stone-900 selection:bg-stone-900 selection:text-white flex flex-col justify-between">
      <div>
        <Header />

        <main className="mx-auto max-w-3xl px-6 sm:px-12 py-20 lg:py-32">

          <nav aria-label="Blog gezinme" className="mb-12">
            <Link
              href="/blog"
              className="text-[11px] uppercase tracking-[0.2em] text-stone-400 hover:text-stone-900 transition font-light"
            >
              ← Tüm Yazılara Dön
            </Link>
          </nav>

          <header className="space-y-6 mb-16">
            <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-stone-400 font-light">
              <span>{post.category}</span>
              <span>{post.readTime}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-serif tracking-tight text-stone-900 leading-tight">
              {post.title}
            </h1>

            <div className="flex items-center justify-between text-xs text-stone-400 font-light tracking-wide pt-4 border-t border-stone-200/60">
              <span>
                Yazar:{' '}
                <span className="text-stone-800 font-medium">
                  {post.author}
                </span>
              </span>

              <span>{post.date}</span>
            </div>
          </header>

          <article className="text-base sm:text-lg text-stone-600 font-light leading-relaxed">
            <BlogContent content={post.content} />
          </article>

          <div className="mt-20 pt-8 border-t border-stone-200/60">
            <Link
              href="/blog"
              className="text-[11px] font-medium tracking-[0.2em] uppercase text-stone-900 hover:opacity-60 transition cursor-pointer"
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
