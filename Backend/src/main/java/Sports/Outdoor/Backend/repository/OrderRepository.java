package Sports.Outdoor.Backend.repository;

import Sports.Outdoor.Backend.entity.Order;
import Sports.Outdoor.Backend.enums.OrderStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order,Long> {

    List<Order> findByUserIdOrderByOrderDateDesc(Long userId);

    @Query("""
    SELECT COUNT(o) > 0
    FROM Order o
    JOIN OrderItem oi ON oi.order = o
    WHERE o.user.id = :userId
      AND oi.variant.product.id = :productId
      AND o.status = Sports.Outdoor.Backend.enums.OrderStatus.PAID
    """)
    boolean hasPurchasedProduct(@Param("userId") Long userId, @Param("productId") Long productId);



    List<Order> findAllByOrderByOrderDateDesc();


    List<Order> findByStatus(OrderStatus status);


    @Query("""
SELECT COALESCE(SUM(o.totalPrice),0)
FROM Order o
WHERE o.status = Sports.Outdoor.Backend.enums.OrderStatus.PAID
""")
    BigDecimal getTotalRevenue();

}
