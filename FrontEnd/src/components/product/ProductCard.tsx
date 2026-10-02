import { Link } from 'react-router-dom'

interface ProductCardProps {
  name: string
  brand: string
  price: string
  image: string
  discount?: string
  slug: string
}

export default function ProductCard({
                                      name,
                                      brand,
                                      price,
                                      image,
                                      discount,
                                      slug,
                                    }: ProductCardProps) {
  return (
      <Link
          to={`/products/${slug}`}
          className="group block"
      >
        <article>
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-gray-100">

            {image ? (
                <img
                    src={image}
                    alt={name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
            ) : (
                <div className="flex h-full items-center justify-center">
              <span className="text-sm text-gray-400">
                Görsel bulunamadı
              </span>
                </div>
            )}

            <button
                type="button"
                aria-label="Favorilere ekle"
                onClick={(event) => {
                  event.preventDefault()
                }}
                className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-lg shadow-sm transition hover:bg-gray-900 hover:text-white"
            >
              ♡
            </button>

            {discount && (
                <span className="absolute left-4 top-4 rounded-full bg-red-600 px-3 py-1 text-xs font-semibold text-white">
              {discount}
            </span>
            )}

          </div>

          <div className="mt-4">

            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              {brand}
            </p>

            <h3 className="mt-1 text-base font-semibold text-gray-900">
              {name}
            </h3>

            <p className="mt-2 text-base font-bold text-gray-900">
              {price}
            </p>

          </div>
        </article>
      </Link>
  )
}