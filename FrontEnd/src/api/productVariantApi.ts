import type { ProductVariant } from '../types/ProductVariant'

const API_URL = 'http://localhost:8080/api/product-variants'

export async function getProductVariants(
    productId: number,
): Promise<ProductVariant[]> {
    const response = await fetch(
        `${API_URL}/product/${productId}`,
    )

    if (!response.ok) {
        throw new Error('Ürün varyantları alınamadı')
    }

    return response.json()
}