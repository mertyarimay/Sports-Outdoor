import type { ProductImage } from '../types/ProductImage'

const API_URL = 'http://localhost:8080/api/product-images'

export async function getProductImages(): Promise<ProductImage[]> {
    const response = await fetch(`${API_URL}/getAll`)

    if (!response.ok) {
        throw new Error('Ürün görselleri alınamadı')
    }

    return response.json()
}