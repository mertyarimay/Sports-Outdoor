import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import {getMyCartItems, deleteCartItem, updateCartItemQuantity,} from '../../api/cartItemApi'

import type { CartItem } from '../../types/CartItem'

const API_BASE_URL = 'http://localhost:8080'

export default function Cart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  async function loadCartItems() {
    try {
      setLoading(true)
      setError('')

      const data = await getMyCartItems()

      setCartItems(data)
    } catch (err) {
      console.error(err)
      setError('Sepet bilgileri yüklenirken bir hata oluştu.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadCartItems()
  }, [])

  async function handleDelete(id: number) {
    try {
      await deleteCartItem(id)

      setCartItems((currentItems) =>
          currentItems.filter((item) => item.id !== id),
      )
    } catch (err) {
      console.error(err)
      setError('Ürün sepetten silinemedi.')
    }
  }
  async function handleQuantityChange(
      id: number,
      newQuantity: number,
  ) {
    if (newQuantity < 1) {
      return
    }

    try {
      setError('')

      const updatedItem = await updateCartItemQuantity(
          id,
          newQuantity,
      )

      setCartItems((currentItems) =>
          currentItems.map((item) =>
              item.id === id
                  ? updatedItem
                  : item,
          ),
      )
    } catch (err) {
      console.error(err)

      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('Ürün miktarı güncellenemedi.')
      }
    }
  }

  const totalProductCount = cartItems.reduce(
      (total, item) => total + item.quantity,
      0,
  )

  const totalPrice = cartItems.reduce((total, item) => {
    const price =
        item.discountPrice !== null &&
        item.discountPrice !== undefined
            ? item.discountPrice
            : item.price

    return total + price * item.quantity
  }, 0)

  if (loading) {
    return (
        <main className="bg-white">
          <section className="border-b border-gray-100 bg-gray-50">
            <div className="mx-auto max-w-7xl px-6 py-12">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
                Sports&Outdoor
              </p>

              <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-900">
                Sepetim
              </h1>

              <p className="mt-4 text-gray-600">
                Sepet bilgileri yükleniyor...
              </p>
            </div>
          </section>

          <section className="py-20">
            <div className="mx-auto max-w-7xl px-6 text-center">
              <p className="text-sm text-gray-500">
                Sepet yükleniyor...
              </p>
            </div>
          </section>
        </main>
    )
  }

  if (error) {
    return (
        <main className="bg-white">
          <section className="border-b border-gray-100 bg-gray-50">
            <div className="mx-auto max-w-7xl px-6 py-12">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
                Sports&Outdoor
              </p>

              <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-900">
                Sepetim
              </h1>
            </div>
          </section>

          <section className="py-20">
            <div className="mx-auto max-w-7xl px-6 text-center">
              <h2 className="text-2xl font-bold text-gray-900">
                Sepet yüklenemedi
              </h2>

              <p className="mt-3 text-gray-500">
                {error}
              </p>

              <button
                  type="button"
                  onClick={loadCartItems}
                  className="mt-6 rounded-full bg-gray-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-700"
              >
                Tekrar Dene
              </button>
            </div>
          </section>
        </main>
    )
  }

  return (
      <main className="bg-white">

        {/* Page Header */}
        <section className="border-b border-gray-100 bg-gray-50">
          <div className="mx-auto max-w-7xl px-6 py-12">

            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
              Sports&Outdoor
            </p>

            <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-900">
              Sepetim
            </h1>

            <p className="mt-4 text-gray-600">
              Sepetindeki ürünleri kontrol et ve siparişini tamamla.
            </p>

          </div>
        </section>

        {/* Cart */}
        <section className="py-12 lg:py-16">
          <div className="mx-auto max-w-7xl px-6">

            {cartItems.length === 0 ? (

                /* Empty Cart */
                <div className="rounded-3xl border border-gray-200 px-6 py-20 text-center">

                  <div className="text-5xl">
                    🛒
                  </div>

                  <h2 className="mt-6 text-2xl font-bold text-gray-900">
                    Sepetin boş
                  </h2>

                  <p className="mt-3 text-gray-500">
                    Henüz sepetine ürün eklemedin.
                  </p>

                  <Link
                      to="/products"
                      className="mt-7 inline-block rounded-full bg-gray-900 px-7 py-3 text-sm font-semibold text-white transition hover:bg-gray-700"
                  >
                    Alışverişe Başla
                  </Link>

                </div>

            ) : (

                <div className="grid gap-10 lg:grid-cols-[1fr_380px]">

                  {/* Cart Items */}
                  <div>

                    <div className="mb-6 flex items-center justify-between">

                      <h2 className="text-xl font-semibold text-gray-900">
                        Sepetindeki Ürünler
                      </h2>

                      <span className="text-sm text-gray-500">
                    {totalProductCount} ürün
                  </span>

                    </div>

                    <div className="space-y-5">

                      {cartItems.map((item) => {

                        const imageUrl = item.imageUrl
                            ? `${API_BASE_URL}${item.imageUrl}`
                            : ''

                        const hasDiscount =
                            item.discountPrice !== null &&
                            item.discountPrice !== undefined

                        const unitPrice = hasDiscount
                            ? item.discountPrice
                            : item.price

                        const itemTotal =
                            unitPrice * item.quantity

                        return (
                            <article
                                key={item.id}
                                className="flex gap-5 rounded-2xl border border-gray-200 p-4 sm:p-5"
                            >

                              {/* Product Image */}
                              <div className="h-32 w-28 shrink-0 overflow-hidden rounded-xl bg-gray-100 sm:h-36 sm:w-32">

                                {imageUrl ? (
                                    <img
                                        src={imageUrl}
                                        alt={item.productName}
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center">
                              <span className="text-xs text-gray-400">
                                Görsel bulunamadı
                              </span>
                                    </div>
                                )}

                              </div>

                              {/* Product Information */}
                              <div className="flex min-w-0 flex-1 flex-col">

                                <div className="flex items-start justify-between gap-4">

                                  <div>

                                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                                      {item.brandName || 'Marka'}
                                    </p>

                                    <h3 className="mt-1 text-base font-semibold text-gray-900">
                                      {item.productName}
                                    </h3>

                                  </div>

                                  <button
                                      type="button"
                                      onClick={() => handleDelete(item.id)}
                                      className="text-sm text-gray-400 transition hover:text-red-500"
                                  >
                                    Sil
                                  </button>

                                </div>

                                {/* Variant Information */}
                                <div className="mt-3 flex flex-wrap gap-4 text-sm text-gray-500">

                            <span>
                              Renk: {item.color}
                            </span>

                                  <span>
                              Beden: {item.size}
                            </span>

                                  <span>
                              SKU: {item.sku}
                            </span>

                                </div>

                                {/* Price & Quantity */}
                                <div className="mt-auto flex flex-col gap-4 pt-4 sm:flex-row sm:items-center sm:justify-between">

                                  <div className="flex h-10 items-center rounded-full border border-gray-300">

                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleQuantityChange(
                                                item.id,
                                                item.quantity - 1,
                                            )
                                        }
                                        disabled={item.quantity <= 1}
                                        className="flex h-10 w-10 items-center justify-center text-gray-600 hover:text-gray-900 disabled:cursor-not-allowed disabled:opacity-30"
                                    >
                                      −
                                    </button>

                                    <span className="w-8 text-center text-sm font-semibold">
                                {item.quantity}
                              </span>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleQuantityChange(
                                                item.id,
                                                item.quantity + 1,
                                            )
                                        }
                                        className="flex h-10 w-10 items-center justify-center text-gray-600 hover:text-gray-900"
                                    >
                                      +
                                    </button>

                                  </div>

                                  <div className="text-right">

                                    {hasDiscount && (
                                        <p className="text-sm text-gray-400 line-through">
                                        {item.price.toLocaleString('tr-TR')} TL
                                        </p>
                                    )}

                                    <p className="text-lg font-bold text-gray-900">
                                      {itemTotal.toLocaleString('tr-TR')} TL
                                    </p>

                                  </div>

                                </div>

                              </div>

                            </article>
                        )
                      })}

                    </div>

                  </div>

                  {/* Order Summary */}
                  <aside>

                    <div className="sticky top-24 rounded-2xl border border-gray-200 bg-gray-50 p-6">

                      <h2 className="text-xl font-semibold text-gray-900">
                        Sipariş Özeti
                      </h2>

                      <div className="mt-6 space-y-4 text-sm">

                        <div className="flex items-center justify-between">

                      <span className="text-gray-500">
                        Ürün Sayısı
                      </span>

                          <span className="font-medium text-gray-900">
                        {totalProductCount}
                      </span>

                        </div>

                        <div className="flex items-center justify-between">

                      <span className="text-gray-500">
                        Ara Toplam
                      </span>

                          <span className="font-medium text-gray-900">
                        {totalPrice.toLocaleString('tr-TR')} TL
                      </span>

                        </div>

                        <div className="flex items-center justify-between">

                      <span className="text-gray-500">
                        Kargo
                      </span>

                          <span className="font-medium text-green-600">
                        Ücretsiz
                      </span>

                        </div>

                      </div>

                      <div className="my-6 border-t border-gray-200" />

                      <div className="flex items-center justify-between">

                    <span className="font-semibold text-gray-900">
                      Toplam
                    </span>

                        <span className="text-2xl font-bold text-gray-900">
                      {totalPrice.toLocaleString('tr-TR')} TL
                    </span>

                      </div>

                      <button
                          type="button"
                          className="mt-6 w-full rounded-full bg-gray-900 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-gray-700"
                      >
                        Siparişi Tamamla →
                      </button>

                      <Link
                          to="/products"
                          className="mt-4 block text-center text-sm font-medium text-gray-600 underline underline-offset-4 transition hover:text-gray-900"
                      >
                        Alışverişe devam et
                      </Link>

                      <div className="mt-8 rounded-xl bg-white p-4">

                        <p className="text-sm font-semibold text-gray-900">
                          🔒 Güvenli alışveriş
                        </p>

                        <p className="mt-1 text-xs leading-5 text-gray-500">
                          Ödeme bilgileriniz güvenli şekilde işlenir.
                        </p>

                      </div>

                    </div>

                  </aside>

                </div>

            )}

          </div>
        </section>

      </main>
  )
}