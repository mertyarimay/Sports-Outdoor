import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import { getProductBySlug } from '../../api/productApi'
import { getProductImages } from '../../api/productImageApi'
import { getProductVariants } from '../../api/productVariantApi'
import { getStockByVariantId } from '../../api/stockApi'

import type { Product } from '../../types/Product'
import type { ProductImage } from '../../types/ProductImage'
import type { ProductVariant } from '../../types/ProductVariant'
import type { Stock } from '../../types/Stock'

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>()

  const [product, setProduct] = useState<Product | null>(null)
  const [productImages, setProductImages] = useState<ProductImage[]>([])
  const [selectedImage, setSelectedImage] =
      useState<ProductImage | null>(null)

  const [variants, setVariants] = useState<ProductVariant[]>([])
  const [stocks, setStocks] = useState<Record<number, Stock>>({})

  const [selectedColor, setSelectedColor] = useState('')
  const [selectedSize, setSelectedSize] = useState('')
  const [selectedVariant, setSelectedVariant] =
      useState<ProductVariant | null>(null)

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    async function loadProduct() {
      if (!slug) {
        setError('Ürün slug bilgisi bulunamadı.')
        setLoading(false)
        return
      }

      try {
        const productData = await getProductBySlug(slug)
        const imagesData = await getProductImages()
        const variantsData = await getProductVariants(productData.id)

        const images = imagesData.filter(
            (image) => image.productId === productData.id,
        )

        setProduct(productData)
        setProductImages(images)
        setVariants(variantsData)

        const mainImage =
            images.find((image) => image.mainImage === true) ??
            images[0]

        setSelectedImage(mainImage ?? null)

        /*
         * Her varyantın stok bilgisini alıyoruz.
         */
        const stockResults = await Promise.all(
            variantsData.map(async (variant) => {
              try {
                const stock =
                    await getStockByVariantId(variant.id)

                return [variant.id, stock] as const
              } catch {
                return null
              }
            }),
        )

        const stockMap: Record<number, Stock> = {}

        stockResults.forEach((result) => {
          if (result) {
            stockMap[result[0]] = result[1]
          }
        })

        setStocks(stockMap)

        /*
         * İlk renk otomatik seçilsin.
         */
        if (variantsData.length > 0) {
          setSelectedColor(variantsData[0].color)
        }
      } catch (err) {
        console.error(err)
        setError(
            'Ürün bilgileri yüklenirken bir hata oluştu.',
        )
      } finally {
        setLoading(false)
      }
    }

    loadProduct()
  }, [slug])

  /*
   * Üründeki benzersiz renkler
   */
  const colors = Array.from(
      new Set(variants.map((variant) => variant.color)),
  )

  /*
   * Seçilen renge ait bedenler
   */
  const sizes = variants
      .filter((variant) => variant.color === selectedColor)
      .map((variant) => variant.size)

  const uniqueSizes = Array.from(new Set(sizes))

  /*
   * Renk değişince ilk bedeni otomatik seç.
   */
  useEffect(() => {
    if (!selectedColor) {
      return
    }

    const colorVariants = variants.filter(
        (variant) => variant.color === selectedColor,
    )

    if (colorVariants.length > 0) {
      setSelectedSize(colorVariants[0].size)
    } else {
      setSelectedSize('')
    }
  }, [selectedColor, variants])

  /*
   * Renk + beden seçimine göre varyantı bul.
   */
  useEffect(() => {
    if (!selectedColor || !selectedSize) {
      setSelectedVariant(null)
      return
    }

    const variant =
        variants.find(
            (item) =>
                item.color === selectedColor &&
                item.size === selectedSize,
        ) ?? null

    setSelectedVariant(variant)

    /*
     * Yeni varyant seçildiğinde miktarı 1'e çekiyoruz.
     */
    setQuantity(1)
  }, [selectedColor, selectedSize, variants])

  if (loading) {
    return (
        <main className="bg-white">
          <div className="mx-auto max-w-7xl px-6 py-20 text-center">
            <p className="text-sm text-gray-500">
              Ürün yükleniyor...
            </p>
          </div>
        </main>
    )
  }

  if (error || !product) {
    return (
        <main className="bg-white">
          <div className="mx-auto max-w-7xl px-6 py-20 text-center">
            <h1 className="text-2xl font-bold text-gray-900">
              Ürün bulunamadı
            </h1>

            <p className="mt-3 text-gray-500">
              {error || 'Aradığınız ürün mevcut değil.'}
            </p>

            <Link
                to="/products"
                className="mt-6 inline-block rounded-full bg-gray-900 px-6 py-3 text-sm font-semibold text-white"
            >
              Ürünlere Dön
            </Link>
          </div>
        </main>
    )
  }

  const currentImage = selectedImage
      ? `http://localhost:8080${selectedImage.imageUrl}`
      : ''

  const hasDiscount =
      product.discountPrice !== null &&
      product.discountPrice !== undefined

  const discountPercent = hasDiscount
      ? Math.round(
          ((product.price - product.discountPrice) /
              product.price) *
          100,
      )
      : 0

  const selectedStock = selectedVariant
      ? stocks[selectedVariant.id]
      : undefined

  const stockQuantity = selectedStock?.quantity ?? 0

  const isOutOfStock =
      selectedVariant !== null && stockQuantity <= 0

  return (
      <main className="bg-white">

        {/* Breadcrumb */}
        <section className="border-b border-gray-100">
          <div className="mx-auto max-w-7xl px-6 py-5">
            <nav className="flex items-center gap-2 text-sm text-gray-500">

              <Link
                  to="/"
                  className="transition hover:text-gray-900"
              >
                Ana Sayfa
              </Link>

              <span>/</span>

              <Link
                  to="/products"
                  className="transition hover:text-gray-900"
              >
                Ürünler
              </Link>

              <span>/</span>

              <span className="text-gray-900">
              {product.name}
            </span>

            </nav>
          </div>
        </section>

        {/* Product Detail */}
        <section className="py-12 lg:py-16">
          <div className="mx-auto max-w-7xl px-6">

            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">

              {/* Images */}
              <div>

                <div className="relative overflow-hidden rounded-3xl bg-gray-100">

                  {currentImage ? (
                      <img
                          src={currentImage}
                          alt={product.name}
                          className="aspect-square h-full w-full object-cover"
                      />
                  ) : (
                      <div className="flex aspect-square items-center justify-center">
                    <span className="text-sm text-gray-400">
                      Görsel bulunamadı
                    </span>
                      </div>
                  )}

                  <button
                      type="button"
                      aria-label="Favorilere ekle"
                      className="absolute right-5 top-5 flex h-12 w-12 items-center justify-center rounded-full bg-white text-xl shadow-sm transition hover:bg-gray-900 hover:text-white"
                  >
                    ♡
                  </button>

                  {hasDiscount && (
                      <span className="absolute left-5 top-5 rounded-full bg-red-600 px-3 py-1 text-xs font-semibold text-white">
                    %{discountPercent}
                  </span>
                  )}

                </div>

                {/* Thumbnails */}
                {productImages.length > 0 && (
                    <div className="mt-5 grid grid-cols-4 gap-4">

                      {productImages.map((image) => {
                        const imageUrl =
                            `http://localhost:8080${image.imageUrl}`

                        const isSelected =
                            selectedImage?.id === image.id

                        return (
                            <button
                                key={image.id}
                                type="button"
                                onClick={() =>
                                    setSelectedImage(image)
                                }
                                className={`overflow-hidden rounded-xl transition ${
                                    isSelected
                                        ? 'border-2 border-gray-900'
                                        : 'border border-gray-200 hover:border-gray-900'
                                }`}
                            >
                              <img
                                  src={imageUrl}
                                  alt={`${product.name} ürün görseli`}
                                  className="aspect-square w-full object-cover"
                              />
                            </button>
                        )
                      })}

                    </div>
                )}

              </div>

              {/* Product Information */}
              <div className="flex flex-col justify-center">

                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
                  {product.brandName}
                </p>

                <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
                  {product.name}
                </h1>

                {/* Rating */}
                <div className="mt-5 flex items-center gap-4">
                  <div className="flex items-center gap-1 text-yellow-500">
                    ★ ★ ★ ★ ★
                  </div>

                  <span className="text-sm text-gray-500">
                  Henüz değerlendirme yok
                </span>
                </div>

                {/* Price */}
                <div className="mt-7 flex flex-wrap items-center gap-4">

                  {hasDiscount ? (
                      <>
                    <span className="text-3xl font-bold text-gray-900">
                      {product.discountPrice?.toLocaleString(
                          'tr-TR',
                      )}{' '}
                      TL
                    </span>

                        <span className="text-lg text-gray-400 line-through">
                      {product.price.toLocaleString(
                          'tr-TR',
                      )}{' '}
                          TL
                    </span>

                        <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-600">
                      %{discountPercent}
                    </span>
                      </>
                  ) : (
                      <span className="text-3xl font-bold text-gray-900">
                    {product.price.toLocaleString(
                        'tr-TR',
                    )}{' '}
                        TL
                  </span>
                  )}

                </div>

                {/* Description */}
                <p className="mt-6 leading-7 text-gray-600">
                  {product.description}
                </p>

                {/* Color */}
                {colors.length > 0 && (
                    <div className="mt-8 border-t border-gray-100 pt-6">

                      <div className="flex items-center justify-between">

                        <p className="text-sm font-semibold text-gray-900">
                          Renk
                        </p>

                        <span className="text-sm text-gray-500">
                      {selectedColor}
                    </span>

                      </div>

                      <div className="mt-3 flex flex-wrap gap-2">

                        {colors.map((color) => (
                            <button
                                key={color}
                                type="button"
                                onClick={() =>
                                    setSelectedColor(color)
                                }
                                className={`rounded-full border px-5 py-2 text-sm font-medium transition ${
                                    selectedColor === color
                                        ? 'border-gray-900 bg-gray-900 text-white'
                                        : 'border-gray-300 text-gray-700 hover:border-gray-900'
                                }`}
                            >
                              {color}
                            </button>
                        ))}

                      </div>

                    </div>
                )}

                {/* Size */}
                {uniqueSizes.length > 0 && (
                    <div className="mt-6">

                      <div className="flex items-center justify-between">

                        <p className="text-sm font-semibold text-gray-900">
                          Beden
                        </p>

                        {selectedSize && (
                            <span className="text-sm text-gray-500">
                        {selectedSize}
                      </span>
                        )}

                      </div>

                      <div className="mt-3 flex flex-wrap gap-2">

                        {uniqueSizes.map((size) => {
                          const variant = variants.find(
                              (item) =>
                                  item.color === selectedColor &&
                                  item.size === size,
                          )

                          const stock = variant
                              ? stocks[variant.id]
                              : undefined

                          const disabled =
                              stock !== undefined &&
                              stock.quantity <= 0

                          return (
                              <button
                                  key={size}
                                  type="button"
                                  disabled={disabled}
                                  onClick={() =>
                                      setSelectedSize(size)
                                  }
                                  className={`relative rounded-xl border px-5 py-3 text-sm font-semibold transition ${
                                      selectedSize === size
                                          ? 'border-gray-900 bg-gray-900 text-white'
                                          : disabled
                                              ? 'cursor-not-allowed border-gray-200 bg-gray-100 text-gray-400 line-through'
                                              : 'border-gray-300 text-gray-700 hover:border-gray-900'
                                  }`}
                              >
                                {size}
                              </button>
                          )
                        })}

                      </div>

                    </div>
                )}

                {/* Stock */}
                {selectedVariant && (
                    <div className="mt-5">

                      {isOutOfStock ? (
                          <p className="text-sm font-semibold text-red-600">
                            Tükendi
                          </p>
                      ) : (
                          <p className="text-sm font-semibold text-green-600">
                            Stokta
                            {stockQuantity > 0 &&
                                ` (${stockQuantity} adet)`}
                          </p>
                      )}

                      <p className="mt-1 text-xs text-gray-500">
                        SKU: {selectedVariant.sku}
                      </p>

                    </div>
                )}

                {/* Category */}
                <div className="mt-8 border-t border-gray-100 pt-6">

                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Kategori
                  </p>

                  <p className="mt-1 text-sm font-medium text-gray-900">
                    {product.categoryName}
                  </p>

                </div>

                {/* Gender */}
                <div className="mt-5">

                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Cinsiyet
                  </p>

                  <p className="mt-1 text-sm font-medium text-gray-900">
                    {product.gender}
                  </p>

                </div>

                {/* Quantity + Cart */}
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">

                  <div className="flex h-12 items-center rounded-full border border-gray-300">

                    <button
                        type="button"
                        disabled={quantity <= 1}
                        onClick={() =>
                            setQuantity((current) =>
                                Math.max(1, current - 1),
                            )
                        }
                        className="flex h-12 w-12 items-center justify-center text-lg text-gray-600 hover:text-gray-900 disabled:cursor-not-allowed disabled:text-gray-300"
                    >
                      −
                    </button>

                    <span className="w-10 text-center text-sm font-semibold">
                    {quantity}
                  </span>

                    <button
                        type="button"
                        disabled={
                            !selectedVariant ||
                            isOutOfStock ||
                            quantity >= stockQuantity
                        }
                        onClick={() =>
                            setQuantity((current) =>
                                Math.min(
                                    current + 1,
                                    stockQuantity,
                                ),
                            )
                        }
                        className="flex h-12 w-12 items-center justify-center text-lg text-gray-600 hover:text-gray-900 disabled:cursor-not-allowed disabled:text-gray-300"
                    >
                      +
                    </button>

                  </div>

                  <button
                      type="button"
                      disabled={
                          !selectedVariant ||
                          isOutOfStock
                      }
                      className="h-12 flex-1 rounded-full bg-gray-900 px-8 text-sm font-semibold text-white transition hover:bg-gray-700 disabled:cursor-not-allowed disabled:bg-gray-300"
                  >
                    {!selectedVariant
                        ? 'Varyant Seçin'
                        : isOutOfStock
                            ? 'Tükendi'
                            : 'Sepete Ekle'}
                  </button>

                </div>

                {/* Product Info */}
                <div className="mt-8 grid grid-cols-2 gap-4 border-t border-gray-100 pt-8">

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Ürün Kodu
                    </p>

                    <p className="mt-1 text-sm font-medium text-gray-900">
                      {product.slug}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Durum
                    </p>

                    <p
                        className={`mt-1 text-sm font-medium ${
                            product.active
                                ? 'text-green-600'
                                : 'text-red-600'
                        }`}
                    >
                      {product.active
                          ? 'Satışta'
                          : 'Satışta değil'}
                    </p>
                  </div>

                </div>

              </div>
            </div>
          </div>
        </section>

        {/* Description */}
        <section className="border-t border-gray-100 bg-gray-50 py-20">

          <div className="mx-auto max-w-4xl px-6">

            <div className="text-center">

              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
                Ürün Detayları
              </p>

              <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900">
                Tasarım ve performans bir arada
              </h2>

            </div>

            <div className="mt-10 space-y-5 text-gray-600">

              <p>
                {product.description}
              </p>

              <p>
                {product.name}, {product.categoryName}{' '}
                kategorisinde yer alan bir üründür.
              </p>

              <p>
                Marka: {product.brandName}.
              </p>

            </div>

          </div>

        </section>

      </main>
  )
}