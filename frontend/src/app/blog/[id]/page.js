
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { blogPosts } from '../blogPosts';


function BlogContent({ content }) {
  return (
    <div className="space-y-6">
      <ReactMarkdown
        components={{
          h2: ({ children }) => (
            <h2 className="text-xl sm:text-2xl font-serif text-stone-900 mt-10 mb-4">
              {children}
            </h2>
          ),

          h3: ({ children }) => (
            <h3 className="text-lg sm:text-xl font-serif text-stone-900 mt-8 mb-3">
              {children}
            </h3>
          ),

          p: ({ children }) => (
            <p className="mb-6">{children}</p>
          ),

          a: ({ href, children }) => (
            <Link
              href={href || '/'}
              className="text-stone-900 underline underline-offset-4 hover:opacity-60 transition"
            >
              {children}
            </Link>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
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

  const blogUrl = `http://localhost:3000/blog/${id}`;

  // BlogPosting yapılandırılmış verisi
  const blogPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt || post.content.substring(0, 150),
    author: {
      '@type': 'Person',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Velora',
    },
    articleSection: post.category,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': blogUrl,
    },
  };

  
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Ana Sayfa',
        item: 'http://localhost:3000',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: 'http://localhost:3000/blog',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: blogUrl,
      },
    ],
  };

  return (
    <>
     
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogPostingSchema).replace(/</g, '\\u003c'),
        }}
      />

      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema).replace(/</g, '\\u003c'),
        }}
      />

      <div className="min-h-screen bg-[#FDFBF7] text-stone-900 selection:bg-stone-900 selection:text-white flex flex-col justify-between">
        <div>
          <Header />

          <main className="mx-auto max-w-3xl px-6 sm:px-12 py-20 lg:py-32">

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
    </>
  );
}
