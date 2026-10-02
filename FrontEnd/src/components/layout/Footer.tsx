
export default function Footer() {
  return (
    <footer className="bg-gray-950 text-white">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold">
              Sports&Outdoor
            </h2>

            <p className="mt-4 max-w-xs text-sm leading-6 text-gray-400">
              Spor ve outdoor dünyasında ihtiyacın olan ürünleri
              keşfet. Maceran nerede başlarsa başlasın, hazır ol.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-300">
              Alışveriş
            </h3>

            <ul className="mt-5 space-y-3 text-sm text-gray-400">
              <li>
                <a href="/products" className="transition hover:text-white">
                  Tüm Ürünler
                </a>
              </li>

              <li>
                <a href="/category/men" className="transition hover:text-white">
                  Erkek
                </a>
              </li>

              <li>
                <a href="/category/women" className="transition hover:text-white">
                  Kadın
                </a>
              </li>

              <li>
                <a href="/category/outdoor" className="transition hover:text-white">
                  Outdoor
                </a>
              </li>
            </ul>
          </div>

          {/* Customer */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-300">
              Müşteri Hizmetleri
            </h3>

            <ul className="mt-5 space-y-3 text-sm text-gray-400">
              <li>
                <a href="#" className="transition hover:text-white">
                  İletişim
                </a>
              </li>

              <li>
                <a href="#" className="transition hover:text-white">
                  Kargo ve Teslimat
                </a>
              </li>

              <li>
                <a href="#" className="transition hover:text-white">
                  İade ve Değişim
                </a>
              </li>

              <li>
                <a href="#" className="transition hover:text-white">
                  Sıkça Sorulan Sorular
                </a>
              </li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-300">
              Hesabım
            </h3>

            <ul className="mt-5 space-y-3 text-sm text-gray-400">
              <li>
                <a href="/login" className="transition hover:text-white">
                  Giriş Yap
                </a>
              </li>

              <li>
                <a href="/register" className="transition hover:text-white">
                  Kayıt Ol
                </a>
              </li>

              <li>
                <a href="/profile" className="transition hover:text-white">
                  Profilim
                </a>
              </li>

              <li>
                <a href="/cart" className="transition hover:text-white">
                  Sepetim
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-gray-800 pt-8">
          <div className="flex flex-col gap-4 text-sm text-gray-500 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © 2026 Sports&Outdoor. Tüm hakları saklıdır.
            </p>

            <div className="flex gap-5">
              <a href="#" className="transition hover:text-white">
                Instagram
              </a>

              <a href="#" className="transition hover:text-white">
                Facebook
              </a>

              <a href="#" className="transition hover:text-white">
                X
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

