// app/account/ProfileClient.jsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '@/store/authSlice';
import { resetCart } from '@/store/cartSlice';
import { useRouter } from 'next/navigation';
import API from '@/services/api';
import Header from '@/components/header';
import Footer from '@/components/footer';

export default function ProfileClient() {
  const [isMounted, setIsMounted] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');

  // Siparişler
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  // Adresler
  const [addresses, setAddresses] = useState([]);
  const [loadingAddresses, setLoadingAddresses] = useState(false);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState(null);
  const [newAddress, setNewAddress] = useState({
    title: '',
    fullName: '',
    addressLine: '',
    city: '',
    district: '',
    phone: '',
  });

  // Özel Silme Onay Modalı İçin State'ler
  const [addressToDelete, setAddressToDelete] = useState(null);

  const dispatch = useDispatch();
  const router = useRouter();

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Giriş yapılmamışsa giriş sayfasına yönlendir.
  useEffect(() => {
    if (isMounted && !user) {
      router.replace('/login');
    }
  }, [isMounted, user, router]);

  // Siparişleri getir.
  useEffect(() => {
    if (!isMounted || !user || activeTab !== 'orders') return;

    let cancelled = false;

    const fetchOrders = async () => {
      setLoadingOrders(true);

      try {
        const response = await API.get('/orders');

        if (!cancelled) {
          setOrders(response.data.orders || response.data || []);
        }
      } catch (err) {
        console.warn('Siparişler getirilemedi:', err.message);

        if (!cancelled) {
          setOrders([]);
        }
      } finally {
        if (!cancelled) {
          setLoadingOrders(false);
        }
      }
    };

    fetchOrders();

    return () => {
      cancelled = true;
    };
  }, [isMounted, user, activeTab]);

  // Adresleri getir.
  const fetchAddresses = async () => {
    setLoadingAddresses(true);

    try {
      const response = await API.get('/addresses');
      setAddresses(response.data.addresses || response.data || []);
    } catch (err) {
      console.warn('Adresler getirilemedi:', err.message);
      setAddresses([]);
    } finally {
      setLoadingAddresses(false);
    }
  };

  useEffect(() => {
    if (isMounted && user && activeTab === 'addresses') {
      fetchAddresses();
    }
  }, [isMounted, user, activeTab]);

  // Yeni adres kaydet veya mevcut adresi güncelle.
  const handleAddressSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingAddressId) {
        await API.put(`/addresses/${editingAddressId}`, newAddress);
      } else {
        await API.post('/addresses', newAddress);
      }

      setNewAddress({
        title: '',
        fullName: '',
        addressLine: '',
        city: '',
        district: '',
        phone: '',
      });

      setEditingAddressId(null);
      setShowAddressForm(false);
      await fetchAddresses();
    } catch (err) {
      alert(
        'İşlem başarısız oldu: ' +
          (err.response?.data?.message || err.message)
      );
    }
  };

  // Adres düzenleme formunu aç.
  const handleEditClick = (addr) => {
    setEditingAddressId(addr._id || addr.id);

    setNewAddress({
      title: addr.title || '',
      fullName: addr.fullName || '',
      addressLine: addr.addressLine || '',
      city: addr.city || '',
      district: addr.district || '',
      phone: addr.phone || '',
    });

    setShowAddressForm(true);
  };

  // Adres formunu aç veya kapat.
  const handleToggleForm = () => {
    if (showAddressForm) {
      setEditingAddressId(null);
      setNewAddress({
        title: '',
        fullName: '',
        addressLine: '',
        city: '',
        district: '',
        phone: '',
      });
    }

    setShowAddressForm((previous) => !previous);
  };

  // Adres silme işlemini onayla ve gerçekleştir.
  const confirmDeleteAddress = async () => {
    if (!addressToDelete) return;

    try {
      await API.delete(`/addresses/${addressToDelete}`);
      setAddressToDelete(null);
      await fetchAddresses();
    } catch (err) {
      alert(
        'Adres silinemedi: ' +
          (err.response?.data?.message || err.message)
      );
    }
  };

  // Çıkış yaparken yalnızca Redux belleğindeki sepeti temizle.
  const handleLogout = () => {
    dispatch(resetCart());
    dispatch(logout());
    router.replace('/');
  };

  if (!isMounted || !user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-stone-50/50 text-stone-800 selection:bg-stone-900 selection:text-white flex flex-col justify-between">
      <div>
        <Header />

        <main className="mx-auto max-w-7xl px-6 py-16">
          <div className="mb-10 border-b border-stone-200 pb-4">
            <h1 className="text-base font-serif tracking-[0.2em] text-stone-900 uppercase font-bold">
              Hesabım
            </h1>
            <p className="text-xs text-stone-500 mt-1 font-light">
              Hoş geldiniz,{' '}
              <span className="font-medium text-stone-900">
                {user.name || user.email?.split('@')[0] || 'Kullanıcı'}
              </span>
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 items-start">
            {/* Sol Menü */}
            <aside className="lg:col-span-1 space-y-2">
              <button
                type="button"
                onClick={() => setActiveTab('profile')}
                className={`w-full flex items-center space-x-3 px-5 py-3 rounded-sm text-xs uppercase tracking-widest font-medium transition text-left cursor-pointer ${
                  activeTab === 'profile'
                    ? 'bg-stone-900 text-white shadow-sm'
                    : 'text-stone-700 hover:bg-stone-100'
                }`}
              >
                <span>Profil</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('orders')}
                className={`w-full flex items-center space-x-3 px-5 py-3 rounded-sm text-xs uppercase tracking-widest font-medium transition text-left cursor-pointer ${
                  activeTab === 'orders'
                    ? 'bg-stone-900 text-white shadow-sm'
                    : 'text-stone-700 hover:bg-stone-100'
                }`}
              >
                <span>Siparişlerim</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('addresses')}
                className={`w-full flex items-center space-x-3 px-5 py-3 rounded-sm text-xs uppercase tracking-widest font-medium transition text-left cursor-pointer ${
                  activeTab === 'addresses'
                    ? 'bg-stone-900 text-white shadow-sm'
                    : 'text-stone-700 hover:bg-stone-100'
                }`}
              >
                <span>Adreslerim</span>
              </button>

              <div className="pt-4 border-t border-stone-200 space-y-1">
                <Link
                  href="/favorites"
                  className="w-full flex items-center space-x-3 px-5 py-3 rounded-sm text-xs uppercase tracking-widest font-medium text-stone-700 hover:bg-stone-100 transition"
                >
                  Favorilerim
                </Link>

                <Link
                  href="/cart"
                  className="w-full flex items-center space-x-3 px-5 py-3 rounded-sm text-xs uppercase tracking-widest font-medium text-stone-700 hover:bg-stone-100 transition"
                >
                  Sepetim
                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-3 px-5 py-3 rounded-sm text-xs uppercase tracking-widest font-medium text-red-600 hover:bg-red-50 transition text-left cursor-pointer"
                >
                  Çıkış Yap
                </button>
              </div>
            </aside>

            {/* Sağ İçerik */}
            <div className="lg:col-span-3">
              {/* Profil */}
              {activeTab === 'profile' && (
                <div className="bg-white border border-stone-200 rounded-sm p-8 shadow-sm space-y-6">
                  <div>
                    <h2 className="text-xs uppercase tracking-widest font-semibold text-stone-900">
                      Profil Bilgileri
                    </h2>
                    <p className="text-xs text-stone-500 mt-0.5 font-light">
                      Hesap bilgilerinizi görüntüleyin.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-stone-200">
                    <div>
                      <span className="block text-[10px] font-medium tracking-widest text-stone-400 uppercase mb-1">
                        AD SOYAD
                      </span>
                      <p className="text-xs font-medium text-stone-900">
                        {user.name || 'Belirtilmemiş'}
                      </p>
                    </div>

                    <div>
                      <span className="block text-[10px] font-medium tracking-widest text-stone-400 uppercase mb-1">
                        E-POSTA
                      </span>
                      <p className="text-xs font-medium text-stone-900">
                        {user.email}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Siparişlerim */}
              {activeTab === 'orders' && (
                <div className="space-y-6">
                  <div className="bg-white border border-stone-200 rounded-sm p-12 text-center shadow-sm">
                    {loadingOrders ? (
                      <div className="flex justify-center items-center py-12">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-stone-900" />
                      </div>
                    ) : orders.length > 0 ? (
                      <div className="space-y-4 text-left">
                        {orders.map((order) => (
                          <div
                            key={order._id || order.id}
                            className="border border-stone-200 rounded-sm p-5 flex justify-between items-center bg-stone-50/50"
                          >
                            <div>
                              <p className="text-xs font-medium text-stone-900 tracking-wider">
                                Sipariş ID: #{order._id?.slice(-6) || '---'}
                              </p>
                              <p className="text-xs text-stone-500 mt-1 font-light">
                                Toplam Tutar:{' '}
                                <span className="font-semibold text-stone-900">
                                  {order.totalPrice || order.price} ₺
                                </span>
                              </p>
                            </div>

                            <Link
                              href="/"
                              className="rounded-sm bg-stone-900 px-4 py-2 text-xs font-medium tracking-widest uppercase text-white hover:bg-stone-800 transition shadow-sm"
                            >
                              Detaylar
                            </Link>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="py-12 space-y-4">
                        <p className="text-xs uppercase tracking-wider text-stone-500">
                          Henüz siparişiniz bulunmuyor.
                        </p>
                        <Link
                          href="/products"
                          className="inline-block rounded-sm border border-stone-300 bg-stone-900 px-6 py-2.5 text-xs font-medium tracking-widest uppercase text-white hover:bg-stone-800 transition shadow-sm"
                        >
                          Alışverişe Başla
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Adreslerim */}
              {activeTab === 'addresses' && (
                <div className="space-y-6">
                  <div className="bg-white border border-stone-200 rounded-sm p-6 shadow-sm flex justify-between items-center">
                    <div>
                      <h2 className="text-xs uppercase tracking-widest font-semibold text-stone-900">
                        Adreslerim
                      </h2>
                      <p className="text-xs text-stone-500 mt-0.5 font-light">
                        Kayıtlı teslimat adreslerinizi yönetin.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={handleToggleForm}
                      className="rounded-sm bg-stone-900 hover:bg-stone-800 text-white text-xs font-medium px-4 py-2.5 uppercase tracking-widest transition shadow-sm cursor-pointer"
                    >
                      {showAddressForm ? 'İptal Et' : '+ Yeni Adres Ekle'}
                    </button>
                  </div>

                  {showAddressForm && (
                    <form
                      onSubmit={handleAddressSubmit}
                      className="bg-white border border-stone-200 rounded-sm p-6 shadow-sm space-y-4"
                    >
                      <h3 className="text-xs uppercase tracking-widest font-semibold text-stone-900">
                        {editingAddressId
                          ? 'Adresi Düzenle'
                          : 'Yeni Adres Bilgileri'}
                      </h3>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <input
                          type="text"
                          placeholder="Adres Başlığı (Örn: Ev, İş)"
                          required
                          value={newAddress.title}
                          onChange={(e) =>
                            setNewAddress({ ...newAddress, title: e.target.value })
                          }
                          className="border border-stone-200 rounded-sm px-4 py-2.5 text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:border-stone-900"
                        />

                        <input
                          type="text"
                          placeholder="Ad Soyad (Teslim alacak kişi)"
                          required
                          value={newAddress.fullName}
                          onChange={(e) =>
                            setNewAddress({ ...newAddress, fullName: e.target.value })
                          }
                          className="border border-stone-200 rounded-sm px-4 py-2.5 text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:border-stone-900"
                        />

                        <input
                          type="text"
                          placeholder="Telefon Numarası"
                          required
                          value={newAddress.phone}
                          onChange={(e) =>
                            setNewAddress({ ...newAddress, phone: e.target.value })
                          }
                          className="border border-stone-200 rounded-sm px-4 py-2.5 text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:border-stone-900"
                        />

                        <input
                          type="text"
                          placeholder="İl"
                          required
                          value={newAddress.city}
                          onChange={(e) =>
                            setNewAddress({ ...newAddress, city: e.target.value })
                          }
                          className="border border-stone-200 rounded-sm px-4 py-2.5 text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:border-stone-900"
                        />

                        <input
                          type="text"
                          placeholder="İlçe"
                          required
                          value={newAddress.district}
                          onChange={(e) =>
                            setNewAddress({ ...newAddress, district: e.target.value })
                          }
                          className="border border-stone-200 rounded-sm px-4 py-2.5 text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:border-stone-900"
                        />
                      </div>

                      <textarea
                        placeholder="Açık Adres (Mahalle, Sokak, No, Daire)"
                        required
                        rows={3}
                        value={newAddress.addressLine}
                        onChange={(e) =>
                          setNewAddress({
                            ...newAddress,
                            addressLine: e.target.value,
                          })
                        }
                        className="w-full border border-stone-200 rounded-sm px-4 py-2.5 text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:border-stone-900"
                      />

                      <button
                        type="submit"
                        className="w-full rounded-sm bg-stone-900 hover:bg-stone-800 text-white text-xs font-medium py-3 uppercase tracking-widest transition shadow-sm cursor-pointer"
                      >
                        {editingAddressId ? 'Adresi Güncelle' : 'Adresi Kaydet'}
                      </button>
                    </form>
                  )}

                  <div className="bg-white border border-stone-200 rounded-sm p-8 shadow-sm">
                    {loadingAddresses ? (
                      <div className="flex justify-center items-center py-8">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-stone-900" />
                      </div>
                    ) : addresses.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {addresses.map((addr) => (
                          <div
                            key={addr._id || addr.id}
                            className="border border-stone-200 rounded-sm p-5 relative flex flex-col justify-between space-y-3 bg-stone-50/30"
                          >
                            <div>
                              <div className="flex justify-between items-center mb-1">
                                <span className="text-[10px] font-semibold text-stone-900 bg-stone-100 px-2.5 py-1 rounded-sm uppercase tracking-wider">
                                  {addr.title}
                                </span>

                                <div className="flex items-center space-x-3 text-xs uppercase tracking-wider">
                                  <button
                                    type="button"
                                    onClick={() => handleEditClick(addr)}
                                    className="text-stone-600 hover:text-stone-900 font-medium cursor-pointer"
                                  >
                                    Düzenle
                                  </button>

                                  <button
                                    type="button"
                                    onClick={() =>
                                      setAddressToDelete(addr._id || addr.id)
                                    }
                                    className="text-red-500 hover:text-red-700 font-medium cursor-pointer"
                                  >
                                    Sil
                                  </button>
                                </div>
                              </div>

                              <p className="text-xs font-semibold text-stone-900 mt-2">
                                Alıcı: {addr.fullName}
                              </p>
                              <p className="text-xs text-stone-600 mt-1 font-light">
                                {addr.addressLine}
                              </p>
                              <p className="text-xs text-stone-500 mt-1 font-light">
                                {addr.district} / {addr.city}
                              </p>
                            </div>

                            <p className="text-[11px] text-stone-400 border-t border-stone-200 pt-2 font-light tracking-wide">
                              Tel: {addr.phone}
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="py-12 text-center space-y-4">
                        <p className="text-xs uppercase tracking-wider text-stone-500">
                          Kayıtlı bir adresiniz bulunmuyor.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Özel Silme Onay Modalı (Pop-up) */}
      {addressToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs px-4">
          <div className="bg-white border border-stone-200 rounded-sm p-6 max-w-sm w-full shadow-lg space-y-4 text-center">
            <h3 className="text-xs font-bold text-stone-900 uppercase tracking-widest">
              Adresi Sil
            </h3>
            <p className="text-xs text-stone-600 font-light leading-relaxed">
              Bu adresi silmek istediğinize emin misiniz? Bu işlem geri alınamaz.
            </p>
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setAddressToDelete(null)}
                className="flex-1 rounded-sm border border-stone-300 py-2.5 text-xs font-medium uppercase tracking-widest text-stone-700 hover:bg-stone-100 transition cursor-pointer"
              >
                Vazgeç
              </button>
              <button
                type="button"
                onClick={confirmDeleteAddress}
                className="flex-1 rounded-sm bg-red-600 py-2.5 text-xs font-medium uppercase tracking-widest text-white hover:bg-red-700 transition cursor-pointer shadow-sm"
              >
                Evet, Sil
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}