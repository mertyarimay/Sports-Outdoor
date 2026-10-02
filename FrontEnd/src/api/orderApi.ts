import type { Order } from '../types/Order'

const API_URL = 'http://localhost:8080/api/orders'

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

export async function createOrder(
    addressId: number,
    couponCode?: string,
): Promise<Order> {
    const response = await fetch(`${API_URL}/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...getAuthHeaders(),
        },
        body: JSON.stringify({
            addressId,
            couponCode,
        }),
    })

    if (!response.ok) {
        const message = await response.text()
        throw new Error(message || 'Sipariş oluşturulamadı')
    }

    return response.json()
}

export async function getMyOrders(): Promise<Order[]> {
    const response = await fetch(`${API_URL}/my`, {
        headers: getAuthHeaders(),
    })

    if (!response.ok) {
        const message = await response.text()
        throw new Error(message || 'Siparişler alınamadı')
    }

    return response.json()
}

export async function getMyOrderById(id: number): Promise<Order> {
    const response = await fetch(`${API_URL}/getById/${id}`, {
        headers: getAuthHeaders(),
    })

    if (!response.ok) {
        const message = await response.text()
        throw new Error(message || 'Sipariş alınamadı')
    }

    return response.json()
}

export async function cancelOrder(id: number): Promise<Order> {
    const response = await fetch(`${API_URL}/${id}/cancel`, {
        method: 'PUT',
        headers: getAuthHeaders(),
    })

    if (!response.ok) {
        const message = await response.text()
        throw new Error(message || 'Sipariş iptal edilemedi')
    }

    return response.json()
}
export async function getAllOrdersForAdmin(): Promise<Order[]> {
    const response = await fetch(`${API_URL}/admin/all`, {
        headers: getAuthHeaders(),
    })

    if (!response.ok) {
        const message = await response.text()
        throw new Error(message || 'Siparişler alınamadı')
    }

    return response.json()
}

export async function getOrderByIdForAdmin(id: number): Promise<Order> {
    const response = await fetch(`${API_URL}/admin/${id}`, {
        headers: getAuthHeaders(),
    })

    if (!response.ok) {
        const message = await response.text()
        throw new Error(message || 'Sipariş detayı alınamadı')
    }

    return response.json()
}


export async function updateOrderStatus(
    id: number,
    status: Order['status'],
): Promise<Order> {
    const response = await fetch(`${API_URL}/admin/${id}/status`, {
    method: 'PUT',
    headers: {
    'Content-Type': 'application/json',
...getAuthHeaders(),
},
body: JSON.stringify({
    status,
}),
})

if (!response.ok) {
    const message = await response.text()
    throw new Error(
        message || 'Sipariş durumu güncellenemedi',
    )
}

return response.json()
}




