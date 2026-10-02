
export interface Category {
    id: number
    name: string
    slug: string
    parentId: number | null
    parentName: string | null
}

export interface CategoryRequest {
    name: string
    slug: string
    parentId: number | null
}

const API_URL = 'http://localhost:8080/api/categories'

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

export async function getCategories(): Promise<Category[]> {
    const response = await fetch(`${API_URL}/getAll`)

    if (!response.ok) {
        throw new Error('Kategoriler alınamadı')
    }

    return response.json()
}

export async function createCategory(
    category: CategoryRequest,
): Promise<Category> {
    const response = await fetch(`${API_URL}/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...getAuthHeaders(),
        },
        body: JSON.stringify(category),
    })

    if (!response.ok) {
        const message = await response.text()

        throw new Error(
            message || 'Kategori oluşturulamadı',
        )
    }

    return response.json()
}

export async function updateCategory(
    id: number,
    category: CategoryRequest,
): Promise<Category> {
    const response = await fetch(
        `${API_URL}/update/${id}`,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                ...getAuthHeaders(),
            },
            body: JSON.stringify(category),
        },
    )

    if (!response.ok) {
        const message = await response.text()

        throw new Error(
            message || 'Kategori güncellenemedi',
        )
    }

    return response.json()
}

export async function deleteCategory(
    id: number,
): Promise<void> {
    const response = await fetch(
        `${API_URL}/delete/${id}`,
{
    method: 'DELETE',
        headers: getAuthHeaders(),
},
)

if (!response.ok) {
    const message = await response.text()

    throw new Error(
        message || 'Kategori silinemedi',
    )
}
}

