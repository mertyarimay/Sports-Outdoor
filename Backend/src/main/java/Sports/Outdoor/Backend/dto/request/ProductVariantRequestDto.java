package Sports.Outdoor.Backend.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductVariantRequestDto {
    @NotBlank(message = "Color cannot be empty")
    private String color;

    @NotBlank(message = "Size cannot be empty")
    private String size;

    @NotBlank(message = "SKU cannot be empty")
    private String sku;

    @NotNull(message = "Product id cannot be null")
    private Long productId;
}
