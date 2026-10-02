export interface CartItem {
    id: number
    quantity: number
    cartId: number
    variantId: number
    sku: string
    color: string
    size: string
    productName: string
    price: number
    discountPrice: number | null
    imageUrl: string | null
    brandName: string | null
}