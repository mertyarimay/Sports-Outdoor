
import menImage from '../../assets/categories/Men.jpg'
import womenImage from '../../assets/categories/Women.jpg'
import shoesImage from '../../assets/categories/shoes.jpg'
import outdoorImage from '../../assets/categories/outdoor.jpg'

import product1Image from '../../assets/products/product-1.jpg'
import product2Image from '../../assets/products/product-2.jpg'
import product3Image from '../../assets/products/product-3.jpg'
import product4Image from '../../assets/products/product-4.jpg'

import CategoryCard from '../../components/category/CategoryCard'
import ProductCard from '../../components/product/ProductCard'

export default function Home() {
  return (
    <main className="bg-white">
      {/* Hero */}
      <section className="bg-gray-100">
        <div className="mx-auto grid min-h-[520px] max-w-7xl items-center gap-12 px-6 py-16 lg:grid-cols-2">
          <div className="max-w-xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
              Yeni Sezon
            </p>

            <h1 className="text-5xl font-bold leading-tight tracking-tight text-gray-900 md:text-6xl">
              Outdoor macerana hazırlan.
            </h1>

            <p className="mt-6 max-w-lg text-lg leading-8 text-gray-600">
              Spor ve outdoor dünyasının ihtiyaç duyduğun ürünlerini keşfet.
              Maceran nerede başlarsa başlasın, hazır ol.
            </p>

            <div className="mt-8 flex gap-4">
              <a
                href="/products"
                className="rounded-full bg-gray-900 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-gray-700"
              >
                Ürünleri Keşfet
              </a>

              <a
                href="/category/outdoor"
                className="rounded-full border border-gray-300 bg-white px-7 py-3.5 text-sm font-semibold text-gray-900 transition hover:bg-gray-50"
              >
                Outdoor
              </a>
            </div>
          </div>

          <div className="flex min-h-[360px] items-center justify-center rounded-3xl bg-gray-200">
            <span className="text-sm font-medium text-gray-500">
              Hero görseli
            </span>
          </div>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-10">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
              Keşfet
            </p>

            <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900">
              Popüler Kategoriler
            </h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <CategoryCard
              name="Erkek"
              description="Spor ve günlük giyim"
              image={menImage}
            />

            <CategoryCard
              name="Kadın"
              description="Spor ve outdoor koleksiyonu"
              image={womenImage}
            />

            <CategoryCard
              name="Ayakkabı"
              description="Koşu, yürüyüş ve günlük"
              image={shoesImage}
            />

            <CategoryCard
              name="Outdoor"
              description="Kamp ve doğa ürünleri"
              image={outdoorImage}
            />
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
                Koleksiyon
              </p>

              <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900">
                Öne Çıkan Ürünler
              </h2>
            </div>

            <a
              href="/products"
              className="hidden text-sm font-semibold text-gray-900 underline underline-offset-4 sm:block"
            >
              Tüm ürünleri gör →
            </a>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <ProductCard
              name="Sweatshirt"
              brand="Nike"
              price="3.499 TL"
              image={product1Image}
            />

            <ProductCard
              name="T shirt"
              brand="Adidas"
              price="2.999 TL"
              image={product2Image}
              discount="%20"
            />

            <ProductCard
              name="Koşu ayakkabısı"
              brand="The North Face"cd
              price="5.499 TL"
              image={product3Image}
            />

            <ProductCard
              name="Kamp Çantası"
              brand="Salomon"
              price="4.299 TL"
              image={product4Image}
            />
          </div>
        </div>
      </section>

      {/* Why Sports&Outdoor */}
      <section className="border-t border-gray-100 bg-white py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
              Sports&Outdoor
            </p>

            <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900">
              Neden bizi tercih etmelisin?
            </h2>

            <p className="mt-4 text-gray-600">
              Spor ve outdoor alışverişini daha kolay, güvenli ve keyifli
              hale getirmek için buradayız.
            </p>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {/* Fast Delivery */}
            <div className="rounded-2xl border border-gray-100 bg-gray-50 p-8 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gray-900 text-2xl text-white">
                🚚
              </div>

              <h3 className="mt-5 text-lg font-semibold text-gray-900">
                Hızlı Teslimat
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-600">
                Siparişlerini hızlı ve güvenli şekilde adresine ulaştırıyoruz.
              </p>
            </div>

            {/* Secure Payment */}
            <div className="rounded-2xl border border-gray-100 bg-gray-50 p-8 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gray-900 text-2xl text-white">
                🔒
              </div>

              <h3 className="mt-5 text-lg font-semibold text-gray-900">
                Güvenli Ödeme
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-600">
                Ödeme işlemlerini güvenli altyapımız ile kolayca
                gerçekleştirebilirsin.
              </p>
            </div>

            {/* Easy Returns */}
            <div className="rounded-2xl border border-gray-100 bg-gray-50 p-8 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gray-900 text-2xl text-white">
                ↩
              </div>

              <h3 className="mt-5 text-lg font-semibold text-gray-900">
                Kolay İade
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-600">
                Memnun kalmadığın ürünleri kolay ve hızlı bir şekilde
                iade edebilirsin.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Campaign Banner */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-3xl bg-gray-900 px-8 py-16 sm:px-12 lg:px-16">
            {/* Decorative background */}
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gray-700 opacity-30" />
            <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-gray-700 opacity-20" />

            <div className="relative max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-400">
                Yeni Sezon
              </p>

              <h2 className="mt-4 text-4xl font-bold tracking-tight text-white md:text-5xl">
                Outdoor koleksiyonunda
                <span className="block text-gray-300">
                  %20'ye varan indirim.
                </span>
              </h2>

              <p className="mt-6 max-w-xl text-base leading-7 text-gray-300">
                Yeni sezon spor ve outdoor ürünlerini keşfet.
                Favori ürünlerini şimdi avantajlı fiyatlarla yakala.
              </p>

              <a
                  href="/products"
                  className="mt-8 inline-flex rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-gray-900 transition hover:bg-gray-200"
              >
                Kampanyaları Keşfet →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Brands */}
      <section className="border-t border-gray-100 bg-white py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-10">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
              Markalar
            </p>

            <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900">
              Popüler Markalar
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            <a
                href="#"
                className="flex h-28 items-center justify-center rounded-2xl border border-gray-200 bg-gray-50 px-4 text-lg font-bold text-gray-800 transition hover:-translate-y-1 hover:bg-white hover:shadow-md"
            >
              Nike
            </a>

            <a
                href="#"
                className="flex h-28 items-center justify-center rounded-2xl border border-gray-200 bg-gray-50 px-4 text-lg font-bold text-gray-800 transition hover:-translate-y-1 hover:bg-white hover:shadow-md"
            >
              Adidas
            </a>

            <a
                href="#"
                className="flex h-28 items-center justify-center rounded-2xl border border-gray-200 bg-gray-50 px-4 text-lg font-bold text-gray-800 transition hover:-translate-y-1 hover:bg-white hover:shadow-md"
            >
              Puma
            </a>

            <a
                href="#"
                className="flex h-28 items-center justify-center rounded-2xl border border-gray-200 bg-gray-50 px-4 text-lg font-bold text-gray-800 transition hover:-translate-y-1 hover:bg-white hover:shadow-md"
            >
              Salomon
            </a>

            <a
                href="#"
                className="flex h-28 items-center justify-center rounded-2xl border border-gray-200 bg-gray-50 px-4 text-lg font-bold text-gray-800 transition hover:-translate-y-1 hover:bg-white hover:shadow-md"
            >
              The North Face
            </a>

            <a
                href="#"
                className="flex h-28 items-center justify-center rounded-2xl border border-gray-200 bg-gray-50 px-4 text-lg font-bold text-gray-800 transition hover:-translate-y-1 hover:bg-white hover:shadow-md"
            >
              Columbia
            </a>
          </div>
        </div>
      </section>


      {/* Newsletter */}
      <section className="bg-gray-100 py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
            Bülten
          </p>

          <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
            Yeni ürünlerden ilk sen haberdar ol.
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            Yeni sezon ürünleri, özel kampanyalar ve Sports&Outdoor
            fırsatlarını kaçırmamak için e-posta listemize katıl.
          </p>

          <form className="mx-auto mt-8 flex max-w-xl flex-col gap-3 sm:flex-row">
            <input
                type="email"
                placeholder="E-posta adresin"
                className="min-h-12 flex-1 rounded-full border border-gray-300 bg-white px-5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
            />

            <button
                type="submit"
                className="min-h-12 rounded-full bg-gray-900 px-7 text-sm font-semibold text-white transition hover:bg-gray-700"
            >
              Abone Ol
            </button>
          </form>

          <p className="mt-4 text-xs text-gray-500">
            E-posta adresini yalnızca kampanya ve ürün duyuruları için
            kullanacağız.
          </p>
        </div>
      </section>




    </main>
  )
}

