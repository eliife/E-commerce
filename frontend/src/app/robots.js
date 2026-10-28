
export default function robots() {
  return {
    rules: {
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
    sitemap: 'http://localhost:3000/sitemap.xml',
  };
}
