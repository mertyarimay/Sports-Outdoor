package Sports.Outdoor.Backend.gateway;

import Sports.Outdoor.Backend.dto.request.PaymentRequestDto;

import java.math.BigDecimal;

public interface PaymentGateway {
    PaymentResult processPayment(PaymentRequestDto dto, BigDecimal amount);
}
