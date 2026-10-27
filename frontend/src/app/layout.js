import { ReduxProvider } from '@/store/ReduxProvider';
import "./globals.css";

export const metadata = {
  metadataBase: new URL('http://localhost:3000'),
  title: "Velora | Tasarım Deri Çanta Modelleri",
  description: "El işçiliği zarif detaylara sahip deri çanta ve aksesuar koleksiyonumuzu keşfedin. Ücretsiz kargo ve 14 gün içinde kolay iade avantajıyla hemen sipariş verin!",
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