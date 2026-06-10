package Sports.Outdoor.Backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "CartItem")
@Data
public class CartItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer quantity;

    @ManyToOne (fetch = FetchType.LAZY)
    private Cart cart;

    @ManyToOne (fetch = FetchType.LAZY)
    private ProductVariant variant;


}
