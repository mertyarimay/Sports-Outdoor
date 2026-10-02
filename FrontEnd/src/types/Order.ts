import type { OrderStatus } from './OrderStatus'

export interface Order {
    id: number
    orderNumber: string
    orderDate: string
    totalPrice: number
    status: OrderStatus

    userId: number
    userEmail: string

    addressId: number
    city: string
    district: string
    fullAddress: string

    items: OrderItem[]
}

export interface OrderItem {
    id: number
    variantId: number

    sku: string
    productName: string
    color: string
    size: string

    quantity: number
    unitPrice: number
    totalPrice: number
}