
import type { User } from '../types/User'

const API_URL = 'http://localhost:8080/api/users'

function getToken() {
    return (
        localStorage.getItem('token') ||
        sessionStorage.getItem('token')
    )
}

function getAuthHeaders() {
    return {
        Authorization: `Bearer ${getToken()}`,
    }
}

export async function getAllUsersForAdmin(): Promise<User[]> {
    const response = await fetch(
        `${API_URL}/admin/all`,
        {
            headers: getAuthHeaders(),
        },
    )

    if (!response.ok) {
        const message = await response.text()

        throw new Error(
            message || 'Kullanıcılar alınamadı',
        )
    }

    return response.json()
}

export async function updateUserRole(
    id: number,
    role: 'ADMIN' | 'CUSTOMER',
): Promise<User> {
    const response = await fetch(
        `${API_URL}/admin/${id}/role`,
{
    method: 'PUT',
        headers: {
    'Content-Type': 'application/json',
...getAuthHeaders(),
},
    body: JSON.stringify({
        role,
    }),
},
)

if (!response.ok) {
    const message = await response.text()

    throw new Error(
        message || 'Kullanıcı rolü güncellenemedi',
    )
}

return response.json()
}

export async function deleteUser(
    id: number,
): Promise<void> {
    const response = await fetch(
        `${API_URL}/admin/${id}`,
        {
            method: 'DELETE',
            headers: getAuthHeaders(),
        },
    )

    if (!response.ok) {
        const message = await response.text()

        throw new Error(
            message || 'Kullanıcı silinemedi',
        )
    }
}

export async function updateUserActive(
    id: number,
    active: boolean,
): Promise<User> {
    const response = await fetch(
        `${API_URL}/admin/${id}/active?active=${active}`,
        {
            method: 'PUT',
            headers: getAuthHeaders(),
        },
    )

    if (!response.ok) {
        const message = await response.text()

        throw new Error(
            message || 'Kullanıcı durumu güncellenemedi',
        )
    }

    return response.json()
}

