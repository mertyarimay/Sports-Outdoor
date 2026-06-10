package Sports.Outdoor.Backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "product_variants")
@Data
public class ProductVariant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private  String color;
    private  String size;

    private String sku;   //ürün stok kodu


    @ManyToOne (fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id")
    private Product product;






}
