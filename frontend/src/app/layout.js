
import { ReduxProvider } from '@/store/ReduxProvider';
import "./globals.css";

export const metadata = {
  metadataBase: new URL('http://localhost:3000'),

  title: "Velora | Tasarım Deri Çanta Modelleri",
  description:
    "Zamansız tasarım anlayışıyla hazırlanan deri çanta ve aksesuar koleksiyonunu keşfedin. Tarzınızı tamamlayan modelleri inceleyin.",


  openGraph: {
    title: "Velora | Tasarım Deri Çanta Modelleri",
    description:
      "Zamansız tasarım anlayışıyla hazırlanan deri çanta ve aksesuar koleksiyonunu keşfedin. Tarzınızı tamamlayan modelleri inceleyin.",
    siteName: "VELORA",
    locale: "tr_TR",
    type: "website",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "VELORA deri çanta ve aksesuar koleksiyonu",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Velora | Tasarım Deri Çanta Modelleri",
    description:
      "Zamansız tasarım anlayışıyla hazırlanan deri çanta ve aksesuar koleksiyonunu keşfedin.",
    images: ["/images/og-image.jpg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body>
        <ReduxProvider>
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
