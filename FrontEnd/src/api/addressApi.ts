import type {
    Address,
    AddressRequest,
} from '../types/Address'

const API_URL = 'http://localhost:8080/api/addresses'

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

export async function getMyAddresses(): Promise<Address[]> {
    const response = await fetch(
        `${API_URL}/my`,
        {
            headers: getAuthHeaders(),
        },
    )

    if (!response.ok) {
        const message = await response.text()

        throw new Error(
            message || 'Adresler alınamadı',
        )
    }

    return response.json()
}

export async function createAddress(
    address: AddressRequest,
): Promise<Address> {
    const response = await fetch(
        `${API_URL}/create`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...getAuthHeaders(),
            },
            body: JSON.stringify(address),
        },
    )

    if (!response.ok) {
        const message = await response.text()

        throw new Error(
            message || 'Adres oluşturulamadı',
        )
    }

    return response.json()
}

export async function updateAddress(
    id: number,
    address: AddressRequest,
): Promise<Address> {
    const response = await fetch(
        `${API_URL}/${id}`,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                ...getAuthHeaders(),
            },
            body: JSON.stringify(address),
        },
    )

    if (!response.ok) {
        const message = await response.text()

        throw new Error(
            message || 'Adres güncellenemedi',
        )
    }

    return response.json()
}

export async function deleteAddress(
    id: number,
): Promise<void> {
    const response = await fetch(
        `${API_URL}/${id}`,
        {
            method: 'DELETE',
            headers: getAuthHeaders(),
        },
    )

    if (!response.ok) {
        const message = await response.text()

        throw new Error(
            message || 'Adres silinemedi',
        )
    }
}

export async function getAddressById(
    id: number,
): Promise<Address> {
    const response = await fetch(
        `${API_URL}/${id}`,
        {
            headers: getAuthHeaders(),
        },
    )

    if (!response.ok) {
        const message = await response.text()

        throw new Error(
            message || 'Adres bulunamadı',
        )
    }

    return response.json()
}