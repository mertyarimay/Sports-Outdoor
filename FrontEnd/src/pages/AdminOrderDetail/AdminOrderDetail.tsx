import {useEffect, useState} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import {
    getOrderByIdForAdmin,
    updateOrderStatus,
} from '../../api/orderApi'
import type {Order} from '../../types/Order'

function AdminOrderDetail() {
    const {id} = useParams<{ id: string }>()
    const navigate = useNavigate()

    const [order, setOrder] = useState<Order | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [updatingStatus, setUpdatingStatus] = useState(false)
    const [statusMessage, setStatusMessage] = useState('')

    useEffect(() => {
        async function loadOrder() {
            if (!id) {
                setError('Sipariş ID bulunamadı.')
                setLoading(false)
                return
            }

            try {
                setLoading(true)
                setError('')

                const data = await getOrderByIdForAdmin(Number(id))
                setOrder(data)
            } catch (err) {
                console.error('Admin sipariş detayı alınamadı:', err)

                if (err instanceof Error) {
                    setError(err.message)
                } else {
                    setError('Sipariş detayı alınamadı.')
                }
            } finally {
                setLoading(false)
            }
        }

        loadOrder()
    }, [id])

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

    async function handleStatusChange(
        newStatus: Order['status'],
    ) {
        if (!order) return

        if (newStatus === order.status) return

        try {
            setUpdatingStatus(true)
            setError('')
            setStatusMessage('')

            const updatedOrder = await updateOrderStatus(
                order.id,
                newStatus,
            )

            setOrder(updatedOrder)
            setStatusMessage(
                'Sipariş durumu başarıyla güncellendi.',
            )
        } catch (err) {
            console.error(
                'Sipariş durumu güncelleme hatası:',
                err,
            )

            if (err instanceof Error) {
                setError(err.message)
            } else {
                setError(
                    'Sipariş durumu güncellenemedi.',
                )
            }
        } finally {
            setUpdatingStatus(false)
        }
    }


    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 p-8">
                <div className="mx-auto max-w-5xl">
                    <h1 className="mb-6 text-3xl font-bold text-gray-900">
                        Sipariş Detayı
                    </h1>

                    <div className="rounded-xl bg-white p-8 text-center shadow">
                        <p className="text-gray-500">
                            Sipariş yükleniyor...
                        </p>
                    </div>
                </div>
            </div>
        )
    }

    if (error || !order) {
        return (
            <div className="min-h-screen bg-gray-50 p-8">
                <div className="mx-auto max-w-5xl">
                    <h1 className="mb-6 text-3xl font-bold text-gray-900">
                        Sipariş Detayı
                    </h1>

                    <div className="rounded-xl bg-white p-8 text-center shadow">
                        <p className="mb-5 text-red-600">
                            {error || 'Sipariş bulunamadı.'}
                        </p>

                        <button
                            onClick={() =>
                                navigate('/admin/orders')
                            }
                            className="rounded-lg bg-black px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-800"
                        >
                            Siparişlere Dön
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="mx-auto max-w-5xl">
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            Sipariş Detayı
                        </h1>

                        <p className="mt-1 text-gray-500">
                            {order.orderNumber}
                        </p>
                    </div>

                    <button
                        onClick={() =>
                            navigate('/admin/orders')
                        }
                        className="rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100"
                    >
                        ← Siparişlere Dön
                    </button>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    <div className="rounded-xl bg-white p-6 shadow">
                        <h2 className="mb-4 text-lg font-semibold text-gray-900">
                            Sipariş Bilgileri
                        </h2>

                        <div className="space-y-3">
                            <div className="flex justify-between gap-4">
                                <span className="text-gray-500">
                                    Sipariş No
                                </span>

                                <span className="font-medium text-gray-900">
                                    {order.orderNumber}
                                </span>
                            </div>

                            <div className="flex justify-between gap-4">
                                <span className="text-gray-500">
                                    Tarih
                                </span>

                                <span className="text-gray-900">
                                    {formatDate(order.orderDate)}
                                </span>
                            </div>


                            <div className="border-t pt-4">
                                <div className="mb-2 flex items-center justify-between gap-4">
        <span className="text-gray-500">
            Mevcut Durum
        </span>

                                    <span
                                        className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass(
                                            order.status,
                                        )}`}
                                    >
            {getStatusLabel(order.status)}
        </span>
                                </div>

                                {order.status !== 'CANCELLED' &&
                                    order.status !== 'DELIVERED' && (
                                        <div className="mt-4">
                                            <label
                                                htmlFor="order-status"
                                                className="mb-2 block text-sm font-medium text-gray-700"
                                            >
                                                Sipariş Durumunu Değiştir
                                            </label>

                                            <select
                                                id="order-status"
                                                value={order.status}
                                                disabled={updatingStatus}
                                                onChange={(e) =>
                                                    handleStatusChange(
                                                        e.target.value as Order['status'],
                                                    )
                                                }
                                                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-black"
                                            >
                                                <option value="PENDING">
                                                    Bekliyor
                                                </option>

                                                <option value="PAID">
                                                    Ödendi
                                                </option>

                                                <option value="PREPARING">
                                                    Hazırlanıyor
                                                </option>

                                                <option value="SHIPPED">
                                                    Kargoda
                                                </option>

                                                <option value="DELIVERED">
                                                    Teslim Edildi
                                                </option>

                                                <option value="CANCELLED">
                                                    İptal Edildi
                                                </option>
                                            </select>

                                            {updatingStatus && (
                                                <p className="mt-2 text-sm text-gray-500">
                                                    Durum güncelleniyor...
                                                </p>
                                            )}
                                        </div>
                                    )}

                                {statusMessage && (
                                    <p className="mt-3 text-sm font-medium text-green-600">
                                        {statusMessage}
                                    </p>
                                )}
                            </div>


                            <div className="flex justify-between gap-4 border-t pt-3">
                                <span className="font-medium text-gray-700">
                                    Toplam
                                </span>

                                <span className="text-lg font-bold text-gray-900">
                                    {formatPrice(order.totalPrice)}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-xl bg-white p-6 shadow">
                        <h2 className="mb-4 text-lg font-semibold text-gray-900">
                            Müşteri Bilgileri
                        </h2>

                        <div className="space-y-3">
                            <div className="flex justify-between gap-4">
                                <span className="text-gray-500">
                                    Kullanıcı ID
                                </span>

                                <span className="text-gray-900">
                                    #{order.userId}
                                </span>
                            </div>

                            <div className="flex justify-between gap-4">
                                <span className="text-gray-500">
                                    E-posta
                                </span>

                                <span className="break-all text-right text-gray-900">
                                    {order.userEmail}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-xl bg-white p-6 shadow md:col-span-2">
                        <h2 className="mb-4 text-lg font-semibold text-gray-900">
                            Teslimat Adresi
                        </h2>

                        <div className="rounded-lg bg-gray-50 p-4">
                            <p className="font-medium text-gray-900">
                                {order.city} / {order.district}
                            </p>

                            <p className="mt-1 text-gray-600">
                                {order.fullAddress}
                            </p>
                        </div>
                    </div>

                    <div className="rounded-xl bg-white shadow md:col-span-2">
                        <div className="border-b p-6">
                            <h2 className="text-lg font-semibold text-gray-900">
                                Sipariş Ürünleri
                            </h2>
                        </div>

                        <div className="divide-y">
                            {order.items.map((item) => (
                                <div
                                    key={item.id}
                                    className="p-6"
                                >
                                    <div className="flex flex-col justify-between gap-4 sm:flex-row">
                                        <div>
                                            <h3 className="font-semibold text-gray-900">
                                                {item.productName}
                                            </h3>

                                            <div className="mt-2 space-y-1 text-sm text-gray-500">
                                                <p>
                                                    SKU: {item.sku}
                                                </p>

                                                <p>
                                                    Renk: {item.color}
                                                </p>

                                                <p>
                                                    Beden: {item.size}
                                                </p>

                                                <p>
                                                    Adet: {item.quantity}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="text-left sm:text-right">
                                            <p className="text-sm text-gray-500">
                                                Birim fiyat
                                            </p>

                                            <p className="font-medium text-gray-900">
                                                {formatPrice(
                                                    item.unitPrice,
                                                )}
                                            </p>

                                            <p className="mt-2 text-sm text-gray-500">
                                                Toplam
                                            </p>

                                            <p className="text-lg font-bold text-gray-900">
                                                {formatPrice(
                                                    item.totalPrice,
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="border-t bg-gray-50 p-6">
                            <div className="flex justify-between">
                                <span className="text-lg font-semibold text-gray-700">
                                    Sipariş Toplamı
                                </span>

                                <span className="text-xl font-bold text-gray-900">
                                    {formatPrice(order.totalPrice)}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminOrderDetail
