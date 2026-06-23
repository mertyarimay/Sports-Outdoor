package Sports.Outdoor.Backend.dto.request;

import Sports.Outdoor.Backend.enums.Gender;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductRequestDto {
    @NotBlank(message = "Product name cannot be empty")
    private String name;

    @NotBlank(message = "Slug cannot be empty")
    private String slug;

    private String description;

    @NotNull(message = "Price cannot be null")
    private BigDecimal price;

    private BigDecimal discountPrice;

    @NotNull(message = "Active status cannot be null")
    private Boolean active;

    @NotNull(message = "Gender cannot be null")
    private Gender gender;

    @NotNull(message = "Category id cannot be null")
    private Long categoryId;

    @NotNull(message = "Brand id cannot be null")
    private Long brandId;

    private Long campaignId;
}
