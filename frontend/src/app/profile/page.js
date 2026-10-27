// app/account/page.jsx
import ProfileClient from "./ProfileClient";

export const metadata = {
  title: "Hesabım | VELORA",
  description: "VELORA hesabınızı yönetin; geçmiş siparişlerinizi takip edin, adres ve üyelik bilgilerinizi güncelleyin.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ProfilePage() {
  return <ProfileClient />;
}