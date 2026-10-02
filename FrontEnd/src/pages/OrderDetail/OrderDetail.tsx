
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import type { Order } from '../../types/Order'
import { cancelOrder, getMyOrderById } from '../../api/orderApi'

export default function OrderDetail() {
    const { id } = useParams()

    const [order, setOrder] = useState<Order | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [cancelling, setCancelling] = useState(false)

    async function loadOrder() {
        if (!id) {
            setError('Sipariş bulunamadı.')
            setLoading(false)
            return
        }

        try {
            setLoading(true)
            setError('')

            const data = await getMyOrderById(Number(id))
            setOrder(data)
        } catch (err) {
            console.error('Sipariş detayı yüklenemedi:', err)

            if (err instanceof Error) {
                setError(err.message)
            } else {
                setError('Sipariş detayı yüklenemedi.')
            }
        } finally {
            setLoading(false)
        }
    }

    async function handleCancelOrder() {
    if (!order) {
        return
    }

    const confirmed = window.confirm(
        'Bu siparişi iptal etmek istediğinize emin misiniz?',
    )

    if (!confirmed) {
        return
    }

    try {
        setCancelling(true)
        setError('')

        const updatedOrder = await cancelOrder(order.id)

        setOrder(updatedOrder)
    } catch (err) {
        console.error('Sipariş iptal hatası:', err)

        if (err instanceof Error) {
            setError(err.message)
        } else {
            setError('Sipariş iptal edilemedi.')
        }
    } finally {
        setCancelling(false)
    }
}



    useEffect(() => {
        loadOrder()
    }, [id])

    if (loading) {
        return (
            <main className="min-h-screen bg-white">
                <div className="mx-auto max-w-7xl px-6 py-16">
                    <p className="text-gray-500">
                        Sipariş detayı yükleniyor...
                    </p>
                </div>
            </main>
        )
    }

    if (error) {
        return (
            <main className="min-h-screen bg-white">
                <div className="mx-auto max-w-7xl px-6 py-16">
                    <div className="rounded-xl bg-red-50 p-4 text-sm text-red-600">
                        {error}
                    </div>
                </div>
            </main>
        )
    }

    if (!order) {
        return (
            <main className="min-h-screen bg-white">
                <div className="mx-auto max-w-7xl px-6 py-16">
                    <p className="text-gray-500">
                        Sipariş bulunamadı.
                    </p>
                </div>
            </main>
        )
    }

    return (
        <main className="min-h-screen bg-white">
            <section className="border-b border-gray-100 bg-gray-50">
                <div className="mx-auto max-w-7xl px-6 py-12">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
                        Sports&Outdoor
                    </p>

                    <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-900">
                        Sipariş Detayı
                    </h1>

                    <p className="mt-4 text-gray-600">
                        {order.orderNumber}
                    </p>
                </div>
            </section>

            <section className="py-12">
                <div className="mx-auto max-w-5xl space-y-6 px-6">

                    {/* Sipariş Bilgileri */}
                    <div className="rounded-2xl border border-gray-200 p-6">
                        <h2 className="text-xl font-semibold text-gray-900">
                            Sipariş Bilgileri
                        </h2>

                        <div className="mt-6 grid gap-6 md:grid-cols-4">
                            <div>
                                <p className="text-sm text-gray-500">
                                    Sipariş No
                                </p>
                                <p className="mt-1 font-medium text-gray-900">
                                    {order.orderNumber}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-500">
                                    Tarih
                                </p>
                                <p className="mt-1 font-medium text-gray-900">
                                    {new Date(
                                        order.orderDate,
                                    ).toLocaleDateString('tr-TR')}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-500">
                                    Durum
                                </p>
                                <span className="mt-1 inline-block rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700">
                                    {order.status}
                                </span>
                            </div>

                            <div>
                                <p className="text-sm text-gray-500">
                                    Toplam
                                </p>
                                <p className="mt-1 font-semibold text-gray-900">
                                    {order.totalPrice.toLocaleString(
                                        'tr-TR',
                                        {
                                            style: 'currency',
                                            currency: 'TRY',
                                        },
                                    )}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Teslimat Adresi */}
                    <div className="rounded-2xl border border-gray-200 p-6">
                        <h2 className="text-xl font-semibold text-gray-900">
                            Teslimat Adresi
                        </h2>

                        <div className="mt-4">
                            <p className="font-medium text-gray-900">
                                {order.district} / {order.city}
                            </p>

                            <p className="mt-2 text-gray-600">
                                {order.fullAddress}
                            </p>
                        </div>
                    </div>

                    {/* Ürünler */}
                    <div className="rounded-2xl border border-gray-200 p-6">
                        <h2 className="text-xl font-semibold text-gray-900">
                            Sipariş Ürünleri
                        </h2>

                        <div className="mt-6 space-y-4">
                            {order.items.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex flex-col justify-between gap-4 rounded-xl bg-gray-50 p-5 md:flex-row md:items-center"
                                >
                                    <div>
                                        <p className="font-semibold text-gray-900">
                                            {item.productName}
                                        </p>

                                        <p className="mt-1 text-sm text-gray-500">
                                            Renk: {item.color}
                                        </p>

                                        <p className="mt-1 text-sm text-gray-500">
                                            Beden: {item.size}
                                        </p>

                                        <p className="mt-1 text-xs text-gray-400">
                                            SKU: {item.sku}
                                        </p>
                                    </div>

                                    <div className="text-sm text-gray-600">
                                        {item.quantity} adet
                                    </div>

                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Birim fiyat
                                        </p>

                                        <p className="font-medium text-gray-900">
                                            {item.unitPrice.toLocaleString(
                                                'tr-TR',
                                                {
                                                    style: 'currency',
                                                    currency: 'TRY',
                                                },
                                            )}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Toplam
                                        </p>

                                        <p className="font-semibold text-gray-900">
                                            {item.totalPrice.toLocaleString(
                                                'tr-TR',
                                                {
                                                    style: 'currency',
                                                    currency: 'TRY',
                                                },
                                            )}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Genel Toplam */}
                    <div className="flex items-center justify-between rounded-2xl bg-gray-900 p-6 text-white">
                        <span className="text-lg font-medium">
                            Sipariş Toplamı
                        </span>

                        <span className="text-2xl font-bold">
                            {order.totalPrice.toLocaleString(
                                'tr-TR',
                                {
                                    style: 'currency',
                                    currency: 'TRY',
                                },
                            )}
                        </span>
                    </div>
                </div>
                {order.status !== 'CANCELLED' &&
                    order.status !== 'SHIPPED' &&
                    order.status !== 'DELIVERED' && (
                        <div className="flex justify-end">
                            <button
                                type="button"
                                onClick={handleCancelOrder}
                                disabled={cancelling}
                                className="rounded-full border border-red-200 px-6 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {cancelling
                                    ? 'İptal Ediliyor...'
                                    : 'Siparişi İptal Et'}
                            </button>
                        </div>
                    )}
            </section>
        </main>
    )
}
