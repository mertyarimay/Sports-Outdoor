package Sports.Outdoor.Backend.service.paymentService;

import Sports.Outdoor.Backend.dto.request.PaymentRequestDto;
import Sports.Outdoor.Backend.dto.response.PaymentResponseDto;
import Sports.Outdoor.Backend.entity.Order;
import Sports.Outdoor.Backend.entity.Payment;
import Sports.Outdoor.Backend.entity.User;
import Sports.Outdoor.Backend.enums.OrderStatus;
import Sports.Outdoor.Backend.enums.PaymentStatus;
import Sports.Outdoor.Backend.exception.BusinessExcepiton;
import Sports.Outdoor.Backend.exception.NotFoundException;
import Sports.Outdoor.Backend.gateway.PaymentGateway;
import Sports.Outdoor.Backend.gateway.PaymentResult;
import Sports.Outdoor.Backend.repository.OrderRepository;
import Sports.Outdoor.Backend.repository.PaymentRepository;
import Sports.Outdoor.Backend.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@AllArgsConstructor
public class PaymentServiceImpl implements PaymentService{
    private final PaymentRepository paymentRepository;

    private final OrderRepository orderRepository;

    private final UserRepository userRepository;

    private final PaymentGateway paymentGateway;

    @Override
    @Transactional
    public PaymentResponseDto pay(PaymentRequestDto dto, Authentication authentication) {

        // JWT'den kullanıcıyı al
        User user = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new NotFoundException("User not found"));

        // Siparişi bul
        Order order = orderRepository.findById(dto.getOrderId())
                .orElseThrow(() -> new NotFoundException("Order not found"));

        // Sipariş kullanıcıya mı ait?
        if (!order.getUser().getId().equals(user.getId())) {
            throw new AccessDeniedException("Başka bir kullanıcının siparişini ödeyemezsiniz.");
        }

        // Sipariş iptal edilmiş mi?
        if (order.getStatus() == OrderStatus.CANCELLED) {
            throw new BusinessExcepiton("İptal edilen siparişler için ödeme yapılamaz.");
        }

        // Sipariş zaten ödenmiş mi?
        if (order.getStatus() == OrderStatus.PAID) {
            throw new BusinessExcepiton("Bu sipariş zaten ödenmiştir.");
        }

        // Daha önce başarılı ödeme yapılmış mı?
        if (paymentRepository.existsByOrderIdAndStatus(order.getId(), PaymentStatus.SUCCESS)) {

            throw new BusinessExcepiton("Ödeme zaten tamamlandı.");
        }

        // Fake ödeme sistemi
        PaymentResult result = paymentGateway.processPayment(dto, order.getTotalPrice());

        // Payment oluştur
        Payment payment = new Payment();

        payment.setOrder(order);
        payment.setAmount(order.getTotalPrice());
        payment.setPaymentMethod(dto.getPaymentMethod());
        payment.setTransactionId(result.getTransactionId());
        payment.setPaymentDate(LocalDateTime.now());

        if (result.isSuccess()) {

            payment.setStatus(PaymentStatus.SUCCESS);

            payment.setFailureReason(null);

            order.setStatus(OrderStatus.PAID);

        } else {

            payment.setStatus(PaymentStatus.FAILED);

            payment.setFailureReason(result.getMessage());

        }

        orderRepository.save(order);
        paymentRepository.save(payment);

        return convertToResponse(payment);
    }

    @Override  //kendi ödeme geçmişini görme
    public List<PaymentResponseDto> getMyPayments(Authentication authentication) {

        User user = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new NotFoundException("User not found"));

        return paymentRepository
                .findByOrderUserId(user.getId())
                .stream()
                .map(this::convertToResponse)
                .toList();
    }

    @Override
    public PaymentResponseDto getPaymentByTransactionId(String transactionId, Authentication authentication) {

        User user = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new NotFoundException("User not found"));

        Payment payment = paymentRepository.findByTransactionId(transactionId)
                .orElseThrow(() -> new NotFoundException("Payment not found"));

        if (!payment.getOrder().getUser().getId().equals(user.getId())) {
            throw new AccessDeniedException("Bu ödemeyi görüntüleyemezsiniz.");
        }

        return convertToResponse(payment);
    }


    private PaymentResponseDto convertToResponse(Payment payment) {

        PaymentResponseDto dto = new PaymentResponseDto();

        dto.setOrderNumber(payment.getOrder().getOrderNumber());

        dto.setAmount(payment.getAmount());

        dto.setPaymentMethod(payment.getPaymentMethod());

        dto.setStatus(payment.getStatus());

        dto.setTransactionId(payment.getTransactionId());

        dto.setPaymentDate(payment.getPaymentDate());

        dto.setFailureReason(payment.getFailureReason());

        return dto;
    }

}
