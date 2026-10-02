import type { Payment, PaymentMethod } from '../types/Payment'

const API_URL = 'http://localhost:8080/api/payments'

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

export async function payOrder(
    orderId: number,
    paymentMethod: PaymentMethod,
    cardHolderName: string,
    cardNumber: string,
    expiryMonth: string,
    expiryYear: string,
    cvv: string,
): Promise<Payment> {

    const response = await fetch(`${API_URL}/pay`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...getAuthHeaders(),
        },
        body: JSON.stringify({
            orderId,
            paymentMethod,
            cardHolderName,
            cardNumber,
            expiryMonth,
            expiryYear,
            cvv,
        }),
    })

    if (!response.ok) {
        const message = await response.text()
        throw new Error(message || 'Ödeme başarısız')
    }

    return response.json()
}