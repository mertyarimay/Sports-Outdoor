import { useEffect, useState } from 'react'
import {
    createAddress,
    deleteAddress,
    getMyAddresses,
    updateAddress,
} from '../../api/addressApi'

import type {
    Address,
    AddressRequest,
} from '../../types/Address'
export default function Profile() {
    const [addresses, setAddresses] = useState<Address[]>([])
    const [addressLoading, setAddressLoading] = useState(true)
    const [addressError, setAddressError] = useState('')

    const [showAddressForm, setShowAddressForm] = useState(false)
    const [editingAddressId, setEditingAddressId] =
        useState<number | null>(null)

    const [addressForm, setAddressForm] =
        useState<AddressRequest>({
            city: '',
            district: '',
            fullAddress: '',
            postalCode: '',
        })
    useEffect(() => {
        async function loadAddresses() {
            try {
                const data = await getMyAddresses()
                setAddresses(data)
            } catch (error) {
                setAddressError(
                    error instanceof Error
                        ? error.message
                        : 'Adresler alınamadı',
                )
            } finally {
                setAddressLoading(false)
            }
        }

        loadAddresses()
    }, [])

    function handleAddressChange(
        event: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement
        >,
    ) {
        const { name, value } = event.target

        setAddressForm((current) => ({
            ...current,
            [name]: value,
        }))
    }
    function openNewAddressForm() {
        setEditingAddressId(null)

        setAddressForm({
            city: '',
            district: '',
            fullAddress: '',
            postalCode: '',
        })

        setShowAddressForm(true)
    }
    function openEditAddress(address: Address) {
        setEditingAddressId(address.id)

        setAddressForm({
            city: address.city,
            district: address.district,
            fullAddress: address.fullAddress,
            postalCode: address.postalCode,
        })

        setShowAddressForm(true)
    }
    async function handleAddressSubmit(
        event: React.FormEvent<HTMLFormElement>,
    ) {
        event.preventDefault()

        try {
            if (editingAddressId !== null) {
                const updated = await updateAddress(
                    editingAddressId,
                    addressForm,
                )

                setAddresses((current) =>
                    current.map((address) =>
                        address.id === editingAddressId
                            ? updated
                            : address,
                    ),
                )
            } else {
                const created =
                    await createAddress(addressForm)

                setAddresses((current) => [
                    ...current,
                    created,
                ])
            }

            setShowAddressForm(false)
            setEditingAddressId(null)
        } catch (error) {
            alert(
                error instanceof Error
                    ? error.message
                    : 'Adres kaydedilemedi',
            )
        }
    }
    async function handleDeleteAddress(id: number) {
        const confirmed = window.confirm(
            'Bu adresi silmek istediğine emin misin?',
        )

        if (!confirmed) {
            return
        }

        try {
            await deleteAddress(id)

            setAddresses((current) =>
                current.filter(
                    (address) => address.id !== id,
                ),
            )
        } catch (error) {
            alert(
                error instanceof Error
                    ? error.message
                    : 'Adres silinemedi',
            )
        }
    }
    return (
        <main className="bg-gray-50">
            {/* Page Header */}
            <section className="border-b border-gray-100 bg-white">
                <div className="mx-auto max-w-7xl px-6 py-12">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
                        Hesabım
                    </p>

                    <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-900">
                        Profilim
                    </h1>

                    <p className="mt-4 text-gray-600">
                        Hesap bilgilerini ve siparişlerini buradan yönetebilirsin.
                    </p>
                </div>
            </section>

            {/* Profile Content */}
            <section className="py-12 lg:py-16">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
                        {/* Sidebar */}
                        <aside>
                            <div className="rounded-2xl border border-gray-200 bg-white p-4">
                                <nav className="space-y-1">
                                    <a
                                        href="/profile"
                                        className="block rounded-xl bg-gray-900 px-4 py-3 text-sm font-semibold text-white"
                                    >
                                        Profil Bilgileri
                                    </a>

                                    <a
                                        href="#orders"
                                        className="block rounded-xl px-4 py-3 text-sm font-medium text-gray-600 transition hover:bg-gray-100 hover:text-gray-900"
                                    >
                                        Siparişlerim
                                    </a>

                                    <a
                                        href="/cart"
                                        className="block rounded-xl px-4 py-3 text-sm font-medium text-gray-600 transition hover:bg-gray-100 hover:text-gray-900"
                                    >
                                        Sepetim
                                    </a>

                                    <a
                                        href="#favorites"
                                        className="block rounded-xl px-4 py-3 text-sm font-medium text-gray-600 transition hover:bg-gray-100 hover:text-gray-900"
                                    >
                                        Favorilerim
                                    </a>

                                    <button
                                        type="button"
                                        className="w-full rounded-xl px-4 py-3 text-left text-sm font-medium text-red-500 transition hover:bg-red-50"
                                    >
                                        Çıkış Yap
                                    </button>
                                </nav>
                            </div>
                        </aside>

                        {/* Main */}
                        <div className="space-y-8">
                            {/* Personal Information */}
                            <section className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
                                <div className="border-b border-gray-100 pb-6">
                                    <h2 className="text-xl font-semibold text-gray-900">
                                        Kişisel Bilgiler
                                    </h2>

                                    <p className="mt-2 text-sm text-gray-500">
                                        Hesabına ait temel bilgileri güncelle.
                                    </p>
                                </div>

                                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                                    <div>
                                        <label
                                            htmlFor="firstName"
                                            className="text-sm font-medium text-gray-900"
                                        >
                                            Ad
                                        </label>

                                        <input
                                            id="firstName"
                                            type="text"
                                            defaultValue="Mert"
                                            className="mt-2 h-12 w-full rounded-xl border border-gray-300 px-4 text-sm outline-none transition focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
                                        />
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="lastName"
                                            className="text-sm font-medium text-gray-900"
                                        >
                                            Soyad
                                        </label>

                                        <input
                                            id="lastName"
                                            type="text"
                                            defaultValue="Kullanıcı"
                                            className="mt-2 h-12 w-full rounded-xl border border-gray-300 px-4 text-sm outline-none transition focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
                                        />
                                    </div>

                                    <div className="sm:col-span-2">
                                        <label
                                            htmlFor="email"
                                            className="text-sm font-medium text-gray-900"
                                        >
                                            E-posta
                                        </label>

                                        <input
                                            id="email"
                                            type="email"
                                            defaultValue="mert@example.com"
                                            className="mt-2 h-12 w-full rounded-xl border border-gray-300 px-4 text-sm outline-none transition focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
                                        />
                                    </div>
                                </div>

                                <div className="mt-6 flex justify-end">
                                    <button
                                        type="button"
                                        className="rounded-full bg-gray-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-700"
                                    >
                                        Bilgileri Güncelle
                                    </button>
                                </div>
                            </section>

                            <section className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
                                <div
                                    className="flex flex-col gap-4 border-b border-gray-100 pb-6 sm:flex-row sm:items-center sm:justify-between">
                                    <div>
                                        <h2 className="text-xl font-semibold text-gray-900">
                                            Adreslerim
                                        </h2>

                                        <p className="mt-2 text-sm text-gray-500">
                                            Teslimat adreslerini buradan yönetebilirsin.
                                        </p>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={openNewAddressForm}
                                        className="rounded-full bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-700"
                                    >
                                        + Yeni Adres
                                    </button>
                                </div>

                                {addressError && (
                                    <div className="mt-5 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
                                        {addressError}
                                    </div>
                                )}

                                {addressLoading ? (
                                    <div className="mt-6 text-sm text-gray-500">
                                        Adresler yükleniyor...
                                    </div>
                                ) : addresses.length === 0 ? (
                                    <div
                                        className="mt-6 rounded-xl border border-dashed border-gray-300 p-8 text-center">
                                        <p className="text-sm text-gray-500">
                                            Henüz kayıtlı adresin bulunmuyor.
                                        </p>

                                        <button
                                            type="button"
                                            onClick={openNewAddressForm}
                                            className="mt-4 rounded-full bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white"
                                        >
                                            İlk Adresini Ekle
                                        </button>
                                    </div>
                                ) : (
                                    <div className="mt-6 grid gap-4 md:grid-cols-2">
                                        {addresses.map((address) => (
                                            <div
                                                key={address.id}
                                                className="rounded-xl border border-gray-200 p-5"
                                            >
                                                <div className="flex items-start justify-between gap-4">
                                                    <div>
                                                        <p className="font-semibold text-gray-900">
                                                            {address.city}
                                                        </p>

                                                        <p className="mt-1 text-sm text-gray-500">
                                                            {address.district}
                                                        </p>
                                                    </div>
                                                </div>

                                                <p className="mt-4 text-sm leading-6 text-gray-600">
                                                    {address.fullAddress}
                                                </p>

                                                <p className="mt-2 text-sm text-gray-500">
                                                    Posta Kodu: {address.postalCode}
                                                </p>

                                                <div className="mt-5 flex gap-2 border-t border-gray-100 pt-4">
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            openEditAddress(address)
                                                        }
                                                        className="rounded-full border border-gray-300 px-4 py-2 text-xs font-semibold text-gray-900 transition hover:bg-gray-100"
                                                    >
                                                        Düzenle
                                                    </button>

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            handleDeleteAddress(address.id)
                                                        }
                                                        className="rounded-full border border-red-200 px-4 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-50"
                                                    >
                                                        Sil
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </section>
                            {showAddressForm && (
                                <section className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
                                    <div className="border-b border-gray-100 pb-6">
                                        <h2 className="text-xl font-semibold text-gray-900">
                                            {editingAddressId !== null
                                                ? 'Adresi Düzenle'
                                                : 'Yeni Adres'}
                                        </h2>
                                    </div>

                                    <form
                                        onSubmit={handleAddressSubmit}
                                        className="mt-6 space-y-5"
                                    >
                                        <div className="grid gap-5 sm:grid-cols-2">
                                            <div>
                                                <label className="text-sm font-medium text-gray-900">
                                                    Şehir
                                                </label>

                                                <input
                                                    name="city"
                                                    value={addressForm.city}
                                                    onChange={handleAddressChange}
                                                    required
                                                    className="mt-2 h-12 w-full rounded-xl border border-gray-300 px-4 text-sm outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
                                                />
                                            </div>

                                            <div>
                                                <label className="text-sm font-medium text-gray-900">
                                                    İlçe
                                                </label>

                                                <input
                                                    name="district"
                                                    value={addressForm.district}
                                                    onChange={handleAddressChange}
                                                    required
                                                    className="mt-2 h-12 w-full rounded-xl border border-gray-300 px-4 text-sm outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
                                                />
                                            </div>

                                            <div className="sm:col-span-2">
                                                <label className="text-sm font-medium text-gray-900">
                                                    Açık Adres
                                                </label>

                                                <textarea
                                                    name="fullAddress"
                                                    value={addressForm.fullAddress}
                                                    onChange={handleAddressChange}
                                                    required
                                                    rows={4}
                                                    className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
                                                />
                                            </div>

                                            <div>
                                                <label className="text-sm font-medium text-gray-900">
                                                    Posta Kodu
                                                </label>

                                                <input
                                                    name="postalCode"
                                                    value={addressForm.postalCode}
                                                    onChange={handleAddressChange}
                                                    required
                                                    className="mt-2 h-12 w-full rounded-xl border border-gray-300 px-4 text-sm outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
                                                />
                                            </div>
                                        </div>

                                        <div className="flex justify-end gap-3">
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setShowAddressForm(false)
                                                    setEditingAddressId(null)
                                                }}
                                                className="rounded-full border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-700"
                                            >
                                                İptal
                                            </button>

                                            <button
                                                type="submit"
                                                className="rounded-full bg-gray-900 px-6 py-2.5 text-sm font-semibold text-white hover:bg-gray-700"
                                            >
                                                {editingAddressId !== null
                                                    ? 'Adresi Güncelle'
                                                    : 'Adresi Kaydet'}
                                            </button>
                                        </div>
                                    </form>
                                </section>
                            )}

                            {/* Recent Orders */}
                            <section
                                id="orders"
                                className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8"
                            >
                                <div className="flex items-center justify-between border-b border-gray-100 pb-6">
                                    <div>
                                        <h2 className="text-xl font-semibold text-gray-900">
                                            Son Siparişler
                                        </h2>

                                        <p className="mt-2 text-sm text-gray-500">
                                            Son siparişlerini görüntüle.
                                        </p>
                                    </div>

                                    <span className="hidden text-sm font-medium text-gray-500 sm:block">
                    2 sipariş
                  </span>
                                </div>

                                <div className="mt-6 space-y-4">
                                    {/* Order 1 */}
                                    <div className="rounded-xl border border-gray-200 p-5">
                                        <div
                                            className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                            <div>
                                                <p className="text-sm font-semibold text-gray-900">
                                                    #ORD-2026-001
                                                </p>

                                                <p className="mt-1 text-xs text-gray-500">
                                                    12 Ağustos 2026
                                                </p>
                                            </div>

                                            <span
                                                className="w-fit rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                        Teslim Edildi
                      </span>
                                        </div>

                                        <div
                                            className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
                      <span className="text-sm text-gray-500">
                        2 ürün
                      </span>

                                            <span className="text-sm font-bold text-gray-900">
                        9.497 TL
                      </span>
                                        </div>
                                    </div>

                                    {/* Order 2 */}
                                    <div className="rounded-xl border border-gray-200 p-5">
                                        <div
                                            className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                            <div>
                                                <p className="text-sm font-semibold text-gray-900">
                                                    #ORD-2026-002
                                                </p>

                                                <p className="mt-1 text-xs text-gray-500">
                                                    5 Ağustos 2026
                                                </p>
                                            </div>

                                            <span
                                                className="w-fit rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
                        Hazırlanıyor
                      </span>
                                        </div>

                                        <div
                                            className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
                      <span className="text-sm text-gray-500">
                        1 ürün
                      </span>

                                            <span className="text-sm font-bold text-gray-900">
                        4.299 TL
                      </span>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Security */}
                            <section className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-900">
                                        Hesap Güvenliği
                                    </h2>

                                    <p className="mt-2 text-sm text-gray-500">
                                        Hesabının güvenlik ayarlarını yönet.
                                    </p>
                                </div>

                                <div
                                    className="mt-6 flex flex-col gap-4 rounded-xl bg-gray-50 p-5 sm:flex-row sm:items-center sm:justify-between">
                                    <div>
                                        <p className="text-sm font-semibold text-gray-900">
                                            Şifre
                                        </p>

                                        <p className="mt-1 text-sm text-gray-500">
                                            Şifreni düzenli olarak güncellemeni öneriyoruz.
                                        </p>
                                    </div>

                                    <button
                                        type="button"
                                        className="w-fit rounded-full border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-gray-900 transition hover:bg-gray-100"
                                    >
                                        Şifreyi Değiştir
                                    </button>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}