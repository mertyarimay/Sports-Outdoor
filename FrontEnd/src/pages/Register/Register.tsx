export default function Register() {
    return (
        <main className="min-h-[calc(100vh-80px)] bg-gray-50">
            <div className="mx-auto flex min-h-[calc(100vh-80px)] max-w-7xl items-center justify-center px-6 py-16">
                <div className="w-full max-w-lg">
                    {/* Header */}
                    <div className="text-center">
                        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
                            Sports&Outdoor
                        </p>

                        <h1 className="mt-3 text-3xl font-bold tracking-tight text-gray-900">
                            Hesap oluştur
                        </h1>

                        <p className="mt-3 text-sm text-gray-600">
                            Sports&Outdoor dünyasına katıl ve alışverişe başla.
                        </p>
                    </div>

                    {/* Register Card */}
                    <div className="mt-8 rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
                        <form className="space-y-5">
                            {/* Name */}
                            <div className="grid gap-5 sm:grid-cols-2">
                                <div>
                                    <label
                                        htmlFor="firstName"
                                        className="text-sm font-medium text-gray-900"
                                    >
                                        Ad
                                    </label>

                                    <input
                                        id="firstName"
                                        name="firstName"
                                        type="text"
                                        placeholder="Adın"
                                        className="mt-2 h-12 w-full rounded-xl border border-gray-300 bg-white px-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="lastName"
                                        className="text-sm font-medium text-gray-900"
                                    >
                                        Soyad
                                    </label>

                                    <input
                                        id="lastName"
                                        name="lastName"
                                        type="text"
                                        placeholder="Soyadın"
                                        className="mt-2 h-12 w-full rounded-xl border border-gray-300 bg-white px-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
                                    />
                                </div>
                            </div>

                            {/* Email */}
                            <div>
                                <label
                                    htmlFor="email"
                                    className="text-sm font-medium text-gray-900"
                                >
                                    E-posta
                                </label>

                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="ornek@email.com"
                                    className="mt-2 h-12 w-full rounded-xl border border-gray-300 bg-white px-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
                                />
                            </div>

                            {/* Password */}
                            <div>
                                <label
                                    htmlFor="password"
                                    className="text-sm font-medium text-gray-900"
                                >
                                    Şifre
                                </label>

                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="En az 8 karakter"
                                    className="mt-2 h-12 w-full rounded-xl border border-gray-300 bg-white px-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
                                />
                            </div>

                            {/* Confirm Password */}
                            <div>
                                <label
                                    htmlFor="confirmPassword"
                                    className="text-sm font-medium text-gray-900"
                                >
                                    Şifre Tekrar
                                </label>

                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    placeholder="Şifreni tekrar gir"
                                    className="mt-2 h-12 w-full rounded-xl border border-gray-300 bg-white px-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
                                />
                            </div>

                            {/* Terms */}
                            <label className="flex items-start gap-3 text-sm text-gray-600">
                                <input
                                    type="checkbox"
                                    className="mt-0.5 h-4 w-4 shrink-0 rounded border-gray-300"
                                />

                                <span>
                  <a
                      href="#"
                      className="font-medium text-gray-900 underline underline-offset-4"
                  >
                    Kullanım koşullarını
                  </a>{' '}
                                    ve{' '}
                                    <a
                                        href="#"
                                        className="font-medium text-gray-900 underline underline-offset-4"
                                    >
                    gizlilik politikasını
                  </a>{' '}
                                    kabul ediyorum.
                </span>
                            </label>

                            {/* Submit */}
                            <button
                                type="submit"
                                className="h-12 w-full rounded-full bg-gray-900 px-6 text-sm font-semibold text-white transition hover:bg-gray-700"
                            >
                                Hesap Oluştur
                            </button>
                        </form>

                        {/* Login */}
                        <div className="mt-7 border-t border-gray-100 pt-7 text-center">
                            <p className="text-sm text-gray-500">
                                Zaten hesabın var mı?
                            </p>

                            <a
                                href="/login"
                                className="mt-2 inline-block text-sm font-semibold text-gray-900 underline underline-offset-4"
                            >
                                Giriş Yap
                            </a>
                        </div>
                    </div>

                    {/* Security */}
                    <p className="mt-6 text-center text-xs text-gray-400">
                        🔒 Kişisel bilgilerin güvenli şekilde korunmaktadır.
                    </p>
                </div>
            </div>
        </main>
    )
}
