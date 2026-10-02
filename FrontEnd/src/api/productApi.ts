
import type { Product } from '../types/Product'

const API_URL = 'http://localhost:8080/api/products'

export interface ProductRequest {
    name: string
    slug: string
    description: string
    price: number
    discountPrice: number | null
    active: boolean
    gender: string
    categoryId: number
    brandId: number
    campaignId: number | null
}

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

export async function createProduct(
    product: ProductRequest,
): Promise<Product> {
    const response = await fetch(`${API_URL}/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...getAuthHeaders(),
        },
        body: JSON.stringify(product),
    })

    if (!response.ok) {
        const message = await response.text()

        throw new Error(
            message || 'Ürün oluşturulamadı',
        )
    }

    return response.json()
}

export async function updateProduct(
    id: number,
    product: ProductRequest,
): Promise<Product> {
    const response = await fetch(
        `${API_URL}/update/${id}`,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                ...getAuthHeaders(),
            },
            body: JSON.stringify(product),
        },
    )

    if (!response.ok) {
        const message = await response.text()

        throw new Error(
            message || 'Ürün güncellenemedi',
        )
    }

    return response.json()
}

export async function getProducts(): Promise<Product[]> {
    const response = await fetch(
        `${API_URL}/getAll`,
    )

    if (!response.ok) {
        throw new Error(
            'Ürünler alınamadı',
        )
    }

    return response.json()
}
export async function getAllProductsForAdmin(): Promise<Product[]> {
    const response = await fetch(`${API_URL}/admin/all`, {
        headers: getAuthHeaders(),
    })

    if (!response.ok) {
        const message = await response.text()

        throw new Error(
            message || 'Admin ürünleri alınamadı',
        )
    }

    return response.json()
}

export async function getProductById(
    id: number,
): Promise<Product> {
    const response = await fetch(
        `${API_URL}/getById/${id}`,
    )

    if (!response.ok) {
        throw new Error(
            'Ürün bulunamadı',
        )
    }

    return response.json()
}

export async function getProductBySlug(
    slug: string,
): Promise<Product> {
    const response = await fetch(
        `${API_URL}/getBySlug/${encodeURIComponent(slug)}`,
    )

    if (!response.ok) {
        throw new Error(
            'Ürün bulunamadı',
        )
    }

    return response.json()
}

