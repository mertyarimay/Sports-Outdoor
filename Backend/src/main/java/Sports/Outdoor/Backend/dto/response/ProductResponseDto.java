package Sports.Outdoor.Backend.dto.response;

import Sports.Outdoor.Backend.enums.Gender;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductResponseDto {
    private Long id;

    private String name;

    private String slug;

    private String description;

    private BigDecimal price;

    private BigDecimal discountPrice;

    private Boolean active;

    private Gender gender;

    private String categoryName;

    private String brandName;

    private String campaignTitle;
}
