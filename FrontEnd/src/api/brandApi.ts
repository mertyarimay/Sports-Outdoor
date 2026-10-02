export interface Brand {
    id: number
    name: string
    logoUrl: string | null
    description: string | null
}

const API_URL = 'http://localhost:8080/api/brands'

export async function getBrands(): Promise<Brand[]> {
    const response = await fetch(`${API_URL}/getAll`)

    if (!response.ok) {
        throw new Error('Markalar alınamadı')
    }

    return response.json()
}