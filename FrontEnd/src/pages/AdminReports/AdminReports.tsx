
import { useEffect, useState } from 'react'
import { getAllOrdersForAdmin } from '../../api/orderApi'
import { getAllUsersForAdmin } from '../../api/userApi'
import { getProducts } from '../../api/productApi'

import type { Order } from '../../types/Order'
import type { User } from '../../types/User'
import type { Product } from '../../types/Product'

export default function AdminReports() {
    const [orders, setOrders] = useState<Order[]>([])
    const [users, setUsers] = useState<User[]>([])
    const [products, setProducts] = useState<Product[]>([])

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        async function loadReports() {
            try {
                const ordersData = await getAllOrdersForAdmin()
                setOrders(ordersData)

                const usersData = await getAllUsersForAdmin()
                setUsers(usersData)

                const productsData = await getProducts()
                setProducts(productsData)
            } catch (error) {
                setError(
                    error instanceof Error
                        ? error.message
                        : 'Rapor verileri alınamadı',
                )
            } finally {
                setLoading(false)
            }
        }

        loadReports()
    }, [])

    const totalOrders = orders.length

    const totalRevenue = orders
        .filter(
            (order) =>
                order.status !== 'CANCELLED',
        )
        .reduce(
            (total, order) =>
                total + Number(order.totalPrice),
            0,
        )

    const cancelledOrders = orders.filter(
        (order) =>
            order.status === 'CANCELLED',
    ).length

    const deliveredOrders = orders.filter(
        (order) =>
            order.status === 'DELIVERED',
    ).length

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 p-6">
                <div className="mx-auto max-w-7xl">
                    Raporlar yükleniyor...
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="mx-auto max-w-7xl">

                <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                        Raporlar
                    </h1>

                    <p className="mt-1 text-sm text-gray-500">
                        Mağazanın genel satış ve performans özeti.
                    </p>
                </div>

                {error && (
                    <div className="mt-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                        {error}
                    </div>
                )}

                <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

                    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                        <p className="text-sm text-gray-500">
                            Toplam Sipariş
                        </p>

                        <p className="mt-2 text-3xl font-bold text-gray-900">
                            {totalOrders}
                        </p>
                    </div>

                    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                        <p className="text-sm text-gray-500">
                            Toplam Ciro
                        </p>

                        <p className="mt-2 text-3xl font-bold text-gray-900">
                            {totalRevenue.toLocaleString(
                                'tr-TR',
                                {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                },
                            )}{' '}
                            ₺
                        </p>
                    </div>

                    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                        <p className="text-sm text-gray-500">
                            Toplam Kullanıcı
                        </p>

                        <p className="mt-2 text-3xl font-bold text-gray-900">
                            {users.length}
                        </p>
                    </div>

                    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                        <p className="text-sm text-gray-500">
                            Toplam Ürün
                        </p>

                        <p className="mt-2 text-3xl font-bold text-gray-900">
                            {products.length}
                        </p>
                    </div>

                </div>

                <div className="mt-6 grid gap-5 lg:grid-cols-2">

                    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                        <h2 className="text-lg font-semibold text-gray-900">
                            Sipariş Özeti
                        </h2>

                        <div className="mt-5 space-y-4">

                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">
                                    Teslim edilen
                                </span>

                                <span className="font-semibold text-gray-900">
                                    {deliveredOrders}
                                </span>
                            </div>

                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">
                                    İptal edilen
                                </span>

                                <span className="font-semibold text-gray-900">
                                    {cancelledOrders}
                                </span>
                            </div>

                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">
                                    Bekleyen / devam eden
                                </span>

                                <span className="font-semibold text-gray-900">
                                    {totalOrders -
                                        deliveredOrders -
                                        cancelledOrders}
                                </span>
                            </div>

                        </div>
                    </div>

                    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                        <h2 className="text-lg font-semibold text-gray-900">
                            Genel Durum
                        </h2>

                        <div className="mt-5 space-y-4">

                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">
                                    Aktif ürün
                                </span>

                                <span className="font-semibold text-gray-900">
                                    {
                                        products.filter(
                                            (product) =>
                                                product.active,
                                        ).length
                                    }
                                </span>
                            </div>

                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">
                                    Pasif ürün
                                </span>

                                <span className="font-semibold text-gray-900">
                                    {
                                        products.filter(
                                            (product) =>
                                                !product.active,
                                        ).length
                                    }
                                </span>
                            </div>

                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">
                                    Ortalama sipariş tutarı
                                </span>

                                <span className="font-semibold text-gray-900">
                                    {totalOrders > 0
                                        ? (
                                            totalRevenue /
                                            Math.max(
                                                orders.filter(
                                                    (order) =>
                                                        order.status !==
                                                        'CANCELLED',
                                                ).length,
                                                1,
                                            )
                                        ).toLocaleString(
                                            'tr-TR',
                                            {
                                                minimumFractionDigits: 2,
                                                maximumFractionDigits: 2,
                                            },
                                        )
                                        : '0,00'}{' '}
                                    ₺
                                </span>
                            </div>

                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}

