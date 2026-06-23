package Sports.Outdoor.Backend.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductImageRequestDto {
    @NotBlank(message = "Image url cannot be empty")
    private String imageUrl;

    @NotNull(message = "Main image status cannot be null")
    private Boolean mainImage;

    @NotNull(message = "Product id cannot be null")
    private Long productId;
}
