
import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setError('')
    setLoading(true)

    try {
      const response = await fetch(
        'http://localhost:8080/api/auth/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password,
          }),
        },
      )

      if (!response.ok) {
        throw new Error('E-posta veya şifre hatalı.')
      }

      const data = await response.json()

      console.log('Login response:', data)

      if (!data.token) {
        throw new Error('Token alınamadı.')
      }

      // JWT token'ı localStorage'a kaydediyoruz.
      // Cart API'leri de token'ı buradan okuyacak.
      localStorage.setItem('token', data.token)

      // Giriş başarılı
      navigate('/')
    } catch (err) {
      console.error(err)

      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('Giriş yapılırken bir hata oluştu.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-[calc(100vh-80px)] bg-gray-50">
      <div className="mx-auto flex min-h-[calc(100vh-80px)] max-w-7xl items-center justify-center px-6 py-16">
        <div className="w-full max-w-md">

          {/* Header */}
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
              Sports&Outdoor
            </p>

            <h1 className="mt-3 text-3xl font-bold tracking-tight text-gray-900">
              Tekrar hoş geldin
            </h1>

            <p className="mt-3 text-sm text-gray-600">
              Hesabına giriş yap ve alışverişe devam et.
            </p>
          </div>

          {/* Login Card */}
          <div className="mt-8 rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

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
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="ornek@email.com"
                  required
                  className="mt-2 h-12 w-full rounded-xl border border-gray-300 bg-white px-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
                />
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="text-sm font-medium text-gray-900"
                  >
                    Şifre
                  </label>

                  <a
                    href="#"
                    className="text-xs font-medium text-gray-500 underline underline-offset-4 transition hover:text-gray-900"
                  >
                    Şifremi unuttum
                  </a>
                </div>

                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="••••••••"
                  required
                  className="mt-2 h-12 w-full rounded-xl border border-gray-300 bg-white px-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
                />
              </div>

              {/* Remember Me */}
              <label className="flex items-center gap-3 text-sm text-gray-600">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(event) =>
                    setRememberMe(event.target.checked)
                  }
                  className="h-4 w-4 rounded border-gray-300"
                />

                Beni hatırla
              </label>

              {/* Error */}
              {error && (
                <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
                  {error}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="h-12 w-full rounded-full bg-gray-900 px-6 text-sm font-semibold text-white transition hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
              </button>

            </form>

            {/* Register */}
            <div className="mt-7 border-t border-gray-100 pt-7 text-center">
              <p className="text-sm text-gray-500">
                Henüz hesabın yok mu?
              </p>

              <a
                href="/register"
                className="mt-2 inline-block text-sm font-semibold text-gray-900 underline underline-offset-4"
              >
                Hesap oluştur
              </a>
            </div>

          </div>

          {/* Security */}
          <p className="mt-6 text-center text-xs text-gray-400">
            🔒 Bilgilerin güvenli şekilde korunmaktadır.
          </p>

        </div>
      </div>
    </main>
  )
}
