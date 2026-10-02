import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAllOrdersForAdmin } from '../../api/orderApi'
import type { Order } from '../../types/Order'


export default function Admin() {
    const [orders, setOrders] = useState<Order[]>([])
    const navigate = useNavigate()
    const [loadingOrders, setLoadingOrders] = useState(true)
    const [orderError, setOrderError] = useState('')

    useEffect(() => {
        async function loadOrders() {
            try {
                setLoadingOrders(true)
                setOrderError('')

                const data = await getAllOrdersForAdmin()
                setOrders(data)
            } catch (err) {
                console.error('Admin siparişleri yüklenemedi:', err)

                if (err instanceof Error) {
                    setOrderError(err.message)
                } else {
                    setOrderError('Siparişler yüklenemedi.')
                }
            } finally {
                setLoadingOrders(false)
            }
        }

        loadOrders()
    }, [])

    const recentOrders = orders.slice(0, 3)

    function getStatusLabel(status: Order['status']) {
        switch (status) {
            case 'PENDING':
                return 'Beklemede'
            case 'PAID':
                return 'Ödendi'
            case 'PREPARING':
                return 'Hazırlanıyor'
            case 'SHIPPED':
                return 'Kargoda'
            case 'DELIVERED':
                return 'Teslim Edildi'
            case 'CANCELLED':
                return 'İptal Edildi'
            default:
                return status
        }
    }

    function getStatusClass(status: Order['status']) {
        switch (status) {
            case 'PENDING':
                return 'bg-yellow-100 text-yellow-700'
            case 'PAID':
                return 'bg-blue-100 text-blue-700'
            case 'PREPARING':
                return 'bg-yellow-100 text-yellow-700'
            case 'SHIPPED':
                return 'bg-blue-100 text-blue-700'
            case 'DELIVERED':
                return 'bg-green-100 text-green-700'
            case 'CANCELLED':
                return 'bg-red-100 text-red-700'
            default:
                return 'bg-gray-100 text-gray-700'
        }
    }

    function formatPrice(price: number) {
        return new Intl.NumberFormat('tr-TR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(price)
    }

    function formatDate(date: string) {
        return new Date(date).toLocaleDateString('tr-TR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        })
    }

    return (
        <main className="min-h-screen bg-gray-50">
            {/* Header */}
            <section className="border-b border-gray-200 bg-white">
                <div className="mx-auto max-w-7xl px-6 py-10">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
                        Sports&Outdoor
                    </p>

                    <div className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                                Admin Paneli
                            </h1>

                            <p className="mt-3 text-gray-600">
                                Mağazanı ve ürünlerini buradan yönetebilirsin.
                            </p>
                        </div>

                        <span className="w-fit rounded-full bg-gray-900 px-4 py-2 text-xs font-semibold text-white">
                            ADMIN
                        </span>
                    </div>
                </div>
            </section>

            {/* Dashboard */}
            <section className="py-10">
                <div className="mx-auto max-w-7xl px-6">
                    {/* Statistics */}
                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                        <div className="rounded-2xl border border-gray-200 bg-white p-6">
                            <p className="text-sm text-gray-500">
                                Toplam Ürün
                            </p>

                            <p className="mt-3 text-3xl font-bold text-gray-900">
                                128
                            </p>

                            <p className="mt-2 text-xs text-green-600">
                                +12 bu ay
                            </p>
                        </div>

                        <div className="rounded-2xl border border-gray-200 bg-white p-6">
                            <p className="text-sm text-gray-500">
                                Siparişler
                            </p>

                            <p className="mt-3 text-3xl font-bold text-gray-900">
                                {orders.length}
                            </p>

                            <p className="mt-2 text-xs text-green-600">
                                Gerçek sipariş sayısı
                            </p>
                        </div>

                        <div className="rounded-2xl border border-gray-200 bg-white p-6">
                            <p className="text-sm text-gray-500">
                                Müşteriler
                            </p>

                            <p className="mt-3 text-3xl font-bold text-gray-900">
                                1.248
                            </p>

                            <p className="mt-2 text-xs text-green-600">
                                +56 yeni müşteri
                            </p>
                        </div>

                        <div className="rounded-2xl border border-gray-200 bg-white p-6">
                            <p className="text-sm text-gray-500">
                                Toplam Satış
                            </p>

                            <p className="mt-3 text-3xl font-bold text-gray-900">
                                {formatPrice(
                                    orders.reduce(
                                        (total, order) =>
                                            total + Number(order.totalPrice),
                                        0,
                                    ),
                                )}{' '}
                                TL
                            </p>

                            <p className="mt-2 text-xs text-green-600">
                                Gerçek sipariş toplamı
                            </p>
                        </div>
                    </div>

                    {/* Main Grid */}
                    <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px]">
                        {/* Recent Orders */}
                        <section className="rounded-2xl border border-gray-200 bg-white">
                            <div className="flex items-center justify-between border-b border-gray-100 p-6">
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-900">
                                        Son Siparişler
                                    </h2>

                                    <p className="mt-1 text-sm text-gray-500">
                                        Son verilen siparişleri görüntüle.
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => navigate('/admin/orders')}
                                    className="text-sm font-semibold text-gray-900 underline underline-offset-4"
                                >
                                    Tümünü Gör
                                </button>

                            </div>

                            {loadingOrders && (
                                <div className="p-6 text-sm text-gray-500">
                                    Siparişler yükleniyor...
                                </div>
                            )}

                            {!loadingOrders && orderError && (
                                <div className="p-6 text-sm text-red-600">
                                    {orderError}
                                </div>
                            )}

                            {!loadingOrders &&
                                !orderError &&
                                recentOrders.length === 0 && (
                                    <div className="p-6 text-sm text-gray-500">
                                        Henüz sipariş bulunmuyor.
                                    </div>
                                )}

                            {!loadingOrders &&
                                !orderError &&
                                recentOrders.length > 0 && (
                                    <div className="divide-y divide-gray-100">
                                        {recentOrders.map((order) => (
                                            <div
                                                key={order.id}
                                                className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between"
                                            >
                                                <div>
                                                    <p className="font-semibold text-gray-900">
                                                        #{order.orderNumber}
                                                    </p>

                                                    <p className="mt-1 text-sm text-gray-500">
                                                        {order.userEmail}
                                                    </p>

                                                    <p className="mt-1 text-xs text-gray-400">
                                                        {formatDate(order.orderDate)}
                                                    </p>
                                                </div>

                                                <span
                                                    className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass(
                                                        order.status,
                                                    )}`}
                                                >
                                                    {getStatusLabel(order.status)}
                                                </span>

                                                <p className="font-semibold text-gray-900">
                                                    {formatPrice(
                                                        Number(order.totalPrice),
                                                    )}{' '}
                                                    TL
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                        </section>

                        {/* Quick Actions */}
                        <aside>
                            <div className="rounded-2xl border border-gray-200 bg-white p-6">
                                <h2 className="text-xl font-semibold text-gray-900">
                                    Hızlı İşlemler
                                </h2>

                                <div className="mt-5 space-y-3">
                                    <button
                                        type="button"
                                        className="w-full rounded-xl bg-gray-900 px-5 py-3 text-left text-sm font-semibold text-white transition hover:bg-gray-700"
                                    >
                                        + Yeni Ürün
                                    </button>

                                    <button
                                        type="button"
                                        className="w-full rounded-xl border border-gray-200 px-5 py-3 text-left text-sm font-semibold text-gray-700 transition hover:border-gray-900 hover:text-gray-900"
                                    >
                                        Kategorileri Yönet
                                    </button>

                                    <button
                                        type="button"
                                        className="w-full rounded-xl border border-gray-200 px-5 py-3 text-left text-sm font-semibold text-gray-700 transition hover:border-gray-900 hover:text-gray-900"
                                    >
                                        Markaları Yönet
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => navigate('/admin/orders')}
                                        className="w-full rounded-xl border border-gray-200 px-5 py-3 text-left text-sm font-semibold text-gray-700 transition hover:border-gray-900 hover:text-gray-900"
                                    >
                                        Siparişleri Yönet
                                    </button>
                                </div>
                            </div>

                            {/* Stock Alert */}
                            <div className="mt-6 rounded-2xl border border-red-100 bg-red-50 p-6">
                                <p className="text-sm font-semibold text-red-700">
                                ⚠ Düşük Stok Uyarısı
                                </p>

                                <p className="mt-2 text-sm leading-6 text-red-600">
                                    7 ürünün stok miktarı kritik seviyenin altında.
                                </p>

                                <button
                                    type="button"
                                    className="mt-4 text-sm font-semibold text-red-700 underline underline-offset-4"
                                >
                                    Stokları Görüntüle
                                </button>
                            </div>
                        </aside>
                    </div>

                    {/* Management Cards */}
                    <section className="mt-8">
                        <h2 className="text-xl font-semibold text-gray-900">
                            Yönetim
                        </h2>

                        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                            <button
                                type="button"
                                onClick={() => navigate('/admin/products')}
                                className="rounded-2xl border border-gray-200 bg-white p-6 text-left transition hover:-translate-y-1 hover:shadow-md"
                            >
                                <span className="text-2xl">📦</span>

                                <h3 className="mt-4 font-semibold text-gray-900">
                                    Ürünler
                                </h3>

                                <p className="mt-1 text-sm text-gray-500">
                                    Ürün ekle, düzenle veya sil.
                                </p>
                            </button>

                            <button
                                type="button"
                                onClick={() => navigate('/admin/categories')}
                                className="rounded-2xl border border-gray-200 bg-white p-6 text-left transition hover:-translate-y-1 hover:shadow-md"
                            >
                                <span className="text-2xl">🏷️</span>

                                <h3 className="mt-4 font-semibold text-gray-900">
                                    Kategoriler
                                </h3>

                                <p className="mt-1 text-sm text-gray-500">
                                    Kategori yapısını yönet.
                                </p>
                            </button>

                            <button
                                type="button"
                                onClick={() => navigate('/admin/users')}
                                className="rounded-2xl border border-gray-200 bg-white p-6 text-left transition hover:-translate-y-1 hover:shadow-md"
                            >
                                <span className="text-2xl">👥</span>

                                <h3 className="mt-4 font-semibold text-gray-900">
                                    Kullanıcılar
                                </h3>

                                <p className="mt-1 text-sm text-gray-500">
                                    Müşterileri görüntüle.
                                </p>
                            </button>
                            <button
                                type="button"
                                onClick={() => navigate('/admin/reports')}
                                className="rounded-2xl border border-gray-200 bg-white p-6 text-left transition hover:-translate-y-1 hover:shadow-md"
                            >
                                <span className="text-2xl">📊</span>

                                <h3 className="mt-4 font-semibold text-gray-900">
                                    Raporlar
                                </h3>

                                <p className="mt-1 text-sm text-gray-500">
                                    Satış ve performans raporları.
                                </p>
                            </button>
                        </div>
                    </section>
                </div>
            </section>
        </main>
    )
}

