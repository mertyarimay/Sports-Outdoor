
import { useEffect, useState } from 'react'
import { getMyOrders } from '../../api/orderApi'
import type { Order } from '../../types/Order'

export default function Orders() {
    const [orders, setOrders] = useState<Order[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    async function loadOrders() {
        try {
            setLoading(true)
            setError('')

            const data = await getMyOrders()
            setOrders(data)
        } catch (err) {
            console.error('Siparişler yüklenemedi:', err)

            if (err instanceof Error) {
                setError(err.message)
            } else {
                setError('Siparişler yüklenemedi.')
            }
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadOrders()
    }, [])

    if (loading) {
        return (
            <main className="min-h-screen bg-white">
                <div className="mx-auto max-w-7xl px-6 py-16">
                    <p className="text-gray-500">
                        Siparişler yükleniyor...
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
                        Siparişlerim
                    </h1>

                    <p className="mt-4 text-gray-600">
                        Geçmiş siparişlerinizi buradan görüntüleyebilirsiniz.
                    </p>
                </div>
            </section>

            <section className="py-12">
                <div className="mx-auto max-w-7xl px-6">
                    {error && (
                        <div className="rounded-xl bg-red-50 p-4 text-sm text-red-600">
                            {error}
                        </div>
                    )}

                    {!error && orders.length === 0 && (
                        <div className="rounded-2xl border border-gray-200 p-10 text-center">
                            <h2 className="text-xl font-semibold text-gray-900">
                                Henüz siparişiniz bulunmuyor.
                            </h2>

                            <p className="mt-2 text-gray-500">
                                Verdiğiniz siparişler burada görünecek.
                            </p>
                        </div>
                    )}

                    <div className="space-y-6">
                        {orders.map((order) => (
                            <div
                                key={order.id}
                                className="rounded-2xl border border-gray-200 bg-white p-6"
                            >
                                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Sipariş No
                                        </p>

                                        <p className="mt-1 text-lg font-semibold text-gray-900">
                                            {order.orderNumber}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Tarih
                                        </p>

                                        <p className="mt-1 text-sm text-gray-900">
                                            {new Date(
                                                order.orderDate,
                                            ).toLocaleDateString('tr-TR')}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Toplam
                                        </p>

                                        <p className="mt-1 text-lg font-semibold text-gray-900">
                                            {order.totalPrice.toLocaleString(
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
                                            Durum
                                        </p>

                                        <span className="mt-1 inline-block rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700">
                                            {order.status}
                                        </span>
                                    </div>
                                </div>

                                <div className="mt-6 border-t border-gray-100 pt-6">
                                    <p className="text-sm font-medium text-gray-700">
                                        Teslimat Adresi
                                    </p>

                                    <p className="mt-2 text-sm text-gray-600">
                                        {order.fullAddress}
                                    </p>

                                    <p className="mt-1 text-sm text-gray-500">
                                        {order.district} / {order.city}
                                    </p>
                                </div>

                                <div className="mt-6 border-t border-gray-100 pt-6">
                                    <p className="text-sm font-medium text-gray-700">
                                        Ürünler
                                    </p>

                                    <div className="mt-4 space-y-3">
                                        {order.items.map((item) => (
                                            <div
                                                key={item.id}
                                                className="flex flex-col justify-between gap-2 rounded-xl bg-gray-50 p-4 md:flex-row md:items-center"
                                            >
                                                <div>
                                                    <p className="font-medium text-gray-900">
                                                        {item.productName}
                                                    </p>

                                                    <p className="mt-1 text-sm text-gray-500">
                                                        {item.color} / {item.size}
                                                    </p>

                                                    <p className="mt-1 text-xs text-gray-400">
                                                        SKU: {item.sku}
                                                    </p>
                                                </div>

                                                <div className="text-sm text-gray-600">
                                                    {item.quantity} adet
                                                </div>

                                                <div className="font-medium text-gray-900">
                                                    {item.totalPrice.toLocaleString(
                                                        'tr-TR',
                                                        {
                                                            style: 'currency',
                                                            currency: 'TRY',
                                                        },
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    )
}

