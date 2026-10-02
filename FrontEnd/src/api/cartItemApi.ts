import type { CartItem } from '../types/CartItem'

const API_URL = 'http://localhost:8080/api/cart-items'

export async function getMyCartItems(): Promise<CartItem[]> {
    const response = await fetch(`${API_URL}/my`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    })

    if (!response.ok) {
        throw new Error('Sepet ürünleri alınamadı')
    }

    return response.json()
}

export async function addToCart(
    variantId: number,
    quantity: number,
): Promise<CartItem> {
    const response = await fetch(`${API_URL}/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
            variantId,
            quantity,
        }),
    })

    if (!response.ok) {
        throw new Error('Ürün sepete eklenemedi')
    }

    return response.json()
}

export async function deleteCartItem(id: number): Promise<void> {
    const response = await fetch(`${API_URL}/delete/${id}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    })

    if (!response.ok) {
        throw new Error('Ürün sepetten silinemedi')
    }
}

export async function updateCartItemQuantity(
    id: number,
    quantity: number,
): Promise<CartItem> {
    const response = await fetch(
        `${API_URL}/update/${id}?quantity=${quantity}`,
        {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        },
    )

    if (!response.ok) {
        const message = await response.text()

        throw new Error(
            message || 'Ürün miktarı güncellenemedi'
        )
    }

    return response.json()
}