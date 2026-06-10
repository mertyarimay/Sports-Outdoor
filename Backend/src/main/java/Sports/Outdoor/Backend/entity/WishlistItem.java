package Sports.Outdoor.Backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "wish_list_item")
@Data
public class WishlistItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne (fetch = FetchType.LAZY)
    private Wishlist wishlist;

    @ManyToOne (fetch = FetchType.LAZY)
    private Product product;
}
