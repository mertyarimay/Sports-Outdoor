package Sports.Outdoor.Backend.entity;

import Sports.Outdoor.Backend.enums.CouponType;
import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "coupons")
@Data
public class Coupon {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true)
    private String code;

    private String description;

    @Enumerated(EnumType.STRING)
    private CouponType type;

    private BigDecimal discountValue;

    private BigDecimal minimumAmount;

    private Integer usageLimit;

    private Integer usedCount;

    private LocalDateTime startDate;

    private LocalDateTime endDate;

    private Boolean active;
}
