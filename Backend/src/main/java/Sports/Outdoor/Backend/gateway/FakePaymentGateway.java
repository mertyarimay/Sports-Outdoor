package Sports.Outdoor.Backend.gateway;

import Sports.Outdoor.Backend.dto.request.PaymentRequestDto;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.YearMonth;
import java.util.UUID;

@Service
@AllArgsConstructor
public class FakePaymentGateway implements PaymentGateway{
    @Override
    public PaymentResult processPayment(PaymentRequestDto dto, BigDecimal amount) {

        String transactionId = "TRX-" +
                UUID.randomUUID()
                        .toString()
                        .replace("-", "")
                        .substring(0, 12)
                        .toUpperCase();

        // Kart numarası kontrolü
        if (!dto.getCardNumber().matches("\\d{16}")) {
            return new PaymentResult(false, transactionId, "Invalid card number.");
        }

        // CVV kontrolü
        if (!dto.getCvv().matches("\\d{3,4}")) {
            return new PaymentResult(false, transactionId, "Invalid CVV.");
        }

        // Kart sahibi boş mu?
        if (dto.getCardHolderName().isBlank()) {

            return new PaymentResult(false, transactionId, "Card holder name is required.");
        }

        // Son kullanma tarihi geçmiş mi?
        YearMonth expiryDate = YearMonth.of(2000 + Integer.parseInt(dto.getExpiryYear()), Integer.parseInt(dto.getExpiryMonth()));

        if (expiryDate.isBefore(YearMonth.now())) {
            return new PaymentResult(false, transactionId, "Card has expired.");
        }
        if (dto.getCardNumber().equals("4111111111111111")) {
            return new PaymentResult(true, transactionId, "Payment successful.");
        }

        // Fake banka cevabı
        return new PaymentResult(false, transactionId, "Payment declined by bank.");
    }
}

