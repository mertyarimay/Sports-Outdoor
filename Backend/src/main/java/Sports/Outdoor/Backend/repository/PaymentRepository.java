package Sports.Outdoor.Backend.repository;

import Sports.Outdoor.Backend.entity.Payment;
import Sports.Outdoor.Backend.enums.PaymentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {

    Optional<Payment> findByTransactionId(String transactionId);

    Optional<Payment> findByOrderId(Long orderId);

    boolean existsByOrderIdAndStatus(Long orderId, PaymentStatus status);

    List<Payment> findByOrderUserId(Long userId);

    List<Payment> findByOrderIdOrderByPaymentDateDesc(Long orderId);
}
