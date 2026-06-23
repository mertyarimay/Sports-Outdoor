package Sports.Outdoor.Backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductImageResponseDto {
    private Long id;

    private String imageUrl;

    private Boolean mainImage;

    private Long productId;

    private String productName;
}
