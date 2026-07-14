package Sports.Outdoor.Backend.controller;

import Sports.Outdoor.Backend.dto.request.PaymentRequestDto;
import Sports.Outdoor.Backend.dto.response.PaymentResponseDto;
import Sports.Outdoor.Backend.service.paymentService.PaymentService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/payments")
@AllArgsConstructor
public class PaymentController {
    private final PaymentService paymentService;

    @PostMapping("/pay")
    public ResponseEntity<PaymentResponseDto> pay(@Valid @RequestBody PaymentRequestDto dto, Authentication authentication) {
        return ResponseEntity.ok(paymentService.pay(dto, authentication));
    }

    @GetMapping("/myPays")
    public ResponseEntity<List<PaymentResponseDto>> getMyPayments(Authentication authentication) {

        return ResponseEntity.ok(paymentService.getMyPayments(authentication));
    }

    @GetMapping("/{transactionId}")
    public ResponseEntity<PaymentResponseDto> getPaymentByTransactionId(@PathVariable String transactionId, Authentication authentication) {

        return ResponseEntity.ok(paymentService.getPaymentByTransactionId(transactionId,authentication));
    }
}
