import { useEffect, useState } from 'react'

import ProductCard from '../../components/product/ProductCard'
import { getProducts } from '../../api/productApi'
import { getProductImages } from '../../api/productImageApi'

import type { Product } from '../../types/Product'
import type { ProductImage } from '../../types/ProductImage'

export default function Products() {
  const [products, setProducts] = useState<Product[]>([])
  const [productImages, setProductImages] = useState<ProductImage[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadProducts() {
      try {
        const productsData = await getProducts()
        const imagesData = await getProductImages()

        setProducts(productsData)
        setProductImages(imagesData)
      } catch (err) {
        console.error(err)
        setError('Ürünler yüklenirken bir hata oluştu.')
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [])

  return (
      <main className="bg-white">
        {/* Header */}
        <section className="border-b border-gray-100 bg-gray-50">
          <div className="mx-auto max-w-7xl px-6 py-12">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
              Sports&Outdoor
            </p>

            <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-900">
              Tüm Ürünler
            </h1>

            <p className="mt-4 max-w-2xl text-gray-600">
              Spor ve outdoor koleksiyonumuzu keşfet. İhtiyacına uygun
              ürünleri bul ve macerana hazırlan.
            </p>
          </div>
        </section>

        {/* Products Section */}
        <section className="py-12">
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex flex-col gap-10 lg:flex-row">

              {/* Filters */}
              <aside className="w-full shrink-0 lg:w-64">
                <div className="rounded-2xl border border-gray-200 bg-white p-6">

                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-900">
                      Filtreler
                    </h2>

                    <button
                        type="button"
                        className="text-xs font-semibold text-gray-500 hover:text-gray-900"
                    >
                      Temizle
                    </button>
                  </div>

                  {/* Category */}
                  <div className="mt-8 border-t border-gray-100 pt-6">
                    <h3 className="text-sm font-semibold text-gray-900">
                      Kategori
                    </h3>

                    <div className="mt-4 space-y-3">
                      {['Erkek', 'Kadın', 'Ayakkabı', 'Outdoor'].map(
                          (category) => (
                              <label
                                  key={category}
                                  className="flex items-center gap-3 text-sm text-gray-600"
                              >
                                <input
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-gray-300"
                                />

                                {category}
                              </label>
                          ),
                      )}
                    </div>
                  </div>

                  {/* Brand */}
                  <div className="mt-8 border-t border-gray-100 pt-6">
                    <h3 className="text-sm font-semibold text-gray-900">
                      Marka
                    </h3>

                    <div className="mt-4 space-y-3">
                      {['Nike', 'Adidas', 'Puma', 'Salomon'].map((brand) => (
                          <label
                              key={brand}
                              className="flex items-center gap-3 text-sm text-gray-600"
                          >
                            <input
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300"
                            />

                            {brand}
                          </label>
                      ))}
                    </div>
                  </div>

                  {/* Price */}
                  <div className="mt-8 border-t border-gray-100 pt-6">
                    <h3 className="text-sm font-semibold text-gray-900">
                      Fiyat
                    </h3>

                    <div className="mt-4 space-y-3">
                      {[
                        '0 - 1.000 TL',
                        '1.000 - 3.000 TL',
                        '3.000 - 5.000 TL',
                        '5.000 TL ve üzeri',
                      ].map((price) => (
                          <label
                              key={price}
                              className="flex items-center gap-3 text-sm text-gray-600"
                          >
                            <input
                                type="radio"
                                name="price"
                                className="h-4 w-4 border-gray-300"
                            />

                            {price}
                          </label>
                      ))}
                    </div>
                  </div>

                </div>
              </aside>

              {/* Product Content */}
              <div className="min-w-0 flex-1">

                {/* Toolbar */}
                <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-sm text-gray-500">
                    {loading
                        ? 'Ürünler yükleniyor...'
                        : `${products.length} ürün bulundu`}
                  </p>

                  <select
                      className="rounded-full border border-gray-300 bg-white px-5 py-2.5 text-sm text-gray-700 outline-none focus:border-gray-900"
                      defaultValue="popular"
                  >
                    <option value="popular">
                      Önerilen
                    </option>

                    <option value="newest">
                      En Yeniler
                    </option>

                    <option value="price-low">
                      Fiyat: Düşükten Yükseğe
                    </option>

                    <option value="price-high">
                      Fiyat: Yüksekten Düşüğe
                    </option>
                  </select>
                </div>

                {/* Error */}
                {error && (
                    <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-700">
                      {error}
                    </div>
                )}

                {/* Loading */}
                {loading && (
                    <div className="py-20 text-center text-sm text-gray-500">
                      Ürünler yükleniyor...
                    </div>
                )}

                {/* Product Grid */}
                {!loading && !error && products.length > 0 && (
                    <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 xl:grid-cols-3">

                      {products.map((product) => {
                        const productImage = productImages.find(
                            (image) =>
                                image.productId === product.id &&
                                image.mainImage === true,
                        )

                        const imageUrl = productImage
                            ? `http://localhost:8080${productImage.imageUrl}`
                            : ''

                        const discount =
                            product.discountPrice !== null &&
                            product.discountPrice !== undefined
                                ? Math.round(
                                    ((product.price - product.discountPrice) /
                                        product.price) *
                                    100,
                                )
                                : null

                        return (
                            <ProductCard
                                key={product.id}
                                name={product.name}
                                brand={product.brandName}
                                price={`${product.price.toLocaleString('tr-TR')} TL`}
                                image={imageUrl}
                                slug={product.slug}
                                discount={
                                  discount !== null
                                      ? `%${discount}`
                                      : undefined
                                }
                            />
                        )
                      })}

                    </div>
                )}

                {/* Empty */}
                {!loading && !error && products.length === 0 && (
                    <div className="rounded-2xl border border-gray-200 p-10 text-center">
                      <p className="font-semibold text-gray-900">
                        Henüz ürün bulunmuyor.
                      </p>

                      <p className="mt-2 text-sm text-gray-500">
                        Veritabanında kayıtlı ürün bulunamadı.
                      </p>
                    </div>
                )}

                {/* Pagination */}
                {!loading && products.length > 0 && (
                    <div className="mt-16 flex items-center justify-center gap-2">
                      <button
                          type="button"
                          className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-900 text-sm font-semibold text-white"
                      >
                        1
                      </button>

                      <button
                          type="button"
                          className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold text-gray-600 transition hover:bg-gray-100"
                      >
                        2
                      </button>

                      <button
                          type="button"
                          className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold text-gray-600 transition hover:bg-gray-100"
                      >
                        3
                      </button>

                      <button
                          type="button"
                          className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold text-gray-600 transition hover:bg-gray-100"
                      >
                        →
                      </button>
                    </div>
                )}

              </div>
            </div>
          </div>
        </section>
      </main>
  )
}