
import { useEffect, useState } from 'react'

import { getMyAddresses } from '../../api/addressApi'
import type { Address } from '../../types/Address'

import { getMyCartItems } from '../../api/cartItemApi'
import type { CartItem } from '../../types/CartItem'

import { createOrder } from '../../api/orderApi'
import type { Order } from '../../types/Order'

import { useNavigate } from 'react-router-dom'

export default function Checkout() {
    const [addresses, setAddresses] = useState<Address[]>([])
    const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null)

    const [cartItems, setCartItems] = useState<CartItem[]>([])

    const [loading, setLoading] = useState(true)
    const [creatingOrder, setCreatingOrder] = useState(false)

    const [error, setError] = useState('')
    const [orderSuccess, setOrderSuccess] = useState('')
    const navigate = useNavigate()

    async function loadCheckoutData() {
        try {
            setLoading(true)
            setError('')
            setOrderSuccess('')

            // Adresleri getir
            const addressData = await getMyAddresses()

            setAddresses(addressData)

            if (addressData.length > 0) {
                setSelectedAddressId(addressData[0].id)
            }

            // Sepet ürünlerini getir
            const cartData = await getMyCartItems()

            setCartItems(cartData)

        } catch (err) {
            console.error('Checkout yükleme hatası:', err)

            setError('Checkout bilgileri yüklenemedi.')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadCheckoutData()
    }, [])
    async function handleCreateOrder() {
        if (selectedAddressId === null) {
            setError('Lütfen bir teslimat adresi seçin.')
            return
        }

        if (cartItems.length === 0) {
            setError('Sepetiniz boş.')
            return
        }

        try {
            setCreatingOrder(true)
            setError('')

            const order: Order = await createOrder(selectedAddressId)

            console.log('Oluşturulan sipariş:', order)

            navigate(`/payment/${order.id}`)

        } catch (err) {
            console.error('Sipariş oluşturma hatası:', err)

            if (err instanceof Error) {
                setError(err.message)
            } else {
                setError('Sipariş oluşturulamadı.')
            }
        } finally {
            setCreatingOrder(false)
        }
    }

    // Frontend'de sadece görüntüleme amacıyla toplam hesaplıyoruz.
    const totalPrice = cartItems.reduce((total, item) => {
        const unitPrice =
            item.discountPrice !== null &&
            item.discountPrice !== undefined
                ? item.discountPrice
                : item.price

        return total + unitPrice * item.quantity
    }, 0)

    if (loading) {
        return (
            <main className="min-h-screen bg-white">
                <div className="mx-auto max-w-7xl px-6 py-16">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Siparişi Tamamla
                    </h1>

                    <p className="mt-4 text-gray-500">
                        Bilgiler yükleniyor...
                    </p>
                </div>
            </main>
        )
    }

    return (
        <main className="min-h-screen bg-white">

            {/* Header */}
            <section className="border-b border-gray-100 bg-gray-50">
                <div className="mx-auto max-w-7xl px-6 py-12">

                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
                        Sports&Outdoor
                    </p>

                    <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-900">
                        Siparişi Tamamla
                    </h1>

                    <p className="mt-4 text-gray-600">
                        Teslimat adresini ve sipariş bilgilerini kontrol et.
                    </p>

                </div>
            </section>

            {/* Error */}
            {error && (
                <section className="mx-auto max-w-7xl px-6 pt-8">
                    <div className="rounded-2xl bg-red-50 p-4 text-sm text-red-600">
                        {error}
                    </div>
                </section>
            )}

            {/* Success */}
            {orderSuccess && (
                <section className="mx-auto max-w-7xl px-6 pt-8">
                    <div className="rounded-2xl bg-green-50 p-4 text-sm text-green-700">
                        {orderSuccess}
                    </div>
                </section>
            )}

            {/* Address */}
            <section className="py-12">
                <div className="mx-auto max-w-7xl px-6">

                    <h2 className="text-xl font-semibold text-gray-900">
                        Teslimat Adresi
                    </h2>

                    {addresses.length === 0 ? (

                        <div className="mt-6 rounded-2xl border border-gray-200 p-6">
                            <p className="text-gray-500">
                                Kayıtlı adresin bulunmuyor.
                            </p>
                        </div>

                    ) : (

                        <div className="mt-6 grid gap-4 md:grid-cols-2">

                            {addresses.map((address) => (

                                <button
                                    key={address.id}
                                    type="button"
                                    onClick={() =>
                                        setSelectedAddressId(address.id)
                                    }
                                    className={`rounded-2xl border p-5 text-left transition ${
                                        selectedAddressId === address.id
                                            ? 'border-gray-900 bg-gray-50'
                                            : 'border-gray-200 bg-white hover:border-gray-400'
                                    }`}
                                >

                                    <div className="flex items-start justify-between gap-4">

                                        <div>

                                            <p className="font-semibold text-gray-900">
                                                {address.city} / {address.district}
                                            </p>

                                            <p className="mt-2 text-sm leading-6 text-gray-500">
                                                {address.fullAddress}
                                            </p>

                                            <p className="mt-2 text-sm text-gray-500">
                                                Posta Kodu: {address.postalCode}
                                            </p>

                                        </div>

                                        {selectedAddressId === address.id && (
                                            <span className="text-sm font-semibold text-gray-900">
                                                ✓ Seçildi
                                            </span>
                                        )}

                                    </div>

                                </button>

                            ))}

                        </div>

                    )}

                </div>
            </section>

            {/* Cart Summary */}
            <section className="border-t border-gray-100 py-12">
                <div className="mx-auto max-w-7xl px-6">

                    <h2 className="text-xl font-semibold text-gray-900">
                        Sipariş Özeti
                    </h2>

                    {cartItems.length === 0 ? (

                        <div className="mt-6 rounded-2xl border border-gray-200 p-6">
                            <p className="text-gray-500">
                                Sepetinizde ürün bulunmuyor.
                            </p>
                        </div>

                    ) : (

                        <>
                            <div className="mt-6 space-y-4">

                                {cartItems.map((item) => {

                                    const unitPrice =
                                        item.discountPrice !== null &&
                                        item.discountPrice !== undefined
                                            ? item.discountPrice
                                            : item.price

                                    const itemTotal =
                                        unitPrice * item.quantity

                                    return (
                                        <div
                                            key={item.id}
                                            className="flex items-center justify-between rounded-2xl border border-gray-200 p-4"
                                        >

                                            <div>
                                                <p className="font-semibold text-gray-900">
                                                    {item.productName}
                                                </p>

                                                <p className="mt-1 text-sm text-gray-500">
                                                    {item.color} / {item.size}
                                                </p>

                                                <p className="mt-1 text-sm text-gray-500">
                                                    Adet: {item.quantity}
                                                </p>
                                            </div>

                                            <p className="font-semibold text-gray-900">
                                                {itemTotal.toLocaleString('tr-TR', {
                                                    minimumFractionDigits: 2,
                                                    maximumFractionDigits: 2,
                                                })}{' '}
                                                TL
                                            </p>

                                        </div>
                                    )
                                })}

                            </div>

                            {/* Total */}
                            <div className="mt-8 flex items-center justify-between border-t border-gray-200 pt-6">

                                <span className="text-lg font-semibold text-gray-900">
                                    Toplam
                                </span>

                                <span className="text-2xl font-bold text-gray-900">
                                    {totalPrice.toLocaleString('tr-TR', {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    })}{' '}
                                    TL
                                </span>

                            </div>

                            {/* Create Order */}
                            <div className="mt-8 flex justify-end">

                                <button
                                    type="button"
                                    onClick={handleCreateOrder}
                                    disabled={
                                        creatingOrder ||
                                        selectedAddressId === null ||
                                        cartItems.length === 0
                                    }
                                    className="rounded-full bg-gray-900 px-8 py-4 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    {creatingOrder
                                        ? 'Sipariş Oluşturuluyor...'
                                        : 'Siparişi Oluştur'}
                                </button>

                            </div>
                        </>

                    )}

                </div>
            </section>

        </main>
    )
}

