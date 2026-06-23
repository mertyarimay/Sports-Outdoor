package Sports.Outdoor.Backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "stocks")
@Data
public class Stock {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Integer quantity;


    @OneToOne (fetch = FetchType.LAZY)
    private ProductVariant variant;

}
