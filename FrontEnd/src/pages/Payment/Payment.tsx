
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { payOrder } from '../../api/paymentApi'
import type { PaymentMethod } from '../../types/Payment'

export default function Payment() {
    const { orderId } = useParams()
    const navigate = useNavigate()

    const [paymentMethod, setPaymentMethod] =
        useState<PaymentMethod>('CREDIT_CARD')

    const [cardHolderName, setCardHolderName] = useState('')
    const [cardNumber, setCardNumber] = useState('')
    const [expiryMonth, setExpiryMonth] = useState('')
    const [expiryYear, setExpiryYear] = useState('')
    const [cvv, setCvv] = useState('')

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    async function handlePayment() {
        if (!orderId) {
            setError('Sipariş bulunamadı.')
            return
        }

        if (
            !cardHolderName ||
            !cardNumber ||
            !expiryMonth ||
            !expiryYear ||
            !cvv
        ) {
            setError('Lütfen tüm ödeme bilgilerini doldurun.')
            return
        }

        try {
            setLoading(true)
            setError('')
            setSuccess('')

            const payment = await payOrder(
                Number(orderId),
                paymentMethod,
                cardHolderName,
                cardNumber,
                expiryMonth,
                expiryYear,
                cvv,
            )

            console.log('Ödeme sonucu:', payment)

            if (payment.status === 'SUCCESS') {
                setSuccess(
                    `Ödeme başarılı. İşlem No: ${payment.transactionId}`,
                )
            } else {
                setError(
                    payment.failureReason ||
                    'Ödeme başarısız oldu.',
                )
            }

        } catch (err) {
            console.error('Ödeme hatası:', err)

            if (err instanceof Error) {
                setError(err.message)
            } else {
                setError('Ödeme işlemi başarısız.')
            }
        } finally {
            setLoading(false)
        }
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
                        Ödeme
                    </h1>

                    <p className="mt-4 text-gray-600">
                        Siparişinizin ödemesini tamamlayın.
                    </p>

                </div>
            </section>

            <section className="py-12">
                <div className="mx-auto max-w-2xl px-6">

                    {/* Order ID */}
                    <div className="rounded-2xl border border-gray-200 p-6">

                        <p className="text-sm text-gray-500">
                            Sipariş ID
                        </p>

                        <p className="mt-1 text-lg font-semibold text-gray-900">
                            #{orderId}
                        </p>

                    </div>

                    {/* Payment Method */}
                    <div className="mt-6 rounded-2xl border border-gray-200 p-6">

                        <h2 className="text-xl font-semibold text-gray-900">
                            Ödeme Yöntemi
                        </h2>

                        <select
                            value={paymentMethod}
                            onChange={(e) =>
                                setPaymentMethod(
                                    e.target.value as PaymentMethod,
                                )
                            }
                            className="mt-4 w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-gray-900"
                        >
                            <option value="CREDIT_CARD">
                                Kredi Kartı
                            </option>

                            <option value="DEBIT_CARD">
                                Banka Kartı
                            </option>

                            <option value="BANK_TRANSFER">
                                Banka Havalesi
                            </option>

                            <option value="CASH_ON_DELIVERY">
                                Kapıda Ödeme
                            </option>
                        </select>

                    </div>

                    {/* Card Information */}
                    <div className="mt-6 rounded-2xl border border-gray-200 p-6">

                        <h2 className="text-xl font-semibold text-gray-900">
                            Kart Bilgileri
                        </h2>

                        {/* Card Holder */}
                        <div className="mt-6">

                            <label className="text-sm font-medium text-gray-700">
                                Kart Üzerindeki İsim
                            </label>

                            <input
                                type="text"
                                value={cardHolderName}
                                onChange={(e) =>
                                    setCardHolderName(e.target.value)
                                }
                                placeholder="Ad Soyad"
                                className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-gray-900"
                            />

                        </div>

                        {/* Card Number */}
                        <div className="mt-4">

                            <label className="text-sm font-medium text-gray-700">
                                Kart Numarası
                            </label>

                            <input
                                type="text"
                                inputMode="numeric"
                                maxLength={16}
                                value={cardNumber}
                                onChange={(e) =>
                                    setCardNumber(
                                        e.target.value.replace(/\D/g, ''),
                                    )
                                }
                                placeholder="16 haneli kart numarası"
                                className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-gray-900"
                            />

                        </div>

                        {/* Expiry + CVV */}
                        <div className="mt-4 grid grid-cols-3 gap-4">

                            <div>
                                <label className="text-sm font-medium text-gray-700">
                                    Ay
                                </label>

                                <input
                                    type="text"
                                    inputMode="numeric"
                                    maxLength={2}
                                    value={expiryMonth}
                                    onChange={(e) =>
                                        setExpiryMonth(
                                            e.target.value.replace(/\D/g, ''),
                                        )
                                    }
                                    placeholder="MM"
                                    className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-gray-900"
                                />
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-700">
                                    Yıl
                                </label>

                                <input
                                    type="text"
                                    inputMode="numeric"
                                    maxLength={2}
                                    value={expiryYear}
                                    onChange={(e) =>
                                        setExpiryYear(
                                            e.target.value.replace(/\D/g, ''),
                                        )
                                    }
                                    placeholder="YY"
                                    className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-gray-900"
                                />
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-700">
                                    CVV
                                </label>

                                <input
                                    type="password"
                                    inputMode="numeric"
                                    maxLength={4}
                                    value={cvv}
                                    onChange={(e) =>
                                        setCvv(
                                            e.target.value.replace(/\D/g, ''),
                                        )
                                    }
                                    placeholder="CVV"
                                    className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-gray-900"
                                />
                            </div>

                        </div>

                        {/* Error */}
                        {error && (
                            <div className="mt-6 rounded-xl bg-red-50 p-4 text-sm text-red-600">
                                {error}
                            </div>
                        )}

                        {/* Success */}
                        {success && (
                            <div className="mt-6 rounded-xl bg-green-50 p-4 text-sm text-green-700">
                                {success}
                            </div>
                        )}

                        {/* Button */}
                        <button
                            type="button"
                            onClick={handlePayment}
                            disabled={loading || !!success}
                            className="mt-6 w-full rounded-full bg-gray-900 px-6 py-4 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {loading
                                ? 'Ödeme Yapılıyor...'
                                : success
                                    ? 'Ödeme Tamamlandı'
                                    : 'Ödemeyi Tamamla'}
                        </button>

                    </div>

                </div>
            </section>

        </main>
    )
}
