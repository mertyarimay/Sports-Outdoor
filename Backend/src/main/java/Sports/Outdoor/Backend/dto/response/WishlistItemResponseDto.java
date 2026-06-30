package Sports.Outdoor.Backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class WishlistItemResponseDto {
    private Long id;

    private Long wishlistId;

    private Long productId;

    private String productName;

    private String slug;

    private String brandName;
}
