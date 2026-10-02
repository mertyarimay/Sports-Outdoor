import menImage from '../../assets/categories/Men.jpg'
import womenImage from '../../assets/categories/Women.jpg'
import shoesImage from '../../assets/categories/shoes.jpg'
import outdoorImage from '../../assets/categories/outdoor.jpg'

import ProductCard from '../../components/product/ProductCard'

import product1Image from '../../assets/products/product-1.jpg'
import product2Image from '../../assets/products/product-2.jpg'
import product3Image from '../../assets/products/product-3.jpg'
import product4Image from '../../assets/products/product-4.jpg'

export default function Category() {
  return (
      <main className="bg-white">
        {/* Category Header */}
        <section className="bg-gray-100">
          <div className="mx-auto max-w-7xl px-6 py-14">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
              Kategori
            </p>

            <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
              Outdoor
            </h1>

            <p className="mt-4 max-w-2xl text-base leading-7 text-gray-600">
              Kamp, yürüyüş, koşu ve doğa maceraların için
              ihtiyacın olan outdoor ürünlerini keşfet.
            </p>
          </div>
        </section>

        {/* Category Content */}
        <section className="py-12 lg:py-16">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-10 lg:grid-cols-[240px_1fr]">
              {/* Sidebar */}
              <aside>
                <div className="sticky top-24 rounded-2xl border border-gray-200 bg-white p-5">
                  <div className="flex items-center justify-between">
                    <h2 className="font-semibold text-gray-900">
                      Filtreler
                    </h2>

                    <button
                        type="button"
                        className="text-xs font-medium text-gray-500 underline underline-offset-4 hover:text-gray-900"
                    >
                      Temizle
                    </button>
                  </div>

                  {/* Category */}
                  <div className="mt-6 border-t border-gray-100 pt-6">
                    <h3 className="text-sm font-semibold text-gray-900">
                      Alt Kategori
                    </h3>

                    <div className="mt-4 space-y-3">
                      <label className="flex items-center gap-3 text-sm text-gray-600">
                        <input
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300"
                        />
                        Kamp
                      </label>

                      <label className="flex items-center gap-3 text-sm text-gray-600">
                        <input
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300"
                        />
                        Yürüyüş
                      </label>

                      <label className="flex items-center gap-3 text-sm text-gray-600">
                        <input
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300"
                        />
                        Koşu
                      </label>

                      <label className="flex items-center gap-3 text-sm text-gray-600">
                        <input
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300"
                        />
                        Çanta
                      </label>
                    </div>
                  </div>

                  {/* Brand */}
                  <div className="mt-6 border-t border-gray-100 pt-6">
                    <h3 className="text-sm font-semibold text-gray-900">
                      Marka
                    </h3>

                    <div className="mt-4 space-y-3">
                      <label className="flex items-center gap-3 text-sm text-gray-600">
                        <input
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300"
                        />
                        Nike
                      </label>

                      <label className="flex items-center gap-3 text-sm text-gray-600">
                        <input
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300"
                        />
                        Adidas
                      </label>

                      <label className="flex items-center gap-3 text-sm text-gray-600">
                        <input
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300"
                        />
                        Salomon
                      </label>

                      <label className="flex items-center gap-3 text-sm text-gray-600">
                        <input
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300"
                        />
                        The North Face
                      </label>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="mt-6 border-t border-gray-100 pt-6">
                    <h3 className="text-sm font-semibold text-gray-900">
                      Fiyat
                    </h3>

                    <div className="mt-4 grid grid-cols-2 gap-3">
                      <input
                          type="number"
                          placeholder="Min"
                          className="h-10 w-full rounded-lg border border-gray-300 px-3 text-sm outline-none focus:border-gray-900"
                      />

                      <input
                          type="number"
                          placeholder="Max"
                          className="h-10 w-full rounded-lg border border-gray-300 px-3 text-sm outline-none focus:border-gray-900"
                      />
                    </div>
                  </div>
                </div>
              </aside>

              {/* Products */}
              <div>
                {/* Toolbar */}
                <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-500">
                      Outdoor ürünleri
                    </p>

                    <h2 className="mt-1 text-xl font-semibold text-gray-900">
                      24 ürün
                    </h2>
                  </div>

                  <select
                      defaultValue="recommended"
                      className="h-11 rounded-xl border border-gray-300 bg-white px-4 text-sm font-medium text-gray-700 outline-none focus:border-gray-900"
                  >
                    <option value="recommended">
                      Önerilen
                    </option>

                    <option value="price-low">
                      Fiyat: Düşükten Yükseğe
                    </option>

                    <option value="price-high">
                      Fiyat: Yüksekten Düşüğe
                    </option>

                    <option value="newest">
                      En Yeniler
                    </option>
                  </select>
                </div>

                {/* Product Grid */}
                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                  <ProductCard
                      name="Outdoor Spor Ayakkabı"
                      brand="Nike"
                      price="3.499 TL"
                      image={product1Image}
                  />

                  <ProductCard
                      name="Performance Koşu Ayakkabısı"
                      brand="Adidas"
                      price="2.999 TL"
                      image={product2Image}
                      discount="%20"
                  />

                  <ProductCard
                      name="Outdoor Mont"
                      brand="The North Face"
                      price="5.499 TL"
                      image={product3Image}
                  />

                  <ProductCard
                      name="Trail Running Ayakkabı"
                      brand="Salomon"
                      price="4.299 TL"
                      image={product4Image}
                  />

                  <ProductCard
                      name="Outdoor Spor Ayakkabı"
                      brand="Nike"
                      price="3.799 TL"
                      image={product1Image}
                  />

                  <ProductCard
                      name="Outdoor Mont"
                      brand="The North Face"
                      price="5.999 TL"
                      image={product3Image}
                  />
                </div>

                {/* Pagination */}
                <div className="mt-12 flex items-center justify-center gap-2">
                  <button
                      type="button"
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-900 text-sm font-semibold text-white"
                  >
                    1
                  </button>

                  <button
                      type="button"
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-sm font-medium text-gray-600 hover:border-gray-900 hover:text-gray-900"
                  >
                    2
                  </button>

                  <button
                      type="button"
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-sm font-medium text-gray-600 hover:border-gray-900 hover:text-gray-900"
                  >
                    3
                  </button>

                  <span className="px-2 text-gray-400">
                  ...
                </span>

                  <button
                      type="button"
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-sm font-medium text-gray-600 hover:border-gray-900 hover:text-gray-900"
                  >
                    →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Category Suggestions */}
        <section className="border-t border-gray-100 bg-gray-50 py-16">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-8">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
                Diğer kategoriler
              </p>

              <h2 className="mt-2 text-2xl font-bold text-gray-900">
                Keşfetmeye devam et
              </h2>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              <a
                  href="/category/erkek"
                  className="group relative overflow-hidden rounded-2xl bg-gray-200"
              >
                <img
                    src={menImage}
                    alt="Erkek"
                    className="h-48 w-full object-cover transition duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-black/30" />

                <span className="absolute bottom-5 left-5 text-lg font-semibold text-white">
                Erkek
              </span>
              </a>

              <a
                  href="/category/kadin"
                  className="group relative overflow-hidden rounded-2xl bg-gray-200"
              >
                <img
                    src={womenImage}
                    alt="Kadın"
                    className="h-48 w-full object-cover transition duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-black/30" />

                <span className="absolute bottom-5 left-5 text-lg font-semibold text-white">
                Kadın
              </span>
              </a>

              <a
                  href="/category/ayakkabi"
                  className="group relative overflow-hidden rounded-2xl bg-gray-200"
              >
                <img
                    src={shoesImage}
                    alt="Ayakkabı"
                    className="h-48 w-full object-cover transition duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-black/30" />

                <span className="absolute bottom-5 left-5 text-lg font-semibold text-white">
                Ayakkabı
              </span>
              </a>

              <a
                  href="/category/outdoor"
                  className="group relative overflow-hidden rounded-2xl bg-gray-200"
              >
                <img
                    src={outdoorImage}
                    alt="Outdoor"
                    className="h-48 w-full object-cover transition duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-black/30" />

                <span className="absolute bottom-5 left-5 text-lg font-semibold text-white">
                Outdoor
              </span>
              </a>
            </div>
          </div>
        </section>
      </main>
  )
}