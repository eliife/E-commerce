// app/favorites/page.jsx
import FavoritesClient from "./FavoritesClient";

export const metadata = {
  title: "Favorilerim | VELORA",
  description: "Seçtiğiniz şık tasarımları ve el yapımı deri çanta ve cüzdanları favorilerinizde inceleyin, güvenle yönetin.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function FavoritesPage() {
  return <FavoritesClient />;
}