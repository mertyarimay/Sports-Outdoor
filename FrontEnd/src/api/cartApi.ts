import type { Cart } from '../types/Cart'

const API_URL = 'http://localhost:8080/api/carts'

export async function getMyCart(): Promise<Cart> {
    const response = await fetch(`${API_URL}/my/cart`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    })

    if (!response.ok) {
        throw new Error('Sepet bilgileri alınamadı')
    }

    return response.json()
}

export async function createCart(): Promise<Cart> {
    const response = await fetch(`${API_URL}/create`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    })

    if (!response.ok) {
        throw new Error('Sepet oluşturulamadı')
    }

    return response.json()
}