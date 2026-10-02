export type PaymentMethod =
    | 'CREDIT_CARD'
    | 'DEBIT_CARD'
    | 'BANK_TRANSFER'
    | 'CASH_ON_DELIVERY'

export type PaymentStatus =
    | 'PENDING'
    | 'SUCCESS'
    | 'FAILED'
    | 'REFUNDED'

export interface Payment {
    orderNumber: string
    amount: number
    paymentMethod: PaymentMethod
    status: PaymentStatus
    transactionId: string
    paymentDate: string
    failureReason: string | null
}