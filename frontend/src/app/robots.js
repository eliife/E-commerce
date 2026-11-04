export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/cart',
          '/login',
          '/register',
          '/profile',
          '/favorites',
        ],
      },

      {
        userAgent: 'OAI-SearchBot',
        allow: '/',
        disallow: [
          '/cart',
          '/login',
          '/register',
          '/profile',
          '/favorites',
        ],
      },

      {
        userAgent: 'ChatGPT-User',
        allow: '/',
        disallow: [
          '/cart',
          '/login',
          '/register',
          '/profile',
          '/favorites',
        ],
      },

      {
        userAgent: 'PerplexityBot',
        allow: '/',
        disallow: [
          '/cart',
          '/login',
          '/register',
          '/profile',
          '/favorites',
        ],
      },

      {
        userAgent: 'ClaudeBot',
        allow: '/',
        disallow: [
          '/cart',
          '/login',
          '/register',
          '/profile',
          '/favorites',
        ],
      },

      {
        userAgent: 'GPTBot',
        disallow: '/',
      },
    ],

    sitemap: 'http://localhost:3000/sitemap.xml',
  };
}