export interface Category {
    id: number
    name: string
    slug: string
    parentId: number | null
    parentName: string | null
}

const API_URL = 'http://localhost:8080/api/categories'

export async function getCategories(): Promise<Category[]> {
    const response = await fetch(`${API_URL}/getAll`)

    if (!response.ok) {
        throw new Error('Kategoriler alınamadı')
    }

    return response.json()
}