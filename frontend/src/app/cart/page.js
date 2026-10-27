// app/cart/page.jsx
import CartClient from "./CartClient";

export const metadata = {
  title: "Sepet | VELORA",
  description: "Seçtiğiniz şık tasarımları ve el yapımı deri çanta ve cüzdanları sepetinizde inceleyin, güvenle sipariş oluşturun.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function CartPage() {
  return <CartClient />;
}