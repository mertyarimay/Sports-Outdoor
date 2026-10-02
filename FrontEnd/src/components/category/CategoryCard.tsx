
interface CategoryCardProps {
  name: string
  description: string
  image: string
}

export default function CategoryCard({
  name,
  description,
  image,
}: CategoryCardProps) {
  return (
    <a
      href="#"
      className="group relative flex min-h-[300px] overflow-hidden rounded-2xl bg-gray-200"
    >
      <img
        src={image}
        alt={name}
        className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

      <div className="relative mt-auto p-6">
        <h3 className="text-2xl font-semibold text-white">
          {name}
        </h3>

        <p className="mt-2 text-sm text-gray-200">
          {description}
        </p>

        <span className="mt-4 inline-block text-sm font-semibold text-white underline underline-offset-4">
          Keşfet →
        </span>
      </div>
    </a>
  )
}

