package Sports.Outdoor.Backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CartItemResponseDto {

    private Long id;

    private Long cartId;

    private Long variantId;

    private String sku;

    private String color;

    private String size;

    private String productName;

    private String brandName;

    private String imageUrl;

    private BigDecimal price;

    private BigDecimal discountPrice;

    private Integer quantity;

    private BigDecimal itemTotal;
}