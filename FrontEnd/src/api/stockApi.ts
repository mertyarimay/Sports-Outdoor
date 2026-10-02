import type { Stock } from '../types/Stock'

const API_URL = 'http://localhost:8080/api/stocks'

export async function getStockByVariantId(
    variantId: number,
): Promise<Stock> {
    const response = await fetch(
        `${API_URL}/getByVariantId/${variantId}`,
    )

    if (!response.ok) {
        throw new Error('Stok bilgisi alınamadı')
    }

    return response.json()
}