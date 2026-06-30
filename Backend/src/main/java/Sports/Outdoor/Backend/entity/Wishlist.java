package Sports.Outdoor.Backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "wish_list") //favori listesi bu favori ürünler wishlistitemde tutulur wishlist itemde burda tutulur
@Data
public class Wishlist {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;
}
