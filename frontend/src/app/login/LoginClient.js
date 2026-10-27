// app/login/LoginClient.jsx
'use client';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '@/store/authSlice';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginClient() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const dispatch = useDispatch();
  const router = useRouter();
  const { isLoading, error } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const resultAction = await dispatch(loginUser({ email, password }));
    
    if (loginUser.fulfilled.match(resultAction)) {
      router.push('/');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-stone-50/50 px-6 text-stone-800 selection:bg-stone-900 selection:text-white">
      <div className="w-full max-w-md space-y-8 rounded-sm border border-stone-200 bg-white p-8 shadow-sm">
        <div className="text-center space-y-2">
          <Link href="/" className="text-2xl font-serif tracking-widest text-stone-900 uppercase font-bold">
            VELORA
          </Link>
          <h2 className="text-base font-serif tracking-[0.2em] text-stone-900 uppercase font-bold pt-2">
            Hesabınıza Giriş Yapın
          </h2>
          <p className="text-xs text-stone-500 font-light">
            Kaldığınız yerden alışverişe devam edin.
          </p>
        </div>

        {error && (
          <div className="rounded-sm bg-red-50 border border-red-100 p-3 text-center text-xs font-medium text-red-600">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[10px] font-semibold uppercase tracking-widest text-stone-600 mb-1">
              E-posta Adresi
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-sm border border-stone-200 bg-stone-50/50 px-3.5 py-2.5 text-xs text-stone-800 placeholder-stone-400 focus:border-stone-900 focus:bg-white focus:outline-none transition"
              placeholder="ornek@email.com"
            />
          </div>

          <div>
            <label className="block text-[10px] font-semibold uppercase tracking-widest text-stone-600 mb-1">
              Şifre
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-sm border border-stone-200 bg-stone-50/50 px-3.5 py-2.5 text-xs text-stone-800 placeholder-stone-400 focus:border-stone-900 focus:bg-white focus:outline-none transition"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-sm bg-stone-900 py-3 text-xs font-medium tracking-widest uppercase text-white hover:bg-stone-800 transition shadow-sm disabled:opacity-50 cursor-pointer pt-3"
          >
            {isLoading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
          </button>
        </form>

        <p className="text-center text-xs text-stone-500 font-light">
          Hesabınız yok mu?{' '}
          <Link href="/register" className="font-medium text-stone-900 uppercase tracking-widest hover:underline text-[11px]">
            Kayıt Ol
          </Link>
        </p>
      </div>
    </div>
  );
}