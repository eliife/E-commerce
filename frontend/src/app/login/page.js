// app/login/page.jsx
import LoginClient from "./LoginClient";

export const metadata = {
  title: "Giriş Yap | VELORA",
  description: "VELORA hesabınıza giriş yapın, favorilerinizi ve siparişlerinizi yönetin.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function LoginPage() {
  return <LoginClient />;
}