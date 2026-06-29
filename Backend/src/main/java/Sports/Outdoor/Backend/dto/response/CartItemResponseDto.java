package Sports.Outdoor.Backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class CartItemResponseDto {
    private Long id;

    private Integer quantity;

    private Long cartId;

    private Long variantId;

    private String sku;

    private String color;

    private String size;

    private String productName;
}
