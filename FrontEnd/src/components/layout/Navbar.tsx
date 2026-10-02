export default function Navbar() {
    const categories = [
        'Erkek',
        'Kadın',
        'Çocuk',
        'Ayakkabı',
        'Giyim',
        'Outdoor',
        'Kampanya',
    ]

    return (
        <nav className="border-b border-gray-200 bg-white">
            <div className="mx-auto flex max-w-7xl items-center justify-center px-6">
                <div className="flex items-center gap-8 py-4">
                    {categories.map((category) => (
                        <a
                            key={category}
                            href="#"
                            className="text-sm font-medium text-gray-700 transition hover:text-gray-950"
                        >
                            {category}
                        </a>
                    ))}
                </div>
            </div>
        </nav>
    )
}