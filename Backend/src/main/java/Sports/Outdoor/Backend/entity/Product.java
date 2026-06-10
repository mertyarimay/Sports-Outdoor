package Sports.Outdoor.Backend.entity;

import Sports.Outdoor.Backend.enums.Gender;
import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;

@Entity
@Table(name = "products")
@Data

public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String slug;  //okunabilir metin için Outdoor Ayakkabı yerine outdoor-ayakkabi bu gibi
    @Column(length = 5000)
    private String description;
    private BigDecimal price;
    private BigDecimal discountPrice;
    private Boolean active;  //ürün satıştamı
    private Gender gender;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private  Category category;

    @ManyToOne (fetch = FetchType.LAZY)
    @JoinColumn(name="brand_id")
    private Brand brand;

    @ManyToOne (fetch = FetchType.LAZY)
    @JoinColumn(name = "campaign_id")
    private Campaign campaign;




}
