// app/register/page.jsx
import RegisterClient from "./RegisterClient";

export const metadata = {
  title: "Kayıt Ol | VELORA",
  description: "VELORA ailesine katılın, el yapımı deri çanta ve aksesuar dünyasını keşfedin.",
  robots:{
    index:false,
    follow: false,
  }
  
};

export default function RegisterPage() {
  return <RegisterClient />;
}