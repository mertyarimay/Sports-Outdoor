export interface Campaign {
    id: number
    title: string
    discountPercent: number
    startDate: string
    endDate: string
}

const API_URL = 'http://localhost:8080/api/campaigns'

export async function getCampaigns(): Promise<Campaign[]> {
    const response = await fetch(`${API_URL}/getAll`)

    if (!response.ok) {
        throw new Error('Kampanyalar alınamadı')
    }

    return response.json()
}