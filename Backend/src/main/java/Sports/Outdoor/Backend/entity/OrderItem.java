package Sports.Outdoor.Backend.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;

@Entity
@Table(name = "order_items")
@Data
public class OrderItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer quantity;

    private BigDecimal unitPrice;

    @ManyToOne (fetch = FetchType.LAZY)
    private Order order;

    @ManyToOne (fetch = FetchType.LAZY)
    private ProductVariant variant;
}
