export default function Header() {
    return (
        <header className="border-b border-gray-200 bg-white">
            <div className="mx-auto flex h-20 max-w-7xl items-center gap-8 px-6">
                <div className="shrink-0">
                    <a
                        href="/"
                        className="text-2xl font-bold tracking-tight text-gray-900"
                    >
                        Sports&Outdoor
                    </a>
                </div>

                <div className="flex flex-1 justify-center">
                    <div className="relative w-full max-w-xl">
                        <input
                            type="text"
                            placeholder="Ürün, marka veya kategori ara..."
                            className="w-full rounded-full border border-gray-300 bg-gray-50 py-3 pl-5 pr-12 text-sm outline-none transition focus:border-gray-900 focus:bg-white"
                        />

                        <button
                            type="button"
                            className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-gray-900 text-white"
                            aria-label="Ara"
                        >
                            🔍
                        </button>
                    </div>
                </div>

                <div className="flex shrink-0 items-center gap-5">
                    <button
                        type="button"
                        className="text-sm font-medium text-gray-700 transition hover:text-gray-950"
                    >
                        ♡
                    </button>

                    <button
                        type="button"
                        className="text-sm font-medium text-gray-700 transition hover:text-gray-950"
                    >
                        Hesabım
                    </button>

                    <button
                        type="button"
                        className="text-sm font-medium text-gray-700 transition hover:text-gray-950"
                    >
                        🛒
                    </button>
                </div>
            </div>
        </header>
    )
}