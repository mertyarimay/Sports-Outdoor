package Sports.Outdoor.Backend.dto.request;

import Sports.Outdoor.Backend.enums.CouponType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CouponRequestDto {
    @NotBlank
    private String code;

    @NotBlank
    private String description;

    @NotNull
    private CouponType type;

    @NotNull
    private BigDecimal discountValue;

    @NotNull
    private BigDecimal minimumAmount;

    @NotNull
    private Integer usageLimit;

    @NotNull
    private LocalDateTime startDate;

    @NotNull
    private LocalDateTime endDate;
}
