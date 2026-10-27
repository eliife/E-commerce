// app/register/RegisterClient.jsx
'use client';

import { useState } from 'react';
import API from '@/services/api';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function RegisterClient() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await API.post('/auth/register', { name, email, password });
      router.push('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Kayıt olurken bir hata oluştu.');
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-stone-50/50 px-6 text-stone-800">
      <div className="w-full max-w-md space-y-8 rounded-sm border border-stone-200 bg-white p-8 shadow-sm">
        <div className="text-center">
          <Link href="/" className="text-xl font-serif tracking-[0.2em] text-stone-900 uppercase font-medium">
            VELORA
          </Link>
          <h2 className="mt-4 text-xs font-medium uppercase tracking-widest text-stone-900">Yeni Hesap Oluştur</h2>
          <p className="mt-1 text-xs text-stone-500 font-light">El yapımı deri koleksiyonumuza katılmak için kaydolun.</p>
        </div>

        {error && (
          <div className="rounded-sm bg-red-50 p-3 text-center text-xs font-medium text-red-600 border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-[10px] font-semibold uppercase tracking-widest text-stone-600">Ad Soyad</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1 w-full rounded-sm border border-stone-200 bg-stone-50/50 px-3 py-2 text-xs text-stone-800 focus:border-stone-900 focus:bg-white focus:outline-none transition"
              placeholder="Adınız Soyadınız"
            />
          </div>

          <div>
            <label className="block text-[10px] font-semibold uppercase tracking-widest text-stone-600">E-posta Adresi</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 w-full rounded-sm border border-stone-200 bg-stone-50/50 px-3 py-2 text-xs text-stone-800 focus:border-stone-900 focus:bg-white focus:outline-none transition"
              placeholder="ornek@email.com"
            />
          </div>

          <div>
            <label className="block text-[10px] font-semibold uppercase tracking-widest text-stone-600">Şifre</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 w-full rounded-sm border border-stone-200 bg-stone-50/50 px-3 py-2 text-xs text-stone-800 focus:border-stone-900 focus:bg-white focus:outline-none transition"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-sm bg-stone-900 py-3 text-xs font-medium tracking-widest uppercase text-white hover:bg-stone-800 transition shadow-sm disabled:bg-stone-400 cursor-pointer"
          >
            {loading ? 'Kayıt Yapılıyor...' : 'Kayıt Ol'}
          </button>
        </form>

        <p className="text-center text-xs text-stone-500 font-light">
          Zaten hesabınız var mı?{' '}
          <Link href="/login" className="font-medium text-stone-900 underline hover:text-stone-700">
            Giriş Yap
          </Link>
        </p>
      </div>
    </div>
  );
}