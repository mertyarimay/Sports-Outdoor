package Sports.Outdoor.Backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name ="product_images")
@Data
public class ProductImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String imageUrl;
    private Boolean mainImage;  //ana foto ürünün yandan fotosu soldan fotosu olduğu için belirtiliyor eğer true ise o foto ana fotodur false ise değildir

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id")
    private Product product;

}
