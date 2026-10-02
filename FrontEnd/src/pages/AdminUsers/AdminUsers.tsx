
import { useEffect, useState } from 'react'
import {
    getAllUsersForAdmin,
    updateUserRole,
    updateUserActive,
} from '../../api/userApi'
import type { User } from '../../types/User'

export default function AdminUsers() {
    const [users, setUsers] = useState<User[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        async function loadUsers() {
            try {
                const data = await getAllUsersForAdmin()

                setUsers(data)
            } catch (error) {
                setError(
                    error instanceof Error
                        ? error.message
                        : 'Kullanıcılar alınamadı',
                )
            } finally {
                setLoading(false)
            }
        }

        loadUsers()
    }, [])

    async function handleRoleChange(
        id: number,
        currentRole: 'ADMIN' | 'CUSTOMER',
    ) {
        const newRole =
            currentRole === 'ADMIN'
                ? 'CUSTOMER'
                : 'ADMIN'

        const confirmed = window.confirm(
            `Bu kullanıcının rolünü ${newRole} yapmak istediğine emin misin?`,
        )

        if (!confirmed) {
            return
        }

        try {
            const updatedUser = await updateUserRole(
                id,
                newRole,
            )

            setUsers((currentUsers) =>
                currentUsers.map((user) =>
                    user.id === id
                        ? updatedUser
                        : user,
                ),
            )
        } catch (error) {
            alert(
                error instanceof Error
                    ? error.message
                    : 'Rol güncellenemedi',
            )
        }
    }

    async function handleActiveChange(
        id: number,
        currentActive: boolean,
    ) {
        const newActive = !currentActive

        const confirmed = window.confirm(
            newActive
                ? 'Bu kullanıcıyı aktif yapmak istediğine emin misin?'
                : 'Bu kullanıcıyı pasif yapmak istediğine emin misin?',
        )

        if (!confirmed) {
            return
        }

        try {
            const updatedUser =
                await updateUserActive(
                    id,
                    newActive,
                )

            setUsers((currentUsers) =>
                currentUsers.map((user) =>
                    user.id === id
                        ? updatedUser
                        : user,
                ),
            )
        } catch (error) {
            alert(
                error instanceof Error
                    ? error.message
                    : 'Kullanıcı durumu güncellenemedi',
            )
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 p-6">
                Kullanıcılar yükleniyor...
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="mx-auto max-w-7xl">

                <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                        Kullanıcı Yönetimi
                    </h1>

                    <p className="mt-1 text-sm text-gray-500">
                        Sistemde kayıtlı kullanıcıları görüntüle ve yönet.
                    </p>
                </div>

                {error && (
                    <div className="mt-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                        {error}
                    </div>
                )}

                <div className="mt-6 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

                    <div className="border-b border-gray-200 px-6 py-4">
                        <h2 className="font-semibold text-gray-900">
                            Kullanıcılar ({users.length})
                        </h2>
                    </div>

                    {users.length === 0 ? (
                        <div className="p-6 text-sm text-gray-500">
                            Henüz kullanıcı bulunmuyor.
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">

                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-4 text-xs font-semibold uppercase text-gray-500">
                                            ID
                                        </th>

                                        <th className="px-6 py-4 text-xs font-semibold uppercase text-gray-500">
                                            Ad Soyad
                                        </th>

                                        <th className="px-6 py-4 text-xs font-semibold uppercase text-gray-500">
                                            E-posta
                                        </th>

                                        <th className="px-6 py-4 text-xs font-semibold uppercase text-gray-500">
                                            Rol
                                        </th>

                                        <th className="px-6 py-4 text-xs font-semibold uppercase text-gray-500">
                                            Durum
                                        </th>

                                        <th className="px-6 py-4 text-xs font-semibold uppercase text-gray-500">
                                            İşlemler
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-gray-100">

                                    {users.map((user) => (
                                        <tr
                                            key={user.id}
                                            className="hover:bg-gray-50"
                                        >

                                            <td className="px-6 py-4 text-sm text-gray-500">
                                                {user.id}
                                            </td>

                                            <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                                {user.firstName}{' '}
                                                {user.lastName}
                                            </td>

                                            <td className="px-6 py-4 text-sm text-gray-600">
                                                {user.email}
                                            </td>

                                            <td className="px-6 py-4">
                                                <span
                                                    className={
                                                        user.role ===
                                                        'ADMIN'
                                                            ? 'rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-700'
                                                            : 'rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700'
                                                    }
                                                >
                                                    {user.role}
                                                </span>
                                            </td>

                                            <td className="px-6 py-4">
                                                <span
                                                    className={
                                                        user.active
                                                            ? 'rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700'
                                                            : 'rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700'
                                                    }
                                                >
                                                    {user.active
                                                        ? 'AKTİF'
                                                        : 'PASİF'}
                                                </span>
                                            </td>

                                            <td className="px-6 py-4">
                                                <div className="flex flex-wrap gap-2">

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            handleRoleChange(
                                                                user.id,
                                                                user.role,
                                                            )
                                                        }
                                                        className="rounded-lg border border-gray-300 px-3 py-2 text-xs font-semibold text-gray-700 transition hover:bg-gray-100"
                                                    >
                                                        {user.role ===
                                                        'ADMIN'
                                                            ? 'Müşteri Yap'
                                                            : 'Admin Yap'}
                                                    </button>

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            handleActiveChange(
                                                                user.id,
                                                                user.active,
                                                            )
                                                        }
                                                        className={
                                                            user.active
                                                                ? 'rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold text-red-700 transition hover:bg-red-100'
                                                                : 'rounded-lg border border-green-200 bg-green-50 px-3 py-2 text-xs font-semibold text-green-700 transition hover:bg-green-100'
                                                        }
                                                    >
                                                        {user.active
                                                            ? 'Pasif Yap'
                                                            : 'Aktif Yap'}
                                                    </button>

                                                </div>
                                            </td>

                                        </tr>
                                    ))}

                                </tbody>

                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

