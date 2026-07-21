package Sports.Outdoor.Backend.dto.response;

import Sports.Outdoor.Backend.enums.CouponType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CouponResponseDto {
    private Long id;

    private String code;

    private String description;

    private CouponType type;

    private BigDecimal discountValue;

    private BigDecimal minimumAmount;

    private Integer usageLimit;

    private Integer usedCount;

    private LocalDateTime startDate;

    private LocalDateTime endDate;

    private Boolean active;
}
