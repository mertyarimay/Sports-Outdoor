package Sports.Outdoor.Backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "addresses")
@Data
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String city;
    private String district;
    private String fullAddress;
    private String postalCode;

    @ManyToOne (fetch =FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private  User user;

}
