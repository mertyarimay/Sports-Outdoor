export interface Product {
    id: number
    name: string
    slug: string
    description: string
    price: number
    discountPrice: number | null
    active: boolean
    gender: string
    categoryName: string
    brandName: string
    campaignTitle: string | null
}
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