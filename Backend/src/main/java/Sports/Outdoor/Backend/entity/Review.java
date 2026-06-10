package Sports.Outdoor.Backend.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Table(name = "reviews")
@Data
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer rating;

    private String comment;

    private LocalDateTime createdAt;

    @ManyToOne (fetch = FetchType.LAZY)
    private User user;

    @ManyToOne (fetch = FetchType.LAZY)
    private Product product;
}
