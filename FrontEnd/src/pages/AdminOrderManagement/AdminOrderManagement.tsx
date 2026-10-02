
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAllOrdersForAdmin } from '../../api/orderApi'
import type { Order } from '../../types/Order'

function AdminOrderManagement() {
    const navigate = useNavigate()

    const [orders, setOrders] = useState<Order[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        async function loadOrders() {
            try {
                setLoading(true)
                setError('')

                const data = await getAllOrdersForAdmin()
                setOrders(data)
            } catch (err) {
                console.error('Admin siparişleri alınamadı:', err)

                if (err instanceof Error) {
                    setError(err.message)
                } else {
                    setError('Siparişler alınamadı.')
                }
            } finally {
                setLoading(false)
            }
        }

        loadOrders()
    }, [])

    function getStatusLabel(status: Order['status']) {
        switch (status) {
            case 'PENDING':
                return 'Bekliyor'
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
                return 'bg-purple-100 text-purple-700'
            case 'SHIPPED':
                return 'bg-indigo-100 text-indigo-700'
            case 'DELIVERED':
                return 'bg-green-100 text-green-700'
            case 'CANCELLED':
                return 'bg-red-100 text-red-700'
            default:
                return 'bg-gray-100 text-gray-700'
        }
    }

    function formatDate(date: string) {
        return new Date(date).toLocaleString('tr-TR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        })
    }

    function formatPrice(price: number) {
        return new Intl.NumberFormat('tr-TR', {
            style: 'currency',
            currency: 'TRY',
        }).format(price)
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 p-8">
                <div className="mx-auto max-w-7xl">
                    <h1 className="mb-6 text-3xl font-bold text-gray-900">
                        Sipariş Yönetimi
                    </h1>

                    <div className="rounded-xl bg-white p-8 text-center shadow">
                        <p className="text-gray-500">
                            Siparişler yükleniyor...
                        </p>
                    </div>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 p-8">
                <div className="mx-auto max-w-7xl">
                    <h1 className="mb-6 text-3xl font-bold text-gray-900">
                        Sipariş Yönetimi
                    </h1>

                    <div className="rounded-xl bg-white p-8 text-center shadow">
                        <p className="mb-4 text-red-600">{error}</p>

                        <button
                            onClick={() => window.location.reload()}
                            className="rounded-lg bg-black px-5 py-2 text-white hover:bg-gray-800"
                        >
                            Tekrar Dene
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="mx-auto max-w-7xl">
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            Sipariş Yönetimi
                        </h1>

                        <p className="mt-1 text-gray-500">
                            Sistemdeki tüm siparişleri görüntüle
                        </p>
                    </div>

                    <button
                        onClick={() => navigate('/admin')}
                        className="rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100"
                    >
                        ← Admin Paneli
                    </button>
                </div>

                <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div className="rounded-xl bg-white p-5 shadow">
                        <p className="text-sm text-gray-500">
                            Toplam Sipariş
                        </p>

                        <p className="mt-1 text-2xl font-bold text-gray-900">
                            {orders.length}
                        </p>
                    </div>

                    <div className="rounded-xl bg-white p-5 shadow">
                        <p className="text-sm text-gray-500">
                            Aktif Sipariş
                        </p>

                        <p className="mt-1 text-2xl font-bold text-gray-900">
                            {
                                orders.filter(
                                    (order) =>
                                        order.status !== 'DELIVERED' &&
                                        order.status !== 'CANCELLED',
                                ).length
                            }
                        </p>
                    </div>

                    <div className="rounded-xl bg-white p-5 shadow">
                        <p className="text-sm text-gray-500">
                            Tamamlanan Sipariş
                        </p>

                        <p className="mt-1 text-2xl font-bold text-gray-900">
                            {
                                orders.filter(
                                    (order) =>
                                        order.status === 'DELIVERED',
                                ).length
                            }
                        </p>
                    </div>
                </div>

                <div className="overflow-hidden rounded-xl bg-white shadow">
                    {orders.length === 0 ? (
                        <div className="p-10 text-center">
                            <p className="text-gray-500">
                                Henüz sipariş bulunmuyor.
                            </p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="border-b bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                                            Sipariş No
                                        </th>

                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                                            Müşteri
                                        </th>

                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                                            Tarih
                                        </th>

                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                                            Tutar
                                        </th>

                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                                            Durum
                                        </th>

                                        <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">
                                            İşlem
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-gray-100">
                                    {orders.map((order) => (
                                        <tr
                                            key={order.id}
                                            className="hover:bg-gray-50"
                                        >
                                            <td className="px-6 py-4">
                                                <span className="font-medium text-gray-900">
                                                    {order.orderNumber}
                                                </span>
                                            </td>

                                            <td className="px-6 py-4">
                                                <div>
                                                    <p className="font-medium text-gray-900">
                                                        {order.userEmail}
                                                    </p>

                                                    <p className="text-sm text-gray-500">
                                                        Kullanıcı #{order.userId}
                                                    </p>
                                                </div>
                                            </td>

                                            <td className="px-6 py-4 text-sm text-gray-600">
                                                {formatDate(order.orderDate)}
                                            </td>

                                            <td className="px-6 py-4">
                                                <span className="font-semibold text-gray-900">
                                                    {formatPrice(
                                                        order.totalPrice,
                                                    )}
                                                </span>
                                            </td>

                                            <td className="px-6 py-4">
                                                <span
                                                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass(
                                                        order.status,
                                                    )}`}
                                                >
                                                    {getStatusLabel(
                                                        order.status,
                                                    )}
                                                </span>
                                            </td>

                                            <td className="px-6 py-4 text-right">
                                                <button
                                                    onClick={() =>
                                                        navigate(
                                                            `/admin/orders/${order.id}`,
                                                        )
                                                    }
                                                    className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
                                                >
                                                    Detay
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default AdminOrderManagement

