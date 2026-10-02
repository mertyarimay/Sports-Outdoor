
import { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

export default function AdminRoute() {
    const [loading, setLoading] = useState(true)
    const [isAdmin, setIsAdmin] = useState(false)

    useEffect(() => {
        async function checkAdmin() {
            const token =
                localStorage.getItem('token') ||
                sessionStorage.getItem('token')

            if (!token) {
                setLoading(false)
                return
            }

            try {
                const response = await fetch(
                    'http://localhost:8080/api/users/me',
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    },
                )

                if (!response.ok) {
                    setLoading(false)
                    return
                }

                const user = await response.json()

                setIsAdmin(user.role === 'ADMIN')
            } catch (error) {
                console.error(
                    'Admin kontrolü başarısız:',
                    error,
                )

                setIsAdmin(false)
            } finally {
                setLoading(false)
            }
        }

        checkAdmin()
    }, [])

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-50">
                <p className="text-sm text-gray-500">
                    Yetki kontrol ediliyor...
                </p>
            </div>
        )
    }

    if (!isAdmin) {
        return <Navigate to="/login" replace />
    }

    return <Outlet />
}

