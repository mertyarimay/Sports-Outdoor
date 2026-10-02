export interface Address {
    id: number
    city: string
    district: string
    fullAddress: string
    postalCode: string
    userId: number
}

export interface AddressRequest {
    city: string
    district: string
    fullAddress: string
    postalCode: string
}