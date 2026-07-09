package Sports.Outdoor.Backend.service.paymentService;

import Sports.Outdoor.Backend.dto.request.PaymentRequestDto;
import Sports.Outdoor.Backend.dto.response.PaymentResponseDto;
import org.springframework.security.core.Authentication;

import java.util.List;

public interface PaymentService {
    PaymentResponseDto pay(PaymentRequestDto dto, Authentication authentication);

    List<PaymentResponseDto> getMyPayments(Authentication authentication);

    PaymentResponseDto getPaymentByTransactionId(String transactionId, Authentication authentication);
}
